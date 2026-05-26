import type { Exercise } from '@/data/exercises'
import type { Programme } from '@/data/programmes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.musclegym.fr'

export function exerciseSchema(exercise: Exercise, muscleNom: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: exercise.nom,
    description: exercise.descriptionSeo,
    image: `${SITE_URL}/images/exercises/${exercise.slug}.jpg`,
    video: {
      '@type': 'VideoObject',
      name: `Comment faire : ${exercise.nom}`,
      description: exercise.descriptionCourte,
      thumbnailUrl: `https://img.youtube.com/vi/${exercise.videoYoutube}/maxresdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${exercise.videoYoutube}`,
      uploadDate: '2024-01-01',
      contentUrl: `https://www.youtube.com/watch?v=${exercise.videoYoutube}`,
    },
    step: exercise.instructions.map((instruction, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: instruction,
    })),
    tool: exercise.materiel.map(m => ({
      '@type': 'HowToTool',
      name: m,
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
      name: 'MuscleGym',
      url: SITE_URL,
    },
    courseMode: programme.mode === 'salle' ? 'onsite' : 'online',
    educationalLevel: programme.niveau,
    timeRequired: `P${programme.dureeWeeks}W`,
    numberOfCredits: programme.joursParSemaine,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MuscleGym',
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
