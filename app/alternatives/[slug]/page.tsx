import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import ExerciseCard from '@/components/ExerciseCard'
import AffiliateRecommendations from '@/components/AffiliateRecommendations'
import { EXERCISES, getExerciseBySlug } from '@/data/exercises'
import { getMuscleById } from '@/data/muscles'
import type { Materiel } from '@/data/exercises'

export function generateStaticParams() {
  return EXERCISES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const ex = getExerciseBySlug(slug)
  if (!ex) return {}
  const title = `${ex.nom} : 6 Alternatives et Variantes Efficaces`
  const desc = `Les meilleures alternatives au ${ex.nom} pour cibler les mêmes muscles, à la maison ou en salle. Variantes avec vidéos et conseils.`
  const img = ex.videoYoutube ? `https://img.youtube.com/vi/${ex.videoYoutube}/maxresdefault.jpg` : 'https://www.muscletraining.uk/logo-512.png'
  const url = `https://www.muscletraining.uk/alternatives/${slug}`
  return {
    title, description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, images: [img] },
    twitter: { card: 'summary_large_image', title, description: desc, images: [img] },
  }
}

export default async function AlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ex = getExerciseBySlug(slug)
  if (!ex) notFound()

  const primaire = ex.musclesPrimaires[0]
  const muscle = getMuscleById(primaire)

  // Alternatives : variantes déclarées + même muscle primaire, hors lui-même
  const variantes = ex.varianteSlugs.map(getExerciseBySlug).filter(Boolean)
  const sameMuscle = EXERCISES.filter(e =>
    e.slug !== ex.slug &&
    !ex.varianteSlugs.includes(e.slug) &&
    e.musclesPrimaires[0] === primaire
  )
  const alternatives = [...variantes, ...sameMuscle].filter(Boolean).slice(0, 9) as typeof EXERCISES

  if (!alternatives.length) notFound()

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `Par quoi remplacer le ${ex.nom} ?`, acceptedAnswer: { '@type': 'Answer', text: `Tu peux remplacer le ${ex.nom} par : ${alternatives.slice(0, 4).map(a => a.nom).join(', ')}. Ces exercices ciblent les mêmes muscles (${muscle?.nom ?? ''}).` } },
      { '@type': 'Question', name: `Quelle alternative au ${ex.nom} à la maison ?`, acceptedAnswer: { '@type': 'Answer', text: `À la maison, privilégie : ${alternatives.filter(a => a.mode !== 'salle').slice(0, 3).map(a => a.nom).join(', ') || 'des variantes au poids du corps'}.` } },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[
          { nom: 'Accueil', url: '/' },
          { nom: ex.nom, url: `/exercice/${ex.slug}` },
          { nom: 'Alternatives' },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#EDE8E0' }}>
            Alternatives au {ex.nom}
          </h1>
          <p className="text-lg max-w-3xl" style={{ color: '#8A9BB5' }}>
            {alternatives.length} exercices pour remplacer le {ex.nom} et travailler {muscle?.nomPluriel ?? 'les mêmes muscles'},
            en salle ou à la maison. Idéal si tu n&apos;as pas le matériel, pour varier ou en cas de gêne.
          </p>
          <Link href={`/exercice/${ex.slug}`} className="inline-block mt-3 text-sm font-semibold hover:underline" style={{ color: '#E63946' }}>
            ← Revoir l&apos;exercice original : {ex.nom}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {alternatives.map(a => <ExerciseCard key={a.slug} exercise={a} />)}
        </div>

        <AffiliateRecommendations materiels={[...new Set(alternatives.flatMap(a => a.materiel))] as Materiel[]} />
      </div>
    </>
  )
}
