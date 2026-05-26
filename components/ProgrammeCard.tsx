import Link from 'next/link'
import type { Programme } from '@/data/programmes'

const NIVEAU_LABELS = {
  debutant: { label: 'Débutant', color: '#16a34a', bg: '#f0fdf4' },
  intermediaire: { label: 'Intermédiaire', color: '#d97706', bg: '#fffbeb' },
  avance: { label: 'Avancé', color: '#e11d48', bg: '#fff1f2' },
}

const OBJECTIF_LABELS = {
  force: { label: 'Force', emoji: '💪' },
  hypertrophie: { label: 'Hypertrophie', emoji: '📈' },
  'perte-poids': { label: 'Perte de poids', emoji: '🔥' },
  endurance: { label: 'Endurance', emoji: '🏃' },
}

export default function ProgrammeCard({ programme }: { programme: Programme }) {
  const niv = NIVEAU_LABELS[programme.niveau]
  const obj = OBJECTIF_LABELS[programme.objectif]
  const href = `/programmes/${programme.mode}/${programme.slug}`

  return (
    <Link href={href} className="block exercise-card">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-orange-300 transition-all p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {/* Mode badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
            style={{
              background: programme.mode === 'salle' ? '#eff6ff' : '#f0fdf4',
              color: programme.mode === 'salle' ? '#2563eb' : '#16a34a',
            }}
          >
            {programme.mode === 'salle' ? '🏋️ Salle' : '🏠 Maison'}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {programme.dureeWeeks} semaines
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2">{programme.nom}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{programme.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg" style={{ background: '#f8fafc' }}>
            <div className="font-bold text-slate-800 text-lg">{programme.joursParSemaine}</div>
            <div className="text-slate-500 text-xs">jours/sem.</div>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: '#f8fafc' }}>
            <div className="font-bold text-slate-800 text-lg">{programme.tempsParSeance}</div>
            <div className="text-slate-500 text-xs">min/séance</div>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: '#f8fafc' }}>
            <div className="font-bold text-slate-800 text-lg">{programme.jours.filter(j => j.exercices.length > 0).length}</div>
            <div className="text-slate-500 text-xs">jours actifs</div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: niv.color, background: niv.bg }}>
            {niv.label}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full text-slate-600 bg-slate-100">
            {obj.emoji} {obj.label}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1 font-semibold text-sm" style={{ color: '#f97316' }}>
          Voir le programme
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
