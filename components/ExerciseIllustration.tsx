import React from 'react'

const SK = '#FBBF7A'  // peau
const LM = '#b8d400'  // haut lime
const NV = '#334155'  // bas navy
const HR = '#374151'  // cheveux
const EQ = '#94a3b8'  // équipement
const SH = '#475569'  // chaussures
const BG = '#f0fdf4'  // fond

type Pose = 'push' | 'squat' | 'lunge' | 'deadlift' | 'row' | 'pull' | 'press' | 'curl' | 'plank' | 'crunch' | 'bridge'

function getPose(slug: string): Pose {
  const s = slug.toLowerCase()
  if (s.includes('pompe') || s.includes('dip') || s.includes('pike') || s.includes('ecarte') || s.includes('developpe-couche') || s.includes('developpe-incline') || s.includes('bench')) return 'push'
  if (s.includes('squat') || s.includes('presse-cuisses') || s.includes('saut')) return 'squat'
  if (s.includes('fente') || s.includes('lunge') || s.includes('bulgare') || s.includes('split-step')) return 'lunge'
  if (s.includes('souleve') || s.includes('deadlift') || s.includes('good-morning') || s.includes('nordic') || s.includes('roumain') || s.includes('rotation-hanche') || s.includes('rotation-service')) return 'deadlift'
  if (s.includes('rowing') || s.includes('tirage') || s.includes('face-pull')) return 'row'
  if (s.includes('traction') || s.includes('chin')) return 'pull'
  if (s.includes('militaire') || s.includes('shoulder-press') || s.includes('elevation') || s.includes('hausse') || s.includes('developpe-halteres-epaules')) return 'press'
  if (s.includes('curl') || s.includes('extension') || s.includes('marteau') || s.includes('triceps')) return 'curl'
  if (s.includes('planche') || s.includes('gainage') || s.includes('mountain') || s.includes('burpee') || s.includes('rotation-tronc')) return 'plank'
  if (s.includes('crunch') || s.includes('releve') || s.includes('oblique')) return 'crunch'
  if (s.includes('hip') || s.includes('pont') || s.includes('bridge') || s.includes('donkey') || s.includes('kick') || s.includes('superman') || s.includes('mollet') || s.includes('rotation-externe')) return 'bridge'
  return 'squat'
}

// ── Poses ─────────────────────────────────────────────────────────
// Règle : strokeWidth corps ≤ 8, membres ≤ 6, avant-bras/mollets ≤ 5

function PushSVG() {
  // Vue de profil : corps horizontal, mains et orteils au sol
  return (
    <svg viewBox="0 0 200 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="115" fill={BG} rx="14"/>
      <line x1="15" y1="107" x2="185" y2="107" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête profil */}
      <ellipse cx="26" cy="55" rx="12" ry="13" fill={SK}/>
      <path d="M14 53 Q14 40 26 40 Q38 40 38 53" fill={HR}/>
      {/* Corps horizontal */}
      <line x1="38" y1="59" x2="152" y2="64" stroke={LM} strokeWidth="8" strokeLinecap="round"/>
      {/* Bras avant (fléchi, main au sol) */}
      <line x1="60" y1="61" x2="57" y2="80" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="57" y1="80" x2="40" y2="87" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras arrière */}
      <line x1="112" y1="63" x2="116" y2="82" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="116" y1="82" x2="132" y2="88" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Hanches */}
      <ellipse cx="152" cy="67" rx="10" ry="7" fill={NV}/>
      {/* Jambe avant */}
      <line x1="152" y1="72" x2="165" y2="90" stroke={NV} strokeWidth="6" strokeLinecap="round"/>
      {/* Jambe arrière */}
      <line x1="157" y1="68" x2="172" y2="86" stroke={NV} strokeWidth="6" strokeLinecap="round"/>
      {/* Mains */}
      <ellipse cx="39" cy="89" rx="8" ry="4" fill={SK}/>
      <ellipse cx="132" cy="90" rx="8" ry="4" fill={SK}/>
      {/* Orteils */}
      <ellipse cx="165" cy="94" rx="8" ry="3.5" fill={SH}/>
      <ellipse cx="173" cy="89" rx="7" ry="3.5" fill={SH}/>
    </svg>
  )
}

