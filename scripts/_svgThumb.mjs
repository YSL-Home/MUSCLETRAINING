/**
 * Thumbnail SVG — mannequin CGI 3D gris + muscle rouge + fond salle de sport réaliste.
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

// Génère le fond salle de sport (rack, haltères, barres, sol) adapté au viewBox
function gymBackground(x0) {
  const W = 727
  const x = n => x0 + n  // offset viewBox

  return `
  <!-- Mur arrière gradient sombre chaud -->
  <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse"
    x1="${x(0)}" y1="95" x2="${x(0)}" y2="900">
    <stop offset="0%" stop-color="#1c1510"/>
    <stop offset="100%" stop-color="#2e2418"/>
  </linearGradient>
  <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse"
    x1="${x(0)}" y1="900" x2="${x(0)}" y2="1280">
    <stop offset="0%" stop-color="#3a2e1e"/>
    <stop offset="100%" stop-color="#1e1810"/>
  </linearGradient>
  <!-- Halo lumière centrale -->
  <radialGradient id="gh" cx="${x(363)}" cy="400" r="380" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#c8a060" stop-opacity="0.18"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </radialGradient>

  <!-- Mur -->
  <rect x="${x(0)}" y="95" width="${W}" height="805" fill="#201a12"/>
  <rect x="${x(0)}" y="95" width="${W}" height="805" fill="url(#gh)"/>
  <!-- Sol -->
  <rect x="${x(0)}" y="900" width="${W}" height="380" fill="#2e2418"/>
  <!-- Ligne sol / mur -->
  <rect x="${x(0)}" y="897" width="${W}" height="6" fill="#1a1208"/>
  <!-- Carrelage sol -->
  <line x1="${x(0)}" y1="950" x2="${x(W)}" y2="950" stroke="#251e12" stroke-width="2"/>
  <line x1="${x(0)}" y1="1010" x2="${x(W)}" y2="1010" stroke="#251e12" stroke-width="2"/>
  <line x1="${x(0)}" y1="1080" x2="${x(W)}" y2="1080" stroke="#251e12" stroke-width="2"/>
  <line x1="${x(0)}" y1="1160" x2="${x(W)}" y2="1160" stroke="#251e12" stroke-width="2"/>
  <line x1="${x(182)}" y1="900" x2="${x(182)}" y2="1280" stroke="#251e12" stroke-width="2"/>
  <line x1="${x(364)}" y1="900" x2="${x(364)}" y2="1280" stroke="#251e12" stroke-width="2"/>
  <line x1="${x(546)}" y1="900" x2="${x(546)}" y2="1280" stroke="#251e12" stroke-width="2"/>

  <!-- RACK SQUAT (gauche) -->
  <!-- Montants verticaux -->
  <rect x="${x(28)}" y="200" width="18" height="680" fill="#28283a" rx="4"/>
  <rect x="${x(130)}" y="200" width="18" height="680" fill="#28283a" rx="4"/>
  <!-- Barres horizontales -->
  <rect x="${x(26)}" y="370" width="124" height="16" fill="#32323e" rx="3"/>
  <rect x="${x(26)}" y="530" width="124" height="16" fill="#32323e" rx="3"/>
  <rect x="${x(26)}" y="680" width="124" height="12" fill="#3a3a48" rx="2"/>
  <rect x="${x(26)}" y="720" width="124" height="12" fill="#3a3a48" rx="2"/>
  <!-- Connexions bas -->
  <rect x="${x(20)}" y="870" width="56" height="18" fill="#222230" rx="3"/>
  <rect x="${x(100)}" y="870" width="56" height="18" fill="#222230" rx="3"/>
  <!-- Disques sur rack -->
  <ellipse cx="${x(30)}" cy="440" rx="10" ry="40" fill="#1e1e2a" stroke="#38384a" stroke-width="1.5"/>
  <ellipse cx="${x(42)}" cy="440" rx="9" ry="35" fill="#222232" stroke="#38384a" stroke-width="1"/>
  <ellipse cx="${x(136)}" cy="440" rx="10" ry="40" fill="#1e1e2a" stroke="#38384a" stroke-width="1.5"/>
  <ellipse cx="${x(148)}" cy="440" rx="9" ry="35" fill="#222232" stroke="#38384a" stroke-width="1"/>
  <!-- Eclairage rack haut -->
  <rect x="${x(46)}" y="200" width="84" height="8" fill="#404060" rx="2"/>

  <!-- BARRES AU SOL (droite bas) -->
  <rect x="${x(390)}" y="895" width="310" height="10" rx="5" fill="#404055"/>
  <ellipse cx="${x(392)}" cy="900" rx="7" ry="32" fill="#282838" stroke="#404055" stroke-width="1.5"/>
  <ellipse cx="${x(698)}" cy="900" rx="7" ry="32" fill="#282838" stroke="#404055" stroke-width="1.5"/>
  <!-- Disques barre sol -->
  <ellipse cx="${x(406)}" cy="900" rx="8" ry="28" fill="#1e1e28" stroke="#38384a" stroke-width="1"/>
  <ellipse cx="${x(416)}" cy="900" rx="7" ry="24" fill="#222230" stroke="#38384a" stroke-width="1"/>
  <ellipse cx="${x(684)}" cy="900" rx="8" ry="28" fill="#1e1e28" stroke="#38384a" stroke-width="1.5"/>
  <ellipse cx="${x(674)}" cy="900" rx="7" ry="24" fill="#222230" stroke="#38384a" stroke-width="1"/>

  <!-- RACK HALTÈRES (droite haut) -->
  <rect x="${x(490)}" y="700" width="210" height="14" rx="4" fill="#2a2a38"/>
  <rect x="${x(490)}" y="714" width="210" height="130" rx="4" fill="#1e1e28"/>
  <rect x="${x(490)}" y="840" width="210" height="50" rx="3" fill="#181824"/>
  <!-- Haltères silhouette -->
  <rect x="${x(502)}" y="668" width="32" height="28" rx="6" fill="#303044"/>
  <rect x="${x(502)}" y="656" width="10" height="12" rx="3" fill="#28283c"/>
  <rect x="${x(524)}" y="656" width="10" height="12" rx="3" fill="#28283c"/>
  <rect x="${x(544)}" y="663" width="36" height="32" rx="6" fill="#2e2e42"/>
  <rect x="${x(544)}" y="650" width="11" height="14" rx="3" fill="#262636"/>
  <rect x="${x(569)}" y="650" width="11" height="14" rx="3" fill="#262636"/>
  <rect x="${x(590)}" y="658" width="40" height="36" rx="6" fill="#2a2a3e"/>
  <rect x="${x(590)}" y="643" width="12" height="16" rx="3" fill="#222234"/>
  <rect x="${x(618)}" y="643" width="12" height="16" rx="3" fill="#222234"/>
  <rect x="${x(640)}" y="652" width="44" height="42" rx="6" fill="#262638"/>
  <rect x="${x(640)}" y="635" width="13" height="18" rx="3" fill="#202030"/>
  <rect x="${x(671)}" y="635" width="13" height="18" rx="3" fill="#202030"/>

  <!-- Reflet miroir mur (lignes horizontales) -->
  <rect x="${x(160)}" y="200" width="380" height="1" fill="#ffffff" opacity="0.04"/>
  <rect x="${x(160)}" y="350" width="380" height="1" fill="#ffffff" opacity="0.03"/>
  <rect x="${x(160)}" y="500" width="380" height="1" fill="#ffffff" opacity="0.03"/>
  <rect x="${x(160)}" y="650" width="380" height="1" fill="#ffffff" opacity="0.02"/>

  <!-- Ombre du mannequin au sol -->
  <ellipse cx="${x(363)}" cy="1230" rx="130" ry="18" fill="#000000" opacity="0.35"/>
  `
}

export function svgThumb(slug) {
  const info      = EXERCISE_MUSCLES[slug]
  const view      = info?.view ?? 'front'
  const highlight = new Set(info?.keys ?? [])

  const paths     = view === 'front' ? FRONT_PATHS : BACK_PATHS
  const clickable  = view === 'front' ? FRONT_CLICKABLE : BACK_CLICKABLE
  const struct    = view === 'front' ? FRONT_STRUCT : BACK_STRUCT
  const vb        = view === 'front' ? '0 95 727 1280' : '718 95 727 1280'
  const x0        = view === 'front' ? 0 : 718

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
    <radialGradient id="hg" cx="38%" cy="32%" r="55%">
      <stop offset="0%" stop-color="#a0a0b8"/>
      <stop offset="100%" stop-color="#58586e"/>
    </radialGradient>
    <!-- Éclairage 3D corps gris -->
    <filter id="fg" x="-20%" y="-5%" width="140%" height="115%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="28" result="h"/>
      <feDiffuseLighting in="h" lightingColor="#aab0cc" diffuseConstant="0.9" surfaceScale="6" result="diff">
        <feDistantLight azimuth="220" elevation="52"/>
      </feDiffuseLighting>
      <feComposite in="diff" in2="SourceAlpha" operator="in" result="dm"/>
      <feSpecularLighting in="h" lightingColor="#ffffff" specularConstant="0.35" specularExponent="18" result="spec">
        <feDistantLight azimuth="220" elevation="52"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="sm"/>
      <feBlend in="SourceGraphic" in2="dm" mode="soft-light" result="b1"/>
      <feBlend in="b1" in2="sm" mode="screen"/>
    </filter>
    <!-- Éclairage 3D muscles rouges + glow -->
    <filter id="fr" x="-25%" y="-10%" width="150%" height="130%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="h"/>
      <feDiffuseLighting in="h" lightingColor="#ff9080" diffuseConstant="1.8" surfaceScale="12" result="diff">
        <feDistantLight azimuth="220" elevation="52"/>
      </feDiffuseLighting>
      <feComposite in="diff" in2="SourceAlpha" operator="in" result="dm"/>
      <feSpecularLighting in="h" lightingColor="#ffffff" specularConstant="1.0" specularExponent="32" result="spec">
        <feDistantLight azimuth="220" elevation="52"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="sm"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="22" result="gb"/>
      <feFlood flood-color="#E63946" flood-opacity="0.55" result="gc"/>
      <feComposite in="gc" in2="gb" operator="in" result="glow"/>
      <feBlend in="SourceGraphic" in2="dm" mode="overlay" result="b1"/>
      <feBlend in="b1" in2="sm" mode="screen" result="b2"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="b2"/></feMerge>
    </filter>
    <!-- Ombre portée mannequin -->
    <filter id="fs">
      <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  ${gymBackground(x0)}

  <!-- Corps gris 3D -->
  <g filter="url(#fs)">
    <g fill="#7878a0" filter="url(#fg)">${renderGroup(grayKeys)}</g>
    ${headPaths}
  </g>

  <!-- Muscles ciblés rouges 3D + glow -->
  <g fill="#E63946" filter="url(#fr)">${renderGroup(redKeys)}</g>
</svg>`
}
