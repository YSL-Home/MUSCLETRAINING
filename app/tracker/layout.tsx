import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Mon Tracker — Suivi Entraînements & Records',
  description: 'Suivez vos séances, poids soulevés et records personnels. Tracker musculation gratuit sans inscription.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
