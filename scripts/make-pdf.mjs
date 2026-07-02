#!/usr/bin/env node
/**
 * PDFs lead-magnet au style carrousel validé (1080×1920).
 * Priorité : lit les slides statiques déjà générés par make-carousel.mjs
 * (public/carousels/<slug>/slide-N-static.jpg). Sinon génère via sharp+SVG.
 * PROG_INDEX=n → programme spécifique | ALL=1 → les 8
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { PDFDocument } from 'pdf-lib'
import { execFileSync } from 'child_process'

const GIF_BASE = 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main'
const W = 1080, H = 1920, BGD = '#0b0b12', RED = '#E63946', WHITE = '#F5F1EA', GREY = '#8A9BB5'
const EXERCISE_IMAGES = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'data', 'exercise-images.json'), 'utf8'))
const TG_URL = 'https://t.me/muscletrainiing'
const TG_HANDLE = '@muscletrainiing'
const SITE = 'muscletraining.uk'

const PROGRAMS = [
  { slug: 'full-body-parfait', titre: ['PROGRAMME','FULL BODY','PARFAIT'], sub: '4 JOURS · PRISE DE MUSCLE · SALLE',
    jours: [
      { n:1, focus:'POITRINE & TRICEPS', ex:[['developpe-couche-barre','Développé couché'],['developpe-incline-barre','Développé incliné'],['ecarte-halteres','Écartés poitrine'],['extension-triceps-poulie','Pushdown triceps'],['skull-crusher','Extension allongée'],['dips','Dips']] },
      { n:2, focus:'DOS & BICEPS', ex:[['tirage-poitrine','Pulldown barre'],['tirage-horizontal','Rowing câble'],['rowing-haltere','Rowing haltère'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau'],['curl-pupitre','Curl prédicateur']] },
      { n:3, focus:'JAMBES', ex:[['hack-squat','Squat hack'],['leg-extension','Extension jambes'],['presse-cuisses','Presse à jambes'],['leg-curl-allonge','Curl allongé'],['mollets-assis','Mollets assis'],['souleve-de-terre','Soulevé de terre']] },
      { n:4, focus:'ÉPAULES & BRAS', ex:[['developpe-militaire','Développé militaire'],['elevations-laterales','Élévations latérales'],['developpe-halteres-epaules','Développé haltères'],['extension-triceps-poulie','Pushdown triceps'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau']] },
    ] },
  { slug: 'push-pull-legs', titre: ['PROGRAMME','PUSH PULL','LEGS'], sub: '3 JOURS · HYPERTROPHIE · SALLE',
    jours: [
      { n:1, focus:'PUSH (POUSSÉE)', ex:[['developpe-couche-barre','Développé couché'],['developpe-incline-barre','Développé incliné'],['developpe-militaire','Développé militaire'],['elevations-laterales','Élévations latérales'],['extension-triceps-poulie','Pushdown triceps'],['dips','Dips']] },
      { n:2, focus:'PULL (TIRAGE)', ex:[['tractions','Tractions'],['rowing-barre','Rowing barre'],['tirage-poitrine','Tirage poitrine'],['tirage-horizontal','Rowing câble'],['curl-barre','Curl barre'],['curl-marteau','Curl marteau']] },
      { n:3, focus:'LEGS (JAMBES)', ex:[['squat-barre','Squat barre'],['hack-squat','Squat hack'],['presse-cuisses','Presse à jambes'],['leg-extension','Extension jambes'],['leg-curl-allonge','Curl allongé'],['mollets-assis','Mollets assis']] },
    ] },
  { slug: 'haut-bas', titre: ['PROGRAMME','HAUT','BAS'], sub: '2 JOURS · FORCE & VOLUME · SALLE',
    jours: [
      { n:1, focus:'HAUT DU CORPS', ex:[['developpe-couche-barre','Développé couché'],['rowing-barre','Rowing barre'],['developpe-militaire','Développé militaire'],['tractions','Tractions'],['curl-barre','Curl barre'],['dips','Dips']] },
      { n:2, focus:'BAS DU CORPS', ex:[['squat-barre','Squat barre'],['souleve-de-terre','Soulevé de terre'],['presse-cuisses','Presse à jambes'],['leg-extension','Extension jambes'],['leg-curl-allonge','Curl allongé'],['mollets-assis','Mollets assis']] },
    ] },
  { slug: 'seance-pectoraux', titre: ['SÉANCE','PECTORAUX',''], sub: '6 EXERCICES · POITRINE',
    jours: [{ focus:'PECTORAUX', ex:[['developpe-couche-barre','Développé couché'],['developpe-incline-barre','Développé incliné'],['developpe-couche-halteres','Développé haltères'],['ecarte-halteres','Écartés haltères'],['dips','Dips'],['pompes','Pompes']] }] },
  { slug: 'seance-dos', titre: ['SÉANCE','DOS',''], sub: '6 EXERCICES · DOS LARGE',
    jours: [{ focus:'DOS', ex:[['tractions','Tractions'],['rowing-barre','Rowing barre'],['tirage-poitrine','Tirage poitrine'],['tirage-horizontal','Rowing câble'],['rowing-haltere','Rowing haltère'],['souleve-de-terre','Soulevé de terre']] }] },
  { slug: 'seance-bras', titre: ['SÉANCE','BRAS',''], sub: '6 EXERCICES · BICEPS & TRICEPS',
    jours: [{ focus:'BICEPS & TRICEPS', ex:[['curl-barre','Curl barre'],['curl-marteau','Curl marteau'],['curl-pupitre','Curl prédicateur'],['extension-triceps-poulie','Pushdown triceps'],['skull-crusher','Extension allongée'],['dips','Dips']] }] },
  { slug: 'seance-jambes', titre: ['SÉANCE','JAMBES',''], sub: '6 EXERCICES · QUADRI & ISCHIO',
    jours: [{ focus:'JAMBES', ex:[['squat-barre','Squat barre'],['hack-squat','Squat hack'],['presse-cuisses','Presse à jambes'],['leg-extension','Extension jambes'],['leg-curl-allonge','Curl allongé'],['mollets-assis','Mollets assis']] }] },
  { slug: 'seance-epaules', titre: ['SÉANCE','ÉPAULES',''], sub: '6 EXERCICES · DELTOÏDES',
    jours: [{ focus:'ÉPAULES', ex:[['developpe-militaire','Développé militaire'],['developpe-halteres-epaules','Développé haltères'],['elevations-laterales','Élévations latérales'],['oiseau-halteres','Oiseau haltères'],['face-pull','Face pull'],['haussements-epaules','Haussements épaules']] }] },
]

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

const MAP = (() => {
  const s = fs.readFileSync(path.resolve(process.cwd(), 'components', 'ExerciseGif.tsx'), 'utf8')
  const m = {}; for (const x of s.matchAll(/'([^']+)':\s*`\$\{BASE\}\/([^`]+)`/g)) m[x[1]] = x[2]; return m
})()

const LOGO_PATH = ['public/brand-logo-transparent.png', 'public/brand-logo.png', 'public/logo-512.png']
  .map(p => path.resolve(process.cwd(), p)).find(fs.existsSync)
const LOGO_B64 = fs.readFileSync(LOGO_PATH).toString('base64')

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
const wrap = (s, n=14) => { const w=s.split(/\s+/),L=[];let c='';for(const x of w){if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x}if(c.trim())L.push(c.trim());return L.slice(0,2) }

const CARD_X=40, CW=1000, CH=226, TILE=186
const ROWS=[290,538,786,1034,1282,1530]
const cells = i => { const x=CARD_X,y=ROWS[i]; return {x,y,tx:x+20,ty:y+20,txt:x+232} }

// Cover SVG identique au carrousel
function coverSvg(PROG) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
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
    <text x="${W/2}" y="850" text-anchor="middle" font-family="${DISPLAY}" font-size="110" fill="${WHITE}" letter-spacing="8">${esc(PROG.titre[0])}</text>
    <text x="${W/2}" y="1040" text-anchor="middle" font-family="${DISPLAY}" font-size="${PROG.titre[1].length>7?178:220}" fill="url(#rg)" letter-spacing="2">${esc(PROG.titre[1])}</text>
    ${PROG.titre[2]?`<text x="${W/2}" y="1185" text-anchor="middle" font-family="${DISPLAY}" font-size="148" fill="${WHITE}">${esc(PROG.titre[2])}</text>`:''}
    <rect x="${W/2-95}" y="${PROG.titre[2]?1235:1110}" width="190" height="7" rx="4" fill="${RED}"/>
    <text x="${W/2}" y="${PROG.titre[2]?1330:1205}" text-anchor="middle" font-family="${COND}" font-size="54" fill="${GREY}" letter-spacing="3">${esc(PROG.sub)}</text>
    <g filter="url(#btnsh)">
      <rect x="${W/2-330}" y="1640" width="660" height="104" rx="52" fill="url(#btn)"/>
      <rect x="${W/2-330}" y="1642" width="660" height="50" rx="52" fill="#ffffff" opacity="0.12"/>
    </g>
    <text x="${W/2}" y="1710" text-anchor="middle" font-family="${DISPLAY}" font-size="48" fill="#ffffff" letter-spacing="2">PROGRAMME GRATUIT</text>
    <text x="${W/2}" y="1820" text-anchor="middle" font-family="${COND}" font-size="36" fill="${GREY}" letter-spacing="2">${SITE}</text>
  </svg>`
}

// Slide jour SVG (bg + fg)
function bgSvg(j) {
  let s=''
  for(let i=0;i<6;i++){const{x,y,tx,ty}=cells(i)
    s+=`<rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="22" fill="url(#card)" fill-opacity="0.62" stroke="${RED}" stroke-opacity="0.35" stroke-width="2" filter="url(#sh)"/>`
    s+=`<rect x="${tx}" y="${ty}" width="${TILE}" height="${TILE}" rx="14" fill="url(#tile)"/>`}
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="bg" cx="24%" cy="-8%" r="108%"><stop offset="0" stop-color="#261019"/><stop offset="46%" stop-color="#0e0a10"/><stop offset="100%" stop-color="${BGD}"/></radialGradient>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#20202c"/><stop offset="1" stop-color="#101017"/></linearGradient>
      <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ece9e1"/></linearGradient>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="9" stdDeviation="14" flood-color="#000000" flood-opacity="0.6"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <polygon points="0,150 ${W},58 ${W},196 0,300" fill="#000000" opacity="0.22"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${(W-H)/2}" y="0" width="${H}" height="${H}" opacity="0.30" preserveAspectRatio="xMidYMid slice"/>
    ${s}</svg>`
}
function fgSvg(j) {
  let s=''
  for(let i=0;i<j.ex.length;i++){const{x,y,txt}=cells(i)
    const num=String(i+1).padStart(2,'0')
    s+=`<text x="${txt}" y="${y+96}" font-family="${DISPLAY}" font-size="72" fill="#ffffff">${num}</text>`
    s+=`<rect x="${txt+96}" y="${y+44}" width="5" height="56" rx="2" fill="${RED}"/>`
    const nameX=txt+120,lines=wrap(j.ex[i][1].toUpperCase(),15),ny=y+(lines.length===1?86:70)
    lines.forEach((l,k)=>{s+=`<text x="${nameX}" y="${ny+k*42}" font-family="${DISPLAY}" font-size="40" fill="${WHITE}" letter-spacing="0.5">${esc(l)}</text>`})
    s+=`<text x="${nameX}" y="${y+172}" font-family="${COND}" font-size="44" fill="${RED}" letter-spacing="1">3 × 10-12</text>`
    s+=`<text x="${nameX+172}" y="${y+170}" font-family="${COND}" font-size="28" fill="${GREY}" letter-spacing="2">SÉRIES × REPS</text>`}
  const fw=Math.min(660,26+j.focus.length*32)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <polygon points="48,58 360,58 334,170 22,170" fill="${RED}"/>
    <text x="191" y="137" text-anchor="middle" font-family="${DISPLAY}" font-size="${j.n?62:54}" fill="#ffffff" letter-spacing="1">${j.n?`JOUR ${j.n}`:'SÉANCE'}</text>
    <text x="392" y="132" font-family="${COND}" font-size="72" fill="${WHITE}" letter-spacing="2">${esc(j.focus)}</text>
    <rect x="394" y="148" width="${fw}" height="6" rx="3" fill="${RED}"/>
    ${s}
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-70}" y="1762" width="140" height="140"/>
  </svg>`
}

async function thumb(slug) {
  const aiSrc = EXERCISE_IMAGES[slug]
  if (aiSrc) {
    const aiPath = path.resolve(process.cwd(), 'public', ...aiSrc.split('/').filter(Boolean))
    if (fs.existsSync(aiPath)) {
      return sharp(aiPath).resize(TILE, TILE, { fit: 'cover', position: 'center' }).png().toBuffer()
    }
  }
  if(!MAP[slug]) return null
  try {
    const r=await fetch(`${GIF_BASE}/${MAP[slug]}`); if(!r.ok) return null
    return sharp(Buffer.from(await r.arrayBuffer()),{page:0}).resize(TILE,TILE,{fit:'cover'}).png().toBuffer()
  } catch { return null }
}

// Génère un JPEG de slide jour (fallback si pas de static pré-généré)
async function renderDay(j) {
  let base = await sharp(Buffer.from(bgSvg(j))).png().toBuffer()
  for(let i=0;i<j.ex.length;i++){
    const t=await thumb(j.ex[i][0]); if(!t) continue
    const{tx,ty}=cells(i)
    base=await sharp(base).composite([{input:t,left:tx,top:ty}]).png().toBuffer()
  }
  return sharp(base).composite([{input:await sharp(Buffer.from(fgSvg(j))).png().toBuffer(),left:0,top:0}])
    .jpeg({quality:92,chromaSubsampling:'4:4:4'}).toBuffer()
}

// Dernière page : CTA Telegram viral
function bonusSvg(PROG) {
  const others = PROGRAMS.filter(p=>p.slug!==PROG.slug).slice(0,4)
  let rows=''
  others.forEach((p,i)=>{
    const y=1020+i*142
    rows+=`<rect x="60" y="${y}" width="${W-120}" height="118" rx="18" fill="#16161f" stroke="${RED}" stroke-opacity="0.3" stroke-width="1.5"/>`
    rows+=`<text x="100" y="${y+52}" font-family="${DISPLAY}" font-size="38" fill="${WHITE}">${esc(p.titre[1])}</text>`
    rows+=`<text x="100" y="${y+92}" font-family="${COND}" font-size="32" fill="${GREY}" letter-spacing="1">${esc(p.sub)}</text>`
    rows+=`<text x="${W-90}" y="${y+72}" font-family="${COND}" font-size="34" fill="${RED}" text-anchor="end">PDF →</text>`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="20%" r="80%"><stop offset="0" stop-color="#1a0810"/><stop offset="100%" stop-color="${BGD}"/></radialGradient>
      <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF6B7A"/><stop offset="1" stop-color="${RED}"/></linearGradient>
      <filter id="sh"><feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="${RED}" flood-opacity="0.4"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <image href="data:image/png;base64,${LOGO_B64}" x="${W/2-210}" y="110" width="420" height="420"/>
    <text x="${W/2}" y="660" text-anchor="middle" font-family="${DISPLAY}" font-size="76" fill="${WHITE}" letter-spacing="4">7 AUTRES</text>
    <text x="${W/2}" y="770" text-anchor="middle" font-family="${DISPLAY}" font-size="76" fill="url(#rg)" letter-spacing="4">PROGRAMMES</text>
    <text x="${W/2}" y="870" text-anchor="middle" font-family="${COND}" font-size="54" fill="${WHITE}" letter-spacing="3">T'ATTENDENT</text>
    <rect x="${W/2-120}" y="900" width="240" height="7" rx="3" fill="${RED}"/>
    ${rows}
    <rect x="60" y="1600" width="${W-120}" height="140" rx="28" fill="${RED}" filter="url(#sh)"/>
    <text x="${W/2}" y="1666" text-anchor="middle" font-family="${DISPLAY}" font-size="52" fill="#ffffff" letter-spacing="3">REJOINS LE CANAL</text>
    <text x="${W/2}" y="1718" text-anchor="middle" font-family="${COND}" font-size="48" fill="#ffffff" letter-spacing="2">${TG_HANDLE}</text>
    <text x="${W/2}" y="1820" text-anchor="middle" font-family="${COND}" font-size="38" fill="${GREY}" letter-spacing="2">${SITE}/telegram</text>
  </svg>`
}

async function buildPdf(PROG) {
  const carouselDir = path.resolve(process.cwd(), 'public', 'carousels', PROG.slug)
  const pdf = await PDFDocument.create()
  const addJpeg = async buf => {
    const jpg = await pdf.embedJpg(buf)
    const pg = pdf.addPage([W, H])
    pg.drawImage(jpg, {x:0,y:0,width:W,height:H})
  }

  // Cover : utilise slide-0.jpg du carrousel si disponible
  const coverCache = path.join(carouselDir, 'slide-0.jpg')
  if(fs.existsSync(coverCache)) {
    console.log('  Couverture ← cache carousel')
    await addJpeg(fs.readFileSync(coverCache))
  } else {
    console.log('  Couverture → rendu SVG')
    await addJpeg(await sharp(Buffer.from(coverSvg(PROG))).jpeg({quality:96,chromaSubsampling:'4:4:4'}).toBuffer())
  }

  // Slides jours : utilise slide-N-static.jpg du carrousel si disponible
  for(let i=0;i<PROG.jours.length;i++){
    const cache = path.join(carouselDir, `slide-${i+1}-static.jpg`)
    if(fs.existsSync(cache)){
      console.log(`  Jour ${i+1} ← cache carousel`)
      await addJpeg(fs.readFileSync(cache))
    } else {
      console.log(`  Jour ${i+1} → rendu SVG+thumbnails`)
      await addJpeg(await renderDay(PROG.jours[i]))
    }
  }

  // Dernière page : CTA Telegram viral
  await addJpeg(await sharp(Buffer.from(bonusSvg(PROG))).jpeg({quality:92,chromaSubsampling:'4:4:4'}).toBuffer())

  return pdf.save()
}

const outDir = path.resolve(process.cwd(), 'public', 'downloads')
fs.mkdirSync(outDir, { recursive: true })

const all = process.env.ALL === '1'
const idx = Number(process.env.PROG_INDEX ?? 0) % PROGRAMS.length
const targets = all ? PROGRAMS : [PROGRAMS[idx]]

for(const prog of targets){
  console.log(`\n📄 ${prog.slug}…`)
  const bytes = await buildPdf(prog)
  const out = path.join(outDir, `programme-${prog.slug}.pdf`)
  fs.writeFileSync(out, bytes)
  console.log(`✅ ${out} (${Math.round(bytes.length/1024)} Ko)`)
}

// Envoie + épingle le PDF sélectionné sur Telegram
const TG=process.env.TELEGRAM_BOT_TOKEN, TGC=process.env.TELEGRAM_CHAT_ID
if(TG && TGC && process.env.PIN_PDF){
  const pdfFile = path.join(outDir, `programme-${targets[0].slug}.pdf`)
  if(!fs.existsSync(pdfFile)) process.exit(0)
  const fd=new FormData()
  fd.append('chat_id', TGC)
  fd.append('caption', `🎁 OFFERT — Programme ${targets[0].titre[1]} (PDF)\n\nTélécharge, imprime, et suis-le à la salle. 💪\n📲 Reste abonné·e : 3 conseils/semaine.\n\n${TG_URL}`)
  fd.append('document', new Blob([fs.readFileSync(pdfFile)],{type:'application/pdf'}), `programme-${targets[0].slug}.pdf`)
  const r=await fetch(`https://api.telegram.org/bot${TG}/sendDocument`,{method:'POST',body:fd})
  const j=await r.json(); console.log('Telegram:', r.status, j.ok?'OK':JSON.stringify(j).slice(0,200))
  if(j.ok){
    await fetch(`https://api.telegram.org/bot${TG}/pinChatMessage`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({chat_id:TGC,message_id:j.result.message_id,disable_notification:true})})
    console.log('📌 Épinglé.')
  }
}
