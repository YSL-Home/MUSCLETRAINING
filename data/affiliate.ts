import type { Materiel } from './exercises'

/**
 * ⚠️ REMPLACER par ton vrai tag Amazon Partenaires (ex. "muscletraining-21").
 * Inscription gratuite : https://partenaires.amazon.fr
 * Une fois le tag obtenu, change uniquement cette constante : tous les liens
 * du site seront automatiquement monétisés.
 */
export const AMAZON_TAG = 'muscletrainin-21'

/** Construit un lien de recherche Amazon affilié (robuste : jamais de lien mort). */
export function amazonSearch(query: string): string {
  return `https://www.amazon.fr/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`
}

export interface AffiliateProduct {
  nom: string
  prix: string
  description: string
  url: string
  badge?: string
  emoji: string
}

function p(nom: string, query: string, prix: string, description: string, emoji: string, badge?: string): AffiliateProduct {
  return { nom, url: amazonSearch(query), prix, description, emoji, badge }
}

/** Produits recommandés par type de matériel (mapping ↔ exercices). */
export const AFFILIATE_BY_MATERIEL: Partial<Record<Materiel, AffiliateProduct[]>> = {
  barre: [
    p('Barre olympique + disques', 'barre olympique musculation 20kg disques', 'dès 120 €', 'Barre 20 kg + disques en fonte pour squats, soulevés et développés.', '🏋️', 'Essentiel'),
  ],
  halteres: [
    p('Haltères réglables', 'haltères réglables musculation', 'dès 80 €', 'Une paire d\'haltères réglables remplace tout un rack — gain de place idéal maison.', '💪', 'Best-seller'),
  ],
  elastique: [
    p('Bandes de résistance', 'bandes élastiques résistance fitness set', 'dès 20 €', 'Set d\'élastiques pour la force, l\'assistance aux tractions et la mobilité.', '🟢', 'Petit budget'),
  ],
  kettlebell: [
    p('Kettlebell fonte', 'kettlebell fonte 16kg', 'dès 30 €', 'Idéale pour le swing, le gobelet et le travail explosif full-body.', '🔔'),
  ],
  banc: [
    p('Banc de musculation réglable', 'banc musculation réglable inclinable', 'dès 70 €', 'Banc inclinable/déclinable pour développé, écarté et travail des abdos.', '🪑', 'Polyvalent'),
  ],
  'barre-de-traction': [
    p('Barre de traction', 'barre de traction porte sans perçage', 'dès 25 €', 'Se fixe à un cadre de porte — tractions, suspensions et gainage suspendu.', '🚪'),
  ],
  poulie: [
    p('Poulie / station câble maison', 'poulie musculation maison station câble', 'dès 60 €', 'Système de câble pour tirages, extensions triceps et curls à la maison.', '🔩'),
  ],
  machine: [
    p('Station de musculation', 'station de musculation home gym multifonction', 'dès 200 €', 'Banc multifonction tout-en-un pour s\'équiper à domicile.', '⚙️'),
  ],
  'poids-corps': [
    p('Tapis de sol fitness', 'tapis de sol fitness épais antidérapant', 'dès 20 €', 'Confort et adhérence pour le gainage, les pompes et les abdos.', '🧘', 'Petit budget'),
  ],
  chaise: [
    p('Anneaux de gymnastique', 'anneaux gymnastique calisthenics', 'dès 30 €', 'Pour dips, rows et progressions calisthenics à la maison.', '⭕'),
  ],
}

/** Produits universels suggérés sur la plupart des pages. */
export const AFFILIATE_UNIVERSAL: AffiliateProduct[] = [
  p('Whey protéine', 'whey protéine isolat', 'dès 25 €', 'Pour atteindre tes besoins en protéines et soutenir la récupération.', '🥤', 'Populaire'),
  p('Tapis de sol', 'tapis de sol fitness épais', 'dès 20 €', 'Indispensable pour le travail au sol et les étirements.', '🧘'),
]

/** Renvoie les cartes affiliées pertinentes pour une liste de matériel. */
export function affiliateForMateriel(materiels: Materiel[]): AffiliateProduct[] {
  const out: AffiliateProduct[] = []
  const seen = new Set<string>()
  for (const m of materiels) {
    for (const prod of AFFILIATE_BY_MATERIEL[m] ?? []) {
      if (!seen.has(prod.nom)) { seen.add(prod.nom); out.push(prod) }
    }
  }
  if (out.length < 2) {
    for (const prod of AFFILIATE_UNIVERSAL) {
      if (!seen.has(prod.nom)) { seen.add(prod.nom); out.push(prod) }
    }
  }
  return out.slice(0, 3)
}

/** Sélection « essentiels » (homepage, page matériel, fin d'article). */
export const AFFILIATE_ESSENTIALS: AffiliateProduct[] = [
  p('Haltères réglables', 'haltères réglables musculation', 'dès 80 €', 'Le couteau suisse de la maison : remplace tout un rack d\'haltères.', '💪', 'Top vente'),
  p('Bandes de résistance', 'bandes élastiques résistance fitness set', 'dès 20 €', 'Polyvalentes, compactes, parfaites pour la force et la mobilité.', '🟢', 'Petit budget'),
  p('Barre de traction', 'barre de traction porte sans perçage', 'dès 25 €', 'Tractions et gainage suspendu, sans perçage.', '🚪'),
  p('Whey protéine', 'whey protéine isolat', 'dès 25 €', 'Soutient la récupération et l\'apport en protéines.', '🥤', 'Populaire'),
  p('Banc réglable', 'banc musculation réglable inclinable', 'dès 70 €', 'Développé, écarté, abdos : la base d\'un home gym.', '🪑'),
  p('Tapis de sol', 'tapis de sol fitness épais antidérapant', 'dès 20 €', 'Confort et adhérence pour le travail au sol.', '🧘'),
]

/** Mapping libellés français (programmes) → type de matériel. */
const LABEL_TO_MATERIEL: { re: RegExp; m: Materiel }[] = [
  { re: /barre de traction|traction/i, m: 'barre-de-traction' },
  { re: /barre/i, m: 'barre' },
  { re: /haltère/i, m: 'halteres' },
  { re: /élastique|elastique|bande/i, m: 'elastique' },
  { re: /kettlebell/i, m: 'kettlebell' },
  { re: /banc/i, m: 'banc' },
  { re: /poulie|câble|cable/i, m: 'poulie' },
  { re: /machine|presse|station/i, m: 'machine' },
  { re: /tapis|yoga|aucun|poids du corps/i, m: 'poids-corps' },
  { re: /anneaux|chaise/i, m: 'chaise' },
]

/** Produits affiliés déduits de libellés texte (ex. materielRequis d'un programme). */
export function affiliateForLabels(labels: string[]): AffiliateProduct[] {
  const mats = new Set<Materiel>()
  for (const l of labels) for (const { re, m } of LABEL_TO_MATERIEL) if (re.test(l)) mats.add(m)
  return affiliateForMateriel([...mats])
}

/** Mention légale obligatoire (Amazon Partenaires UE). */
export const AFFILIATE_DISCLOSURE =
  'En tant que Partenaire Amazon, ce site réalise un bénéfice sur les achats remplissant les conditions requises. Certains liens sont des liens affiliés.'
