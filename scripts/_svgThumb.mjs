/**
 * Thumbnail SVG 186×186 style CGI 3D — mannequin gris éclairé + muscle ciblé rouge.
 * Technique : feDiffuseLighting + feSpecularLighting sur le blur alpha = relief 3D natif SVG.
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

export function svgThumb(slug) {
  const info      = EXERCISE_MUSCLES[slug]
  const view      = info?.view ?? 'front'
  const highlight = new Set(info?.keys ?? [])

  const paths    = view === 'front' ? FRONT_PATHS : BACK_PATHS
  const clickable = view === 'front' ? FRONT_CLICKABLE : BACK_CLICKABLE
  const struct   = view === 'front' ? FRONT_STRUCT : BACK_STRUCT
  const vb       = view === 'front' ? '0 95 727 1280' : '718 95 727 1280'

  const grayKeys = [...struct, ...clickable.filter(k => !highlight.has(k)), 'neck', 'hair']
  const redKeys  = clickable.filter(k => highlight.has(k))

  const renderGroup = keys => keys.flatMap(key => {
    const item = paths[key]; if (!item) return []
    return item.paths.map(d => `<path d="${d}"/>`)
  }).join('')

  const headPaths = (paths['head']?.paths ?? []).map(d =>
    `<path d="${d}" fill="url(#hg)"/>`
  ).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="186" height="186">
  <defs>
    <!-- Fond gym beige chaud -->
    <radialGradient id="bg" cx="50%" cy="38%" r="72%">
      <stop offset="0%" stop-color="#c8b89a"/>
      <stop offset="60%" stop-color="#9a8870"/>
      <stop offset="100%" stop-color="#5a4a38"/>
    </radialGradient>
    <!-- Tête -->
    <radialGradient id="hg" cx="38%" cy="32%" r="55%">
      <stop offset="0%" stop-color="#a0a0b8"/>
      <stop offset="100%" stop-color="#58586e"/>
    </radialGradient>
    <!-- Éclairage 3D corps gris : blur alpha = height map → feDiffuse + feSpecular -->
    <filter id="fg" x="-20%" y="-5%" width="140%" height="115%"
            color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="28" result="h"/>
      <feDiffuseLighting in="h" lightingColor="#aab0cc"
          diffuseConstant="0.9" surfaceScale="6" result="diff">
        <feDistantLight azimuth="220" elevation="52"/>
      </feDiffuseLighting>
      <feComposite in="diff" in2="SourceAlpha" operator="in" result="dm"/>
      <feSpecularLighting in="h" lightingColor="#ffffff"
          specularConstant="0.35" specularExponent="18" result="spec">
        <feDistantLight azimuth="220" elevation="52"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="sm"/>
      <feBlend in="SourceGraphic" in2="dm" mode="soft-light" result="b1"/>
      <feBlend in="b1" in2="sm" mode="screen"/>
    </filter>
    <!-- Éclairage 3D muscles rouges + glow -->
    <filter id="fr" x="-25%" y="-10%" width="150%" height="130%"
            color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="h"/>
      <feDiffuseLighting in="h" lightingColor="#ff9080"
          diffuseConstant="1.8" surfaceScale="12" result="diff">
        <feDistantLight azimuth="220" elevation="52"/>
      </feDiffuseLighting>
      <feComposite in="diff" in2="SourceAlpha" operator="in" result="dm"/>
      <feSpecularLighting in="h" lightingColor="#ffffff"
          specularConstant="1.0" specularExponent="32" result="spec">
        <feDistantLight azimuth="220" elevation="52"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="sm"/>
      <!-- Glow rouge autour du muscle -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="22" result="gb"/>
      <feFlood flood-color="#E63946" flood-opacity="0.55" result="gc"/>
      <feComposite in="gc" in2="gb" operator="in" result="glow"/>
      <feBlend in="SourceGraphic" in2="dm" mode="overlay" result="b1"/>
      <feBlend in="b1" in2="sm" mode="screen" result="b2"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="b2"/></feMerge>
    </filter>
    <!-- Ombre portée du mannequin -->
    <filter id="fs">
      <feDropShadow dx="0" dy="25" stdDeviation="20"
        flood-color="#000000" flood-opacity="0.55"/>
    </filter>
  </defs>

  <!-- Fond gym -->
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <!-- Sol ombre au pied -->
  <ellipse cx="50%" cy="97%" rx="22%" ry="2.5%" fill="#000" opacity="0.25"/>

  <!-- Corps gris 3D -->
  <g filter="url(#fs)">
    <g fill="#7878a0" filter="url(#fg)">${renderGroup(grayKeys)}</g>
    ${headPaths}
  </g>

  <!-- Muscles ciblés rouges 3D + glow -->
  <g fill="#E63946" filter="url(#fr)">${renderGroup(redKeys)}</g>
</svg>`
}
