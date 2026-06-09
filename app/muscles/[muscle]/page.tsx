import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import MuscleExerciseFilter from '@/components/MuscleExerciseFilter'
import AffiliateRecommendations from '@/components/AffiliateRecommendations'
import { getMuscleBySlug, MUSCLES } from '@/data/muscles'
import { getExercisesByMuscle } from '@/data/exercises'
import type { Materiel } from '@/data/exercises'

export async function generateStaticParams() {
  return MUSCLES.map(m => ({ muscle: m.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ muscle: string }> }
): Promise<Metadata> {
  const { muscle: muscleSlug } = await params
  const muscle = getMuscleBySlug(muscleSlug)
  if (!muscle) return {}

  const exos = getExercisesByMuscle(muscle.id)
  const count = exos.length
  const ogImg = exos[0]?.videoYoutube
    ? `https://img.youtube.com/vi/${exos[0].videoYoutube}/maxresdefault.jpg`
    : 'https://www.muscletraining.uk/logo-512.png'
  const url = `https://www.muscletraining.uk/muscles/${muscle.slug}`

  return {
    title: `Exercices ${muscle.nom} : ${count} Mouvements avec Vidéos`,
    description: muscle.descriptionSeo,
    alternates: { canonical: url },
    openGraph: {
      title: `Exercices ${muscle.nom} — Salle & Maison`,
      description: muscle.descriptionSeo,
      url,
      images: [ogImg],
    },
    twitter: { card: 'summary_large_image', title: `Exercices ${muscle.nom}`, description: muscle.descriptionSeo, images: [ogImg] },
  }
}

export default async function MusclePage({ params }: { params: Promise<{ muscle: string }> }) {
  const { muscle: muscleSlug } = await params
  const muscle = getMuscleBySlug(muscleSlug)
  if (!muscle) notFound()

  const allExercices = getExercisesByMuscle(muscle.id)
  const exercicesSalle = allExercices.filter(e => e.mode === 'salle' || e.mode === 'les-deux')
  const exercicesMaison = allExercices.filter(e => e.mode === 'maison' || e.mode === 'les-deux')

  return (
    <div style={{ background: '#07070F', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header bar */}
        <div className="flex items-center gap-4 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(230,57,70,0.1)' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: muscle.couleurSvg + '18', border: `1px solid ${muscle.couleurSvg}30` }}>
            <div className="w-5 h-5 rounded-full" style={{ background: muscle.couleurSvg }} />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: muscle.couleurSvg }}>Muscle</p>
            <h1 className="text-2xl sm:text-3xl font-black" style={{ color: '#EDE8E0' }}>
              Exercices {muscle.nom}
            </h1>
          </div>
          <div className="ml-auto hidden sm:flex gap-4">
            {[
              { val: allExercices.length, label: 'Total' },
              { val: exercicesSalle.length, label: 'Salle' },
              { val: exercicesMaison.length, label: 'Maison' },
            ].map(s => (
              <div key={s.label} className="text-center px-4 py-2 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,57,70,0.1)' }}>
                <div className="text-xl font-black" style={{ color: muscle.couleurSvg }}>{s.val}</div>
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#3A4152' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body — sidebar + exercises */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar sticky */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.08)' }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#E63946' }}>Description</p>
                <p className="text-xs leading-relaxed" style={{ color: '#5A6478' }}>{muscle.description}</p>
              </div>
              <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.08)' }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#E63946' }}>Guides {muscle.nom}</p>
                <div className="space-y-1">
                  {exercicesSalle.length > 0 && (
                    <Link href={`/guides/exercices-${muscle.slug}-salle`}
                      className="block py-1.5 text-xs font-semibold transition-colors hover:text-[#E63946]"
                      style={{ color: '#5A6478', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      🏋️ {exercicesSalle.length} exercices en salle →
                    </Link>
                  )}
                  {exercicesMaison.length > 0 && (
                    <Link href={`/guides/exercices-${muscle.slug}-maison`}
                      className="block py-1.5 text-xs font-semibold transition-colors hover:text-[#E63946]"
                      style={{ color: '#5A6478' }}>
                      🏠 {exercicesMaison.length} exercices à la maison →
                    </Link>
                  )}
                </div>
              </div>
              <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.08)' }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#E63946' }}>Autres muscles</p>
                <div className="space-y-1">
                  {MUSCLES.filter(m => m.id !== muscle.id).slice(0, 8).map(m => (
                    <Link key={m.id} href={`/muscles/${m.slug}`}
                      className="flex items-center gap-2 py-1.5 text-xs font-semibold transition-colors hover:text-[#E63946]"
                      style={{ color: '#5A6478', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.couleurSvg }} />
                      {m.nom}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Exercises main */}
          <div className="lg:col-span-3">
            <MuscleExerciseFilter
              exercises={allExercices}
              muscleId={muscle.id}
              muscleCouleur={muscle.couleurSvg}
            />
            <AffiliateRecommendations materiels={[...new Set(allExercices.flatMap(e => e.materiel))] as Materiel[]} />
          </div>
        </div>
      </div>
    </div>
  )
}
