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
  const primary  = exercise?.musclesPrimaires ?? []

  const backCount = primary.filter(m => BACK_ONLY.has(m)).length
  const view: 'front' | 'back' = backCount > primary.length / 2 ? 'back' : 'front'

  const highlight = new Set<string>()
  primary.forEach(m => {
    const entry = MUSCLE_TO_SVG[m as MuscleId]
    if (!entry) return
    if (entry.view === 'both' || entry.view === view) highlight.add(entry.key)
  })

  const paths    = view === 'front' ? FRONT_PATHS : BACK_PATHS
  const clickable = view === 'front' ? FRONT_CLICKABLE : BACK_CLICKABLE
  const struct   = view === 'front' ? FRONT_STRUCT : BACK_STRUCT
  const vb       = view === 'front' ? '0 95 727 1280' : '718 95 727 1280'

  const grayKeys = [...struct, ...clickable.filter(k => !highlight.has(k)), 'neck', 'hair']
  const redKeys  = clickable.filter(k => highlight.has(k))

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl flex items-center justify-center ${className}`}
      style={{ aspectRatio: '9/16' }}
    >
      <svg viewBox={vb} style={{ height: '100%', width: 'auto' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Fond gym beige chaud */}
          <radialGradient id="emm-bg" cx="50%" cy="38%" r="72%">
            <stop offset="0%" stopColor="#c8b89a"/>
            <stop offset="60%" stopColor="#9a8870"/>
            <stop offset="100%" stopColor="#5a4a38"/>
          </radialGradient>
          {/* Tête */}
          <radialGradient id="emm-hg" cx="38%" cy="32%" r="55%">
            <stop offset="0%" stopColor="#a0a0b8"/>
            <stop offset="100%" stopColor="#58586e"/>
          </radialGradient>
          {/* Éclairage 3D corps gris */}
          <filter id="emm-fg" x="-20%" y="-5%" width="140%" height="115%"
                  colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="28" result="h"/>
            <feDiffuseLighting in="h" lightingColor="#aab0cc"
                diffuseConstant="0.9" surfaceScale="6" result="diff">
              <feDistantLight azimuth="220" elevation="52"/>
            </feDiffuseLighting>
            <feComposite in="diff" in2="SourceAlpha" operator="in" result="dm"/>
            <feSpecularLighting in="h" lightingColor="#ffffff"
                specularConstant="0.35" specularExponent="18" result="spec">
              <feDistantLight azimuth="220" elevation="52"/>
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="sm"/>
            <feBlend in="SourceGraphic" in2="dm" mode="soft-light" result="b1"/>
            <feBlend in="b1" in2="sm" mode="screen"/>
          </filter>
          {/* Éclairage 3D muscles rouges + glow */}
          <filter id="emm-fr" x="-25%" y="-10%" width="150%" height="130%"
                  colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="h"/>
            <feDiffuseLighting in="h" lightingColor="#ff9080"
                diffuseConstant="1.8" surfaceScale="12" result="diff">
              <feDistantLight azimuth="220" elevation="52"/>
            </feDiffuseLighting>
            <feComposite in="diff" in2="SourceAlpha" operator="in" result="dm"/>
            <feSpecularLighting in="h" lightingColor="#ffffff"
                specularConstant="1.0" specularExponent="32" result="spec">
              <feDistantLight azimuth="220" elevation="52"/>
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="sm"/>
            <feGaussianBlur in="SourceAlpha" stdDeviation="22" result="gb"/>
            <feFlood floodColor="#E63946" floodOpacity="0.55" result="gc"/>
            <feComposite in="gc" in2="gb" operator="in" result="glow"/>
            <feBlend in="SourceGraphic" in2="dm" mode="overlay" result="b1"/>
            <feBlend in="b1" in2="sm" mode="screen" result="b2"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="b2"/></feMerge>
          </filter>
          {/* Ombre portée */}
          <filter id="emm-fs">
            <feDropShadow dx="0" dy="25" stdDeviation="20"
              floodColor="#000000" floodOpacity="0.5"/>
          </filter>
        </defs>

        {/* Fond gym */}
        <rect width="100%" height="100%" fill="url(#emm-bg)"/>
        <ellipse cx="50%" cy="97%" rx="22%" ry="2.5%" fill="#000" opacity="0.25"/>

        {/* Corps gris 3D */}
        <g filter="url(#emm-fs)">
          <g fill="#7878a0" filter="url(#emm-fg)">
            {grayKeys.map(key => {
              const item = paths[key]; if (!item) return null
              return <g key={key}>{item.paths.map((d, i) => <path key={i} d={d}/>)}</g>
            })}
          </g>
          {(paths['head']?.paths ?? []).map((d, i) =>
            <path key={i} d={d} fill="url(#emm-hg)"/>
          )}
        </g>

        {/* Muscles ciblés rouges 3D + glow */}
        <g fill="#E63946" filter="url(#emm-fr)">
          {redKeys.map(key => {
            const item = paths[key]; if (!item) return null
            return <g key={key}>{item.paths.map((d, i) => <path key={i} d={d}/>)}</g>
          })}
        </g>
      </svg>
    </div>
  )
}