function SquatSVG() {
  // Vue de face : squat gobelet profond
  return (
    <svg viewBox="0 0 140 185" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="140" height="185" fill={BG} rx="14"/>
      <line x1="12" y1="177" x2="128" y2="177" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête */}
      <ellipse cx="70" cy="22" rx="13" ry="14" fill={SK}/>
      <path d="M57 20 Q57 6 70 6 Q83 6 83 20" fill={HR}/>
      {/* Cou */}
      <line x1="70" y1="36" x2="70" y2="44" stroke={SK} strokeWidth="6" strokeLinecap="round"/>
      {/* Torse légèrement incliné */}
      <line x1="70" y1="44" x2="69" y2="90" stroke={LM} strokeWidth="10" strokeLinecap="round"/>
      {/* Bras gauche */}
      <line x1="61" y1="58" x2="50" y2="74" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="50" y1="74" x2="53" y2="92" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras droit */}
      <line x1="79" y1="58" x2="90" y2="74" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="90" y1="74" x2="87" y2="92" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Poids gobelet */}
      <rect x="56" y="90" width="28" height="16" rx="5" fill={EQ}/>
      {/* Cuisse gauche (45° vers l'extérieur-bas) */}
      <line x1="63" y1="90" x2="36" y2="128" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      {/* Mollet gauche (vertical) */}
      <line x1="36" y1="128" x2="34" y2="172" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Cuisse droite */}
      <line x1="77" y1="90" x2="104" y2="128" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      {/* Mollet droit */}
      <line x1="104" y1="128" x2="106" y2="172" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="32" cy="175" rx="14" ry="5" fill={SH}/>
      <ellipse cx="108" cy="175" rx="14" ry="5" fill={SH}/>
    </svg>
  )
}

function LungeSVG() {
  // Vue de profil : fente avant, genou fléchi 90°
  return (
    <svg viewBox="0 0 150 185" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="150" height="185" fill={BG} rx="14"/>
      <line x1="12" y1="177" x2="138" y2="177" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête */}
      <ellipse cx="68" cy="22" rx="13" ry="14" fill={SK}/>
      <path d="M55 20 Q55 6 68 6 Q81 6 81 20" fill={HR}/>
      {/* Cou */}
      <line x1="68" y1="36" x2="68" y2="44" stroke={SK} strokeWidth="6" strokeLinecap="round"/>
      {/* Torse droit */}
      <line x1="68" y1="44" x2="68" y2="92" stroke={LM} strokeWidth="10" strokeLinecap="round"/>
      {/* Bras avant */}
      <line x1="58" y1="58" x2="46" y2="78" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="46" y1="78" x2="42" y2="98" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras arrière */}
      <line x1="78" y1="58" x2="90" y2="78" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="90" y1="78" x2="94" y2="98" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Jambe avant : cuisse vers l'avant-bas, mollet vertical */}
      <line x1="63" y1="92" x2="42" y2="130" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="42" y1="130" x2="40" y2="177" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Jambe arrière : cuisse vers l'arrière, genou bas */}
      <line x1="73" y1="92" x2="104" y2="128" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="104" y1="128" x2="108" y2="168" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="38" cy="179" rx="15" ry="5" fill={SH}/>
      <ellipse cx="108" cy="171" rx="13" ry="5" fill={SH}/>
    </svg>
  )
}

function DeadliftSVG() {
  // Vue de profil : hip hinge, dos plat, bras qui tiennent la barre
  return (
    <svg viewBox="0 0 165 155" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="165" height="155" fill={BG} rx="14"/>
      <line x1="12" y1="147" x2="153" y2="147" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête (inclinée vers le bas) */}
      <ellipse cx="30" cy="50" rx="13" ry="14" fill={SK}/>
      <path d="M17 48 Q17 34 30 34 Q43 34 43 48" fill={HR}/>
      {/* Torse horizontal (hip hinge ~20°) */}
      <line x1="42" y1="56" x2="105" y2="74" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      {/* Bras gauche qui pend, tient la barre */}
      <line x1="58" y1="63" x2="56" y2="92" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="56" y1="92" x2="55" y2="125" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras droit */}
      <line x1="78" y1="68" x2="76" y2="97" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="76" y1="97" x2="75" y2="125" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Barre */}
      <rect x="34" y="122" width="96" height="7" rx="3.5" fill={EQ}/>
      {/* Disques */}
      <ellipse cx="36" cy="125" rx="7" ry="12" fill={HR}/>
      <ellipse cx="128" cy="125" rx="7" ry="12" fill={HR}/>
      {/* Hanches hautes */}
      <ellipse cx="107" cy="76" rx="11" ry="8" fill={NV}/>
      {/* Jambe gauche (légèrement fléchie) */}
      <line x1="101" y1="82" x2="88" y2="118" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="88" y1="118" x2="86" y2="147" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Jambe droite */}
      <line x1="113" y1="80" x2="116" y2="116" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="116" y1="116" x2="118" y2="147" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="84" cy="149" rx="14" ry="5" fill={SH}/>
      <ellipse cx="120" cy="149" rx="14" ry="5" fill={SH}/>
    </svg>
  )
}

