import { EXERCISES } from '@/data/exercises'
import { FRONT_PATHS, BACK_PATHS } from '@/data/muscleMapPaths'
import type { MuscleId } from '@/data/muscles'

const MUSCLE_TO_SVG: Partial<Record<MuscleId, { key: string; view: 'front' | 'back' | 'both' }>> = {
  pectoraux:           { key: 'chest',      view: 'front' },
  dos:                 { key: 'upperBack',  view: 'back'  },
  epaules:             { key: 'deltoids',   view: 'both'  },
  biceps:              { key: 'biceps',     view: 'front' },
  triceps:             { key: 'triceps',    view: 'back'  },
  'avant-bras':        { key: 'forearm',    view: 'front' },
  abdominaux:          { key: 'abs',        view: 'front' },
  quadriceps:          { key: 'quadriceps', view: 'front' },
  'ischio-jambiers':   { key: 'hamstring',  view: 'back'  },
  fessiers:            { key: 'gluteal',    view: 'back'  },
  mollets:             { key: 'calves',     view: 'both'  },
  trapezes:            { key: 'trapezius',  view: 'both'  },
  lombaires:           { key: 'lowerBack',  view: 'back'  },
}

const BACK_ONLY = new Set(['dos', 'triceps', 'ischio-jambiers', 'fessiers', 'lombaires'])

const FRONT_CLICKABLE = ['chest','abs','obliques','biceps','deltoids','quadriceps','calves','trapezius','forearm','hipFlexors','adductors','serratus']
const BACK_CLICKABLE  = ['upperBack','lowerBack','triceps','deltoids','trapezius','gluteal','hamstring','calves','forearm','adductors']
const FRONT_STRUCT    = ['hands','knees','ankles','feet','tibialis']
const BACK_STRUCT     = ['hands','ankles','feet']

interface Props { slug: string; className?: string }

export default function ExerciseMuscleMap({ slug, className = '' }: Props) {
  const exercise = EXERCISES.find(e => e.slug === slug)
  const primary = exercise?.musclesPrimaires ?? []

  const backCount = primary.filter(m => BACK_ONLY.has(m)).length
  const view: 'front' | 'back' = backCount > primary.length / 2 ? 'back' : 'front'

  const highlight = new Set<string>()
  primary.forEach(m => {
    const entry = MUSCLE_TO_SVG[m as MuscleId]
    if (!entry) return
    if (entry.view === 'both' || entry.view === view) highlight.add(entry.key)
  })

  const paths  = view === 'front' ? FRONT_PATHS : BACK_PATHS
  const clickable = view === 'front' ? FRONT_CLICKABLE : BACK_CLICKABLE
  const struct = view === 'front' ? FRONT_STRUCT : BACK_STRUCT
  const vb = view === 'front' ? '0 95 727 1280' : '718 95 727 1280'

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl flex items-center justify-center ${className}`}
      style={{ aspectRatio: '9/16', background: '#0f0f1a' }}
    >
      <svg viewBox={vb} style={{ height: '100%', width: 'auto' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="emm-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="emm-head" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#9090A0"/>
            <stop offset="100%" stopColor="#6A6A7A"/>
          </radialGradient>
        </defs>

        {struct.map(key => {
          const item = paths[key]; if (!item) return null
          return <g key={key} style={{ fill: '#7A7A8E' }}>{item.paths.map((d, i) => <path key={i} d={d}/>)}</g>
        })}

        {clickable.map(key => {
          const item = paths[key]; if (!item) return null
          const active = highlight.has(key)
          return (
            <g key={key} style={{ fill: active ? '#E63946' : '#6A6A7E', filter: active ? 'url(#emm-glow)' : undefined }}>
              {item.paths.map((d, i) => <path key={i} d={d}/>)}
            </g>
          )
        })}

        {['neck', 'head', 'hair'].map(key => {
          const item = paths[key]; if (!item) return null
          return (
            <g key={key} style={{ fill: key !== 'head' ? '#7A7A8E' : undefined }}>
              {item.paths.map((d, i) => <path key={i} d={d} fill={key === 'head' ? 'url(#emm-head)' : undefined}/>)}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
