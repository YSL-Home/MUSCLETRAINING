'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Props { defaultSeconds: number }

export default function RestTimer({ defaultSeconds }: Props) {
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<AudioContext | null>(null)

  const beep = useCallback(() => {
    try {
      const ctx = new AudioContext()
      audioRef.current = ctx
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      gain.gain.setValueAtTime(0.4, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.6)
    } catch {}
  }, [])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current!)
          setRunning(false)
          setFinished(true)
          beep()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current!)
  }, [running, beep])

  const toggle = () => {
    if (finished) {
      setSeconds(defaultSeconds)
      setFinished(false)
      setRunning(true)
      return
    }
    setRunning(r => !r)
  }

  const reset = () => {
    clearInterval(intervalRef.current!)
    setRunning(false)
    setFinished(false)
    setSeconds(defaultSeconds)
  }

  const pct = seconds / defaultSeconds
  const r = 24
  const circ = 2 * Math.PI * r
  const dash = circ * pct

  const mm = Math.floor(seconds / 60)
  const ss = seconds % 60

  return (
    <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5">
      <h3 className="font-bold text-[#EDE8E0] mb-4 flex items-center gap-2">
        <span style={{ color: '#E63946' }}>⏱</span> Timer de repos
      </h3>
      <div className="flex items-center gap-5">
        {/* Cercle SVG */}
        <div className="relative flex-shrink-0">
          <svg width={64} height={64} viewBox="0 0 64 64">
            <circle cx={32} cy={32} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5}/>
            <circle
              cx={32} cy={32} r={r}
              fill="none"
              stroke={finished ? '#16a34a' : '#E63946'}
              strokeWidth={5}
              strokeDasharray={`${dash} ${circ}`}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
              style={{ transition: 'stroke-dasharray 0.9s linear' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-black"
            style={{ color: finished ? '#16a34a' : '#EDE8E0' }}>
            {finished ? '✓' : `${mm}:${ss.toString().padStart(2, '0')}`}
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <button
            onClick={toggle}
            className="w-full py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: finished ? '#16a34a' : '#E63946', color: '#fff' }}>
            {finished ? '↺ Recommencer' : running ? '⏸ Pause' : '▶ Démarrer'}
          </button>
          {(running || seconds !== defaultSeconds) && !finished && (
            <button onClick={reset}
              className="w-full py-1.5 rounded-xl text-xs font-semibold"
              style={{ color: '#5A6478', border: '1px solid rgba(255,255,255,0.08)' }}>
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
