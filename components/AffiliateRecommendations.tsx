import AffiliateCard from '@/components/AffiliateCard'
import { affiliateForMateriel, AFFILIATE_DISCLOSURE } from '@/data/affiliate'
import type { Materiel } from '@/data/exercises'

interface Props {
  materiels: Materiel[]
  title?: string
  compact?: boolean
}

/**
 * Bloc de produits recommandés (liens affiliés Amazon) déduits du matériel.
 * S'affiche uniquement s'il y a des produits pertinents.
 */
export default function AffiliateRecommendations({ materiels, title = '🛒 Matériel recommandé', compact = false }: Props) {
  const products = affiliateForMateriel(materiels)
  if (!products.length) return null

  return (
    <section className="mt-10">
      <h2 className={`font-black mb-1 ${compact ? 'text-base' : 'text-xl'}`} style={{ color: '#EDE8E0' }}>{title}</h2>
      <p className="text-xs mb-4" style={{ color: '#3A4152' }}>{AFFILIATE_DISCLOSURE}</p>
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {products.map(prod => <AffiliateCard key={prod.nom} product={prod} />)}
      </div>
    </section>
  )
}
