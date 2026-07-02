'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { EXERCISES } from '@/data/exercises'
import { FRONT_PATHS, BACK_PATHS } from '@/data/muscleMapPaths'

// ── Mapping SVG key → muscle slug ──────────────────────────────────────────
const SLUG_MAP: Record<string, string> = {
  chest:      'pectoraux',
  abs:        'abdominaux',
  obliques:   'abdominaux',
  serratus:   'pectoraux',
  hipFlexors: 'abdominaux',
  biceps:     'biceps',
  triceps:    'triceps',
  deltoids:   'epaules',
  trapezius:  'trapezes',
  forearm:    'avant-bras',
  quadriceps: 'quadriceps',
  adductors:  'ischio-jambiers',
  calves:     'mollets',
  upperBack:  'dos',
  lowerBack:  'lombaires',
  gluteal:    'fessiers',
  hamstring:  'ischio-jambiers',
}

const LATIN: Record<string, string> = {
  chest:      'Pectoralis Major',
  abs:        'Rectus Abdominis',
  obliques:   'Obliquus Externus',
  serratus:   'Serratus Anterior',
  hipFlexors: 'Iliopsoas',
  biceps:     'Biceps Brachii',
  triceps:    'Triceps Brachii',
  deltoids:   'Deltoideus',
  trapezius:  'Trapezius',
  forearm:    'Brachioradialis',
  quadriceps: 'Quadriceps Femoris',
  adductors:  'Adductor Magnus',
  calves:     'Gastrocnemius',
  upperBack:  'Latissimus Dorsi',
  lowerBack:  'Erector Spinae',
  gluteal:    'Gluteus Maximus',
  hamstring:  'Biceps Femoris',
}

const DISPLAY_NAME: Record<string, string> = {
  chest:      'Pectoraux',
  abs:        'Abdominaux',
  obliques:   'Obliques',
  serratus:   'Serratus',
  hipFlexors: 'Fléchisseurs hanches',
  biceps:     'Biceps',
  triceps:    'Triceps',
  deltoids:   'Épaules',
  trapezius:  'Trapèzes',
  forearm:    'Avant-bras',
  quadriceps: 'Quadriceps',
  adductors:  'Adducteurs',
  calves:     'Mollets',
  upperBack:  'Dos',
  lowerBack:  'Bas du dos',
  gluteal:    'Fessiers',
  hamstring:  'Ischio-jambiers',
}

const FRONT_CLICKABLE = ['chest', 'abs', 'obliques', 'biceps', 'deltoids', 'quadriceps', 'calves', 'trapezius', 'forearm', 'hipFlexors', 'adductors', 'serratus']
const BACK_CLICKABLE  = ['upperBack', 'lowerBack', 'triceps', 'deltoids', 'trapezius', 'gluteal', 'hamstring', 'calves', 'forearm', 'adductors']
const FRONT_STRUCT    = ['hands', 'knees', 'ankles', 'feet', 'tibialis']
const BACK_STRUCT     = ['hands', 'ankles', 'feet']

