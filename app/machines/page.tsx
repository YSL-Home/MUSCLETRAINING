'use client'

import { useState } from 'react'
import Link from 'next/link'
import MuscleIllustration from '@/components/MuscleIllustration'
import { MACHINES, searchMachine } from '@/data/machines'
import type { Machine } from '@/data/machines'
import type { MuscleId } from '@/data/muscles'

const MUSCLE_LABELS: Record<MuscleId, string> = {
  pectoraux: 'Pectoraux',
  dos: 'Dos',
  epaules: 'Épaules',
  biceps: 'Biceps',
  triceps: 'Triceps',
  'avant-bras': 'Avant-bras',
  abdominaux: 'Abdominaux',
  lombaires: 'Lombaires',
  quadriceps: 'Quadriceps',
  'ischio-jambiers': 'Ischio-jambiers',
  fessiers: 'Fessiers',
  mollets: 'Mollets',
  trapezes: 'Trapèzes',
}

const MUSCLE_COLORS: Record<MuscleId, string> = {
  pectoraux: '#ef4444', dos: '#3b82f6', epaules: '#8b5cf6',
  biceps: '#06b6d4', triceps: '#f59e0b', 'avant-bras': '#84cc16',
  abdominaux: '#b8d400', lombaires: '#a78bfa', quadriceps: '#10b981',
  'ischio-jambiers': '#0ea5e9', fessiers: '#ec4899', mollets: '#14b8a6',
  trapezes: '#64748b',
}

function MachineCard({ machine }: { machine: Machine }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-bold text-slate-900 text-lg">{machine.nom}</h2>
        <span className="text-xs text-slate-500 px-2 py-0.5 rounded-full bg-white border border-slate-200">
          {machine.exercicesMachine.length} exercice{machine.exercicesMachine.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="p-6">
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{machine.description}</p>

        {/* Illustration + Muscles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Illustration */}
          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Muscles ciblés</p>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center w-full">
              <MuscleIllustration
                primaires={machine.musclesPrimaires}
                secondaires={machine.musclesSecondaires}
                size={80}
              />
            </div>
          </div>

          {/* Muscles liste */}
          <div>
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Principaux</p>
              <div className="flex flex-wrap gap-1.5">
                {machine.musclesPrimaires.map(m => (
                  <Link key={m} href={`/muscles/${m}`}>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ background: MUSCLE_COLORS[m] + '20', color: MUSCLE_COLORS[m] }}>
                      {MUSCLE_LABELS[m]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {machine.musclesSecondaires.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Secondaires</p>
                <div className="flex flex-wrap gap-1.5">
                  {machine.musclesSecondaires.map(m => (
                    <Link key={m} href={`/muscles/${m}`}>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer hover:opacity-80 transition-opacity bg-slate-100 text-slate-600">
                        {MUSCLE_LABELS[m]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Exercices sur la machine */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Exercices à réaliser</p>
          <div className="space-y-3">
            {machine.exercicesMachine.map((ex, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="font-semibold text-slate-800 text-sm">{ex.nom}</p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-lime-100 text-lime-700 whitespace-nowrap flex-shrink-0">
                    {ex.seriesReps}
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed mb-1.5">{ex.description}</p>
                <p className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">
                  💡 {ex.conseils}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MachinesPage() {
  const [query, setQuery] = useState('')
  const results: Machine[] = query.length >= 2 ? searchMachine(query) : []
  const showAll = query.length < 2

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
          🏋️ Guide des machines de salle
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          Tapez le nom d&apos;une machine pour découvrir les muscles ciblés et les exercices à réaliser.
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Ex : "presse cuisses", "lat pulldown", "leg curl"…'
          className="w-full pl-12 pr-4 py-4 text-base rounded-2xl border-2 border-slate-200 focus:border-lime-300 focus:outline-none transition-colors bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Résultats de recherche */}
      {!showAll && (
        <div className="mb-8">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-slate-600">Aucune machine trouvée pour &quot;{query}&quot;</p>
              <p className="text-sm mt-1">Essayez &quot;presse&quot;, &quot;poulie&quot;, &quot;leg curl&quot;, &quot;smith machine&quot;…</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">
                {results.length} machine{results.length > 1 ? 's' : ''} trouvée{results.length > 1 ? 's' : ''} pour &quot;{query}&quot;
              </p>
              <div className="space-y-6">
                {results.map(m => <MachineCard key={m.slug} machine={m} />)}
              </div>
            </>
          )}
        </div>
      )}

      {/* Toutes les machines (quand pas de recherche) */}
      {showAll && (
        <>
          {/* Chips catégories rapides */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['presse', 'poulie', 'jambes', 'dos', 'épaules', 'cardio'].map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-lime-100 hover:text-lime-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {MACHINES.map(m => <MachineCard key={m.slug} machine={m} />)}
          </div>
        </>
      )}
    </div>
  )
}
