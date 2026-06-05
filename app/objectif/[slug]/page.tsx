import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ExerciseCard from '@/components/ExerciseCard'
import { EXERCISES } from '@/data/exercises'
import { PROGRAMMES } from '@/data/programmes'
import { ARTICLES } from '@/data/articles'

const OBJECTIFS = {
  force: {
    nom: 'Force',
    emoji: '💪',
    couleur: '#E63946',
    description: 'Développez une force maximale avec les mouvements de base. Powerlifting, haltérophilie et calisthenics avancé.',
    mots: ['Soulevé de terre', 'Squat', 'Force maximale', 'Progression linéaire'],
    exercicesSlugs: ['souleve-de-terre', 'squat-barre', 'developpe-couche-barre', 'tractions', 'developpe-militaire', 'rowing-barre'],
    programmeObjectif: 'force' as const,
    articleTags: ['force', 'programme', 'powerlifting'],
  },
  hypertrophie: {
    nom: 'Prise de Masse',
    emoji: '📈',
    couleur: '#E63946',
    description: 'Maximisez la croissance musculaire avec un volume d\'entraînement optimal et une nutrition adaptée.',
    mots: ['Hypertrophie', 'Volume', 'Pump', 'Surcharge progressive'],
    exercicesSlugs: ['developpe-couche-halteres', 'ecarte-halteres', 'tirage-poitrine', 'curl-barre', 'extension-triceps-poulie', 'hip-thrust'],
    programmeObjectif: 'hypertrophie' as const,
    articleTags: ['masse musculaire', 'hypertrophie', 'bulking'],
  },
  'perte-poids': {
    nom: 'Perte de Poids',
    emoji: '🔥',
    couleur: '#E63946',
    description: 'Brûlez les graisses et gardez votre masse musculaire avec le bon mix cardio et musculation.',
    mots: ['Déficit calorique', 'HIIT', 'Cardio', 'Recomposition corporelle'],
    exercicesSlugs: ['burpees', 'mountain-climbers', 'planche', 'fentes', 'squat-gobelet', 'pompes'],
    programmeObjectif: 'perte-poids' as const,
    articleTags: ['perte de poids', 'cardio', 'brûler'],
  },
  endurance: {
    nom: 'Endurance',
    emoji: '⚡',
    couleur: '#E63946',
    description: 'Améliorez votre endurance musculaire et cardiovasculaire pour performer plus longtemps.',
    mots: ['Circuit training', 'Reps élevées', 'Récupération active', 'VO2max'],
    exercicesSlugs: ['burpees', 'mountain-climbers', 'pompes', 'hollow-body', 'planche-commando', 'wall-sit'],
    programmeObjectif: 'endurance' as const,
    articleTags: ['endurance', 'cardio', 'circuit'],
  },
}

export function generateStaticParams() {
  return Object.keys(OBJECTIFS).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const obj = OBJECTIFS[slug as keyof typeof OBJECTIFS]
  if (!obj) return {}
  return {
    title: `Exercices ${obj.nom} — Programme & Guide Complet`,
    description: `${obj.description} Exercices, programmes et conseils pour atteindre votre objectif ${obj.nom.toLowerCase()}.`,
  }
}

export default async function ObjectifPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const obj = OBJECTIFS[slug as keyof typeof OBJECTIFS]
  if (!obj) notFound()

  const exercises = obj.exercicesSlugs.map(s => EXERCISES.find(e => e.slug === s)).filter(Boolean) as typeof EXERCISES
  const programmes = PROGRAMMES.filter(p => p.objectif === obj.programmeObjectif).slice(0, 3)
  const articles = ARTICLES.filter(a => obj.articleTags.some(t => a.tags.some(at => at.includes(t) || t.includes(at)))).slice(0, 3)

  return (
    <div style={{ background: '#07070F', minHeight: '100vh' }} className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">

      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{obj.emoji}</span>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: obj.couleur }}>Objectif</p>
            <h1 className="text-3xl sm:text-4xl font-black" style={{ color: '#EDE8E0' }}>{obj.nom}</h1>
          </div>
        </div>
        <p className="text-base max-w-2xl mb-5" style={{ color: '#5A6478' }}>{obj.description}</p>
        <div className="flex flex-wrap gap-2">
          {obj.mots.map(m => (
            <span key={m} className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: 'rgba(230,57,70,0.1)', color: obj.couleur, border: '1px solid rgba(230,57,70,0.2)' }}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div className="mb-10">
        <h2 className="text-xl font-black mb-4" style={{ color: '#EDE8E0' }}>Exercices recommandés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map(ex => <ExerciseCard key={ex.slug} exercise={ex} />)}
        </div>
      </div>

      {/* Programmes */}
      {programmes.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-black mb-4" style={{ color: '#EDE8E0' }}>Programmes adaptés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {programmes.map(p => (
              <Link key={p.slug} href={`/programmes/${p.mode}/${p.slug}`}
                className="rounded-2xl p-5 transition-all hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
                <p className="font-black text-sm mb-1" style={{ color: '#EDE8E0' }}>{p.nom}</p>
                <p className="text-xs" style={{ color: '#5A6478' }}>{p.joursParSemaine}j/sem · {p.dureeWeeks} sem · {p.mode === 'salle' ? '🏋️ Salle' : '🏠 Maison'}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-black mb-4" style={{ color: '#EDE8E0' }}>Articles liés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {articles.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`}
                className="rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,57,70,0.07)' }}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: obj.couleur }}>{a.categorie}</p>
                <p className="text-sm font-bold line-clamp-2" style={{ color: '#EDE8E0' }}>{a.titre}</p>
                <p className="text-xs mt-1" style={{ color: '#3A4152' }}>{a.tempsLecture} min</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-2xl p-6 text-center"
        style={{ background: 'rgba(230,57,70,0.06)', border: '1px solid rgba(230,57,70,0.15)' }}>
        <p className="font-black text-lg mb-2" style={{ color: '#EDE8E0' }}>Prêt à commencer ?</p>
        <div className="flex gap-3 justify-center flex-wrap mt-4">
          <Link href="/quiz" className="px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: '#E63946', color: '#fff' }}>🎯 Trouver mon programme</Link>
          <Link href="/generateur" className="px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(230,57,70,0.2)', color: '#E63946' }}>
            ⚡ Générer une séance
          </Link>
        </div>
      </div>

    </div>
  )
}
