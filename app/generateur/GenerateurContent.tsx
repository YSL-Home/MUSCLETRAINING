'use client'

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import ExerciseGif from '@/components/ExerciseGif'
import { EXERCISES } from '@/data/exercises'
import type { Materiel } from '@/data/exercises'

// ── Equipment cards ─────────────────────────────────────────────────────────
const EQUIPMENT: { id: Materiel; label: string; svg: React.ReactElement }[] = [
  {
    id: 'poids-corps',
    label: 'Poids du corps',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="32" cy="14" r="7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12v10H20V32z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 42v10M40 42v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 36h-6M44 36h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'halteres',
    label: 'Haltères',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="4" y="26" width="10" height="12" rx="3" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="50" y="26" width="10" height="12" rx="3" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="14" y="22" width="8" height="20" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="42" y="22" width="8" height="20" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="22" y1="32" x2="42" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'barre',
    label: 'Barre',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="1" y="28" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="9" y="24" width="6" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="49" y="28" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="49" y="24" width="6" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="15" y1="32" x2="49" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'kettlebell',
    label: 'Kettlebell',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="32" cy="38" r="18" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M22 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M26 20h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'elastique',
    label: 'Élastique',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M10 32C10 20 20 12 32 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M54 32C54 20 44 12 32 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M10 32C10 44 20 52 32 52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M54 32C54 44 44 52 32 52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="10" cy="32" r="4" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="54" cy="32" r="4" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: 'banc',
    label: 'Banc',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="8" y="26" width="48" height="10" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M14 36v12M50 36v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M10 48h8M46 48h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'barre-de-traction',
    label: 'Barre de traction',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <line x1="4" y1="14" x2="60" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="8" y1="8" x2="8" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="56" y1="8" x2="56" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M26 14v8l-4 8M38 14v8l4 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="40" r="8" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="32" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 'poulie',
    label: 'Poulie / Câble',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="20" y="6" width="24" height="30" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="32" cy="21" r="8" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="32" cy="21" r="3" fill="currentColor" opacity="0.3"/>
        <path d="M32 36v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M24 46h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M28 46v8M36 46v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const MUSCLES_OPTIONS = [
  { id: 'pectoraux',        label: 'Pectoraux' },
  { id: 'dos',              label: 'Dos' },
  { id: 'epaules',          label: 'Épaules' },
  { id: 'biceps',           label: 'Biceps' },
  { id: 'triceps',          label: 'Triceps' },
  { id: 'abdominaux',       label: 'Abdos' },
  { id: 'quadriceps',       label: 'Quadriceps' },
  { id: 'fessiers',         label: 'Fessiers' },
  { id: 'ischio-jambiers',  label: 'Ischio' },
  { id: 'mollets',          label: 'Mollets' },
  { id: 'trapezes',         label: 'Trapèzes' },
  { id: 'lombaires',        label: 'Lombaires' },
]

const DIFFICULTY = [
  { id: 'debutant',      label: 'Débutant',       color: '#4ADE80' },
  { id: 'intermediaire', label: 'Intermédiaire',  color: '#FBBF24' },
  { id: 'avance',        label: 'Avancé',          color: '#F87171' },
]

const DIFF_CONFIG: Record<string, { sets: string; reps: string; time: number }> = {
  debutant:      { sets: '3', reps: '12–15', time: 10 },
  intermediaire: { sets: '4', reps: '8–12',  time: 13 },
  avance:        { sets: '5', reps: '5–8',   time: 16 },
}

const gold = '#E63946'
const goldBg = 'rgba(230,57,70,0.08)'
const goldBorder = 'rgba(230,57,70,0.25)'
const cardBase = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }

// ── Timer state type ─────────────────────────────────────────────────────────
interface TimerState {
  slug: string
  remaining: number
  total: number
  done: boolean
}

