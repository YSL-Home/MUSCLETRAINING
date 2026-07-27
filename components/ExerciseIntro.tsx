import intros from '@/data/exercise-intros.json'

interface Props { slug: string }

export default function ExerciseIntro({ slug }: Props) {
  const text = (intros as Record<string, string>)[slug]
  if (!text) return null

  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0)

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-[#EDE8E0] mb-5">À propos de cet exercice</h2>
      <div className="prose-custom space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[#8A9BB5] leading-relaxed text-base">{p}</p>
        ))}
      </div>
    </section>
  )
}
