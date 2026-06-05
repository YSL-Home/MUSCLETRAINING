interface AffiliateProduct {
  nom: string
  prix: string
  description: string
  url: string
  badge?: string
  emoji: string
}

export default function AffiliateCard({ product }: { product: AffiliateProduct }) {
  return (
    <a href={product.url} target="_blank" rel="noopener noreferrer sponsored"
      className="block rounded-2xl p-4 transition-all hover:-translate-y-1 group"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{product.emoji}</span>
        {product.badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(230,57,70,0.12)', color: '#E63946' }}>
            {product.badge}
          </span>
        )}
      </div>
      <p className="font-black text-sm mb-1 group-hover:text-[#E63946] transition-colors" style={{ color: '#EDE8E0' }}>
        {product.nom}
      </p>
      <p className="text-xs mb-3 line-clamp-2" style={{ color: '#5A6478' }}>{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="font-black text-base" style={{ color: '#E63946' }}>{product.prix}</span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: '#E63946', color: '#fff' }}>
          Voir sur Amazon →
        </span>
      </div>
    </a>
  )
}
