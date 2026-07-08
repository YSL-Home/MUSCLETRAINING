#!/usr/bin/env node
/**
 * Génère les photos IA pour chaque exercice (style gym photo réaliste, fond sombre).
 * Utilise l'API Pixelcut avec le modèle flux-2-klein-4b (1 crédit/image).
 * Enregistre dans public/exercise-images/<slug>.jpg + met à jour data/exercise-images.json.
 *
 * Usage : PIXELCUT_API_KEY=xxx node scripts/generate-exercise-images.mjs
 * Ou cibler un exercice : SLUG=rowing-barre node scripts/generate-exercise-images.mjs
 * Forcer la régénération : FORCE=1 node scripts/generate-exercise-images.mjs
 */
import fs from 'fs'
import path from 'path'

const API_KEY = process.env.PIXELCUT_API_KEY
if (!API_KEY) { console.error('❌ PIXELCUT_API_KEY manquant'); process.exit(1) }

const OUT_DIR = path.resolve(process.cwd(), 'public', 'exercise-images')
const MAP_PATH = path.resolve(process.cwd(), 'data', 'exercise-images.json')
fs.mkdirSync(OUT_DIR, { recursive: true })

// slug → [description du mouvement, muscle ciblé en rouge]
const EXERCISES = {
  'developpe-couche-barre':     ['lying on a flat bench performing a barbell bench press', 'pectoral muscles (chest)'],
  'developpe-incline-barre':    ['lying on a 45° incline bench pressing a barbell upward', 'upper pectoral muscles'],
  'developpe-couche-halteres':  ['lying on a flat bench pressing two dumbbells upward', 'pectoral muscles (chest)'],
  'ecarte-halteres':            ['lying on a flat bench performing a dumbbell fly, arms spread wide', 'pectoral muscles (chest)'],
  'pompes':                     ['in a push-up position, arms fully extended', 'pectoral muscles (chest)'],
  'pompes-serrees':             ['performing close-grip diamond push-ups', 'triceps brachii'],
  'pompes-declinees':           ['performing decline push-ups with feet elevated on a bench', 'upper pectoral muscles'],
  'pike-push-up':               ['performing a pike push-up with hips raised high', 'anterior deltoid (front shoulder)'],
  'archer-push-up':             ['performing an archer push-up with one arm extended to the side', 'pectoral muscles'],
  'pseudo-planche-push-up':     ['performing a pseudo planche push-up with hands turned outward', 'pectoral muscles and anterior deltoid'],
  'pullover':                   ['lying on a flat bench lowering a dumbbell behind head (pullover)', 'latissimus dorsi (lats)'],
  'skull-crusher':              ['lying on a bench lowering a barbell toward forehead (skull crusher)', 'triceps brachii'],
  'dips':                       ['between parallel bars lowering and pushing the body (dips)', 'triceps brachii'],
  'dips-banc':                  ['performing bench dips with hands on a bench, legs extended', 'triceps brachii'],
  'tractions':                  ['hanging from a pull-up bar pulling body upward, overhand grip', 'latissimus dorsi (lats)'],
  'tractions-supination':       ['hanging from a bar pulling body upward, underhand grip (chin-up)', 'latissimus dorsi and biceps'],
  'souleve-de-terre':           ['standing lifting a barbell from the floor with straight back', 'hamstrings and erector spinae'],
  'rowing-barre':               ['bent forward at 45° performing a bent-over barbell row', 'latissimus dorsi and upper back'],
  'rowing-haltere':             ['one knee on a bench performing a single-arm dumbbell row', 'latissimus dorsi'],
  'tirage-poitrine':            ['seated at a lat pulldown machine pulling bar down to chest', 'latissimus dorsi (lats)'],
  'tirage-horizontal':          ['seated at a cable row machine pulling handle toward abdomen', 'latissimus dorsi and rhomboids'],
  'tirage-menton':              ['standing performing an upright barbell row pulling to chin height', 'lateral deltoid and trapezius'],
  'superman':                   ['lying face down raising arms and legs simultaneously (superman)', 'erector spinae (lower back)'],
  'good-morning':               ['standing with barbell on shoulders bending forward (good morning)', 'erector spinae and hamstrings'],
  'extension-lombaires':        ['on a hyperextension bench performing back extension', 'erector spinae (lower back)'],
  'muscle-up':                  ['on a pull-up bar performing an explosive muscle-up', 'latissimus dorsi and triceps'],
  'skin-the-cat':               ['hanging from gymnastics rings performing skin the cat', 'latissimus dorsi and serratus'],
  'front-lever-tuck':           ['on a pull-up bar holding a tuck front lever position', 'latissimus dorsi and abs'],
  'elevations-laterales':       ['standing raising two dumbbells to the sides at shoulder height', 'lateral deltoid (side shoulder)'],
  'haussements-epaules':        ['standing shrugging shoulders upward with a heavy barbell', 'trapezius muscles'],
  'oiseau-halteres':            ['bent forward raising two dumbbells to the sides (rear delt fly)', 'posterior deltoid (rear shoulder)'],
  'face-pull':                  ['pulling a cable rope toward the face at head height', 'posterior deltoid and upper trapezius'],
  'curl-barre':                 ['standing curling a barbell upward with both arms', 'biceps brachii'],
  'curl-halteres-alternes':     ['standing performing alternating dumbbell curls', 'biceps brachii'],
  'curl-marteau':               ['standing performing hammer curls with neutral grip dumbbells', 'brachioradialis and biceps'],
  'curl-inverse':               ['standing performing reverse barbell curl with overhand grip', 'brachioradialis and forearms'],
  'curl-pupitre':               ['arms on a preacher curl pad curling a barbell upward', 'biceps brachii'],
  'developpe-militaire':        ['standing performing an overhead barbell press above head', 'anterior deltoid (front shoulder)'],
  'developpe-halteres-epaules': ['seated performing an overhead dumbbell shoulder press', 'deltoid muscles (shoulders)'],
  'developpe-arnold':           ['seated performing Arnold press rotating dumbbells', 'deltoid muscles (all three heads)'],
  'hack-squat':                 ['on a hack squat machine pushing sled upward at 45°', 'quadriceps (front of thighs)'],
  'leg-extension':              ['seated on a leg extension machine extending legs forward', 'quadriceps (front of thighs)'],
  'presse-cuisses':             ['on a 45° leg press machine pushing sled away', 'quadriceps and glutes'],
  'leg-curl-allonge':           ['lying face down on a leg curl machine curling heels toward glutes', 'hamstrings (back of thighs)'],
  'leg-curl-assis':             ['seated on a sitting leg curl machine curling legs downward', 'hamstrings (back of thighs)'],
  'mollets-assis':              ['seated with a barbell across knees performing seated calf raise', 'soleus (calf muscles)'],
  'mollets-debout':             ['standing on a calf raise machine performing standing calf raise', 'gastrocnemius (calf muscles)'],
  'squat-barre':                ['feet shoulder-width apart performing a barbell back squat', 'quadriceps (front of thighs)'],
  'squat-goblet':               ['standing performing goblet squat holding a kettlebell in front', 'quadriceps and glutes'],
  'fentes-avant':               ['performing forward lunges with dumbbells', 'quadriceps and glutes'],
  'fentes-bulgares':            ['performing Bulgarian split squat with rear foot elevated on bench', 'quadriceps and glutes'],
  'hip-thrust':                 ['performing barbell hip thrust with upper back on bench', 'gluteus maximus (glutes)'],
  'rdl':                        ['performing Romanian deadlift with barbell hinging at hips', 'hamstrings and gluteus maximus'],
  'pistol-squat':               ['performing a pistol squat, one leg extended forward', 'quadriceps and glutes'],
  'planche':                    ['holding plank position with straight body', 'core muscles (abdominals and obliques)'],
  'planche-laterale':           ['holding side plank position on one arm', 'obliques (side core muscles)'],
  'planche-commando':           ['performing commando plank alternating forearm to hand', 'core muscles and shoulders'],
  'crunch':                     ['lying on mat performing abdominal crunch raising shoulders', 'rectus abdominis (abs)'],
  'mountain-climbers':          ['in plank position performing mountain climbers bringing knees to chest', 'core muscles and hip flexors'],
  'releve-de-jambes':           ['hanging from a pull-up bar performing leg raises', 'rectus abdominis (lower abs)'],
  'russian-twist':              ['seated on mat performing Russian twist with medicine ball', 'obliques (side core muscles)'],
  'v-up':                       ['lying on mat performing V-up raising legs and torso simultaneously', 'rectus abdominis (abs)'],
  'ab-wheel-rollout':           ['kneeling performing ab wheel rollout extending forward', 'rectus abdominis and core'],
  'dragon-flag':                ['lying on a bench performing dragon flag lowering straight body', 'rectus abdominis (entire core)'],
  'l-sit':                      ['on parallel bars holding L-sit with legs extended horizontal', 'rectus abdominis and hip flexors'],
  'hollow-body':                ['lying on mat holding hollow body with arms and legs raised', 'core muscles (abs)'],
  'pallof-press':               ['standing sideways at cable machine performing Pallof press', 'obliques and core stabilizers'],
  'dead-bug':                   ['lying on mat performing dead bug with opposite arm and leg extended', 'core muscles (transverse abdominis)'],
  'bird-dog':                   ['on all fours extending opposite arm and leg (bird dog)', 'erector spinae and core'],
  'dips-tremplin':              ['performing dips on a dip station', 'triceps brachii and pectoral muscles'],
  'pompes-diamant':             ['performing diamond push-ups with hands forming diamond shape', 'triceps brachii'],
  'hundred-pilates':            ['lying on mat performing Pilates hundred, legs raised at 45°', 'rectus abdominis (abs)'],
  'roll-up':                    ['performing Pilates roll-up rising from lying to seated', 'rectus abdominis (abs)'],
  'teaser-pilates':             ['performing Pilates teaser balancing on tailbone, legs and arms raised', 'rectus abdominis and hip flexors'],
  'clamshell':                  ['lying on side on mat performing clamshell with knees bent', 'gluteus medius (outer glutes)'],
  'swimming-pilates':           ['lying face down performing Pilates swimming alternating arms and legs', 'erector spinae and gluteus maximus'],
}

