import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { EXERCISES } from '@/data/exercises'
import { MUSCLES } from '@/data/muscles'

// Registre terme → URL (exercices + muscles), trié par longueur décroissante
// pour matcher les expressions les plus spécifiques d'abord.
const REGISTRY: { term: string; url: string }[] = (() => {
  const out: { term: string; url: string }[] = []
  for (const e of EXERCISES) out.push({ term: e.nom, url: `/exercice/${e.slug}` })
  for (const m of MUSCLES) {
    out.push({ term: m.nom, url: `/muscles/${m.slug}` })
    if (m.nomPluriel && m.nomPluriel !== m.nom) out.push({ term: m.nomPluriel.replace(/^les?\s+/i, ''), url: `/muscles/${m.slug}` })
  }
  return out.filter(x => x.term && x.term.length >= 5).sort((a, b) => b.term.length - a.term.length)
})()

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const REGEX = new RegExp(`\\b(${REGISTRY.map(r => esc(r.term)).join('|')})\\b`, 'gi')
const URL_BY_TERM = new Map(REGISTRY.map(r => [r.term.toLowerCase(), r.url]))

/**
 * Transforme un texte en nœuds React en liant la 1ʳᵉ occurrence de chaque
 * terme connu (exercice/muscle) vers sa page. `used` partagé sur tout l'article,
 * `max` limite le nombre de liens pour rester naturel.
 */
export function linkifyText(text: string, used: Set<string>, max = 6): ReactNode {
  if (!text || used.size >= max) return text
  const parts: ReactNode[] = []
  let last = 0, key = 0
  for (const m of text.matchAll(REGEX)) {
    const term = m[1], lower = term.toLowerCase()
    const url = URL_BY_TERM.get(lower)
    if (!url || used.has(lower) || used.size >= max) continue
    used.add(lower)
    const i = m.index ?? 0
    if (i > last) parts.push(<Fragment key={key++}>{text.slice(last, i)}</Fragment>)
    parts.push(<Link key={key++} href={url} className="underline decoration-dotted" style={{ color: '#E63946', textUnderlineOffset: '3px' }}>{term}</Link>)
    last = i + term.length
  }
  if (!parts.length) return text
  if (last < text.length) parts.push(<Fragment key={key++}>{text.slice(last)}</Fragment>)
  return <>{parts}</>
}
