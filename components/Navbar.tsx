'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mode, setMode] = useState<'salle' | 'maison'>('salle')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('mode') as 'salle' | 'maison' | null
    if (stored) setMode(stored)
  }, [])

  const toggleMode = () => {
    const next = mode === 'salle' ? 'maison' : 'salle'
    setMode(next)
    localStorage.setItem('mode', next)
    window.dispatchEvent(new CustomEvent('modeChange', { detail: next }))
  }

  return (
    <nav style={{ background: '#0f172a' }} className="sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ background: '#f97316' }}>
              MG
            </div>
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
              MuscleGym
            </span>
          </Link>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Muscles
            </Link>
            <Link href="/programmes" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Programmes
            </Link>
            <Link href="/sport" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Sports
            </Link>
            <Link href="/machines" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Machines
            </Link>
            <Link href="/calculateurs" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Calculateurs
            </Link>
          </div>

          {/* Mode toggle + mobile menu */}
          <div className="flex items-center gap-3">
            {/* Mode toggle */}
            <button
              onClick={toggleMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={{
                background: mode === 'salle' ? '#1e3a5f' : '#14532d',
                color: mode === 'salle' ? '#60a5fa' : '#4ade80',
                border: `1px solid ${mode === 'salle' ? '#3b82f6' : '#22c55e'}`,
              }}
            >
              <span>{mode === 'salle' ? '🏋️' : '🏠'}</span>
              <span>{mode === 'salle' ? 'Salle' : 'Maison'}</span>
            </button>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700 mt-2 pt-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">Muscles</Link>
            <Link href="/programmes" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">Programmes</Link>
            <Link href="/sport" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">Sports</Link>
            <Link href="/machines" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">Machines</Link>
            <Link href="/calculateurs" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">Calculateurs</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
