# 📈 Croissance automatique — Muscle Training

Tout ce qui suit tourne **sans intervention** une fois en place.

## 1. IndexNow (autonome ✅)
À chaque déploiement, `scripts/indexnow.mjs` soumet toutes les URLs du sitemap à
Bing/Yandex/Seznam → indexation en quelques minutes. Clé publique :
`public/0823122b3fe5429606ddff988b5bbfd7.txt`. Aucun compte requis.

## 2. SEO programmatique (autonome ✅)
`/guides/exercices-<muscle>-<maison|salle>` : 26 pages longue-traîne générées depuis
les données (13 muscles × 2 lieux), avec FAQ schema, maillage interne et contenu réel.
Hub : `/guides`. Incluses au sitemap.

## 3. FAQ + données structurées (autonome ✅)
Bloc FAQ visible + `FAQPage` schema sur chaque page exercice et guide → éligibilité
aux résultats enrichis Google.

## 4. RSS (autonome ✅)
`/feed.xml` — flux des articles, pour syndication et agrégateurs.

## 5. Moteur de contenu hebdo (1 secret)
`.github/workflows/content.yml` — chaque **lundi 08:00 UTC**, génère un article via
l'API Anthropic (`scripts/generate-article.mjs`), commit dans
`data/generated-articles.json`, ce qui déclenche un déploiement.

**Secret requis** (repo Settings → Secrets → Actions) :
- `ANTHROPIC_API_KEY` (tu l'as déjà sur tes autres repos)
- `ANTHROPIC_MODEL` *(optionnel, défaut `claude-sonnet-4-5`)*

Test manuel : Actions → « Moteur de contenu hebdo » → Run workflow.

## 6. Auto-post réseaux sociaux (secrets selon canaux)
`.github/workflows/social.yml` — déclenché **automatiquement** quand un nouvel article
est généré ; publie via `scripts/social-post.mjs` sur les canaux dont les secrets existent :

| Canal | Secrets | Coût |
|---|---|---|
| **Telegram** | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | gratuit |
| **Webhook** (Buffer/Make/Zapier → X, IG, FB, LinkedIn) | `SOCIAL_WEBHOOK_URL` | selon outil |
| **X / Twitter** | `X_BEARER_TOKEN` | API |

Aucun secret = no-op propre. Le plus simple pour démarrer : **Telegram** (bot via
@BotFather) ou un **webhook Buffer/Make** qui diffuse vers tous tes réseaux d'un coup.

---

### Mise en route (5 min)
1. Ajouter `ANTHROPIC_API_KEY` dans les secrets du repo → le contenu hebdo démarre.
2. (Option) Ajouter `TELEGRAM_*` ou `SOCIAL_WEBHOOK_URL` → diffusion sociale auto.
3. Soumettre le sitemap dans Google Search Console une fois (Google n'a pas d'IndexNow).
   `https://www.muscletraining.uk/sitemap.xml`
