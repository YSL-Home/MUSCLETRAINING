import type { Metadata } from 'next'
import Link from 'next/link'
import ExerciseCard from '@/components/ExerciseCard'
import Breadcrumb from '@/components/Breadcrumb'
import { EXERCISES } from '@/data/exercises'

export const metadata: Metadata = {
  title: 'Nouveaux exercices ajoutés',
  description: 'Les derniers exercices de musculation ajoutés sur Muscle Training — techniques, vidéos et conseils.',
  alternates: { canonical: 'https://www.muscletraining.uk/nouveautes' },
}

const RECENT_COUNT = 18

export default function NouveautesPage() {
  const recent = [...EXERCISES].slice(-RECENT_COUNT).reverse()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[
        { nom: 'Accueil', url: '/' },
        { nom: 'Nouveautés' },
      ]} />

      <div className="mt-6 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946', border: '1px solid rgba(230,57,70,0.2)' }}>
          ✦ RÉCEMMENT AJOUTÉS
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#EDE8E0] mb-3">
          Nouveaux exercices
        </h1>
        <p className="text-[#8A9BB5] text-lg max-w-xl">
          Les {RECENT_COUNT} derniers exercices ajoutés à la bibliothèque — techniques détaillées, vidéos et conseils de pro.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recent.map((ex, i) => (
          <div key={ex.slug} className="relative">
            {i === 0 && (
              <span className="absolute top-3 left-3 z-10 text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: '#E63946', color: '#fff' }}>
                NOUVEAU
              </span>
            )}
            <ExerciseCard exercise={ex} />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/exercice"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm"
          style={{ background: 'rgba(230,57,70,0.08)', color: '#E63946', border: '1px solid rgba(230,57,70,0.2)' }}>
          Voir tous les exercices →
        </Link>
      </div>
    </div>
  )
}
