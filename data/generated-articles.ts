import type { Article } from './articles'
import data from './generated-articles.json'

/**
 * Articles générés automatiquement par le moteur de contenu hebdomadaire
 * (.github/workflows/content.yml → scripts/generate-article.mjs via l'API Anthropic).
 * La source de vérité est `generated-articles.json` — ne pas éditer à la main.
 */
export const GENERATED_ARTICLES: Article[] = data as Article[]
