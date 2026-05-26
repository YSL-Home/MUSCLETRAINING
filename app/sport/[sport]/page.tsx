import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import MuscleIllustration from '@/components/MuscleIllustration'
import ShareButtons from '@/components/ShareButtons'
import { SPORTS, getSportBySlug } from '@/data/sports'
import type { MuscleId } from '@/data/muscles'

export async function generateStaticParams() {
  return SPORTS.map(s => ({ sport: s.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ sport: string }> }
): Promise<Metadata> {
  const { sport: slug } = await params
  const sport = getSportBySlug(slug)
  if (!sport) return {}
  return {
    title: `Exercices ${sport.nom} — Renforcement Musculaire Spécifique`,
    description: sport.descriptionSeo,
    openGraph: { title: `Programme physique ${sport.nom}`, description: sport.descriptionSeo },
  }
}

const DIFF: Record<string, { label: string; color: string; bg: string }> = {
  debutant: { label: 'Débutant', color: '#16a34a', bg: '#f0fdf4' },
  intermediaire: { label: 'Intermédiaire', color: '#d97706', bg: '#fffbeb' },
  avance: { label: 'Avancé', color: '#e11d48', bg: '#fff1f2' },
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport: slug } = await params
  const sport = getSportBySlug(slug)
  if (!sport) notFound()

  const pageUrl = `https://www.musclegym.fr/sport/${sport.slug}`

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb crumbs={[
        { nom: 'Accueil', url: '/' },
        { nom: 'Sports', url: '/sport' },
        { nom: sport.nom },
      ]} />

      {/* Header */}
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{sport.emoji}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Renforcement {sport.nom}
            </h1>
            <p className="text-slate-400 text-sm mt-1">{sport.exercices.length} exercices spécifiques</p>
          </div>
        </div>
        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-4">{sport.description}</p>
        <ShareButtons url={pageUrl} title={`Programme renforcement ${sport.nom}`} compact />
      </div>

      {/* Besoins physiques */}
      <div className="p-4 rounded-2xl border mb-10 flex flex-wrap gap-2 items-center"
        style={{ background: sport.couleur + '10', borderColor: sport.couleur + '30' }}>
        <span className="text-sm font-bold" style={{ color: sport.couleur }}>Qualités physiques clés :</span>
        {sport.besoinsPhysiques.map(b => (
          <span key={b} className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: sport.couleur + '20', color: sport.couleur }}>
            {b}
          </span>
        ))}
      </div>

      {/* Exercices */}
      <div className="space-y-10">
        {sport.exercices.map((ex, i) => {
          const diff = DIFF[ex.difficulte]
          const exUrl = `https://www.musclegym.fr/sport/${sport.slug}#${ex.slug}`
          const muscleIds = ex.muscles.map(m =>
            m.toLowerCase().replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/ .*/,'') as MuscleId
          )

          return (
            <div key={ex.slug} id={ex.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {/* Header carte */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3"
                style={{ background: sport.couleur + '08' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
                    style={{ background: sport.couleur }}>
                    {i + 1}
                  </div>
                  <h2 className="font-bold text-slate-900 text-lg">{ex.nom}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ color: diff.color, background: diff.bg }}>
                    {diff.label}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {ex.mode === 'maison' ? '🏠 Maison' : ex.mode === 'salle' ? '🏋️ Salle' : '🏋️🏠 Les deux'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Bénéfice sport mis en avant */}
                <div className="mb-5 flex items-start gap-2 px-4 py-3 rounded-xl"
                  style={{ background: sport.couleur + '12' }}>
                  <span className="text-lg">🎯</span>
                  <p className="text-sm font-semibold" style={{ color: sport.couleur }}>{ex.benefice}</p>
                </div>

                {/* Vidéo + Illustration côte à côte */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Vidéo technique</p>
                    <YouTubeEmbed videoId={ex.videoYoutube} title={ex.nom} />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Muscles ciblés</p>
                    <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center w-full">
                      <MuscleIllustration
                        primaires={ex.muscles.slice(0,2).map(m => normalizeMuscle(m))}
                        secondaires={ex.muscles.slice(2).map(m => normalizeMuscle(m))}
                        size={90}
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1 justify-center">
                      {ex.muscles.map((m, mi) => (
                        <span key={m} className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: mi === 0 ? sport.couleur + '20' : '#f1f5f9',
                            color: mi === 0 ? sport.couleur : '#64748b',
                          }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Exécution</p>
                  <ol className="space-y-2">
                    {ex.instructions.map((step, si) => (
                      <li key={si} className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {si + 1}
                        </span>
                        <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Footer : matériel + partage */}
                <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {ex.materiel.map(m => (
                      <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                  <ShareButtons url={exUrl} title={`${ex.nom} — ${sport.nom}`} compact />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Autres sports */}
      <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4">Autres sports</h3>
        <div className="flex flex-wrap gap-3">
          {SPORTS.filter(s => s.id !== sport.id).map(s => (
            <Link key={s.id} href={`/sport/${s.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-orange-300 text-sm font-medium text-slate-700 hover:text-orange-600 transition-all">
              <span>{s.emoji}</span>
              {s.nom}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function normalizeMuscle(m: string): MuscleId {
  const map: Record<string, MuscleId> = {
    'obliques': 'abdominaux', 'grand dorsal': 'dos', 'grand droit': 'abdominaux',
    'transverse': 'abdominaux', 'piriforme': 'fessiers', 'psoas': 'fessiers',
    'grand fessier': 'fessiers', 'gastrocnémiens': 'mollets', 'soléaire': 'mollets',
    'adducteurs': 'quadriceps', 'coiffe des rotateurs': 'epaules',
    'grand dentelé': 'epaules', 'rhomboïdes': 'dos', 'infra-épineux': 'epaules',
    'petit rond': 'epaules', 'deltoïde postérieur': 'epaules', 'deltoïdes': 'epaules',
    'stabilisateurs lombaires': 'lombaires', 'dos complet': 'dos',
    'corps entier': 'abdominaux', 'cardiovasculaire': 'abdominaux',
  }
  const key = m.toLowerCase()
  return map[key] ?? (key.split(' ')[0] as MuscleId)
}
