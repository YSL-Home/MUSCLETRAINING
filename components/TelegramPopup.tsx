'use client'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tg_popup_dismissed'
const DELAY_MS = 45_000

export default function TelegramPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setShow(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  const dismiss = () => { sessionStorage.setItem(STORAGE_KEY, '1'); setShow(false) }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={dismiss}>
      <div className="w-full max-w-sm rounded-2xl p-6 relative" style={{ background: '#0f0f18', border: '1px solid rgba(230,57,70,0.4)' }} onClick={e => e.stopPropagation()}>
        <button onClick={dismiss} className="absolute top-3 right-4 text-lg" style={{ color: '#3A4152' }}>✕</button>
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🎁</div>
          <h2 className="text-lg font-black mb-1" style={{ color: '#EDE8E0' }}>8 Programmes PDF gratuits</h2>
          <p className="text-sm" style={{ color: '#8A9BB5' }}>Full Body, PPL, Pectoraux, Dos… Tous offerts sur le canal Telegram.</p>
        </div>
        <div className="flex flex-col gap-2">
          <a href="https://t.me/muscletrainiing" target="_blank" rel="noopener noreferrer" onClick={dismiss}
            className="block w-full text-center py-3 rounded-xl font-black text-sm" style={{ background: '#229ED9', color: '#fff' }}>
            📲 Rejoindre @muscletrainiing
          </a>
          <a href="/telegram" onClick={dismiss}
            className="block w-full text-center py-2 rounded-xl font-bold text-xs" style={{ color: '#E63946' }}>
            Voir les 8 programmes PDF →
          </a>
        </div>
      </div>
    </div>
  )
}
