import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { websiteSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: {
    default: 'Vert Lime — Exercices, Programmes Salle & Maison avec Vidéos',
    template: '%s | Vert Lime',
  },
  description: 'Bibliothèque complète de 60+ exercices de musculation avec vidéos YouTube en français, programmes salle et maison pour tous les niveaux. Gratuit, sans inscription.',
  keywords: ['musculation', 'exercices', 'programme', 'salle de sport', 'maison', 'sans matériel', 'pectoraux', 'dos', 'jambes', 'débutant'],
  authors: [{ name: 'Vert Lime' }],
  creator: 'Vert Lime',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Vert Lime',
    title: 'Vert Lime — Exercices, Programmes Salle & Maison',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1f1f1f' }} className="mt-16 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-slate-400 text-sm">
              <div>
                <div className="font-black text-lg mb-2 tracking-widest" style={{ color: '#b8d400' }}>VERT LIME</div>
                <p>La référence francophone pour la musculation. Exercices, programmes et vidéos pour tous les niveaux.</p>
              </div>
              <div>
                <div className="text-white font-semibold mb-3">Muscles</div>
                <ul className="space-y-1.5">
                  <li><a href="/muscles/pectoraux" className="hover:text-white transition-colors">Pectoraux</a></li>
                  <li><a href="/muscles/dos" className="hover:text-white transition-colors">Dos</a></li>
                  <li><a href="/muscles/quadriceps" className="hover:text-white transition-colors">Quadriceps</a></li>
                  <li><a href="/muscles/fessiers" className="hover:text-white transition-colors">Fessiers</a></li>
                </ul>
              </div>
              <div>
                <div className="text-white font-semibold mb-3">Programmes</div>
                <ul className="space-y-1.5">
                  <li><a href="/programmes/salle" className="hover:text-white transition-colors">Salle de sport</a></li>
                  <li><a href="/programmes/maison" className="hover:text-white transition-colors">À la maison</a></li>
                  <li><a href="/sport" className="hover:text-white transition-colors">Sports</a></li>
                  <li><a href="/machines" className="hover:text-white transition-colors">Machines</a></li>
                  <li><a href="/calculateurs" className="hover:text-white transition-colors">Calculateurs</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-zinc-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs">
              <span>© {new Date().getFullYear()} Vert Lime — Tous droits réservés</span>
              <div className="flex gap-4">
                <a href="/faq" className="hover:text-slate-300 transition-colors">FAQ</a>
                <a href="/cgu" className="hover:text-slate-300 transition-colors">CGU</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
