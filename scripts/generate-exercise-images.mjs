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

// slug → description du mouvement (angle, position, équipement)
const EXERCISES = {
  'developpe-couche-barre':     'muscular athlete lying on a flat bench performing a barbell bench press in a dark gym',
  'developpe-incline-barre':    'muscular athlete lying on a 45-degree incline bench pressing a barbell upward in a dark gym',
  'developpe-couche-halteres':  'muscular athlete lying on a flat bench pressing two dumbbells upward in a dark gym',
  'ecarte-halteres':            'muscular athlete lying on a flat bench performing a dumbbell fly with arms spread wide in a dark gym',
  'pompes':                     'muscular athlete in a push-up position with arms extended on gym floor',
  'pompes-serrees':             'muscular athlete performing close-grip diamond push-ups on gym floor',
  'pompes-declinees':           'muscular athlete performing decline push-ups with feet elevated on a bench in dark gym',
  'pike-push-up':               'muscular athlete performing pike push-up with hips raised high in dark gym',
  'archer-push-up':             'muscular athlete performing archer push-up with one arm extended to the side on gym floor',
  'pseudo-planche-push-up':     'muscular athlete performing pseudo planche push-up with hands turned outward on gym floor',
  'pullover':                   'muscular athlete lying on a flat bench lowering a dumbbell behind head (pullover) in dark gym',
  'skull-crusher':              'muscular athlete lying on a bench lowering a barbell toward forehead (skull crusher) in dark gym',
  'dips':                       'muscular athlete between parallel bars lowering and pushing the body performing dips in dark gym',
  'dips-banc':                  'muscular athlete performing bench dips with hands on a bench and legs extended in dark gym',
  'tractions':                  'muscular athlete hanging from a pull-up bar pulling body upward with overhand grip in dark gym',
  'tractions-supination':       'muscular athlete hanging from a bar performing chin-up with underhand grip in dark gym',
  'souleve-de-terre':           'muscular athlete standing lifting a heavy barbell from the floor with straight back in dark gym',
  'rowing-barre':               'muscular athlete bent forward at 45 degrees performing a bent-over barbell row in dark gym',
  'rowing-haltere':             'muscular athlete with one knee on a bench performing a single-arm dumbbell row in dark gym',
  'tirage-poitrine':            'muscular athlete seated at a lat pulldown machine pulling bar down to chest in dark gym',
  'tirage-horizontal':          'muscular athlete seated at a cable row machine pulling handle toward abdomen in dark gym',
  'tirage-menton':              'muscular athlete standing performing an upright barbell row pulling to chin height in dark gym',
  'superman':                   'muscular athlete lying face down on gym mat raising arms and legs simultaneously (superman exercise)',
  'good-morning':               'muscular athlete standing with barbell on shoulders bending forward performing good morning in dark gym',
  'extension-lombaires':        'muscular athlete on a hyperextension bench performing back extension in dark gym',
  'muscle-up':                  'muscular athlete on a pull-up bar performing a muscle-up explosive pull to push transition in dark gym',
  'skin-the-cat':               'muscular athlete hanging from gymnastics rings performing skin the cat movement in dark gym',
  'front-lever-tuck':           'muscular athlete on a pull-up bar holding a tuck front lever position in dark gym',
  'elevations-laterales':       'muscular athlete standing raising two dumbbells to the sides at shoulder height in dark gym',
  'haussements-epaules':        'muscular athlete standing shrugging shoulders upward with a heavy barbell in dark gym',
  'oiseau-halteres':            'muscular athlete bent forward raising two dumbbells to the sides performing rear delt fly in dark gym',
  'face-pull':                  'muscular athlete pulling a cable rope toward the face at head height in dark gym',
  'curl-barre':                 'muscular athlete standing curling a barbell upward with both arms in dark gym',
  'curl-halteres-alternes':     'muscular athlete standing performing alternating dumbbell curls in dark gym',
  'curl-marteau':               'muscular athlete standing performing hammer curls with neutral grip dumbbells in dark gym',
  'curl-inverse':               'muscular athlete standing performing reverse barbell curl with overhand grip in dark gym',
  'curl-pupitre':               'muscular athlete arms resting on a preacher curl pad curling a barbell upward in dark gym',
  'developpe-militaire':        'muscular athlete standing performing an overhead barbell military press above head in dark gym',
  'developpe-halteres-epaules': 'muscular athlete seated performing an overhead dumbbell shoulder press in dark gym',
  'developpe-arnold':           'muscular athlete seated performing Arnold press with dumbbells rotating wrists in dark gym',
  'hack-squat':                 'muscular athlete on a hack squat machine pushing sled upward at 45 degrees in dark gym',
  'leg-extension':              'muscular athlete seated on a leg extension machine extending legs forward in dark gym',
  'presse-cuisses':             'muscular athlete on a 45-degree leg press machine pushing sled away in dark gym',
  'leg-curl-allonge':           'muscular athlete lying face down on a leg curl machine curling heels toward glutes in dark gym',
  'leg-curl-assis':             'muscular athlete seated on a sitting leg curl machine curling legs downward in dark gym',
  'mollets-assis':              'muscular athlete seated with a barbell across knees performing a seated calf raise in dark gym',
  'mollets-debout':             'muscular athlete standing on a calf raise machine performing standing calf raise in dark gym',
  'squat-barre':                'muscular athlete feet shoulder-width apart performing a barbell back squat in dark gym',
  'squat-goblet':               'muscular athlete standing performing goblet squat holding a kettlebell in front in dark gym',
  'fentes-avant':               'muscular athlete performing forward lunges with dumbbells in dark gym',
  'fentes-bulgares':            'muscular athlete performing Bulgarian split squat with rear foot elevated on bench in dark gym',
  'hip-thrust':                 'muscular athlete performing barbell hip thrust with upper back on bench in dark gym',
  'rdl':                        'muscular athlete performing Romanian deadlift with barbell hinging at hips in dark gym',
  'pistol-squat':               'muscular athlete performing a pistol squat single-leg squat with one leg extended forward in dark gym',
  'planche':                    'muscular athlete holding plank position on gym mat with straight body',
  'planche-laterale':           'muscular athlete holding side plank position on gym mat with one arm',
  'planche-commando':           'muscular athlete performing commando plank alternating forearm to hand in dark gym',
  'crunch':                     'muscular athlete lying on gym mat performing abdominal crunch raising shoulders',
  'mountain-climbers':          'muscular athlete in plank position performing mountain climbers bringing knees to chest on gym mat',
  'releve-de-jambes':           'muscular athlete lying flat performing hanging leg raises holding pull-up bar in dark gym',
  'russian-twist':              'muscular athlete seated on gym mat performing Russian twist with medicine ball',
  'v-up':                       'muscular athlete lying on gym mat performing V-up raising legs and torso simultaneously',
  'ab-wheel-rollout':           'muscular athlete kneeling performing ab wheel rollout extending forward on gym mat',
  'dragon-flag':                'muscular athlete lying on a bench performing dragon flag lowering straight body in dark gym',
  'l-sit':                      'muscular athlete on parallel bars holding L-sit position with legs extended horizontal in dark gym',
  'hollow-body':                'muscular athlete lying on gym mat holding hollow body position with arms and legs raised',
  'pallof-press':               'muscular athlete standing sideways at cable machine performing Pallof press in dark gym',
  'dead-bug':                   'muscular athlete lying on gym mat performing dead bug exercise with opposite arm and leg extended',
  'bird-dog':                   'muscular athlete on all fours performing bird dog extending opposite arm and leg on gym mat',
  'dips-tremplin':              'muscular athlete performing dips on a dip station in dark gym',
  'pompes-diamant':             'muscular athlete performing diamond push-ups with hands forming diamond shape on gym floor',
  'hundred-pilates':            'muscular athlete lying on a mat performing the Pilates hundred exercise legs raised at 45 degrees',
  'roll-up':                    'muscular athlete performing Pilates roll-up slowly rising from lying to seated position on mat',
  'teaser-pilates':             'muscular athlete performing Pilates teaser balancing on tailbone with legs and arms raised',
  'clamshell':                  'muscular athlete lying on side on mat performing clamshell exercise with knees bent',
  'swimming-pilates':           'muscular athlete lying face down on mat performing Pilates swimming exercise alternating arms and legs',
}

const BASE_PROMPT = (movement) =>
  `Professional gym exercise photo: ${movement}. Black tank top and shorts. Dark moody cinematic gym lighting with equipment in background. High quality fitness photography, photorealistic, sharp focus.`

const imageMap = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'))
const targetSlug = process.env.SLUG
const force = process.env.FORCE === '1'

const toGenerate = Object.entries(EXERCISES).filter(([slug]) => {
  if (targetSlug) return slug === targetSlug
  return force || !imageMap[slug]
})

if (!toGenerate.length) { console.log('✅ Toutes les images déjà générées.'); process.exit(0) }
console.log(`📸 ${toGenerate.length} image(s) à générer…`)

async function generateOne(slug, movement) {
  console.log(`  → ${slug}`)
  const prompt = BASE_PROMPT(movement)

  const startRes = await fetch('https://api.developer.pixelcut.ai/v1/images/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': API_KEY },
    body: JSON.stringify({ prompt, model: 'flux-2-klein-4b', aspect_ratio: '4:3', output_format: 'jpg' }),
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

for (const [slug, movement] of toGenerate) {
  await generateOne(slug, movement)
}

console.log('\n🎉 Génération terminée.')
