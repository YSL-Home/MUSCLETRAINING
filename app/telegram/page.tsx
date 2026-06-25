import type { Metadata } from 'next'
import { TELEGRAM_URL } from '@/lib/social'

export const metadata: Metadata = {
  title: 'Canal Telegram + Programme PDF gratuit — Muscle Training',
  description: 'Rejoins le canal Telegram Muscle Training : 3 conseils musculation par semaine et le programme Full Body 4 semaines en PDF, gratuit.',
  alternates: { canonical: 'https://www.muscletraining.uk/telegram' },
}

const PDFS = [
  { slug: 'full-body-parfait', label: 'Full Body Parfait', sub: '4 jours/semaine · Salle' },
  { slug: 'push-pull-legs',    label: 'Push Pull Legs',    sub: '3 jours/semaine · Hypertrophie' },
  { slug: 'haut-bas',          label: 'Haut / Bas',        sub: '2 jours/semaine · Force & Volume' },
  { slug: 'seance-pectoraux',  label: 'Séance Pectoraux',  sub: '6 exercices poitrine' },
  { slug: 'seance-dos',        label: 'Séance Dos',        sub: '6 exercices dos' },
  { slug: 'seance-bras',       label: 'Séance Bras',       sub: '6 exercices biceps & triceps' },
  { slug: 'seance-jambes',     label: 'Séance Jambes',     sub: '6 exercices quadri & ischio' },
  { slug: 'seance-epaules',    label: 'Séance Épaules',    sub: '6 exercices deltoïdes' },
]

export default function TelegramPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <svg className="w-16 h-16 mx-auto mb-5" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.86 8.78c-.14.62-.51.77-1.03.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.57.28l.2-2.9 5.27-4.76c.23-.2-.05-.32-.35-.12L8.4 13.5l-2.8-.88c-.61-.19-.62-.61.13-.9l10.95-4.22c.51-.18.96.12.78.66z"/></svg>
        <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#EDE8E0' }}>
          Rejoins le canal <span style={{ color: '#229ED9' }}>Telegram</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: '#8A9BB5' }}>
          3 conseils musculation par semaine + 8 programmes PDF gratuits par objectif.
        </p>
      </div>

      {/* Bouton rejoindre */}
      <div className="text-center mb-10">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-2xl font-black" style={{ background: '#229ED9', color: '#fff' }}>
          📲 Rejoindre le canal — gratuit
        </a>
      </div>

      {/* PDFs par objectif */}
      <div className="mb-8">
        <h2 className="text-xl font-black mb-4" style={{ color: '#EDE8E0' }}>🎁 8 programmes PDF gratuits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PDFS.map(({ slug, label, sub }) => (
            <a key={slug} href={`/downloads/programme-${slug}.pdf`} download
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:border-[#E63946]"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.15)', color: '#EDE8E0' }}>
              <span className="text-2xl">📄</span>
              <div>
                <div className="font-black text-sm">{label}</div>
                <div className="text-xs" style={{ color: '#5A6478' }}>{sub}</div>
              </div>
              <span className="ml-auto text-xs font-bold" style={{ color: '#E63946' }}>PDF ↓</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bénéfices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          ['💪', 'Programmes complets', 'Full body, PPL, haut/bas, séances ciblées.'],
          ['🎬', 'Exercices illustrés', 'Chaque exercice avec sa démonstration.'],
          ['🔥', '3 conseils/semaine', 'Technique, nutrition, progression — sans spam.'],
        ].map(([e, t, d]) => (
          <div key={t} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
            <div className="text-3xl mb-2">{e}</div>
            <h3 className="font-black text-sm mb-1" style={{ color: '#EDE8E0' }}>{t}</h3>
            <p className="text-xs leading-relaxed" style={{ color: '#5A6478' }}>{d}</p>
          </div>
        ))}
      </div>

      {/* Bénéfices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ['💪', 'Programmes complets', 'Full body, PPL, haut/bas, séances ciblées — avec illustrations animées.'],
          ['🎬', 'Mouvements en vidéo', 'Chaque exercice avec sa démonstration pour une technique parfaite.'],
          ['🔥', '3 conseils/semaine', 'Technique, nutrition, progression — l\'essentiel, sans spam.'],
        ].map(([e, t, d]) => (
          <div key={t} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
            <div className="text-3xl mb-2">{e}</div>
            <h3 className="font-black text-sm mb-1" style={{ color: '#EDE8E0' }}>{t}</h3>
            <p className="text-xs leading-relaxed" style={{ color: '#5A6478' }}>{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-2xl font-black" style={{ background: '#229ED9', color: '#fff' }}>
          Rejoindre maintenant — c&apos;est gratuit
        </a>
      </div>
    </div>
  )
}
