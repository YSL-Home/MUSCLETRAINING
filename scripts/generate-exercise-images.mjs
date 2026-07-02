#!/usr/bin/env node
/**
 * Génère les illustrations IA pour chaque exercice (mannequin CGI gris + muscle ciblé en rouge).
 * Utilise l'API Pixelcut (Imagen 4 Ultra).
 * Enregistre dans public/exercise-images/<slug>.jpg + met à jour data/exercise-images.json.
 *
 * Usage : PIXELCUT_API_KEY=xxx node scripts/generate-exercise-images.mjs
 * Ou en ciblant un exercice : SLUG=developpe-couche-barre node scripts/generate-exercise-images.mjs
 */
import fs from 'fs'
import path from 'path'

const API_KEY = process.env.PIXELCUT_API_KEY
if (!API_KEY) { console.error('❌ PIXELCUT_API_KEY manquant'); process.exit(1) }

const OUT_DIR = path.resolve(process.cwd(), 'public', 'exercise-images')
const MAP_PATH = path.resolve(process.cwd(), 'data', 'exercise-images.json')
fs.mkdirSync(OUT_DIR, { recursive: true })

// Mapping exercice → (description du mouvement, muscle ciblé en rouge)
const EXERCISES = {
  'developpe-couche-barre':     ['lying on a flat bench performing a barbell bench press', 'pectoral muscles (chest, pectoralis major)'],
  'developpe-incline-barre':    ['lying on a 45° incline bench pressing a barbell upward', 'upper pectoral muscles (clavicular head of pectoralis major)'],
  'developpe-couche-halteres':  ['lying on a flat bench pressing two dumbbells upward', 'pectoral muscles (chest)'],
  'ecarte-halteres':            ['lying on a flat bench performing a dumbbell fly, arms spread wide', 'pectoral muscles (chest, pectoralis major)'],
  'pompes':                     ['in a push-up position, arms fully extended', 'pectoral muscles (chest)'],
  'developpe-militaire':        ['standing performing an overhead barbell press above head', 'anterior deltoid (front shoulder muscle)'],
  'developpe-halteres-epaules': ['seated performing an overhead dumbbell shoulder press', 'deltoid muscles (shoulders)'],
  'elevations-laterales':       ['standing raising two dumbbells to the sides at shoulder height', 'lateral deltoid (side shoulder muscle)'],
  'oiseau-halteres':            ['bent forward raising two dumbbells to the sides (rear delt fly)', 'posterior deltoid (rear shoulder muscle)'],
  'face-pull':                  ['pulling a cable rope toward the face at head height', 'posterior deltoid and upper trapezius'],
  'haussements-epaules':        ['standing shrugging shoulders upward with a barbell', 'trapezius muscles (upper traps)'],
  'tractions':                  ['hanging from a pull-up bar pulling body upward with overhand grip', 'latissimus dorsi (lats, back muscles)'],
  'tractions-supination':       ['hanging from a bar pulling body upward with underhand grip (chin-up)', 'latissimus dorsi and biceps'],
  'tirage-poitrine':            ['seated at a lat pulldown machine pulling bar down to chest', 'latissimus dorsi (lats)'],
  'tirage-horizontal':          ['seated at a cable row machine pulling handle toward abdomen', 'latissimus dorsi and rhomboids (back muscles)'],
  'rowing-barre':               ['bent forward at 45° performing a bent-over barbell row', 'latissimus dorsi and upper back muscles'],
  'rowing-haltere':             ['one knee on a bench performing a single-arm dumbbell row', 'latissimus dorsi (lat muscles)'],
  'souleve-de-terre':           ['standing lifting a barbell from the floor with straight back', 'hamstrings and erector spinae (lower back)'],
  'skull-crusher':              ['lying on a bench lowering a barbell toward forehead (skull crusher)', 'triceps brachii (back of upper arms)'],
  'extension-triceps-poulie':   ['standing at a cable machine pushing bar downward (triceps pushdown)', 'triceps brachii (back of upper arms)'],
  'dips':                       ['between parallel bars lowering and pushing the body (dips)', 'triceps brachii (back of upper arms)'],
  'curl-barre':                 ['standing curling a barbell upward with both arms', 'biceps brachii (front of upper arms)'],
  'curl-marteau':               ['standing curling dumbbells with neutral grip (hammer curl)', 'brachioradialis and biceps brachii'],
  'curl-pupitre':               ['arms resting on a preacher curl pad curling a barbell upward', 'biceps brachii (front of upper arms)'],
  'squat-barre':                ['feet shoulder-width apart performing a barbell back squat', 'quadriceps (front of thighs)'],
  'hack-squat':                 ['on a hack squat machine pushing sled upward at 45°', 'quadriceps (front of thighs)'],
  'presse-cuisses':             ['on a 45° leg press machine pushing sled away', 'quadriceps and glutes'],
  'leg-extension':              ['seated on a leg extension machine extending legs forward', 'quadriceps (front of thighs)'],
  'leg-curl-allonge':           ['lying face down on a leg curl machine curling heels toward glutes', 'hamstrings (back of thighs)'],
  'mollets-assis':              ['seated with a barbell across knees performing a calf raise', 'soleus and gastrocnemius (calf muscles)'],
}

