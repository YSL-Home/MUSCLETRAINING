'use client'

import { useEffect, useRef } from 'react'

const PUB_ID = 'ca-pub-6870790039775701'

interface Props {
  slot?: string
  format?: string
  responsive?: boolean
  minHeight?: number
  label?: string
  style?: React.CSSProperties
}

/**
 * Unité AdSense. Sans `slot` : réserve un espace transparent (auto-ads injecte).
 * Avec `slot` (ID depuis le dashboard AdSense) : affiche une unité manuelle.
 */
export default function AdSlot({
  slot = '',
  format = 'auto',
  responsive = true,
  minHeight = 90,
  label,
  style = {},
}: Props) {
  const ref = useRef<HTMLModElement>(null)

  useEffect(() => {
    if (!slot || !ref.current) return
    try {
      ;((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||= []).push({})
    } catch {}
  }, [slot])

  if (!slot) {
    return <div aria-label={label} style={{ minHeight, ...style }} />
  }

  return (
    <div style={{ overflow: 'hidden', minHeight, textAlign: 'center', ...style }} aria-label={label}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
