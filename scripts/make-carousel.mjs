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
    { n: 1, focus: 'POITRINE & TRICEPS', ex: [['developpe-couche-barre','Développé couché'],['developpe-incline-barre','Développé incliné'],['ecarte-halteres','Écartés poitrine'],['extension-triceps-poulie','Pushdown triceps'],['skull-crusher','Extension allongée'],['dips','Dips']] },
    { n: 2, focus: 'DOS & BICEPS', ex: [['tirage-poitrine','Pulldown barre'],['tirage-horizontal','Rowing câble'],['rowing-haltere','Rowing haltère'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau'],['curl-pupitre','Curl prédicateur']] },
    { n: 3, focus: 'JAMBES', ex: [['hack-squat','Squat hack'],['leg-extension','Extension jambes'],['presse-cuisses','Presse à jambes'],['leg-curl-allonge','Curl allongé'],['mollets-assis','Mollets assis'],['souleve-de-terre','Soulevé de terre']] },
    { n: 4, focus: 'ÉPAULES & BRAS', ex: [['developpe-militaire','Développé militaire'],['elevations-laterales','Élévations latérales'],['developpe-halteres-epaules','Développé haltères'],['extension-triceps-poulie','Pushdown triceps'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau']] },
  ],
}

// Installe les polices d'affichage pour librsvg (fontconfig)
function ensureFonts() {
  const dir = process.platform === 'darwin' ? path.join(process.env.HOME, 'Library/Fonts') : path.join(process.env.HOME, '.fonts')
  try { fs.mkdirSync(dir, { recursive: true }) } catch {}
  for (const f of ['Anton-Regular.ttf', 'BebasNeue-Regular.ttf']) {
    const src = path.resolve(process.cwd(), 'assets', 'fonts', f), dst = path.join(dir, f)
    try { if (fs.existsSync(src) && !fs.existsSync(dst)) fs.copyFileSync(src, dst) } catch {}
  }
  try { execFileSync('fc-cache', ['-f', dir], { stdio: 'ignore' }) } catch {}
}
ensureFonts()
const DISPLAY = 'Anton', COND = 'Bebas Neue'

const outDir = path.resolve(process.cwd(), 'public', 'carousels', PROG.slug)
fs.mkdirSync(outDir, { recursive: true })
const MAP = (() => { const s = fs.readFileSync(path.resolve(process.cwd(), 'components', 'ExerciseGif.tsx'), 'utf8'); const m = {}; for (const x of s.matchAll(/'([^']+)':\s*`\$\{BASE\}\/([^`]+)`/g)) m[x[1]] = x[2]; return m })()
const LOGO_PATH = ['public/brand-logo.png', 'public/logo-512.png'].map(p => path.resolve(process.cwd(), p)).find(fs.existsSync)
const LOGO_B64 = fs.readFileSync(LOGO_PATH).toString('base64')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const wrap = (s, n = 14) => { const w = s.split(/\s+/), L = []; let c = ''; for (const x of w) { if ((c + ' ' + x).trim().length > n) { L.push(c.trim()); c = x } else c += ' ' + x } if (c.trim()) L.push(c.trim()); return L.slice(0, 2) }

// Liste éditoriale : 2 colonnes × 3 rangées, cartes horizontales (illustration + infos)
const COLS = [40, 560], ROWS = [210, 545, 880], CW = 480, CH = 310, TILE = 220
const cells = i => { const c = i % 2, r = Math.floor(i / 2); const x = COLS[c], y = ROWS[r]; return { x, y, tx: x + 24, ty: y + 45, txt: x + 264 } }

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
    <polygon points="0,0 240,0 0,240" fill="${RED}" opacity="0.10"/>
    <polygon points="${W},${H} ${W-240},${H} ${W},${H-240}" fill="${RED}" opacity="0.10"/>
    <rect x="${W/2-118}" y="132" width="236" height="236" rx="34" fill="#050507" stroke="${RED}" stroke-opacity="0.4" stroke-width="2.5"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-100}" y="150" width="200" height="200"/>
    <text x="${W/2}" y="510" text-anchor="middle" font-family="${DISPLAY}" font-size="104" fill="${WHITE}" letter-spacing="8">PROGRAMME</text>
    <text x="${W/2}" y="680" text-anchor="middle" font-family="${DISPLAY}" font-size="186" fill="url(#rg)" letter-spacing="2">FULL BODY</text>
    <text x="${W/2}" y="810" text-anchor="middle" font-family="${DISPLAY}" font-size="138" fill="${WHITE}">PARFAIT</text>
    <rect x="${W/2-90}" y="852" width="180" height="7" rx="4" fill="${RED}"/>
    <text x="${W/2}" y="936" text-anchor="middle" font-family="${COND}" font-size="50" fill="${GREY}" letter-spacing="3">4 JOURS · PRISE DE MUSCLE · SALLE</text>
    <g filter="url(#btnsh)">
      <rect x="${W/2-310}" y="1158" width="620" height="98" rx="49" fill="url(#btn)"/>
      <rect x="${W/2-310}" y="1160" width="620" height="47" rx="49" fill="#ffffff" opacity="0.12"/>
    </g>
    <text x="${W/2}" y="1224" text-anchor="middle" font-family="${DISPLAY}" font-size="46" fill="#ffffff" letter-spacing="2">PROGRAMME GRATUIT →</text>
  </svg>`
  const b = await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toBuffer()
  fs.writeFileSync(path.join(outDir, 'slide-0.jpg'), b); return b
}

// Fond éditorial : dégradé décentré + bande diagonale + watermark du jour + cartes horizontales
function bgSvg(j) {
  let s = ''
  for (let i = 0; i < 6; i++) { const { x, y, tx, ty } = cells(i)
    s += `<rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="24" fill="url(#card)" stroke="${RED}" stroke-opacity="0.3" stroke-width="2" filter="url(#sh)"/>`
    s += `<polygon points="${x},${y} ${x + 92},${y} ${x},${y + 86}" fill="${RED}"/>`
    s += `<rect x="${tx}" y="${ty}" width="${TILE}" height="${TILE}" rx="14" fill="url(#tile)"/>` }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="bg" cx="24%" cy="-8%" r="108%"><stop offset="0" stop-color="#261019"/><stop offset="46%" stop-color="#0e0a10"/><stop offset="100%" stop-color="${BGD}"/></radialGradient>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#20202c"/><stop offset="1" stop-color="#101017"/></linearGradient>
      <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ece9e1"/></linearGradient>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="9" stdDeviation="14" flood-color="#000000" flood-opacity="0.6"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <polygon points="0,150 ${W},58 ${W},196 0,300" fill="#000000" opacity="0.22"/>
    <text x="${W - 16}" y="${H/2 + 230}" text-anchor="end" font-family="${DISPLAY}" font-size="680" fill="#ffffff" opacity="0.03">${j.n}</text>
    ${s}</svg>`
}
function fgSvg(j) {
  let s = ''
  for (let i = 0; i < j.ex.length; i++) { const { x, y, txt } = cells(i)
    s += `<text x="${x + 20}" y="${y + 56}" font-family="${DISPLAY}" font-size="44" fill="#ffffff">${i + 1}</text>`
    const lines = wrap(j.ex[i][1].toUpperCase(), 12)
    const ny = y + (lines.length === 1 ? 150 : 128)
    lines.forEach((l, k) => s += `<text x="${txt}" y="${ny + k * 42}" font-family="${DISPLAY}" font-size="38" fill="${WHITE}" letter-spacing="0.5">${esc(l)}</text>`)
    const ry = ny + lines.length * 42 + 14
    s += `<rect x="${txt}" y="${ry - 24}" width="56" height="5" rx="3" fill="${RED}"/>`
    s += `<text x="${txt}" y="${ry + 26}" font-family="${COND}" font-size="40" fill="${RED}" letter-spacing="1">3 × 10-12</text>`
    s += `<text x="${txt + 150}" y="${ry + 24}" font-family="${COND}" font-size="28" fill="${GREY}" letter-spacing="2">REPS</text>` }
  const fw = Math.min(700, 26 + j.focus.length * 33)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <polygon points="44,46 322,46 298,148 20,148" fill="${RED}"/>
    <text x="170" y="117" text-anchor="middle" font-family="${DISPLAY}" font-size="56" fill="#ffffff" letter-spacing="1">JOUR ${j.n}</text>
    <text x="352" y="112" font-family="${COND}" font-size="66" fill="${WHITE}" letter-spacing="2">${esc(j.focus)}</text>
    <rect x="354" y="126" width="${fw}" height="5" rx="3" fill="${RED}"/>
    ${s}
    <rect x="${W/2-56}" y="1232" width="112" height="112" rx="22" fill="#050507" stroke="${RED}" stroke-opacity="0.35" stroke-width="2"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-48}" y="1240" width="96" height="96"/>
  </svg>`
}

// ── Vidéo d'un jour (illustrations animées) ──
async function dayVideo(j, idx) {
  const out = path.join(outDir, `slide-${idx}.mp4`)
  const bgPng = path.join(outDir, `_bg${idx}.png`), fgPng = path.join(outDir, `_fg${idx}.png`)
  await sharp(Buffer.from(bgSvg(j))).png().toFile(bgPng)
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

  const scales = present.map((_, k) => `[${k + 1}:v]scale=${TILE}:${TILE}:force_original_aspect_ratio=increase,crop=${TILE}:${TILE},minterpolate=fps=60:mi_mode=blend,setpts=PTS-STARTPTS[g${k}]`)
  let chain = '', prev = '0:v'
  present.forEach((cellI, k) => { const { tx, ty } = cells(cellI); const lbl = `b${k}`; chain += `[${prev}][g${k}]overlay=${tx}:${ty}[${lbl}];`; prev = lbl })
  chain += `[${prev}][${fgIdx}:v]overlay=0:0[v]`
  const filter = scales.join(';') + ';' + chain
  execFileSync('ffmpeg', ['-y', ...inputs, '-filter_complex', filter, '-map', '[v]', '-r', '60', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['ignore', 'ignore', 'pipe'] })
  for (const g of gifs) if (g) { try { fs.unlinkSync(g) } catch {} }
  try { fs.unlinkSync(fgPng) } catch {}
  try { fs.unlinkSync(bgPng) } catch {}
  return out
}

// ── Build ──
const media = [{ type: 'photo', file: await cover().then(() => path.join(outDir, 'slide-0.jpg')) }]
for (let i = 0; i < PROG.jours.length; i++) media.push({ type: 'video', file: await dayVideo(PROG.jours[i], i + 1) })
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
