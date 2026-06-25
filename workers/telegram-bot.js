/**
 * Cloudflare Worker — Bot Telegram Muscle Training
 * Répond aux DMs : /start /programme /conseil
 * Envoie les PDFs par objectif directement en fichier.
 * Secrets requis : TELEGRAM_BOT_TOKEN
 */
const SITE = 'https://www.muscletraining.uk'
const CHANNEL = 'https://t.me/muscletrainiing'

const PDFS = {
  'full-body':  { slug: 'full-body-parfait',  label: '🏋️ Full Body Parfait',  sub: '4 jours/semaine · salle' },
  'ppl':        { slug: 'push-pull-legs',     label: '📐 Push Pull Legs',      sub: '3 jours · hypertrophie' },
  'haut-bas':   { slug: 'haut-bas',           label: '⬆️ Haut / Bas',         sub: '2 jours · force & volume' },
  'pecs':       { slug: 'seance-pectoraux',   label: '💪 Pectoraux',           sub: '6 exercices poitrine' },
  'dos':        { slug: 'seance-dos',         label: '🏔️ Dos',                sub: '6 exercices dos large' },
  'bras':       { slug: 'seance-bras',        label: '💪 Bras',                sub: 'biceps & triceps' },
  'jambes':     { slug: 'seance-jambes',      label: '🦵 Jambes',             sub: 'quadri & ischio' },
  'epaules':    { slug: 'seance-epaules',     label: '🎯 Épaules',            sub: '6 exercices deltoïdes' },
}

const CONSEILS = [
  '💪 Progresse en ajoutant 2,5 kg ou 1 rep par semaine — la surcharge progressive est la clé de la croissance musculaire.',
  '😴 La croissance musculaire se produit pendant le sommeil. Dors 7-9h par nuit pour maximiser tes gains.',
  '🥩 Vise 1,6 à 2,2 g de protéines par kg de poids de corps. Étale-les sur 3-4 repas.',
  '⏱️ Le temps de repos optimal : 2-3 min sur les exercices de base (squat, soulevé, développé), 60-90s sur les isolations.',
  '🔁 La fréquence bat l\'intensité : toucher chaque muscle 2x/semaine est plus efficace qu\'une séance musclée 1x.',
  '💧 Déshydraté à 2%, ta force chute de 10-15%. Bois 3L d\'eau les jours d\'entraînement.',
  '📊 Note tes séances. Ce qui se mesure s\'améliore. Une app ou un carnet — peu importe, note tout.',
  '🍌 Mange des glucides avant et après l\'entraînement. Le glycogène musculaire = le carburant de ta séance.',
  '🧘 Un échauffement de 5 min réduit les blessures de 50% et améliore tes perfs. Ne le saute pas.',
  '📸 Prends une photo de progression toutes les 4 semaines — les changements sont trop lents à voir au quotidien.',
]

async function api(token, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return r.json()
}

async function sendMsg(token, chatId, text, extra = {}) {
  return api(token, 'sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', ...extra })
}

async function sendPdf(token, chatId, key) {
  const p = PDFS[key]
  if (!p) return
  return api(token, 'sendDocument', {
    chat_id: chatId,
    document: `${SITE}/downloads/programme-${p.slug}.pdf`,
    caption: `🎁 <b>${p.label}</b>\n${p.sub}\n\n📋 Programme complet : ${SITE}/programmes\n🔔 Canal : ${CHANNEL}`,
    parse_mode: 'HTML',
  })
}

function programmeKeyboard() {
  return {
    inline_keyboard: [
      [{ text: '🏋️ Full Body', callback_data: 'pdf:full-body' }, { text: '📐 Push Pull Legs', callback_data: 'pdf:ppl' }],
      [{ text: '⬆️ Haut / Bas', callback_data: 'pdf:haut-bas' }, { text: '💪 Pectoraux', callback_data: 'pdf:pecs' }],
      [{ text: '🏔️ Dos', callback_data: 'pdf:dos' }, { text: '💪 Bras', callback_data: 'pdf:bras' }],
      [{ text: '🦵 Jambes', callback_data: 'pdf:jambes' }, { text: '🎯 Épaules', callback_data: 'pdf:epaules' }],
    ],
  }
}

async function handleUpdate(update, token) {
  // Callback query (bouton inline)
  if (update.callback_query) {
    const { id, data, message } = update.callback_query
    const chatId = message.chat.id
    if (data.startsWith('pdf:')) await sendPdf(token, chatId, data.slice(4))
    await api(token, 'answerCallbackQuery', { callback_query_id: id })
    return
  }

  const msg = update.message
  if (!msg) return
  const chatId = msg.chat.id
  const text = (msg.text || '').trim()
  const cmd = text.split(' ')[0].toLowerCase().replace(/@\S+/, '')

  if (cmd === '/start') {
    await sendMsg(token, chatId,
      `👋 <b>Bienvenue sur Muscle Training !</b>\n\nJe t'envoie ton programme PDF gratuit — choisis ton objectif 👇`,
      { reply_markup: programmeKeyboard() }
    )
  } else if (cmd === '/programme' || cmd === '/pdf') {
    await sendMsg(token, chatId,
      `💪 <b>Quel est ton objectif ?</b>`,
      { reply_markup: programmeKeyboard() }
    )
  } else if (cmd === '/conseil') {
    const tip = CONSEILS[Math.floor(Math.random() * CONSEILS.length)]
    await sendMsg(token, chatId, tip)
  } else if (cmd === '/aide' || cmd === '/help') {
    await sendMsg(token, chatId,
      `<b>Commandes disponibles :</b>\n\n/programme — Reçois ton PDF gratuit\n/conseil — Conseil aléatoire\n\n📋 Site : ${SITE}\n📣 Canal : ${CHANNEL}`
    )
  } else {
    await sendMsg(token, chatId,
      `👋 Utilise /programme pour recevoir ton PDF gratuit ou /conseil pour un conseil.\n\n📣 Rejoins le canal : ${CHANNEL}`,
      { reply_markup: { inline_keyboard: [[{ text: '🎁 Recevoir mon PDF', callback_data: 'pdf:full-body' }]] } }
    )
  }
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Muscle Training Bot OK')
    try {
      const update = await request.json()
      await handleUpdate(update, env.TELEGRAM_BOT_TOKEN)
    } catch (e) {
      console.error(e)
    }
    return new Response('OK')
  },
}
