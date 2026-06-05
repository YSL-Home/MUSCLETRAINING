import type { Metadata } from 'next'
import Link from 'next/link'
import { SPORTS } from '@/data/sports'

export const metadata: Metadata = {
  title: 'Exercices par Sport — Padel, Golf, Tennis, Football…',
  description: 'Programmes de renforcement musculaire spécifiques à votre sport. Padel, golf, tennis, football, basketball, rugby, natation, cyclisme.',
}

export default function SportsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#EDE8E0] mb-3">
          Renforcement par sport
        </h1>
        <p className="text-[#8A9BB5] text-lg max-w-2xl">
          Des exercices ciblés pour améliorer vos performances dans votre discipline. Chaque sport a ses exigences physiques spécifiques.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SPORTS.map(sport => (
          <Link key={sport.id} href={`/sport/${sport.slug}`}
            className="group block p-5 bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] hover:border-[#E63946] hover:shadow-lg transition-all exercise-card">
            <div className="flex items-center gap-3 mb-3">
              {sport.icon
                ? <img src={sport.icon} alt={sport.nom} className="w-10 h-10" />
                : <span className="text-4xl">{sport.emoji}</span>}
              <div>
                <h2 className="font-bold text-[#EDE8E0] text-lg group-hover:text-[#E63946] transition-colors">
                  {sport.nom}
                </h2>
                <p className="text-[#3A4152] text-xs">{sport.exercices.length} exercices ciblés</p>
              </div>
            </div>
            <p className="text-[#5A6478] text-sm leading-relaxed line-clamp-2 mb-4">
              {sport.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sport.besoinsPhysiques.slice(0, 3).map(b => (
                <span key={b} className="text-xs px-2 py-0.5 rounded-full font-medium text-[#8A9BB5]"
                  style={{ background: sport.couleur + '18', color: sport.couleur }}>
                  {b}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
