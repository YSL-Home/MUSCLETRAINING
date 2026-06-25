import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Muscle Training',
  description: 'Contactez Muscle Training pour toute question, partenariat ou signalement.',
  alternates: { canonical: 'https://www.muscletraining.uk/contact' },
}

const P = ({ children }: { children: React.ReactNode }) => <p className="mb-4 leading-relaxed" style={{ color: '#8A9BB5' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-black mt-8 mb-3" style={{ color: '#EDE8E0' }}>{children}</h2>

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black mb-6" style={{ color: '#EDE8E0' }}>Contact</h1>
      <P>Pour toute question, suggestion, demande de partenariat ou signalement d&apos;un contenu, contactez-nous par e-mail.</P>

      <H>E-mail</H>
      <P><a href="mailto:contact@muscletraining.uk" style={{ color: '#E63946' }}>contact@muscletraining.uk</a></P>

      <H>Canal Telegram</H>
      <P>Pour des réponses rapides et des conseils hebdomadaires, rejoignez notre <a href="https://t.me/muscletrainiing" target="_blank" rel="noopener noreferrer" style={{ color: '#E63946' }}>canal Telegram @muscletrainiing</a>.</P>

      <H>Partenariats & affiliation</H>
      <P>Pour toute proposition de partenariat ou de collaboration, envoyez un e-mail à <a href="mailto:contact@muscletraining.uk" style={{ color: '#E63946' }}>contact@muscletraining.uk</a> avec l&apos;objet « Partenariat ».</P>

      <H>Droits & données personnelles (RGPD)</H>
      <P>Pour exercer vos droits d&apos;accès, de rectification ou de suppression de vos données, écrivez à <a href="mailto:contact@muscletraining.uk" style={{ color: '#E63946' }}>contact@muscletraining.uk</a>. Consultez notre <a href="/privacy" style={{ color: '#E63946' }}>politique de confidentialité</a> pour plus d&apos;informations.</P>
    </div>
  )
}
