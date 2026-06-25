import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Muscle Training',
  description: 'Politique de confidentialité de Muscle Training : cookies, publicités Google AdSense, liens affiliés et données personnelles.',
  alternates: { canonical: 'https://www.muscletraining.uk/privacy' },
}

const P = ({ children }: { children: React.ReactNode }) => <p className="mb-4 leading-relaxed" style={{ color: '#8A9BB5' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-black mt-8 mb-3" style={{ color: '#EDE8E0' }}>{children}</h2>

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black mb-2" style={{ color: '#EDE8E0' }}>Politique de confidentialité</h1>
      <p className="text-sm mb-8" style={{ color: '#3A4152' }}>Dernière mise à jour : juin 2026</p>

      <P>Muscle Training (« nous ») respecte votre vie privée. Cette page explique quelles données sont collectées et comment elles sont utilisées sur muscletraining.uk.</P>

      <H>Données collectées</H>
      <P>Nous ne demandons pas de création de compte. Les données techniques (pages visitées, navigateur, appareil) sont collectées de façon anonyme via des outils de mesure d&apos;audience afin d&apos;améliorer le site.</P>

      <H>Cookies et publicités (Google AdSense)</H>
      <P>Ce site utilise Google AdSense pour afficher des publicités. Google et ses partenaires utilisent des cookies pour diffuser des annonces basées sur vos visites antérieures sur ce site et d&apos;autres sites. Les fournisseurs tiers, dont Google, utilisent des cookies (comme le cookie DART) pour diffuser des annonces.</P>
      <P>Vous pouvez désactiver la publicité personnalisée en visitant les <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#E63946' }}>Paramètres des annonces Google</a>, ou vous opposer à l&apos;utilisation de cookies par des fournisseurs tiers via <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: '#E63946' }}>aboutads.info</a>.</P>

      <H>Liens d&apos;affiliation</H>
      <P>Certains liens sont des liens affiliés (notamment Amazon). En tant que Partenaire Amazon, nous percevons une commission sur les achats remplissant les conditions requises, sans surcoût pour vous.</P>

      <H>Vos droits (RGPD)</H>
      <P>Conformément au RGPD, vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données. Contactez-nous via la page <a href="/contact" style={{ color: '#E63946' }}>Contact</a>.</P>

      <H>Consentement</H>
      <P>En utilisant ce site, vous consentez à cette politique de confidentialité.</P>
    </div>
  )
}
