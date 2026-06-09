#!/usr/bin/env node
/**
 * Génère un nouvel article de blog via l'API Anthropic et l'ajoute à
 * data/generated-articles.json. Lancé par .github/workflows/content.yml (cron).
 *
 * Requis : env ANTHROPIC_API_KEY
 * Optionnel : env ANTHROPIC_MODEL (défaut: claude-sonnet-4-5)
 */
import fs from 'fs'
import path from 'path'

// Fournisseurs (par ordre de préférence) :
//  1. Cloudflare Workers AI — GRATUIT (réutilise CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)
//  2. Google Gemini — gratuit (GOOGLE_API_KEY via AI Studio)
//  3. Anthropic — payant (ANTHROPIC_API_KEY)
const CF_TOKEN = process.env.CF_AI_TOKEN || process.env.CLOUDFLARE_API_TOKEN
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID
const CF_MODEL = process.env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
const GOOGLE_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_MODEL = process.env.GOOGLE_MODEL || 'gemini-2.0-flash'
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5'

if (!CF_TOKEN && !GOOGLE_KEY && !ANTHROPIC_KEY) {
  console.error('❌ Aucun fournisseur configuré (CLOUDFLARE_API_TOKEN+ACCOUNT_ID, GOOGLE_API_KEY ou ANTHROPIC_API_KEY)')
  process.exit(1)
}

const JSON_PATH = path.resolve(process.cwd(), 'data', 'generated-articles.json')
const existing = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'))
const existingSlugs = new Set(existing.map(a => a.slug))

// Banque de sujets longue-traîne (rotation déterministe par semaine)
const TOPICS = [
  'Combien de temps de repos entre les séries selon ton objectif',
  'Prise de masse vs sèche : comment bien choisir',
  'Les erreurs qui ruinent ta progression au développé couché',
  'Full body ou split : quel programme pour quel niveau',
  'Comment progresser au soulevé de terre sans se blesser',
  'Courbatures : faut-il s\'entraîner malgré la douleur',
  'Protéines : combien en consommer pour prendre du muscle',
  'Tempo et contraction : la clé d\'une hypertrophie maximale',
  'Échauffement parfait avant une séance de musculation',
  'Surcharge progressive : le principe n°1 pour progresser',
  'Cardio et musculation : sont-ils compatibles',
  'Combien de séries par muscle et par semaine pour grossir',
  'Sommeil et récupération musculaire : ce qu\'il faut savoir',
  'Débuter la musculation à 40 ans : guide complet',
  'Les meilleurs exercices polyarticulaires et pourquoi',
]
const weekIndex = Math.floor(Date.now() / (7 * 864e5)) % TOPICS.length
let topic = TOPICS[weekIndex]

const prompt = `Tu es rédacteur SEO expert en musculation pour le site français Muscle Training.
Rédige un article de blog complet, original et actionnable sur le sujet : "${topic}".

Réponds UNIQUEMENT avec un objet JSON valide (aucun texte autour) respectant EXACTEMENT ce schéma TypeScript :
{
  "slug": string (kebab-case, sans accents, max 60 car),
  "titre": string (accrocheur, avec mot-clé),
  "description": string (140-160 car),
  "descriptionSeo": string (140-160 car, optimisée recherche),
  "categorie": "Conseils" | "Programmes" | "Nutrition" | "Technique",
  "tempsLecture": number (minutes, 5-10),
  "datePublication": "${new Date().toISOString().slice(0, 10)}",
  "image": "",
  "tags": string[] (3-6 tags pertinents en minuscule),
  "contenu": Section[] où Section = { "type": "h2"|"h3"|"p"|"ul"|"ol"|"tip"|"warning", "content": string | string[] }
}
Règles contenu : 900-1400 mots, 4-6 sections h2, paragraphes denses et concrets, au moins 1 "ul"/"ol", au moins 1 "tip". Ton : expert, direct, tutoiement. Pas de blabla.`

// ── Appels fournisseurs ──────────────────────────────
async function viaCloudflare() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/ai/run/${CF_MODEL}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${CF_TOKEN}` },
    body: JSON.stringify({
      max_tokens: 4096,
      messages: [
        { role: 'system', content: 'Tu réponds uniquement avec du JSON valide, sans texte ni markdown autour.' },
        { role: 'user', content: prompt },
      ],
    }),
  })
  if (!res.ok) throw new Error(`Cloudflare AI ${res.status} ${await res.text()}`)
  const j = await res.json()
  if (!j.success) throw new Error(`Cloudflare AI: ${JSON.stringify(j.errors)}`)
  return j.result?.response || ''
}

async function viaGoogle() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent?key=${GOOGLE_KEY}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 4096 },
    }),
  })
  if (!res.ok) throw new Error(`Google ${res.status} ${await res.text()}`)
  const j = await res.json()
  return j.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

async function viaAnthropic() {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: ANTHROPIC_MODEL, max_tokens: 4096, messages: [{ role: 'user', content: prompt }] }),
  })
  if (!res.ok) throw new Error(`Anthropic ${res.status} ${await res.text()}`)
  const j = await res.json()
  return j.content?.[0]?.text || ''
}

const providers = []
if (CF_TOKEN && CF_ACCOUNT) providers.push(['Cloudflare Workers AI', viaCloudflare])
if (GOOGLE_KEY) providers.push(['Google Gemini', viaGoogle])
if (ANTHROPIC_KEY) providers.push(['Anthropic', viaAnthropic])

let raw = ''
for (const [name, fn] of providers) {
  try {
    console.log(`→ Tentative via ${name}…`)
    raw = await fn()
    if (raw) { console.log(`✓ Réponse obtenue via ${name}`); break }
  } catch (e) {
    console.error(`⚠️ ${name} échec : ${e.message}`)
  }
}
if (!raw) { console.error('❌ Tous les fournisseurs ont échoué'); process.exit(1) }

// Extraction robuste du JSON (gère ```json, texte parasite…)
let text = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
const first = text.indexOf('{'), last = text.lastIndexOf('}')
if (first > 0 || last < text.length - 1) text = text.slice(first, last + 1)

let article
try { article = JSON.parse(text) } catch (e) { console.error('❌ JSON invalide:', e.message, '\n', text.slice(0, 500)); process.exit(1) }

// Validation minimale
const required = ['slug', 'titre', 'description', 'categorie', 'contenu']
for (const k of required) if (!article[k]) { console.error('❌ champ manquant:', k); process.exit(1) }
if (!Array.isArray(article.contenu) || article.contenu.length < 3) { console.error('❌ contenu trop court'); process.exit(1) }

// Slug unique
let slug = String(article.slug).toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
if (existingSlugs.has(slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`
article.slug = slug
article.image = article.image || ''
article.tempsLecture = Number(article.tempsLecture) || 7
article.datePublication = article.datePublication || new Date().toISOString().slice(0, 10)

const updated = [article, ...existing]
fs.writeFileSync(JSON_PATH, JSON.stringify(updated, null, 2) + '\n', 'utf8')
console.log(`✅ Article généré : ${article.titre} (/blog/${slug})`)
