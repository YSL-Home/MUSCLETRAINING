import Link from 'next/link'
import type { Programme } from '@/data/programmes'
import { MODE_LABEL, PROFIL_LABEL } from '@/data/programmes'

const NIVEAU: Record<string, { label: string; color: string }> = {
  debutant:      { label: 'Débutant',      color: '#4ADE80' },
  intermediaire: { label: 'Intermédiaire', color: '#FBBF24' },
  avance:        { label: 'Avancé',        color: '#F87171' },
}
const OBJECTIF: Record<string, string> = {
  force: '💪 Force', hypertrophie: '📈 Hypertrophie',
  'perte-poids': '🔥 Perte de poids', endurance: '🏃 Endurance',
}

export default function ProgrammeCard({ programme }: { programme: Programme }) {
  const niv = NIVEAU[programme.niveau]
  const href = `/programmes/${programme.mode}/${programme.slug}`

  return (
    <Link href={href} className="block exercise-card">
      <div className="glass-card rounded-2xl p-5 h-full">
        <div className="flex items-center justify-between mb-3">
          <span className="badge-red px-2.5 py-1 rounded-full">
            {MODE_LABEL[programme.mode]}
          </span>
          <span className="text-xs font-semibold" style={{ color: '#3A4152' }}>
            {programme.dureeWeeks} semaines
          </span>
        </div>

        <h3 className="font-black text-base leading-tight mb-2" style={{ color: '#EDE8E0' }}>{programme.nom}</h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#5A6478' }}>{programme.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: programme.joursParSemaine, label: 'jours/sem' },
            { val: programme.tempsParSeance, label: 'min' },
            { val: programme.jours.filter(j => j.exercices.length > 0).length, label: 'actifs' },
          ].map(s => (
            <div key={s.label} className="text-center py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,57,70,0.08)' }}>
              <div className="font-black text-base" style={{ color: '#E63946' }}>{s.val}</div>
              <div className="text-xs" style={{ color: '#3A4152' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold" style={{ color: niv.color }}>{niv.label}</span>
          <span className="text-xs" style={{ color: '#3A4152' }}>· {OBJECTIF[programme.objectif]}</span>
        </div>

        {programme.profils && programme.profils.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mt-2">
            {programme.profils.slice(0, 3).map(p => (
              <span key={p} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(230,57,70,0.08)', color: '#E63946', border: '1px solid rgba(230,57,70,0.18)' }}>
                {PROFIL_LABEL[p]}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-1 text-xs font-bold tracking-widest uppercase" style={{ color: '#E63946' }}>
          Voir le programme →
        </div>
      </div>
    </Link>
  )
}
