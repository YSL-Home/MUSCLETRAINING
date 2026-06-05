import type { MuscleId } from '@/data/muscles'

const MUSCLE_COLORS: Record<MuscleId, string> = {
  pectoraux: '#ef4444',
  dos: '#3b82f6',
  epaules: '#8b5cf6',
  biceps: '#06b6d4',
  triceps: '#f59e0b',
  'avant-bras': '#84cc16',
  abdominaux: '#b8d400',
  lombaires: '#a78bfa',
  quadriceps: '#10b981',
  'ischio-jambiers': '#0ea5e9',
  fessiers: '#ec4899',
  mollets: '#14b8a6',
  trapezes: '#64748b',
}

const NEUTRAL = '#e2e8f0'
const NEUTRAL_SECONDARY = '#cbd5e1'

interface Props {
  primaires: MuscleId[]
  secondaires?: MuscleId[]
  vue?: 'avant' | 'arriere' | 'auto'
  size?: number
}

function muscleColor(id: MuscleId, primaires: MuscleId[], secondaires: MuscleId[]) {
  if (primaires.includes(id)) return MUSCLE_COLORS[id]
  if (secondaires.includes(id)) return MUSCLE_COLORS[id] + '66'
  return NEUTRAL
}

export default function MuscleIllustration({ primaires, secondaires = [], vue = 'auto', size = 180 }: Props) {
  const backMuscles: MuscleId[] = ['dos', 'lombaires', 'trapezes', 'ischio-jambiers', 'fessiers']
  const needsBack = [...primaires, ...secondaires].some(m => backMuscles.includes(m))
  const needsFront = [...primaires, ...secondaires].some(m => !backMuscles.includes(m))
  const showBoth = vue === 'auto' && needsBack && needsFront
  const showBack = vue === 'arriere' || (vue === 'auto' && needsBack && !needsFront)

  const mc = (id: MuscleId) => muscleColor(id, primaires, secondaires)

  const Front = () => (
    <svg width={size} height={size * 2.2} viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tête */}
      <ellipse cx="50" cy="18" rx="13" ry="15" fill={NEUTRAL_SECONDARY} />
      {/* Cou */}
      <rect x="44" y="31" width="12" height="10" rx="3" fill={NEUTRAL_SECONDARY} />
      {/* Épaules */}
      <ellipse cx="28" cy="48" rx="10" ry="7" fill={mc('epaules')} />
      <ellipse cx="72" cy="48" rx="10" ry="7" fill={mc('epaules')} />
      {/* Pectoraux */}
      <ellipse cx="40" cy="54" rx="12" ry="10" fill={mc('pectoraux')} />
      <ellipse cx="60" cy="54" rx="12" ry="10" fill={mc('pectoraux')} />
      {/* Biceps */}
      <rect x="16" y="55" width="8" height="22" rx="4" fill={mc('biceps')} />
      <rect x="76" y="55" width="8" height="22" rx="4" fill={mc('biceps')} />
      {/* Triceps latéral */}
      <rect x="9" y="55" width="6" height="20" rx="3" fill={mc('triceps')} opacity="0.7" />
      <rect x="85" y="55" width="6" height="20" rx="3" fill={mc('triceps')} opacity="0.7" />
      {/* Avant-bras */}
      <rect x="17" y="79" width="7" height="20" rx="3" fill={mc('avant-bras')} />
      <rect x="76" y="79" width="7" height="20" rx="3" fill={mc('avant-bras')} />
      {/* Abdominaux */}
      <rect x="38" y="65" width="24" height="28" rx="5" fill={mc('abdominaux')} />
      <line x1="50" y1="68" x2="50" y2="91" stroke="white" strokeWidth="1" opacity="0.4" />
      <line x1="40" y1="76" x2="60" y2="76" stroke="white" strokeWidth="1" opacity="0.4" />
      <line x1="40" y1="84" x2="60" y2="84" stroke="white" strokeWidth="1" opacity="0.4" />
      {/* Bassin */}
      <rect x="36" y="94" width="28" height="10" rx="5" fill={NEUTRAL_SECONDARY} />
      {/* Quadriceps */}
      <rect x="36" y="106" width="13" height="45" rx="6" fill={mc('quadriceps')} />
      <rect x="51" y="106" width="13" height="45" rx="6" fill={mc('quadriceps')} />
      {/* Mollets avant */}
      <rect x="37" y="153" width="11" height="32" rx="5" fill={mc('mollets')} />
      <rect x="52" y="153" width="11" height="32" rx="5" fill={mc('mollets')} />
      {/* Pieds */}
      <rect x="32" y="187" width="18" height="7" rx="3" fill={NEUTRAL_SECONDARY} />
      <rect x="50" y="187" width="18" height="7" rx="3" fill={NEUTRAL_SECONDARY} />
    </svg>
  )

  const Back = () => (
    <svg width={size} height={size * 2.2} viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tête */}
      <ellipse cx="50" cy="18" rx="13" ry="15" fill={NEUTRAL_SECONDARY} />
      {/* Cou / Trapèzes */}
      <path d="M 37 33 Q 50 28 63 33 L 68 50 Q 50 43 32 50 Z" fill={mc('trapezes')} />
      {/* Épaules */}
      <ellipse cx="27" cy="50" rx="10" ry="7" fill={mc('epaules')} />
      <ellipse cx="73" cy="50" rx="10" ry="7" fill={mc('epaules')} />
      {/* Grand dorsal */}
      <path d="M 34 52 Q 27 60 30 78 L 40 94 L 50 90 L 60 94 L 70 78 Q 73 60 66 52 Q 58 58 50 56 Q 42 58 34 52 Z" fill={mc('dos')} />
      {/* Triceps */}
      <rect x="17" y="55" width="8" height="22" rx="4" fill={mc('triceps')} />
      <rect x="75" y="55" width="8" height="22" rx="4" fill={mc('triceps')} />
      {/* Avant-bras */}
      <rect x="17" y="79" width="7" height="20" rx="3" fill={mc('avant-bras')} />
      <rect x="76" y="79" width="7" height="20" rx="3" fill={mc('avant-bras')} />
      {/* Lombaires */}
      <rect x="38" y="88" width="24" height="18" rx="4" fill={mc('lombaires')} />
      {/* Fessiers */}
      <ellipse cx="41" cy="112" rx="13" ry="13" fill={mc('fessiers')} />
      <ellipse cx="59" cy="112" rx="13" ry="13" fill={mc('fessiers')} />
      {/* Ischio-jambiers */}
      <rect x="36" y="126" width="13" height="38" rx="6" fill={mc('ischio-jambiers')} />
      <rect x="51" y="126" width="13" height="38" rx="6" fill={mc('ischio-jambiers')} />
      {/* Mollets */}
      <ellipse cx="43" cy="178" rx="7" ry="16" fill={mc('mollets')} />
      <ellipse cx="57" cy="178" rx="7" ry="16" fill={mc('mollets')} />
      {/* Pieds */}
      <rect x="32" y="195" width="18" height="7" rx="3" fill={NEUTRAL_SECONDARY} />
      <rect x="50" y="195" width="18" height="7" rx="3" fill={NEUTRAL_SECONDARY} />
    </svg>
  )

  if (showBoth) {
    return (
      <div className="flex gap-4 items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-[#3A4152] mb-1 font-medium">Face</div>
          <Front />
        </div>
        <div className="text-center">
          <div className="text-xs text-[#3A4152] mb-1 font-medium">Dos</div>
          <Back />
        </div>
      </div>
    )
  }

  return showBack ? <Back /> : <Front />
}
