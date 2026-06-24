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

// ── GIF du mouvement (depuis la base d'exercices) ─────
// On parse le mapping slug→gif de components/ExerciseGif.tsx.
function loadExerciseGifs() {
  try {
    const src = fs.readFileSync(path.resolve(process.cwd(), 'components', 'ExerciseGif.tsx'), 'utf8')
    const baseM = src.match(/const BASE = '([^']+)'/)
    const gbase = baseM ? baseM[1] : ''
    const map = {}
    for (const m of src.matchAll(/'([^']+)':\s*`\$\{BASE\}\/([^`]+)`/g)) map[m[1]] = `${gbase}/${m[2]}`
    return map
  } catch { return {} }
}
const GIFS = loadExerciseGifs()
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
// Cherche un GIF pertinent : tag = slug d'exercice, sinon mot du titre dans un slug
let animationUrl = ''
for (const t of a.tags || []) { if (GIFS[t]) { animationUrl = GIFS[t]; break } }
if (!animationUrl) {
  const title = norm(a.titre)
  const hit = Object.keys(GIFS).find(slug => title.includes(norm(slug)) || norm(slug).split('-').filter(w => w.length > 4).some(w => title.includes(w)))
  if (hit) animationUrl = GIFS[hit]
}

// ── Lien profond : page programme/exercice qui répond au sujet ──
function resolveDeepLink() {
  const t = norm(a.titre + ' ' + (a.tags || []).join(' '))
  const RULES = [
    [/traction|pull.?up/, '/calisthenics/challenge-30-jours-tractions'],
    [/pompe|push.?up/, '/calisthenics/challenge-30-jours-pompes'],
    [/abdo|gainage|planche|core/, '/calisthenics/challenge-30-jours-abdos'],
    [/dips/, '/exercice/dips'],
    [/pistol/, '/exercice/pistol-squat'],
    [/muscle.?up/, '/exercice/muscle-up'],
    [/souplesse|mobilit|etir/, '/calisthenics/routine-souplesse-quotidienne'],
    [/calisthen|poids du corps|street/, '/calisthenics'],
    [/transform|challenge|30 jours/, '/calisthenics/challenge-30-jours-transformation'],
    [/prise de masse|masse/, '/programmes/salle/prise-masse-rapide-salle'],
    [/seche|secher|perte|gras/, '/programmes/maison/seche-cardio-maison'],
    [/full body|split|programme|routine/, '/programmes'],
    [/proteine|nutrition|whey|creatine|complement/, '/nutrition'],
  ]
  // tag = slug d'exercice connu → fiche exercice
  for (const tag of a.tags || []) if (GIFS[tag]) return `${BASE}/exercice/${tag}`
  for (const [re, dest] of RULES) if (re.test(t)) return `${BASE}${dest}`
  return url // fallback : l'article
}
const link = resolveDeepLink()

// Hashtags dédupliqués (tags article + base marque)
const BASE_TAGS = ['musculation', 'fitness', 'muscu', 'training']
const tagWords = [...(a.tags || []).map(t => String(t).replace(/[^a-z0-9]/gi, '').toLowerCase()), ...BASE_TAGS]
const uniqTags = [...new Set(tagWords.filter(Boolean))]
const hashtags = uniqTags.slice(0, 6).map(t => '#' + t).join(' ')
const HASH_BASE = uniqTags.slice(6, 11).map(t => '#' + t).join(' ')
const HASH_INSTA = [...new Set([...uniqTags, 'gym', 'santé', 'progression', 'motivation', 'workout'])].map(t => '#' + t).join(' ')

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

// Variantes par réseau — style TikTok fitness (accroche + valeur + CTA programme)
const captions = {
  // Telegram / Facebook : punchy, orienté programme
  long:
`${hook}

${a.titre}

📋 Le programme complet (exos, séries, progression) t'attend ici 👇
${link}

📌 Enregistre ce post · 🔔 Abonne-toi : 3 conseils/semaine

${hashtags} ${HASH_BASE}`,
  // X / Twitter (≤280)
  x: `${hook} ${a.titre}\n\n📋 Programme complet 👇\n${link}\n${hashtags}`.slice(0, 278),
  // Instagram
  instagram:
`${hook} ${a.titre} 💪

${a.description}

📋 Programme détaillé → ${link}
📌 Enregistre · 🔔 Abonne-toi

${HASH_INSTA}`,
}

let posted = 0

// Reel vidéo local (généré par make-reel.mjs)
const reelPath = path.resolve(process.cwd(), 'public', 'reels', `${a.slug}.mp4`)
const hasReel = fs.existsSync(reelPath)
const reelUrl = hasReel ? `${BASE}/reels/${a.slug}.mp4` : ''

// ── Telegram : Reel vidéo > GIF mouvement > image ──
const TG = process.env.TELEGRAM_BOT_TOKEN, TGC = process.env.TELEGRAM_CHAT_ID
if (TG && TGC) {
  try {
    let r, kind
    if (hasReel) {
      // upload du fichier local (fiable, indépendant du déploiement)
      const fd = new FormData()
      fd.append('chat_id', TGC)
      fd.append('caption', captions.long)
      fd.append('video', new Blob([fs.readFileSync(reelPath)], { type: 'video/mp4' }), `${a.slug}.mp4`)
      r = await fetch(`https://api.telegram.org/bot${TG}/sendVideo`, { method: 'POST', body: fd })
      kind = 'Reel'
    } else {
      const method = animationUrl ? 'sendAnimation' : 'sendPhoto'
      const media = animationUrl ? { animation: animationUrl } : { photo: imageUrl }
      r = await fetch(`https://api.telegram.org/bot${TG}/${method}`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: TGC, ...media, caption: captions.long }),
      })
      kind = animationUrl ? 'GIF' : 'image'
    }
    console.log(`Telegram (${kind}):`, r.status); posted++
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
        animationUrl, // GIF du mouvement (vide si aucun)
        reelUrl,      // Reel vertical MP4 pour TikTok/Reels/Shorts (vide si aucun)
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
