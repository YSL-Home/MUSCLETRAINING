#!/usr/bin/env node
/**
 * Crée les 4 unités AdSense + injecte les slot IDs dans GitHub Secrets.
 *
 * Prérequis (une seule fois) :
 *   1. Google Cloud Console → Bibliothèque → activer "AdSense Management API"
 *   2. Identifiants → OAuth2 → App bureau → télécharger JSON
 *   3. GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=xxx GH_TOKEN=xxx node scripts/adsense-setup.mjs
 *
 * GH_TOKEN : token GitHub avec scope "secrets" → https://github.com/settings/tokens
 */
import { createServer } from 'http'

const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GH_TOKEN      = process.env.GH_TOKEN
const REDIRECT      = 'http://localhost:4568'
const SCOPE         = 'https://www.googleapis.com/auth/adsense'
const REPO          = 'YSL-Home/MUSCLETRAINING'
const PUB_ID        = 'ca-pub-6870790039775701'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET requis.')
  console.error('1. Cloud Console → APIs → AdSense Management API → Activer')
  console.error('2. Identifiants → OAuth2 → Application de bureau → copier IDs')
  process.exit(1)
}

// ── OAuth2 ──
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&access_type=offline&prompt=consent`
console.log('\nOuvre cette URL dans ton navigateur :\n')
console.log(authUrl)
console.log()

const { access_token, refresh_token } = await new Promise(resolve => {
  const srv = createServer(async (req, res) => {
    const code = new URL(req.url, REDIRECT).searchParams.get('code')
    if (!code) { res.end('Erreur'); return }
    const t = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: REDIRECT, grant_type: 'authorization_code' }),
    }).then(r => r.json())
    res.end('<h2>Succès !</h2>'); srv.close(); resolve(t)
  }).listen(4568)
})

const headers = { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' }

// ── Récupère le compte AdSense ──
const accounts = await fetch('https://adsense.googleapis.com/v2/accounts', { headers }).then(r => r.json())
const accountId = accounts.accounts?.[0]?.name
if (!accountId) { console.error('Aucun compte AdSense trouvé.'); process.exit(1) }
console.log('Compte AdSense :', accountId)

// ── Récupère l'adclient (ca-pub-xxx) ──
const clients = await fetch(`https://adsense.googleapis.com/v2/${accountId}/adclients`, { headers }).then(r => r.json())
const adClient = clients.adClients?.find(c => c.name.includes(PUB_ID.replace('ca-', ''))) ?? clients.adClients?.[0]
if (!adClient) { console.error('AdClient non trouvé.'); process.exit(1) }
const clientName = adClient.name
console.log('AdClient :', clientName)

// ── Définition des 4 unités ──
const UNITS = [
  { displayName: 'MT — Exercice après vidéo',  secretName: 'AD_SLOT_EX_VIDEO' },
  { displayName: 'MT — Exercice sidebar',       secretName: 'AD_SLOT_EX_SIDEBAR' },
  { displayName: 'MT — Blog mid-article',       secretName: 'AD_SLOT_BLOG_MID' },
  { displayName: 'MT — Blog sidebar',           secretName: 'AD_SLOT_BLOG_BAS' },
]

// ── GitHub Secrets helper ──
async function setGhSecret(name, value) {
  if (!GH_TOKEN) { console.log(`  → Ajoute manuellement : ${name} = ${value}`); return }
  // Récupère la clé publique du repo pour chiffrer le secret
  const keyRes = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/public-key`, {
    headers: { Authorization: `token ${GH_TOKEN}`, Accept: 'application/vnd.github.v3+json' }
  }).then(r => r.json())

  // Chiffrement libsodium (tweetnacl fallback si libsodium absent)
  let encValue
  try {
    const sodium = await import('libsodium-wrappers')
    await sodium.ready
    const key = sodium.from_base64(keyRes.key, sodium.base64_variants.ORIGINAL)
    const msg = Buffer.from(value)
    encValue = sodium.to_base64(sodium.crypto_box_seal(msg, key), sodium.base64_variants.ORIGINAL)
  } catch {
    // Fallback : tweetnacl-sealedbox-js
    try {
      const { default: sealedBox } = await import('tweetnacl-sealedbox-js')
      const { default: nacl } = await import('tweetnacl')
      const { decodeBase64, encodeBase64 } = await import('tweetnacl-util')
      const key = decodeBase64(keyRes.key)
      const msg = new TextEncoder().encode(value)
      encValue = encodeBase64(sealedBox.seal(msg, key))
    } catch {
      console.log(`  ⚠️  Chiffrement non disponible — ajoute manuellement : ${name} = ${value}`)
      return
    }
  }

  const r = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/${name}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GH_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ encrypted_value: encValue, key_id: keyRes.key_id }),
  })
  console.log(`  GitHub Secret ${name} : ${r.status === 204 || r.status === 201 ? '✅' : `❌ ${r.status}`}`)
}

// ── Crée les unités + injecte les secrets ──
console.log('\nCréation des unités publicitaires…\n')
const results = {}
for (const unit of UNITS) {
  const res = await fetch(`https://adsense.googleapis.com/v2/${clientName}/adunits`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ displayName: unit.displayName, contentAdsSettings: { type: 'DISPLAY', size: { width: 0, height: 0 } } }),
  }).then(r => r.json())

  if (res.name) {
    const slotId = res.name.split('/').pop()
    results[unit.secretName] = slotId
    console.log(`✅ ${unit.displayName} → slot: ${slotId}`)
    await setGhSecret(unit.secretName, slotId)
  } else {
    console.error(`❌ ${unit.displayName} :`, JSON.stringify(res).slice(0, 200))
  }
}

console.log('\n✅ Terminé. Déclenche un redéploiement pour activer les annonces :')
console.log('   gh workflow run deploy.yml --repo', REPO, '--ref main')

if (Object.keys(results).length > 0 && GH_TOKEN) {
  const { execFileSync } = await import('child_process')
  try {
    execFileSync('gh', ['workflow', 'run', 'deploy.yml', '--repo', REPO, '--ref', 'main'])
    console.log('🚀 Déploiement déclenché.')
  } catch {}
}
