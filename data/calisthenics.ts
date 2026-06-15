export type CalistheniqueType = 'challenge' | 'routine' | 'mobilite'

export interface CalBloc {
  titre: string
  sousTitre?: string
  exercices: { nom: string; slug?: string; format: string }[]
}

export interface CalPlan {
  slug: string
  nom: string
  type: CalistheniqueType
  emoji: string
  couleur: string
  niveau: 'debutant' | 'intermediaire' | 'avance'
  duree: string
  objectif: string
  descriptionCourte: string
  descriptionSeo: string
  materiel: string[]
  conseils: string[]
  blocs: CalBloc[]
}

export const TYPE_LABEL: Record<CalistheniqueType, string> = {
  challenge: '🔥 Challenge',
  routine: '📅 Routine',
  mobilite: '🧘 Mobilité & souplesse',
}

export const CAL_PLANS: CalPlan[] = [
  // ═══════════════ CHALLENGES ═══════════════
  {
    slug: 'challenge-30-jours-transformation',
    nom: 'Challenge 30 jours — Transformation du corps',
    type: 'challenge',
    emoji: '🔥', couleur: '#E63946', niveau: 'debutant', duree: '30 jours',
    objectif: 'Transformer son corps au poids du corps',
    descriptionCourte: 'Un challenge progressif sur 30 jours pour transformer ton corps avec le seul poids du corps. Force, gainage et cardio combinés.',
    descriptionSeo: 'Challenge calisthénics 30 jours pour transformer ton corps sans matériel. Programme jour par jour, progressif, full body. Gratuit.',
    materiel: ['Aucun (poids du corps)'],
    conseils: ['Fais le challenge 6 jours/7, repos le 7e', 'Augmente les répétitions chaque semaine', 'Filme-toi au jour 1 et au jour 30 pour voir la différence'],
    blocs: [
      { titre: 'Semaine 1 — Fondations', sousTitre: '3 tours, repos 60s', exercices: [
        { nom: 'Pompes', slug: 'pompes', format: '8 reps' },
        { nom: 'Squats poids du corps', slug: 'squat-gobelet', format: '15 reps' },
        { nom: 'Planche', slug: 'planche', format: '20 s' },
        { nom: 'Fentes', slug: 'fentes', format: '10/jambe' },
        { nom: 'Mountain climbers', slug: 'mountain-climbers', format: '20 s' },
      ]},
      { titre: 'Semaine 2 — Volume', sousTitre: '3 tours, repos 50s', exercices: [
        { nom: 'Pompes', slug: 'pompes', format: '12 reps' },
        { nom: 'Squats sautés', slug: 'squat-gobelet', format: '20 reps' },
        { nom: 'Planche', slug: 'planche', format: '35 s' },
        { nom: 'Pont fessier', slug: 'pont-fessier', format: '20 reps' },
        { nom: 'Burpees', slug: 'burpees', format: '8 reps' },
      ]},
      { titre: 'Semaine 3 — Intensité', sousTitre: '4 tours, repos 45s', exercices: [
        { nom: 'Pompes', slug: 'pompes', format: '15 reps' },
        { nom: 'Fentes sautées', slug: 'fentes', format: '12/jambe' },
        { nom: 'Hollow body hold', slug: 'hollow-body', format: '30 s' },
        { nom: 'Dips sur chaise', slug: 'dips', format: '12 reps' },
        { nom: 'Burpees', slug: 'burpees', format: '12 reps' },
      ]},
      { titre: 'Semaine 4 — Dépassement', sousTitre: '4 tours, repos 40s', exercices: [
        { nom: 'Pompes diamant', slug: 'pompes-serrees', format: '12 reps' },
        { nom: 'Squats bulgares', slug: 'squat-bulgare', format: '12/jambe' },
        { nom: 'Planche dynamique', slug: 'planche', format: '45 s' },
        { nom: 'Pompes déclinées', slug: 'pompes-declinees', format: '12 reps' },
        { nom: 'Mountain climbers sprint', slug: 'mountain-climbers', format: '30 s' },
      ]},
    ],
  },
  {
    slug: 'challenge-30-jours-pompes',
    nom: 'Challenge 30 jours — 0 à 50 pompes',
    type: 'challenge',
    emoji: '💪', couleur: '#f59e0b', niveau: 'debutant', duree: '30 jours',
    objectif: 'Atteindre 50 pompes d\'affilée',
    descriptionCourte: 'Progresse de quelques pompes à 50 répétitions enchaînées en 30 jours grâce à une montée en charge structurée.',
    descriptionSeo: 'Challenge 30 jours pompes : passe de 0 à 50 pompes. Programme progressif jour par jour, technique et variantes. Gratuit.',
    materiel: ['Aucun'],
    conseils: ['Teste ton max au jour 1', 'Repos complet tous les 3 jours', 'Privilégie l\'amplitude complète à la quantité'],
    blocs: [
      { titre: 'Jours 1-7', sousTitre: '5 séries dans la journée', exercices: [
        { nom: 'Pompes (sur genoux si besoin)', slug: 'pompes', format: '5 × 5' },
        { nom: 'Pompes inclinées (mains surélevées)', slug: 'pompes', format: '3 × 8' },
      ]},
      { titre: 'Jours 8-14', sousTitre: '5 séries', exercices: [
        { nom: 'Pompes complètes', slug: 'pompes', format: '5 × 8' },
        { nom: 'Pompes serrées', slug: 'pompes-serrees', format: '3 × 6' },
      ]},
      { titre: 'Jours 15-21', sousTitre: '5 séries', exercices: [
        { nom: 'Pompes', slug: 'pompes', format: '5 × 12' },
        { nom: 'Pompes déclinées', slug: 'pompes-declinees', format: '3 × 8' },
      ]},
      { titre: 'Jours 22-30', sousTitre: 'Vers le max', exercices: [
        { nom: 'Pompes', slug: 'pompes', format: '4 × 18' },
        { nom: 'Test max final', slug: 'pompes', format: 'Viser 50' },
      ]},
    ],
  },
  {
    slug: 'challenge-30-jours-abdos',
    nom: 'Challenge 30 jours — Abdos & gainage',
    type: 'challenge',
    emoji: '🎯', couleur: '#b8d400', niveau: 'debutant', duree: '30 jours',
    objectif: 'Sangle abdominale solide et visible',
    descriptionCourte: 'Renforce ta sangle abdominale et révèle tes abdos en 30 jours avec du gainage et des exercices ciblés, sans matériel.',
    descriptionSeo: 'Challenge abdos 30 jours sans matériel : planche, crunch, gainage. Programme progressif pour une sangle abdominale solide. Gratuit.',
    materiel: ['Tapis (optionnel)'],
    conseils: ['Garde le bas du dos plaqué au sol', 'La nutrition révèle les abdos : surveille ton alimentation', 'Qualité > quantité'],
    blocs: [
      { titre: 'Semaine 1', sousTitre: '3 tours', exercices: [
        { nom: 'Planche', slug: 'planche', format: '20 s' },
        { nom: 'Crunch', slug: 'crunch', format: '15 reps' },
        { nom: 'Dead bug', slug: 'dead-bug', format: '8/côté' },
      ]},
      { titre: 'Semaine 2', sousTitre: '3 tours', exercices: [
        { nom: 'Planche', slug: 'planche', format: '35 s' },
        { nom: 'Relevé de jambes', slug: 'releve-de-jambes', format: '12 reps' },
        { nom: 'Hollow body', slug: 'hollow-body', format: '20 s' },
      ]},
      { titre: 'Semaine 3', sousTitre: '4 tours', exercices: [
        { nom: 'Planche latérale', slug: 'planche', format: '25 s/côté' },
        { nom: 'Bicycle crunch', slug: 'crunch', format: '20 reps' },
        { nom: 'Hollow body rock', slug: 'hollow-body', format: '30 s' },
      ]},
      { titre: 'Semaine 4', sousTitre: '4 tours', exercices: [
        { nom: 'Planche', slug: 'planche', format: '60 s' },
        { nom: 'Relevé de jambes suspendu', slug: 'releve-de-jambes', format: '15 reps' },
        { nom: 'Dragon flag (négatif)', slug: 'dragon-flag', format: '6 reps' },
      ]},
    ],
  },
  {
    slug: 'challenge-30-jours-tractions',
    nom: 'Challenge 30 jours — Maîtrise les tractions',
    type: 'challenge',
    emoji: '🔝', couleur: '#3b82f6', niveau: 'intermediaire', duree: '30 jours',
    objectif: 'Enchaîner 10 tractions strictes',
    descriptionCourte: 'Du débutant qui galère à 10 tractions strictes : un plan progressif avec négatifs, élastiques et volume.',
    descriptionSeo: 'Challenge tractions 30 jours : apprends à faire des tractions et atteins 10 reps. Progressions négatives et élastiques. Gratuit.',
    materiel: ['Barre de traction', 'Élastique (optionnel)'],
    conseils: ['Les négatifs (descente lente) construisent la force', 'Engage les omoplates avant de tirer', 'Repos 48h entre 2 séances de tractions'],
    blocs: [
      { titre: 'Semaine 1 — Négatifs', sousTitre: '4 séries', exercices: [
        { nom: 'Tractions négatives (descente 5s)', slug: 'tractions', format: '4 × 3' },
        { nom: 'Suspension à la barre', slug: 'tractions', format: '3 × 20 s' },
      ]},
      { titre: 'Semaine 2 — Assistées', sousTitre: '4 séries', exercices: [
        { nom: 'Tractions élastique', slug: 'tractions', format: '4 × 6' },
        { nom: 'Tractions négatives', slug: 'tractions', format: '3 × 4' },
      ]},
      { titre: 'Semaine 3 — Volume', sousTitre: '5 séries', exercices: [
        { nom: 'Tractions strictes', slug: 'tractions', format: '5 × 4' },
        { nom: 'Chin-ups (supination)', slug: 'tractions-supination', format: '3 × 5' },
      ]},
      { titre: 'Semaine 4 — Performance', sousTitre: 'Vers 10 reps', exercices: [
        { nom: 'Tractions strictes', slug: 'tractions', format: '4 × 7' },
        { nom: 'Test max final', slug: 'tractions', format: 'Viser 10' },
      ]},
    ],
  },
  // ═══════════════ ROUTINES JOURNALIÈRES ═══════════════
  {
    slug: 'routine-matin-energie',
    nom: 'Routine du matin — 10 minutes',
    type: 'routine',
    emoji: '🌅', couleur: '#10b981', niveau: 'debutant', duree: '10 min/jour',
    objectif: 'Réveiller le corps et booster l\'énergie',
    descriptionCourte: 'Une routine express de 10 minutes à faire chaque matin pour réveiller le corps, activer le métabolisme et bien démarrer la journée.',
    descriptionSeo: 'Routine du matin 10 minutes sans matériel : réveille ton corps, active ton métabolisme. Exercices simples au poids du corps. Gratuit.',
    materiel: ['Aucun'],
    conseils: ['Fais-la à jeun pour activer le métabolisme', 'Enchaîne sans repos pour l\'effet cardio', 'Bois un grand verre d\'eau avant'],
    blocs: [
      { titre: 'Circuit matinal', sousTitre: '2 tours, en continu', exercices: [
        { nom: 'Jumping jacks', slug: 'mountain-climbers', format: '30 s' },
        { nom: 'Squats', slug: 'squat-gobelet', format: '15 reps' },
        { nom: 'Pompes', slug: 'pompes', format: '10 reps' },
        { nom: 'Planche', slug: 'planche', format: '30 s' },
        { nom: 'Fentes', slug: 'fentes', format: '10/jambe' },
        { nom: 'Pont fessier', slug: 'pont-fessier', format: '15 reps' },
      ]},
    ],
  },
  {
    slug: 'routine-full-body-maison',
    nom: 'Routine Full Body Maison — 20 minutes',
    type: 'routine',
    emoji: '🏠', couleur: '#8b5cf6', niveau: 'intermediaire', duree: '20 min',
    objectif: 'Travailler tout le corps sans matériel',
    descriptionCourte: 'Une routine complète de 20 minutes qui sollicite tout le corps. Idéale 3 à 4 fois par semaine pour rester en forme à la maison.',
    descriptionSeo: 'Routine full body maison 20 minutes sans matériel : haut, bas du corps et gainage. Pour s\'entraîner partout. Gratuit.',
    materiel: ['Aucun'],
    conseils: ['3-4 fois par semaine', 'Garde une bonne technique sur chaque rep', 'Augmente les tours quand ça devient facile'],
    blocs: [
      { titre: 'Bloc complet', sousTitre: '3 tours, repos 45s', exercices: [
        { nom: 'Pompes', slug: 'pompes', format: '12 reps' },
        { nom: 'Squats sautés', slug: 'squat-gobelet', format: '15 reps' },
        { nom: 'Pike push-up', slug: 'pike-push-up', format: '8 reps' },
        { nom: 'Fentes en marche', slug: 'fentes', format: '12/jambe' },
        { nom: 'Dips sur chaise', slug: 'dips', format: '12 reps' },
        { nom: 'Hollow body', slug: 'hollow-body', format: '30 s' },
        { nom: 'Burpees', slug: 'burpees', format: '10 reps' },
      ]},
    ],
  },
  {
    slug: 'routine-push-pull-legs-calisthenics',
    nom: 'Routine PPL Calisthénics',
    type: 'routine',
    emoji: '⚡', couleur: '#E63946', niveau: 'avance', duree: '3 jours/semaine',
    objectif: 'Force et muscle au poids du corps',
    descriptionCourte: 'Le split Push / Pull / Legs adapté au calisthénics pour développer force et masse musculaire avec des progressions vers les skills.',
    descriptionSeo: 'Routine Push Pull Legs calisthénics : programme 3 jours pour la force et le muscle au poids du corps. Progressions skills. Gratuit.',
    materiel: ['Barre de traction', 'Anneaux (optionnel)'],
    conseils: ['1 jour de repos entre chaque séance', 'Travaille les skills (planche, front lever) en début de séance, à froid mais échauffé', 'Progresse vers les variantes plus dures'],
    blocs: [
      { titre: 'Jour 1 — Push', sousTitre: '4 séries', exercices: [
        { nom: 'Pompes pseudo-planche', slug: 'pseudo-planche-push-up', format: '4 × 8' },
        { nom: 'Pike push-up', slug: 'pike-push-up', format: '4 × 10' },
        { nom: 'Dips', slug: 'dips', format: '4 × 10' },
        { nom: 'Pompes diamant', slug: 'pompes-serrees', format: '3 × 12' },
      ]},
      { titre: 'Jour 2 — Pull', sousTitre: '4 séries', exercices: [
        { nom: 'Tractions', slug: 'tractions', format: '4 × 8' },
        { nom: 'Chin-ups', slug: 'tractions-supination', format: '3 × 8' },
        { nom: 'Front lever tuck', slug: 'front-lever-tuck', format: '4 × 8 s' },
        { nom: 'Relevé de jambes', slug: 'releve-de-jambes', format: '3 × 12' },
      ]},
      { titre: 'Jour 3 — Legs & Core', sousTitre: '4 séries', exercices: [
        { nom: 'Pistol squat (progression)', slug: 'pistol-squat', format: '4 × 6/jambe' },
        { nom: 'Squat bulgare', slug: 'squat-bulgare', format: '3 × 12/jambe' },
        { nom: 'Pont fessier une jambe', slug: 'pont-fessier', format: '3 × 12/jambe' },
        { nom: 'L-sit', slug: 'l-sit', format: '4 × 15 s' },
      ]},
    ],
  },
  // ═══════════════ MOBILITÉ & SOUPLESSE ═══════════════
  {
    slug: 'routine-souplesse-quotidienne',
    nom: 'Routine souplesse quotidienne — 15 min',
    type: 'mobilite',
    emoji: '🧘', couleur: '#0ea5e9', niveau: 'debutant', duree: '15 min/jour',
    objectif: 'Gagner en souplesse et mobilité globale',
    descriptionCourte: 'Une routine d\'étirements et de mobilité à faire chaque jour pour un corps plus souple, moins de raideurs et une meilleure posture.',
    descriptionSeo: 'Routine souplesse quotidienne 15 minutes : étirements et mobilité pour un corps souple. Programme complet sans matériel. Gratuit.',
    materiel: ['Tapis (recommandé)'],
    conseils: ['Ne force jamais : étire jusqu\'à une tension confortable', 'Respire profondément, tiens 30s par étirement', 'La régularité prime sur l\'intensité'],
    blocs: [
      { titre: 'Mobilité articulaire', sousTitre: 'Échauffement doux', exercices: [
        { nom: 'Cercles de bras et d\'épaules', format: '30 s' },
        { nom: 'Rotations du bassin', format: '30 s' },
        { nom: 'Cat-cow (dos rond / dos creux)', format: '8 reps' },
        { nom: 'Rotations des chevilles et poignets', format: '30 s' },
      ]},
      { titre: 'Étirements', sousTitre: 'Tenir 30 s chacun', exercices: [
        { nom: 'Étirement ischio-jambiers (jambes tendues)', format: '30 s' },
        { nom: 'Fente basse (psoas/hanches)', format: '30 s/côté' },
        { nom: 'Étirement pectoraux contre un mur', format: '30 s' },
        { nom: 'Posture de l\'enfant (dos/épaules)', format: '45 s' },
        { nom: 'Torsion vertébrale allongée', format: '30 s/côté' },
      ]},
    ],
  },
  {
    slug: 'mobilite-hanches-epaules',
    nom: 'Mobilité hanches & épaules',
    type: 'mobilite',
    emoji: '🔄', couleur: '#14b8a6', niveau: 'intermediaire', duree: '20 min',
    objectif: 'Débloquer hanches et épaules',
    descriptionCourte: 'Routine ciblée pour débloquer les hanches et les épaules, les deux zones les plus raides chez les pratiquants de musculation.',
    descriptionSeo: 'Routine mobilité hanches et épaules : débloque tes articulations pour mieux squatter et progresser aux skills. Sans matériel. Gratuit.',
    materiel: ['Tapis', 'Bâton ou élastique (optionnel)'],
    conseils: ['Idéal avant les jours de jambes ou de push', 'Mouvements lents et contrôlés', 'Parfait en récupération active'],
    blocs: [
      { titre: 'Hanches', exercices: [
        { nom: '90/90 hip switch', format: '8/côté' },
        { nom: 'Fente du coureur avec rotation', format: '6/côté' },
        { nom: 'Squat profond tenu (deep squat hold)', format: '60 s' },
        { nom: 'Pont fessier', slug: 'pont-fessier', format: '15 reps' },
      ]},
      { titre: 'Épaules', exercices: [
        { nom: 'Dislocations à l\'élastique/bâton', format: '10 reps' },
        { nom: 'Rotations externes', format: '12/côté' },
        { nom: 'Étirement épaules sol (prière)', format: '45 s' },
        { nom: 'Wall slides (glissés au mur)', format: '12 reps' },
      ]},
    ],
  },
  {
    slug: 'etirements-post-seance',
    nom: 'Étirements post-séance',
    type: 'mobilite',
    emoji: '🧊', couleur: '#a78bfa', niveau: 'debutant', duree: '10 min',
    objectif: 'Récupérer et limiter les courbatures',
    descriptionCourte: 'Routine d\'étirements à faire après chaque entraînement pour favoriser la récupération, réduire les courbatures et entretenir la souplesse.',
    descriptionSeo: 'Étirements après la musculation : routine de récupération pour réduire les courbatures et gagner en souplesse. Sans matériel. Gratuit.',
    materiel: ['Tapis (optionnel)'],
    conseils: ['À faire à chaud, juste après la séance', 'Étirements statiques, tenir 30s', 'Respire lentement pour relâcher les muscles'],
    blocs: [
      { titre: 'Bas du corps', exercices: [
        { nom: 'Étirement quadriceps debout', format: '30 s/jambe' },
        { nom: 'Étirement ischio-jambiers', format: '30 s/jambe' },
        { nom: 'Étirement mollets contre un mur', format: '30 s/jambe' },
        { nom: 'Étirement fessiers (figure 4)', format: '30 s/côté' },
      ]},
      { titre: 'Haut du corps', exercices: [
        { nom: 'Étirement triceps au-dessus de la tête', format: '30 s/bras' },
        { nom: 'Étirement pectoraux', format: '30 s' },
        { nom: 'Étirement dos (posture de l\'enfant)', format: '45 s' },
        { nom: 'Étirement cou et trapèzes', format: '30 s/côté' },
      ]},
    ],
  },
]

export function getCalPlanBySlug(slug: string): CalPlan | undefined {
  return CAL_PLANS.find(p => p.slug === slug)
}
