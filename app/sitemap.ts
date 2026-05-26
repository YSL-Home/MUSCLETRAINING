import type { MetadataRoute } from 'next'
import { MUSCLES } from '@/data/muscles'
import { EXERCISES } from '@/data/exercises'
import { PROGRAMMES } from '@/data/programmes'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.musclegym.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/programmes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/programmes/salle`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/programmes/maison`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/calculateurs`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const muscleRoutes: MetadataRoute.Sitemap = MUSCLES.map(m => ({
    url: `${BASE_URL}/muscles/${m.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const exerciceRoutes: MetadataRoute.Sitemap = EXERCISES.map(e => ({
    url: `${BASE_URL}/exercice/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const programmeRoutes: MetadataRoute.Sitemap = PROGRAMMES.map(p => ({
    url: `${BASE_URL}/programmes/${p.mode}/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...muscleRoutes, ...exerciceRoutes, ...programmeRoutes]
}
