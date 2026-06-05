import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Quiz Programme : Trouvez Votre Plan Idéal en 5 Questions | Muscle Training',
  description: 'Répondez à 5 questions sur votre objectif, niveau et équipement pour obtenir votre programme de musculation personnalisé. Résultat immédiat, gratuit.',
  openGraph: {
    title: 'Quiz Programme : Trouvez Votre Plan Idéal en 5 Questions | Muscle Training',
    description: 'Répondez à 5 questions sur votre objectif, niveau et équipement pour obtenir votre programme de musculation personnalisé. Résultat immédiat, gratuit.',
  },
}

export default function QuizPage() {
  return <QuizClient />
}
