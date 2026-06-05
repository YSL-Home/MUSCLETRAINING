import type { Metadata } from 'next'
import Link from 'next/link'
import ExerciseCard from '@/components/ExerciseCard'
import { EXERCISES } from '@/data/exercises'

export const metadata: Metadata = {
  title: 'Routine du Matin 10 Min : 9 Exercices pour Bien Démarrer',
  description:
    'Routine matinale complète en 10 minutes : mobilité, gainage et activation. Pilates + poids du corps, zéro matériel.',
}

const SLUGS = [
  'dead-bug',
  'bird-dog',
  'hollow-body',
  'planche',
  'mountain-climbers',
  'swimming-pilates',
  'roll-up',
  'planche-commando',
  'wall-sit',
]

const BENEFICES = [
  {
    icon: '🦵',
    titre: 'Mobilité',
    texte: 'Réveillez vos articulations et gagnez en amplitude dès le matin pour éviter les raideurs.',
  },
  {
    icon: '🧍',
    titre: 'Posture',
    texte: 'Activez les muscles profonds qui maintiennent votre colonne et améliorent votre alignement.',
  },
  {
    icon: '⚡',
    titre: 'Énergie',
    texte: 'Boostez votre circulation sanguine et votre vigilance sans café ni stimulants.',
  },
  {
    icon: '🧠',
    titre: 'Mental',
    texte: 'Démarrez la journée avec une victoire concrète qui renforce la discipline et la confiance.',
  },
]

const CONSEILS = [
  {
    num: '01',
    titre: 'Respirez',
    texte: 'Chaque exercice doit être synchronisé avec la respiration. Expirez à l\'effort, inspirez au relâchement.',
  },
  {
    num: '02',
    titre: 'Progressez',
    texte: 'Commencez avec les répétitions basses. Augmentez de 1-2 reps chaque semaine pour progresser sans vous blesser.',
  },
  {
    num: '03',
    titre: 'Soyez régulier',
    texte: '10 minutes tous les matins valent mieux qu\'1 heure une fois par semaine. La constance fait tout.',
  },
]

export default function RoutineMatinPage() {
  const exercises = SLUGS.map((slug) => EXERCISES.find((e) => e.slug === slug)).filter(
    Boolean
  ) as (typeof EXERCISES)[number][]

  return (
    <div style={{ background: '#07070F', minHeight: '100vh', color: '#EDE8E0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── HERO ── */}
        <section className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(230,57,70,0.12)', color: '#E63946', border: '1px solid rgba(230,57,70,0.25)' }}>
            Routine matinale
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ color: '#EDE8E0' }}>
            Routine du Matin{' '}
            <span style={{ color: '#E63946' }}>10 Minutes</span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-10"
            style={{ color: '#5A6478' }}>
            9 exercices Pilates et poids du corps pour activer le corps, améliorer la posture et démarrer la journée avec énergie. Zéro matériel requis.
          </p>

          {/* Stats chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: '⏱', label: '10 min' },
              { icon: '💪', label: '9 exercices' },
              { icon: '🟢', label: 'Débutant' },
              { icon: '🏠', label: '0 matériel' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(230,57,70,0.1)',
                  border: '1px solid rgba(230,57,70,0.25)',
                  color: '#E63946',
                }}
              >
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── BÉNÉFICES ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#EDE8E0' }}>
            Pourquoi cette routine ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFICES.map((b) => (
              <div
                key={b.titre}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(230,57,70,0.1)',
                }}
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: '#E63946' }}>
                  {b.titre}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A6478' }}>
                  {b.texte}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LA ROUTINE ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#EDE8E0' }}>
            La Routine
          </h2>
          <p className="text-center mb-8" style={{ color: '#5A6478' }}>
            Enchaînez les exercices dans l'ordre. Reposez-vous 30 secondes entre chaque.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exercises.map((exercise, index) => (
              <div key={exercise.slug} className="relative">
                {/* Numéro */}
                <div
                  className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(230,57,70,0.9)',
                    color: '#07070F',
                  }}
                >
                  {index + 1}
                </div>
                <ExerciseCard exercise={exercise} />
              </div>
            ))}
          </div>
        </section>

        {/* ── CONSEILS ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#EDE8E0' }}>
            3 conseils pratiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONSEILS.map((c) => (
              <div
                key={c.num}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(230,57,70,0.1)',
                }}
              >
                <div
                  className="text-3xl font-black mb-3"
                  style={{ color: 'rgba(230,57,70,0.3)' }}
                >
                  {c.num}
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#EDE8E0' }}>
                  {c.titre}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A6478' }}>
                  {c.texte}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center">
          <div
            className="inline-block rounded-3xl px-8 py-10"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(230,57,70,0.15)',
            }}
          >
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#EDE8E0' }}>
              Envie d&apos;une routine personnalisée ?
            </h2>
            <p className="mb-6" style={{ color: '#5A6478' }}>
              Générez un programme sur-mesure selon votre niveau, objectif et équipement disponible.
            </p>
            <Link
              href="/generateur"
              className="inline-block px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: '#E63946',
                color: '#07070F',
              }}
            >
              Créer ma routine →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
