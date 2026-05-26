import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import ExerciseCard from '@/components/ExerciseCard'
import { getMuscleBySlug, MUSCLES } from '@/data/muscles'
import { getExercisesByMuscle } from '@/data/exercises'

export async function generateStaticParams() {
  return MUSCLES.map(m => ({ muscle: m.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ muscle: string }> }
): Promise<Metadata> {
  const { muscle: muscleSlug } = await params
  const muscle = getMuscleBySlug(muscleSlug)
  if (!muscle) return {}

  const count = getExercisesByMuscle(muscle.id).length

  return {
    title: `Exercices ${muscle.nom} : ${count} Mouvements avec Vidéos`,
    description: muscle.descriptionSeo,
    openGraph: {
      title: `Exercices ${muscle.nom} — Salle & Maison`,
      description: muscle.descriptionSeo,
    },
  }
}

export default async function MusclePage({ params }: { params: Promise<{ muscle: string }> }) {
  const { muscle: muscleSlug } = await params
  const muscle = getMuscleBySlug(muscleSlug)
  if (!muscle) notFound()

  const allExercices = getExercisesByMuscle(muscle.id)
  const exercicesSalle = allExercices.filter(e => e.mode === 'salle' || e.mode === 'les-deux')
  const exercicesMaison = allExercices.filter(e => e.mode === 'maison' || e.mode === 'les-deux')
  const primaires = allExercices.filter(e => e.musclesPrimaires.includes(muscle.id))
  const secondaires = allExercices.filter(e => !e.musclesPrimaires.includes(muscle.id) && e.musclesSecondaires.includes(muscle.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb crumbs={[
        { nom: 'Accueil', url: '/' },
        { nom: 'Muscles', url: '/' },
        { nom: muscle.nom },
      ]} />

      {/* Header */}
      <div className="mt-6 mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: muscle.couleurSvg + '22' }}>
            <div className="w-7 h-7 rounded-full" style={{ background: muscle.couleurSvg }} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Exercices {muscle.nom}
            </h1>
            <p className="text-slate-500 text-sm mt-1">{allExercices.length} exercices • Salle & Maison</p>
          </div>
        </div>
        <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
          {muscle.description}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total exercices', val: allExercices.length },
          { label: 'Exercices salle', val: exercicesSalle.length },
          { label: 'Exercices maison', val: exercicesMaison.length },
          { label: 'Muscles ciblés en 1er', val: primaires.length },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl font-black text-slate-900" style={{ color: muscle.couleurSvg }}>{s.val}</div>
            <div className="text-slate-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres mode */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <a href="#salle" className="px-4 py-2 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">🏋️ Salle ({exercicesSalle.length})</a>
        <a href="#maison" className="px-4 py-2 rounded-lg text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors">🏠 Maison ({exercicesMaison.length})</a>
      </div>

      {/* Exercices muscle primaire */}
      {primaires.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 rounded-full inline-block" style={{ background: muscle.couleurSvg }} />
            {muscle.nom} — Muscle principal ciblé
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="salle">
            {primaires.map(ex => (
              <ExerciseCard key={ex.slug} exercise={ex} />
            ))}
          </div>
        </div>
      )}

      {/* Exercices muscle secondaire */}
      {secondaires.length > 0 && (
        <div className="mb-12" id="maison">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 rounded-full inline-block bg-slate-300" />
            {muscle.nom} — Muscle secondaire sollicité
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {secondaires.map(ex => (
              <ExerciseCard key={ex.slug} exercise={ex} />
            ))}
          </div>
        </div>
      )}

      {/* Autres muscles */}
      <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4">Explorer d&apos;autres muscles</h3>
        <div className="flex flex-wrap gap-2">
          {MUSCLES.filter(m => m.id !== muscle.id).map(m => (
            <Link
              key={m.id}
              href={`/muscles/${m.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-slate-200 hover:border-lime-300 text-slate-700 hover:text-lime-500 transition-all"
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.couleurSvg }} />
              {m.nom}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
