import type { Metadata } from 'next'
import Link from 'next/link'
import { CAL_PLANS, TYPE_LABEL } from '@/data/calisthenics'
import type { CalistheniqueType } from '@/data/calisthenics'

export const metadata: Metadata = {
  title: 'Calisthénics : Routines, Challenges 30 Jours & Mobilité',
  description: 'Section calisthénics : routines journalières au poids du corps, challenges 30 jours pour transformer ton corps, et routines de mobilité pour gagner en souplesse.',
  alternates: { canonical: 'https://www.muscletraining.uk/calisthenics' },
}

const ORDER: CalistheniqueType[] = ['challenge', 'routine', 'mobilite']

const NIVEAU: Record<string, { label: string; color: string }> = {
  debutant: { label: 'Débutant', color: '#4ADE80' },
  intermediaire: { label: 'Intermédiaire', color: '#FBBF24' },
  avance: { label: 'Avancé', color: '#F87171' },
}

export default function CalisthenicsHub() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946' }}>
          🤸 Poids du corps
        </div>
        <h1 className="text-4xl font-black mb-3" style={{ color: '#EDE8E0' }}>Calisthénics</h1>
        <p className="text-lg max-w-2xl" style={{ color: '#8A9BB5' }}>
          Routines journalières, challenges 30 jours pour transformer ton corps, et routines de mobilité
          pour devenir plus fort <em>et</em> plus souple — sans matériel.
        </p>
      </div>

      {ORDER.map(type => {
        const plans = CAL_PLANS.filter(p => p.type === type)
        if (!plans.length) return null
        return (
          <section key={type} className="mb-12">
            <h2 className="text-2xl font-black mb-6" style={{ color: '#EDE8E0' }}>{TYPE_LABEL[type]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {plans.map(p => {
                const niv = NIVEAU[p.niveau]
                return (
                  <Link key={p.slug} href={`/calisthenics/${p.slug}`}
                    className="block rounded-2xl p-5 transition-all hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${p.couleur}30` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{p.emoji}</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: p.couleur + '18', color: p.couleur }}>{p.duree}</span>
                    </div>
                    <h3 className="font-black text-base mb-2 leading-tight" style={{ color: '#EDE8E0' }}>{p.nom}</h3>
                    <p className="text-xs mb-4 line-clamp-2" style={{ color: '#5A6478' }}>{p.descriptionCourte}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: niv.color }}>{niv.label}</span>
                      <span className="text-xs" style={{ color: '#3A4152' }}>· {p.objectif}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
