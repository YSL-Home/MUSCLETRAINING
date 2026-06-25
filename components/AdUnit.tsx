'use client'
import { useEffect, useRef } from 'react'

// Slot IDs à remplir depuis AdSense Console → Annonces → Par unité
// Publisher : ca-pub-6870790039775701
export const AD_SLOTS = {
  // Crée ces unités dans AdSense → Annonces → Par unité d'annonce → Affichage
  exercice_apres_video:    process.env.NEXT_PUBLIC_AD_SLOT_EX_VIDEO    || '',
  exercice_sidebar:        process.env.NEXT_PUBLIC_AD_SLOT_EX_SIDEBAR  || '',
  exercice_bas:            process.env.NEXT_PUBLIC_AD_SLOT_EX_BAS      || '',
  blog_mid:                process.env.NEXT_PUBLIC_AD_SLOT_BLOG_MID    || '',
  blog_bas:                process.env.NEXT_PUBLIC_AD_SLOT_BLOG_BAS    || '',
  liste_feed:              process.env.NEXT_PUBLIC_AD_SLOT_FEED        || '',
}

type AdFormat = 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'

interface Props {
  slot: string
  format?: AdFormat
  className?: string
  style?: React.CSSProperties
}

export default function AdUnit({ slot, format = 'auto', className = '', style }: Props) {
  const ref = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    // Ne pas afficher dans l'app Capacitor (AdMob prend le relais)
    if (typeof window === 'undefined') return
    if ((window as any).Capacitor?.isNativePlatform?.()) return
    if (!slot || pushed.current) return
    pushed.current = true
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch {}
  }, [slot])

  if (!slot) return null

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6870790039775701"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Variante in-article (meilleur CTR dans le contenu long)
export function AdInArticle({ slot, className = '' }: { slot: string; className?: string }) {
  return (
    <AdUnit
      slot={slot}
      format="fluid"
      className={`my-8 ${className}`}
      style={{ minHeight: 100 }}
    />
  )
}

// Variante sidebar (affichage vertical)
export function AdSidebar({ slot }: { slot: string }) {
  return (
    <AdUnit
      slot={slot}
      format="auto"
      className="sticky top-24"
      style={{ minHeight: 250 }}
    />
  )
}
