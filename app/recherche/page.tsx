import type { Metadata } from 'next'
import RechercheContent from './RechercheContent'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Recherche | Muscle Training',
}

export default function RecherchePage() {
  return <RechercheContent />
}
