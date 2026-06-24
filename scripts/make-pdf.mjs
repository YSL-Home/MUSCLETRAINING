#!/usr/bin/env node
/**
 * Génère le PDF lead-magnet "Programme Full Body 4 semaines" (illustré).
 * Sortie : public/downloads/programme-full-body-4-semaines.pdf
 * Optionnel : si TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID, l'envoie + l'épingle au canal.
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const GIF_BASE = 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main'
const RED = rgb(0.902, 0.224, 0.275), WHITE = rgb(0.96, 0.945, 0.92), GREY = rgb(0.54, 0.56, 0.62), DARK = rgb(0.043, 0.043, 0.07), CARD = rgb(0.1, 0.1, 0.14)

const PROG = {
  titre: ['PROGRAMME', 'FULL BODY', 'PARFAIT'],
  sub: '4 semaines · 4 jours/semaine · Salle',
  jours: [
    { n: 1, focus: 'POITRINE & TRICEPS', ex: [['developpe-couche-barre','Développé couché'],['developpe-incline-barre','Développé incliné'],['ecarte-halteres','Écartés poitrine'],['extension-triceps-poulie','Pushdown triceps'],['skull-crusher','Extension allongée'],['dips','Dips']] },
    { n: 2, focus: 'DOS & BICEPS', ex: [['tirage-poitrine','Pulldown barre'],['tirage-horizontal','Rowing câble'],['rowing-haltere','Rowing haltère'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau'],['curl-pupitre','Curl prédicateur']] },
    { n: 3, focus: 'JAMBES', ex: [['hack-squat','Squat hack'],['leg-extension','Extension jambes'],['presse-cuisses','Presse à jambes'],['leg-curl-allonge','Curl allongé'],['mollets-assis','Mollets assis'],['souleve-de-terre','Soulevé de terre']] },
    { n: 4, focus: 'ÉPAULES & BRAS', ex: [['developpe-militaire','Développé militaire'],['elevations-laterales','Élévations latérales'],['developpe-halteres-epaules','Développé haltères'],['extension-triceps-poulie','Pushdown triceps'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau']] },
  ],
}

const MAP = (() => { const s = fs.readFileSync(path.resolve(process.cwd(), 'components', 'ExerciseGif.tsx'), 'utf8'); const m = {}; for (const x of s.matchAll(/'([^']+)':\s*`\$\{BASE\}\/([^`]+)`/g)) m[x[1]] = x[2]; return m })()

async function thumb(slug) {
  if (!MAP[slug]) return null
  try { const r = await fetch(`${GIF_BASE}/${MAP[slug]}`); const buf = Buffer.from(await r.arrayBuffer())
    return await sharp(buf, { page: 0 }).resize(220, 220, { fit: 'cover' }).jpeg({ quality: 86 }).toBuffer()
  } catch { return null }
}

const W = 595, H = 842
const pdf = await PDFDocument.create()
const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
const reg = await pdf.embedFont(StandardFonts.Helvetica)
const logoPng = await pdf.embedPng(fs.readFileSync(path.resolve(process.cwd(), 'public', 'brand-logo-transparent.png')))

// ── Couverture ──
{
  const p = pdf.addPage([W, H])
  p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: DARK })
  p.drawRectangle({ x: 0, y: H - 8, width: W, height: 8, color: RED })
  const lw = 230, lh = 230
  p.drawImage(logoPng, { x: (W - lw) / 2, y: H - 300, width: lw, height: lh })
  const ctr = (t, f, sz, y, col) => p.drawText(t, { x: (W - f.widthOfTextAtSize(t, sz)) / 2, y, size: sz, font: f, color: col })
  ctr('PROGRAMME', bold, 34, 470, WHITE)
  ctr('FULL BODY', bold, 60, 405, RED)
  ctr('PARFAIT', bold, 40, 350, WHITE)
  ctr(PROG.sub, reg, 15, 300, GREY)
  ctr('muscletraining.uk', bold, 16, 70, RED)
  ctr('Canal Telegram : t.me/muscletrainiing', reg, 12, 48, GREY)
}

// ── Pages jours ──
for (const j of PROG.jours) {
  const p = pdf.addPage([W, H])
  p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: DARK })
  // header
  p.drawRectangle({ x: 40, y: H - 92, width: 150, height: 44, color: RED })
  p.drawText(`JOUR ${j.n}`, { x: 58, y: H - 80, size: 22, font: bold, color: WHITE })
  p.drawText(j.focus, { x: 205, y: H - 80, size: 22, font: bold, color: WHITE })
  // grille 2×3
  const cols = [40, 308], rowH = 210, top = H - 130
  for (let i = 0; i < j.ex.length; i++) {
    const cx = cols[i % 2], cy = top - Math.floor(i / 2) * rowH
    p.drawRectangle({ x: cx, y: cy - rowH + 16, width: 247, height: rowH - 16, color: CARD, borderColor: rgb(0.2, 0.08, 0.1), borderWidth: 1 })
    const tb = await thumb(j.ex[i][0])
    if (tb) { const img = await pdf.embedJpg(tb); p.drawImage(img, { x: cx + 14, y: cy - 150, width: 130, height: 130 }) }
    p.drawText(`0${i + 1}`, { x: cx + 158, y: cy - 60, size: 34, font: bold, color: WHITE })
    const name = j.ex[i][1]
    p.drawText(name.length > 16 ? name.slice(0, 15) + '…' : name, { x: cx + 14, y: cy - 178, size: 13, font: bold, color: WHITE })
    p.drawText('3 x 10-12', { x: cx + 14, y: cy - 196, size: 13, font: bold, color: RED })
  }
  p.drawText('muscletraining.uk', { x: 40, y: 30, size: 11, font: bold, color: GREY })
}

const outDir = path.resolve(process.cwd(), 'public', 'downloads')
fs.mkdirSync(outDir, { recursive: true })
const out = path.join(outDir, 'programme-full-body-4-semaines.pdf')
fs.writeFileSync(out, await pdf.save())
console.log(`✅ PDF: public/downloads/programme-full-body-4-semaines.pdf (${Math.round(fs.statSync(out).size / 1024)} Ko)`)

// ── Optionnel : envoyer + épingler dans le canal ──
const TG = process.env.TELEGRAM_BOT_TOKEN, TGC = process.env.TELEGRAM_CHAT_ID
if (TG && TGC && process.env.PIN_PDF) {
  const fd = new FormData()
  fd.append('chat_id', TGC)
  fd.append('caption', '🎁 OFFERT — Programme Full Body 4 semaines (PDF)\n\nTélécharge, imprime, et suis-le à la salle. 💪\n📲 Reste abonné·e : 3 conseils/semaine.')
  fd.append('document', new Blob([fs.readFileSync(out)], { type: 'application/pdf' }), 'Programme-Full-Body-4-semaines.pdf')
  const r = await fetch(`https://api.telegram.org/bot${TG}/sendDocument`, { method: 'POST', body: fd })
  const j = await r.json()
  console.log('Telegram sendDocument:', r.status, j.ok ? 'OK' : JSON.stringify(j).slice(0, 200))
  if (j.ok) {
    await fetch(`https://api.telegram.org/bot${TG}/pinChatMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: TGC, message_id: j.result.message_id, disable_notification: true }) })
    console.log('📌 PDF épinglé.')
  }
}
