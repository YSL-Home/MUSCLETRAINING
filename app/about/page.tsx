import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — Muscle Training',
  description: 'Muscle Training : la référence francophone de la musculation. Exercices avec vidéos, programmes, calisthénics et conseils gratuits.',
  alternates: { canonical: 'https://www.muscletraining.uk/about' },
}

const P = ({ children }: { children: React.ReactNode }) => <p className="mb-4 leading-relaxed" style={{ color: '#8A9BB5' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-black mt-8 mb-3" style={{ color: '#EDE8E0' }}>{children}</h2>

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black mb-6" style={{ color: '#EDE8E0' }}>À propos de Muscle Training</h1>
      <P>Muscle Training est une plateforme francophone dédiée à la musculation et au fitness. Notre mission : rendre l&apos;entraînement accessible à tous, du débutant à l&apos;athlète confirmé, avec des contenus clairs, illustrés et gratuits.</P>

      <H>Ce que vous trouverez</H>
      <P>Une bibliothèque de plus de 80 exercices avec vidéos de démonstration, des programmes pour la salle et la maison, des challenges calisthénics, des guides par groupe musculaire, des outils (générateur de séance, suivi de progression, calculateurs) et un blog de conseils sur la technique, la nutrition et la récupération.</P>

      <H>Notre approche</H>
      <P>Chaque exercice est présenté avec sa technique, les muscles ciblés, les erreurs à éviter et une illustration animée du mouvement. Les programmes sont structurés et progressifs, pensés pour des résultats réels et durables.</P>

      <H>Gratuit et indépendant</H>
      <P>Le site est financé par la publicité et des liens d&apos;affiliation, ce qui nous permet de garder l&apos;ensemble des contenus accessibles gratuitement.</P>

      <H>Rester connecté</H>
      <P>Rejoignez notre <a href="/telegram" style={{ color: '#E63946' }}>canal Telegram</a> pour recevoir 3 conseils par semaine et un programme PDF offert.</P>
    </div>
  )
}
