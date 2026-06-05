'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PROGRAMMES, type Programme } from '@/data/programmes'

/* ─── Types ──────────────────────────────────────────────── */
type Objectif  = 'Prise de masse' | 'Perte de poids' | 'Force' | 'Endurance'
type Niveau    = 'Débutant' | 'Intermédiaire' | 'Avancé'
type Lieu      = 'Salle de sport' | 'À la maison'
type Temps     = '< 30 min' | '30-60 min' | '> 60 min'
type Jours     = '2-3 jours' | '3-4 jours' | '5-6 jours'

interface Reponses {
  objectif?: Objectif
  niveau?:   Niveau
  lieu?:     Lieu
  temps?:    Temps
  jours?:    Jours
}

/* ─── Mappings quiz → data ───────────────────────────────── */
const OBJECTIF_MAP: Record<Objectif, string> = {
  'Prise de masse': 'hypertrophie',
  'Perte de poids': 'perte-poids',
  'Force':          'force',
  'Endurance':      'endurance',
}
const NIVEAU_MAP: Record<Niveau, string> = {
  'Débutant':       'debutant',
  'Intermédiaire':  'intermediaire',
  'Avancé':         'avance',
}
const LIEU_MAP: Record<Lieu, string> = {
  'Salle de sport': 'salle',
  'À la maison':    'maison',
}
const TEMPS_RANGES: Record<Temps, [number, number]> = {
  '< 30 min':  [0, 30],
  '30-60 min': [30, 60],
  '> 60 min':  [60, 999],
}
const JOURS_RANGES: Record<Jours, [number, number]> = {
  '2-3 jours': [2, 3],
  '3-4 jours': [3, 4],
  '5-6 jours': [5, 6],
}

/* ─── Étapes ─────────────────────────────────────────────── */
const ETAPES = [
  {
    id: 'objectif',
    question: 'Quel est votre objectif principal ?',
    sous: 'Choisissez ce qui correspond le mieux à votre but.',
    choix: ['Prise de masse', 'Perte de poids', 'Force', 'Endurance'] as Objectif[],
    icones: ['📈', '🔥', '💪', '🏃'],
  },
  {
    id: 'niveau',
    question: 'Quel est votre niveau actuel ?',
    sous: 'Soyez honnête pour un meilleur match.',
    choix: ['Débutant', 'Intermédiaire', 'Avancé'] as Niveau[],
    icones: ['🌱', '⚡', '🔱'],
  },
  {
    id: 'lieu',
    question: 'Où vous entraînez-vous ?',
    sous: 'Cela détermine le matériel disponible.',
    choix: ['Salle de sport', 'À la maison'] as Lieu[],
    icones: ['🏋️', '🏠'],
  },
  {
    id: 'temps',
    question: 'Combien de temps avez-vous par séance ?',
    sous: 'Votre disponibilité réelle, échauffement inclus.',
    choix: ['< 30 min', '30-60 min', '> 60 min'] as Temps[],
    icones: ['⚡', '✅', '🎯'],
  },
  {
    id: 'jours',
    question: 'Combien de jours par semaine pouvez-vous vous entraîner ?',
    sous: 'Planifiez selon votre emploi du temps.',
    choix: ['2-3 jours', '3-4 jours', '5-6 jours'] as Jours[],
    icones: ['🗓️', '📅', '💥'],
  },
]

/* ─── Algorithme de scoring ──────────────────────────────── */
function scoreProgramme(prog: Programme, rep: Reponses): number {
  let score = 0

  if (rep.objectif && prog.objectif === OBJECTIF_MAP[rep.objectif]) score += 3
  if (rep.niveau   && prog.niveau   === NIVEAU_MAP[rep.niveau])     score += 3
  if (rep.lieu     && prog.mode     === LIEU_MAP[rep.lieu])         score += 2

  if (rep.temps) {
    const [min, max] = TEMPS_RANGES[rep.temps]
    if (prog.tempsParSeance >= min && prog.tempsParSeance <= max) score += 1
  }

  if (rep.jours) {
    const [min, max] = JOURS_RANGES[rep.jours]
    if (prog.joursParSemaine >= min && prog.joursParSemaine <= max) score += 1
  }

  return score
}

