'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import t, { type Locale, type TranslationKey, LOCALES } from '@/lib/translations'

interface LangCtx {
  locale: Locale
  setLocale: (l: Locale) => void
  tr: (key: TranslationKey) => string
  dir: 'ltr' | 'rtl'
}

const LangContext = createContext<LangCtx>({
  locale: 'fr',
  setLocale: () => {},
  tr: (k) => k,
  dir: 'ltr',
})

// Google Translate: change site language by setting the googtrans cookie + reload
function setGoogleTranslateCookie(target: string) {
  const domain = location.hostname.replace(/^www\./, '')
  const value = target === 'fr' ? '' : `/fr/${target}`
  // Set on current domain + apex domain
  document.cookie = `googtrans=${value};path=/;`
  document.cookie = `googtrans=${value};domain=.${domain};path=/;`
  document.cookie = `googtrans=${value};domain=${location.hostname};path=/;`
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Locale | null
    if (stored && t[stored]) {
      setLocaleState(stored)
    } else {
      const browser = navigator.language.slice(0, 2) as Locale
      if (t[browser]) {
        setLocaleState(browser)
        localStorage.setItem('lang', browser)
        setGoogleTranslateCookie(browser)
      }
    }

    // Inject Google Translate widget (hidden) — translates entire DOM
    if (!document.getElementById('gt-script')) {
      const s = document.createElement('script')
      s.id = 'gt-script'
      ;(window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit = () => {
        // @ts-expect-error google global
        new google.translate.TranslateElement({
          pageLanguage: 'fr',
          includedLanguages: 'en,es,zh-CN,ar,pt,ru,ja,de,ko,it,tr',
          autoDisplay: false,
        }, 'google_translate_element')
      }
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      s.async = true
      document.body.appendChild(s)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('lang', l)
    document.documentElement.lang = l
    const info = LOCALES.find(x => x.code === l)
    document.documentElement.dir = info?.dir ?? 'ltr'

    // Map our locale to Google Translate code
    const gtCode = l === 'zh' ? 'zh-CN' : l
    setGoogleTranslateCookie(gtCode)
    // Reload to apply translation
    location.reload()
  }

  const tr = (key: TranslationKey): string => t[locale]?.[key] ?? t['fr'][key] ?? key
  const dir = LOCALES.find(x => x.code === locale)?.dir ?? 'ltr'

  return (
    <LangContext.Provider value={{ locale, setLocale, tr, dir }}>
      {children}
      {/* Hidden Google Translate mount point */}
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }} />
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