function RowSVG() {
  // Vue de profil : penché ~45°, tirage haltère à une main
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" fill={BG} rx="14"/>
      <line x1="12" y1="152" x2="148" y2="152" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête */}
      <ellipse cx="30" cy="46" rx="13" ry="14" fill={SK}/>
      <path d="M17 44 Q17 30 30 30 Q43 30 43 44" fill={HR}/>
      {/* Torse penché ~45° */}
      <line x1="42" y1="54" x2="90" y2="88" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      {/* Bras appui gauche (sur genou) */}
      <line x1="55" y1="64" x2="48" y2="90" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="48" y1="90" x2="44" y2="115" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras tirant (coude en arrière, haltère en bas) */}
      <line x1="82" y1="82" x2="92" y2="60" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="92" y1="60" x2="96" y2="42" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Haltère */}
      <rect x="90" y="34" width="28" height="7" rx="3.5" fill={EQ}/>
      <ellipse cx="91" cy="37" rx="5" ry="8" fill={HR}/>
      <ellipse cx="117" cy="37" rx="5" ry="8" fill={HR}/>
      {/* Hanches */}
      <ellipse cx="91" cy="90" rx="11" ry="8" fill={NV}/>
      {/* Jambe avant (fléchie) */}
      <line x1="86" y1="96" x2="66" y2="126" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="66" y1="126" x2="60" y2="152" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Jambe arrière */}
      <line x1="96" y1="95" x2="115" y2="124" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="115" y1="124" x2="118" y2="152" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="58" cy="154" rx="14" ry="5" fill={SH}/>
      <ellipse cx="120" cy="154" rx="14" ry="5" fill={SH}/>
    </svg>
  )
}

function PullSVG() {
  // Vue de face : tractions, bras en l'air tenant la barre
  return (
    <svg viewBox="0 0 120 185" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="185" fill={BG} rx="14"/>
      {/* Barre */}
      <rect x="8" y="12" width="104" height="7" rx="3.5" fill={EQ}/>
      <rect x="16" y="8" width="8" height="18" rx="3" fill={HR}/>
      <rect x="96" y="8" width="8" height="18" rx="3" fill={HR}/>
      {/* Avant-bras gauche (tient barre) */}
      <line x1="34" y1="17" x2="40" y2="44" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras gauche fléchi */}
      <line x1="40" y1="44" x2="46" y2="65" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      {/* Avant-bras droit */}
      <line x1="86" y1="17" x2="80" y2="44" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras droit fléchi */}
      <line x1="80" y1="44" x2="74" y2="65" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      {/* Tête */}
      <ellipse cx="60" cy="56" rx="13" ry="14" fill={SK}/>
      <path d="M47 54 Q47 40 60 40 Q73 40 73 54" fill={HR}/>
      {/* Torse */}
      <line x1="60" y1="70" x2="60" y2="118" stroke={LM} strokeWidth="10" strokeLinecap="round"/>
      {/* Jambes croisées qui pendent */}
      <line x1="55" y1="118" x2="50" y2="152" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="50" y1="152" x2="48" y2="172" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      <line x1="65" y1="118" x2="70" y2="152" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="70" y1="152" x2="72" y2="172" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="46" cy="174" rx="12" ry="5" fill={SH}/>
      <ellipse cx="74" cy="174" rx="12" ry="5" fill={SH}/>
    </svg>
  )
}

function PressSVG() {
  // Vue de face : développé militaire, barre au-dessus de la tête
  return (
    <svg viewBox="0 0 135 175" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="135" height="175" fill={BG} rx="14"/>
      <line x1="18" y1="167" x2="117" y2="167" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Barre au-dessus */}
      <rect x="18" y="14" width="99" height="7" rx="3.5" fill={EQ}/>
      <ellipse cx="20" cy="17" rx="6" ry="10" fill={HR}/>
      <ellipse cx="115" cy="17" rx="6" ry="10" fill={HR}/>
      {/* Avant-bras gauche */}
      <line x1="38" y1="20" x2="44" y2="46" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras gauche */}
      <line x1="44" y1="46" x2="50" y2="64" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      {/* Avant-bras droit */}
      <line x1="97" y1="20" x2="91" y2="46" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bras droit */}
      <line x1="91" y1="46" x2="85" y2="64" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      {/* Tête */}
      <ellipse cx="67" cy="50" rx="13" ry="14" fill={SK}/>
      <path d="M54 48 Q54 34 67 34 Q80 34 80 48" fill={HR}/>
      {/* Torse */}
      <line x1="67" y1="64" x2="67" y2="112" stroke={LM} strokeWidth="10" strokeLinecap="round"/>
      {/* Jambe gauche */}
      <line x1="61" y1="112" x2="57" y2="144" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="57" y1="144" x2="55" y2="167" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Jambe droite */}
      <line x1="73" y1="112" x2="77" y2="144" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="77" y1="144" x2="79" y2="167" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="53" cy="169" rx="14" ry="5" fill={SH}/>
      <ellipse cx="81" cy="169" rx="14" ry="5" fill={SH}/>
    </svg>
  )
}

