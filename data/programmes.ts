export type NiveauProgramme = 'debutant' | 'intermediaire' | 'avance'
export type ObjectifProgramme = 'force' | 'hypertrophie' | 'perte-poids' | 'endurance'
export type ModeProgramme = 'salle' | 'maison'

export interface ExerciceSemaine {
  slug: string
  nom: string
  series: number
  repetitions: string
  repos: number
  notes?: string
}

export interface JourEntrainement {
  numero: number
  nom: string
  focus: string
  exercices: ExerciceSemaine[]
}

export interface Programme {
  slug: string
  nom: string
  description: string
  descriptionSeo: string
  mode: ModeProgramme
  niveau: NiveauProgramme
  objectif: ObjectifProgramme
  dureeWeeks: number
  joursParSemaine: number
  tempsParSeance: number
  materielRequis: string[]
  avantages: string[]
  jours: JourEntrainement[]
}

export const PROGRAMMES: Programme[] = [
  // ════════════════════════════════════════
  // SALLE
  // ════════════════════════════════════════
  {
    slug: 'full-body-debutant-salle',
    nom: 'Full Body Débutant Salle',
    description: 'Programme idéal pour débuter à la salle. 3 séances par semaine sollicitant l\'ensemble du corps à chaque entraînement.',
    descriptionSeo: 'Programme musculation débutant salle 3 jours/semaine. Full body complet avec exercices de base, vidéos et conseils. Gratuit.',
    mode: 'salle',
    niveau: 'debutant',
    objectif: 'hypertrophie',
    dureeWeeks: 8,
    joursParSemaine: 3,
    tempsParSeance: 60,
    materielRequis: ['Barre', 'Haltères', 'Banc', 'Rack à squat'],
    avantages: [
      'Travaille tout le corps à chaque séance',
      'Fréquence élevée = apprentissage technique rapide',
      '3 séances = facile à caser dans son emploi du temps',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Full Body A',
        focus: 'Force fondamentaux',
        exercices: [
          { slug: 'squat-barre', nom: 'Squat barre', series: 3, repetitions: '5', repos: 180 },
          { slug: 'developpe-couche-barre', nom: 'Développé couché barre', series: 3, repetitions: '5', repos: 180 },
          { slug: 'rowing-barre', nom: 'Rowing barre', series: 3, repetitions: '5', repos: 180 },
          { slug: 'planche', nom: 'Planche', series: 3, repetitions: '30 secondes', repos: 60 },
          { slug: 'mollets-debout', nom: 'Mollets debout', series: 3, repetitions: '15', repos: 60 },
        ],
      },
      {
        numero: 2,
        nom: 'Mercredi — Full Body B',
        focus: 'Volume et isolation',
        exercices: [
          { slug: 'souleve-de-terre', nom: 'Soulevé de terre', series: 3, repetitions: '5', repos: 180 },
          { slug: 'developpe-halteres-epaules', nom: 'Développé haltères épaules', series: 3, repetitions: '8-10', repos: 90 },
          { slug: 'tirage-poitrine', nom: 'Tirage poitrine', series: 3, repetitions: '8-10', repos: 90 },
          { slug: 'curl-barre', nom: 'Curl barre', series: 3, repetitions: '10-12', repos: 60 },
          { slug: 'extension-triceps-poulie', nom: 'Extension triceps poulie', series: 3, repetitions: '10-12', repos: 60 },
        ],
      },
      {
        numero: 3,
        nom: 'Vendredi — Full Body C',
        focus: 'Puissance et finition',
        exercices: [
          { slug: 'squat-gobelet', nom: 'Squat gobelet', series: 3, repetitions: '10', repos: 90 },
          { slug: 'developpe-couche-halteres', nom: 'Développé couché haltères', series: 3, repetitions: '8-10', repos: 90 },
          { slug: 'rowing-haltere', nom: 'Rowing haltère', series: 3, repetitions: '10', repos: 90 },
          { slug: 'fentes', nom: 'Fentes en marche', series: 3, repetitions: '10/jambe', repos: 90 },
          { slug: 'elevations-laterales', nom: 'Élévations latérales', series: 3, repetitions: '12-15', repos: 60 },
        ],
      },
    ],
  },
  {
    slug: 'ppl-intermediaire-salle',
    nom: 'Push Pull Legs Intermédiaire',
    description: 'Le programme le plus populaire en musculation. 6 séances sur 2 semaines, alternant jours de poussée, tirage et jambes.',
    descriptionSeo: 'Programme PPL Push Pull Legs intermédiaire salle. 6 jours/2 semaines, hypertrophie maximale. Exercices, séries et vidéos.',
    mode: 'salle',
    niveau: 'intermediaire',
    objectif: 'hypertrophie',
    dureeWeeks: 12,
    joursParSemaine: 4,
    tempsParSeance: 75,
    materielRequis: ['Barre', 'Haltères', 'Poulie', 'Machine', 'Banc'],
    avantages: [
      'Fréquence optimale pour chaque groupe musculaire (2x/semaine)',
      'Spécialisation par séance = plus d\'intensité par muscle',
      'Très populaire, évolutif sur le long terme',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Push (Poussée)',
        focus: 'Pectoraux, épaules, triceps',
        exercices: [
          { slug: 'developpe-couche-barre', nom: 'Développé couché barre', series: 4, repetitions: '6-8', repos: 180, notes: 'Exercice principal — progressez 2.5kg/semaine' },
          { slug: 'developpe-incline-barre', nom: 'Développé incliné barre', series: 3, repetitions: '8-10', repos: 120 },
          { slug: 'developpe-halteres-epaules', nom: 'Développé haltères épaules', series: 3, repetitions: '10-12', repos: 120 },
          { slug: 'ecarte-halteres', nom: 'Écarté haltères', series: 3, repetitions: '12-15', repos: 90 },
          { slug: 'elevations-laterales', nom: 'Élévations latérales', series: 4, repetitions: '15-20', repos: 60 },
          { slug: 'extension-triceps-poulie', nom: 'Extension triceps poulie', series: 3, repetitions: '12-15', repos: 60 },
        ],
      },
      {
        numero: 2,
        nom: 'Mardi — Pull (Tirage)',
        focus: 'Dos, biceps, trapèzes',
        exercices: [
          { slug: 'souleve-de-terre', nom: 'Soulevé de terre', series: 4, repetitions: '5', repos: 180, notes: 'Exercice principal — progressez 5kg/semaine' },
          { slug: 'tractions', nom: 'Tractions', series: 3, repetitions: '6-10', repos: 120 },
          { slug: 'rowing-barre', nom: 'Rowing barre', series: 3, repetitions: '8-10', repos: 120 },
          { slug: 'tirage-poitrine', nom: 'Tirage poitrine', series: 3, repetitions: '10-12', repos: 90 },
          { slug: 'curl-barre', nom: 'Curl barre', series: 3, repetitions: '10-12', repos: 90 },
          { slug: 'curl-marteau', nom: 'Curl marteau', series: 3, repetitions: '12-15', repos: 60 },
          { slug: 'haussements-epaules', nom: 'Haussements d\'épaules', series: 3, repetitions: '12-15', repos: 60 },
        ],
      },
      {
        numero: 3,
        nom: 'Mercredi — Legs (Jambes)',
        focus: 'Quadriceps, ischio-jambiers, mollets, fessiers',
        exercices: [
          { slug: 'squat-barre', nom: 'Squat barre', series: 4, repetitions: '6-8', repos: 180, notes: 'Exercice principal — progressez 2.5kg/semaine' },
          { slug: 'souleve-de-terre-roumain', nom: 'SDT Roumain', series: 3, repetitions: '8-10', repos: 120 },
          { slug: 'presse-cuisses', nom: 'Presse à cuisses', series: 3, repetitions: '10-12', repos: 120 },
          { slug: 'fentes', nom: 'Fentes en marche', series: 3, repetitions: '12/jambe', repos: 90 },
          { slug: 'hip-thrust', nom: 'Hip Thrust barre', series: 3, repetitions: '12-15', repos: 90 },
          { slug: 'mollets-debout', nom: 'Mollets debout', series: 4, repetitions: '15-20', repos: 60 },
        ],
      },
      {
        numero: 4,
        nom: 'Jeudi — Repos',
        focus: 'Récupération active',
        exercices: [],
      },
    ],
  },
  {
    slug: 'upper-lower-intermediaire',
    nom: 'Upper / Lower Intermédiaire',
    description: 'Programme 4 jours alternant séances haut du corps et bas du corps. Excellent équilibre entre volume et récupération.',
    descriptionSeo: 'Programme Upper Lower 4 jours par semaine. Force et hypertrophie, exercices complets avec vidéos.',
    mode: 'salle',
    niveau: 'intermediaire',
    objectif: 'force',
    dureeWeeks: 10,
    joursParSemaine: 4,
    tempsParSeance: 70,
    materielRequis: ['Barre', 'Haltères', 'Poulie', 'Banc'],
    avantages: [
      'Haute fréquence (chaque muscle 2x/semaine)',
      'Alternance efficace permettant une bonne récupération',
      'Idéal pour progresser en force ET en volume',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Upper A (Force)',
        focus: 'Haut du corps, force',
        exercices: [
          { slug: 'developpe-couche-barre', nom: 'Développé couché barre', series: 4, repetitions: '4-6', repos: 180 },
          { slug: 'rowing-barre', nom: 'Rowing barre', series: 4, repetitions: '4-6', repos: 180 },
          { slug: 'developpe-militaire', nom: 'Développé militaire', series: 3, repetitions: '6-8', repos: 120 },
          { slug: 'tractions', nom: 'Tractions', series: 3, repetitions: '6-10', repos: 120 },
          { slug: 'curl-barre', nom: 'Curl barre', series: 3, repetitions: '10-12', repos: 90 },
          { slug: 'dips', nom: 'Dips', series: 3, repetitions: '10-12', repos: 90 },
        ],
      },
      {
        numero: 2,
        nom: 'Mardi — Lower A (Force)',
        focus: 'Bas du corps, force',
        exercices: [
          { slug: 'squat-barre', nom: 'Squat barre', series: 4, repetitions: '4-6', repos: 180 },
          { slug: 'souleve-de-terre-roumain', nom: 'SDT Roumain', series: 3, repetitions: '6-8', repos: 180 },
          { slug: 'presse-cuisses', nom: 'Presse à cuisses', series: 3, repetitions: '8-10', repos: 120 },
          { slug: 'hip-thrust', nom: 'Hip Thrust barre', series: 3, repetitions: '8-10', repos: 120 },
          { slug: 'mollets-debout', nom: 'Mollets debout', series: 4, repetitions: '12-15', repos: 60 },
        ],
      },
      {
        numero: 3,
        nom: 'Jeudi — Upper B (Volume)',
        focus: 'Haut du corps, hypertrophie',
        exercices: [
          { slug: 'developpe-couche-halteres', nom: 'Développé couché haltères', series: 4, repetitions: '8-12', repos: 120 },
          { slug: 'tirage-poitrine', nom: 'Tirage poitrine', series: 4, repetitions: '8-12', repos: 120 },
          { slug: 'elevations-laterales', nom: 'Élévations latérales', series: 4, repetitions: '12-15', repos: 60 },
          { slug: 'rowing-haltere', nom: 'Rowing haltère', series: 3, repetitions: '10-12', repos: 90 },
          { slug: 'curl-halteres-alternes', nom: 'Curl haltères alternés', series: 3, repetitions: '12-15', repos: 60 },
          { slug: 'extension-triceps-poulie', nom: 'Extension triceps poulie', series: 3, repetitions: '12-15', repos: 60 },
        ],
      },
      {
        numero: 4,
        nom: 'Vendredi — Lower B (Volume)',
        focus: 'Bas du corps, hypertrophie',
        exercices: [
          { slug: 'squat-bulgare', nom: 'Squat bulgare', series: 4, repetitions: '10-12/jambe', repos: 90 },
          { slug: 'souleve-de-terre', nom: 'Soulevé de terre', series: 3, repetitions: '5', repos: 180 },
          { slug: 'fentes', nom: 'Fentes en marche', series: 3, repetitions: '12/jambe', repos: 90 },
          { slug: 'hip-thrust', nom: 'Hip Thrust barre', series: 4, repetitions: '12-15', repos: 90 },
          { slug: 'mollets-assis', nom: 'Mollets assis', series: 4, repetitions: '15-20', repos: 60 },
        ],
      },
    ],
  },
  // ════════════════════════════════════════
  // MAISON
  // ════════════════════════════════════════
  {
    slug: 'full-body-debutant-maison',
    nom: 'Full Body Débutant Maison',
    description: 'Programme 3 jours/semaine sans matériel. Idéal pour débuter chez soi avec le seul poids du corps.',
    descriptionSeo: 'Programme musculation débutant maison sans matériel. 3 séances/semaine poids du corps. Exercices, vidéos et conseils.',
    mode: 'maison',
    niveau: 'debutant',
    objectif: 'hypertrophie',
    dureeWeeks: 6,
    joursParSemaine: 3,
    tempsParSeance: 45,
    materielRequis: ['Aucun (poids du corps uniquement)'],
    avantages: [
      'Zéro matériel requis',
      'Peut se faire n\'importe où',
      'Idéal pour prendre l\'habitude de l\'entraînement',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Full Body A',
        focus: 'Force générale',
        exercices: [
          { slug: 'pompes', nom: 'Pompes', series: 3, repetitions: '8-15', repos: 60, notes: 'Sur les genoux si nécessaire au début' },
          { slug: 'pont-fessier', nom: 'Pont fessier', series: 3, repetitions: '15', repos: 60 },
          { slug: 'planche', nom: 'Planche', series: 3, repetitions: '20-45 secondes', repos: 60 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers', series: 3, repetitions: '20 (10/jambe)', repos: 45 },
          { slug: 'mollets-debout', nom: 'Mollets debout', series: 3, repetitions: '20', repos: 45 },
        ],
      },
      {
        numero: 2,
        nom: 'Mercredi — Full Body B',
        focus: 'Jambes et abdos',
        exercices: [
          { slug: 'squat-gobelet', nom: 'Squat (poids du corps)', series: 3, repetitions: '15-20', repos: 60, notes: 'Sans haltère au début' },
          { slug: 'fentes', nom: 'Fentes en marche', series: 3, repetitions: '10/jambe', repos: 60 },
          { slug: 'crunch', nom: 'Crunch', series: 3, repetitions: '15-20', repos: 45 },
          { slug: 'donkey-kicks', nom: 'Donkey Kicks', series: 3, repetitions: '15/jambe', repos: 45 },
          { slug: 'pompes-serrees', nom: 'Pompes serrées', series: 3, repetitions: '6-12', repos: 60 },
        ],
      },
      {
        numero: 3,
        nom: 'Vendredi — Full Body C + Cardio',
        focus: 'Endurance musculaire',
        exercices: [
          { slug: 'burpees', nom: 'Burpees', series: 3, repetitions: '8-12', repos: 60, notes: 'Sans saut si débutant' },
          { slug: 'pompes-declinees', nom: 'Pompes déclinées', series: 3, repetitions: '8-12', repos: 60, notes: 'Pieds sur une chaise' },
          { slug: 'squat-gobelet', nom: 'Squat sauté', series: 3, repetitions: '10-15', repos: 60 },
          { slug: 'planche', nom: 'Planche latérale', series: 3, repetitions: '20 secondes/côté', repos: 45 },
          { slug: 'crunch', nom: 'Bicycle Crunch', series: 3, repetitions: '20 (10/côté)', repos: 45 },
        ],
      },
    ],
  },
  {
    slug: 'calisthenics-intermediaire-maison',
    nom: 'Calisthenics Intermédiaire',
    description: 'Programme de street workout / calisthenics à la maison ou en extérieur avec barre de traction. Force et esthétique au poids du corps.',
    descriptionSeo: 'Programme calisthenics intermédiaire maison. Barre de traction, progressions, muscle-up. Pour un corps athlétique.',
    mode: 'maison',
    niveau: 'intermediaire',
    objectif: 'force',
    dureeWeeks: 10,
    joursParSemaine: 4,
    tempsParSeance: 60,
    materielRequis: ['Barre de traction (porte ou extérieur)'],
    avantages: [
      'Corps athlétique naturel',
      'Force fonctionnelle au poids du corps',
      'Seule une barre de traction requise',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Push Day',
        focus: 'Poitrine, épaules, triceps',
        exercices: [
          { slug: 'pompes', nom: 'Pompes classiques', series: 4, repetitions: '15-20', repos: 90 },
          { slug: 'pompes-declinees', nom: 'Pompes déclinées', series: 3, repetitions: '12-15', repos: 90 },
          { slug: 'pike-push-up', nom: 'Pike Push-up', series: 3, repetitions: '10-15', repos: 90 },
          { slug: 'dips', nom: 'Dips sur chaises', series: 4, repetitions: '12-15', repos: 90 },
          { slug: 'pompes-serrees', nom: 'Pompes diamant', series: 3, repetitions: '10-15', repos: 60 },
        ],
      },
      {
        numero: 2,
        nom: 'Mardi — Pull Day',
        focus: 'Dos, biceps',
        exercices: [
          { slug: 'tractions', nom: 'Tractions pronation', series: 4, repetitions: '5-8', repos: 120, notes: 'Ajouter élastique si difficile' },
          { slug: 'tractions-supination', nom: 'Chin-ups', series: 3, repetitions: '6-10', repos: 120 },
          { slug: 'tractions', nom: 'Tractions prise large', series: 3, repetitions: '5-8', repos: 120 },
          { slug: 'curl-halteres-alternes', nom: 'Curl avec élastique', series: 3, repetitions: '12-15', repos: 60 },
        ],
      },
      {
        numero: 3,
        nom: 'Jeudi — Legs + Core',
        focus: 'Jambes, abdominaux',
        exercices: [
          { slug: 'squat-bulgare', nom: 'Squat bulgare', series: 4, repetitions: '10-12/jambe', repos: 90 },
          { slug: 'fentes', nom: 'Fentes sautées', series: 3, repetitions: '10/jambe', repos: 90 },
          { slug: 'pont-fessier', nom: 'Pont fessier une jambe', series: 3, repetitions: '12/jambe', repos: 60 },
          { slug: 'planche', nom: 'Planche', series: 3, repetitions: '45-60 secondes', repos: 60 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers', series: 3, repetitions: '30 secondes', repos: 45 },
          { slug: 'crunch', nom: 'Crunch', series: 3, repetitions: '20', repos: 45 },
        ],
      },
      {
        numero: 4,
        nom: 'Samedi — Full Body Power',
        focus: 'Puissance et endurance',
        exercices: [
          { slug: 'burpees', nom: 'Burpees', series: 4, repetitions: '10', repos: 60 },
          { slug: 'tractions', nom: 'Tractions explosives', series: 4, repetitions: '5', repos: 120 },
          { slug: 'pompes', nom: 'Pompes explosives (clap)', series: 3, repetitions: '8-10', repos: 90 },
          { slug: 'squat-gobelet', nom: 'Squat sauté', series: 4, repetitions: '12', repos: 60 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers sprint', series: 4, repetitions: '20 secondes', repos: 30 },
        ],
      },
    ],
  },
  {
    slug: 'hiit-perte-poids-maison',
    nom: 'HIIT Brûle-Graisses Maison',
    description: 'Programme HIIT (High Intensity Interval Training) 4 jours/semaine pour brûler les graisses et muscler le corps sans matériel.',
    descriptionSeo: 'Programme HIIT maison pour perdre du poids. 4 séances/semaine, 30-40 min, poids du corps. Brûle calories maximalement.',
    mode: 'maison',
    niveau: 'intermediaire',
    objectif: 'perte-poids',
    dureeWeeks: 8,
    joursParSemaine: 4,
    tempsParSeance: 35,
    materielRequis: ['Aucun (poids du corps uniquement)'],
    avantages: [
      'Brûle le maximum de calories en minimum de temps',
      'Continue à brûler après l\'entraînement (EPOC)',
      'Améliore endurance et composition corporelle simultanément',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — HIIT Haut du corps',
        focus: 'Cardio + poitrine + bras',
        exercices: [
          { slug: 'burpees', nom: 'Burpees', series: 4, repetitions: '30 secondes travail / 15 secondes repos', repos: 15 },
          { slug: 'pompes', nom: 'Pompes rapides', series: 4, repetitions: '30 secondes / 15 secondes repos', repos: 15 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers', series: 4, repetitions: '30 secondes / 15 secondes repos', repos: 15 },
          { slug: 'dips', nom: 'Dips chaise rapides', series: 4, repetitions: '30 secondes / 15 secondes repos', repos: 15 },
          { slug: 'planche', nom: 'Planche dynamique', series: 3, repetitions: '30 secondes', repos: 20 },
        ],
      },
      {
        numero: 2,
        nom: 'Mercredi — HIIT Bas du corps',
        focus: 'Cardio + jambes + fessiers',
        exercices: [
          { slug: 'squat-gobelet', nom: 'Squat sauté', series: 4, repetitions: '30 secondes / 15 secondes repos', repos: 15 },
          { slug: 'fentes', nom: 'Fentes alternées sautées', series: 4, repetitions: '30 secondes / 15 secondes repos', repos: 15 },
          { slug: 'donkey-kicks', nom: 'Donkey Kicks rapides', series: 3, repetitions: '30 secondes / 15 secondes repos', repos: 15 },
          { slug: 'pont-fessier', nom: 'Pont fessier pulsé', series: 3, repetitions: '30 secondes', repos: 20 },
          { slug: 'mollets-debout', nom: 'Sauts de mollets', series: 3, repetitions: '30 secondes', repos: 20 },
        ],
      },
      {
        numero: 3,
        nom: 'Vendredi — HIIT Full Body',
        focus: 'Corps entier, cardio intense',
        exercices: [
          { slug: 'burpees', nom: 'Burpees avec saut', series: 5, repetitions: '10 reps', repos: 30 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers sprint', series: 5, repetitions: '20 secondes max', repos: 20 },
          { slug: 'pompes', nom: 'Pompes', series: 5, repetitions: '10 reps', repos: 30 },
          { slug: 'squat-gobelet', nom: 'Squat sauté', series: 5, repetitions: '10 reps', repos: 30 },
        ],
      },
      {
        numero: 4,
        nom: 'Samedi — Cardio doux + Gainage',
        focus: 'Récupération active',
        exercices: [
          { slug: 'planche', nom: 'Planche', series: 4, repetitions: '45-60 secondes', repos: 30 },
          { slug: 'crunch', nom: 'Crunch', series: 3, repetitions: '20', repos: 30 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers lents', series: 3, repetitions: '30 secondes', repos: 30 },
          { slug: 'pompes', nom: 'Pompes lentes (3-1-3)', series: 3, repetitions: '8-10', repos: 60 },
          { slug: 'pont-fessier', nom: 'Pont fessier', series: 3, repetitions: '15', repos: 45 },
        ],
      },
    ],
  },
  // ════════════════════════════════════════
  // PILATES & CALISTHENICS AVANCÉ
  // ════════════════════════════════════════
  {
    slug: 'pilates-core-debutant-maison',
    nom: 'Pilates & Core Débutant',
    description: 'Programme Pilates 3 jours/semaine pour renforcer le core, corriger la posture et gagner en souplesse. Aucun matériel requis.',
    descriptionSeo: 'Programme Pilates débutant maison. 3 séances/semaine, core profond, posture, souplesse. Exercices Pilates avec instructions détaillées.',
    mode: 'maison',
    niveau: 'debutant',
    objectif: 'endurance',
    dureeWeeks: 4,
    joursParSemaine: 3,
    tempsParSeance: 40,
    materielRequis: ['Tapis de yoga (recommandé)'],
    avantages: [
      'Renforce le core profond et stabilisateurs',
      'Améliore la posture et réduit les douleurs dorsales',
      'Idéal en complément de tout autre programme',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Activation & Stabilité',
        focus: 'Core profond, lombaires',
        exercices: [
          { slug: 'dead-bug', nom: 'Dead Bug', series: 3, repetitions: '8/côté', repos: 45, notes: 'Dos plaqué au sol en permanence' },
          { slug: 'bird-dog', nom: 'Bird Dog', series: 3, repetitions: '10/côté', repos: 45 },
          { slug: 'clamshell', nom: 'Clamshell', series: 3, repetitions: '15/côté', repos: 30 },
          { slug: 'pont-fessier', nom: 'Pont fessier', series: 3, repetitions: '15', repos: 30 },
          { slug: 'planche', nom: 'Planche basse', series: 3, repetitions: '20-30 secondes', repos: 45 },
        ],
      },
      {
        numero: 2,
        nom: 'Mercredi — Core & Mobilité',
        focus: 'Abdominaux, flexibilité',
        exercices: [
          { slug: 'hundred-pilates', nom: 'The Hundred', series: 1, repetitions: '100 battements (progression)', repos: 60, notes: 'Genoux fléchis pour débutant' },
          { slug: 'roll-up', nom: 'Roll Up', series: 3, repetitions: '8', repos: 45 },
          { slug: 'dead-bug', nom: 'Dead Bug progressif', series: 3, repetitions: '10/côté', repos: 45 },
          { slug: 'bird-dog', nom: 'Bird Dog tenu', series: 3, repetitions: '6/côté — 3s maintenu', repos: 60 },
          { slug: 'crunch', nom: 'Crunch contrôlé', series: 3, repetitions: '15', repos: 30 },
        ],
      },
      {
        numero: 3,
        nom: 'Vendredi — Full Body Pilates',
        focus: 'Intégration corps entier',
        exercices: [
          { slug: 'swimming-pilates', nom: 'Swimming Pilates', series: 3, repetitions: '20 secondes', repos: 30 },
          { slug: 'clamshell', nom: 'Clamshell avec progression', series: 3, repetitions: '15/côté', repos: 30 },
          { slug: 'hundred-pilates', nom: 'The Hundred', series: 1, repetitions: '100 battements', repos: 60 },
          { slug: 'roll-up', nom: 'Roll Up', series: 3, repetitions: '10', repos: 45 },
          { slug: 'planche', nom: 'Planche latérale', series: 3, repetitions: '20 secondes/côté', repos: 45 },
        ],
      },
    ],
  },
  {
    slug: 'poids-corps-intermediaire-maison',
    nom: 'Renforcement Poids du Corps',
    description: 'Programme intermédiaire 3 jours/semaine mixant Pilates, hollow body et calisthenics léger pour un corps fort et contrôlé.',
    descriptionSeo: 'Programme renforcement poids du corps intermédiaire. Mix Pilates et calisthenics, 3 séances/semaine, aucun matériel. Résultats garantis.',
    mode: 'maison',
    niveau: 'intermediaire',
    objectif: 'hypertrophie',
    dureeWeeks: 6,
    joursParSemaine: 3,
    tempsParSeance: 50,
    materielRequis: ['Tapis de yoga', 'Élastiques (optionnel)'],
    avantages: [
      'Allie gainage profond et force fonctionnelle',
      'Progressions Pilates → calisthenics intégrées',
      'Idéal après un programme débutant maison',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Core & Haut du Corps',
        focus: 'Abdominaux, poitrine, épaules',
        exercices: [
          { slug: 'hollow-body', nom: 'Hollow Body Hold', series: 4, repetitions: '20-30 secondes', repos: 45, notes: 'Bas du dos collé au sol' },
          { slug: 'dead-bug', nom: 'Dead Bug', series: 3, repetitions: '10/côté', repos: 45 },
          { slug: 'pseudo-planche-push-up', nom: 'Pseudo Planche Push-up', series: 4, repetitions: '8-12', repos: 90 },
          { slug: 'pompes', nom: 'Pompes classiques', series: 3, repetitions: '15-20', repos: 60 },
          { slug: 'planche', nom: 'Planche dynamique', series: 3, repetitions: '30-45 secondes', repos: 45 },
        ],
      },
      {
        numero: 2,
        nom: 'Mercredi — Jambes & Gainage',
        focus: 'Quadriceps, fessiers, core',
        exercices: [
          { slug: 'hollow-body', nom: 'Hollow Body Rock', series: 3, repetitions: '15 balancements', repos: 45 },
          { slug: 'swimming-pilates', nom: 'Swimming Pilates', series: 3, repetitions: '30 secondes', repos: 30 },
          { slug: 'shrimp-squat', nom: 'Shrimp Squat (progression)', series: 4, repetitions: '5-8/jambe', repos: 90, notes: 'Progression : tenir la cheville arrière' },
          { slug: 'pont-fessier', nom: 'Pont fessier une jambe', series: 3, repetitions: '12/jambe', repos: 45 },
          { slug: 'clamshell', nom: 'Clamshell lestés', series: 3, repetitions: '15/côté', repos: 30 },
        ],
      },
      {
        numero: 3,
        nom: 'Samedi — Full Body Intégration',
        focus: 'Force totale, endurance',
        exercices: [
          { slug: 'l-sit', nom: 'L-sit (tuck progression)', series: 4, repetitions: '10-15 secondes', repos: 60, notes: 'Genoux fléchis pour débuter' },
          { slug: 'pseudo-planche-push-up', nom: 'Pseudo Planche Push-up', series: 3, repetitions: '10-15', repos: 90 },
          { slug: 'bird-dog', nom: 'Bird Dog tenu', series: 3, repetitions: '8/côté', repos: 45 },
          { slug: 'pompes', nom: 'Pompes explosives', series: 4, repetitions: '10', repos: 60 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers', series: 3, repetitions: '30 secondes', repos: 30 },
        ],
      },
    ],
  },
  {
    slug: 'force-avance-maison',
    nom: 'Force Avancé Maison',
    description: 'Programme avancé au poids du corps pour ceux qui maîtrisent les bases. Progressions vers tractions lestées, handstand push-up et pistol squat.',
    descriptionSeo: 'Programme force avancé maison. Progressions calisthenics : handstand, pistol squat, tractions lestées. Pour athlètes confirmés.',
    mode: 'maison',
    niveau: 'avance',
    objectif: 'force',
    dureeWeeks: 12,
    joursParSemaine: 4,
    tempsParSeance: 70,
    materielRequis: ['Barre de traction', 'Élastiques (optionnel)'],
    avantages: [
      'Progressions vers des skills avancés',
      'Force fonctionnelle maximale',
      'Minimal matériel, résultats maximaux',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Push Avancé',
        focus: 'Poitrine, épaules, triceps — progressions',
        exercices: [
          { slug: 'pompes-declinees', nom: 'Pompes pieds haut (handstand progression)', series: 5, repetitions: '8-12', repos: 120 },
          { slug: 'pike-push-up', nom: 'Pike Push-up avancé', series: 4, repetitions: '8-12', repos: 120 },
          { slug: 'pompes', nom: 'Pompes à un bras (progression)', series: 4, repetitions: '5-8/bras', repos: 120 },
          { slug: 'dips', nom: 'Dips lestés', series: 4, repetitions: '8-10', repos: 120 },
          { slug: 'pompes-serrees', nom: 'Pompes diamant explosives', series: 3, repetitions: '8-12', repos: 90 },
        ],
      },
      {
        numero: 2,
        nom: 'Mardi — Pull Avancé',
        focus: 'Dos, biceps — progressions',
        exercices: [
          { slug: 'tractions', nom: 'Tractions lestées', series: 5, repetitions: '5-8', repos: 180 },
          { slug: 'tractions-supination', nom: 'Chin-ups lestés', series: 4, repetitions: '5-8', repos: 180 },
          { slug: 'tractions', nom: 'Tractions à une main (progression)', series: 4, repetitions: '3-5/bras', repos: 180 },
          { slug: 'releve-de-jambes', nom: 'Relevé de jambes suspendu', series: 4, repetitions: '10-15', repos: 90 },
        ],
      },
      {
        numero: 3,
        nom: 'Jeudi — Legs Avancé',
        focus: 'Pistol squat, sauts, force jambes',
        exercices: [
          { slug: 'squat-bulgare', nom: 'Squat bulgare lest', series: 4, repetitions: '8-10/jambe', repos: 120 },
          { slug: 'squat-gobelet', nom: 'Pistol squat (progression)', series: 4, repetitions: '5-8/jambe', repos: 120 },
          { slug: 'fentes', nom: 'Fentes sautées lestées', series: 4, repetitions: '8/jambe', repos: 90 },
          { slug: 'pont-fessier', nom: 'Pont fessier une jambe', series: 4, repetitions: '12-15/jambe', repos: 60 },
          { slug: 'mollets-debout', nom: 'Mollets unijambiste', series: 4, repetitions: '12-15/jambe', repos: 60 },
        ],
      },
      {
        numero: 4,
        nom: 'Samedi — Full Body + Skill Work',
        focus: 'Compétences et puissance',
        exercices: [
          { slug: 'burpees', nom: 'Burpees lestés', series: 5, repetitions: '8', repos: 90 },
          { slug: 'tractions', nom: 'Tractions explosives', series: 4, repetitions: '5', repos: 120 },
          { slug: 'pompes', nom: 'Pompes claquées', series: 4, repetitions: '6-8', repos: 120 },
          { slug: 'mountain-climbers', nom: 'Mountain Climbers sprint', series: 5, repetitions: '20 secondes max', repos: 30 },
          { slug: 'planche', nom: 'Planche dynamique', series: 3, repetitions: '60 secondes', repos: 60 },
        ],
      },
    ],
  },
  {
    slug: 'calisthenics-expert-maison',
    nom: 'Calisthenics Expert',
    description: 'Programme élite pour athlètes aguerris. Progressions vers front lever, muscle-up, dragon flag et L-sit. 4 séances intenses par semaine.',
    descriptionSeo: 'Programme calisthenics expert maison. Front lever, muscle-up, dragon flag, pistol squat. 4 jours/semaine, 8 semaines. Pour athlètes avancés.',
    mode: 'maison',
    niveau: 'avance',
    objectif: 'force',
    dureeWeeks: 8,
    joursParSemaine: 4,
    tempsParSeance: 75,
    materielRequis: ['Barre de traction (obligatoire)', 'Anneaux (optionnel)'],
    avantages: [
      'Progressions vers les skills les plus techniques du calisthenics',
      'Force maximale au poids du corps',
      'Corps athlétique et esthétique extrême',
    ],
    jours: [
      {
        numero: 1,
        nom: 'Lundi — Push Skill Day',
        focus: 'Pseudo planche, force triceps/épaules',
        exercices: [
          { slug: 'pseudo-planche-push-up', nom: 'Pseudo Planche Push-up', series: 5, repetitions: '8-12', repos: 120, notes: 'Doigts vers les pieds, épaules au-dessus des mains' },
          { slug: 'archer-push-up', nom: 'Archer Push-up', series: 4, repetitions: '6-8/côté', repos: 120 },
          { slug: 'pike-push-up', nom: 'Pike Push-up vertical', series: 4, repetitions: '8-12', repos: 90 },
          { slug: 'dips', nom: 'Dips lestés', series: 4, repetitions: '8-10', repos: 90 },
          { slug: 'hollow-body', nom: 'Hollow Body tenu', series: 3, repetitions: '30-45 secondes', repos: 60 },
        ],
      },
      {
        numero: 2,
        nom: 'Mardi — Pull Skill Day',
        focus: 'Muscle-up, front lever, tractions',
        exercices: [
          { slug: 'muscle-up', nom: 'Muscle-up', series: 5, repetitions: '3-5', repos: 180, notes: 'Nécessite maîtrise des tractions explosives' },
          { slug: 'front-lever-tuck', nom: 'Front Lever Tuck', series: 5, repetitions: '5-8 secondes maintenu', repos: 180 },
          { slug: 'skin-the-cat', nom: 'Skin the Cat', series: 4, repetitions: '4-6', repos: 120 },
          { slug: 'tractions', nom: 'Tractions lestes (poids)', series: 4, repetitions: '5-6', repos: 150 },
          { slug: 'releve-de-jambes', nom: 'Relevé de jambes barre', series: 4, repetitions: '10-15', repos: 60 },
        ],
      },
      {
        numero: 3,
        nom: 'Jeudi — Legs & Core Elite',
        focus: 'Pistol squat, dragon flag, L-sit',
        exercices: [
          { slug: 'pistol-squat', nom: 'Pistol Squat', series: 5, repetitions: '5-8/jambe', repos: 120, notes: 'Progression : tenir un support au début' },
          { slug: 'shrimp-squat', nom: 'Shrimp Squat', series: 4, repetitions: '6-8/jambe', repos: 120 },
          { slug: 'dragon-flag', nom: 'Dragon Flag', series: 4, repetitions: '5-8', repos: 120, notes: 'Progression negative (descente contrôlée)' },
          { slug: 'l-sit', nom: 'L-sit', series: 5, repetitions: '10-15 secondes', repos: 90 },
          { slug: 'hollow-body', nom: 'Hollow Body Rock', series: 3, repetitions: '20 balancements', repos: 60 },
        ],
      },
      {
        numero: 4,
        nom: 'Samedi — Full Skill Integration',
        focus: 'Puissance, skills combinés',
        exercices: [
          { slug: 'muscle-up', nom: 'Muscle-up explosif', series: 4, repetitions: '3', repos: 180 },
          { slug: 'pseudo-planche-push-up', nom: 'Pseudo Planche Push-up rapides', series: 3, repetitions: '10-15', repos: 120 },
          { slug: 'pistol-squat', nom: 'Pistol squat sauté', series: 4, repetitions: '4/jambe', repos: 90 },
          { slug: 'dragon-flag', nom: 'Dragon Flag complet', series: 3, repetitions: '5-6', repos: 150 },
          { slug: 'l-sit', nom: 'L-sit tenu max', series: 3, repetitions: 'Max (viser 20s+)', repos: 90 },
        ],
      },
    ],
  },
]

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return PROGRAMMES.find(p => p.slug === slug)
}

export function getProgrammesByMode(mode: ModeProgramme): Programme[] {
  return PROGRAMMES.filter(p => p.mode === mode)
}

export function getProgrammesByNiveau(niveau: NiveauProgramme): Programme[] {
  return PROGRAMMES.filter(p => p.niveau === niveau)
}
