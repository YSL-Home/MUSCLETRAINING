import AffiliateCard from '@/components/AffiliateCard'
import { affiliateForMateriel, affiliateForLabels, AFFILIATE_DISCLOSURE } from '@/data/affiliate'
import type { AffiliateProduct } from '@/data/affiliate'
import type { Materiel } from '@/data/exercises'

interface Props {
  materiels?: Materiel[]
  labels?: string[]
  products?: AffiliateProduct[]
  title?: string
  compact?: boolean
}

/**
 * Bloc de produits recommandés (liens affiliés Amazon).
 * Source : `products` direct, sinon `materiels`, sinon `labels` (texte).
 */
export default function AffiliateRecommendations({ materiels, labels, products, title = '🛒 Matériel recommandé', compact = false }: Props) {
  const list = products ?? (labels ? affiliateForLabels(labels) : materiels ? affiliateForMateriel(materiels) : [])
  if (!list.length) return null

  return (
    <section className="mt-10">
      <h2 className={`font-black mb-1 ${compact ? 'text-base' : 'text-xl'}`} style={{ color: '#EDE8E0' }}>{title}</h2>
      <p className="text-xs mb-4" style={{ color: '#3A4152' }}>{AFFILIATE_DISCLOSURE}</p>
      <div className={`grid gap-4 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {list.map(prod => <AffiliateCard key={prod.nom} product={prod} />)}
      </div>
    </section>
  )
}
