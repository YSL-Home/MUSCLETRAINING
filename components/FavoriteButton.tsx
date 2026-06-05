'use client'

import { useState, useEffect } from 'react'

export default function FavoriteButton({ slug, nom }: { slug: string; nom: string }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const favs: string[] = JSON.parse(localStorage.getItem('favoris') ?? '[]')
    setSaved(favs.includes(slug))
  }, [slug])

  const toggle = () => {
    const favs: string[] = JSON.parse(localStorage.getItem('favoris') ?? '[]')
    const next = saved ? favs.filter(s => s !== slug) : [...favs, slug]
    localStorage.setItem('favoris', JSON.stringify(next))
    setSaved(!saved)
  }

  return (
    <button
      onClick={toggle}
      title={saved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all"
      style={{
        background: saved ? '#b8d40020' : 'transparent',
        color: saved ? '#b8d400' : '#94a3b8',
        border: `1px solid ${saved ? '#b8d400' : '#334155'}`,
      }}
    >
      <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {saved ? 'Sauvegardé' : 'Sauvegarder'}
    </button>
  )
}
