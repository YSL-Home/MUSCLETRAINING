import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import ExerciseCard from '@/components/ExerciseCard'
import AffiliateCard from '@/components/AffiliateCard'
import { MATERIEL_DATA } from '@/data/materiel'
import { getExerciseBySlug } from '@/data/exercises'

const AFFILIATES: Record<string, { nom: string; prix: string; description: string; url: string; badge?: string; emoji: string }[]> = {
  'barre': [
    { nom: 'Barre Olympique 20kg', prix: '~180€', description: 'Barre olympique 2m, 20kg, rotule roulements. Standard salle de sport.', url: 'https://www.amazon.fr/s?k=barre+olympique+20kg&tag=muscletrainin-21', badge: 'Meilleure vente', emoji: '🏋️' },
    { nom: 'Barre EZ curl', prix: '~45€', description: 'Barre ondulée pour biceps et triceps. Réduit la tension sur les poignets.', url: 'https://www.amazon.fr/s?k=barre+ez+curl&tag=muscletrainin-21', emoji: '💪' },
  ],
  'halteres': [
    { nom: 'Haltères Réglables 2-32kg', prix: '~120€', description: 'Paire d\'haltères réglables remplace 15 paires. Idéal maison.', url: 'https://www.amazon.fr/s?k=halteres+reglables+32kg&tag=muscletrainin-21', badge: 'Rapport qualité/prix', emoji: '🏋️' },
    { nom: 'Set Haltères Hexagonaux', prix: '~80€', description: 'Set 4 paires d\'haltères néoprène 4-10kg. Parfait débutant.', url: 'https://www.amazon.fr/s?k=set+halteres+hexagonaux&tag=muscletrainin-21', emoji: '💪' },
  ],
  'barre-de-traction': [
    { nom: 'Barre de Traction Porte', prix: '~30€', description: 'S\'installe sans perçage en 5 min. Jusqu\'à 150kg. Incontournable.', url: 'https://www.amazon.fr/s?k=barre+traction+porte&tag=muscletrainin-21', badge: 'Meilleure vente', emoji: '🔝' },
    { nom: 'Station Traction + Dips', prix: '~150€', description: 'Station complète : tractions, dips, pompes surélevées. Multi-usage.', url: 'https://www.amazon.fr/s?k=station+traction+dips&tag=muscletrainin-21', badge: 'Premium', emoji: '🏋️' },
  ],
  'elastique': [
    { nom: 'Kit 5 Élastiques', prix: '~25€', description: '5 résistances différentes (10-40kg). Pour tous les exercices.', url: 'https://www.amazon.fr/s?k=kit+elastiques+musculation&tag=muscletrainin-21', badge: 'Meilleure vente', emoji: '🔴' },
    { nom: 'Élastiques Longs Power', prix: '~35€', description: 'Pour tractions assistées, squats et exercices full body.', url: 'https://www.amazon.fr/s?k=elastiques+longs+musculation&tag=muscletrainin-21', emoji: '💪' },
  ],
  'kettlebell': [
    { nom: 'Kettlebell 16kg', prix: '~35€', description: 'Fonte coulée, poignée ergonomique. Le 16kg est idéal pour débuter.', url: 'https://www.amazon.fr/s?k=kettlebell+16kg&tag=muscletrainin-21', badge: 'Rapport qualité/prix', emoji: '🔔' },
    { nom: 'Set Kettlebells 8-24kg', prix: '~120€', description: '3 kettlebells (8, 16, 24kg) pour progresser sur le long terme.', url: 'https://www.amazon.fr/s?k=set+kettlebells&tag=muscletrainin-21', emoji: '🏋️' },
  ],
  'banc': [
    { nom: 'Banc Réglable Inclinable', prix: '~80€', description: 'Multi-position : plat, incliné, décliné. Robuste jusqu\'à 300kg.', url: 'https://www.amazon.fr/s?k=banc+musculation+reglable&tag=muscletrainin-21', badge: 'Meilleure vente', emoji: '🛏️' },
    { nom: 'Banc Plat Pro', prix: '~120€', description: 'Banc plat ultra-stable, rembourrage dense. Pour charges lourdes.', url: 'https://www.amazon.fr/s?k=banc+plat+musculation&tag=muscletrainin-21', badge: 'Premium', emoji: '💺' },
  ],
  'poids-corps': [
    { nom: 'Tapis de Sol Épais 15mm', prix: '~30€', description: 'Tapis yoga/fitness 183×61cm, 15mm d\'épaisseur. Anti-dérapant.', url: 'https://www.amazon.fr/s?k=tapis+yoga+musculation+épais&tag=muscletrainin-21', badge: 'Meilleure vente', emoji: '🟫' },
    { nom: 'Anneaux de Gym', prix: '~35€', description: 'Anneaux en bois, sangles réglables. Pour dips, tractions et muscle-up.', url: 'https://www.amazon.fr/s?k=anneaux+gym+bois&tag=muscletrainin-21', emoji: '⭕' },
  ],
}