export default function MuscleMap() {
  const router = useRouter()
  const [view, setView] = useState<'front' | 'back'>('front')
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const displayed = hovered ?? active
  const slug      = displayed ? SLUG_MAP[displayed] : null
  const exercises = slug
    ? EXERCISES.filter(e => e.musclesPrimaires.includes(slug as any)).slice(0, 4)
    : []

  function handleClick(key: string) {
    if (active === key) {
      setActive(null)
      return
    }
    setActive(key)
    const s = SLUG_MAP[key]
    if (s) router.push(`/muscles/${s}`)
  }

  function switchView(v: 'front' | 'back') {
    setView(v)
    setActive(null)
    setHovered(null)
  }

  return (
    <div className="flex w-full h-full">
      {/* ── LEFT: body SVG ── */}
      <div
        className="relative flex flex-col items-center justify-between py-3"
        style={{ width: '200px', flexShrink: 0, background: 'transparent' }}
      >
        {/* Toggle */}
        <div
          className="flex gap-0.5 rounded-full p-0.5 z-10"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #2a2040' }}
        >
          {(['front', 'back'] as const).map(v => (
            <button
              key={v}
              onClick={() => switchView(v)}
              className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full transition-all duration-200"
              style={view === v
                ? { background: 'linear-gradient(135deg,#E63946,#B91C1C)', color: '#07070F' }
                : { background: 'transparent', color: '#4a4060' }
              }
            >
              {v === 'front' ? 'Avant' : 'Dos'}
            </button>
          ))}
        </div>

        {/* SVG body */}
        <div className="flex-1 flex items-center justify-center w-full">
          <svg
            viewBox={view === 'front' ? '0 95 727 1280' : '718 95 727 1280'}
            style={{ height: '100%', maxHeight: '370px', width: 'auto' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="mm-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="mm-head" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#9090A0"/>
                <stop offset="100%" stopColor="#6A6A7A"/>
              </radialGradient>
            </defs>

            {/* Structure (skin-colored, non-interactive) */}
            {(view === 'front' ? FRONT_STRUCT : BACK_STRUCT).map(key => {
              const item = view === 'front' ? FRONT_PATHS[key] : BACK_PATHS[key]
              if (!item) return null
              return (
                <g key={key} style={{ fill: '#7A7A8E' }}>
                  {item.paths.map((d, i) => <path key={i} d={d}/>)}
                </g>
              )
            })}

            {/* Clickable muscles */}
            {(view === 'front' ? FRONT_CLICKABLE : BACK_CLICKABLE).map(key => {
              const item = view === 'front' ? FRONT_PATHS[key] : BACK_PATHS[key]
              if (!item) return null
              const isActive  = active === key
              const isHovered = hovered === key
              return (
                <g
                  key={key}
                  data-key={key}
                  onClick={() => handleClick(key)}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    fill: isActive
                      ? '#E63946'
                      : isHovered
                        ? '#FFFFFF'
                        : '#6A6A7E',
                    cursor: 'pointer',
                    transition: 'fill 0.15s ease',
                    filter: isActive ? 'url(#mm-glow)' : isHovered ? 'url(#mm-glow)' : undefined,
                    opacity: isHovered && !isActive ? 0.92 : 1,
                  }}
                >
                  {item.paths.map((d, i) => <path key={i} d={d}/>)}
                </g>
              )
            })}

            {/* Head + Hair (always on top) */}
            {['neck', 'head', 'hair'].map(key => {
              const item = view === 'front' ? FRONT_PATHS[key] : BACK_PATHS[key]
              if (!item) return null
              return (
                <g
                  key={key}
                  style={{
                    fill: key === 'hair' ? '#7A7A8E' : key === 'neck' ? '#7A7A8E' : undefined,
                    ...(key === 'head' ? {} : {}),
                  }}
                >
                  {item.paths.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      fill={key === 'head' ? 'url(#mm-head)' : undefined}
                    />
                  ))}
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* ── RIGHT: info panel ── */}
      <div className="flex-1 flex flex-col justify-between pl-4 min-w-0">
        <div>
          <p
            className="text-[9px] font-bold tracking-[0.22em] uppercase mb-1.5"
            style={{ color: '#E63946', fontFamily: 'Helvetica Neue, sans-serif' }}
          >
            Groupe musculaire
          </p>
          <h3
            className="font-light leading-tight mb-1 truncate"
            style={{ fontSize: '22px', color: '#f0e8d0', letterSpacing: '0.02em', minHeight: '28px' }}
          >
            {displayed ? (DISPLAY_NAME[displayed] ?? displayed) : 'Sélectionne un muscle'}
          </h3>
          <p
            className="text-[11px] italic mb-3"
            style={{ color: '#9A8A6A', fontFamily: 'Helvetica Neue, sans-serif', minHeight: '16px' }}
          >
            {displayed ? (LATIN[displayed] ?? '') : 'Cliquez sur le corps'}
          </p>
          <div style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg,#E63946,transparent)', marginBottom: '14px' }}/>

          <p
            className="text-[8px] tracking-[0.2em] uppercase mb-2"
            style={{ color: '#6A7080', fontFamily: 'Helvetica Neue, sans-serif' }}
          >
            Exercices recommandés
          </p>
          <div className="flex flex-col gap-1.5" style={{ minHeight: '88px' }}>
            {exercises.length > 0
              ? exercises.map(ex => (
                <div
                  key={ex.slug}
                  className="flex items-center gap-2 text-[11px] px-2 py-1 rounded-md"
                  style={{
                    color: '#c8b888',
                    border: '1px solid rgba(230,57,70,0.15)',
                    background: 'rgba(230,57,70,0.04)',
                    fontFamily: 'Helvetica Neue, sans-serif',
                  }}
                >
                  <span
                    style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      background: '#E63946', flexShrink: 0,
                    }}
                  />
                  {ex.nom}
                </div>
              ))
              : Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[11px] px-2 py-1 rounded-md"
                  style={{ color: '#4A5060', border: '1px solid transparent', fontFamily: 'Helvetica Neue, sans-serif' }}
                >
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2a2040', flexShrink: 0 }}/>
                  —
                </div>
              ))
            }
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-3">
          {[
            { n: exercises.length > 0 ? exercises.length : EXERCISES.length, lbl: 'Exercices' },
            { n: 6, lbl: 'Programmes' },
            { n: 41, lbl: 'Vidéos FR' },
          ].map(s => (
            <div
              key={s.lbl}
              className="flex-1 rounded-lg text-center py-2"
              style={{ background: 'rgba(230,57,70,0.04)', border: '1px solid rgba(230,57,70,0.1)' }}
            >
              <div style={{ fontSize: '18px', fontWeight: 300, color: '#E63946', lineHeight: 1 }}>{s.n}</div>
              <div
                style={{
                  fontSize: '7px', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#6A7080', fontFamily: 'Helvetica Neue, sans-serif', marginTop: '2px',
                }}
              >
                {s.lbl}
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-[8px] text-center mt-2 tracking-widest uppercase"
          style={{ color: '#4A5060', fontFamily: 'Helvetica Neue, sans-serif' }}
        >
          ↑ cliquez pour explorer
        </p>
      </div>
    </div>
  )
}
