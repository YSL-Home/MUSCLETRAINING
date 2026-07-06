export type MuscleId =
  | 'pectoraux' | 'dos' | 'epaules' | 'biceps' | 'triceps'
  | 'avant-bras' | 'abdominaux' | 'quadriceps' | 'ischio-jambiers'
  | 'fessiers' | 'mollets' | 'trapezes' | 'lombaires'

export interface MuscleGroup {
  id: MuscleId
  nom: string
  nomPluriel: string
  slug: string
  description: string
  descriptionSeo: string
  emoji: string
  couleurSvg: string
  positionSvg: 'avant' | 'arriere' | 'les-deux'
  groupeCorps: 'haut' | 'milieu' | 'bas'
}

export const MUSCLES: MuscleGroup[] = [
  {
    id: 'pectoraux',
    nom: 'Pectoraux',
    nomPluriel: 'les pectoraux',
    slug: 'pectoraux',
    description: 'Les pectoraux forment le muscle principal de la poitrine. Ils permettent d\'adduxtion et de rotation interne du bras.',
    descriptionSeo: 'Exercices pour muscler les pectoraux : développé couché, pompes, écarté et bien plus. Guide complet avec vidéos et programmes salle / maison.',
    emoji: '💪',
    couleurSvg: '#E63946',
    positionSvg: 'avant',
    groupeCorps: 'haut',
  },
  {
    id: 'dos',
    nom: 'Dos',
    nomPluriel: 'le dos',
    slug: 'dos',
    description: 'Le dos regroupe plusieurs muscles : grand dorsal, rhomboïdes, trapèzes inférieurs. Essentiels pour la posture et les mouvements de traction.',
    descriptionSeo: 'Exercices pour muscler le dos : tractions, rowing, soulevé de terre. Guide complet avec vidéos et programmes salle / maison.',
    emoji: '🏋️',
    couleurSvg: '#E63946',
    positionSvg: 'arriere',
    groupeCorps: 'haut',
  },
  {
    id: 'epaules',
    nom: 'Épaules',
    nomPluriel: 'les épaules',
    slug: 'epaules',
    description: 'Le deltoïde est divisé en trois faisceaux (antérieur, médian, postérieur). Ils assurent la mobilité complète de l\'articulation de l\'épaule.',
    descriptionSeo: 'Exercices pour muscler les épaules : développé militaire, élévations latérales, oiseau. Guide avec vidéos et programmes.',
    emoji: '🔷',
    couleurSvg: '#E63946',
    positionSvg: 'les-deux',
    groupeCorps: 'haut',
  },
  {
    id: 'biceps',
    nom: 'Biceps',
    nomPluriel: 'les biceps',
    slug: 'biceps',
    description: 'Le biceps brachial est le muscle principal de la face antérieure du bras. Il fléchit l\'avant-bras et tourne la paume vers le haut.',
    descriptionSeo: 'Exercices pour muscler les biceps : curl barre, curl haltères, tractions supination. Guide complet avec vidéos.',
    emoji: '💪',
    couleurSvg: '#E63946',
    positionSvg: 'avant',
    groupeCorps: 'haut',
  },
  {
    id: 'triceps',
    nom: 'Triceps',
    nomPluriel: 'les triceps',
    slug: 'triceps',
    description: 'Le triceps brachial représente les deux tiers de la masse du bras. Il étend l\'avant-bras et est sollicité dans tous les mouvements de poussée.',
    descriptionSeo: 'Exercices pour muscler les triceps : dips, extensions poulie, crâne. Guide complet avec vidéos et programmes.',
    emoji: '💪',
    couleurSvg: '#E63946',
    positionSvg: 'arriere',
    groupeCorps: 'haut',
  },
  {
    id: 'avant-bras',
    nom: 'Avant-bras',
    nomPluriel: 'les avant-bras',
    slug: 'avant-bras',
    description: 'Les avant-bras regroupent de nombreux muscles responsables des flexions et extensions du poignet et des doigts.',
    descriptionSeo: 'Exercices pour muscler les avant-bras : curl poignet, curl inversé, farmer\'s carry. Guide complet.',
    emoji: '💪',
    couleurSvg: '#E63946',
    positionSvg: 'avant',
    groupeCorps: 'haut',
  },
  {
    id: 'abdominaux',
    nom: 'Abdominaux',
    nomPluriel: 'les abdominaux',
    slug: 'abdominaux',
    description: 'La sangle abdominale protège les organes et stabilise le rachis. Elle comprend le grand droit, les obliques et le transverse.',
    descriptionSeo: 'Exercices pour muscler les abdominaux : planche, crunch, relevé de jambes. Guide complet avec vidéos et programmes maison.',
    emoji: '🔥',
    couleurSvg: '#E63946',
    positionSvg: 'avant',
    groupeCorps: 'milieu',
  },
  {
    id: 'lombaires',
    nom: 'Lombaires',
    nomPluriel: 'les lombaires',
    slug: 'lombaires',
    description: 'Les muscles lombaires (érecteurs du rachis) maintiennent la colonne vertébrale droite et participent aux mouvements d\'extension du dos.',
    descriptionSeo: 'Exercices pour renforcer les lombaires : hyperextension, good morning, soulevé de terre. Guide complet.',
    emoji: '🦴',
    couleurSvg: '#E63946',
    positionSvg: 'arriere',
    groupeCorps: 'milieu',
  },
  {
    id: 'quadriceps',
    nom: 'Quadriceps',
    nomPluriel: 'les quadriceps',
    slug: 'quadriceps',
    description: 'Le quadriceps est le muscle le plus volumineux du corps, composé de 4 chefs. Il assure l\'extension du genou et la flexion de la hanche.',
    descriptionSeo: 'Exercices pour muscler les quadriceps : squat, presse, fentes. Guide complet avec vidéos et programmes salle / maison.',
    emoji: '🦵',
    couleurSvg: '#E63946',
    positionSvg: 'avant',
    groupeCorps: 'bas',
  },
  {
    id: 'ischio-jambiers',
    nom: 'Ischio-jambiers',
    nomPluriel: 'les ischio-jambiers',
    slug: 'ischio-jambiers',
    description: 'Les ischio-jambiers sont les muscles postérieurs de la cuisse. Ils fléchissent le genou et étendent la hanche.',
    descriptionSeo: 'Exercices pour muscler les ischio-jambiers : soulevé roumain, curl jambes, nordic curl. Guide complet.',
    emoji: '🦵',
    couleurSvg: '#E63946',
    positionSvg: 'arriere',
    groupeCorps: 'bas',
  },
  {
    id: 'fessiers',
    nom: 'Fessiers',
    nomPluriel: 'les fessiers',
    slug: 'fessiers',
    description: 'Le grand fessier est le muscle le plus puissant du corps. Il étend et tourne la hanche vers l\'extérieur, essentiel pour courir et sauter.',
    descriptionSeo: 'Exercices pour muscler les fessiers : hip thrust, squat, pont fessier. Guide complet avec vidéos et programmes.',
    emoji: '🍑',
    couleurSvg: '#E63946',
    positionSvg: 'arriere',
    groupeCorps: 'bas',
  },
  {
    id: 'mollets',
    nom: 'Mollets',
    nomPluriel: 'les mollets',
    slug: 'mollets',
    description: 'Le mollet est composé du gastrocnémien (la "bosse") et du soléaire en dessous. Ils assurent la flexion plantaire du pied.',
    descriptionSeo: 'Exercices pour muscler les mollets : mollets debout, mollets assis, sautillements. Guide complet.',
    emoji: '🦵',
    couleurSvg: '#E63946',
    positionSvg: 'arriere',
    groupeCorps: 'bas',
  },
  {
    id: 'trapezes',
    nom: 'Trapèzes',
    nomPluriel: 'les trapèzes',
    slug: 'trapezes',
    description: 'Le trapèze est un grand muscle en forme de losange qui couvre le cou et le haut du dos. Il hausse, rétracte et abaisse les omoplates.',
    descriptionSeo: 'Exercices pour muscler les trapèzes : haussements d\'épaules, face pull, rowing. Guide complet.',
    emoji: '🦍',
    couleurSvg: '#E63946',
    positionSvg: 'arriere',
    groupeCorps: 'haut',
  },
]

export function getMuscleById(id: MuscleId): MuscleGroup | undefined {
  return MUSCLES.find(m => m.id === id)
}

export function getMuscleBySlug(slug: string): MuscleGroup | undefined {
  return MUSCLES.find(m => m.slug === slug)
}
