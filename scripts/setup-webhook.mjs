#!/usr/bin/env node
/**
 * Enregistre le webhook Telegram vers le Cloudflare Worker.
 * Usage : TELEGRAM_BOT_TOKEN=xxx BOT_URL=https://muscletraining-bot.xxx.workers.dev node scripts/setup-webhook.mjs
 */
const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const URL   = process.env.BOT_URL

if (!TOKEN || !URL) { console.error('TELEGRAM_BOT_TOKEN et BOT_URL requis'); process.exit(1) }

const r = await fetch(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: URL, allowed_updates: ['message', 'callback_query'] }),
})
const j = await r.json()
console.log('setWebhook:', j.ok ? `✅ ${URL}` : JSON.stringify(j))

// Vérification
const info = await (await fetch(`https://api.telegram.org/bot${TOKEN}/getWebhookInfo`)).json()
console.log('Webhook actuel:', info.result?.url, '| Pending:', info.result?.pending_update_count)
