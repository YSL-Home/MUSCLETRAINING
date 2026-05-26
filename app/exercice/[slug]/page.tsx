import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import ExerciseCard from '@/components/ExerciseCard'
import MuscleIllustration from '@/components/MuscleIllustration'
import { getExerciseBySlug, EXERCISES } from '@/data/exercises'
import { getMuscleById } from '@/data/muscles'
import { exerciseSchema, breadcrumbSchema } from '@/lib/schema'

export async function generateStaticParams() {
  return EXERCISES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const exercise = getExerciseBySlug(slug)
  if (!exercise) return {}

  const musclePrincipal = getMuscleById(exercise.musclesPrimaires[0])

  return {
    title: `${exercise.nom} : Technique, Muscles et Vidéo`,
    description: exercise.descriptionSeo,
    openGraph: {
      title: `${exercise.nom} — Guide Technique Complet`,
      description: exercise.descriptionSeo,
      images: [`https://img.youtube.com/vi/${exercise.videoYoutube}/maxresdefault.jpg`],
    },
  }
}

const MATERIEL_LABELS: Record<string, string> = {
  'poids-corps': 'Poids du corps',
  barre: 'Barre',
  halteres: 'Haltères',
  poulie: 'Poulie / câble',
  machine: 'Machine',
  elastique: 'Élastique',
  kettlebell: 'Kettlebell',
  banc: 'Banc',
  'barre-de-traction': 'Barre de traction',
  chaise: 'Chaise',
}

const DIFFICULTE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  debutant: { label: 'Débutant', color: '#16a34a', bg: '#f0fdf4' },
  intermediaire: { label: 'Intermédiaire', color: '#d97706', bg: '#fffbeb' },
  avance: { label: 'Avancé', color: '#e11d48', bg: '#fff1f2' },
}

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exercise = getExerciseBySlug(slug)
  if (!exercise) notFound()

  const musclePrincipal = getMuscleById(exercise.musclesPrimaires[0])
  const musclesSecondairesData = exercise.musclesSecondaires.map(id => getMuscleById(id)).filter(Boolean)
  const variantes = exercise.varianteSlugs.map(s => getExerciseBySlug(s)).filter(Boolean)
  const diff = DIFFICULTE_CONFIG[exercise.difficulte]

  const schemaJsonLd = exerciseSchema(exercise, musclePrincipal?.nom ?? '')
  const breadcrumbJsonLd = breadcrumbSchema([
    { nom: 'Accueil', url: '/' },
    { nom: musclePrincipal?.nom ?? 'Exercices', url: `/muscles/${musclePrincipal?.slug ?? ''}` },
    { nom: exercise.nom, url: `/exercice/${exercise.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[
          { nom: 'Accueil', url: '/' },
          { nom: musclePrincipal?.nom ?? 'Exercices', url: `/muscles/${musclePrincipal?.slug ?? ''}` },
          { nom: exercise.nom },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {/* Titre + chips */}
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">
              {exercise.nom}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {/* Difficulté */}
              <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: diff.color, background: diff.bg }}>
                {diff.label}
              </span>
              {/* Mode */}
              <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{
                color: exercise.mode === 'maison' ? '#16a34a' : '#2563eb',
                background: exercise.mode === 'maison' ? '#f0fdf4' : '#eff6ff',
              }}>
                {exercise.mode === 'salle' ? '🏋️ Salle' : exercise.mode === 'maison' ? '🏠 Maison' : '🏋️🏠 Salle & Maison'}
              </span>
              {/* Repos */}
              <span className="text-sm font-medium px-3 py-1 rounded-full text-slate-600 bg-slate-100">
                ⏱ {exercise.tempsRepos}s de repos
              </span>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">{exercise.descriptionCourte}</p>

            {/* Vidéo YouTube */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Vidéo technique</h2>
              <YouTubeEmbed videoId={exercise.videoYoutube} title={`Technique : ${exercise.nom}`} />
            </div>

            {/* Instructions */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: '#b8d400' }}>1</span>
                Instructions étape par étape
              </h2>
              <ol className="space-y-4">
                {exercise.instructions.map((step, index) => (
                  <li key={index} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Erreurs fréquentes */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: '#e11d48' }}>✕</span>
                Erreurs fréquentes à éviter
              </h2>
              <ul className="space-y-3">
                {exercise.erreurs.map((err, index) => (
                  <li key={index} className="flex gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <span className="text-red-500 flex-shrink-0 mt-0.5">⚠</span>
                    <p className="text-slate-700 text-sm leading-relaxed">{err}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conseils pro */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: '#16a34a' }}>✓</span>
                Conseils de pro
              </h2>
              <ul className="space-y-3">
                {exercise.conseils.map((conseil, index) => (
                  <li key={index} className="flex gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">💡</span>
                    <p className="text-slate-700 text-sm leading-relaxed">{conseil}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Muscles ciblés */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-4">Muscles ciblés</h3>
                {/* Illustration SVG */}
                <div className="flex justify-center mb-4 bg-slate-50 rounded-xl p-3">
                  <MuscleIllustration
                    primaires={exercise.musclesPrimaires}
                    secondaires={exercise.musclesSecondaires}
                    size={90}
                  />
                </div>
                {musclePrincipal && (
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Principal</div>
                    <Link href={`/muscles/${musclePrincipal.slug}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-4 h-4 rounded-full" style={{ background: musclePrincipal.couleurSvg }} />
                      <span className="font-semibold text-slate-700 text-sm">{musclePrincipal.nom}</span>
                    </Link>
                  </div>
                )}
                {musclesSecondairesData.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Secondaires</div>
                    <div className="space-y-1">
                      {musclesSecondairesData.map(m => m && (
                        <Link key={m.id} href={`/muscles/${m.slug}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="w-3 h-3 rounded-full" style={{ background: m.couleurSvg + '88' }} />
                          <span className="text-slate-600 text-sm">{m.nom}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Matériel */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-3">Matériel requis</h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.materiel.map(m => (
                    <span key={m} className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {MATERIEL_LABELS[m] ?? m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Paramètres */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-3">Paramètres recommandés</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Séries</span>
                    <span className="font-semibold text-slate-800">3–4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Répétitions</span>
                    <span className="font-semibold text-slate-800">
                      {exercise.difficulte === 'debutant' ? '12–15' : exercise.difficulte === 'intermediaire' ? '8–12' : '5–8'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps de repos</span>
                    <span className="font-semibold text-slate-800">{exercise.tempsRepos}s</span>
                  </div>
                  {exercise.calories && (
                    <div className="flex justify-between">
                      <span>Dépense</span>
                      <span className="font-semibold text-slate-800">~{exercise.calories} cal/min</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variantes */}
        {variantes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Exercices similaires & variantes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {variantes.map(v => v && <ExerciseCard key={v.slug} exercise={v} />)}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
