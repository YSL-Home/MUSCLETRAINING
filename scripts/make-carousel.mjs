#!/usr/bin/env node
/**
 * Génère un carrousel "programme" façon TikTok :
 *  - 1 slide de couverture
 *  - 1 slide par jour : header "JOUR X : …" + grille d'exercices illustrés (Nx reps)
 * Puis poste le carrousel sur Telegram (sendMediaGroup).
 *
 * Env : CF/CLOUDFLARE non requis. TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID pour poster.
 * Sortie : public/carousels/<prog>/slide-N.jpg
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const BASE = 'https://www.muscletraining.uk'
const GIF_BASE = 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main'

// Programme (façon split 4 jours) — slug pour l'illustration + libellé + format
const PROG = {
  slug: 'full-body-parfait',
  titre: ['PROGRAMME', 'FULL BODY', 'PARFAIT'],
  link: `${BASE}/programmes/salle/prise-masse-rapide-salle`,
  caption: 'Tu veux prendre du muscle ? Fais ça. 💪',
  jours: [
    { t: 'JOUR 1 : POITRINE & TRICEPS', ex: [
      ['developpe-couche-barre', 'Développé couché'], ['developpe-incline-barre', 'Développé incliné'], ['ecarte-halteres', 'Écartés poitrine'],
      ['extension-triceps-poulie', 'Pushdown triceps'], ['skull-crusher', 'Extension allongée'], ['dips', 'Dips'],
    ]},
    { t: 'JOUR 2 : DOS & BICEPS', ex: [
      ['tirage-poitrine', 'Pulldown à la barre'], ['tirage-horizontal', 'Rowing à la câble'], ['rowing-haltere', 'Rowing haltère'],
      ['curl-barre', 'Curl à la barre'], ['curl-marteau', 'Curl marteau'], ['curl-pupitre', 'Curl prédicateur'],
    ]},
    { t: 'JOUR 3 : JAMBES', ex: [
      ['hack-squat', 'Squat hack'], ['leg-extension', 'Extension des jambes'], ['presse-cuisses', 'Presse à jambes'],
      ['leg-curl-allonge', 'Curl allongé'], ['mollets-assis', 'Mollets assis'], ['souleve-de-terre', 'Soulevé de terre'],
    ]},
    { t: 'JOUR 4 : ÉPAULES & BRAS', ex: [
      ['developpe-militaire', 'Développé militaire'], ['elevations-laterales', 'Élévations latérales'], ['developpe-halteres-epaules', 'Développé haltères'],
      ['extension-triceps-poulie', 'Pushdown triceps'], ['curl-barre', 'Curl barre'], ['curl-marteau', 'Curl marteau'],
    ]},
  ],
}

const W = 1080, H = 1350, BG = '#e7dac4', RED = '#6b1410', DARK = '#2a2622', GREY = '#8a7f6e'
const outDir = path.resolve(process.cwd(), 'public', 'carousels', PROG.slug)
fs.mkdirSync(outDir, { recursive: true })

const gifSrc = (m, src) => src // map already absolute below
async function frameB64(slug, mapEntry) {
  const url = `${GIF_BASE}/${mapEntry}`
  const r = await fetch(url); if (!r.ok) throw new Error(`${slug} ${r.status}`)
  const buf = Buffer.from(await r.arrayBuffer())
  const png = await sharp(buf, { page: 0 }).resize(300, 300, { fit: 'contain', background: BG }).png().toBuffer()
  return png.toString('base64')
}

// Map slug → chemin gif (parse du composant)
function gifMap() {
  const src = fs.readFileSync(path.resolve(process.cwd(), 'components', 'ExerciseGif.tsx'), 'utf8')
  const map = {}
  for (const m of src.matchAll(/'([^']+)':\s*`\$\{BASE\}\/([^`]+)`/g)) map[m[1]] = m[2]
  return map
}
const MAP = gifMap()

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
function wrap(s, n = 15) {
  const w = s.split(/\s+/), lines = []; let c = ''
  for (const x of w) { if ((c + ' ' + x).trim().length > n) { lines.push(c.trim()); c = x } else c += ' ' + x }
  if (c.trim()) lines.push(c.trim()); return lines.slice(0, 2)
}

async function coverSlide() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <text x="${W/2}" y="320" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="120" fill="${RED}">${PROG.titre[0]}</text>
    <text x="${W/2}" y="470" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="150" fill="${RED}">${PROG.titre[1]}</text>
    <text x="${W/2}" y="600" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="120" fill="${DARK}">${PROG.titre[2]}</text>
    <text x="${W/2}" y="760" text-anchor="middle" font-family="Arial" font-size="42" fill="${GREY}">4 jours · prise de muscle · salle</text>
    <text x="${W/2}" y="1180" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="48" fill="${RED}">muscletraining.uk</text>
    <text x="${W/2}" y="1250" text-anchor="middle" font-family="Arial" font-weight="700" font-size="38" fill="${DARK}">Programme complet gratuit →</text>
  </svg>`
  return sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer()
}

async function daySlide(j) {
  const cols = [200, 540, 880]
  const rowsY = [250, 760] // top y of image per row
  const cells = []
  for (let i = 0; i < j.ex.length; i++) {
    const [slug, label] = j.ex[i]
    const cx = cols[i % 3], iy = rowsY[Math.floor(i / 3)]
    let img = ''
    try { if (MAP[slug]) img = `<image href="data:image/png;base64,${await frameB64(slug, MAP[slug])}" x="${cx-150}" y="${iy}" width="300" height="300"/>` } catch {}
    const lines = wrap(label.toUpperCase())
    const nameSvg = lines.map((l, k) => `<text x="${cx}" y="${iy+345+k*34}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="28" fill="${DARK}">${esc(l)}</text>`).join('')
    const repsY = iy + 345 + lines.length * 34 + 8
    cells.push(`${img}${nameSvg}<text x="${cx}" y="${repsY}" text-anchor="middle" font-family="Arial" font-size="26" fill="${GREY}">3 × 10-12</text>`)
  }
  const arrows = '»'.repeat(46)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <text x="${W/2}" y="110" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="56" fill="${RED}">${esc(j.t)}</text>
    <text x="${W/2}" y="160" text-anchor="middle" font-family="Arial" font-weight="900" font-size="30" fill="${RED}" letter-spacing="-2">${arrows}</text>
    ${cells.join('')}
    <text x="${W/2}" y="1320" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="32" fill="${RED}">muscletraining.uk</text>
  </svg>`
  return sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer()
}

// ── Build slides ──
const slides = []
slides.push(await coverSlide())
for (const j of PROG.jours) slides.push(await daySlide(j))
slides.forEach((b, i) => fs.writeFileSync(path.join(outDir, `slide-${i}.jpg`), b))
console.log(`✅ ${slides.length} slides → public/carousels/${PROG.slug}/`)

// ── Post Telegram (sendMediaGroup) ──
const TG = process.env.TELEGRAM_BOT_TOKEN, TGC = process.env.TELEGRAM_CHAT_ID
if (TG && TGC) {
  const fd = new FormData()
  fd.append('chat_id', TGC)
  const media = slides.map((_, i) => ({ type: 'photo', media: `attach://f${i}`, ...(i === 0 ? { caption: `${PROG.caption}\n\n📋 Programme complet 👇\n${PROG.link}\n\n📌 Enregistre · 🔔 Abonne-toi\n#musculation #fitness #programme #muscu` } : {}) }))
  fd.append('media', JSON.stringify(media))
  slides.forEach((b, i) => fd.append(`f${i}`, new Blob([b], { type: 'image/jpeg' }), `slide-${i}.jpg`))
  const r = await fetch(`https://api.telegram.org/bot${TG}/sendMediaGroup`, { method: 'POST', body: fd })
  const j = await r.json()
  console.log('Telegram sendMediaGroup:', r.status, j.ok ? 'OK' : JSON.stringify(j).slice(0, 200))
}
