import type { Metadata } from 'next'
import Link from 'next/link'
import { MUSCLES } from '@/data/muscles'
import { EXERCISES } from '@/data/exercises'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Salle vs Maison : Meilleurs Exercices par Muscle',
  description:
    'Comparez exercices salle et maison pour chaque groupe musculaire. Trouvez le meilleur entraînement selon vos équipements.',
}

export default function ComparatifPage() {
  return (
    <div style={{ background: '#07070F', minHeight: '100vh', color: '#EDE8E0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── HEADER ── */}
        <header className="text-center mb-14">
          <div
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(230,57,70,0.12)',
              color: '#E63946',
              border: '1px solid rgba(230,57,70,0.25)',
            }}
          >
            Comparatif
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Salle vs Maison :{' '}
            <span style={{ color: '#E63946' }}>Exercices par Muscle</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#5A6478' }}>
            Pour chaque groupe musculaire, découvrez les meilleurs exercices selon votre environnement d'entraînement.
          </p>
        </header>

        {/* ── LÉGENDE ── */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(230,57,70,0.15)',
              color: '#EDE8E0',
            }}
          >
            <span>🏋️</span>
            <span>Salle</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(230,57,70,0.15)',
              color: '#EDE8E0',
            }}
          >
            <span>🏠</span>
            <span>Maison</span>
          </div>
        </div>

        {/* ── SECTIONS PAR MUSCLE ── */}
        <div className="space-y-8">
          {MUSCLES.map((muscle) => {
            const salleExos = EXERCISES.filter(
              (ex) =>
                (ex.musclesPrimaires.includes(muscle.id) || ex.musclesSecondaires.includes(muscle.id)) &&
                (ex.mode === 'salle' || ex.mode === 'les-deux')
            )
            const maisonExos = EXERCISES.filter(
              (ex) =>
                (ex.musclesPrimaires.includes(muscle.id) || ex.musclesSecondaires.includes(muscle.id)) &&
                (ex.mode === 'maison' || ex.mode === 'les-deux')
            )

            if (salleExos.length === 0 && maisonExos.length === 0) return null

            return (
              <section key={muscle.id}>
                {/* Titre muscle */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(230,57,70,0.1)',
                  }}
                >
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <span style={{ color: '#E63946' }}>{muscle.emoji}</span>
                    <span style={{ color: '#EDE8E0' }}>{muscle.nom}</span>
                    <span
                      className="text-xs font-normal ml-1 px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(230,57,70,0.1)',
                        color: '#E63946',
                        border: '1px solid rgba(230,57,70,0.2)',
                      }}
                    >
                      {salleExos.length + maisonExos.length} exercices
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Colonne Salle */}
                    <div>
                      <h3
                        className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                        style={{ color: '#E63946' }}
                      >
                        <span>🏋️</span>
                        <span>Salle ({salleExos.length})</span>
                      </h3>
                      {salleExos.length > 0 ? (
                        <ul className="space-y-2">
                          {salleExos.map((ex) => (
                            <li key={ex.slug}>
                              <Link
                                href={`/exercice/${ex.slug}`}
                                className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-colors duration-200 group"
                                style={{ color: '#EDE8E0' }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
                                  style={{ background: 'rgba(230,57,70,0.5)' }}
                                />
                                <span className="group-hover:underline" style={{ textDecorationColor: '#E63946' }}>
                                  {ex.nom}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm italic" style={{ color: '#3A4152' }}>
                          Aucun exercice salle référencé.
                        </p>
                      )}
                    </div>

                    {/* Colonne Maison */}
                    <div>
                      <h3
                        className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                        style={{ color: '#E63946' }}
                      >
                        <span>🏠</span>
                        <span>Maison ({maisonExos.length})</span>
                      </h3>
                      {maisonExos.length > 0 ? (
                        <ul className="space-y-2">
                          {maisonExos.map((ex) => (
                            <li key={ex.slug}>
                              <Link
                                href={`/exercice/${ex.slug}`}
                                className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-colors duration-200 group"
                                style={{ color: '#EDE8E0' }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
                                  style={{ background: 'rgba(230,57,70,0.5)' }}
                                />
                                <span className="group-hover:underline" style={{ textDecorationColor: '#E63946' }}>
                                  {ex.nom}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm italic" style={{ color: '#3A4152' }}>
                          Aucun exercice maison référencé.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* ── CTA BAS DE PAGE ── */}
        <div className="text-center mt-14">
          <Link
            href="/generateur"
            className="inline-block px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#E63946', color: '#07070F' }}
          >
            Générer mon programme →
          </Link>
        </div>
      </div>
    </div>
  )
}
