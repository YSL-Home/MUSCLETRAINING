#!/usr/bin/env node
/**
 * Génère un LOT d'articles fondateurs (texte + image) via Cloudflare Workers AI.
 * Résumable : relancer reprend là où ça s'est arrêté (skip slugs existants).
 *
 * Env : CF_AI_TOKEN (ou CLOUDFLARE_API_TOKEN) + CLOUDFLARE_ACCOUNT_ID
 * Usage : node scripts/generate-batch.mjs
 */
import fs from 'fs'
import path from 'path'

const CF_TOKEN = process.env.CF_AI_TOKEN || process.env.CLOUDFLARE_API_TOKEN
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID
const CF_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
if (!CF_TOKEN || !CF_ACCOUNT) { console.error('❌ CF_AI_TOKEN + CLOUDFLARE_ACCOUNT_ID requis'); process.exit(1) }

const TOPICS = [
  'Programme prise de masse pour débutant : guide complet',
  'Combien de protéines par jour pour prendre du muscle',
  'Full body ou split : quel programme choisir selon ton niveau',
  'Combien de fois par semaine s\'entraîner pour progresser',
  'Sèche : comment perdre du gras sans perdre de muscle',
  'Les 10 erreurs de débutant en musculation à éviter',
  'Surcharge progressive : la clé n°1 de la prise de muscle',
  'Temps de repos entre les séries selon ton objectif',
  'Comment construire son propre programme de musculation',
  'Musculation à la maison sans matériel : par où commencer',
  'Whey, caséine, créatine : quels compléments sont vraiment utiles',
  'Combien de séries et répétitions pour la masse, la force ou l\'endurance',
  'Récupération musculaire : sommeil, nutrition et repos',
  'Comment gagner en force rapidement : méthodes éprouvées',
  'Débuter la musculation après 40 ans : guide pratique',
  'Cardio et musculation : comment les combiner intelligemment',
  'Échauffement avant la musculation : routine complète',
  'Prise de masse propre : nutrition et entraînement',
]

const JSON_PATH = path.resolve(process.cwd(), 'data', 'generated-articles.json')
const existing = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'))
const existingSlugs = new Set(existing.map(a => a.slug))

const slugify = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)

async function cfText(prompt) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/ai/run/${CF_MODEL}`
  const res = await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${CF_TOKEN}` },
    body: JSON.stringify({ max_tokens: 4096, messages: [
      { role: 'system', content: 'Tu réponds uniquement avec du JSON valide, sans texte ni markdown autour.' },
      { role: 'user', content: prompt }] }),
  })
  if (!res.ok) throw new Error(`text ${res.status} ${await res.text()}`)
  const j = await res.json()
  const r = j.result?.response
  return typeof r === 'string' ? r : JSON.stringify(r)
}

async function cfImage(article, slug) {
  try {
    const theme = (article.tags || []).slice(0, 2).join(' ') || 'musculation'
    const prompt = `Cinematic fitness action photograph, close-up of a muscular athlete mid-exercise with a barbell and weight plates in a dark modern gym, theme: ${theme}. Dramatic rim lighting, deep shadows, subtle red accent glow, sweat, shallow depth of field, photorealistic, 35mm. ABSOLUTELY NO TEXT, no letters, no words, no numbers, no captions, no titles, no typography, no logo, no watermark, no poster layout, no border.`
    const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/ai/run/@cf/black-forest-labs/flux-1-schnell`
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${CF_TOKEN}` }, body: JSON.stringify({ prompt: prompt.slice(0, 2048), steps: 8 }) })
    if (!res.ok) throw new Error(`${res.status}`)
    const j = await res.json()
    const b64 = j.result?.image
    if (!b64) throw new Error('no image')
    fs.mkdirSync(path.resolve(process.cwd(), 'public', 'blog'), { recursive: true })
    fs.writeFileSync(path.resolve(process.cwd(), 'public', 'blog', `${slug}.jpg`), Buffer.from(b64, 'base64'))
    return `/blog/${slug}.jpg`
  } catch (e) { console.error('  ⚠️ image:', e.message); return '' }
}

let made = 0
for (const topic of TOPICS) {
  const guess = slugify(topic)
  if ([...existingSlugs].some(s => s === guess)) { console.log('⏭️  existe déjà:', guess); continue }

  const prompt = `Tu es rédacteur SEO expert en musculation pour le site français Muscle Training.
Rédige un article de blog complet, original et actionnable sur : "${topic}".
Réponds UNIQUEMENT avec un objet JSON valide respectant ce schéma :
{"slug":string(kebab-case sans accents max 60),"titre":string,"description":string(140-160),"descriptionSeo":string(140-160),"categorie":"Conseils"|"Programmes"|"Nutrition"|"Technique","tempsLecture":number(5-10),"datePublication":"${new Date().toISOString().slice(0,10)}","image":"","tags":string[](3-6 minuscule),"contenu":[{"type":"h2"|"h3"|"p"|"ul"|"ol"|"tip"|"warning","content":string|string[]}]}
Règles : 900-1400 mots, 4-6 sections h2, paragraphes denses, au moins 1 ul/ol et 1 tip. Ton expert, tutoiement. Pas de blabla.`

  try {
    let raw = await cfText(prompt)
    if (typeof raw !== 'string') raw = JSON.stringify(raw)
    let text = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const f = text.indexOf('{'), l = text.lastIndexOf('}')
    if (f > 0 || l < text.length - 1) text = text.slice(f, l + 1)
    const article = JSON.parse(text)
    if (!article.titre || !Array.isArray(article.contenu) || article.contenu.length < 3) throw new Error('contenu invalide')

    let slug = slugify(article.slug || topic)
    if (existingSlugs.has(slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`
    article.slug = slug
    article.tempsLecture = Number(article.tempsLecture) || 7
    article.datePublication = article.datePublication || new Date().toISOString().slice(0, 10)
    article.image = await cfImage(article, slug)

    existing.unshift(article)
    existingSlugs.add(slug)
    fs.writeFileSync(JSON_PATH, JSON.stringify(existing, null, 2) + '\n')
    made++
    console.log(`✅ ${made}. ${article.titre} (/blog/${slug})${article.image ? ' 🖼️' : ''}`)
  } catch (e) {
    console.error(`❌ "${topic}":`, e.message)
  }
}
console.log(`\n🎉 ${made} nouveaux articles. Total: ${existing.length}`)
