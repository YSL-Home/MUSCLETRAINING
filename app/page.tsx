import type { Metadata } from 'next'
import Link from 'next/link'
import MuscleMap from '@/components/MuscleMap'
import ExerciseCard from '@/components/ExerciseCard'
import ProgrammeCard from '@/components/ProgrammeCard'
import { MUSCLES } from '@/data/muscles'
import { EXERCISES } from '@/data/exercises'
import { PROGRAMMES } from '@/data/programmes'
import { SPORTS } from '@/data/sports'

export const metadata: Metadata = {
  title: 'Vert Lime — Exercices, Programmes Salle & Maison avec Vidéos',
  description: 'Cliquez sur un muscle pour découvrir tous les exercices avec vidéos YouTube en français. Programmes salle et maison pour débutants et avancés. 100% gratuit.',
}

const GROUPES_CORPS = [
  { label: 'Haut du corps', key: 'haut' },
  { label: 'Centre', key: 'milieu' },
  { label: 'Bas du corps', key: 'bas' },
] as const

export default function HomePage() {
  const exercicesVedette = EXERCISES.slice(0, 6)
  const programmesVedette = PROGRAMMES.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111600 60%, #0a0a0a 100%)' }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Trouvez l&apos;exercice
            <span style={{ color: '#b8d400' }}> parfait</span>
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Cliquez sur un muscle pour découvrir tous les exercices avec vidéos. Programmes salle et maison pour tous les niveaux.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            {[
              { val: '60+', label: 'Exercices' },
              { val: '13', label: 'Groupes musculaires' },
              { val: '6', label: 'Programmes' },
              { val: '100%', label: 'Gratuit' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black" style={{ color: '#b8d400' }}>{stat.val}</div>
                <div className="text-slate-400 text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Muscle Map */}
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto border border-white/10">
            <p className="text-slate-300 text-sm mb-6 font-medium">
              ↓ Cliquez sur un muscle pour voir les exercices
            </p>
            <MuscleMap />
          </div>
        </div>
      </section>

      {/* Grille muscles */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Tous les groupes musculaires</h2>
        <p className="text-slate-500 mb-8">Sélectionnez un muscle pour voir tous les exercices avec vidéos.</p>

        {GROUPES_CORPS.map(groupe => (
          <div key={groupe.key} className="mb-10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{groupe.label}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {MUSCLES.filter(m => m.groupeCorps === groupe.key).map(muscle => (
                <Link
                  key={muscle.id}
                  href={`/muscles/${muscle.slug}`}
                  className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-lime-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: muscle.couleurSvg + '22' }}>
                    <div className="w-4 h-4 rounded-full" style={{ background: muscle.couleurSvg }} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm group-hover:text-lime-500 transition-colors">{muscle.nom}</div>
                    <div className="text-slate-400 text-xs">
                      {EXERCISES.filter(e => e.musclesPrimaires.includes(muscle.id)).length} exercices
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Exercices vedette */}
      <section className="py-14 px-4" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Exercices populaires</h2>
              <p className="text-slate-500">Les mouvements fondamentaux avec vidéos techniques</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exercicesVedette.map(exercise => (
              <ExerciseCard key={exercise.slug} exercise={exercise} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/muscles/pectoraux"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#b8d400' }}
            >
              Voir tous les exercices
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Programmes vedette */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-slate-900">Programmes d&apos;entraînement</h2>
          </div>
          <p className="text-slate-500 mb-8">Plans complets pour la salle ou la maison, tous niveaux.</p>

          {/* Tabs salle / maison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Salle */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">🏋️ Salle</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {programmesVedette.filter(p => p.mode === 'salle').map(p => (
                  <ProgrammeCard key={p.slug} programme={p} />
                ))}
              </div>
            </div>
            {/* Maison */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">🏠 Maison</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {programmesVedette.filter(p => p.mode === 'maison').map(p => (
                  <ProgrammeCard key={p.slug} programme={p} />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-lime-50"
              style={{ borderColor: '#b8d400', color: '#b8d400' }}
            >
              Tous les programmes
            </Link>
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-slate-900">Renforcement par sport</h2>
            <Link href="/sport" className="text-sm font-semibold text-lime-400 hover:text-lime-500 transition-colors">
              Voir tous →
            </Link>
          </div>
          <p className="text-slate-500 mb-8">Exercices ciblés pour améliorer vos performances dans votre discipline.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SPORTS.map(sport => (
              <Link key={sport.id} href={`/sport/${sport.slug}`}
                className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-lime-300 hover:shadow-md transition-all">
                <span className="text-2xl">{sport.emoji}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm group-hover:text-lime-500 transition-colors">{sport.nom}</p>
                  <p className="text-slate-400 text-xs">{sport.exercices.length} exercices</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Salle vs Maison */}
      <section className="py-14 px-4" style={{ background: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/programmes/salle" className="group p-8 rounded-2xl border border-blue-800 hover:border-blue-600 transition-all" style={{ background: '#0a1200' }}>
            <div className="text-4xl mb-4">🏋️</div>
            <h3 className="text-white font-black text-2xl mb-2">Mode Salle</h3>
            <p className="text-slate-400 mb-4">Programmes avec barre, haltères et machines. Pour progresser rapidement avec les charges libres.</p>
            <span className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">Découvrir les programmes salle →</span>
          </Link>
          <Link href="/programmes/maison" className="group p-8 rounded-2xl border border-green-800 hover:border-green-600 transition-all" style={{ background: '#0a1a00' }}>
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-white font-black text-2xl mb-2">Mode Maison</h3>
            <p className="text-slate-400 mb-4">Programmes au poids du corps. Zéro équipement, zéro abonnement. Résultats garantis.</p>
            <span className="text-green-400 font-semibold group-hover:text-green-300 transition-colors">Découvrir les programmes maison →</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
