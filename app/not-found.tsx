import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page introuvable — Muscle Training',
  description: 'Cette page n\'existe pas. Retrouvez nos exercices, programmes et articles sur Muscle Training.',
}

export default function NotFound() {
  return (
    <div style={{ background: '#07070F', minHeight: '80vh' }}
      className="flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black mb-4" style={{
          background: 'linear-gradient(135deg, #E63946, #FF6B7A)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>404</div>
        <h1 className="text-2xl font-black mb-3" style={{ color: '#EDE8E0' }}>Page introuvable</h1>
        <p className="text-sm mb-8" style={{ color: '#5A6478' }}>
          Cette page n&apos;existe pas ou a été déplacée. Retourne à l&apos;accueil pour trouver tes exercices et programmes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #E63946, #FF6B7A)', color: '#07070F' }}>
            Accueil
          </Link>
          <Link href="/generateur" className="px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.25)', color: '#E63946' }}>
            ⚡ Générer une séance
          </Link>
        </div>
      </div>
    </div>
  )
}
