import type { Metadata } from 'next'
import ProgrammeCard from '@/components/ProgrammeCard'
import { getProgrammesByMode } from '@/data/programmes'

export const metadata: Metadata = {
  title: 'Programmes Sans Matériel — Poids du Corps',
  description: 'Programmes de musculation sans matériel : calisthenics, HIIT, full body, pilates, remise en forme, sèche. Pour tous niveaux et tous profils.',
}

export default function ProgrammesMaisonPage() {
  const programmes = getProgrammesByMode('maison')
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="text-emerald-400 font-bold text-sm mb-2">🏠 Sans matériel</div>
        <h1 className="text-4xl font-black text-[#EDE8E0] mb-3">Programmes sans matériel</h1>
        <p className="text-[#8A9BB5] text-lg max-w-2xl">Programmes au poids du corps (parfois avec barre de traction ou élastique). Efficaces, progressifs, vidéos pour chaque exercice.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programmes.map(p => <ProgrammeCard key={p.slug} programme={p} />)}
      </div>
    </div>
  )
}
