#!/usr/bin/env node
/**
 * Auth YouTube OAuth2 (à lancer UNE SEULE FOIS en local).
 * Copie le refresh_token dans GitHub Secrets → YOUTUBE_REFRESH_TOKEN
 *
 * Prérequis :
 *   1. Google Cloud Console → APIs → YouTube Data API v3 → Activer
 *   2. Identifiants → OAuth2 → Type "Application de bureau" → Télécharger JSON
 *   3. YOUTUBE_CLIENT_ID=xxx YOUTUBE_CLIENT_SECRET=xxx node scripts/youtube-auth.mjs
 */
import { createServer } from 'http'

const CLIENT_ID     = process.env.YOUTUBE_CLIENT_ID
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET
const REDIRECT      = 'http://localhost:4567'
const SCOPES        = 'https://www.googleapis.com/auth/youtube.upload'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('YOUTUBE_CLIENT_ID et YOUTUBE_CLIENT_SECRET requis.')
  process.exit(1)
}

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&access_type=offline&prompt=consent`
console.log('\n1. Ouvre cette URL dans ton navigateur :\n')
console.log(authUrl)
console.log('\n2. Après autorisation, le code sera récupéré automatiquement.\n')

await new Promise(resolve => {
  const srv = createServer(async (req, res) => {
    const code = new URL(req.url, REDIRECT).searchParams.get('code')
    if (!code) { res.end('Erreur — pas de code.'); return }

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: REDIRECT, grant_type: 'authorization_code' }),
    })
    const tokens = await tokenRes.json()

    res.end('<h2>Succès ! Tu peux fermer cet onglet.</h2>')
    console.log('\n✅ YOUTUBE_REFRESH_TOKEN (à copier dans GitHub Secrets) :\n')
    console.log(tokens.refresh_token)
    console.log()
    srv.close()
    resolve()
  }).listen(4567)
})
