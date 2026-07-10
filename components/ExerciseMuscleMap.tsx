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

interface Props { slug: string; className?: string; compact?: boolean; animated?: boolean }

export default function ExerciseMuscleMap({ slug, className = '', compact = false, animated = false }: Props) {
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
  // compact: crop to body (head→thighs), ~1:1.1 ratio; full: 9/16
  const vb = compact
    ? (view === 'front' ? '60 180 607 680' : '778 180 607 680')
    : (view === 'front' ? '0 95 727 1280'  : '718 95 727 1280')
  const x0       = view === 'front' ? 0 : 718
  const W        = 727

  const grayKeys = [...struct, ...clickable.filter(k => !highlight.has(k)), 'neck', 'hair']
  const redKeys  = clickable.filter(k => highlight.has(k))

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl flex items-center justify-center ${className}`}
      style={{ aspectRatio: compact ? '607/680' : '9/16' }}
    >
      <svg viewBox={vb} style={{ height: '100%', width: 'auto' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Halo gym central */}
          <radialGradient id="emm-gh" cx={x0 + 363} cy={400} r={380} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c8a060" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
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

        {/* ── Fond salle de sport ── */}
        {/* Mur sombre */}
        <rect x={x0} y={95} width={W} height={805} fill="#201a12"/>
        <rect x={x0} y={95} width={W} height={805} fill="url(#emm-gh)"/>
        {/* Sol */}
        <rect x={x0} y={900} width={W} height={380} fill="#2e2418"/>
        <rect x={x0} y={897} width={W} height={6} fill="#1a1208"/>
        {/* Carrelage sol */}
        <line x1={x0}       y1={950}  x2={x0+W} y2={950}  stroke="#251e12" strokeWidth={2}/>
        <line x1={x0}       y1={1010} x2={x0+W} y2={1010} stroke="#251e12" strokeWidth={2}/>
        <line x1={x0}       y1={1080} x2={x0+W} y2={1080} stroke="#251e12" strokeWidth={2}/>
        <line x1={x0}       y1={1160} x2={x0+W} y2={1160} stroke="#251e12" strokeWidth={2}/>
        <line x1={x0+182}   y1={900}  x2={x0+182} y2={1280} stroke="#251e12" strokeWidth={2}/>
        <line x1={x0+364}   y1={900}  x2={x0+364} y2={1280} stroke="#251e12" strokeWidth={2}/>
        <line x1={x0+546}   y1={900}  x2={x0+546} y2={1280} stroke="#251e12" strokeWidth={2}/>

        {/* RACK SQUAT gauche */}
        <rect x={x0+28}  y={200} width={18} height={680} fill="#28283a" rx={4}/>
        <rect x={x0+130} y={200} width={18} height={680} fill="#28283a" rx={4}/>
        <rect x={x0+26}  y={370} width={124} height={16} fill="#32323e" rx={3}/>
        <rect x={x0+26}  y={530} width={124} height={16} fill="#32323e" rx={3}/>
        <rect x={x0+26}  y={680} width={124} height={12} fill="#3a3a48" rx={2}/>
        <rect x={x0+26}  y={720} width={124} height={12} fill="#3a3a48" rx={2}/>
        <rect x={x0+20}  y={870} width={56}  height={18} fill="#222230" rx={3}/>
        <rect x={x0+100} y={870} width={56}  height={18} fill="#222230" rx={3}/>
        <rect x={x0+46}  y={200} width={84}  height={8}  fill="#404060" rx={2}/>
        {/* Disques rack */}
        <ellipse cx={x0+30}  cy={440} rx={10} ry={40} fill="#1e1e2a" stroke="#38384a" strokeWidth={1.5}/>
        <ellipse cx={x0+42}  cy={440} rx={9}  ry={35} fill="#222232" stroke="#38384a" strokeWidth={1}/>
        <ellipse cx={x0+136} cy={440} rx={10} ry={40} fill="#1e1e2a" stroke="#38384a" strokeWidth={1.5}/>
        <ellipse cx={x0+148} cy={440} rx={9}  ry={35} fill="#222232" stroke="#38384a" strokeWidth={1}/>

        {/* BARRE AU SOL droite */}
        <rect x={x0+390} y={895} width={310} height={10} rx={5} fill="#404055"/>
        <ellipse cx={x0+392} cy={900} rx={7} ry={32} fill="#282838" stroke="#404055" strokeWidth={1.5}/>
        <ellipse cx={x0+698} cy={900} rx={7} ry={32} fill="#282838" stroke="#404055" strokeWidth={1.5}/>
        <ellipse cx={x0+406} cy={900} rx={8} ry={28} fill="#1e1e28" stroke="#38384a" strokeWidth={1}/>
        <ellipse cx={x0+416} cy={900} rx={7} ry={24} fill="#222230" stroke="#38384a" strokeWidth={1}/>
        <ellipse cx={x0+684} cy={900} rx={8} ry={28} fill="#1e1e28" stroke="#38384a" strokeWidth={1.5}/>
        <ellipse cx={x0+674} cy={900} rx={7} ry={24} fill="#222230" stroke="#38384a" strokeWidth={1}/>

        {/* RACK HALTÈRES droite haut */}
        <rect x={x0+490} y={700} width={210} height={14}  rx={4} fill="#2a2a38"/>
        <rect x={x0+490} y={714} width={210} height={130} rx={4} fill="#1e1e28"/>
        <rect x={x0+490} y={840} width={210} height={50}  rx={3} fill="#181824"/>
        {/* Haltères */}
        <rect x={x0+502} y={668} width={32} height={28} rx={6} fill="#303044"/>
        <rect x={x0+502} y={656} width={10} height={12} rx={3} fill="#28283c"/>
        <rect x={x0+524} y={656} width={10} height={12} rx={3} fill="#28283c"/>
        <rect x={x0+544} y={663} width={36} height={32} rx={6} fill="#2e2e42"/>
        <rect x={x0+544} y={650} width={11} height={14} rx={3} fill="#262636"/>
        <rect x={x0+569} y={650} width={11} height={14} rx={3} fill="#262636"/>
        <rect x={x0+590} y={658} width={40} height={36} rx={6} fill="#2a2a3e"/>
        <rect x={x0+590} y={643} width={12} height={16} rx={3} fill="#222234"/>
        <rect x={x0+618} y={643} width={12} height={16} rx={3} fill="#222234"/>
        <rect x={x0+640} y={652} width={44} height={42} rx={6} fill="#262638"/>
        <rect x={x0+640} y={635} width={13} height={18} rx={3} fill="#202030"/>
        <rect x={x0+671} y={635} width={13} height={18} rx={3} fill="#202030"/>

        {/* Reflets miroir */}
        <rect x={x0+160} y={200} width={380} height={1} fill="#ffffff" opacity={0.04}/>
        <rect x={x0+160} y={350} width={380} height={1} fill="#ffffff" opacity={0.03}/>
        <rect x={x0+160} y={500} width={380} height={1} fill="#ffffff" opacity={0.03}/>
        <rect x={x0+160} y={650} width={380} height={1} fill="#ffffff" opacity={0.02}/>

        {/* Ombre sol mannequin */}
        <ellipse cx={x0+363} cy={1230} rx={130} ry={18} fill="#000000" opacity={0.35}/>

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
        {animated && (
          <style>{`
            @keyframes emm-red-pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.55; filter: url(#emm-fr) drop-shadow(0 0 18px rgba(230,57,70,0.9)); }
            }
            .emm-animated { animation: emm-red-pulse 1.8s ease-in-out infinite; }
          `}</style>
        )}
        <g fill="#E63946" filter="url(#emm-fr)" className={animated ? 'emm-animated' : ''}>
          {redKeys.map(key => {
            const item = paths[key]; if (!item) return null
            return <g key={key}>{item.paths.map((d, i) => <path key={i} d={d}/>)}</g>
          })}
        </g>
      </svg>
    </div>
  )
}
