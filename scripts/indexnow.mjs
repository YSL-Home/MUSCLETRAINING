#!/usr/bin/env node
/**
 * Soumet toutes les URLs du sitemap à IndexNow (Bing, Yandex, Seznam…).
 * Indexation quasi-instantanée des pages nouvelles/modifiées.
 * Aucun compte requis — juste le fichier-clé public/<key>.txt.
 *
 * Usage : node scripts/indexnow.mjs
 */
import fs from 'fs'
import path from 'path'

const HOST = 'www.muscletraining.uk'
const KEY = '0823122b3fe5429606ddff988b5bbfd7'
const SITEMAP = path.resolve(process.cwd(), 'out', 'sitemap.xml')

if (!fs.existsSync(SITEMAP)) {
  console.error('❌ out/sitemap.xml introuvable — lance `next build` avant.')
  process.exit(0)
}

const xml = fs.readFileSync(SITEMAP, 'utf8')
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])

if (!urls.length) {
  console.log('⚠️ Aucune URL dans le sitemap.')
  process.exit(0)
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
}

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  console.log(`✅ IndexNow : ${urls.length} URLs soumises — HTTP ${res.status}`)
} catch (e) {
  console.error('⚠️ IndexNow échec (non bloquant) :', e.message)
}
