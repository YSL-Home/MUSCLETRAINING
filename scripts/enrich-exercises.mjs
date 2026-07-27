#!/usr/bin/env node
/**
 * Génère des introductions riches (300-500 mots) pour chaque exercice
 * et les stocke dans data/exercise-intros.json.
 *
 * Usage : node scripts/enrich-exercises.mjs [--slug developpé-couché-barre] [--batch 10]
 * Requis : ANTHROPIC_API_KEY ou GOOGLE_API_KEY ou CF_AI_TOKEN+CLOUDFLARE_ACCOUNT_ID
 */
import fs from 'fs'
import path from 'path'

const ANTHROPIC_KEY  = process.env.ANTHROPIC_API_KEY
const GOOGLE_KEY     = process.env.GOOGLE_API_KEY
const GOOGLE_MODEL   = process.env.GOOGLE_MODEL || 'gemini-2.0-flash'
const CF_TOKEN       = process.env.CF_AI_TOKEN || process.env.CLOUDFLARE_API_TOKEN
const CF_ACCOUNT     = process.env.CLOUDFLARE_ACCOUNT_ID
const CF_MODEL       = process.env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001'

const args = process.argv.slice(2)
const targetSlug = args[args.indexOf('--slug') + 1] || null
const batchSize = parseInt(args[args.indexOf('--batch') + 1] || '88', 10)

const EXERCISES_PATH = path.resolve('data', 'exercises.ts')
const OUT_PATH = path.resolve('data', 'exercise-intros.json')

// Parse slugs + basic data from exercises.ts (regex, avoids ts compilation)
const src = fs.readFileSync(EXERCISES_PATH, 'utf8')
const exerciseBlocks = []
const slugRe = /slug:\s*'([^']+)'/g
const nomRe = /nom:\s*'([^']+)'/g
const descRe = /descriptionCourte:\s*'([^']+)'/g
const musclesRe = /musclesPrimaires:\s*\[([^\]]+)\]/g
const difficultRe = /difficulte:\s*'([^']+)'/g
const modeRe = /mode:\s*'([^']+)'/g
const instrRe = /instructions:\s*\[([^\]]+?)\]/gs
const errRe = /erreurs:\s*\[([^\]]+?)\]/gs
const consRe = /conseils:\s*\[([^\]]+?)\]/gs

function extractStrings(block, re) {
  const m = block.match(re)
  if (!m) return []
  return [...m[0].matchAll(/'([^']+)'/g)].map(x => x[1])
}

// Split into exercise objects by slug blocks
const exBlocks = src.split(/(?=\{\s*\n\s*slug:)/).slice(1)
for (const block of exBlocks) {
  const slug = (block.match(/slug:\s*'([^']+)'/) || [])[1]
  const nom = (block.match(/nom:\s*'([^']+)'/) || [])[1]
  const desc = (block.match(/descriptionCourte:\s*'([^']+)'/) || [])[1]
  const difficulte = (block.match(/difficulte:\s*'([^']+)'/) || [])[1]
  const mode = (block.match(/mode:\s*'([^']+)'/) || [])[1]
  const muscles = [...(block.match(/musclesPrimaires:\s*\[([^\]]+)\]/) || [''])[0].matchAll(/'([^']+)'/g)].map(x => x[1])
  const instructions = [...(block.match(/instructions:\s*\[([^\]]*?)\]/s) || [''])[0].matchAll(/'([^']+)'/g)].map(x => x[1])
  const erreurs = [...(block.match(/erreurs:\s*\[([^\]]*?)\]/s) || [''])[0].matchAll(/'([^']+)'/g)].map(x => x[1])
  const conseils = [...(block.match(/conseils:\s*\[([^\]]*?)\]/s) || [''])[0].matchAll(/'([^']+)'/g)].map(x => x[1])
  if (slug && nom) {
    exerciseBlocks.push({ slug, nom, desc: desc || '', difficulte: difficulte || '', mode: mode || '', muscles, instructions, erreurs, conseils })
  }
}

console.log(`📋 ${exerciseBlocks.length} exercices trouvés`)

