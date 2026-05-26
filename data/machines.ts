import type { MuscleId } from './muscles'

export interface Machine {
  slug: string
  nom: string
  aliases: string[]           // noms alternatifs pour la recherche
  description: string
  image?: string
  musclesPrimaires: MuscleId[]
  musclesSecondaires: MuscleId[]
  exercicesSlug: string[]     // exercices liés dans exercises.ts
  exercicesMachine: ExerciceMachine[]
}

export interface ExerciceMachine {
  nom: string
  description: string
  seriesReps: string
  conseils: string
}

export const MACHINES: Machine[] = [
  {
    slug: 'presse-cuisses',
    nom: 'Presse à cuisses',
    aliases: ['leg press', 'presse jambes', 'machine jambes', 'presse'],
    description: 'Machine guidée pour travailler les jambes en sécurité. Permet de charger lourd sans solliciter la colonne vertébrale.',
    musclesPrimaires: ['quadriceps'],
    musclesSecondaires: ['fessiers', 'ischio-jambiers', 'mollets'],
    exercicesSlug: ['presse-cuisses', 'squat-barre', 'fentes'],
    exercicesMachine: [
      { nom: 'Presse pieds hauts', description: 'Pieds en haut de la plateforme pour cibler les fessiers et ischio-jambiers.', seriesReps: '4×10-12', conseils: 'Ne verrouillez jamais complètement les genoux en haut.' },
      { nom: 'Presse pieds bas', description: 'Pieds en bas de la plateforme pour isoler les quadriceps.', seriesReps: '4×12-15', conseils: 'Amplitude réduite si douleur au genou.' },
      { nom: 'Presse unilatérale', description: 'Un seul pied pour corriger les déséquilibres gauche/droite.', seriesReps: '3×10/jambe', conseils: 'Commencez par la jambe faible.' },
    ],
  },
  {
    slug: 'tirage-poulie-haute',
    nom: 'Poulie haute (Lat Pulldown)',
    aliases: ['lat pulldown', 'tirage nuque', 'tirage barre haute', 'tirage poitrine', 'poulie haute'],
    description: 'Machine à câble pour simuler les tractions. Idéale pour développer le grand dorsal et progresser vers les vraies tractions.',
    musclesPrimaires: ['dos'],
    musclesSecondaires: ['biceps', 'trapezes', 'epaules'],
    exercicesSlug: ['tirage-poitrine', 'tractions'],
    exercicesMachine: [
      { nom: 'Tirage poitrine prise large', description: 'Prise en pronation, tirez la barre vers le haut du sternum.', seriesReps: '4×10-12', conseils: 'Pensez à "enfoncer les coudes dans vos poches".' },
      { nom: 'Tirage prise neutre', description: 'Poignée neutre (paumes face à face), plus confortable pour les épaules.', seriesReps: '4×10-12', conseils: 'Excellent pour les débutants.' },
      { nom: 'Tirage supination', description: 'Paumes vers vous, prise serrée. Cible davantage les biceps.', seriesReps: '3×12-15', conseils: 'Équivalent des chin-ups à la machine.' },
    ],
  },
  {
    slug: 'cable-rowing',
    nom: 'Rowing câble basse poulie',
    aliases: ['rowing basse poulie', 'tirage horizontal', 'seated row', 'basse poulie', 'poulie basse', 'rowing assis'],
    description: 'Machine à câble pour développer l\'épaisseur du dos et les rhomboïdes. Mouvement horizontal de traction.',
    musclesPrimaires: ['dos', 'trapezes'],
    musclesSecondaires: ['biceps', 'epaules', 'lombaires'],
    exercicesSlug: ['rowing-barre', 'rowing-haltere'],
    exercicesMachine: [
      { nom: 'Rowing prise neutre', description: 'Tirez le câble vers le nombril, coudes le long du corps.', seriesReps: '4×10-12', conseils: 'Contractez les omoplates en fin de mouvement.' },
      { nom: 'Rowing prise large', description: 'Barre large, tirez vers le bas de la poitrine. Cible les trapèzes inférieurs.', seriesReps: '3×12', conseils: 'Légère inclinaison du buste vers l\'avant.' },
    ],
  },
  {
    slug: 'pec-deck',
    nom: 'Pec Deck (Butterfly / Chest Fly)',
    aliases: ['butterfly', 'machine pectoraux', 'pec deck', 'ecarte machine', 'machine poitrine'],
    description: 'Machine d\'isolation pour les pectoraux. Travaille la contraction finale et l\'étirement des pecs sans solliciter les triceps.',
    musclesPrimaires: ['pectoraux'],
    musclesSecondaires: ['epaules'],
    exercicesSlug: ['ecarte-halteres', 'developpe-couche-barre'],
    exercicesMachine: [
      { nom: 'Écarté machine classique', description: 'Ramenez les coudes en contractant les pectoraux en fin de mouvement.', seriesReps: '4×12-15', conseils: 'Ne laissez pas le poids redescendre trop vite.' },
      { nom: 'Écarté avec pause', description: 'Maintenez 2 secondes à la fermeture pour maximiser la contraction.', seriesReps: '3×12', conseils: 'Charge modérée pour préserver les épaules.' },
    ],
  },
  {
    slug: 'machine-epaules',
    nom: 'Machine développé épaules (Shoulder Press Machine)',
    aliases: ['développé épaules machine', 'shoulder press machine', 'machine épaules', 'presse épaules'],
    description: 'Développé militaire guidé. Plus sûr que la barre pour les débutants ou en fin de séance.',
    musclesPrimaires: ['epaules'],
    musclesSecondaires: ['triceps', 'trapezes'],
    exercicesSlug: ['developpe-militaire', 'developpe-halteres-epaules'],
    exercicesMachine: [
      { nom: 'Press épaules classique', description: 'Poussez vers le haut jusqu\'à quasi-extension, redescendez lentement.', seriesReps: '4×10-12', conseils: 'Dos bien calé dans le siège.' },
      { nom: 'Press épaules unilatéral', description: 'Un bras à la fois pour corriger les déséquilibres.', seriesReps: '3×12/bras', conseils: 'Commencez par le côté faible.' },
    ],
  },
  {
    slug: 'extension-jambes',
    nom: 'Machine extension jambes (Leg Extension)',
    aliases: ['leg extension', 'extension quadriceps', 'machine quadriceps', 'extension jambe'],
    description: 'Isolation directe des quadriceps. Excellent pour finir une séance jambes ou pour la rééducation du genou.',
    musclesPrimaires: ['quadriceps'],
    musclesSecondaires: [],
    exercicesSlug: ['presse-cuisses', 'squat-barre'],
    exercicesMachine: [
      { nom: 'Extension jambes bilatérale', description: 'Tendez les deux jambes simultanément, contractez fort en haut.', seriesReps: '4×12-15', conseils: 'Orteils vers vous en haut pour mieux isoler le vaste médial.' },
      { nom: 'Extension unilatérale', description: 'Une jambe à la fois, travail d\'équilibrage.', seriesReps: '3×12/jambe', conseils: 'Charge plus faible, amplitude complète.' },
    ],
  },
  {
    slug: 'curl-jambes',
    nom: 'Machine curl jambes (Leg Curl)',
    aliases: ['leg curl', 'curl ischios', 'machine ischio', 'curl ischio-jambiers', 'machine hamstring'],
    description: 'Isolation des ischio-jambiers en position allongée ou assise. Indispensable pour développer et protéger l\'arrière de la cuisse.',
    musclesPrimaires: ['ischio-jambiers'],
    musclesSecondaires: ['mollets', 'fessiers'],
    exercicesSlug: ['souleve-de-terre-roumain'],
    exercicesMachine: [
      { nom: 'Curl couché bilatéral', description: 'Fléchissez les jambes vers les fessiers en contractant les ischios.', seriesReps: '4×12-15', conseils: 'Descendez lentement (3 secondes) pour l\'excentrique.' },
      { nom: 'Curl assis', description: 'Position assise, genoux à 90° en partant. Plus d\'étirement des ischios.', seriesReps: '3×12', conseils: 'L\'étirement en position assise est supérieur au curl couché.' },
    ],
  },
  {
    slug: 'adducteur-machine',
    nom: 'Machine adducteurs (Hip Adductor)',
    aliases: ['machine adducteurs', 'hip adductor', 'machine intérieur cuisses', 'adducteur'],
    description: 'Renforce les adducteurs (intérieur des cuisses). Essentiel pour la stabilité du genou et prévenir les blessures.',
    musclesPrimaires: ['quadriceps'],
    musclesSecondaires: ['fessiers'],
    exercicesSlug: ['squat-bulgare', 'fentes'],
    exercicesMachine: [
      { nom: 'Adduction classique', description: 'Ramenez les genoux l\'un vers l\'autre lentement.', seriesReps: '3×15-20', conseils: 'Ne claquez pas les genoux ensemble, contrôlez.' },
    ],
  },
  {
    slug: 'abducteur-machine',
    nom: 'Machine abducteurs (Hip Abductor)',
    aliases: ['machine abducteurs', 'hip abductor', 'machine extérieur cuisses', 'abducteur'],
    description: 'Renforce les abducteurs et le moyen fessier. Stabilise le bassin et réduit le risque de blessure au genou.',
    musclesPrimaires: ['fessiers'],
    musclesSecondaires: [],
    exercicesSlug: ['pont-fessier', 'squat-bulgare'],
    exercicesMachine: [
      { nom: 'Abduction classique', description: 'Écartez les genoux vers l\'extérieur contre la résistance.', seriesReps: '3×15-20', conseils: 'Dos droit, ne basculez pas le buste.' },
    ],
  },
  {
    slug: 'mollets-machine',
    nom: 'Machine mollets debout (Standing Calf Raise)',
    aliases: ['standing calf raise', 'machine mollets', 'mollets debout machine', 'calf raise'],
    description: 'Machine pour développer les mollets (gastrocnémien) avec une amplitude complète et une charge guidée.',
    musclesPrimaires: ['mollets'],
    musclesSecondaires: [],
    exercicesSlug: ['mollets-debout', 'mollets-assis'],
    exercicesMachine: [
      { nom: 'Mollets debout amplitude complète', description: 'Descendez sous la marche, montez le plus haut possible.', seriesReps: '5×15-20', conseils: 'Maintenez 1 seconde en haut, descendez lentement.' },
    ],
  },
  {
    slug: 'poulie-triceps',
    nom: 'Poulie triceps (Triceps Pushdown)',
    aliases: ['poulie triceps', 'triceps machine', 'pushdown', 'extension triceps cable', 'triceps câble'],
    description: 'Machine câble idéale pour isoler les triceps. La corde ou la barre permettent différents angles d\'attaque.',
    musclesPrimaires: ['triceps'],
    musclesSecondaires: [],
    exercicesSlug: ['extension-triceps-poulie', 'dips'],
    exercicesMachine: [
      { nom: 'Extension corde', description: 'Tirez la corde vers le bas en l\'écartant en fin de mouvement.', seriesReps: '4×12-15', conseils: 'Coudes fixes collés au corps.' },
      { nom: 'Extension barre droite', description: 'Barre droite ou EZ, tirez vers le bas.', seriesReps: '4×12-15', conseils: 'Légère inclinaison du buste vers l\'avant.' },
      { nom: 'Extension au-dessus de la tête', description: 'Poulie haute, corde derrière la tête. Cible le chef long.', seriesReps: '3×15', conseils: 'Excellent pour le volume total du triceps.' },
    ],
  },
  {
    slug: 'poulie-biceps',
    nom: 'Poulie biceps (Cable Curl)',
    aliases: ['cable curl', 'curl câble', 'poulie biceps', 'biceps cable'],
    description: 'Curl au câble basse poulie. Tension constante sur le biceps tout au long du mouvement.',
    musclesPrimaires: ['biceps'],
    musclesSecondaires: ['avant-bras'],
    exercicesSlug: ['curl-barre', 'curl-halteres-alternes'],
    exercicesMachine: [
      { nom: 'Curl barre droite basse poulie', description: 'Fléchissez les coudes en gardant les épaules fixes.', seriesReps: '4×12-15', conseils: 'La tension constante du câble est supérieure aux haltères.' },
      { nom: 'Curl corde marteau', description: 'Corde, prise neutre, montez jusqu\'au visage.', seriesReps: '3×15', conseils: 'Cible le brachial et l\'avant-bras en plus du biceps.' },
    ],
  },
  {
    slug: 'smith-machine',
    nom: 'Smith Machine (Barre guidée)',
    aliases: ['smith machine', 'barre guidée', 'cage smith', 'multipower'],
    description: 'Barre guidée sur rails verticaux. Permet de s\'entraîner sans partenaire de sécurité pour les exercices polyarticulaires.',
    musclesPrimaires: ['pectoraux', 'quadriceps', 'epaules'],
    musclesSecondaires: ['triceps', 'dos', 'fessiers'],
    exercicesSlug: ['developpe-couche-barre', 'squat-barre', 'developpe-militaire'],
    exercicesMachine: [
      { nom: 'Développé couché Smith', description: 'Bench press guidé. Idéal sans partenaire de sécurité.', seriesReps: '4×8-12', conseils: 'Ajustez la barre légèrement vers le visage car le mouvement est fixé.' },
      { nom: 'Squat Smith', description: 'Pieds légèrement en avant de la barre. Excellent pour les débutants.', seriesReps: '4×10-12', conseils: 'Moins de recrutement des stabilisateurs qu\'au squat libre.' },
      { nom: 'Développé militaire Smith', description: 'Assis, poussez la barre vers le haut.', seriesReps: '4×10-12', conseils: 'Utile pour une charge lourde sans partenaire.' },
    ],
  },
  {
    slug: 'hyperextension-banc',
    nom: 'Banc à lombaires (Hyperextension)',
    aliases: ['hyperextension', 'banc lombaires', 'roman chair', 'back extension'],
    description: 'Renforcement des lombaires, fessiers et ischio-jambiers. Indispensable pour un dos solide et protégé.',
    musclesPrimaires: ['lombaires'],
    musclesSecondaires: ['fessiers', 'ischio-jambiers', 'trapezes'],
    exercicesSlug: ['souleve-de-terre', 'superman'],
    exercicesMachine: [
      { nom: 'Hyperextension classique', description: 'Descendez le buste vers le sol, remontez jusqu\'à alignement.', seriesReps: '4×12-15', conseils: 'Ne montez pas au-delà de l\'horizontal (hyperextension lombaire).' },
      { nom: 'Hyperextension avec rotation', description: 'Ajoutez une rotation du buste en montant pour travailler les obliques.', seriesReps: '3×12 (alternée)', conseils: 'Charge légère ou poids du corps seulement.' },
    ],
  },
  {
    slug: 'tapis-roulant',
    nom: 'Tapis roulant',
    aliases: ['treadmill', 'tapis de course', 'tapis roulant'],
    description: 'Cardio et endurance. Peut être utilisé pour l\'échauffement, la récupération active ou l\'entraînement fractionné (HIIT).',
    musclesPrimaires: ['quadriceps', 'ischio-jambiers', 'mollets'],
    musclesSecondaires: ['fessiers', 'abdominaux'],
    exercicesSlug: ['mountain-climbers', 'squat-barre'],
    exercicesMachine: [
      { nom: 'Marche inclinée (Incline Walk)', description: '15% d\'inclinaison, 5-6 km/h. Brûle des calories sans impact.', seriesReps: '20-40 minutes', conseils: 'Ne tenez pas les barres latérales pour maximiser les calories.' },
      { nom: 'Fractionné HIIT', description: '30s sprint / 90s marche, répété 10 fois.', seriesReps: '10 intervalles', conseils: 'Augmentez la vitesse de sprint progressivement.' },
    ],
  },
  {
    slug: 'velo-elliptique',
    nom: 'Vélo elliptique',
    aliases: ['elliptique', 'cross trainer', 'velo elliptique', 'elliptical'],
    description: 'Cardio à faible impact articulaire. Sollicite simultanément le bas et le haut du corps.',
    musclesPrimaires: ['quadriceps', 'ischio-jambiers'],
    musclesSecondaires: ['fessiers', 'epaules', 'dos'],
    exercicesSlug: ['burpees', 'mountain-climbers'],
    exercicesMachine: [
      { nom: 'Elliptique résistance haute', description: 'Résistance élevée à cadence lente. Force musculaire.', seriesReps: '15-20 minutes', conseils: 'Poussez avec les bras autant que vous tirez.' },
      { nom: 'Elliptique HIIT', description: '1 minute résistance max / 2 minutes facile.', seriesReps: '8 cycles', conseils: 'Variez aussi la résistance des bras.' },
    ],
  },
]

export function searchMachine(query: string): Machine[] {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return []
  return MACHINES.filter(m =>
    m.nom.toLowerCase().includes(q) ||
    m.aliases.some(a => a.toLowerCase().includes(q)) ||
    m.slug.includes(q)
  )
}

export function getMachineBySlug(slug: string): Machine | undefined {
  return MACHINES.find(m => m.slug === slug)
}
