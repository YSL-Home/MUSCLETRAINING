import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import ExerciseCard from '@/components/ExerciseCard'
import { MUSCLES, getMuscleBySlug } from '@/data/muscles'
import { getExercisesByMuscleAndMode } from '@/data/exercises'

type Lieu = 'maison' | 'salle'
const LIEUX: Lieu[] = ['maison', 'salle']
const LIEU_LABEL: Record<Lieu, string> = { maison: 'à la maison', salle: 'en salle' }
const LIEU_SUB: Record<Lieu, string> = { maison: 'sans matériel', salle: 'avec matériel' }

interface Combo { muscleSlug: string; lieu: Lieu }

function parseSlug(slug: string): Combo | null {
  // format: exercices-<muscle>-<maison|salle>
  const m = slug.match(/^exercices-(.+)-(maison|salle)$/)
  if (!m) return null
  return { muscleSlug: m[1], lieu: m[2] as Lieu }
}

export function generateStaticParams() {
  const params: { slug: string }[] = []
  for (const muscle of MUSCLES) {
    for (const lieu of LIEUX) {
      params.push({ slug: `exercices-${muscle.slug}-${lieu}` })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const combo = parseSlug(slug)
  if (!combo) return {}
  const muscle = getMuscleBySlug(combo.muscleSlug)
  if (!muscle) return {}
  const count = getExercisesByMuscleAndMode(muscle.id, combo.lieu).length
  const title = `${count} Exercices ${muscle.nom} ${LIEU_LABEL[combo.lieu]} (${LIEU_SUB[combo.lieu]})`
  return {
    title,
    description: `Les meilleurs exercices pour muscler ${muscle.nomPluriel} ${LIEU_LABEL[combo.lieu]} ${LIEU_SUB[combo.lieu]}. ${count} mouvements avec vidéos, technique et conseils.`,
    alternates: { canonical: `https://www.muscletraining.uk/guides/${slug}` },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const combo = parseSlug(slug)
  if (!combo) notFound()
  const muscle = getMuscleBySlug(combo.muscleSlug)
  if (!muscle) notFound()

  const exercices = getExercisesByMuscleAndMode(muscle.id, combo.lieu)
  if (!exercices.length) notFound()

  const otherLieu: Lieu = combo.lieu === 'maison' ? 'salle' : 'maison'
  const faq = [
    {
      q: `Quels sont les meilleurs exercices ${muscle.nom.toLowerCase()} ${LIEU_LABEL[combo.lieu]} ?`,
      a: `Les ${Math.min(3, exercices.length)} exercices les plus efficaces sont ${exercices.slice(0, 3).map(e => e.nom).join(', ')}. Cette page regroupe ${exercices.length} exercices ciblant ${muscle.nomPluriel}.`,
    },
    {
      q: `Peut-on muscler ${muscle.nomPluriel} ${LIEU_LABEL[combo.lieu]} ${LIEU_SUB[combo.lieu]} ?`,
      a: combo.lieu === 'maison'
        ? `Oui, ${muscle.nomPluriel} se travaillent très bien au poids du corps. ${exercices.length} exercices sans matériel sont présentés ici avec vidéos.`
        : `Oui, en salle vous disposez de barres, haltères et machines pour cibler ${muscle.nomPluriel} avec charge progressive. ${exercices.length} exercices sont détaillés.`,
    },
    {
      q: `Combien de fois par semaine entraîner ${muscle.nomPluriel} ?`,
      a: `Pour des résultats optimaux, entraînez ${muscle.nomPluriel} 2 fois par semaine en laissant 48h de récupération entre les séances.`,
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[
          { nom: 'Accueil', url: '/' },
          { nom: muscle.nom, url: `/muscles/${muscle.slug}` },
          { nom: `Exercices ${LIEU_LABEL[combo.lieu]}` },
        ]} />

        <div className="mt-6 mb-8">
          <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
            style={{ background: muscle.couleurSvg + '20', color: muscle.couleurSvg }}>
            {combo.lieu === 'maison' ? '🏠 Sans matériel' : '🏋️ Avec matériel'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#EDE8E0' }}>
            Exercices {muscle.nom} {LIEU_LABEL[combo.lieu]}
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: '#8A9BB5' }}>
            {exercices.length} exercices pour muscler {muscle.nomPluriel} {LIEU_LABEL[combo.lieu]} {LIEU_SUB[combo.lieu]},
            avec vidéos techniques et conseils. {muscle.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {exercices.map(ex => <ExerciseCard key={ex.slug} exercise={ex} />)}
        </div>

        {/* Maillage interne */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link href={`/guides/exercices-${muscle.slug}-${otherLieu}`}
            className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors hover:text-[#E63946]"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#8A9BB5', border: '1px solid rgba(230,57,70,0.12)' }}>
            Voir les exercices {muscle.nom} {LIEU_LABEL[otherLieu]} →
          </Link>
          <Link href={`/muscles/${muscle.slug}`}
            className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors hover:text-[#E63946]"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#8A9BB5', border: '1px solid rgba(230,57,70,0.12)' }}>
            Fiche complète {muscle.nom} →
          </Link>
          <Link href={`/programmes/${combo.lieu}`}
            className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors hover:text-[#E63946]"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#8A9BB5', border: '1px solid rgba(230,57,70,0.12)' }}>
            Programmes {LIEU_SUB[combo.lieu]} →
          </Link>
        </div>

        {/* FAQ visible */}
        <section>
          <h2 className="text-2xl font-black mb-5" style={{ color: '#EDE8E0' }}>Questions fréquentes</h2>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <details key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
                <summary className="font-bold cursor-pointer" style={{ color: '#EDE8E0' }}>{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
