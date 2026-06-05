import type { Metadata } from 'next'
import ProgrammeCard from '@/components/ProgrammeCard'
import { getProgrammesByMode } from '@/data/programmes'

export const metadata: Metadata = {
  title: 'Programmes Salle de Sport — Force & Hypertrophie',
  description: 'Programmes de musculation en salle : PPL, Full Body, Upper/Lower. Débutant à avancé. Exercices avec vidéos YouTube, séries et temps de repos.',
}

export default function ProgrammesSallePage() {
  const programmes = getProgrammesByMode('salle')
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-blue-600 font-bold text-sm mb-2">🏋️ Salle de sport</div>
        <h1 className="text-4xl font-black text-[#EDE8E0] mb-3">Programmes Salle</h1>
        <p className="text-[#8A9BB5] text-lg max-w-2xl">Programmes conçus pour la salle de sport avec barre, haltères et machines. Progressions claires et exercices avec vidéos.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programmes.map(p => <ProgrammeCard key={p.slug} programme={p} />)}
      </div>
    </div>
  )
}
