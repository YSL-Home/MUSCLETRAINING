import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES, CATEGORIES_ARTICLES } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Blog Musculation — Conseils, Programmes et Nutrition',
  description: 'Articles experts sur la musculation, la nutrition et les programmes d\'entraînement basés sur la science.',
}

const CAT_COLOR: Record<string, string> = {
  'Programmes': '#E63946', 'Nutrition': '#38bdf8', 'Exercices': '#FBBF24',
  'Récupération': '#4ADE80', 'Prévention': '#F87171', 'Technique': '#A78BFA',
  'Programmation': '#FB923C', 'Objectifs': '#E879F9', 'Entraînement': '#E63946',
}
const cc = (c: string) => CAT_COLOR[c] ?? '#E63946'

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES

  return (
    <div style={{ background: '#07070F', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: '#E63946' }}>Savoir</p>
          <h1 className="text-4xl font-black" style={{ color: '#EDE8E0' }}>Blog</h1>
        </div>

        {/* Featured */}
        <Link href={`/blog/${featured.slug}`}
          className="block rounded-3xl overflow-hidden mb-6 group transition-all hover:-translate-y-1"
          style={{ background: '#0C0C1A', border: '1px solid rgba(230,57,70,0.15)' }}>
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #E63946 30%, #FF6B7A 50%, #E63946 70%, transparent)' }} />
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ background: cc(featured.categorie) + '18', color: cc(featured.categorie) }}>
                {featured.categorie}
              </span>
              <span className="text-xs" style={{ color: '#3A4152' }}>{featured.tempsLecture} min</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-3 group-hover:text-[#E63946] transition-colors" style={{ color: '#EDE8E0' }}>
              {featured.titre}
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#5A6478' }}>{featured.description}</p>
          </div>
        </Link>

        {/* Grid + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`}
                className="rounded-2xl p-5 group transition-all hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ background: cc(a.categorie) + '15', color: cc(a.categorie) }}>{a.categorie}</span>
                  <span className="text-[10px]" style={{ color: '#3A4152' }}>{a.tempsLecture} min</span>
                </div>
                <h3 className="text-sm font-black leading-snug line-clamp-2 group-hover:text-[#E63946] transition-colors" style={{ color: '#EDE8E0' }}>
                  {a.titre}
                </h3>
                <p className="text-xs mt-2 line-clamp-2" style={{ color: '#5A6478' }}>{a.description}</p>
              </Link>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.08)' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#E63946' }}>Catégories</p>
              <div className="space-y-2">
                {CATEGORIES_ARTICLES.map(cat => (
                  <div key={cat} className="flex items-center justify-between py-1.5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="text-xs" style={{ color: '#5A6478' }}>{cat}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: cc(cat) + '15', color: cc(cat) }}>
                      {ARTICLES.filter(a => a.categorie === cat).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/programmes" className="block rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.1), rgba(230,57,70,0.03))', border: '1px solid rgba(230,57,70,0.2)' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E63946' }}>Programmes</p>
              <p className="text-sm font-black" style={{ color: '#EDE8E0' }}>Mettre en pratique →</p>
              <p className="text-xs mt-1" style={{ color: '#5A6478' }}>6 programmes salle & maison</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
