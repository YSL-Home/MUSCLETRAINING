'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props { slug: string; nom: string }
interface PR { poids: number; reps: number; date: string }

const RED = '#E63946'
const STORAGE = 'mt-pr-manual'
const TRACKER_KEY = 'mt-tracker'

interface Serie { poids: number; reps: number }
interface ExerciceLog { slug: string; series: Serie[] }
interface WorkoutLog { exercices: ExerciceLog[] }

function loadManual(): Record<string, PR> {
  try { return JSON.parse(localStorage.getItem(STORAGE) ?? '{}') } catch { return {} }
}
function saveManual(map: Record<string, PR>) {
  localStorage.setItem(STORAGE, JSON.stringify(map))
}
function bestFromTracker(slug: string): PR | null {
  try {
    const logs: WorkoutLog[] = JSON.parse(localStorage.getItem(TRACKER_KEY) ?? '[]')
    const series = logs.flatMap(l => l.exercices.filter(e => e.slug === slug).flatMap(e => e.series))
    if (!series.length) return null
    const best = series.reduce((a, b) => (a.poids > b.poids || (a.poids === b.poids && a.reps > b.reps)) ? a : b)
    return { poids: best.poids, reps: best.reps, date: '' }
  } catch { return null }
}

export default function PRInput({ slug, nom }: Props) {
  const [pr, setPr] = useState<PR | null>(null)
  const [tracker, setTracker] = useState<PR | null>(null)
  const [poids, setPoids] = useState('')
  const [reps, setReps] = useState('')
  const [editing, setEditing] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)

  useEffect(() => {
    const map = loadManual()
    setPr(map[slug] ?? null)
    setTracker(bestFromTracker(slug))
  }, [slug])

  const best: PR | null = (() => {
    if (pr && tracker) {
      return pr.poids > tracker.poids || (pr.poids === tracker.poids && pr.reps >= tracker.reps) ? pr : tracker
    }
    return pr ?? tracker
  })()

  const save = () => {
    const p = parseFloat(poids), r = parseInt(reps)
    if (!p || !r) return
    const next: PR = { poids: p, reps: r, date: new Date().toISOString() }
    const map = loadManual()
    map[slug] = next
    saveManual(map)
    setPr(next)
    setEditing(false)
    setPoids(''); setReps('')
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
  }

  const reset = () => {
    const map = loadManual()
    delete map[slug]
    saveManual(map)
    setPr(null)
  }

  return (
    <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5">
      <h3 className="font-bold text-[#EDE8E0] mb-3 flex items-center gap-2">
        <span style={{ color: RED }}>🏆</span> Mon record (PR)
      </h3>

      {best ? (
        <div className="mb-3">
          <div className="text-3xl font-black" style={{ color: RED }}>
            {best.poids}<span className="text-base font-normal text-[#5A6478]"> kg</span>
          </div>
          <div className="text-xs text-[#8A9BB5] mt-0.5">{best.reps} reps {pr && best === pr ? '· saisi manuellement' : tracker && best === tracker ? '· depuis tracker' : ''}</div>
        </div>
      ) : (
        <p className="text-xs text-[#5A6478] mb-3">Aucun record. Ajoute ton meilleur effort.</p>
      )}

      {editing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={poids}
              onChange={e => setPoids(e.target.value)}
              placeholder="Poids"
              className="w-20 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(230,57,70,0.2)', color: '#EDE8E0' }}
            />
            <span className="text-xs text-[#5A6478]">kg ×</span>
            <input
              type="number"
              value={reps}
              onChange={e => setReps(e.target.value)}
              placeholder="Reps"
              className="w-16 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(230,57,70,0.2)', color: '#EDE8E0' }}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={!poids || !reps}
              className="flex-1 py-1.5 rounded-lg text-xs font-bold disabled:opacity-40"
              style={{ background: RED, color: '#fff' }}>
              ✓ Enregistrer
            </button>
            <button onClick={() => { setEditing(false); setPoids(''); setReps('') }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ color: '#5A6478', border: '1px solid rgba(255,255,255,0.08)' }}>
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setEditing(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: RED, color: '#fff' }}>
            {pr ? '✎ Modifier' : '+ Saisir PR'}
          </button>
          {pr && (
            <button onClick={reset}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ color: '#5A6478', border: '1px solid rgba(255,255,255,0.08)' }}>
              Réinitialiser
            </button>
          )}
          <Link href="/tracker"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ color: RED, border: `1px solid ${RED}40` }}>
            📊 Voir évolution
          </Link>
        </div>
      )}

      {savedFlash && (
        <p className="text-xs mt-2 font-semibold" style={{ color: '#16a34a' }}>✓ Record enregistré</p>
      )}
    </div>
  )
}
