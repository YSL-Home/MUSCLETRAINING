'use client'
import { useState } from 'react'
import type { Exercise } from '@/data/exercises'
import ExerciseCard from '@/components/ExerciseCard'

type Niveau = 'tous' | 'debutant' | 'intermediaire' | 'avance'
type ModeFilter = 'tous' | 'salle' | 'maison'

interface Props {
  exercises: Exercise[]
  muscleId: string
  muscleCouleur: string
}

const NIVEAU_LABELS: Record<Niveau, string> = {
  tous: 'Tous',
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
}

const MODE_LABELS: Record<ModeFilter, string> = {
  tous: 'Tous',
  salle: 'Salle',
  maison: 'Maison',
}

export default function MuscleExerciseFilter({ exercises, muscleId, muscleCouleur }: Props) {
  const [niveau, setNiveau] = useState<Niveau>('tous')
  const [mode, setMode] = useState<ModeFilter>('tous')

  const filtered = exercises.filter(ex => {
    const niveauOk = niveau === 'tous' || ex.difficulte === niveau
    const modeOk =
      mode === 'tous' ||
      ex.mode === mode ||
      ex.mode === 'les-deux'
    return niveauOk && modeOk
  })

  const activeStyle = {
    background: 'rgba(230,57,70,0.15)',
    border: '1px solid #E63946',
    color: '#E63946',
  }
  const inactiveStyle = {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#5A6478',
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="space-y-3">
        {/* Niveau */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#3A4152', minWidth: 56 }}>
            Niveau
          </span>
          {(Object.keys(NIVEAU_LABELS) as Niveau[]).map(n => (
            <button
              key={n}
              onClick={() => setNiveau(n)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150"
              style={niveau === n ? activeStyle : inactiveStyle}
            >
              {NIVEAU_LABELS[n]}
            </button>
          ))}
        </div>

        {/* Mode */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#3A4152', minWidth: 56 }}>
            Mode
          </span>
          {(Object.keys(MODE_LABELS) as ModeFilter[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150"
              style={mode === m ? activeStyle : inactiveStyle}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* Compteur */}
      <div>
        <span className="text-sm font-bold" style={{ color: muscleCouleur }}>
          {filtered.length}
        </span>
        <span className="text-sm ml-1" style={{ color: '#5A6478' }}>
          {filtered.length === 1 ? 'exercice' : 'exercices'}
        </span>
      </div>

      {/* Grille */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(ex => (
            <ExerciseCard key={ex.slug} exercise={ex} />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-sm" style={{ color: '#5A6478' }}>
            Aucun exercice pour ces filtres.
          </p>
        </div>
      )}
    </div>
  )
}
