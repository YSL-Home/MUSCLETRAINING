'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (!localStorage.getItem('cookie-consent')) setVisible(true) }, [])
  const accept = () => { localStorage.setItem('cookie-consent', 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); setVisible(false) }
  if (!visible) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5"
      style={{ background: 'rgba(7,7,15,0.96)', borderTop: '1px solid rgba(230,57,70,0.12)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-xs" style={{ color: '#5A6478' }}>
          <span className="font-bold" style={{ color: '#EDE8E0' }}>Cookies —</span> Nous utilisons des cookies pour analyser le trafic et améliorer l'expérience.{' '}
          <Link href="/cgu" className="underline hover:text-[#E63946] transition-colors">En savoir plus</Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={decline} className="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all"
            style={{ border: '1px solid rgba(230,57,70,0.15)', color: '#3A4152' }}>Refuser</button>
          <button onClick={accept} className="btn-red px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase">Accepter</button>
        </div>
      </div>
    </div>
  )
}