// Load existing intros
let existing = {}
if (fs.existsSync(OUT_PATH)) {
  existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'))
}

// Filter
let toProcess = exerciseBlocks.filter(e => !existing[e.slug])
if (targetSlug) toProcess = exerciseBlocks.filter(e => e.slug === targetSlug)
toProcess = toProcess.slice(0, batchSize)

if (toProcess.length === 0) {
  console.log('✅ Tous les exercices ont déjà une introduction.')
  process.exit(0)
}

console.log(`⚡ ${toProcess.length} exercices à enrichir`)

// LLM callers
async function viaAnthropic(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`)
  const j = await res.json()
  return j.content[0].text
}

async function viaGoogle(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent?key=${GOOGLE_KEY}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  })
  if (!res.ok) throw new Error(`Google ${res.status}: ${await res.text()}`)
  const j = await res.json()
  return j.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

async function viaCloudflare(prompt) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/ai/run/${CF_MODEL}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${CF_TOKEN}` },
    body: JSON.stringify({ max_tokens: 2048, messages: [
      { role: 'system', content: 'Expert en musculation. Réponds directement sans intro.' },
      { role: 'user', content: prompt },
    ]}),
  })
  if (!res.ok) throw new Error(`Cloudflare ${res.status}: ${await res.text()}`)
  const j = await res.json()
  return j.result?.response || ''
}

async function generate(prompt) {
  if (ANTHROPIC_KEY) return viaAnthropic(prompt)
  if (GOOGLE_KEY) return viaGoogle(prompt)
  if (CF_TOKEN && CF_ACCOUNT) return viaCloudflare(prompt)
  throw new Error('Aucune clé API configurée')
}

function buildPrompt(ex) {
  const diff = ex.difficulte === 'debutant' ? 'débutant' : ex.difficulte === 'intermediaire' ? 'intermédiaire' : 'avancé'
  const lieu = ex.mode === 'salle' ? 'en salle' : ex.mode === 'maison' ? 'à la maison' : 'en salle ou à la maison'
  return `Tu es rédacteur expert en musculation pour Muscle Training, site de référence francophone.

Exercice : ${ex.nom}
Muscle(s) primaire(s) : ${ex.muscles.join(', ')}
Niveau : ${diff}
Lieu : ${lieu}
Description courte : ${ex.desc}
Instructions : ${ex.instructions.slice(0, 4).join(' | ')}

Rédige une INTRODUCTION ÉDITORIALE COMPLÈTE pour la page de cet exercice.
Elle doit faire 380-500 mots, être structurée en 4-5 paragraphes denses, et couvrir :
1. Pourquoi cet exercice est incontournable (bénéfices, muscles, transfert sportif)
2. Anatomie et biomécanique (muscles recrutés, comment ils travaillent)
3. Pour qui c'est fait (niveaux, objectifs, qui en bénéficie le plus)
4. Variantes et progression (comment progresser ou régresser)
5. Un conseil clé d'expert souvent méconnu

Règles : ton expert et direct, tutoiement, langage de pratiquant, pas de liste à puces (paragraphes uniquement), pas de titre/sous-titre, pas d'introduction genre "Dans cet article...". Commence directement par une phrase accrocheuse sur l'exercice.

Réponds uniquement avec le texte de l'introduction, rien d'autre.`
}

// Process
let saved = 0
for (const ex of toProcess) {
  try {
    process.stdout.write(`  ⏳ ${ex.nom}...`)
    const intro = await generate(buildPrompt(ex))
    const cleaned = intro.replace(/^["']|["']$/g, '').trim()
    if (cleaned.length < 200) throw new Error(`Trop court (${cleaned.length} chars)`)
    existing[ex.slug] = cleaned
    fs.writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2))
    saved++
    console.log(` ✅ ${cleaned.split(' ').length} mots`)
    // Délai pour éviter rate limit
    if (toProcess.indexOf(ex) < toProcess.length - 1) {
      await new Promise(r => setTimeout(r, 800))
    }
  } catch (err) {
    console.log(` ❌ ${err.message}`)
  }
}

console.log(`\n✅ ${saved}/${toProcess.length} introductions générées → ${OUT_PATH}`)
