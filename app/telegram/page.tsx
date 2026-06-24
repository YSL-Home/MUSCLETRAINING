import type { Metadata } from 'next'
import { TELEGRAM_URL } from '@/lib/social'

export const metadata: Metadata = {
  title: 'Canal Telegram + Programme PDF gratuit — Muscle Training',
  description: 'Rejoins le canal Telegram Muscle Training : 3 conseils musculation par semaine et le programme Full Body 4 semaines en PDF, gratuit.',
  alternates: { canonical: 'https://www.muscletraining.uk/telegram' },
}

const PDF = '/downloads/programme-full-body-4-semaines.pdf'

export default function TelegramPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <svg className="w-16 h-16 mx-auto mb-5" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.86 8.78c-.14.62-.51.77-1.03.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.57.28l.2-2.9 5.27-4.76c.23-.2-.05-.32-.35-.12L8.4 13.5l-2.8-.88c-.61-.19-.62-.61.13-.9l10.95-4.22c.51-.18.96.12.78.66z"/></svg>
        <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#EDE8E0' }}>
          Rejoins le canal <span style={{ color: '#229ED9' }}>Telegram</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: '#8A9BB5' }}>
          3 conseils musculation par semaine + des programmes complets, gratuitement. Et reçois ton <strong style={{ color: '#EDE8E0' }}>programme PDF offert</strong>.
        </p>
      </div>

      {/* Offre PDF */}
      <div className="rounded-2xl p-6 mb-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.12), rgba(230,57,70,0.04))', border: '1px solid rgba(230,57,70,0.3)' }}>
        <div className="text-4xl mb-3">🎁</div>
        <h2 className="text-xl font-black mb-2" style={{ color: '#EDE8E0' }}>Programme Full Body 4 semaines — PDF gratuit</h2>
        <p className="text-sm mb-5" style={{ color: '#8A9BB5' }}>4 jours/semaine, exercices illustrés, séries &amp; répétitions. Imprime-le et suis-le à la salle.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: '#229ED9', color: '#fff' }}>
            📲 Rejoindre le canal
          </a>
          <a href={PDF} download
            className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(255,255,255,0.06)', color: '#EDE8E0', border: '1px solid rgba(230,57,70,0.25)' }}>
            ⬇ Télécharger le PDF
          </a>
        </div>
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