// ── Inner component (uses useSearchParams — must be inside Suspense) ─────────
function GenerateurInner() {
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)
  const [selectedEquip, setSelectedEquip] = useState<Materiel[]>([])
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
  const [difficulte, setDifficulte] = useState('debutant')
  const [nbExercices, setNbExercices] = useState(6)
  const [generated, setGenerated] = useState(false)
  const [seed, setSeed] = useState(0)

  // Feature 1 — share button state
  const [shareCopied, setShareCopied] = useState(false)

  // Feature 2 — timer state
  const [timerState, setTimerState] = useState<TimerState | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Read URL params on mount ─────────────────────────────────────────────
  useEffect(() => {
    const exsSlugs = searchParams.get('exs')
    const lvl = searchParams.get('lvl')
    if (!exsSlugs) return

    const slugList = exsSlugs.split(',').filter(Boolean)
    if (slugList.length === 0) return

    if (lvl && ['debutant', 'intermediaire', 'avance'].includes(lvl)) {
      setDifficulte(lvl)
    }
    setNbExercices(slugList.length)
    setGenerated(true)
    // We store slugs in seed by encoding them; use a custom override via a ref
    // Actually: set step=3 and mark as url-loaded so workout useMemo uses slugList
    setUrlSlugs(slugList)
    setStep(3)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Slugs loaded from URL (null = normal generation mode)
  const [urlSlugs, setUrlSlugs] = useState<string[] | null>(null)

  // ── Workout computation ──────────────────────────────────────────────────
  const workout = useMemo(() => {
    // URL-loaded mode: resolve exercises by slug in order
    if (urlSlugs !== null) {
      return urlSlugs
        .map(slug => EXERCISES.find(e => e.slug === slug))
        .filter((e): e is (typeof EXERCISES)[number] => e !== undefined)
    }

    if (!generated) return []
    let pool = EXERCISES.filter(e => {
      const diffOk = e.difficulte === difficulte
      const equipOk = selectedEquip.length === 0
        || e.materiel.some(m => selectedEquip.includes(m))
        || e.materiel.includes('poids-corps')
      const muscleOk = selectedMuscles.length === 0
        || e.musclesPrimaires.some(m => selectedMuscles.includes(m))
      return diffOk && equipOk && muscleOk
    })
    pool = [...pool].sort((a, b) => ((a.slug.charCodeAt(0) + seed) % 31) - ((b.slug.charCodeAt(0) + seed) % 31))
    return pool.slice(0, nbExercices)
  }, [generated, selectedEquip, selectedMuscles, difficulte, nbExercices, seed, urlSlugs])

  const toggleEquip = (id: Materiel) =>
    setSelectedEquip(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])

  const toggleMuscle = (id: string) =>
    setSelectedMuscles(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id])

  const generate = () => {
    setUrlSlugs(null)
    setSeed(s => s + 1)
    setGenerated(true)
    setStep(3)
  }
  const shuffle = () => {
    setUrlSlugs(null)
    setSeed(s => s + 7)
    setGenerated(true)
  }
  const reset = () => {
    setUrlSlugs(null)
    setStep(1)
    setGenerated(false)
    setSelectedEquip([])
    setSelectedMuscles([])
    clearActiveTimer()
  }

  const cfg = DIFF_CONFIG[difficulte]

  // ── Feature 1: Share URL ─────────────────────────────────────────────────
  const handleShare = () => {
    const slugs = workout.map(e => e.slug).join(',')
    const url = `${window.location.origin}${window.location.pathname}?exs=${slugs}&lvl=${difficulte}`
    // Update the browser URL without navigation
    window.history.replaceState(null, '', url)
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    })
  }

  // ── Feature 2: Rest timer ────────────────────────────────────────────────
  const clearActiveTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const startTimer = (slug: string, total: number) => {
    clearActiveTimer()

    // If clicking the same exercise while timer is running, just cancel
    if (timerState?.slug === slug && !timerState.done) {
      setTimerState(null)
      return
    }

    setTimerState({ slug, remaining: total, total, done: false })

    timerRef.current = setInterval(() => {
      setTimerState(prev => {
        if (!prev) return null
        const next = prev.remaining - 1
        if (next <= 0) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          return { ...prev, remaining: 0, done: true }
        }
        return { ...prev, remaining: next }
      })
    }, 1000)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => clearActiveTimer()
  }, [])

  return (
    <div style={{ background: '#07070F', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[{ nom: 'Accueil', url: '/' }, { nom: 'Générateur de séance' }]} />

        {/* Header */}
        <div className="mt-6 mb-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: gold }}>Outil</p>
          <h1 className="text-3xl font-black mb-2" style={{ color: '#EDE8E0' }}>
            Générateur de <span style={{ color: gold }}>séance</span>
          </h1>
          <p className="text-sm" style={{ color: '#3A4152' }}>
            Créez une séance sur-mesure en 3 étapes selon votre équipement et vos objectifs.
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => { if (s < step || (s === 2 && step >= 2)) setStep(s) }}
                className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all"
                style={{ color: step >= s ? gold : '#2a2440' }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{
                    background: step > s ? gold : step === s ? goldBg : 'transparent',
                    border: `1px solid ${step >= s ? gold : '#2a2440'}`,
                    color: step > s ? '#07070F' : step === s ? gold : '#2a2440',
                  }}
                >
                  {step > s ? '✓' : s}
                </span>
                <span className="hidden sm:inline">
                  {s === 1 ? 'Équipement' : s === 2 ? 'Muscles & Niveau' : 'Résultats'}
                </span>
              </button>
              {s < 3 && <div className="flex-1 h-px" style={{ background: step > s ? gold : '#1e1830', minWidth: '24px' }}/>}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Equipment ────────────────────────────────────────── */}
        {step === 1 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black" style={{ color: '#EDE8E0' }}>Votre équipement disponible</h2>
              {selectedEquip.length > 0 && (
                <button onClick={() => setSelectedEquip([])} className="text-xs" style={{ color: '#3A4152' }}>
                  Tout décocher
                </button>
              )}
            </div>
            <p className="text-xs mb-5" style={{ color: '#3A4152' }}>
              Sélectionnez ce que vous avez — laissez vide pour tout afficher.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {EQUIPMENT.map(eq => {
                const on = selectedEquip.includes(eq.id)
                return (
                  <button
                    key={eq.id}
                    onClick={() => toggleEquip(eq.id)}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: on ? goldBg : cardBase.background,
                      border: `1px solid ${on ? goldBorder : 'rgba(255,255,255,0.06)'}`,
                      color: on ? gold : '#5A6478',
                    }}
                  >
                    <div style={{ color: on ? gold : '#3A4152', transition: 'color 0.2s' }}>
                      {eq.svg}
                    </div>
                    <span className="text-xs font-semibold text-center leading-tight" style={{ color: on ? gold : '#5A6478' }}>
                      {eq.label}
                    </span>
                    {on && (
                      <span className="text-[9px] font-black tracking-wider uppercase" style={{ color: gold }}>✓ Sélectionné</span>
                    )}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl font-black text-base transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${gold}, #B91C1C)`, color: '#07070F' }}
            >
              Continuer →
            </button>
          </div>
        )}

        {/* ── STEP 2: Muscles + Level ──────────────────────────────────── */}
        {step === 2 && (
          <div>
            {/* Muscles */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black" style={{ color: '#EDE8E0' }}>Muscles ciblés</h2>
                <span className="text-xs" style={{ color: '#3A4152' }}>Optionnel</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {MUSCLES_OPTIONS.map(m => {
                  const on = selectedMuscles.includes(m.id)
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggleMuscle(m.id)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: on ? goldBg : cardBase.background,
                        border: `1px solid ${on ? goldBorder : 'rgba(255,255,255,0.06)'}`,
                        color: on ? gold : '#5A6478',
                      }}
                    >
                      {m.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-7">
              <h3 className="text-sm font-black mb-3" style={{ color: '#EDE8E0' }}>Niveau</h3>
              <div className="flex gap-3">
                {DIFFICULTY.map(d => {
                  const on = difficulte === d.id
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDifficulte(d.id)}
                      className="flex-1 py-3 rounded-xl text-xs font-black transition-all"
                      style={{
                        background: on ? d.color + '15' : cardBase.background,
                        border: `1px solid ${on ? d.color : 'rgba(255,255,255,0.06)'}`,
                        color: on ? d.color : '#5A6478',
                      }}
                    >
                      {d.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Number of exercises */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black" style={{ color: '#EDE8E0' }}>Nombre d'exercices</h3>
                <span className="text-xl font-black" style={{ color: gold }}>{nbExercices}</span>
              </div>
              <input
                type="range" min={3} max={10} value={nbExercices}
                onChange={e => setNbExercices(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: gold }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: '#2a2440' }}>
                <span>3 min</span><span>10 max</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-4 rounded-2xl text-xs font-bold"
                style={{ background: cardBase.background, border: '1px solid rgba(255,255,255,0.06)', color: '#5A6478' }}
              >
                ← Retour
              </button>
              <button
                onClick={generate}
                className="flex-1 py-4 rounded-2xl font-black text-base transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${gold}, #B91C1C)`, color: '#07070F' }}
              >
                ⚡ Générer ma séance
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Results ──────────────────────────────────────────── */}
        {step === 3 && (
          <div>
            {/* Summary chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedEquip.length > 0
                ? selectedEquip.map(e => (
                  <span key={e} className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase"
                    style={{ background: goldBg, border: `1px solid ${goldBorder}`, color: gold }}>
                    {EQUIPMENT.find(x => x.id === e)?.label ?? e}
                  </span>
                ))
                : <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: goldBg, border: `1px solid ${goldBorder}`, color: gold }}>Tout équipement</span>
              }
              {selectedMuscles.length > 0 && selectedMuscles.map(m => (
                <span key={m} className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A6478' }}>
                  {MUSCLES_OPTIONS.find(x => x.id === m)?.label ?? m}
                </span>
              ))}
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A6478' }}>
                {DIFFICULTY.find(d => d.id === difficulte)?.label}
              </span>
            </div>

            {workout.length > 0 ? (
              <>
                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { n: workout.length, lbl: 'exercices' },
                    { n: `${cfg.sets} × ${cfg.reps}`, lbl: 'séries × reps' },
                    { n: `~${workout.length * cfg.time} min`, lbl: 'durée estimée' },
                  ].map(s => (
                    <div key={s.lbl} className="rounded-2xl py-3 text-center" style={{ background: goldBg, border: `1px solid ${goldBorder}` }}>
                      <div className="text-xl font-black" style={{ color: gold }}>{s.n}</div>
                      <div className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: '#3A4152' }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Exercise list */}
                <div className="space-y-2.5 mb-6">
                  {workout.map((ex, i) => {
                    const timer = timerState?.slug === ex.slug ? timerState : null
                    const progressPct = timer
                      ? Math.max(0, (timer.remaining / timer.total) * 100)
                      : 100

                    return (
                      <div key={ex.slug}
                        className="rounded-2xl overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        {/* GIF preview */}
                        <div className="relative">
                          <ExerciseGif slug={ex.slug} className="rounded-none" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"/>
                          <span className="absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs"
                            style={{ background: gold, color: '#07070F' }}>
                            {i + 1}
                          </span>
                        </div>
                        {/* Exercise row */}
                        <Link href={`/exercice/${ex.slug}`}
                          className="flex items-center gap-3 px-4 py-3 group transition-all hover:opacity-80 block"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate transition-colors" style={{ color: '#EDE8E0' }}>
                              {ex.nom}
                            </p>
                            <p className="text-[11px] mt-0.5" style={{ color: '#3A4152' }}>
                              {cfg.sets} séries · {cfg.reps} reps · {ex.tempsRepos}s repos
                            </p>
                          </div>
                          <svg className="w-4 h-4 flex-shrink-0 transition-colors" style={{ color: '#2a2440' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                          </svg>
                        </Link>

                        {/* Timer section */}
                        <div className="px-4 pb-3">
                          {timer ? (
                            <div className="rounded-xl p-3" style={{ background: 'rgba(230,57,70,0.1)' }}>
                              {timer.done ? (
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black" style={{ color: gold }}>✓ C'est parti !</span>
                                  <button
                                    onClick={() => setTimerState(null)}
                                    className="text-[10px]"
                                    style={{ color: '#5A6478' }}
                                  >
                                    Fermer
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold" style={{ color: '#3A4152' }}>Repos en cours</span>
                                    <span className="text-base font-black" style={{ color: gold }}>{timer.remaining}s</span>
                                  </div>
                                  {/* Progress bar */}
                                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(230,57,70,0.2)' }}>
                                    <div
                                      className="h-full rounded-full transition-all duration-1000"
                                      style={{ width: `${progressPct}%`, background: '#E63946' }}
                                    />
                                  </div>
                                  <button
                                    onClick={() => { clearActiveTimer(); setTimerState(null) }}
                                    className="mt-2 text-[10px]"
                                    style={{ color: '#5A6478' }}
                                  >
                                    Annuler
                                  </button>
                                </>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => startTimer(ex.slug, ex.tempsRepos)}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                              style={{ background: 'rgba(230,57,70,0.1)', color: gold, border: `1px solid ${goldBorder}` }}
                            >
                              ⏱ Démarrer repos ({ex.tempsRepos}s)
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Action row */}
                <div className="flex gap-3 flex-wrap">
                  <button onClick={reset}
                    className="px-5 py-3 rounded-xl text-xs font-bold"
                    style={{ background: cardBase.background, border: '1px solid rgba(255,255,255,0.06)', color: '#5A6478' }}>
                    ← Recommencer
                  </button>
                  <button onClick={() => setStep(2)}
                    className="px-5 py-3 rounded-xl text-xs font-bold"
                    style={{ background: cardBase.background, border: '1px solid rgba(255,255,255,0.06)', color: '#5A6478' }}>
                    ✏️ Modifier
                  </button>
                  {/* Feature 1: Share button */}
                  <button
                    onClick={handleShare}
                    className="px-5 py-3 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: shareCopied ? 'rgba(74,222,128,0.1)' : cardBase.background,
                      border: `1px solid ${shareCopied ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      color: shareCopied ? '#4ADE80' : '#5A6478',
                    }}
                  >
                    {shareCopied ? '✓ Lien copié !' : '🔗 Partager la séance'}
                  </button>
                  <button onClick={shuffle}
                    className="flex-1 py-3 rounded-xl font-black text-sm transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${gold}, #B91C1C)`, color: '#07070F' }}>
                    🔀 Autre séance
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16 rounded-2xl" style={{ background: cardBase.background, border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-3xl mb-3">😅</p>
                <p className="font-black mb-1" style={{ color: '#EDE8E0' }}>Aucun exercice trouvé</p>
                <p className="text-sm mb-4" style={{ color: '#3A4152' }}>Essayez de changer le niveau ou l'équipement</p>
                <button onClick={() => setStep(2)} className="px-5 py-2 rounded-xl text-xs font-bold" style={{ border: `1px solid ${goldBorder}`, color: gold }}>
                  ← Modifier les filtres
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page export: wraps inner component in Suspense (required for useSearchParams in SSG) ──
export default function GenerateurPage() {
  return (
    <Suspense fallback={null}>
      <GenerateurInner />
    </Suspense>
  )
}
