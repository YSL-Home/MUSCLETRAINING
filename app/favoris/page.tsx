import type { Metadata } from 'next'
import FavorisClient from './FavorisClient'

export const metadata: Metadata = {
  title: 'Mes Favoris : Exercices & Programmes Sauvegardés | Muscle Training',
  description: 'Retrouvez tous vos exercices de musculation et programmes d\'entraînement sauvegardés en un seul endroit. Accès rapide à vos contenus préférés.',
  openGraph: {
    title: 'Mes Favoris : Exercices & Programmes Sauvegardés | Muscle Training',
    description: 'Retrouvez tous vos exercices de musculation et programmes d\'entraînement sauvegardés en un seul endroit. Accès rapide à vos contenus préférés.',
  },
  robots: { index: false, follow: true },
}

export default function FavorisPage() {
  return <FavorisClient />
}
