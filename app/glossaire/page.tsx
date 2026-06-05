'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import { GLOSSAIRE } from '@/data/glossaire'

const CATEGORIES = [...new Set(GLOSSAIRE.map(t => t.categorie))]
const CAT_COLORS: Record<string, string> = {
  'Entraînement': '#b8d400', 'Physiologie': '#38bdf8', 'Nutrition': '#f59e0b',
  'Technique': '#10b981', 'Récupération': '#6366f1', 'Suppléments': '#e11d48',
  'Programmation': '#f97316', 'Objectifs': '#8b5cf6', 'Cardio': '#06b6d4', 'Prévention': '#ec4899',
}

export default function GlossairePage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Tous')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    return GLOSSAIRE.filter(t => {
      const match = (t.terme + t.definition + t.categorie).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q)
      return match && (cat === 'Tous' || t.categorie === cat)
    })
  }, [search, cat])

  const letters = [...new Set(filtered.map(t => t.terme[0].toUpperCase()))].sort()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb crumbs={[{ nom: 'Accueil', url: '/' }, { nom: 'Glossaire' }]} />
      <div className="mt-6 mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-[#EDE8E0] mb-2">
          Glossaire <span style={{ color: '#b8d400' }}>Musculation</span>
        </h1>
        <p className="text-[#5A6478]">{GLOSSAIRE.length} termes essentiels expliqués clairement</p>
      </div>

      {/* Recherche + filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3A4152]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un terme..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(230,57,70,0.1)] focus:border-lime-400 focus:outline-none text-sm text-[#EDE8E0]" />
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)} className="px-3 py-2.5 rounded-xl border border-[rgba(230,57,70,0.1)] text-sm text-[#C4CDD9] focus:outline-none focus:border-lime-400 bg-[#0C0C1A]">
          <option value="Tous">Toutes catégories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Alphabet nav */}
      <div className="flex flex-wrap gap-1 mb-8">
        {letters.map(l => (
          <a key={l} href={`#lettre-${l}`} className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-[#5A6478] hover:bg-lime-100 hover:text-lime-700 transition-colors">{l}</a>
        ))}
      </div>

      {/* Termes groupés par lettre */}
      {letters.map(letter => {
        const termes = filtered.filter(t => t.terme[0].toUpperCase() === letter)
        return (
          <div key={letter} id={`lettre-${letter}`} className="mb-10">
            <h2 className="text-2xl font-black text-slate-200 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: '#b8d400' }}>{letter}</span>
            </h2>
            <div className="space-y-3">
              {termes.map(terme => (
                <div key={terme.slug} className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5 hover:border-[#E63946] transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-black text-[#EDE8E0] text-lg">{terme.terme}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
                      style={{ background: (CAT_COLORS[terme.categorie] ?? '#b8d400') + '20', color: CAT_COLORS[terme.categorie] ?? '#b8d400' }}>
                      {terme.categorie}
                    </span>
                  </div>
                  <p className="text-[#8A9BB5] text-sm leading-relaxed mb-2">{terme.definition}</p>
                  {terme.exemple && (
                    <p className="text-xs text-[#3A4152] italic border-l-2 pl-3" style={{ borderColor: '#b8d400' }}>
                      Exemple : {terme.exemple}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#3A4152]">
          <p className="text-4xl mb-2">📖</p>
          <p className="font-semibold">Aucun terme trouvé</p>
        </div>
      )}

      <div className="mt-12 p-6 rounded-2xl text-center" style={{ background: '#b8d40010', border: '1px solid #b8d40030' }}>
        <p className="font-bold text-[#EDE8E0] mb-2">Prêt à mettre en pratique ?</p>
        <div className="flex justify-center gap-4 mt-3">
          <Link href="/" className="text-sm font-semibold px-4 py-2 rounded-xl text-white" style={{ background: '#b8d400' }}>Voir les exercices</Link>
          <Link href="/calculateurs" className="text-sm font-semibold px-4 py-2 rounded-xl border border-[rgba(230,57,70,0.1)] text-[#C4CDD9] bg-[#0C0C1A] hover:border-[#E63946] transition-colors">Calculateurs</Link>
        </div>
      </div>
    </div>
  )
}
