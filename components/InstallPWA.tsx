'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setVisible(false)
    setDeferredPrompt(null)
    console.log('PWA install outcome:', outcome)
  }

  const handleDismiss = () => {
    setVisible(false)
    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: '#0C0C1A',
        border: '1px solid #E63946',
        borderRadius: '0.75rem',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 4px 24px rgba(230,57,70,0.18)',
        maxWidth: 'calc(100vw - 2rem)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: '#ffffff', fontSize: '0.875rem' }}>
        Accès rapide depuis votre écran d&apos;accueil
      </span>
      <button
        onClick={handleInstall}
        style={{
          background: '#E63946',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.4rem 0.9rem',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        📱 Installer l&apos;app Muscle Training
      </button>
      <button
        onClick={handleDismiss}
        aria-label="Fermer"
        style={{
          background: 'transparent',
          color: '#888',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          lineHeight: 1,
          padding: '0 0.25rem',
        }}
      >
        ✕
      </button>
    </div>
  )
}