function CurlSVG() {
  // Vue de face : curl biceps, un bras fléchi avec haltère
  return (
    <svg viewBox="0 0 125 175" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="125" height="175" fill={BG} rx="14"/>
      <line x1="16" y1="167" x2="109" y2="167" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête */}
      <ellipse cx="62" cy="22" rx="13" ry="14" fill={SK}/>
      <path d="M49 20 Q49 6 62 6 Q75 6 75 20" fill={HR}/>
      {/* Cou */}
      <line x1="62" y1="36" x2="62" y2="44" stroke={SK} strokeWidth="6" strokeLinecap="round"/>
      {/* Torse */}
      <line x1="62" y1="44" x2="62" y2="96" stroke={LM} strokeWidth="10" strokeLinecap="round"/>
      {/* Bras gauche : tendu vers le bas, haltère en bas */}
      <line x1="51" y1="55" x2="40" y2="80" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="40" y1="80" x2="38" y2="112" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      <rect x="26" y="112" width="24" height="7" rx="3.5" fill={EQ}/>
      <ellipse cx="27" cy="115" rx="5" ry="8" fill={HR}/>
      <ellipse cx="49" cy="115" rx="5" ry="8" fill={HR}/>
      {/* Bras droit : fléchi, haltère en haut */}
      <line x1="73" y1="55" x2="84" y2="80" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="84" y1="80" x2="78" y2="52" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      <rect x="72" y="43" width="24" height="7" rx="3.5" fill={EQ}/>
      <ellipse cx="73" cy="46" rx="5" ry="8" fill={HR}/>
      <ellipse cx="95" cy="46" rx="5" ry="8" fill={HR}/>
      {/* Jambe gauche */}
      <line x1="56" y1="96" x2="52" y2="132" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="52" y1="132" x2="50" y2="167" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Jambe droite */}
      <line x1="68" y1="96" x2="72" y2="132" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      <line x1="72" y1="132" x2="74" y2="167" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="48" cy="169" rx="14" ry="5" fill={SH}/>
      <ellipse cx="76" cy="169" rx="14" ry="5" fill={SH}/>
    </svg>
  )
}

function PlankSVG() {
  // Vue de profil : gainage avant-bras, corps droit
  return (
    <svg viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="110" fill={BG} rx="14"/>
      <line x1="12" y1="102" x2="188" y2="102" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête profil */}
      <ellipse cx="24" cy="58" rx="12" ry="13" fill={SK}/>
      <path d="M12 56 Q12 43 24 43 Q36 43 36 56" fill={HR}/>
      {/* Corps horizontal */}
      <line x1="35" y1="62" x2="150" y2="67" stroke={LM} strokeWidth="8" strokeLinecap="round"/>
      {/* Avant-bras gauche (au sol) */}
      <line x1="52" y1="65" x2="38" y2="76" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="38" y1="76" x2="22" y2="78" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Avant-bras droit */}
      <line x1="95" y1="67" x2="100" y2="78" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      <line x1="100" y1="78" x2="116" y2="80" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Hanches */}
      <ellipse cx="150" cy="70" rx="10" ry="7" fill={NV}/>
      {/* Jambe avant */}
      <line x1="150" y1="74" x2="165" y2="88" stroke={NV} strokeWidth="6" strokeLinecap="round"/>
      {/* Jambe arrière */}
      <line x1="155" y1="70" x2="172" y2="84" stroke={NV} strokeWidth="6" strokeLinecap="round"/>
      {/* Avant-bras au sol */}
      <ellipse cx="21" cy="79" rx="12" ry="4" fill={SK}/>
      <ellipse cx="116" cy="81" rx="12" ry="4" fill={SK}/>
      {/* Orteils */}
      <ellipse cx="165" cy="92" rx="9" ry="4" fill={SH}/>
      <ellipse cx="173" cy="87" rx="8" ry="4" fill={SH}/>
    </svg>
  )
}

