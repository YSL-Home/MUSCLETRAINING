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
const W = 1080, H = 1350, BG = '#e9dcc6', RED = '#7a1410', DARK = '#2a2622', GREY = '#9a8f7c'

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
const LOGO_B64 = fs.readFileSync(path.resolve(process.cwd(), 'public', 'logo-512.png')).toString('base64')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const wrap = (s, n = 14) => { const w = s.split(/\s+/), L = []; let c = ''; for (const x of w) { if ((c + ' ' + x).trim().length > n) { L.push(c.trim()); c = x } else c += ' ' + x } if (c.trim()) L.push(c.trim()); return L.slice(0, 2) }

// Grille : 3 colonnes × 2 rangées
const CX = [190, 540, 890], ROW_Y = [225, 715], CARD = 300
const cells = i => ({ cx: CX[i % 3], y: ROW_Y[Math.floor(i / 3)] })

// ── Couverture (image) ──
async function cover() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf4e6"/><stop offset="1" stop-color="${BG}"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-90}" y="150" width="180" height="180"/>
    <text x="${W/2}" y="500" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="118" fill="${RED}">${PROG.titre[0]}</text>
    <text x="${W/2}" y="650" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="152" fill="${RED}">${PROG.titre[1]}</text>
    <text x="${W/2}" y="780" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="118" fill="${DARK}">${PROG.titre[2]}</text>
    <rect x="${W/2-120}" y="830" width="240" height="6" rx="3" fill="${RED}"/>
    <text x="${W/2}" y="920" text-anchor="middle" font-family="Arial" font-size="44" fill="${GREY}">4 jours · prise de muscle · salle</text>
    <text x="${W/2}" y="1230" text-anchor="middle" font-family="Arial" font-weight="700" font-size="40" fill="${DARK}">Programme complet gratuit →</text>
  </svg>`
  const b = await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer()
  fs.writeFileSync(path.join(outDir, 'slide-0.jpg'), b); return b
}

// Fond (beige + cartes blanches ombrées) et calque texte (header + noms + logo)
function bgSvg() {
  let cardsS = ''
  for (let i = 0; i < 6; i++) { const { cx, y } = cells(i); const x = cx - CARD / 2
    cardsS += `<rect x="${x + 6}" y="${y + 8}" width="${CARD}" height="${CARD}" rx="26" fill="#000000" opacity="0.06"/><rect x="${x}" y="${y}" width="${CARD}" height="${CARD}" rx="26" fill="#ffffff"/>` }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${BG}"/>${cardsS}</svg>`
}
function fgSvg(j) {
  let names = ''
  for (let i = 0; i < j.ex.length; i++) { const { cx, y } = cells(i); const lines = wrap(j.ex[i][1].toUpperCase())
    lines.forEach((l, k) => names += `<text x="${cx}" y="${y + CARD + 50 + k * 34}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="29" fill="${DARK}">${esc(l)}</text>`)
    names += `<text x="${cx}" y="${y + CARD + 50 + lines.length * 34 + 8}" text-anchor="middle" font-family="Arial" font-size="26" fill="${RED}">3 × 10-12</text>` }
  const arrows = '»'.repeat(40)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <text x="${W/2}" y="105" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="54" fill="${RED}">${esc(j.t)}</text>
    <text x="${W/2}" y="150" text-anchor="middle" font-family="Arial" font-weight="900" font-size="26" fill="${RED}" opacity="0.55" letter-spacing="-1">${arrows}</text>
    ${names}
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-150}" y="1268" width="58" height="58"/>
    <text x="${W/2-78}" y="1308" font-family="Arial Black,Arial" font-weight="900" font-size="34" fill="${RED}">muscletraining.uk</text>
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

  const scales = present.map((_, k) => `[${k + 1}:v]scale=290:290:force_original_aspect_ratio=decrease,pad=290:290:(ow-iw)/2:(oh-ih)/2:color=white,setpts=PTS-STARTPTS[g${k}]`)
  let chain = '', prev = '0:v'
  present.forEach((cellI, k) => { const { cx, y } = cells(cellI); const X = cx - 145, Y = y + 5; const lbl = `b${k}`; chain += `[${prev}][g${k}]overlay=${X}:${Y}[${lbl}];`; prev = lbl })
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
