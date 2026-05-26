import Link from 'next/link'
import type { Exercise } from '@/data/exercises'

const DIFFICULTE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  debutant: { label: 'Débutant', color: '#16a34a', bg: '#f0fdf4' },
  intermediaire: { label: 'Intermédiaire', color: '#d97706', bg: '#fffbeb' },
  avance: { label: 'Avancé', color: '#e11d48', bg: '#fff1f2' },
}

const MODE_LABELS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  salle: { label: 'Salle', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  maison: { label: 'Maison', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  'les-deux': { label: 'Salle & Maison', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
}

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const diff = DIFFICULTE_LABELS[exercise.difficulte]
  const modeInfo = MODE_LABELS[exercise.mode]

  return (
    <Link href={`/exercice/${exercise.slug}`} className="block exercise-card">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-orange-300 transition-all" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {/* Thumbnail YouTube */}
        <div className="relative aspect-video bg-slate-100 overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${exercise.videoYoutube}/mqdefault.jpg`}
            alt={`Vidéo : ${exercise.nom}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-slate-900 text-base leading-tight mb-2">{exercise.nom}</h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">{exercise.descriptionCourte}</p>

          <div className="flex flex-wrap gap-1.5">
            {/* Mode badge */}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: modeInfo.color, background: modeInfo.bg, border: `1px solid ${modeInfo.border}` }}>
              {modeInfo.label}
            </span>
            {/* Difficulté */}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: diff.color, background: diff.bg }}>
              {diff.label}
            </span>
            {/* Calories */}
            {exercise.calories && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full text-slate-500 bg-slate-100">
                ~{exercise.calories} cal/min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
