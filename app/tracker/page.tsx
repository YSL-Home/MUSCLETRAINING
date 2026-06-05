'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { EXERCISES } from '@/data/exercises'

interface Serie { poids: number; reps: number }
interface ExerciceLog { slug: string; nom: string; series: Serie[] }
interface WorkoutLog {
  id: string
  date: string
  exercices: ExerciceLog[]
  duree: number
  notes: string
}

const STORAGE_KEY = 'mt-tracker'
const PR_MANUAL_KEY = 'mt-pr-manual'
const RED = '#E63946'

interface ManualPR { poids: number; reps: number; date: string }
function loadManualPRs(): Record<string, ManualPR> {
  try { return JSON.parse(localStorage.getItem(PR_MANUAL_KEY) ?? '{}') } catch { return {} }
}
const CARD = { background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)', borderRadius: '1rem', padding: '1.25rem' }

function loadLogs(): WorkoutLog[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') } catch { return [] }
}
function saveLogs(logs: WorkoutLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
}

export default function TrackerPage() {
  const [tab, setTab] = useState<'new' | 'history' | 'prs' | 'evolution'>('new')
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [manualPRs, setManualPRs] = useState<Record<string, ManualPR>>({})
  const [current, setCurrent] = useState<ExerciceLog[]>([])
  const [duree, setDuree] = useState(45)
  const [notes, setNotes] = useState('')
  const [exSlug, setExSlug] = useState('')
  const [evoSlug, setEvoSlug] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => { setLogs(loadLogs()); setManualPRs(loadManualPRs()) }, [])

  const addExercice = () => {
    const ex = EXERCISES.find(e => e.slug === exSlug)
    if (!ex) return
    setCurrent(prev => [...prev, { slug: ex.slug, nom: ex.nom, series: [{ poids: 0, reps: 10 }] }])
    setExSlug('')
  }

  const addSerie = (i: number) => {
    setCurrent(prev => prev.map((e, idx) => idx === i ? { ...e, series: [...e.series, { poids: 0, reps: 10 }] } : e))
  }

  const updateSerie = (exIdx: number, sIdx: number, field: 'poids' | 'reps', val: number) => {
    setCurrent(prev => prev.map((e, i) => i !== exIdx ? e : {
      ...e, series: e.series.map((s, j) => j !== sIdx ? s : { ...s, [field]: val })
    }))
  }

  const removeExercice = (i: number) => setCurrent(prev => prev.filter((_, idx) => idx !== i))

  const saveWorkout = () => {
    if (current.length === 0) return
    const log: WorkoutLog = { id: Date.now().toString(), date: new Date().toISOString(), exercices: current, duree, notes }
    const updated = [log, ...logs]
    saveLogs(updated)
    setLogs(updated)
    setCurrent([])
    setNotes('')
    setSaved(true)
    setTimeout(() => { setSaved(false); setTab('history') }, 1500)
  }

  const deleteLog = (id: string) => {
    const updated = logs.filter(l => l.id !== id)
    saveLogs(updated)
    setLogs(updated)
  }

  const exportCSV = () => {
    if (!logs.length) return
    const rows = [['Date', 'Exercice', 'Serie', 'Poids (kg)', 'Reps', 'Duree (min)', 'Notes']]
    logs.forEach(l => {
      const d = new Date(l.date).toLocaleDateString('fr-FR')
      l.exercices.forEach(ex => {
        ex.series.forEach((s, i) => {
          rows.push([d, ex.nom, String(i + 1), String(s.poids), String(s.reps), String(l.duree), (l.notes || '').replace(/[\n"]/g, ' ')])
        })
      })
    })
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `muscletraining-tracker-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Compute PRs (sessions + manual overrides — keep the heavier one)
  const prs = EXERCISES.map(ex => {
    const allSeries = logs.flatMap(l => l.exercices.filter(e => e.slug === ex.slug).flatMap(e => e.series))
    const fromLogs = allSeries.length
      ? allSeries.reduce((a, b) => (a.poids > b.poids || (a.poids === b.poids && a.reps > b.reps)) ? a : b)
      : null
    const manual = manualPRs[ex.slug] ?? null
    let best: { poids: number; reps: number } | null = null
    if (fromLogs && manual) {
      best = (manual.poids > fromLogs.poids || (manual.poids === fromLogs.poids && manual.reps > fromLogs.reps)) ? manual : fromLogs
    } else {
      best = fromLogs ?? manual
    }
    if (!best) return null
    return { slug: ex.slug, nom: ex.nom, poids: best.poids, reps: best.reps }
  }).filter(Boolean).sort((a, b) => b!.poids - a!.poids) as { slug: string; nom: string; poids: number; reps: number }[]

  // Evolution: per-exercise list of {date, maxPoids}
  const evoExercices = Array.from(new Set(logs.flatMap(l => l.exercices.map(e => e.slug))))
    .map(s => ({ slug: s, nom: EXERCISES.find(e => e.slug === s)?.nom ?? s }))
    .sort((a, b) => a.nom.localeCompare(b.nom))
  const evoData = evoSlug
    ? logs
        .map(l => {
          const series = l.exercices.filter(e => e.slug === evoSlug).flatMap(e => e.series)
          if (!series.length) return null
          return { date: l.date, maxPoids: Math.max(...series.map(s => s.poids)), maxReps: Math.max(...series.map(s => s.reps)) }
        })
        .filter(Boolean)
        .sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime()) as { date: string; maxPoids: number; maxReps: number }[]
    : []

  // Stats
  const totalSeances = logs.length
  const totalSets = logs.reduce((a, l) => a + l.exercices.reduce((b, e) => b + e.series.length, 0), 0)
  const favEx = logs.flatMap(l => l.exercices.map(e => e.slug))
    .reduce((acc: Record<string, number>, s) => { acc[s] = (acc[s] || 0) + 1; return acc }, {})
  const favSlug = Object.entries(favEx).sort((a, b) => b[1] - a[1])[0]?.[0]
  const favNom = EXERCISES.find(e => e.slug === favSlug)?.nom ?? '—'

  const tabStyle = (t: string) => ({
    padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
    background: tab === t ? RED : 'transparent',
    color: tab === t ? '#fff' : '#5A6478',
    border: tab === t ? 'none' : '1px solid rgba(230,57,70,0.2)',
    transition: 'all 0.2s',
  })

  return (
    <div style={{ background: '#07070F', minHeight: '100vh' }} className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: RED }}>Suivi</p>
        <h1 className="text-3xl font-black mb-1" style={{ color: '#EDE8E0' }}>Mon Tracker</h1>
        <p className="text-sm" style={{ color: '#5A6478' }}>Enregistre tes séances, suis tes progrès, bats tes records.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { val: totalSeances, label: 'Séances' },
          { val: totalSets, label: 'Séries totales' },
          { val: prs.length, label: 'Records' },
        ].map(s => (
          <div key={s.label} className="rounded-xl py-3 text-center" style={CARD}>
            <div className="text-2xl font-black" style={{ color: RED }}>{s.val}</div>
            <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: '#3A4152' }}>{s.label}</div>
          </div>
        ))}
      </div>
      {favSlug && (
        <div className="mb-6 px-4 py-2 rounded-xl flex items-center gap-2 text-xs" style={{ background: 'rgba(230,57,70,0.06)', border: '1px solid rgba(230,57,70,0.12)' }}>
          <span style={{ color: RED }}>🏆</span>
          <span style={{ color: '#8A9BB5' }}>Exercice favori :</span>
          <span className="font-bold" style={{ color: '#EDE8E0' }}>{favNom}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([['new', '+ Nouvelle séance'], ['history', '📋 Historique'], ['prs', '🏆 Records'], ['evolution', '📈 Évolution']] as const).map(([t, l]) => (
          <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>{l}</button>
        ))}
      </div>

      {/* === TAB: NEW === */}
      {tab === 'new' && (
        <div className="space-y-4">
          {/* Add exercise */}
          <div className="rounded-2xl p-4" style={CARD}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: RED }}>Ajouter un exercice</p>
            <div className="flex gap-2">
              <select value={exSlug} onChange={e => setExSlug(e.target.value)}
                className="flex-1 rounded-xl px-3 py-2 text-sm focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(230,57,70,0.2)', color: '#EDE8E0' }}>
                <option value="">Choisir un exercice...</option>
                {EXERCISES.map(ex => <option key={ex.slug} value={ex.slug}>{ex.nom}</option>)}
              </select>
              <button onClick={addExercice} disabled={!exSlug}
                className="px-4 py-2 rounded-xl font-bold text-sm transition-opacity disabled:opacity-40"
                style={{ background: RED, color: '#fff' }}>
                + Ajouter
              </button>
            </div>
          </div>

          {/* Exercise list */}
          {current.map((ex, i) => (
            <div key={i} className="rounded-2xl p-4" style={CARD}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-black text-sm" style={{ color: '#EDE8E0' }}>{ex.nom}</p>
                <button onClick={() => removeExercice(i)} className="text-xs" style={{ color: '#5A6478' }}>✕ Retirer</button>
              </div>
              <div className="space-y-2">
                {ex.series.map((s, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <span className="text-[11px] w-12 flex-shrink-0 font-semibold" style={{ color: '#3A4152' }}>Série {j + 1}</span>
                    <div className="flex items-center gap-1">
                      <input type="number" value={s.poids} onChange={e => updateSerie(i, j, 'poids', +e.target.value)}
                        className="w-16 rounded-lg px-2 py-1 text-sm text-center focus:outline-none"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(230,57,70,0.15)', color: '#EDE8E0' }} />
                      <span className="text-[11px]" style={{ color: '#3A4152' }}>kg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <input type="number" value={s.reps} onChange={e => updateSerie(i, j, 'reps', +e.target.value)}
                        className="w-14 rounded-lg px-2 py-1 text-sm text-center focus:outline-none"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(230,57,70,0.15)', color: '#EDE8E0' }} />
                      <span className="text-[11px]" style={{ color: '#3A4152' }}>reps</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => addSerie(i)} className="mt-3 text-xs font-semibold"
                style={{ color: RED }}>+ Ajouter une série</button>
            </div>
          ))}

          {/* Durée + Notes */}
          {current.length > 0 && (
            <div className="rounded-2xl p-4 space-y-3" style={CARD}>
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold" style={{ color: '#8A9BB5' }}>Durée :</label>
                <input type="number" value={duree} onChange={e => setDuree(+e.target.value)}
                  className="w-20 rounded-lg px-2 py-1 text-sm focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(230,57,70,0.15)', color: '#EDE8E0' }} />
                <span className="text-xs" style={{ color: '#3A4152' }}>minutes</span>
              </div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes (optionnel)..."
                className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(230,57,70,0.12)', color: '#EDE8E0' }}
                rows={2} />
            </div>
          )}

          <button onClick={saveWorkout} disabled={current.length === 0}
            className="w-full py-3 rounded-2xl font-black text-sm transition-all disabled:opacity-40"
            style={{ background: saved ? '#16a34a' : RED, color: '#fff' }}>
            {saved ? '✓ Séance sauvegardée !' : '💾 Sauvegarder la séance'}
          </button>
        </div>
      )}

      {/* === TAB: HISTORY === */}
      {tab === 'history' && (
        <div className="space-y-4">
          {logs.length > 0 && (
            <div className="flex justify-end">
              <button onClick={exportCSV}
                className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
                style={{ background: 'rgba(230,57,70,0.08)', color: RED, border: '1px solid rgba(230,57,70,0.25)' }}>
                ⬇ Exporter CSV
              </button>
            </div>
          )}
          {logs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📋</p>
              <p className="font-bold mb-2" style={{ color: '#EDE8E0' }}>Aucune séance enregistrée</p>
              <p className="text-sm mb-6" style={{ color: '#5A6478' }}>Commence par créer ta première séance</p>
              <button onClick={() => setTab('new')} className="px-5 py-2.5 rounded-xl font-bold text-sm"
                style={{ background: RED, color: '#fff' }}>+ Nouvelle séance</button>
            </div>
          ) : logs.map(log => (
            <div key={log.id} className="rounded-2xl p-4" style={CARD}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-black text-sm" style={{ color: '#EDE8E0' }}>
                    {new Date(log.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#3A4152' }}>
                    {log.duree} min · {log.exercices.length} exercices · {log.exercices.reduce((a, e) => a + e.series.length, 0)} séries
                  </p>
                </div>
                <button onClick={() => deleteLog(log.id)} className="text-xs px-2 py-1 rounded-lg transition-colors"
                  style={{ color: '#5A6478', border: '1px solid rgba(255,255,255,0.06)' }}>🗑</button>
              </div>
              <div className="space-y-1">
                {log.exercices.map(ex => (
                  <div key={ex.slug} className="flex items-center justify-between text-xs">
                    <span style={{ color: '#8A9BB5' }}>{ex.nom}</span>
                    <span style={{ color: '#3A4152' }}>
                      {ex.series.length} × {Math.max(...ex.series.map(s => s.reps))} reps · max {Math.max(...ex.series.map(s => s.poids))}kg
                    </span>
                  </div>
                ))}
              </div>
              {log.notes && <p className="mt-2 text-xs italic" style={{ color: '#5A6478' }}>"{log.notes}"</p>}
            </div>
          ))}
        </div>
      )}

      {/* === TAB: EVOLUTION === */}
      {tab === 'evolution' && (
        <div className="space-y-4">
          <div className="rounded-2xl p-4" style={CARD}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: RED }}>Choisir un exercice</p>
            <select value={evoSlug} onChange={e => setEvoSlug(e.target.value)}
              className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(230,57,70,0.2)', color: '#EDE8E0' }}>
              <option value="">— Sélectionner —</option>
              {evoExercices.map(e => <option key={e.slug} value={e.slug}>{e.nom}</option>)}
            </select>
          </div>

          {evoSlug && evoData.length === 0 && (
            <div className="text-center py-12" style={{ color: '#5A6478' }}>
              <p className="text-3xl mb-2">📈</p>
              <p className="text-sm">Aucune donnée pour cet exercice</p>
            </div>
          )}

          {evoSlug && evoData.length > 0 && (() => {
            const maxP = Math.max(...evoData.map(d => d.maxPoids), 1)
            const first = evoData[0].maxPoids
            const last = evoData[evoData.length - 1].maxPoids
            const progress = first > 0 ? ((last - first) / first) * 100 : 0
            return (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: `${first}kg`, label: 'Départ' },
                    { val: `${last}kg`, label: 'Actuel' },
                    { val: `${progress >= 0 ? '+' : ''}${progress.toFixed(1)}%`, label: 'Progression' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl py-3 text-center" style={CARD}>
                      <div className="text-xl font-black" style={{ color: progress >= 0 || s.label !== 'Progression' ? RED : '#5A6478' }}>{s.val}</div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: '#3A4152' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="rounded-2xl p-4" style={CARD}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: RED }}>Évolution du poids max</p>
                  <div className="flex items-end gap-1.5 h-40 overflow-x-auto pb-2">
                    {evoData.map((d, i) => {
                      const h = Math.max(6, (d.maxPoids / maxP) * 140)
                      const date = new Date(d.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
                      return (
                        <div key={i} className="flex flex-col items-center gap-1 min-w-[28px]" title={`${date}: ${d.maxPoids}kg × ${d.maxReps}`}>
                          <div className="text-[9px] font-bold" style={{ color: '#EDE8E0' }}>{d.maxPoids}</div>
                          <div style={{ height: `${h}px`, width: '22px', background: `linear-gradient(180deg, ${RED} 0%, ${RED}80 100%)`, borderRadius: '4px 4px 0 0' }} />
                          <div className="text-[8px]" style={{ color: '#3A4152' }}>{date}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Detail list */}
                <div className="rounded-2xl p-4" style={CARD}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: RED }}>Détail des séances</p>
                  <div className="space-y-1.5">
                    {[...evoData].reverse().map((d, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span style={{ color: '#8A9BB5' }}>{new Date(d.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span style={{ color: '#EDE8E0' }} className="font-bold">{d.maxPoids}kg <span className="font-normal" style={{ color: '#5A6478' }}>× {d.maxReps}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )
          })()}

          {!evoSlug && (
            <p className="text-center text-xs py-6" style={{ color: '#5A6478' }}>
              Sélectionne un exercice pour voir l&apos;évolution de tes poids dans le temps.
            </p>
          )}
        </div>
      )}

      {/* === TAB: PRs === */}
      {tab === 'prs' && (
        <div>
          {prs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🏆</p>
              <p className="font-bold mb-2" style={{ color: '#EDE8E0' }}>Aucun record encore</p>
              <p className="text-sm mb-6" style={{ color: '#5A6478' }}>Enregistre des séances pour voir tes PRs</p>
              <button onClick={() => setTab('new')} className="px-5 py-2.5 rounded-xl font-bold text-sm"
                style={{ background: RED, color: '#fff' }}>+ Nouvelle séance</button>
            </div>
          ) : (
            <div className="space-y-2">
              {prs.slice(0, 3).length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[{ rank: '🥇', medal: '#FFD700' }, { rank: '🥈', medal: '#C0C0C0' }, { rank: '🥉', medal: '#CD7F32' }].map((m, i) => prs[i] && (
                    <div key={i} className="rounded-2xl p-4 text-center" style={{ ...CARD, borderColor: m.medal + '40' }}>
                      <div className="text-2xl mb-1">{m.rank}</div>
                      <p className="text-xs font-black mb-1" style={{ color: '#EDE8E0' }}>{prs[i].nom}</p>
                      <p className="text-xl font-black" style={{ color: RED }}>{prs[i].poids}kg</p>
                      <p className="text-[10px]" style={{ color: '#3A4152' }}>{prs[i].reps} reps</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                {prs.map((pr, i) => (
                  <div key={pr.slug} className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-xs font-bold text-center" style={{ color: '#3A4152' }}>#{i + 1}</span>
                      <Link href={`/exercice/${pr.slug}`} className="text-sm font-semibold hover:underline" style={{ color: '#EDE8E0' }}>
                        {pr.nom}
                      </Link>
                    </div>
                    <div className="text-sm font-black" style={{ color: RED }}>{pr.poids}kg <span className="text-xs font-normal" style={{ color: '#5A6478' }}>× {pr.reps}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
