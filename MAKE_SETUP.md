# 📡 Diffusion auto TikTok / Reels / Instagram / Facebook (Make.com)

À chaque article, `scripts/social-post.mjs` envoie un **webhook JSON** à `SOCIAL_WEBHOOK_URL`.
Make.com (gratuit, 1000 ops/mois) le reçoit et publie sur tous tes réseaux.

## Payload reçu (déjà prêt)
```json
{
  "title": "…", "description": "…", "url": "https://www.muscletraining.uk/blog/…",
  "imageUrl": "https://www.muscletraining.uk/blog/….jpg",
  "animationUrl": "https://…/exercice.gif",
  "reelUrl": "https://www.muscletraining.uk/reels/….mp4",
  "hook": "🔥 Arrête de stagner.", "cta": "👉 Lis le guide…",
  "hashtags": "#… #…",
  "captions": { "long": "…", "x": "…", "instagram": "…" }
}
```

## Scénario Make (15 min)
1. **make.com** → *Create scenario* → 1er module **Webhooks › Custom webhook** → *Add* → copie l'URL.
2. (Optionnel) module **Router** pour brancher plusieurs réseaux en parallèle.
3. Ajoute les modules, connecte tes comptes, mappe les champs :

| Réseau | Module Make | Média | Légende |
|---|---|---|---|
| **TikTok** | TikTok › *Upload a Video* | `reelUrl` | `captions.long` |
| **Instagram Reels** | Instagram for Business › *Create a Reel* | `reelUrl` | `captions.instagram` |
| **Instagram (photo)** | Instagram › *Create a Photo Post* | `imageUrl` | `captions.instagram` |
| **Facebook Page** | Facebook Pages › *Create a Post* | `imageUrl` / `reelUrl` | `captions.long` |
| **YouTube Shorts** | YouTube › *Upload a Video* | `reelUrl` | titre=`title`, desc=`captions.long` |
| **X / Twitter** | Twitter › *Create a Tweet* | (lien déplie l'image) | `captions.x` |

4. **Active** le scénario (toggle ON, bas gauche).
5. Donne-moi l'URL du webhook → je fais :
   ```
   gh secret set SOCIAL_WEBHOOK_URL --repo YSL-Home/MUSCLETRAINING --body "https://hook.eu2.make.com/…"
   ```

Ensuite chaque article (lun/mer/ven) se diffuse auto : Telegram (vidéo Reel) **+** TikTok + Reels + Insta + FB + Shorts + X.

> Astuce : commence avec TikTok + Reels (le Reel vertical `reelUrl` est déjà optimisé 9:16).
