#!/usr/bin/env node
/**
 * Publie le dernier article sur les réseaux dont les secrets sont présents.
 * Lancé par .github/workflows/social.yml quand un nouvel article est généré.
 *
 * Canaux supportés (activés si le(s) secret(s) existent) :
 *  - Telegram        : TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 *  - Webhook générique: SOCIAL_WEBHOOK_URL   (Buffer/Make/Zapier → X, IG, FB, LinkedIn…)
 *  - X / Twitter      : X_BEARER_TOKEN        (API v2, POST /2/tweets)
 *
 * Aucun secret => no-op (sortie propre).
 */
import fs from 'fs'
import path from 'path'

const BASE = 'https://www.muscletraining.uk'
const gen = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'data', 'generated-articles.json'), 'utf8'))
if (!gen.length) { console.log('Aucun article généré à publier.'); process.exit(0) }

const a = gen[0]
const url = `${BASE}/blog/${a.slug}`
const tags = (a.tags || []).slice(0, 4).map(t => '#' + String(t).replace(/[^a-z0-9]/gi, '')).join(' ')
const caption = `💪 ${a.titre}\n\n${a.description}\n\n👉 ${url}\n${tags}`

let posted = 0

// ── Telegram ──────────────────────────────────────────
const TG = process.env.TELEGRAM_BOT_TOKEN, TGC = process.env.TELEGRAM_CHAT_ID
if (TG && TGC) {
  try {
    const r = await fetch(`https://api.telegram.org/bot${TG}/sendMessage`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: TGC, text: caption, disable_web_page_preview: false }),
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
      body: JSON.stringify({ title: a.titre, description: a.description, url, tags: a.tags, caption }),
    })
    console.log('Webhook:', r.status); posted++
  } catch (e) { console.error('Webhook échec:', e.message) }
}

// ── X / Twitter (API v2) ──────────────────────────────
const XT = process.env.X_BEARER_TOKEN
if (XT) {
  try {
    const tweet = `💪 ${a.titre}\n${url}\n${tags}`.slice(0, 280)
    const r = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${XT}` },
      body: JSON.stringify({ text: tweet }),
    })
    console.log('X:', r.status); posted++
  } catch (e) { console.error('X échec:', e.message) }
}

console.log(posted ? `✅ Publié sur ${posted} canal/canaux.` : 'ℹ️ Aucun secret réseau configuré — rien publié.')
