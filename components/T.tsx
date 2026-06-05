'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/components/LanguageProvider'
import type { TranslationKey } from '@/lib/translations'

/**
 * T — client translation component. Renders French on server (SSG),
 * switches to active locale after hydration with no flash.
 */
export function T({ k, className }: { k: TranslationKey; className?: string }) {
  const { tr, locale } = useLang()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const text = mounted ? tr(k) : tr('fr' as never) // show correct lang after mount
  const out = mounted ? tr(k) : undefined

  return className
    ? <span className={className} suppressHydrationWarning>{out ?? tr(k)}</span>
    : <span suppressHydrationWarning>{tr(k)}</span>
}

/** Inline text-only version — no span wrapper */
export function useT() {
  const { tr } = useLang()
  return tr
}
