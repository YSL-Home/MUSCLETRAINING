'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  nom: string
  tempsRepos: number
  totalSeries?: number
}

export default function FocusMode({ nom, tempsRepos, totalSeries = 4 }: Props) {
  const [open, setOpen] = useState(false)
  const [set, setSet] = useState(1)
  const [resting, setResting] = useState(false)
  const [seconds, setSeconds] = useState(tempsRepos)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const beep = useCallback(() => {
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(660, ctx.currentTime)
      gain.gain.setValueAtTime(0.35, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
      osc.start()
      osc.stop(ctx.currentTime + 0.5)
    } catch {}
  }, [])

  useEffect(() => {
    if (!resting) return
    setSeconds(tempsRepos)
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current!)
          setResting(false)
          beep()
          return tempsRepos
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current!)
  }, [resting, tempsRepos, beep])

  const close = () => {
    clearInterval(intervalRef.current!)
    setOpen(false)
    setSet(1)
    setResting(false)
    setSeconds(tempsRepos)
    setDone(false)
  }

  const nextSet = () => {
    if (set >= totalSeries) {
      setDone(true)
      return
    }
    setSet(s => s + 1)
    setResting(true)
  }

  const skipRest = () => {
    clearInterval(intervalRef.current!)
    setResting(false)
    setSeconds(tempsRepos)
  }

  const pct = seconds / tempsRepos
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = circ * pct

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(135deg,#B91C1C,#E63946)', color: '#fff' }}>
        ⚡ Mode séance focus
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#07070F' }}>

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid rgba(230,57,70,0.1)' }}>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E63946' }}>MODE SÉANCE</span>
            <button onClick={close} className="text-[#5A6478] hover:text-[#EDE8E0] text-2xl leading-none">×</button>
          </div>

          {done ? (
            <div className="text-center px-8">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-black text-[#EDE8E0] mb-2">Exercice terminé !</h2>
              <p className="text-[#8A9BB5] mb-8">{totalSeries} séries de {nom} complétées.</p>
              <button onClick={close}
                className="px-8 py-3 rounded-2xl font-bold text-white"
                style={{ background: '#16a34a' }}>
                Terminer
              </button>
            </div>
          ) : resting ? (
            <div className="text-center px-8">
              <p className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: '#5A6478' }}>REPOS</p>
              <div className="relative mb-6">
                <svg width={130} height={130} viewBox="0 0 130 130">
                  <circle cx={65} cy={65} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={8}/>
                  <circle
                    cx={65} cy={65} r={r}
                    fill="none" stroke="#E63946" strokeWidth={8}
                    strokeDasharray={`${dash} ${circ}`}
                    strokeLinecap="round"
                    transform="rotate(-90 65 65)"
                    style={{ transition: 'stroke-dasharray 0.9s linear' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-black text-[#EDE8E0]">
                  {seconds}
                </span>
              </div>
              <p className="text-[#5A6478] text-sm mb-6">Série {set} terminée — repos en cours</p>
              <button onClick={skipRest}
                className="px-6 py-2.5 rounded-xl text-sm font-bold"
                style={{ border: '1px solid rgba(230,57,70,0.3)', color: '#E63946' }}>
                Passer le repos →
              </button>
            </div>
          ) : (
            <div className="text-center px-8 w-full max-w-sm">
              {/* Série progress */}
              <div className="flex justify-center gap-2 mb-8">
                {Array.from({ length: totalSeries }).map((_, i) => (
                  <div key={i} className="h-2 flex-1 rounded-full"
                    style={{ background: i < set - 1 ? '#16a34a' : i === set - 1 ? '#E63946' : 'rgba(255,255,255,0.08)' }}/>
                ))}
              </div>

              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#5A6478' }}>
                SÉRIE {set} / {totalSeries}
              </p>
              <h1 className="text-2xl font-black text-[#EDE8E0] mb-8 leading-tight">{nom}</h1>

              <div className="space-y-3 mb-6 text-left bg-[#0C0C1A] rounded-2xl p-4"
                style={{ border: '1px solid rgba(230,57,70,0.1)' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#5A6478' }}>Répétitions recommandées</span>
                  <span className="font-bold text-[#EDE8E0]">8–12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#5A6478' }}>Repos après</span>
                  <span className="font-bold text-[#EDE8E0]">{tempsRepos}s</span>
                </div>
              </div>

              <button
                onClick={nextSet}
                className="w-full py-4 rounded-2xl text-base font-black transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#B91C1C,#E63946)', color: '#fff' }}>
                {set < totalSeries ? `✓ Série ${set} terminée →` : '✓ Dernière série terminée'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