function CrunchSVG() {
  // Vue de profil : allongé, buste relevé, genoux fléchis
  return (
    <svg viewBox="0 0 195 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="195" height="115" fill={BG} rx="14"/>
      <line x1="12" y1="106" x2="183" y2="106" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête relevée */}
      <ellipse cx="24" cy="54" rx="12" ry="13" fill={SK}/>
      <path d="M12 52 Q12 39 24 39 Q36 39 36 52" fill={HR}/>
      {/* Buste relevé ~35° */}
      <line x1="33" y1="60" x2="78" y2="76" stroke={LM} strokeWidth="8" strokeLinecap="round"/>
      {/* Mains derrière la tête */}
      <line x1="35" y1="54" x2="22" y2="42" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      <line x1="36" y1="54" x2="48" y2="42" stroke={SK} strokeWidth="5" strokeLinecap="round"/>
      {/* Bas du dos / bassin au sol */}
      <line x1="78" y1="76" x2="125" y2="82" stroke={NV} strokeWidth="9" strokeLinecap="round"/>
      {/* Cuisse gauche (genoux fléchis) */}
      <line x1="115" y1="82" x2="142" y2="66" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      {/* Mollet gauche */}
      <line x1="142" y1="66" x2="164" y2="84" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Cuisse droite */}
      <line x1="125" y1="84" x2="150" y2="68" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Mollet droit */}
      <line x1="150" y1="68" x2="170" y2="88" stroke={NV} strokeWidth="6" strokeLinecap="round"/>
      {/* Pieds */}
      <ellipse cx="164" cy="88" rx="12" ry="5" fill={SH}/>
      <ellipse cx="170" cy="92" rx="11" ry="5" fill={SH}/>
    </svg>
  )
}

function BridgeSVG() {
  // Vue de profil : hip thrust, hanches hautes, pieds au sol
  return (
    <svg viewBox="0 0 195 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="195" height="115" fill={BG} rx="14"/>
      <line x1="12" y1="106" x2="183" y2="106" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Tête au sol */}
      <ellipse cx="24" cy="84" rx="12" ry="13" fill={SK}/>
      <path d="M12 82 Q12 69 24 69 Q36 69 36 82" fill={HR}/>
      {/* Épaules/dos supérieur au sol */}
      <line x1="33" y1="90" x2="74" y2="92" stroke={LM} strokeWidth="8" strokeLinecap="round"/>
      {/* Bras gauche au sol */}
      <line x1="44" y1="92" x2="32" y2="102" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      {/* Bras droit au sol */}
      <line x1="62" y1="92" x2="72" y2="102" stroke={LM} strokeWidth="6" strokeLinecap="round"/>
      {/* Bas du dos remontant aux hanches */}
      <line x1="74" y1="90" x2="108" y2="54" stroke={NV} strokeWidth="9" strokeLinecap="round"/>
      {/* Hanches en haut */}
      <ellipse cx="108" cy="53" rx="11" ry="8" fill={NV}/>
      {/* Cuisse gauche descendant vers pied */}
      <line x1="112" y1="58" x2="142" y2="84" stroke={NV} strokeWidth="8" strokeLinecap="round"/>
      {/* Mollet gauche vertical */}
      <line x1="142" y1="84" x2="142" y2="106" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Cuisse droite */}
      <line x1="118" y1="56" x2="150" y2="80" stroke={NV} strokeWidth="7" strokeLinecap="round"/>
      {/* Mollet droit */}
      <line x1="150" y1="80" x2="152" y2="106" stroke={NV} strokeWidth="6" strokeLinecap="round"/>
      {/* Chaussures */}
      <ellipse cx="140" cy="107" rx="14" ry="5" fill={SH}/>
      <ellipse cx="152" cy="107" rx="13" ry="5" fill={SH}/>
    </svg>
  )
}

// ── Map poses → SVG ────────────────────────────────────────────────

const POSE_SVGS: Record<Pose, React.ReactElement> = {
  push: <PushSVG />,
  squat: <SquatSVG />,
  lunge: <LungeSVG />,
  deadlift: <DeadliftSVG />,
  row: <RowSVG />,
  pull: <PullSVG />,
  press: <PressSVG />,
  curl: <CurlSVG />,
  plank: <PlankSVG />,
  crunch: <CrunchSVG />,
  bridge: <BridgeSVG />,
}

// ── Export ─────────────────────────────────────────────────────────

interface Props {
  slug: string
  className?: string
}

export default function ExerciseIllustration({ slug, className = '' }: Props) {
  const pose = getPose(slug)
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      {POSE_SVGS[pose]}
    </div>
  )
}
