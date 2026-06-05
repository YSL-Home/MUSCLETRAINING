'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { EXERCISES } from '@/data/exercises'
import { MUSCLES } from '@/data/muscles'
import { SPORTS } from '@/data/sports'
import { ARTICLES } from '@/data/articles'
import { MACHINES } from '@/data/machines'

const ALL_ITEMS = [
  ...EXERCISES.map(e => ({
    type: 'exercice' as const,
    titre: e.nom,
    description: e.descriptionCourte,
    url: `/exercice/${e.slug}`,
    tags: [e.difficulte, e.mode, ...e.musclesPrimaires],
    badge: 'Exercice',
    color: '#b8d400',
  })),
  ...MUSCLES.map(m => ({
    type: 'muscle' as const,
    titre: m.nom,
    description: m.description.slice(0, 100),
    url: `/muscles/${m.slug}`,
    tags: [m.groupeCorps],
    badge: 'Muscle',
    color: m.couleurSvg,
  })),
  ...SPORTS.map(s => ({
    type: 'sport' as const,
    titre: s.nom,
    description: s.description.slice(0, 100) + '...',
    url: `/sport/${s.slug}`,
    tags: s.besoinsPhysiques,
    badge: 'Sport',
    color: s.couleur,
  })),
  ...ARTICLES.map(a => ({
    type: 'article' as const,
    titre: a.titre,
    description: a.description,
    url: `/blog/${a.slug}`,
    tags: a.tags,
    badge: a.categorie,
    color: '#38bdf8',
  })),
  ...MACHINES.map(m => ({
    type: 'machine' as const,
    titre: m.nom,
    description: m.description.slice(0, 120),
    url: `/machines#${m.slug}`,
    tags: [...m.musclesPrimaires, ...m.musclesSecondaires],
    badge: 'Machine',
    color: '#f59e0b',
  })),
]

function RechercheContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams?.get('q') ?? '')

  useEffect(() => {
    const q = searchParams?.get('q') ?? ''
    if (q) setQuery(q)
  }, [searchParams])

  const results = useMemo(() => {
    if (query.length < 2) return []
    const q = query.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    return ALL_ITEMS.filter(item => {
      const haystack = (item.titre + ' ' + item.description + ' ' + item.tags.join(' '))
        .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      return haystack.includes(q)
    })
  }, [query])

  const grouped = useMemo(() => {
    const g: Record<string, typeof results> = {}
    results.forEach(r => {
      const key = r.type === 'article' ? 'Blog' : r.type === 'muscle' ? 'Muscles' : r.type === 'sport' ? 'Sports' : r.type === 'machine' ? 'Machines' : 'Exercices'
      if (!g[key]) g[key] = []
      g[key].push(r)
    })
    return g
  }, [results])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-[#EDE8E0] mb-2">Recherche</h1>
      <p className="text-[#5A6478] mb-6">Exercices, muscles, sports, articles...</p>

      <div className="relative mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A4152]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          autoFocus
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ex: squat, pectoraux, padel, protéines..."
          className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-[rgba(230,57,70,0.1)] focus:border-lime-400 focus:outline-none transition-colors text-[#EDE8E0] bg-[#0C0C1A] shadow-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3A4152] hover:text-[#8A9BB5]">✕</button>
        )}
      </div>

      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-12 text-[#3A4152]">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold">Aucun résultat pour &quot;{query}&quot;</p>
          <p className="text-sm mt-1">Essayez des termes plus généraux</p>
        </div>
      )}

      {query.length < 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Pompes', url: '/exercice/pompes' },
            { label: 'Squat', url: '/exercice/squat-barre' },
            { label: 'Pectoraux', url: '/muscles/pectoraux' },
            { label: 'Programme Salle', url: '/programmes/salle' },
          ].map(s => (
            <Link key={s.label} href={s.url}
              className="p-3 text-center rounded-xl border border-[rgba(230,57,70,0.1)] hover:border-[#E63946] text-sm font-medium text-[#8A9BB5] hover:text-[#E63946] transition-all bg-[#0C0C1A]">
              {s.label}
            </Link>
          ))}
        </div>
      )}

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="mb-8">
          <h2 className="text-sm font-bold text-[#3A4152] uppercase tracking-wider mb-3">{cat} ({items.length})</h2>
          <div className="space-y-2">
            {items.slice(0, 5).map(item => (
              <Link key={item.url} href={item.url}
                className="flex items-start gap-4 p-4 bg-[#0C0C1A] rounded-xl border border-[rgba(230,57,70,0.1)] hover:border-[#E63946] hover:shadow-sm transition-all group">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: item.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold" style={{ color: item.color }}>{item.badge}</span>
                  </div>
                  <p className="font-semibold text-[#EDE8E0] group-hover:text-[#E63946] transition-colors text-sm">{item.titre}</p>
                  <p className="text-xs text-[#5A6478] line-clamp-1 mt-0.5">{item.description}</p>
                </div>
                <span className="text-[#3A4152] group-hover:text-lime-400 transition-colors mt-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function RecherchePage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-10 text-[#3A4152]">Chargement...</div>}>
      <RechercheContent />
    </Suspense>
  )
}
