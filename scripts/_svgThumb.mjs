/**
 * Génère un thumbnail SVG 186×186 style mannequin gris / muscle ciblé rouge.
 * Utilisé par make-carousel.mjs et make-pdf.mjs en fallback quand pas d'image IA.
 */
import fs from 'fs'
import path from 'path'

const { FRONT_PATHS, BACK_PATHS } = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'data', 'muscleMapPaths.json'), 'utf8')
)
const EXERCISE_MUSCLES = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'data', 'exerciseMuscles.json'), 'utf8')
)

const FRONT_CLICKABLE = ['chest','abs','obliques','biceps','deltoids','quadriceps','calves','trapezius','forearm','hipFlexors','adductors','serratus']
const BACK_CLICKABLE  = ['upperBack','lowerBack','triceps','deltoids','trapezius','gluteal','hamstring','calves','forearm','adductors']
const FRONT_STRUCT    = ['hands','knees','ankles','feet','tibialis']
const BACK_STRUCT     = ['hands','ankles','feet']

function renderPaths(keys, paths, fill, filter) {
  return keys.flatMap(key => {
    const item = paths[key]; if (!item) return []
    const f = filter ? ` filter="${filter}"` : ''
    return item.paths.map(d => `<path d="${d}" fill="${fill}"${f}/>`)
  }).join('')
}

export function svgThumb(slug) {
  const info = EXERCISE_MUSCLES[slug]
  const view  = info?.view ?? 'front'
  const highlight = new Set(info?.keys ?? [])

  const paths    = view === 'front' ? FRONT_PATHS : BACK_PATHS
  const clickable = view === 'front' ? FRONT_CLICKABLE : BACK_CLICKABLE
  const struct   = view === 'front' ? FRONT_STRUCT : BACK_STRUCT
  const vb = view === 'front' ? '0 95 727 1280' : '718 95 727 1280'

  const structSvg = renderPaths(struct, paths, '#7A7A8E', null)

  const muscleSvg = clickable.flatMap(key => {
    const item = paths[key]; if (!item) return []
    const active = highlight.has(key)
    const fill = active ? '#E63946' : '#6A6A7E'
    const filter = active ? 'url(#glow)' : ''
    return item.paths.map(d => `<path d="${d}" fill="${fill}"${active ? ` filter="${filter}"` : ''}/>`)
  }).join('')

  const headSvg = ['neck','head','hair'].flatMap(key => {
    const item = paths[key]; if (!item) return []
    const fill = key === 'head' ? 'url(#head)' : '#7A7A8E'
    return item.paths.map(d => `<path d="${d}" fill="${fill}"/>`)
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="186" height="186" style="background:#0f0f1a">
    <defs>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <radialGradient id="head" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#9090A0"/>
        <stop offset="100%" stop-color="#6A6A7A"/>
      </radialGradient>
    </defs>
    ${structSvg}${muscleSvg}${headSvg}
  </svg>`
}
