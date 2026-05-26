import Link from 'next/link'

interface Crumb {
  nom: string
  url?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center flex-wrap gap-1.5 text-sm">
      {crumbs.map((crumb, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && (
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {crumb.url ? (
            <Link
              href={crumb.url}
              className="text-slate-500 hover:text-lime-500 font-medium transition-colors"
            >
              {crumb.nom}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold">{crumb.nom}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
