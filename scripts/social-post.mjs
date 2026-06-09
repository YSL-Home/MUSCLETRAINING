#!/usr/bin/env node
/**
 * Publie le dernier article sur les réseaux (copy marketing + image).
 * Lancé par .github/workflows/social.yml quand un nouvel article est généré.
 *
 * Canaux (activés selon les secrets présents) :
 *  - Telegram         : TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID   (image + légende)
 *  - Webhook générique: SOCIAL_WEBHOOK_URL  (variantes par réseau + imageUrl)
 *  - X / Twitter      : X_BEARER_TOKEN       (texte, l'OG image s'affiche via le lien)
 *
 * Aucun secret => no-op propre.
 */
import fs from 'fs'
import path from 'path'

const BASE = 'https://www.muscletraining.uk'
const gen = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'data', 'generated-articles.json'), 'utf8'))
if (!gen.length) { console.log('Aucun article généré à publier.'); process.exit(0) }

const a = gen[0]
const url = `${BASE}/blog/${a.slug}`
const imageUrl = a.image ? (a.image.startsWith('http') ? a.image : BASE + a.image) : `${BASE}/logo-512.png`

const hashtags = (a.tags || []).slice(0, 4).map(t => '#' + String(t).replace(/[^a-z0-9]/gi, '')).join(' ')
const HASH_BASE = '#musculation #fitness #muscu #training'

// Accroches marketing en rotation (déterministe par jour)
const HOOKS = [
  '🔥 Arrête de stagner.',
  '💪 Tu veux des résultats plus vite ?',
  '⚡ 90 % des gens font cette erreur.',
  '🚀 Passe au niveau supérieur.',
  '🎯 Le détail qui change tout :',
  '🧠 Entraîne-toi plus intelligemment.',
]
const hook = HOOKS[Math.floor(Date.now() / 864e5) % HOOKS.length]
const CTA = '👉 Lis le guide complet (gratuit)'

// Variantes par réseau
const captions = {
  // Long, émotionnel — Facebook / Telegram / LinkedIn
  long:
`${hook}

${a.titre}

${a.description}

${CTA} :
${url}

${hashtags} ${HASH_BASE}`,
  // Court, percutant — X / Twitter (≤280)
  x: `${hook} ${a.titre}\n\n${CTA} 👇\n${url}\n${hashtags}`.slice(0, 278),
  // Instagram — visuel, beaucoup de hashtags
  instagram:
`${hook} ${a.titre} 💪

${a.description}

🔗 Lien en bio / ${url}

${hashtags} ${HASH_BASE} #gym #santé #progression #motivation #workout`,
}

let posted = 0

// ── Telegram (photo + légende) ────────────────────────
const TG = process.env.TELEGRAM_BOT_TOKEN, TGC = process.env.TELEGRAM_CHAT_ID
if (TG && TGC) {
  try {
    const endpoint = `https://api.telegram.org/bot${TG}/sendPhoto`
    const r = await fetch(endpoint, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: TGC, photo: imageUrl, caption: captions.long }),
    })
    console.log('Telegram:', r.status); posted++
  } catch (e) { console.error('Telegram échec:', e.message) }
}

// ── Webhook générique (Buffer/Make/Zapier) ────────────
const WH = process.env.SOCIAL_WEBHOOK_URL
if (WH) {
  try {
    const r = await fetch(WH, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: a.titre, description: a.description, url, imageUrl,
        hook, cta: CTA, hashtags: `${hashtags} ${HASH_BASE}`,
        captions, // { long, x, instagram }
      }),
    })
    console.log('Webhook:', r.status); posted++
  } catch (e) { console.error('Webhook échec:', e.message) }
}

// ── X / Twitter (texte ; le lien déplie l'image OG) ───
const XT = process.env.X_BEARER_TOKEN
if (XT) {
  try {
    const r = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${XT}` },
      body: JSON.stringify({ text: captions.x }),
    })
    console.log('X:', r.status); posted++
  } catch (e) { console.error('X échec:', e.message) }
}

console.log(posted ? `✅ Publié sur ${posted} canal/canaux.` : 'ℹ️ Aucun secret réseau configuré — rien publié.')
