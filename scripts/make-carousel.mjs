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
const W = 1080, H = 1920, BGD = '#0b0b12', CARDC = '#16161f', RED = '#E63946', WHITE = '#F5F1EA', GREY = '#8A9BB5'

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
const LOGO_PATH = ['public/brand-logo-transparent.png', 'public/brand-logo.png', 'public/logo-512.png'].map(p => path.resolve(process.cwd(), p)).find(fs.existsSync)
const LOGO_B64 = fs.readFileSync(LOGO_PATH).toString('base64')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const wrap = (s, n = 14) => { const w = s.split(/\s+/), L = []; let c = ''; for (const x of w) { if ((c + ' ' + x).trim().length > n) { L.push(c.trim()); c = x } else c += ' ' + x } if (c.trim()) L.push(c.trim()); return L.slice(0, 2) }

// Liste éditoriale : 1 colonne pleine largeur, 6 cartes horizontales (illustration + infos)
const CARD_X = 40, CW = 1000, CH = 226, TILE = 186
const ROWS = [290, 538, 786, 1034, 1282, 1530]
const cells = i => { const x = CARD_X, y = ROWS[i]; return { x, y, tx: x + 20, ty: y + 20, txt: x + 232 } }

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
    <polygon points="0,0 300,0 0,300" fill="${RED}" opacity="0.10"/>
    <polygon points="${W},${H} ${W-300},${H} ${W},${H-300}" fill="${RED}" opacity="0.10"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-210}" y="200" width="420" height="420"/>
    <text x="${W/2}" y="850" text-anchor="middle" font-family="${DISPLAY}" font-size="110" fill="${WHITE}" letter-spacing="8">PROGRAMME</text>
    <text x="${W/2}" y="1040" text-anchor="middle" font-family="${DISPLAY}" font-size="200" fill="url(#rg)" letter-spacing="2">FULL BODY</text>
    <text x="${W/2}" y="1185" text-anchor="middle" font-family="${DISPLAY}" font-size="148" fill="${WHITE}">PARFAIT</text>
    <rect x="${W/2-95}" y="1235" width="190" height="7" rx="4" fill="${RED}"/>
    <text x="${W/2}" y="1330" text-anchor="middle" font-family="${COND}" font-size="54" fill="${GREY}" letter-spacing="3">4 JOURS · PRISE DE MUSCLE · SALLE</text>
    <g filter="url(#btnsh)">
      <rect x="${W/2-330}" y="1640" width="660" height="104" rx="52" fill="url(#btn)"/>
      <rect x="${W/2-330}" y="1642" width="660" height="50" rx="52" fill="#ffffff" opacity="0.12"/>
    </g>
    <text x="${W/2}" y="1710" text-anchor="middle" font-family="${DISPLAY}" font-size="48" fill="#ffffff" letter-spacing="2">PROGRAMME GRATUIT →</text>
  </svg>`
  const b = await sharp(Buffer.from(svg)).jpeg({ quality: 96, chromaSubsampling: "4:4:4" }).toBuffer()
  fs.writeFileSync(path.join(outDir, 'slide-0.jpg'), b); return b
}

// Fond éditorial : dégradé décentré + bande diagonale + watermark du jour + cartes horizontales
function bgSvg(j) {
  let s = ''
  for (let i = 0; i < 6; i++) { const { x, y, tx, ty } = cells(i)
    s += `<rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="22" fill="url(#card)" fill-opacity="0.62" stroke="${RED}" stroke-opacity="0.35" stroke-width="2" filter="url(#sh)"/>`
    s += `<rect x="${tx}" y="${ty}" width="${TILE}" height="${TILE}" rx="14" fill="url(#tile)"/>` }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="bg" cx="24%" cy="-8%" r="108%"><stop offset="0" stop-color="#261019"/><stop offset="46%" stop-color="#0e0a10"/><stop offset="100%" stop-color="${BGD}"/></radialGradient>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#20202c"/><stop offset="1" stop-color="#101017"/></linearGradient>
      <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ece9e1"/></linearGradient>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="9" stdDeviation="14" flood-color="#000000" flood-opacity="0.6"/></filter>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <polygon points="0,150 ${W},58 ${W},196 0,300" fill="#000000" opacity="0.22"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${(W-H)/2}" y="0" width="${H}" height="${H}" opacity="0.30" preserveAspectRatio="xMidYMid slice"/>
    ${s}</svg>`
}
function fgSvg(j) {
  let s = ''
  for (let i = 0; i < j.ex.length; i++) { const { x, y, tx, ty, txt } = cells(i)
    s += `<circle cx="${tx + 30}" cy="${ty + 30}" r="30" fill="${RED}"/><text x="${tx + 30}" y="${ty + 43}" text-anchor="middle" font-family="${DISPLAY}" font-size="36" fill="#ffffff">${i + 1}</text>`
    const lines = wrap(j.ex[i][1].toUpperCase(), 18)
    const ny = y + (lines.length === 1 ? 108 : 90)
    lines.forEach((l, k) => s += `<text x="${txt}" y="${ny + k * 48}" font-family="${DISPLAY}" font-size="46" fill="${WHITE}" letter-spacing="0.5">${esc(l)}</text>`)
    const ry = ny + lines.length * 48 + 8
    s += `<rect x="${txt}" y="${ry - 30}" width="64" height="6" rx="3" fill="${RED}"/>`
    s += `<text x="${txt}" y="${ry + 14}" font-family="${COND}" font-size="46" fill="${RED}" letter-spacing="1">3 × 10-12</text>`
    s += `<text x="${txt + 178}" y="${ry + 12}" font-family="${COND}" font-size="30" fill="${GREY}" letter-spacing="2">SÉRIES × REPS</text>` }
  const fw = Math.min(660, 26 + j.focus.length * 32)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <polygon points="48,58 360,58 334,170 22,170" fill="${RED}"/>
    <text x="191" y="137" text-anchor="middle" font-family="${DISPLAY}" font-size="62" fill="#ffffff" letter-spacing="1">JOUR ${j.n}</text>
    <text x="392" y="132" font-family="${COND}" font-size="72" fill="${WHITE}" letter-spacing="2">${esc(j.focus)}</text>
    <rect x="394" y="148" width="${fw}" height="6" rx="3" fill="${RED}"/>
    ${s}
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-70}" y="1762" width="140" height="140"/>
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
  execFileSync('ffmpeg', ['-y', ...inputs, '-filter_complex', filter, '-map', '[v]', '-r', '60', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['ignore', 'ignore', 'pipe'] })
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
