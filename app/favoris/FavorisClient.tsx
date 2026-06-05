'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ExerciseCard from '@/components/ExerciseCard'
import { EXERCISES } from '@/data/exercises'
import { PROGRAMMES } from '@/data/programmes'

const NIVEAU: Record<string, { label: string; color: string }> = {
  debutant:      { label: 'Débutant',      color: '#4ADE80' },
  intermediaire: { label: 'Intermédiaire', color: '#FBBF24' },
  avance:        { label: 'Avancé',        color: '#F87171' },
}
const OBJECTIF: Record<string, string> = {
  force: 'Force',
  hypertrophie: 'Hypertrophie',
  'perte-poids': 'Perte de poids',
  endurance: 'Endurance',
}

export default function FavorisClient() {
  const [exerciceSlugs, setExerciceSlugs] = useState<string[]>([])
  const [programmeSlugs, setProgrammeSlugs] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const favExos: string[] = JSON.parse(localStorage.getItem('favoris') ?? '[]')
    const favProgs: string[] = JSON.parse(localStorage.getItem('favoris-programmes') ?? '[]')
    setExerciceSlugs(favExos)
    setProgrammeSlugs(favProgs)
    setHydrated(true)
  }, [])

  const exercicesFavoris = EXERCISES.filter(e => exerciceSlugs.includes(e.slug))
  const programmesFavoris = PROGRAMMES.filter(p => programmeSlugs.includes(p.slug))

  const isEmpty = exercicesFavoris.length === 0 && programmesFavoris.length === 0

  const handleSupprimerTout = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }
    localStorage.removeItem('favoris')
    localStorage.removeItem('favoris-programmes')
    setExerciceSlugs([])
    setProgrammeSlugs([])
    setShowConfirm(false)
  }

  if (!hydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent mx-auto animate-spin"
          style={{ borderColor: '#E63946', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-black mb-2 red-text">Mes Favoris</h1>
          <p className="text-sm" style={{ color: '#5A6478' }}>
            Vos exercices et programmes sauvegardés pour y accéder rapidement.
          </p>
        </div>

        {!isEmpty && (
          <div className="flex items-center gap-3">
            {showConfirm && (
              <span className="text-xs" style={{ color: '#F87171' }}>
                Confirmer la suppression&nbsp;?
              </span>
            )}
            <button
              onClick={handleSupprimerTout}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: showConfirm ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.04)',
                color: showConfirm ? '#F87171' : '#5A6478',
                border: `1px solid ${showConfirm ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {showConfirm ? 'Oui, supprimer tout' : 'Supprimer tout'}
            </button>
            {showConfirm && (
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: '#5A6478',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                Annuler
              </button>
            )}
          </div>
        )}
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto mt-10">
          <div className="text-5xl mb-5">⭐</div>
          <h2 className="text-xl font-black mb-3" style={{ color: '#EDE8E0' }}>
            Aucun favori sauvegardé
          </h2>
          <p className="text-sm mb-8" style={{ color: '#5A6478' }}>
            Explorez nos exercices et programmes, puis cliquez sur le bouton&nbsp;
            <span style={{ color: '#E63946' }}>Sauvegarder</span> pour les retrouver ici.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/generateur"
              className="btn-red px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              Créer mon programme
            </Link>
            <Link
              href="/muscles/pectoraux"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: 'rgba(230,57,70,0.08)',
                color: '#E63946',
                border: '1px solid rgba(230,57,70,0.2)',
              }}
            >
              Exercices pectoraux
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Exercices favoris */}
          {exercicesFavoris.length > 0 && (
            <section className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-black" style={{ color: '#EDE8E0' }}>
                  Exercices
                </h2>
                <span className="badge-red px-2.5 py-1 rounded-full">
                  {exercicesFavoris.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {exercicesFavoris.map(ex => (
                  <ExerciseCard key={ex.slug} exercise={ex} />
                ))}
              </div>
            </section>
          )}

          {/* Programmes favoris */}
          {programmesFavoris.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-black" style={{ color: '#EDE8E0' }}>
                  Programmes
                </h2>
                <span className="badge-red px-2.5 py-1 rounded-full">
                  {programmesFavoris.length}
                </span>
              </div>
              <div className="flex flex-col gap-3 max-w-2xl">
                {programmesFavoris.map(prog => {
                  const niv = NIVEAU[prog.niveau]
                  return (
                    <Link
                      key={prog.slug}
                      href={`/programmes/${prog.mode}/${prog.slug}`}
                      className="glass-card rounded-xl p-4 flex items-center justify-between gap-4 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="badge-red px-2 py-0.5 rounded-full text-[10px]">
                            {prog.mode === 'salle' ? 'Salle' : 'Maison'}
                          </span>
                          <span className="text-[10px] font-bold" style={{ color: niv.color }}>
                            {niv.label}
                          </span>
                          <span className="text-[10px]" style={{ color: '#3A4152' }}>
                            · {OBJECTIF[prog.objectif]}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm truncate" style={{ color: '#EDE8E0' }}>
                          {prog.nom}
                        </h3>
                        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#5A6478' }}>
                          {prog.joursParSemaine} jours/sem · {prog.tempsParSeance} min · {prog.dureeWeeks} semaines
                        </p>
                      </div>
                      <span
                        className="text-xs font-bold tracking-widest uppercase shrink-0 transition-colors"
                        style={{ color: '#E63946' }}
                      >
                        Voir →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
