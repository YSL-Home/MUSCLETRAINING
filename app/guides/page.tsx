import type { Metadata } from 'next'
import Link from 'next/link'
import { MUSCLES } from '@/data/muscles'
import { getExercisesByMuscleAndMode } from '@/data/exercises'

export const metadata: Metadata = {
  title: 'Guides d\'exercices par muscle — Maison & Salle',
  description: 'Tous les guides d\'exercices de musculation par groupe musculaire, à la maison (sans matériel) ou en salle (avec matériel). Vidéos et conseils.',
}

export default function GuidesHubPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-black mb-3" style={{ color: '#EDE8E0' }}>Guides d&apos;exercices</h1>
      <p className="text-lg mb-10 max-w-2xl" style={{ color: '#8A9BB5' }}>
        Les meilleurs exercices pour chaque muscle, classés par lieu d&apos;entraînement.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MUSCLES.map(m => {
          const maison = getExercisesByMuscleAndMode(m.id, 'maison').length
          const salle = getExercisesByMuscleAndMode(m.id, 'salle').length
          return (
            <div key={m.id} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: m.couleurSvg }} />
                <h2 className="font-black" style={{ color: '#EDE8E0' }}>{m.nom}</h2>
              </div>
              <div className="flex flex-col gap-2">
                {salle > 0 && (
                  <Link href={`/guides/exercices-${m.slug}-salle`}
                    className="text-sm transition-colors hover:text-[#E63946]" style={{ color: '#8A9BB5' }}>
                    🏋️ {salle} exercices en salle →
                  </Link>
                )}
                {maison > 0 && (
                  <Link href={`/guides/exercices-${m.slug}-maison`}
                    className="text-sm transition-colors hover:text-[#E63946]" style={{ color: '#8A9BB5' }}>
                    🏠 {maison} exercices à la maison →
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
