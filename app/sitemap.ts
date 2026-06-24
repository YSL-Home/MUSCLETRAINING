import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { EXERCISES } from '@/data/exercises'
import { MUSCLES } from '@/data/muscles'
import { PROGRAMMES } from '@/data/programmes'
import { SPORTS } from '@/data/sports'
import { ARTICLES } from '@/data/articles'
import { CAL_PLANS } from '@/data/calisthenics'

const BASE_URL = 'https://www.muscletraining.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  const exerciseUrls: MetadataRoute.Sitemap = EXERCISES.map((ex) => ({
    url: `${BASE_URL}/exercice/${ex.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const muscleUrls: MetadataRoute.Sitemap = MUSCLES.map((m) => ({
    url: `${BASE_URL}/muscles/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const alternativeUrls: MetadataRoute.Sitemap = EXERCISES.map((e) => ({
    url: `${BASE_URL}/alternatives/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const programmeUrls: MetadataRoute.Sitemap = PROGRAMMES.map((p) => ({
    url: `${BASE_URL}/programmes/${p.mode}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const guideUrls: MetadataRoute.Sitemap = MUSCLES.flatMap((m) =>
    (['maison', 'salle'] as const).map((lieu) => ({
      url: `${BASE_URL}/guides/exercices-${m.slug}-${lieu}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))
  )

  const sportUrls: MetadataRoute.Sitemap = SPORTS.map((s) => ({
    url: `${BASE_URL}/sport/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const articleUrls: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/programmes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/programmes/salle`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/programmes/maison`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...['tracker', 'machines', 'nutrition', 'materiel', 'glossaire', 'calculateurs', 'generateur', 'quiz', 'comparatif', 'sport', 'recherche'].map(
      (p): MetadataRoute.Sitemap[number] => ({
        url: `${BASE_URL}/${p}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    ),
  ]

  return [
    ...staticUrls,
    { url: `${BASE_URL}/calisthenics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/telegram`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...CAL_PLANS.map((p): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/calisthenics/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    ...exerciseUrls,
    ...muscleUrls,
    ...alternativeUrls,
    ...programmeUrls,
    ...guideUrls,
    ...sportUrls,
    ...articleUrls,
  ]
}
