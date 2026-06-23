#!/usr/bin/env node
/**
 * Carrousel "programme" façon TikTok, ANIMÉ :
 *  - slide couverture (image + logo)
 *  - 1 vidéo par jour : grille d'exercices dont les illustrations JOUENT le mouvement
 * Poste sur Telegram (sendMediaGroup, photo + vidéos) avec lien vers le programme du site.
 *
 * Requiert ffmpeg + sharp. TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID pour poster.
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { execFileSync } from 'child_process'

const BASE = 'https://www.muscletraining.uk'
const GIF_BASE = 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main'
const W = 1080, H = 1350, BGD = '#0b0b12', CARDC = '#16161f', RED = '#E63946', WHITE = '#F5F1EA', GREY = '#8A9BB5'

const PROG = {
  slug: 'full-body-parfait',
  titre: ['PROGRAMME', 'FULL BODY', 'PARFAIT'],
  link: `${BASE}/programmes/salle/prise-masse-rapide-salle`,
  caption: 'Tu veux prendre du muscle ? Fais ça. 💪',
  jours: [
    { t: 'JOUR 1 · POITRINE & TRICEPS', ex: [['developpe-couche-barre','Développé couché'],['developpe-incline-barre','Développé incliné'],['ecarte-halteres','Écartés poitrine'],['extension-triceps-poulie','Pushdown triceps'],['skull-crusher','Extension allongée'],['dips','Dips']] },
    { t: 'JOUR 2 · DOS & BICEPS', ex: [['tirage-poitrine','Pulldown barre'],['tirage-horizontal','Rowing câble'],['rowing-haltere','Rowing haltère'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau'],['curl-pupitre','Curl prédicateur']] },
    { t: 'JOUR 3 · JAMBES', ex: [['hack-squat','Squat hack'],['leg-extension','Extension jambes'],['presse-cuisses','Presse à jambes'],['leg-curl-allonge','Curl allongé'],['mollets-assis','Mollets assis'],['souleve-de-terre','Soulevé de terre']] },
    { t: 'JOUR 4 · ÉPAULES & BRAS', ex: [['developpe-militaire','Développé militaire'],['elevations-laterales','Élévations latérales'],['developpe-halteres-epaules','Développé haltères'],['extension-triceps-poulie','Pushdown triceps'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau']] },
  ],
}

const outDir = path.resolve(process.cwd(), 'public', 'carousels', PROG.slug)
fs.mkdirSync(outDir, { recursive: true })
const MAP = (() => { const s = fs.readFileSync(path.resolve(process.cwd(), 'components', 'ExerciseGif.tsx'), 'utf8'); const m = {}; for (const x of s.matchAll(/'([^']+)':\s*`\$\{BASE\}\/([^`]+)`/g)) m[x[1]] = x[2]; return m })()
const LOGO_PATH = ['public/brand-logo.png', 'public/logo-512.png'].map(p => path.resolve(process.cwd(), p)).find(fs.existsSync)
const LOGO_B64 = fs.readFileSync(LOGO_PATH).toString('base64')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const wrap = (s, n = 14) => { const w = s.split(/\s+/), L = []; let c = ''; for (const x of w) { if ((c + ' ' + x).trim().length > n) { L.push(c.trim()); c = x } else c += ' ' + x } if (c.trim()) L.push(c.trim()); return L.slice(0, 2) }

// Grille : 3 colonnes × 2 rangées
const CX = [190, 540, 890], ROW_Y = [250, 745], CARD = 270
const cells = i => ({ cx: CX[i % 3], y: ROW_Y[Math.floor(i / 3)] })

// ── Couverture (image, thème sombre premium) ──
async function cover() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="glow" cx="50%" cy="32%" r="65%"><stop offset="0" stop-color="#3a0f14"/><stop offset="55%" stop-color="#120a10"/><stop offset="100%" stop-color="${BGD}"/></radialGradient>
      <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF6B7A"/><stop offset="1" stop-color="${RED}"/></linearGradient>
      <linearGradient id="btn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF5A68"/><stop offset="1" stop-color="#D32638"/></linearGradient>
      <filter id="btnsh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#E63946" flood-opacity="0.45"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect x="${W/2-118}" y="132" width="236" height="236" rx="34" fill="#050507" stroke="${RED}" stroke-opacity="0.4" stroke-width="2.5"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-100}" y="150" width="200" height="200"/>
    <text x="${W/2}" y="500" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="92" fill="${WHITE}" letter-spacing="6">PROGRAMME</text>
    <text x="${W/2}" y="660" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="158" fill="url(#rg)">FULL BODY</text>
    <text x="${W/2}" y="790" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="120" fill="${WHITE}">PARFAIT</text>
    <rect x="${W/2-90}" y="840" width="180" height="7" rx="4" fill="${RED}"/>
    <text x="${W/2}" y="930" text-anchor="middle" font-family="Arial" font-size="44" fill="${GREY}">4 jours · prise de muscle · salle</text>
    <g filter="url(#btnsh)">
      <rect x="${W/2-310}" y="1158" width="620" height="98" rx="49" fill="url(#btn)"/>
      <rect x="${W/2-310}" y="1160" width="620" height="47" rx="49" fill="#ffffff" opacity="0.12"/>
    </g>
    <text x="${W/2}" y="1220" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="38" fill="#ffffff">PROGRAMME GRATUIT →</text>
  </svg>`
  const b = await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toBuffer()
  fs.writeFileSync(path.join(outDir, 'slide-0.jpg'), b); return b
}

// Fond sombre + cartes (avec zone photo blanche pour les illustrations)
function bgSvg() {
  let s = ''
  for (let i = 0; i < 6; i++) { const { cx, y } = cells(i); const cx0 = cx - 160
    s += `<rect x="${cx0}" y="${y - 26}" width="320" height="446" rx="30" fill="url(#card)" stroke="${RED}" stroke-opacity="0.28" stroke-width="2" filter="url(#sh)"/>`
    s += `<rect x="${cx0 + 70}" y="${y - 26}" width="180" height="5" rx="3" fill="${RED}" opacity="0.85"/>`
    s += `<rect x="${cx - 135}" y="${y}" width="270" height="270" rx="18" fill="url(#tile)"/>` }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="0%" r="85%"><stop offset="0" stop-color="#1d1016"/><stop offset="55%" stop-color="#0e0a10"/><stop offset="100%" stop-color="${BGD}"/></radialGradient>
      <linearGradient id="card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1d28"/><stop offset="1" stop-color="#121219"/></linearGradient>
      <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ece9e1"/></linearGradient>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.55"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>${s}</svg>`
}
function fgSvg(j) {
  let s = ''
  for (let i = 0; i < j.ex.length; i++) { const { cx, y } = cells(i)
    // badge numéroté, dans le coin haut-gauche de la tuile
    const bx = cx - 135 + 30, by = y + 30
    s += `<circle cx="${bx}" cy="${by}" r="27" fill="${RED}"/><text x="${bx}" y="${by + 11}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="30" fill="#fff">${i + 1}</text>`
    const lines = wrap(j.ex[i][1].toUpperCase(), 13)
    lines.forEach((l, k) => s += `<text x="${cx}" y="${y + CARD + 50 + k * 32}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="26" fill="${WHITE}">${esc(l)}</text>`)
    s += `<text x="${cx}" y="${y + CARD + 50 + lines.length * 32 + 6}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="25" fill="${RED}">3 × 10-12</text>` }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <text x="${W/2}" y="115" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="58" fill="${WHITE}">${esc(j.t)}</text>
    <rect x="${W/2-70}" y="142" width="140" height="6" rx="3" fill="${RED}"/>
    ${s}
    <rect x="${W/2-56}" y="1228" width="112" height="112" rx="22" fill="#050507" stroke="${RED}" stroke-opacity="0.35" stroke-width="2"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-48}" y="1236" width="96" height="96"/>
  </svg>`
}

// ── Vidéo d'un jour (illustrations animées) ──
async function dayVideo(j, idx) {
  const out = path.join(outDir, `slide-${idx}.mp4`)
  const bgPng = path.join(outDir, `_bg.png`), fgPng = path.join(outDir, `_fg${idx}.png`)
  await sharp(Buffer.from(bgSvg())).png().toFile(bgPng)
  await sharp(Buffer.from(fgSvg(j))).png().toFile(fgPng)
  // télécharge les gifs
  const gifs = []
  for (let i = 0; i < j.ex.length; i++) { const slug = j.ex[i][0]; if (!MAP[slug]) { gifs.push(null); continue }
    const f = path.join(outDir, `_g${idx}_${i}.gif`); const r = await fetch(`${GIF_BASE}/${MAP[slug]}`); fs.writeFileSync(f, Buffer.from(await r.arrayBuffer())); gifs.push(f) }

  const inputs = ['-loop', '1', '-t', '5', '-i', bgPng]
  const present = []
  gifs.forEach((g, i) => { if (g) { inputs.push('-ignore_loop', '0', '-t', '5', '-i', g); present.push(i) } })
  inputs.push('-loop', '1', '-t', '5', '-i', fgPng)
  const fgIdx = 1 + present.length

  const scales = present.map((_, k) => `[${k + 1}:v]scale=270:270:force_original_aspect_ratio=increase,crop=270:270,setpts=PTS-STARTPTS[g${k}]`)
  let chain = '', prev = '0:v'
  present.forEach((cellI, k) => { const { cx, y } = cells(cellI); const X = cx - 135, Y = y; const lbl = `b${k}`; chain += `[${prev}][g${k}]overlay=${X}:${Y}[${lbl}];`; prev = lbl })
  chain += `[${prev}][${fgIdx}:v]overlay=0:0[v]`
  const filter = scales.join(';') + ';' + chain
  execFileSync('ffmpeg', ['-y', ...inputs, '-filter_complex', filter, '-map', '[v]', '-r', '20', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['ignore', 'ignore', 'pipe'] })
  for (const g of gifs) if (g) { try { fs.unlinkSync(g) } catch {} }
  try { fs.unlinkSync(fgPng) } catch {}
  return out
}

// ── Build ──
const media = [{ type: 'photo', file: await cover().then(() => path.join(outDir, 'slide-0.jpg')) }]
for (let i = 0; i < PROG.jours.length; i++) media.push({ type: 'video', file: await dayVideo(PROG.jours[i], i + 1) })
try { fs.unlinkSync(path.join(outDir, '_bg.png')) } catch {}
console.log(`✅ ${media.length} slides (1 photo + ${media.length - 1} vidéos)`)

// ── Post Telegram ──
const TG = process.env.TELEGRAM_BOT_TOKEN, TGC = process.env.TELEGRAM_CHAT_ID
if (TG && TGC) {
  const fd = new FormData()
  fd.append('chat_id', TGC)
  const cap = `${PROG.caption}\n\n📋 Programme complet 👇\n${PROG.link}\n\n📌 Enregistre · 🔔 Abonne-toi\n#musculation #fitness #programme #muscu`
  const arr = media.map((m, i) => ({ type: m.type, media: `attach://f${i}`, ...(i === 0 ? { caption: cap } : {}) }))
  fd.append('media', JSON.stringify(arr))
  media.forEach((m, i) => fd.append(`f${i}`, new Blob([fs.readFileSync(m.file)], { type: m.type === 'photo' ? 'image/jpeg' : 'video/mp4' }), path.basename(m.file)))
  const r = await fetch(`https://api.telegram.org/bot${TG}/sendMediaGroup`, { method: 'POST', body: fd })
  const j = await r.json(); console.log('Telegram:', r.status, j.ok ? 'OK' : JSON.stringify(j).slice(0, 200))
}
