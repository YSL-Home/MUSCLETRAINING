import type { Metadata } from 'next'
import ProgrammeCard from '@/components/ProgrammeCard'
import { getProgrammesByMode } from '@/data/programmes'

export const metadata: Metadata = {
  title: 'Programmes Maison Sans Matériel — Poids du Corps',
  description: 'Programmes de musculation à la maison sans matériel. Calisthenics, HIIT, Full body. Pour débutants et avancés. Exercices avec vidéos YouTube.',
}

export default function ProgrammesMaisonPage() {
  const programmes = getProgrammesByMode('maison')
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-green-600 font-bold text-sm mb-2">🏠 Maison</div>
        <h1 className="text-4xl font-black text-[#EDE8E0] mb-3">Programmes Maison</h1>
        <p className="text-[#8A9BB5] text-lg max-w-2xl">Programmes sans matériel ou avec minimal (barre de traction). Efficaces, progressifs et avec vidéos pour chaque exercice.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programmes.map(p => <ProgrammeCard key={p.slug} programme={p} />)}
      </div>
    </div>
  )
}
