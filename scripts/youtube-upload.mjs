#!/usr/bin/env node
/**
 * Upload automatique du Reel en YouTube Short.
 * Requiert une seule fois : node scripts/youtube-auth.mjs (OAuth2 → YOUTUBE_REFRESH_TOKEN)
 * Secrets GitHub : YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN
 *
 * Fichier uploadé : public/reels/latest.mp4 (généré par make-reel.mjs)
 */
import fs from 'fs'
import path from 'path'

const CLIENT_ID     = process.env.YOUTUBE_CLIENT_ID
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET
const REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.log('⚠️  YOUTUBE_CLIENT_ID / CLIENT_SECRET / REFRESH_TOKEN manquants — skip YouTube.')
  process.exit(0)
}

// 1. Récupère access_token via refresh_token
const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, refresh_token: REFRESH_TOKEN, grant_type: 'refresh_token' }),
})
const { access_token, error } = await tokenRes.json()
if (error) { console.error('Token error:', error); process.exit(1) }

// 2. Cherche le reel le plus récent
const reelDir = path.resolve(process.cwd(), 'public', 'reels')
const files = fs.readdirSync(reelDir).filter(f => f.endsWith('.mp4')).sort().reverse()
if (!files.length) { console.log('Aucun reel trouvé.'); process.exit(0) }
const videoPath = path.join(reelDir, files[0])
console.log(`📹 Upload : ${files[0]}`)

// Titre/desc depuis le nom de fichier ou fallback générique
const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
const title = `💪 Programme musculation — ${today} #Shorts`
const description = `Programme musculation complet avec exercices illustrés.\n\n🎁 PDF gratuit + 3 conseils/semaine → https://t.me/muscletrainiing\n📋 Programmes → https://www.muscletraining.uk\n\n#musculation #fitness #muscletraining #shorts`

// 3. Upload en deux étapes (resumable upload)
const initRes = await fetch(
  'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      'X-Upload-Content-Type': 'video/mp4',
      'X-Upload-Content-Length': String(fs.statSync(videoPath).size),
    },
    body: JSON.stringify({
      snippet: { title, description, tags: ['musculation','fitness','programme','shorts','workout'], categoryId: '17', defaultLanguage: 'fr' },
      status: { privacyStatus: 'public', selfDeclaredMadeForKids: false },
    }),
  }
)
const uploadUrl = initRes.headers.get('location')
if (!uploadUrl) { console.error('Pas d\'URL d\'upload resumable'); process.exit(1) }

// 4. Envoie le fichier
const uploadRes = await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': 'video/mp4', 'Content-Length': String(fs.statSync(videoPath).size) },
  body: fs.readFileSync(videoPath),
  // @ts-ignore
  duplex: 'half',
})
const video = await uploadRes.json()
if (video.id) {
  console.log(`✅ YouTube Short publié : https://youtu.be/${video.id}`)
} else {
  console.error('Erreur upload:', JSON.stringify(video).slice(0, 300))
}
