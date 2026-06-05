import Link from 'next/link'
import { getExerciseBySlug } from '@/data/exercises'

interface Props {
  currentSlug: string
  varianteSlugs: string[]
}

const DIFF_COLOR: Record<string, string> = {
  debutant: '#4ADE80',
  intermediaire: '#FBBF24',
  avance: '#F87171',
}
const DIFF_LABEL: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
}

export default function ProgressionMap({ currentSlug, varianteSlugs }: Props) {
  const current = getExerciseBySlug(currentSlug)
  if (!current) return null

  const variantes = varianteSlugs
    .map(s => getExerciseBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getExerciseBySlug>>[]

  if (variantes.length === 0) return null

  // Build the full list: current + variantes for the scroll strip
  const allItems = [{ ex: current, isCurrent: true }, ...variantes.map(ex => ({ ex, isCurrent: false }))]

  return (
    <section className="mt-10 mb-2">
      <h2 className="text-xl font-bold mb-5" style={{ color: '#EDE8E0' }}>
        Progressions &amp; Variantes
      </h2>

      <div className="flex items-center gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'thin' }}>
        {allItems.map(({ ex, isCurrent }, index) => (
          <div key={ex.slug} className="flex items-center gap-3 flex-shrink-0">
            {/* Card */}
            {isCurrent ? (
              <div
                className="w-32 flex-shrink-0 rounded-xl overflow-hidden"
                style={{
                  background: '#0C0C1A',
                  border: '2px solid #E63946',
                  boxShadow: '0 0 12px rgba(230,57,70,0.2)',
                }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${ex.videoYoutube}/mqdefault.jpg`}
                    alt={ex.nom}
                    className="w-full h-full object-cover opacity-70"
                    loading="lazy"
                  />
                  {/* "Actuel" label */}
                  <div
                    className="absolute top-1.5 left-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full"
                    style={{ background: '#E63946', color: '#07070F' }}
                  >
                    Actuel
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-bold leading-tight line-clamp-2" style={{ color: '#EDE8E0' }}>
                    {ex.nom}
                  </p>
                  <p
                    className="text-[9px] font-semibold mt-1"
                    style={{ color: DIFF_COLOR[ex.difficulte] ?? '#E63946' }}
                  >
                    {DIFF_LABEL[ex.difficulte] ?? ex.difficulte}
                  </p>
                </div>
              </div>
            ) : (
              <Link href={`/exercice/${ex.slug}`} className="block w-32 flex-shrink-0">
                <div
                  className="rounded-xl overflow-hidden transition-all duration-150 hover:scale-105"
                  style={{
                    background: '#0C0C1A',
                    border: '1px solid rgba(230,57,70,0.2)',
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${ex.videoYoutube}/mqdefault.jpg`}
                      alt={ex.nom}
                      className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] font-bold leading-tight line-clamp-2" style={{ color: '#EDE8E0' }}>
                      {ex.nom}
                    </p>
                    <p
                      className="text-[9px] font-semibold mt-1"
                      style={{ color: DIFF_COLOR[ex.difficulte] ?? '#E63946' }}
                    >
                      {DIFF_LABEL[ex.difficulte] ?? ex.difficulte}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Arrow between items */}
            {index < allItems.length - 1 && (
              <svg
                className="flex-shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="rgba(230,57,70,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
