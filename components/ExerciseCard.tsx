import Link from 'next/link'
import type { Exercise } from '@/data/exercises'

const DIFF: Record<string, { label: string; color: string }> = {
  debutant:      { label: 'Débutant',       color: '#4ADE80' },
  intermediaire: { label: 'Intermédiaire',  color: '#FBBF24' },
  avance:        { label: 'Avancé',         color: '#F87171' },
}
const MODE: Record<string, string> = {
  salle:    'Salle',
  maison:   'Maison',
  'les-deux': 'Universel',
}

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const diff = DIFF[exercise.difficulte]

  return (
    <Link href={`/exercice/${exercise.slug}`} className="block exercise-card">
      <div className="glass-card rounded-2xl overflow-hidden h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden"
          style={{ background: '#0C0C1A' }}>
          <img
            src={`https://img.youtube.com/vi/${exercise.videoYoutube}/mqdefault.jpg`}
            alt={exercise.nom}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #E63946, transparent)' }} />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(230,57,70,0.9)', boxShadow: '0 0 20px rgba(230,57,70,0.4)' }}>
              <svg className="w-4 h-4 ml-0.5" fill="#07070F" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Difficulty dot */}
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(7,7,15,0.8)', color: diff.color, border: `1px solid ${diff.color}40` }}>
              {diff.label}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-sm leading-tight mb-1.5" style={{ color: '#EDE8E0' }}>
            {exercise.nom}
          </h3>
          <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#5A6478' }}>
            {exercise.descriptionCourte}
          </p>

          <div className="flex items-center justify-between">
            <span className="badge-red px-2 py-0.5 rounded-full">
              {MODE[exercise.mode] ?? exercise.mode}
            </span>
            {exercise.calories && (
              <span className="text-[10px] font-medium" style={{ color: '#3A4152' }}>
                ~{exercise.calories} kcal/min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
