import type { Metadata } from 'next'
import GenerateurContent from './GenerateurContent'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Générateur de Programme | Muscle Training',
}

export default function GenerateurPage() {
  return <GenerateurContent />
}