const BASE_PROMPT = (movement, muscle) =>
  `3D CGI fitness illustration. A fully gray matte plastic mannequin character (completely gray from head to toe including bald face and head, seamless anatomy model look) wearing a black fitted tank top and black shorts, ${movement}. Warm beige sandy gym room background with subtle equipment visible. ONLY the ${muscle} is highlighted in bright crimson red #E63946. Every other body part remains flat gray matte. Professional fitness poster lighting. Photorealistic 3D CGI render. Portrait 9:16.`

const imageMap = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'))
const targetSlug = process.env.SLUG

const toGenerate = Object.entries(EXERCISES).filter(([slug]) => {
  if (targetSlug) return slug === targetSlug
  return !imageMap[slug] // skip already generated
})

if (!toGenerate.length) { console.log('✅ Toutes les images déjà générées.'); process.exit(0) }
console.log(`📸 ${toGenerate.length} image(s) à générer…`)

async function generateOne(slug, movement, muscle) {
  console.log(`  → ${slug}`)
  const prompt = BASE_PROMPT(movement, muscle)

  // Lancer la génération
  const startRes = await fetch('https://api.developer.pixelcut.ai/v1/images/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': API_KEY },
    body: JSON.stringify({ prompt, model: 'imagen-4-ultra', aspect_ratio: '9:16', output_format: 'jpg' }),
  })
  if (!startRes.ok) { console.error(`    ❌ ${slug}: HTTP ${startRes.status}`); return }
  const job = await startRes.json()
  const jobId = job.id || job.job_id
  if (!jobId) { console.error(`    ❌ ${slug}: pas de job_id`); return }

  // Attendre la complétion (poll toutes les 3s, max 60s)
  let asset_url = null
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 3000))
    const poll = await fetch(`https://api.developer.pixelcut.ai/v1/jobs/${jobId}`, {
      headers: { 'X-API-KEY': API_KEY },
    })
    const data = await poll.json()
    if (data.status === 'completed') { asset_url = data.output?.[0]?.url || data.url; break }
    if (data.status === 'failed') { console.error(`    ❌ ${slug}: job failed`); return }
  }
  if (!asset_url) { console.error(`    ❌ ${slug}: timeout`); return }

  // Télécharger et sauvegarder
  const imgRes = await fetch(asset_url)
  if (!imgRes.ok) { console.error(`    ❌ ${slug}: download failed`); return }
  const buf = Buffer.from(await imgRes.arrayBuffer())
  const outPath = path.join(OUT_DIR, `${slug}.jpg`)
  fs.writeFileSync(outPath, buf)

  imageMap[slug] = `/exercise-images/${slug}.jpg`
  fs.writeFileSync(MAP_PATH, JSON.stringify(imageMap, null, 2))
  console.log(`    ✅ ${slug}.jpg (${Math.round(buf.length / 1024)} Ko)`)
}

// Générer séquentiellement (évite les limites de débit)
for (const [slug, [movement, muscle]] of toGenerate) {
  await generateOne(slug, movement, muscle)
}

console.log('\n🎉 Génération terminée.')