function getRecommandations(rep: Reponses): { programme: Programme; score: number }[] {
  return PROGRAMMES
    .map(p => ({ programme: p, score: scoreProgramme(p, rep) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

/* ─── Labels affichage ───────────────────────────────────── */
const NIVEAU_DISPLAY: Record<string, { label: string; color: string }> = {
  debutant:      { label: 'Débutant',      color: '#4ADE80' },
  intermediaire: { label: 'Intermédiaire', color: '#FBBF24' },
  avance:        { label: 'Avancé',        color: '#F87171' },
}
const OBJECTIF_DISPLAY: Record<string, string> = {
  force: 'Force', hypertrophie: 'Hypertrophie',
  'perte-poids': 'Perte de poids', endurance: 'Endurance',
}

/* ─── Composant principal ────────────────────────────────── */
export default function QuizClient() {
  const [etape, setEtape]         = useState(0)
  const [reponses, setReponses]   = useState<Reponses>({})
  const [termine, setTermine]     = useState(false)
  const [resultats, setResultats] = useState<{ programme: Programme; score: number }[]>([])

  const etapeCourante = ETAPES[etape]
  const progression   = ((etape) / ETAPES.length) * 100

  const choisir = (choix: string) => {
    const nouvellesReponses = { ...reponses, [etapeCourante.id]: choix }
    setReponses(nouvellesReponses)

    if (etape < ETAPES.length - 1) {
      setEtape(etape + 1)
    } else {
      // Dernière étape → calculer résultats
      setResultats(getRecommandations(nouvellesReponses as Reponses))
      setTermine(true)
    }
  }

  const recommencer = () => {
    setEtape(0)
    setReponses({})
    setTermine(false)
    setResultats([])
  }

  /* ── Vue Résultats ──────────────────────────────────────── */
  if (termine) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{ background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.3)' }}>
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="text-3xl font-black mb-2 red-text">Vos programmes idéaux</h1>
          <p className="text-sm" style={{ color: '#5A6478' }}>
            Basé sur vos réponses, voici nos meilleures recommandations.
          </p>
        </div>

        {resultats.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center mb-8">
            <p className="mb-4" style={{ color: '#5A6478' }}>
              Aucun programme ne correspond exactement à vos critères.
            </p>
            <Link href="/programmes" className="btn-red px-5 py-2.5 rounded-xl text-sm font-bold">
              Voir tous les programmes
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5 mb-10">
            {resultats.map((r, index) => {
              const niv  = NIVEAU_DISPLAY[r.programme.niveau]
              const href = `/programmes/${r.programme.mode}/${r.programme.slug}`
              const est1er = index === 0

              return (
                <div
                  key={r.programme.slug}
                  className="glass-card rounded-2xl p-5"
                  style={est1er ? { borderColor: 'rgba(230,57,70,0.4)', boxShadow: '0 0 30px rgba(230,57,70,0.08)' } : {}}
                >
                  {/* Badge rank */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {est1er && (
                        <span
                          className="text-xs font-black px-2.5 py-1 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #B91C1C, #E63946)',
                            color: '#07070F',
                          }}
                        >
                          ★ Recommandé #1
                        </span>
                      )}
                      {!est1er && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#5A6478', border: '1px solid rgba(255,255,255,0.08)' }}>
                          #{index + 1}
                        </span>
                      )}
                      <span className="badge-red px-2.5 py-1 rounded-full text-[10px]">
                        {r.programme.mode === 'salle' ? '🏋️ Salle' : '🏠 Maison'}
                      </span>
                    </div>
                    <span className="text-xs shrink-0" style={{ color: '#3A4152' }}>
                      {r.programme.dureeWeeks} semaines
                    </span>
                  </div>

                  <h2 className="font-black text-lg mb-1" style={{ color: '#EDE8E0' }}>
                    {r.programme.nom}
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: '#5A6478' }}>
                    {r.programme.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { val: r.programme.joursParSemaine, label: 'jours/sem' },
                      { val: `${r.programme.tempsParSeance} min`, label: 'par séance' },
                      { val: OBJECTIF_DISPLAY[r.programme.objectif], label: 'objectif' },
                    ].map(s => (
                      <div key={s.label} className="text-center py-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,57,70,0.08)' }}>
                        <div className="font-black text-sm" style={{ color: '#E63946' }}>{s.val}</div>
                        <div className="text-xs" style={{ color: '#3A4152' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Niveau + CTA */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold" style={{ color: niv.color }}>
                      {niv.label}
                    </span>
                    <Link
                      href={href}
                      className="btn-red px-5 py-2 rounded-xl text-sm font-bold"
                    >
                      Voir le programme →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={recommencer}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#5A6478',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            ↩ Recommencer le quiz
          </button>
        </div>
      </div>
    )
  }

  /* ── Vue Quiz ───────────────────────────────────────────── */
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E63946' }}>
            Étape {etape + 1} / {ETAPES.length}
          </span>
          <span className="text-xs" style={{ color: '#3A4152' }}>
            {Math.round(progression)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progression}%`,
              background: 'linear-gradient(90deg, #B91C1C, #E63946, #FF6B7A)',
            }}
          />
        </div>
      </div>

      {/* Carte question */}
      <div className="glass-card rounded-2xl p-8 mb-6">
        {/* Numéro step */}
        <div className="flex items-center gap-2 mb-5">
          {ETAPES.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i < etape ? '#E63946' : i === etape ? '#FF6B7A' : 'rgba(255,255,255,0.1)',
                transform: i === etape ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        <h1 className="text-2xl font-black mb-2" style={{ color: '#EDE8E0' }}>
          {etapeCourante.question}
        </h1>
        <p className="text-sm mb-7" style={{ color: '#5A6478' }}>
          {etapeCourante.sous}
        </p>

        {/* Choix */}
        <div className="flex flex-col gap-3">
          {etapeCourante.choix.map((choix, ci) => (
            <button
              key={choix}
              onClick={() => choisir(choix)}
              className="w-full text-left px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                color: '#EDE8E0',
                border: '1px solid rgba(230,57,70,0.12)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(230,57,70,0.08)'
                el.style.borderColor = 'rgba(230,57,70,0.35)'
                el.style.color = '#E63946'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(255,255,255,0.03)'
                el.style.borderColor = 'rgba(230,57,70,0.12)'
                el.style.color = '#EDE8E0'
              }}
            >
              <span className="text-lg shrink-0">{etapeCourante.icones[ci]}</span>
              <span>{choix}</span>
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#E63946' }}>→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Retour étape */}
      {etape > 0 && (
        <div className="text-center">
          <button
            onClick={() => setEtape(etape - 1)}
            className="text-sm transition-colors"
            style={{ color: '#3A4152' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#5A6478' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#3A4152' }}
          >
            ← Étape précédente
          </button>
        </div>
      )}

      {/* Intro (première étape) */}
      {etape === 0 && (
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: '#3A4152' }}>
            5 questions · ~1 minute · Programme personnalisé garanti
          </p>
        </div>
      )}
    </div>
  )
}
