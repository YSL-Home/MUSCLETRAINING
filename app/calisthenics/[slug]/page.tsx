import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import AffiliateRecommendations from '@/components/AffiliateRecommendations'
import { CAL_PLANS, getCalPlanBySlug, TYPE_LABEL } from '@/data/calisthenics'

export function generateStaticParams() {
  return CAL_PLANS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getCalPlanBySlug(slug)
  if (!p) return {}
  const url = `https://www.muscletraining.uk/calisthenics/${slug}`
  return {
    title: `${p.nom} — Calisthénics`,
    description: p.descriptionSeo,
    alternates: { canonical: url },
    openGraph: { title: p.nom, description: p.descriptionSeo, url, images: ['https://www.muscletraining.uk/logo-512.png'] },
  }
}

const NIVEAU_CFG: Record<string, { label: string; color: string }> = {
  debutant: { label: 'Débutant', color: '#16a34a' },
  intermediaire: { label: 'Intermédiaire', color: '#d97706' },
  avance: { label: 'Avancé', color: '#e11d48' },
}

export default async function CalisthenicsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getCalPlanBySlug(slug)
  if (!p) notFound()
  const niv = NIVEAU_CFG[p.niveau]

  const schema = {
    '@context': 'https://schema.org',
    '@type': p.type === 'challenge' ? 'HowTo' : 'ExercisePlan',
    name: p.nom,
    description: p.descriptionSeo,
  }

  const autres = CAL_PLANS.filter(x => x.slug !== p.slug && x.type === p.type).slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[
          { nom: 'Accueil', url: '/' },
          { nom: 'Calisthénics', url: '/calisthenics' },
          { nom: p.nom },
        ]} />

        <div className="mt-6 mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: p.couleur + '18', color: p.couleur }}>{TYPE_LABEL[p.type]}</span>
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: niv.color }}>{niv.label}</span>
            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: '#8A9BB5' }}>⏱ {p.duree}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#EDE8E0' }}>{p.emoji} {p.nom}</h1>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: '#8A9BB5' }}>{p.descriptionCourte}</p>
        </div>

        {/* Matériel + objectif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#E63946' }}>Objectif</p>
            <p className="text-sm" style={{ color: '#C4CDD9' }}>{p.objectif}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#E63946' }}>Matériel</p>
            <div className="flex flex-wrap gap-2">
              {p.materiel.map(m => <span key={m} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#C4CDD9' }}>{m}</span>)}
            </div>
          </div>
        </div>

        {/* Blocs / planning */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black" style={{ color: '#EDE8E0' }}>Le programme</h2>
          {p.blocs.map((bloc, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
              <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.05)', background: p.couleur + '10' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: p.couleur }}>{i + 1}</div>
                <div>
                  <div className="font-bold" style={{ color: '#EDE8E0' }}>{bloc.titre}</div>
                  {bloc.sousTitre && <div className="text-xs" style={{ color: '#5A6478' }}>{bloc.sousTitre}</div>}
                </div>
              </div>
              <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                {bloc.exercices.map((ex, j) => (
                  <div key={j} className="px-5 py-3 flex items-center justify-between gap-3">
                    {ex.slug ? (
                      <Link href={`/exercice/${ex.slug}`} className="text-sm font-semibold hover:text-[#E63946] transition-colors" style={{ color: '#EDE8E0' }}>{ex.nom}</Link>
                    ) : (
                      <span className="text-sm font-semibold" style={{ color: '#C4CDD9' }}>{ex.nom}</span>
                    )}
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: p.couleur }}>{ex.format}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Conseils */}
        <div className="mt-8 rounded-2xl p-5" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <h2 className="font-black mb-3" style={{ color: '#EDE8E0' }}>💡 Conseils</h2>
          <ul className="space-y-2">
            {p.conseils.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#C4CDD9' }}>
                <span style={{ color: '#10b981' }} className="mt-0.5">✓</span>{c}
              </li>
            ))}
          </ul>
        </div>

        <AffiliateRecommendations labels={p.materiel} title="🛒 Pour t'équiper" compact />

        {/* Autres plans */}
        {autres.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-black mb-5" style={{ color: '#EDE8E0' }}>À découvrir aussi</h2>
            <div className="flex flex-wrap gap-3">
              {autres.map(x => (
                <Link key={x.slug} href={`/calisthenics/${x.slug}`}
                  className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors hover:text-[#E63946]"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#8A9BB5', border: '1px solid rgba(230,57,70,0.12)' }}>
                  {x.emoji} {x.nom} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
