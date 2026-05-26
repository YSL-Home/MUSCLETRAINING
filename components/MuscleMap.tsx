'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MUSCLES } from '@/data/muscles'

interface MuscleMapProps {
  activeMode?: 'salle' | 'maison'
}

export default function MuscleMap({ activeMode = 'salle' }: MuscleMapProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [view, setView] = useState<'avant' | 'arriere'>('avant')
  const router = useRouter()

  const handleClick = (muscleId: string) => {
    const muscle = MUSCLES.find(m => m.id === muscleId)
    if (muscle) {
      router.push(`/muscles/${muscle.slug}`)
    }
  }

  const muscleColor = (id: string) => {
    const muscle = MUSCLES.find(m => m.id === id)
    if (!muscle) return '#475569'
    if (hovered === id) return muscle.couleurSvg
    return muscle.couleurSvg + 'aa'
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Toggle avant / arrière */}
      <div className="flex rounded-lg overflow-hidden border border-slate-200" style={{ background: '#f1f5f9' }}>
        <button
          onClick={() => setView('avant')}
          className={`px-5 py-2 text-sm font-semibold transition-all ${view === 'avant' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
          style={view === 'avant' ? { background: '#b8d400' } : {}}
        >
          Vue de face
        </button>
        <button
          onClick={() => setView('arriere')}
          className={`px-5 py-2 text-sm font-semibold transition-all ${view === 'arriere' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
          style={view === 'arriere' ? { background: '#b8d400' } : {}}
        >
          Vue de dos
        </button>
      </div>

      <div className="relative flex gap-4 items-start">
        {/* SVG corps */}
        <div className="relative">
          {view === 'avant' ? (
            <SvgAvant muscleColor={muscleColor} hovered={hovered} setHovered={setHovered} onClick={handleClick} />
          ) : (
            <SvgArriere muscleColor={muscleColor} hovered={hovered} setHovered={setHovered} onClick={handleClick} />
          )}
        </div>

        {/* Légende musclulaire */}
        <div className="hidden lg:flex flex-col gap-1.5 pt-4 min-w-[160px]">
          {MUSCLES.filter(m =>
            view === 'avant'
              ? m.positionSvg === 'avant' || m.positionSvg === 'les-deux'
              : m.positionSvg === 'arriere' || m.positionSvg === 'les-deux'
          ).map(muscle => (
            <button
              key={muscle.id}
              onClick={() => handleClick(muscle.id)}
              onMouseEnter={() => setHovered(muscle.id)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-2 text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-sm"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: muscle.couleurSvg }} />
              <span className={`font-medium ${hovered === muscle.id ? 'text-slate-900' : 'text-slate-600'}`}>
                {muscle.nom}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tooltip muscle survolé */}
      {hovered && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg" style={{ background: '#0f172a' }}>
            <span>Cliquez pour voir les exercices</span>
            <span className="font-bold" style={{ color: MUSCLES.find(m => m.id === hovered)?.couleurSvg }}>
              {MUSCLES.find(m => m.id === hovered)?.nom}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

interface SvgProps {
  muscleColor: (id: string) => string
  hovered: string | null
  setHovered: (id: string | null) => void
  onClick: (id: string) => void
}

function MuscleGroup({ id, onClick, setHovered, children, color }: {
  id: string
  onClick: (id: string) => void
  setHovered: (id: string | null) => void
  children: React.ReactNode
  color: string
}) {
  return (
    <g
      onClick={() => onClick(id)}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: 'pointer', fill: color, transition: 'fill 0.2s' }}
    >
      {children}
    </g>
  )
}

function SvgAvant({ muscleColor, hovered, setHovered, onClick }: SvgProps) {
  return (
    <svg width="200" height="480" viewBox="0 0 200 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corps silhouette */}
      <ellipse cx="100" cy="45" rx="28" ry="32" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Cou */}
      <rect x="90" y="73" width="20" height="18" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

      {/* Épaules */}
      <MuscleGroup id="epaules" onClick={onClick} setHovered={setHovered} color={muscleColor('epaules')}>
        <ellipse cx="60" cy="100" rx="20" ry="15" />
        <ellipse cx="140" cy="100" rx="20" ry="15" />
      </MuscleGroup>

      {/* Pectoraux */}
      <MuscleGroup id="pectoraux" onClick={onClick} setHovered={setHovered} color={muscleColor('pectoraux')}>
        <ellipse cx="83" cy="112" rx="20" ry="18" />
        <ellipse cx="117" cy="112" rx="20" ry="18" />
      </MuscleGroup>

      {/* Biceps */}
      <MuscleGroup id="biceps" onClick={onClick} setHovered={setHovered} color={muscleColor('biceps')}>
        <rect x="36" y="114" width="14" height="42" rx="7" />
        <rect x="150" y="114" width="14" height="42" rx="7" />
      </MuscleGroup>

      {/* Avant-bras */}
      <MuscleGroup id="avant-bras" onClick={onClick} setHovered={setHovered} color={muscleColor('avant-bras')}>
        <rect x="38" y="162" width="12" height="38" rx="6" />
        <rect x="150" y="162" width="12" height="38" rx="6" />
      </MuscleGroup>

      {/* Abdominaux */}
      <MuscleGroup id="abdominaux" onClick={onClick} setHovered={setHovered} color={muscleColor('abdominaux')}>
        <rect x="80" y="132" width="40" height="50" rx="8" />
        {/* Ligne médiane abs */}
        <line x1="100" y1="136" x2="100" y2="178" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <line x1="82" y1="150" x2="118" y2="150" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <line x1="82" y1="163" x2="118" y2="163" stroke="white" strokeWidth="1.5" opacity="0.4" />
      </MuscleGroup>

      {/* Bassin (neutre) */}
      <rect x="78" y="183" width="44" height="20" rx="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

      {/* Quadriceps */}
      <MuscleGroup id="quadriceps" onClick={onClick} setHovered={setHovered} color={muscleColor('quadriceps')}>
        <rect x="76" y="205" width="20" height="80" rx="10" />
        <rect x="104" y="205" width="20" height="80" rx="10" />
      </MuscleGroup>

      {/* Mollets avant */}
      <MuscleGroup id="mollets" onClick={onClick} setHovered={setHovered} color={muscleColor('mollets')}>
        <rect x="78" y="298" width="16" height="55" rx="8" />
        <rect x="106" y="298" width="16" height="55" rx="8" />
      </MuscleGroup>

      {/* Pieds */}
      <rect x="72" y="356" width="24" height="12" rx="4" fill="#e2e8f0" />
      <rect x="104" y="356" width="24" height="12" rx="4" fill="#e2e8f0" />

      {/* Triceps (visible côté) */}
      <MuscleGroup id="triceps" onClick={onClick} setHovered={setHovered} color={muscleColor('triceps')}>
        <rect x="22" y="114" width="12" height="42" rx="6" opacity="0.7" />
        <rect x="166" y="114" width="12" height="42" rx="6" opacity="0.7" />
      </MuscleGroup>
    </svg>
  )
}

function SvgArriere({ muscleColor, hovered, setHovered, onClick }: SvgProps) {
  return (
    <svg width="200" height="480" viewBox="0 0 200 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corps silhouette */}
      <ellipse cx="100" cy="45" rx="28" ry="32" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Trapèzes */}
      <MuscleGroup id="trapezes" onClick={onClick} setHovered={setHovered} color={muscleColor('trapezes')}>
        <path d="M 72 75 Q 100 68 128 75 L 138 102 Q 100 92 62 102 Z" />
      </MuscleGroup>

      {/* Épaules arrière */}
      <MuscleGroup id="epaules" onClick={onClick} setHovered={setHovered} color={muscleColor('epaules')}>
        <ellipse cx="58" cy="104" rx="20" ry="14" />
        <ellipse cx="142" cy="104" rx="20" ry="14" />
      </MuscleGroup>

      {/* Dos (grand dorsal) */}
      <MuscleGroup id="dos" onClick={onClick} setHovered={setHovered} color={muscleColor('dos')}>
        <path d="M 70 110 Q 62 120 65 150 L 80 185 L 100 180 L 120 185 L 135 150 Q 138 120 130 110 Q 115 118 100 116 Q 85 118 70 110 Z" />
      </MuscleGroup>

      {/* Triceps arrière */}
      <MuscleGroup id="triceps" onClick={onClick} setHovered={setHovered} color={muscleColor('triceps')}>
        <rect x="36" y="114" width="14" height="42" rx="7" />
        <rect x="150" y="114" width="14" height="42" rx="7" />
      </MuscleGroup>

      {/* Avant-bras arrière */}
      <MuscleGroup id="avant-bras" onClick={onClick} setHovered={setHovered} color={muscleColor('avant-bras')}>
        <rect x="38" y="162" width="12" height="38" rx="6" />
        <rect x="150" y="162" width="12" height="38" rx="6" />
      </MuscleGroup>

      {/* Lombaires */}
      <MuscleGroup id="lombaires" onClick={onClick} setHovered={setHovered} color={muscleColor('lombaires')}>
        <rect x="82" y="175" width="36" height="30" rx="6" />
      </MuscleGroup>

      {/* Fessiers */}
      <MuscleGroup id="fessiers" onClick={onClick} setHovered={setHovered} color={muscleColor('fessiers')}>
        <ellipse cx="87" cy="215" rx="22" ry="22" />
        <ellipse cx="113" cy="215" rx="22" ry="22" />
      </MuscleGroup>

      {/* Ischio-jambiers */}
      <MuscleGroup id="ischio-jambiers" onClick={onClick} setHovered={setHovered} color={muscleColor('ischio-jambiers')}>
        <rect x="76" y="240" width="20" height="65" rx="10" />
        <rect x="104" y="240" width="20" height="65" rx="10" />
      </MuscleGroup>

      {/* Mollets arrière */}
      <MuscleGroup id="mollets" onClick={onClick} setHovered={setHovered} color={muscleColor('mollets')}>
        <ellipse cx="86" cy="335" rx="10" ry="28" />
        <ellipse cx="114" cy="335" rx="10" ry="28" />
      </MuscleGroup>

      {/* Pieds */}
      <rect x="72" y="360" width="24" height="12" rx="4" fill="#e2e8f0" />
      <rect x="104" y="360" width="24" height="12" rx="4" fill="#e2e8f0" />
    </svg>
  )
}
