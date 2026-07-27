import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import ExerciseCard from '@/components/ExerciseCard'
import ExerciseGif from '@/components/ExerciseGif'
import ExerciseMuscleMap from '@/components/ExerciseMuscleMap'
import FavoriteButton from '@/components/FavoriteButton'
import PRInput from '@/components/PRInput'
import ProgressionMap from '@/components/ProgressionMap'
import AffiliateRecommendations from '@/components/AffiliateRecommendations'
import TelegramCTA from '@/components/TelegramCTA'
import AdUnit, { AdSidebar } from '@/components/AdUnit'
import RestTimer from '@/components/RestTimer'
import OneRMCalculator from '@/components/OneRMCalculator'
import ExerciseNotes from '@/components/ExerciseNotes'
import FocusMode from '@/components/FocusMode'
import ShareButtons from '@/components/ShareButtons'
import ExerciseIntro from '@/components/ExerciseIntro'
import { getExerciseBySlug, EXERCISES } from '@/data/exercises'
import { getMuscleById } from '@/data/muscles'
import { exerciseSchema, breadcrumbSchema, aggregateRatingSchema, faqSchema } from '@/lib/schema'

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
    alternates: {
      canonical: `https://www.muscletraining.uk/exercice/${slug}`,
    },
    openGraph: {
      title: `${exercise.nom} — Guide Technique Complet`,
      description: exercise.descriptionSeo,
      url: `https://www.muscletraining.uk/exercice/${slug}`,
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
  const ratingJsonLd = aggregateRatingSchema(exercise)
  const breadcrumbJsonLd = breadcrumbSchema([
    { nom: 'Accueil', url: '/' },
    { nom: musclePrincipal?.nom ?? 'Exercices', url: `/muscles/${musclePrincipal?.slug ?? ''}` },
    { nom: exercise.nom, url: `/exercice/${exercise.slug}` },
  ])
  const faqJsonLd = faqSchema(exercise)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
            <h1 className="text-3xl sm:text-4xl font-black text-[#EDE8E0] mb-4 leading-tight">
              {exercise.nom}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
              <FavoriteButton slug={exercise.slug} nom={exercise.nom} />
            </div>

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
              <span className="text-sm font-medium px-3 py-1 rounded-full text-[#8A9BB5] bg-[rgba(255,255,255,0.04)]">
                ⏱ {exercise.tempsRepos}s de repos
              </span>
            </div>

            <p className="text-[#8A9BB5] text-lg leading-relaxed mb-6">{exercise.descriptionCourte}</p>

            {/* Partage */}
            <ShareButtons
              url={`https://www.muscletraining.uk/exercice/${exercise.slug}`}
              title={exercise.nom}
              compact
            />

            {/* Introduction éditoriale enrichie */}
            <ExerciseIntro slug={exercise.slug} />

            {/* Vidéo YouTube */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#EDE8E0] mb-4">Vidéo technique</h2>
              <YouTubeEmbed videoId={exercise.videoYoutube} title={`Technique : ${exercise.nom}`} />
            </div>

            {/* Annonce après vidéo */}
            <AdUnit slot={process.env.NEXT_PUBLIC_AD_SLOT_EX_VIDEO ?? ''} format="auto" className="mb-8" />

            {/* Instructions */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#EDE8E0] mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: '#b8d400' }}>1</span>
                Instructions étape par étape
              </h2>
              <ol className="space-y-4">
                {exercise.instructions.map((step, index) => (
                  <li key={index} className="flex gap-4 p-4 bg-[#0C0C1A] rounded-xl border border-[rgba(230,57,70,0.1)]">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[rgba(255,255,255,0.04)] text-[#C4CDD9] text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-[#C4CDD9] leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Erreurs fréquentes */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#EDE8E0] mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: '#e11d48' }}>✕</span>
                Erreurs fréquentes à éviter
              </h2>
              <ul className="space-y-3">
                {exercise.erreurs.map((err, index) => (
                  <li key={index} className="flex gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <span className="text-red-500 flex-shrink-0 mt-0.5">⚠</span>
                    <p className="text-[#C4CDD9] text-sm leading-relaxed">{err}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conseils pro */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#EDE8E0] mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: '#16a34a' }}>✓</span>
                Conseils de pro
              </h2>
              <ul className="space-y-3">
                {exercise.conseils.map((conseil, index) => (
                  <li key={index} className="flex gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">💡</span>
                    <p className="text-[#C4CDD9] text-sm leading-relaxed">{conseil}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Muscles ciblés */}
              <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5">
                <h3 className="font-bold text-[#EDE8E0] mb-3">Muscles ciblés</h3>
                {/* Grand GIF animé mouvement — visuel principal */}
                <div className="mb-3">
                  <ExerciseGif slug={exercise.slug} />
                </div>
                {/* Mannequin 3D compact — anatomie, muscles en pulsation */}
                <div className="mb-4">
                  <ExerciseMuscleMap slug={exercise.slug} compact animated />
                </div>
                {musclePrincipal && (
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-[#3A4152] uppercase tracking-wider mb-2">Principal</div>
                    <Link href={`/muscles/${musclePrincipal.slug}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#0C0C1A] transition-colors">
                      <div className="w-4 h-4 rounded-full" style={{ background: musclePrincipal.couleurSvg }} />
                      <span className="font-semibold text-[#C4CDD9] text-sm">{musclePrincipal.nom}</span>
                    </Link>
                  </div>
                )}
                {musclesSecondairesData.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-[#3A4152] uppercase tracking-wider mb-2">Secondaires</div>
                    <div className="space-y-1">
                      {musclesSecondairesData.map(m => m && (
                        <Link key={m.id} href={`/muscles/${m.slug}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#0C0C1A] transition-colors">
                          <div className="w-3 h-3 rounded-full" style={{ background: m.couleurSvg + '88' }} />
                          <span className="text-[#8A9BB5] text-sm">{m.nom}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Record perso (PR) */}
              <PRInput slug={exercise.slug} nom={exercise.nom} />

              {/* Calculateur 1RM */}
              <OneRMCalculator slug={exercise.slug} />

              {/* Timer de repos */}
              <RestTimer defaultSeconds={exercise.tempsRepos} />

              {/* Mode séance focus */}
              <FocusMode nom={exercise.nom} tempsRepos={exercise.tempsRepos} />

              {/* Notes personnelles */}
              <ExerciseNotes slug={exercise.slug} />

              {/* Annonce sidebar */}
              <AdSidebar slot={process.env.NEXT_PUBLIC_AD_SLOT_EX_SIDEBAR ?? ''} />

              {/* Matériel */}
              <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5">
                <h3 className="font-bold text-[#EDE8E0] mb-3">Matériel requis</h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.materiel.map(m => (
                    <span key={m} className="text-xs font-medium px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[#C4CDD9]">
                      {MATERIEL_LABELS[m] ?? m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Paramètres */}
              <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5">
                <h3 className="font-bold text-[#EDE8E0] mb-3">Paramètres recommandés</h3>
                <div className="space-y-2 text-sm text-[#8A9BB5]">
                  <div className="flex justify-between">
                    <span>Séries</span>
                    <span className="font-semibold text-[#EDE8E0]">3–4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Répétitions</span>
                    <span className="font-semibold text-[#EDE8E0]">
                      {exercise.difficulte === 'debutant' ? '12–15' : exercise.difficulte === 'intermediaire' ? '8–12' : '5–8'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps de repos</span>
                    <span className="font-semibold text-[#EDE8E0]">{exercise.tempsRepos}s</span>
                  </div>
                  {exercise.calories && (
                    <div className="flex justify-between">
                      <span>Dépense</span>
                      <span className="font-semibold text-[#EDE8E0]">~{exercise.calories} cal/min</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ visible (même contenu que le schema FAQ injecté) */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: '#EDE8E0' }}>Questions fréquentes</h2>
          <div className="space-y-3">
            {faqJsonLd.mainEntity.map((item, i) => (
              <details key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
                <summary className="font-bold cursor-pointer text-sm" style={{ color: '#EDE8E0' }}>{item.name}</summary>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Matériel recommandé (liens affiliés) */}
        <TelegramCTA />
        <AffiliateRecommendations materiels={exercise.materiel} />

        {/* Carte de progression */}
        <ProgressionMap currentSlug={exercise.slug} varianteSlugs={exercise.varianteSlugs} />

        {/* Variantes */}
        {variantes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#EDE8E0] mb-6">Exercices similaires & variantes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {variantes.map(v => v && <ExerciseCard key={v.slug} exercise={v} />)}
            </div>
            <Link href={`/alternatives/${exercise.slug}`}
              className="inline-block mt-6 text-sm font-semibold hover:underline" style={{ color: '#E63946' }}>
              Voir toutes les alternatives au {exercise.nom} →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
