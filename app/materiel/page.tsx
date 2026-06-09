import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import { MATERIEL_DATA } from '@/data/materiel'
import AffiliateRecommendations from '@/components/AffiliateRecommendations'
import { AFFILIATE_ESSENTIALS } from '@/data/affiliate'

export const metadata: Metadata = {
  title: 'Exercices par Matériel — Barre, Haltères, Poids du Corps, Machine',
  description: 'Trouvez les meilleurs exercices selon votre matériel disponible : barre, haltères, poids du corps, câble, machine, élastiques, kettlebell.',
}

export default function MaterielPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb crumbs={[{ nom: 'Accueil', url: '/' }, { nom: 'Matériel' }]} />
      <div className="mt-6 mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-[#EDE8E0] mb-2">Exercices par <span style={{ color: '#b8d400' }}>Matériel</span></h1>
        <p className="text-[#5A6478]">Trouvez les exercices adaptés à votre équipement disponible.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(MATERIEL_DATA).map(([slug, mat]) => (
          <Link key={slug} href={`/materiel/${slug}`}
            className="group bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] hover:border-[#E63946] hover:shadow-md transition-all p-5">
            <div className="text-3xl mb-3">{mat.emoji}</div>
            <h2 className="font-black text-[#EDE8E0] mb-1 group-hover:text-[#E63946] transition-colors">{mat.nom}</h2>
            <p className="text-[#5A6478] text-sm line-clamp-2 mb-3">{mat.description}</p>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#b8d40015', color: '#b8d400' }}>
              {mat.exercicesIds.length} exercices
            </span>
          </Link>
        ))}
      </div>

      <AffiliateRecommendations products={AFFILIATE_ESSENTIALS} title="🛒 Les essentiels pour s'équiper" />
    </div>
  )
}
