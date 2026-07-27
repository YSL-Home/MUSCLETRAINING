'use client'

import { useEffect, useState } from 'react'

interface Props { slug: string }
interface PR { poids: number; reps: number }

const STORAGE = 'mt-pr-manual'
const TRACKER_KEY = 'mt-tracker'

function loadPR(slug: string): PR | null {
  try {
    const manual = JSON.parse(localStorage.getItem(STORAGE) ?? '{}')[slug] as PR | undefined
    if (manual) return manual
    const logs: { exercices: { slug: string; series: PR[] }[] }[] =
      JSON.parse(localStorage.getItem(TRACKER_KEY) ?? '[]')
    const series = logs.flatMap(l =>
      l.exercices.filter(e => e.slug === slug).flatMap(e => e.series)
    )
    if (!series.length) return null
    return series.reduce((a, b) => a.poids > b.poids ? a : b)
  } catch { return null }
}

const PCTS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

export default function OneRMCalculator({ slug }: Props) {
  const [pr, setPr] = useState<PR | null>(null)
  const [orm, setOrm] = useState<number | null>(null)

  useEffect(() => {
    const p = loadPR(slug)
    if (!p) return
    setPr(p)
    // Epley formula
    const val = p.reps === 1 ? p.poids : p.poids * (1 + p.reps / 30)
    setOrm(Math.round(val * 10) / 10)
  }, [slug])

  if (!pr || !orm) return null

  return (
    <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5">
      <h3 className="font-bold text-[#EDE8E0] mb-1 flex items-center gap-2">
        <span style={{ color: '#E63946' }}>📊</span> Calculateur de charge
      </h3>
      <p className="text-xs text-[#5A6478] mb-4">
        Basé sur ton PR : {pr.poids} kg × {pr.reps} reps → 1RM ≈ <span className="font-bold text-[#E63946]">{orm} kg</span>
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {PCTS.map(pct => {
          const load = Math.round(orm * pct / 100 * 4) / 4
          const isHigh = pct >= 85
          return (
            <div key={pct}
              className="flex justify-between items-center px-3 py-1.5 rounded-lg"
              style={{ background: isHigh ? 'rgba(230,57,70,0.08)' : 'rgba(255,255,255,0.03)', border: isHigh ? '1px solid rgba(230,57,70,0.2)' : '1px solid transparent' }}>
              <span className="text-xs font-semibold" style={{ color: isHigh ? '#E63946' : '#5A6478' }}>{pct}%</span>
              <span className="text-sm font-black" style={{ color: '#EDE8E0' }}>{load} <span className="text-[10px] font-normal text-[#5A6478]">kg</span></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
