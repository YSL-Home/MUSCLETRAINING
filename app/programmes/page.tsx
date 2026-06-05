import type { Metadata } from 'next'
import Link from 'next/link'
import ProgrammeCard from '@/components/ProgrammeCard'
import { PROGRAMMES, PROFIL_LABEL } from '@/data/programmes'
import type { ProfilProgramme } from '@/data/programmes'

export const metadata: Metadata = {
  title: 'Programmes d\'entraînement — Avec ou sans matériel',
  description: 'Programmes de musculation complets avec ou sans matériel. Tous niveaux, tous profils (homme, femme, senior, ado). Force, hypertrophie, perte de poids.',
}

export default function ProgrammesPage() {
  const salle = PROGRAMMES.filter(p => p.mode === 'salle')
  const maison = PROGRAMMES.filter(p => p.mode === 'maison')

  const profilsActifs = Array.from(new Set(PROGRAMMES.flatMap(p => p.profils ?? []))) as ProfilProgramme[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#EDE8E0] mb-3">Programmes d&apos;entraînement</h1>
        <p className="text-[#8A9BB5] text-lg max-w-2xl">
          Des plans complets clé-en-main, avec ou sans matériel, pour tous les profils et tous les objectifs.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <Link href="/programmes/salle" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-[#E63946] bg-[rgba(230,57,70,0.08)] hover:bg-[rgba(230,57,70,0.15)] border border-[rgba(230,57,70,0.25)] transition-colors">
          🏋️ Avec matériel ({salle.length})
        </Link>
        <Link href="/programmes/maison" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors">
          🏠 Sans matériel ({maison.length})
        </Link>
      </div>

      {/* Profil chips */}
      {profilsActifs.length > 0 && (
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#3A4152' }}>Filtrer par profil</p>
          <div className="flex flex-wrap gap-2">
            {profilsActifs.map(p => (
              <span key={p} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#8A9BB5', border: '1px solid rgba(230,57,70,0.12)' }}>
                {PROFIL_LABEL[p]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Salle */}
      <section className="mb-14">
        <h2 className="text-2xl font-black text-[#EDE8E0] mb-6 flex items-center gap-3">
          🏋️ Avec matériel
          <span className="text-sm font-normal text-[#5A6478]">Barre, haltères, machines</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {salle.map(p => <ProgrammeCard key={p.slug} programme={p} />)}
        </div>
      </section>

      {/* Maison */}
      <section>
        <h2 className="text-2xl font-black text-[#EDE8E0] mb-6 flex items-center gap-3">
          🏠 Sans matériel
          <span className="text-sm font-normal text-[#5A6478]">Poids du corps uniquement</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {maison.map(p => <ProgrammeCard key={p.slug} programme={p} />)}
        </div>
      </section>
    </div>
  )
}