const BASE_PROMPT = (movement, muscle) =>
  `3D CGI fitness illustration. A fully gray matte plastic mannequin character (completely gray from head to toe, seamless anatomy model) wearing a black fitted tank top and black shorts, ${movement}. Warm beige sandy gym room background with subtle equipment visible. ONLY the ${muscle} is highlighted in bright crimson red #E63946. Every other body part remains flat gray matte. Professional fitness poster lighting. Photorealistic 3D CGI render. Portrait 9:16.`

const imageMap = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'))
const targetSlug = process.env.SLUG
const force = process.env.FORCE === '1'

const toGenerate = Object.entries(EXERCISES).filter(([slug]) => {
  if (targetSlug) return slug === targetSlug
  return force || !imageMap[slug]
})

if (!toGenerate.length) { console.log('✅ Toutes les images déjà générées.'); process.exit(0) }
console.log(`📸 ${toGenerate.length} image(s) à générer…`)

async function generateOne(slug, movement, muscle) {
  console.log(`  → ${slug}`)
  const prompt = BASE_PROMPT(movement, muscle)

  const startRes = await fetch('https://api.developer.pixelcut.ai/v1/images/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': API_KEY },
    body: JSON.stringify({ prompt, model: 'imagen-4-ultra', aspect_ratio: '9:16', output_format: 'jpg' }),
  })
  if (!startRes.ok) {
    const err = await startRes.text()
    console.error(`    ❌ ${slug}: HTTP ${startRes.status} — ${err}`)
    return
  }
  const job = await startRes.json()
  const jobId = job.id || job.job_id
  if (!jobId) { console.error(`    ❌ ${slug}: pas de job_id`, job); return }

  // Poll toutes les 3s, max 60s
  let asset_url = null
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 3000))
    const poll = await fetch(`https://api.developer.pixelcut.ai/v1/jobs/${jobId}`, {
      headers: { 'X-API-KEY': API_KEY },
    })
    const data = await poll.json()
    if (data.status === 'completed') { asset_url = data.output?.[0]?.url || data.url; break }
    if (data.status === 'failed') { console.error(`    ❌ ${slug}: job failed`, data); return }
  }
  if (!asset_url) { console.error(`    ❌ ${slug}: timeout`); return }

  const imgRes = await fetch(asset_url)
  if (!imgRes.ok) { console.error(`    ❌ ${slug}: download failed`); return }
  const buf = Buffer.from(await imgRes.arrayBuffer())
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.jpg`), buf)

  imageMap[slug] = `/exercise-images/${slug}.jpg`
  fs.writeFileSync(MAP_PATH, JSON.stringify(imageMap, null, 2))
  console.log(`    ✅ ${slug}.jpg (${Math.round(buf.length / 1024)} Ko)`)
}

for (const [slug, [movement, muscle]] of toGenerate) {
  await generateOne(slug, movement, muscle)
}

console.log('\n🎉 Génération terminée.')
