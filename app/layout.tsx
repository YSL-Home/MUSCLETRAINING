import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import CookieConsent from '@/components/CookieConsent'
import { LanguageProvider } from '@/components/LanguageProvider'
import { websiteSchema } from '@/lib/schema'
import InstallPWA from '@/components/InstallPWA'
import NativeApp from '@/components/NativeApp'
import TelegramPopup from '@/components/TelegramPopup'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.muscletraining.uk'),
  title: {
    default: 'Muscle Training — Exercices, Programmes Salle & Maison avec Vidéos',
    template: '%s | Muscle Training',
  },
  description: 'Bibliothèque complète de 60+ exercices de musculation avec vidéos YouTube en français, programmes salle et maison pour tous les niveaux. Gratuit, sans inscription.',
  keywords: ['musculation', 'exercices', 'programme', 'salle de sport', 'maison', 'sans matériel', 'pectoraux', 'dos', 'jambes', 'débutant'],
  authors: [{ name: 'Muscle Training' }],
  creator: 'Muscle Training',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Muscle Training',
    title: 'Muscle Training — Exercices, Programmes Salle & Maison',
    description: 'La référence francophone pour la musculation. 60+ exercices avec vidéos, programmes salle et maison.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=6" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=6" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=6" />
        <link rel="shortcut icon" href="/favicon.ico?v=6" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Muscle Training — Blog" href="/feed.xml" />
        <meta name="theme-color" content="#E63946" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5BNDVNC4');` }} />
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-6870790039775701" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6870790039775701"
          crossOrigin="anonymous"
          data-nscript="afterInteractive"
        />
        {/* Désactive AdSense dans l'app native (Capacitor) — AdMob prend le relais */}
        <script dangerouslySetInnerHTML={{ __html: `if(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform()){window.adsbygoogle=window.adsbygoogle||[];window.adsbygoogle.push=function(){};}` }} />
        {/* Kill old service worker that caches stale chunks (muscletraining.uk fix) */}
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()));if(window.caches){caches.keys().then(ks=>ks.forEach(k=>caches.delete(k)))}}` }} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5BNDVNC4" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <NativeApp />
        <LanguageProvider>
        <Navbar />
        <main>{children}</main>
        <CookieConsent />
        <InstallPWA />
        <TelegramPopup />
        <footer style={{ background: '#07070F', borderTop: '1px solid rgba(230,57,70,0.1)' }} className="mt-0 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
              <div>
                <span className="font-black text-xl tracking-[0.2em]" style={{
                  background: 'linear-gradient(135deg, #E63946 0%, #FF6B7A 50%, #E63946 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>MUSCLE TRAINING</span>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#3A4152' }}>
                  La référence francophone pour la musculation. Exercices, programmes et vidéos pour tous les niveaux.
                </p>
                <a href="https://t.me/muscletrainiing" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#229ED9' }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.86 8.78c-.14.62-.51.77-1.03.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.57.28l.2-2.9 5.27-4.76c.23-.2-.05-.32-.35-.12L8.4 13.5l-2.8-.88c-.61-.19-.62-.61.13-.9l10.95-4.22c.51-.18.96.12.78.66z"/></svg>
                  Rejoindre le canal Telegram
                </a>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: '#E63946' }}>Muscles</p>
                <ul className="space-y-2">
                  {['pectoraux','dos','quadriceps','fessiers'].map(m => (
                    <li key={m}><a href={`/muscles/${m}`} className="text-sm transition-colors hover:text-[#E63946]" style={{ color: '#3A4152' }}>
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: '#E63946' }}>Navigation</p>
                <ul className="space-y-2">
                  {[
                    ['/programmes/salle','Avec matériel'],
                    ['/programmes/maison','Sans matériel'],
                    ['/guides','Guides exercices'],
                    ['/materiel','Matériel'],
                    ['/glossaire','Glossaire'],
                    ['/calculateurs','Calculateurs'],
                    ['/generateur','Générateur'],
                    ['/blog','Blog'],
                  ].map(([href, label]) => (
                    <li key={href}><a href={href} className="text-sm transition-colors hover:text-[#E63946]" style={{ color: '#3A4152' }}>{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(230,57,70,0.08)' }} className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs" style={{ color: '#3A4152' }}>© {new Date().getFullYear()} Muscle Training — Tous droits réservés</span>
              <div className="flex gap-5">
                {[['faq','FAQ'],['cgu','CGU'],['privacy','Confidentialité'],['about','À propos'],['contact','Contact']].map(([href, label]) => (
                  <a key={href} href={`/${href}`} className="text-xs transition-colors hover:text-[#E63946]" style={{ color: '#3A4152' }}>{label}</a>
                ))}
              </div>
            </div>
            <p className="text-[11px] leading-relaxed mt-4" style={{ color: '#2A3142' }}>
              En tant que Partenaire Amazon, ce site réalise un bénéfice sur les achats remplissant les conditions requises. Certains liens sont des liens affiliés.
            </p>
          </div>
        </footer>
        </LanguageProvider>
      </body>
    </html>
  )
}
