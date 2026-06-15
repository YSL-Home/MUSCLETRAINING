'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '@/components/LanguageProvider'
import { LOCALES } from '@/lib/translations'

export default function Navbar() {
  const [mode, setMode] = useState<'salle' | 'maison'>('salle')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { locale, setLocale, tr } = useLang()

  const NAV_LINKS = [
    { href: '/', label: tr('nav.muscles') },
    { href: '/programmes', label: tr('nav.programs') },
    { href: '/calisthenics', label: 'Calisthénics' },
    { href: '/guides', label: 'Guides' },
    { href: '/generateur', label: tr('nav.session') },
    { href: '/tracker', label: 'Tracker' },
    { href: '/machines', label: 'Machines' },
    { href: '/nutrition', label: 'Nutrition' },
    { href: '/quiz', label: tr('nav.quiz') },
    { href: '/blog', label: tr('nav.blog') },
  ]
  const currentLocale = LOCALES.find(l => l.code === locale)

  useEffect(() => {
    const stored = localStorage.getItem('mode') as 'salle' | 'maison' | null
    if (stored) setMode(stored)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMode = () => {
    const next = mode === 'salle' ? 'maison' : 'salle'
    setMode(next)
    localStorage.setItem('mode', next)
    window.dispatchEvent(new CustomEvent('modeChange', { detail: next }))
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      inputRef.current?.blur()
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(7,7,15,0.95)' : 'rgba(7,7,15,0.7)',
        borderBottom: '1px solid rgba(230,57,70,0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 leading-none flex-shrink-0">
            <div className="relative w-8 h-8">
              <Image src="/logo.svg" alt="Muscle Training" width={32} height={32} className="rounded-full" priority />
            </div>
            <span className="font-black text-lg tracking-[0.18em]" style={{
              background: 'linear-gradient(135deg, #E63946 0%, #FF6B7A 50%, #E63946 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              MUSCLE TRAINING
            </span>
          </Link>

          {/* Desktop nav + search — all in one row */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-1 min-w-0">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}
                className="text-[11px] xl:text-xs font-semibold tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-200 hover:text-[#E63946]"
                style={{ color: '#5A6478' }}>
                {label}
              </Link>
            ))}

            {/* Inline search — only when there's room (xl+) */}
            <form onSubmit={submitSearch} className="hidden xl:block flex-1 min-w-0 max-w-[200px] ml-1">
              <div className="relative flex items-center">
                <svg className="absolute left-3 w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: '#3A4152' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={tr('nav.search')}
                  className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs font-medium focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(230,57,70,0.15)',
                    color: '#EDE8E0',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(230,57,70,0.45)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(230,57,70,0.15)')}
                />
              </div>
            </form>

            {/* Search icon button when input is hidden (lg only) */}
            <Link href="/recherche" aria-label="Rechercher"
              className="xl:hidden flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-colors hover:text-[#E63946]"
              style={{ border: '1px solid rgba(230,57,70,0.18)', color: '#8A9BB5' }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* Right: mode toggle + burger */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto lg:ml-0">
            {/* Language picker */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: 'rgba(230,57,70,0.07)', border: '1px solid rgba(230,57,70,0.2)', color: '#E63946' }}
              >
                <span>{currentLocale?.flag}</span>
                <span className="hidden lg:inline">{currentLocale?.code.toUpperCase()}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl overflow-hidden z-50 shadow-xl"
                  style={{ background: '#0C0C1A', border: '1px solid rgba(230,57,70,0.2)' }}>
                  {LOCALES.map(l => (
                    <button key={l.code} onClick={() => { setLocale(l.code); setLangOpen(false) }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors text-left"
                      style={{
                        color: locale === l.code ? '#E63946' : '#8A9BB5',
                        background: locale === l.code ? 'rgba(230,57,70,0.08)' : 'transparent',
                      }}>
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                      {locale === l.code && <span className="ml-auto text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="https://t.me/muscletrainiing" target="_blank" rel="noopener noreferrer" title="Canal Telegram"
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-full transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(35,158,217,0.3)', color: '#229ED9' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.86 8.78c-.14.62-.51.77-1.03.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.57.28l.2-2.9 5.27-4.76c.23-.2-.05-.32-.35-.12L8.4 13.5l-2.8-.88c-.61-.19-.62-.61.13-.9l10.95-4.22c.51-.18.96.12.78.66z"/></svg>
            </a>
            <Link href="/favoris" title={tr('nav.favorites')}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-full transition-all hover:border-[#E63946]"
              style={{ border: '1px solid rgba(230,57,70,0.18)', color: '#8A9BB5' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <button onClick={toggleMode}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all"
              style={{ background: 'rgba(230,57,70,0.07)', border: '1px solid rgba(230,57,70,0.2)', color: '#E63946' }}>
              <span>{mode === 'salle' ? '🏋️' : '🏠'}</span>
              <span>{mode === 'salle' ? tr('nav.mode.gym') : tr('nav.mode.home')}</span>
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full"
              style={{ border: '1px solid rgba(230,57,70,0.18)', color: '#8A9BB5' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-5 pt-3 flex flex-col gap-1"
            style={{ borderTop: '1px solid rgba(230,57,70,0.1)' }}>
            {/* Mobile search */}
            <form onSubmit={submitSearch} className="px-2 mb-2">
              <div className="relative flex items-center">
                <svg className="absolute left-3 w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: '#3A4152' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="search" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-9 pr-3 py-2 rounded-full text-xs font-medium focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(230,57,70,0.2)', color: '#EDE8E0' }} />
              </div>
            </form>

            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="px-2 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#E63946]"
                style={{ color: '#5A6478' }}>
                {label}
              </Link>
            ))}
            <div className="flex gap-3 px-2 pt-2">
              <Link href="/generateur" onClick={() => setMenuOpen(false)}
                className="text-xs font-semibold tracking-widest uppercase py-2 hover:text-[#E63946] transition-colors"
                style={{ color: '#5A6478' }}>⚡ Générateur</Link>
            </div>
            <button onClick={toggleMode}
              className="mx-2 mt-1 py-2 px-4 rounded-full text-xs font-bold tracking-widest"
              style={{ background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.2)', color: '#E63946' }}>
              {mode === 'salle' ? '🏋️ MODE SALLE' : '🏠 MODE MAISON'}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
