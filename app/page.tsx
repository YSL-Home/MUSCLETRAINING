import type { Metadata } from 'next'
import Link from 'next/link'
import MuscleMap from '@/components/MuscleMap'
import ExerciseCard from '@/components/ExerciseCard'
import { MUSCLES } from '@/data/muscles'
import { EXERCISES } from '@/data/exercises'
import { PROGRAMMES } from '@/data/programmes'
import { SPORTS } from '@/data/sports'
import { ARTICLES } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Muscle Training — Exercices, Programmes Salle & Maison avec Vidéos',
  description: 'Bibliothèque complète de 62+ exercices avec vidéos YouTube, programmes salle et maison pour tous les niveaux.',
}

const DIFF_COLOR: Record<string, string> = {
  debutant: '#4ADE80', intermediaire: '#FBBF24', avance: '#F87171',
}

export default function HomePage() {
  const top6 = EXERCISES.slice(0, 6)
  const top3articles = ARTICLES.slice(0, 3)

  return (
    <div style={{ background: '#07070F', minHeight: '100vh' }} className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">

      {/* ── BENTO GRID ROW 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">

        {/* Muscle Map — 3 cols, full height */}
        <div className="lg:col-span-3 rounded-3xl p-5 flex"
          style={{
            background: 'radial-gradient(ellipse at 40% 20%, #1a152b 0%, #0d0b1a 50%, #07070F 100%)',
            border: '1px solid rgba(230,57,70,0.12)',
            minHeight: '420px',
          }}>
          <MuscleMap />
        </div>

        {/* Right column — 2 cols, 2 rows */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Stats cards */}
          {[
            { val: '62+', label: 'Exercices', icon: '💪', href: '/muscles/pectoraux' },
            { val: '6',   label: 'Programmes', icon: '📋', href: '/programmes' },
          ].map(s => (
            <Link key={s.label} href={s.href}
              className="rounded-3xl p-5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.12)', minHeight: '120px' }}>
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="text-3xl font-black" style={{
                  background: 'linear-gradient(135deg, #E63946, #FF6B7A)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{s.val}</div>
                <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#3A4152' }}>{s.label}</div>
              </div>
            </Link>
          ))}

          {/* Featured exercises */}
          {top6.slice(0, 2).map(ex => (
            <Link key={ex.slug} href={`/exercice/${ex.slug}`}
              className="rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid rgba(230,57,70,0.12)' }}>
              <div className="relative h-full min-h-[120px] overflow-hidden" style={{ background: '#0C0C1A' }}>
                <img src={`https://img.youtube.com/vi/${ex.videoYoutube}/mqdefault.jpg`}
                  alt={ex.nom} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 h-16"
                  style={{ background: 'linear-gradient(to top, rgba(7,7,15,0.95), transparent)' }} />
                <span className="absolute bottom-2 left-3 text-xs font-black" style={{ color: '#EDE8E0' }}>{ex.nom}</span>
                <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(7,7,15,0.8)', color: DIFF_COLOR[ex.difficulte] }}>{ex.difficulte}</span>
              </div>
            </Link>
          ))}

          {/* Generator CTA — full width */}
          <Link href="/generateur"
            className="sm:col-span-2 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.12), rgba(230,57,70,0.04))', border: '1px solid rgba(230,57,70,0.25)' }}>
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-black text-base leading-tight" style={{ color: '#E63946' }}>Générer une séance</p>
              <p className="text-xs mt-1" style={{ color: '#5A6478' }}>Personnalisée en 1 clic</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ── BENTO ROW 2 — Muscles rapides ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
        {MUSCLES.slice(0, 8).map(m => (
          <Link key={m.id} href={`/muscles/${m.slug}`}
            className="rounded-2xl p-3 flex items-center gap-2 group transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: m.couleurSvg }} />
            <span className="text-xs font-semibold truncate group-hover:text-[#E63946] transition-colors" style={{ color: '#5A6478' }}>
              {m.nom}
            </span>
          </Link>
        ))}
      </div>

      {/* ── BENTO ROW 3 — Exercices ── */}
      <div className="rounded-3xl p-5 mb-4"
        style={{ background: '#0C0C1A', border: '1px solid rgba(230,57,70,0.08)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#E63946' }}>Populaires</p>
            <h2 className="font-black text-lg" style={{ color: '#EDE8E0' }}>Exercices du moment</h2>
          </div>
          <Link href="/muscles/pectoraux" className="text-xs font-bold tracking-widest uppercase hover:text-[#E63946] transition-colors" style={{ color: '#3A4152' }}>Tout voir →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {top6.map(e => <ExerciseCard key={e.slug} exercise={e} />)}
        </div>
      </div>

      {/* ── BENTO ROW 4 — Programmes + Blog côte à côte ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

        {/* Programmes — 1 col */}
        <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: '#E63946' }}>Structurer</p>
          <h2 className="font-black text-lg mb-4" style={{ color: '#EDE8E0' }}>Programmes</h2>
          <div className="space-y-3">
            {PROGRAMMES.slice(0, 4).map(p => (
              <Link key={p.slug} href={`/programmes/${p.mode}/${p.slug}`}
                className="flex items-center justify-between p-3 rounded-2xl group transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,57,70,0.07)' }}>
                <div>
                  <p className="text-sm font-bold group-hover:text-[#E63946] transition-colors" style={{ color: '#EDE8E0' }}>{p.nom}</p>
                  <p className="text-xs" style={{ color: '#3A4152' }}>{p.joursParSemaine}j/sem · {p.dureeWeeks} sem.</p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946' }}>
                  {p.mode === 'salle' ? '🏋️' : '🏠'}
                </span>
              </Link>
            ))}
          </div>
          <Link href="/programmes" className="block text-center mt-4 text-xs font-bold tracking-widest uppercase hover:text-[#E63946] transition-colors" style={{ color: '#3A4152' }}>
            Tous les programmes →
          </Link>
        </div>

        {/* Blog — 2 cols */}
        <div className="lg:col-span-2 rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#E63946' }}>Savoir</p>
              <h2 className="font-black text-lg" style={{ color: '#EDE8E0' }}>Articles récents</h2>
            </div>
            <Link href="/blog" className="text-xs font-bold tracking-widest uppercase hover:text-[#E63946] transition-colors" style={{ color: '#3A4152' }}>Tout →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {top3articles.map((a, i) => (
              <Link key={a.slug} href={`/blog/${a.slug}`}
                className="rounded-2xl overflow-hidden group transition-all hover:-translate-y-0.5"
                style={{ background: i === 0 ? 'rgba(230,57,70,0.06)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,57,70,0.08)' }}>
                <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #E63946, transparent)', opacity: 0.5 }} />
                <div className="p-4">
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: '#E63946' }}>{a.categorie}</p>
                  <h3 className="text-xs font-black leading-snug line-clamp-3 group-hover:text-[#E63946] transition-colors" style={{ color: '#EDE8E0' }}>{a.titre}</h3>
                  <p className="text-[10px] mt-2" style={{ color: '#3A4152' }}>{a.tempsLecture} min</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── BENTO ROW 5 — Sports strip ── */}
      <div className="rounded-3xl p-5" style={{ background: '#0C0C1A', border: '1px solid rgba(230,57,70,0.08)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#E63946' }}>Discipline</p>
            <h2 className="font-black text-lg" style={{ color: '#EDE8E0' }}>Par sport</h2>
          </div>
          <Link href="/sport" className="text-xs font-bold tracking-widest uppercase hover:text-[#E63946] transition-colors" style={{ color: '#3A4152' }}>Voir tout →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {SPORTS.map(s => (
            <Link key={s.id} href={`/sport/${s.slug}`}
              className="rounded-2xl p-3 text-center group transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="text-2xl mb-1">
                {s.icon ? <img src={s.icon} alt={s.nom} className="w-7 h-7 mx-auto" /> : s.emoji}
              </div>
              <p className="text-xs font-semibold group-hover:text-[#E63946] transition-colors truncate" style={{ color: '#5A6478' }}>{s.nom}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
