#!/usr/bin/env node
/**
 * Génère un Reel vertical 9:16 (1080×1920 MP4) pour le dernier article :
 * GIF du mouvement (ou image) + overlay titre/CTA, prêt TikTok/Reels/Shorts.
 * Sortie : public/reels/<slug>.mp4
 *
 * Robuste : le texte est rendu en PNG (sharp/SVG) puis incrusté par ffmpeg
 * (filtre overlay uniquement, pas besoin de drawtext/freetype).
 */
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import sharp from 'sharp'

const BASE = 'https://www.muscletraining.uk'
const gen = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'data', 'generated-articles.json'), 'utf8'))
if (!gen.length) { console.log('Aucun article.'); process.exit(0) }
const a = gen[0]
const slug = a.slug

const outDir = path.resolve(process.cwd(), 'public', 'reels')
fs.mkdirSync(outDir, { recursive: true })
const out = path.join(outDir, `${slug}.mp4`)
if (fs.existsSync(out)) { console.log('Reel déjà présent.'); process.exit(0) }

// Source : GIF du mouvement (via tag) sinon image de l'article
function gifForTags() {
  try {
    const src = fs.readFileSync(path.resolve(process.cwd(), 'components', 'ExerciseGif.tsx'), 'utf8')
    const gbase = (src.match(/const BASE = '([^']+)'/) || [])[1] || ''
    const map = {}
    for (const m of src.matchAll(/'([^']+)':\s*`\$\{BASE\}\/([^`]+)`/g)) map[m[1]] = `${gbase}/${m[2]}`
    for (const t of a.tags || []) if (map[t]) return map[t]
  } catch {}
  return ''
}
const gifUrl = gifForTags()
const localImg = a.image ? path.resolve(process.cwd(), 'public', a.image.replace(/^\//, '')) : ''

const tmp = path.join(outDir, `_src_${slug}` + (gifUrl ? '.gif' : '.jpg'))
async function fetchTo(u, dest) { const r = await fetch(u); if (!r.ok) throw new Error(`${r.status}`); fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer())) }
let usingGif = false
try {
  if (gifUrl) { await fetchTo(gifUrl, tmp); usingGif = true }
  else if (localImg && fs.existsSync(localImg)) fs.copyFileSync(localImg, tmp)
  else await fetchTo(`${BASE}/logo-512.png`, tmp)
} catch (e) { console.error('source échec:', e.message); process.exit(1) }

// ── Overlay texte (SVG → PNG transparent 1080×1920) ──
const escXml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
function wrap(s, n = 17, max = 4) {
  const w = s.split(/\s+/); const lines = []; let c = ''
  for (const x of w) { if ((c + ' ' + x).trim().length > n) { lines.push(c.trim()); c = x } else c += ' ' + x }
  if (c.trim()) lines.push(c.trim()); return lines.slice(0, max)
}
const titleLines = wrap(a.titre)
const titleSvg = titleLines.map((l, i) => `<text x="540" y="${180 + i * 88}" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="76" fill="#ffffff">${escXml(l)}</text>`).join('')
const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">
  <defs>
    <linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.75"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
    <linearGradient id="bot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.85"/></linearGradient>
  </defs>
  <rect x="0" y="0" width="1080" height="520" fill="url(#top)"/>
  <rect x="0" y="1400" width="1080" height="520" fill="url(#bot)"/>
  ${titleSvg}
  <text x="540" y="1760" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="56" fill="#E63946">muscletraining.uk</text>
  <text x="540" y="1840" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#EDE8E0">📲 Rejoins le Telegram</text>
</svg>`
const overlayPng = path.join(outDir, `_ov_${slug}.png`)
await sharp(Buffer.from(overlaySvg)).png().toFile(overlayPng)

// ── ffmpeg : scale+crop la source, incruste l'overlay ──
const fc = '[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1[bg];[bg][1:v]overlay=0:0[v]'
const inArgs = usingGif ? ['-ignore_loop', '0', '-t', '8', '-i', tmp] : ['-loop', '1', '-t', '6', '-i', tmp]
const args = ['-y', ...inArgs, '-i', overlayPng, '-filter_complex', fc, '-map', '[v]', '-r', '25', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]

try {
  execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] })
  console.log(`✅ Reel: public/reels/${slug}.mp4 (${usingGif ? 'GIF mouvement' : 'image'}, ${Math.round(fs.statSync(out).size / 1024)} KB)`)
} catch (e) {
  console.error('❌ ffmpeg:', String(e.stderr || e).slice(-400)); process.exit(1)
} finally {
  for (const f of [tmp, overlayPng]) { try { fs.unlinkSync(f) } catch {} }
}