export async function generateStaticParams() {
  return Object.keys(MATERIEL_DATA).map(slug => ({ materiel: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ materiel: string }> }): Promise<Metadata> {
  const { materiel: slug } = await params
  const mat = MATERIEL_DATA[slug]
  if (!mat) return {}
  return { title: `Exercices ${mat.nom} — ${mat.exercicesIds.length} Mouvements`, description: mat.descriptionSeo }
}

export default async function MaterielPage({ params }: { params: Promise<{ materiel: string }> }) {
  const { materiel: slug } = await params
  const mat = MATERIEL_DATA[slug]
  if (!mat) notFound()

  const exercises = mat.exercicesIds.map(id => getExerciseBySlug(id)).filter(Boolean) as NonNullable<ReturnType<typeof getExerciseBySlug>>[]

  const schema = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: `Exercices avec ${mat.nom}`,
    description: mat.descriptionSeo,
    numberOfItems: exercises.length,
    itemListElement: exercises.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.nom, url: `https://www.muscletraining.uk/exercice/${e.slug}` })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[{ nom: 'Accueil', url: '/' }, { nom: 'Matériel', url: '/materiel' }, { nom: mat.nom }]} />
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{mat.emoji}</span>
            <div>
              <h1 className="text-3xl font-black text-[#EDE8E0]">Exercices {mat.nom}</h1>
              <p className="text-[#3A4152] text-sm">{exercises.length} exercices disponibles</p>
            </div>
          </div>
          <p className="text-[#8A9BB5] leading-relaxed mb-5">{mat.description}</p>
          <div className="flex flex-wrap gap-2 p-4 rounded-2xl border mb-2" style={{ background: '#b8d40008', borderColor: '#b8d40025' }}>
            <span className="text-xs font-bold" style={{ color: '#b8d400' }}>Avantages :</span>
            {mat.avantages.map(a => (
              <span key={a} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#b8d40020', color: '#6b7f00' }}>{a}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {exercises.map(e => <ExerciseCard key={e.slug} exercise={e} />)}
        </div>
        {AFFILIATES[slug] && (
          <div className="mt-10">
            <p className="font-black text-sm mb-3" style={{ color: '#EDE8E0' }}>🛒 Matériel recommandé</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {AFFILIATES[slug].map(p => <AffiliateCard key={p.nom} product={p} />)}
            </div>
            <p className="text-[10px]" style={{ color: '#3A4152' }}>
              * Liens affiliés Amazon — commission sur ventes, sans coût supplémentaire pour vous.
            </p>
          </div>
        )}
        <div className="mt-10 p-5 bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)]">
          <p className="font-bold text-[#EDE8E0] mb-3 text-sm">Autres matériels</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(MATERIEL_DATA).filter(([s]) => s !== slug).map(([s, m]) => (
              <Link key={s} href={`/materiel/${s}`} className="text-sm px-3 py-1.5 rounded-xl bg-[#0C0C1A] border border-[rgba(230,57,70,0.1)] hover:border-[#E63946] font-medium text-[#8A9BB5] hover:text-[#E63946] transition-all">
                {m.emoji} {m.nom}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
