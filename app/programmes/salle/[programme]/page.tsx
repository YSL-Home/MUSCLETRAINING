import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import AffiliateRecommendations from '@/components/AffiliateRecommendations'
import { getProgrammeBySlug, getProgrammesByMode } from '@/data/programmes'
import { getExerciseBySlug } from '@/data/exercises'
import ExerciseGif from '@/components/ExerciseGif'
import { programmeSchema } from '@/lib/schema'

export async function generateStaticParams() {
  return getProgrammesByMode('salle').map(p => ({ programme: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ programme: string }> }
): Promise<Metadata> {
  const { programme: slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) return {}
  return {
    title: `${programme.nom} — Programme Avec Matériel ${programme.dureeWeeks} Semaines`,
    description: programme.descriptionSeo,
  }
}

export default async function ProgrammeSallePage({ params }: { params: Promise<{ programme: string }> }) {
  const { programme: slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme || programme.mode !== 'salle') notFound()

  return <ProgrammeDetail programme={programme} mode="salle" />
}

function ProgrammeDetail({ programme, mode }: { programme: ReturnType<typeof getProgrammeBySlug> & object; mode: string }) {
  if (!programme) return null
  const schema = programmeSchema(programme)

  const NIVEAU_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    debutant: { label: 'Débutant', color: '#16a34a', bg: '#f0fdf4' },
    intermediaire: { label: 'Intermédiaire', color: '#d97706', bg: '#fffbeb' },
    avance: { label: 'Avancé', color: '#e11d48', bg: '#fff1f2' },
  }
  const niv = NIVEAU_CONFIG[programme.niveau]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[
          { nom: 'Accueil', url: '/' },
          { nom: 'Programmes', url: '/programmes' },
          { nom: mode === 'salle' ? 'Avec matériel' : 'Sans matériel', url: `/programmes/${mode}` },
          { nom: programme.nom },
        ]} />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(230,57,70,0.12)', color: '#E63946' }}>
              🏋️ Avec matériel
            </span>
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: niv.color, background: niv.bg }}>
              {niv.label}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#EDE8E0] mb-3">{programme.nom}</h1>
          <p className="text-[#8A9BB5] text-lg leading-relaxed max-w-3xl">{programme.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Durée', val: `${programme.dureeWeeks} sem.` },
            { label: 'Jours / semaine', val: programme.joursParSemaine },
            { label: 'Temps / séance', val: `${programme.tempsParSeance} min` },
            { label: 'Objectif', val: programme.objectif === 'hypertrophie' ? '📈 Masse' : programme.objectif === 'force' ? '💪 Force' : '🔥 Forme' },
          ].map(s => (
            <div key={s.label} className="bg-[#0C0C1A] rounded-xl p-4 border border-[rgba(230,57,70,0.1)] text-center">
              <div className="text-xl font-black text-[#EDE8E0]">{s.val}</div>
              <div className="text-[#5A6478] text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Matériel */}
        <div className="bg-[#0C0C1A] rounded-xl p-5 mb-6 border border-[rgba(230,57,70,0.1)]">
          <h3 className="font-bold text-[#EDE8E0] mb-3">Matériel requis</h3>
          <div className="flex flex-wrap gap-2">
            {programme.materielRequis.map(m => (
              <span key={m} className="text-sm px-3 py-1 rounded-full bg-[#0C0C1A] border border-[rgba(230,57,70,0.1)] text-[#C4CDD9]">{m}</span>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <AffiliateRecommendations labels={programme.materielRequis} title="🛒 S'équiper pour ce programme" compact />
        </div>

        {/* Avantages */}
        <div className="bg-green-50 rounded-xl p-5 mb-10 border border-green-100">
          <h3 className="font-bold text-green-800 mb-3">Pourquoi ce programme ?</h3>
          <ul className="space-y-2">
            {programme.avantages.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                <span className="text-green-500 mt-0.5">✓</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Jours */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-[#EDE8E0]">Plan d&apos;entraînement</h2>
          {programme.jours.map(jour => (
            <div key={jour.numero} className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)]" style={{ background: 'linear-gradient(to right, #f8fafc, #f1f5f9)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E63946] text-white text-sm font-bold flex items-center justify-center">
                    {jour.numero}
                  </div>
                  <div>
                    <div className="font-bold text-[#EDE8E0]">{jour.nom}</div>
                    <div className="text-[#5A6478] text-sm">{jour.focus}</div>
                  </div>
                </div>
              </div>

              {jour.exercices.length === 0 ? (
                <div className="px-6 py-8 text-center text-[#3A4152]">
                  <div className="text-3xl mb-2">😴</div>
                  <div className="font-medium">Repos — récupération active recommandée</div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {jour.exercices.map((ex, i) => {
                    const exData = getExerciseBySlug(ex.slug)
                    return (
                      <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-[#0C0C1A] transition-colors">
                        {exData ? (
                          <Link href={`/exercice/${ex.slug}`} className="w-20 flex-shrink-0">
                            <ExerciseGif slug={ex.slug} />
                          </Link>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.04)] text-[#5A6478] text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                        )}
                        <div className="flex-1 min-w-0">
                          {exData ? (
                            <Link href={`/exercice/${ex.slug}`} className="font-semibold text-[#EDE8E0] hover:text-[#E63946] transition-colors">
                              {ex.nom}
                            </Link>
                          ) : (
                            <span className="font-semibold text-[#EDE8E0]">{ex.nom}</span>
                          )}
                          {ex.notes && (
                            <p className="text-[#3A4152] text-xs mt-0.5">{ex.notes}</p>
                          )}
                        </div>
                        <div className="flex gap-4 text-sm text-[#5A6478] flex-shrink-0">
                          <span><span className="font-bold text-[#EDE8E0]">{ex.series}</span> séries</span>
                          <span><span className="font-bold text-[#EDE8E0]">{ex.repetitions}</span> reps</span>
                          <span className="hidden sm:block"><span className="font-bold text-[#EDE8E0]">{ex.repos}s</span> repos</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
