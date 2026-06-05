'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/recherche?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={submit} className="relative max-w-lg mx-auto mb-10">
      <div className="relative flex items-center">
        <svg className="absolute left-4 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          style={{ color: '#5A6478' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Squat, pectoraux, programme débutant..."
          className="w-full pl-11 pr-28 py-3.5 rounded-full text-sm font-medium focus:outline-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(230,57,70,0.2)',
            color: '#EDE8E0',
          }}
          onFocus={e => (e.target.style.borderColor = 'rgba(230,57,70,0.5)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(230,57,70,0.2)')}
        />
        <button type="submit"
          className="absolute right-1.5 btn-red px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase">
          GO
        </button>
      </div>
    </form>
  )
}
