import type { Metadata } from 'next'
import Link from 'next/link'
import ProgrammeCard from '@/components/ProgrammeCard'
import { PROGRAMMES } from '@/data/programmes'

export const metadata: Metadata = {
  title: 'Programmes d\'entraînement — Salle & Maison',
  description: 'Programmes de musculation complets pour la salle et la maison. Débutant, intermédiaire, avancé. Force, hypertrophie, perte de poids. Gratuit.',
}

export default function ProgrammesPage() {
  const salle = PROGRAMMES.filter(p => p.mode === 'salle')
  const maison = PROGRAMMES.filter(p => p.mode === 'maison')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#EDE8E0] mb-3">Programmes d&apos;entraînement</h1>
        <p className="text-[#8A9BB5] text-lg max-w-2xl">
          Des plans complets clé-en-main, optimisés pour la salle ou la maison. Chaque exercice a sa vidéo technique.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-3 mb-10 flex-wrap">
        <Link href="/programmes/salle" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">
          🏋️ Programmes Salle ({salle.length})
        </Link>
        <Link href="/programmes/maison" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors">
          🏠 Programmes Maison ({maison.length})
        </Link>
      </div>

      {/* Salle */}
      <section className="mb-14">
        <h2 className="text-2xl font-black text-[#EDE8E0] mb-6 flex items-center gap-3">
          🏋️ Salle de sport
          <span className="text-sm font-normal text-[#5A6478]">Avec barre, haltères et machines</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {salle.map(p => <ProgrammeCard key={p.slug} programme={p} />)}
        </div>
      </section>

      {/* Maison */}
      <section>
        <h2 className="text-2xl font-black text-[#EDE8E0] mb-6 flex items-center gap-3">
          🏠 Maison
          <span className="text-sm font-normal text-[#5A6478]">Sans matériel ou minimal</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {maison.map(p => <ProgrammeCard key={p.slug} programme={p} />)}
        </div>
      </section>
    </div>
  )
}
