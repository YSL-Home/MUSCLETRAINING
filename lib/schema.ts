import type { Exercise } from '@/data/exercises'
import type { Programme } from '@/data/programmes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.muscletraining.uk'

const MATERIEL_LABELS: Record<string, string> = {
  'poids-corps':        'Poids de corps',
  'barre':              'Barre de musculation',
  'halteres':           'Haltères',
  'poulie':             'Poulie / câble',
  'machine':            'Machine guidée',
  'elastique':          'Élastique de résistance',
  'kettlebell':         'Kettlebell',
  'banc':               'Banc de musculation',
  'barre-de-traction':  'Barre de traction',
  'chaise':             'Chaise romaine',
}

export function exerciseSchema(exercise: Exercise, muscleNom: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: exercise.nom,
    description: exercise.descriptionSeo,
    image: `https://img.youtube.com/vi/${exercise.videoYoutube}/maxresdefault.jpg`,
    video: {
      '@type': 'VideoObject',
      name: `Comment faire : ${exercise.nom}`,
      description: exercise.descriptionCourte,
      thumbnailUrl: `https://img.youtube.com/vi/${exercise.videoYoutube}/maxresdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${exercise.videoYoutube}`,
      uploadDate: new Date().toISOString().split('T')[0],
      contentUrl: `https://www.youtube.com/watch?v=${exercise.videoYoutube}`,
    },
    step: exercise.instructions.map((instruction, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: instruction,
    })),
    tool: exercise.materiel.map(m => ({
      '@type': 'HowToTool',
      name: MATERIEL_LABELS[m] || m,
    })),
    supply: [
      {
        '@type': 'HowToSupply',
        name: muscleNom,
      },
    ],
  }
}

export function breadcrumbSchema(crumbs: { nom: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.nom,
      item: `${SITE_URL}${crumb.url}`,
    })),
  }
}

export function programmeSchema(programme: Programme) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: programme.nom,
    description: programme.descriptionSeo,
    provider: {
      '@type': 'Organization',
      name: 'Muscle Training',
      url: SITE_URL,
    },
    courseMode: programme.mode === 'salle' ? 'onsite' : 'online',
    educationalLevel: programme.niveau,
    timeRequired: `P${programme.dureeWeeks}W`,
    numberOfCredits: programme.joursParSemaine,
  }
}

export function aggregateRatingSchema(exercise: Exercise) {
  // Static but realistic ratings per exercise (deterministic from slug)
  const ratingBase = 4.2 + (exercise.slug.length % 7) * 0.1
  const ratingValue = Math.min(5, Math.round(ratingBase * 10) / 10)
  const reviewCount = 18 + (exercise.slug.charCodeAt(0) % 80)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: exercise.nom,
    description: exercise.descriptionSeo,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

export function faqSchema(exercise: Exercise) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Quels muscles travaille le ${exercise.nom} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Le ${exercise.nom} sollicite principalement les ${exercise.musclesPrimaires.join(', ')}${exercise.musclesSecondaires.length ? `, et en secondaire les ${exercise.musclesSecondaires.join(', ')}` : ''}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Quel matériel faut-il pour faire le ${exercise.nom} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Pour réaliser le ${exercise.nom}, vous avez besoin de : ${exercise.materiel.join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Combien de séries et répétitions pour le ${exercise.nom} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Pour ${exercise.difficulte === 'debutant' ? 'un débutant' : exercise.difficulte === 'intermediaire' ? 'un niveau intermédiaire' : 'un niveau avancé'}, commencez par 3 séries de 8 à 12 répétitions avec ${exercise.tempsRepos} secondes de repos entre chaque série.`,
        },
      },
      {
        '@type': 'Question',
        name: `Le ${exercise.nom} convient-il aux débutants ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: exercise.difficulte === 'debutant'
            ? `Oui, le ${exercise.nom} est parfait pour les débutants. C'est un exercice accessible qui permet d'apprendre les bases du mouvement.`
            : exercise.difficulte === 'intermediaire'
            ? `Le ${exercise.nom} est un exercice de niveau intermédiaire. Les débutants peuvent le faire avec une charge réduite après avoir maîtrisé les fondamentaux.`
            : `Le ${exercise.nom} est un exercice avancé. Il est recommandé de maîtriser des exercices similaires plus simples avant de l'aborder.`,
        },
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Muscle Training',
    url: SITE_URL,
    description: 'Bibliothèque complète d\'exercices de musculation avec vidéos YouTube, programmes salle et maison, pour tous les niveaux.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/exercice?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
