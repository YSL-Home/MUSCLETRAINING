'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <nav style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }} className="sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Sport It"
                width={48}
                height={48}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-widest hidden sm:block" style={{ color: '#b8d400' }}>
                SPORT IT
              </span>
              <span className="text-[10px] tracking-[0.2em] font-semibold hidden sm:block" style={{ color: '#38bdf8' }}>
                ENTRAÎNEMENT
              </span>
            </div>
          </Link>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: '/', label: 'Muscles' },
              { href: '/programmes', label: 'Programmes' },
              { href: '/sport', label: 'Sports' },
              { href: '/machines', label: 'Machines' },
              { href: '/calculateurs', label: 'Calculateurs' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors relative group">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"
                  style={{ background: '#b8d400' }} />
              </Link>
            ))}
          </div>

          {/* Mode toggle + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={{
                background: mode === 'salle' ? 'rgba(184,212,0,0.12)' : 'rgba(56,189,248,0.12)',
                color: mode === 'salle' ? '#b8d400' : '#38bdf8',
                border: `1px solid ${mode === 'salle' ? '#b8d400' : '#38bdf8'}`,
              }}
            >
              <span>{mode === 'salle' ? '🏋️' : '🏠'}</span>
              <span>{mode === 'salle' ? 'Salle' : 'Maison'}</span>
            </button>

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
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white font-medium">Muscles</Link>
            <Link href="/programmes" onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white font-medium">Programmes</Link>
            <Link href="/sport" onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white font-medium">Sports</Link>
            <Link href="/machines" onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white font-medium">Machines</Link>
            <Link href="/calculateurs" onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white font-medium">Calculateurs</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
