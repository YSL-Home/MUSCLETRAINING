import React from 'react'

// Composant d'illustration flat-design pour chaque type d'exercice
const SK = '#FBBF7A' // peau
const LM = '#b8d400' // haut (lime)
const NV = '#334155' // bas (navy)
const HR = '#374151' // cheveux
const EQ = '#94a3b8' // équipement
const SH = '#475569' // chaussures
const BG = '#f0fdf4' // fond

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
  if (s.includes('crunch') || s.includes('releve') || s.includes('oblique') || s.includes('abdos')) return 'crunch'
  if (s.includes('hip') || s.includes('pont') || s.includes('bridge') || s.includes('donkey') || s.includes('kick') || s.includes('superman') || s.includes('mollet') || s.includes('rotation-externe') || s.includes('shoulder-press-padel') && false) return 'bridge'
  return 'squat'
}

// ── Poses ──────────────────────────────────────────────────────────────────

function PushSVG() {
  return (
    <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="110" fill={BG} rx="14"/>
      <line x1="12" y1="102" x2="148" y2="102" stroke="#e2e8f0" strokeWidth="2"/>
      <ellipse cx="22" cy="57" rx="11" ry="12" fill={SK}/>
      <path d="M11 55 Q11 42 22 42 Q33 42 33 55" fill={HR}/>
      <line x1="31" y1="63" x2="120" y2="70" stroke={LM} strokeWidth="16" strokeLinecap="round"/>
      <line x1="46" y1="67" x2="42" y2="88" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="42" y1="88" x2="29" y2="93" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="90" y1="70" x2="97" y2="88" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="97" y1="88" x2="112" y2="93" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="120" cy="73" rx="10" ry="7" fill={NV}/>
      <line x1="120" y1="77" x2="135" y2="94" stroke={NV} strokeWidth="11" strokeLinecap="round"/>
      <line x1="126" y1="73" x2="143" y2="90" stroke={NV} strokeWidth="11" strokeLinecap="round"/>
      <ellipse cx="28" cy="95" rx="9" ry="4" fill={SK}/>
      <ellipse cx="112" cy="95" rx="9" ry="4" fill={SK}/>
      <ellipse cx="135" cy="97" rx="9" ry="4" fill={SH}/>
      <ellipse cx="143" cy="93" rx="8" ry="4" fill={SH}/>
    </svg>
  )
}

function SquatSVG() {
  return (
    <svg viewBox="0 0 120 155" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="155" fill={BG} rx="14"/>
      <line x1="10" y1="147" x2="110" y2="147" stroke="#e2e8f0" strokeWidth="2"/>
      <ellipse cx="60" cy="22" rx="12" ry="13" fill={SK}/>
      <path d="M48 20 Q48 7 60 7 Q72 7 72 20" fill={HR}/>
      <line x1="60" y1="35" x2="59" y2="85" stroke={LM} strokeWidth="18" strokeLinecap="round"/>
      <line x1="48" y1="55" x2="35" y2="72" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="35" y1="72" x2="40" y2="90" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="72" y1="55" x2="85" y2="72" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="85" y1="72" x2="80" y2="90" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <rect x="46" y="88" width="26" height="14" rx="5" fill={EQ}/>
      <line x1="54" y1="88" x2="28" y2="122" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="28" y1="122" x2="26" y2="147" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="64" y1="88" x2="90" y2="122" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="90" y1="122" x2="92" y2="147" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <ellipse cx="24" cy="149" rx="13" ry="5" fill={SH}/>
      <ellipse cx="93" cy="149" rx="13" ry="5" fill={SH}/>
    </svg>
  )
}

function LungeSVG() {
  return (
    <svg viewBox="0 0 135 165" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="135" height="165" fill={BG} rx="14"/>
      <line x1="10" y1="157" x2="125" y2="157" stroke="#e2e8f0" strokeWidth="2"/>
      <ellipse cx="62" cy="21" rx="12" ry="13" fill={SK}/>
      <path d="M50 19 Q50 6 62 6 Q74 6 74 19" fill={HR}/>
      <line x1="62" y1="34" x2="63" y2="84" stroke={LM} strokeWidth="18" strokeLinecap="round"/>
      <line x1="50" y1="52" x2="37" y2="74" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="37" y1="74" x2="33" y2="94" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="74" y1="52" x2="87" y2="74" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="87" y1="74" x2="91" y2="94" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      {/* Front leg */}
      <line x1="57" y1="84" x2="36" y2="118" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="36" y1="118" x2="34" y2="157" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      {/* Back leg */}
      <line x1="68" y1="84" x2="96" y2="116" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="96" y1="116" x2="100" y2="148" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <ellipse cx="32" cy="159" rx="14" ry="5" fill={SH}/>
      <ellipse cx="100" cy="151" rx="12" ry="5" fill={SH}/>
    </svg>
  )
}

function DeadliftSVG() {
  return (
    <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="150" height="150" fill={BG} rx="14"/>
      <line x1="10" y1="142" x2="140" y2="142" stroke="#e2e8f0" strokeWidth="2"/>
      <ellipse cx="28" cy="50" rx="12" ry="13" fill={SK}/>
      <path d="M16 48 Q16 35 28 35 Q40 35 40 48" fill={HR}/>
      {/* Torso angled ~30° */}
      <line x1="38" y1="58" x2="92" y2="78" stroke={LM} strokeWidth="18" strokeLinecap="round"/>
      {/* Arms hanging to bar */}
      <line x1="52" y1="65" x2="52" y2="108" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="52" y1="108" x2="52" y2="128" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="74" y1="72" x2="74" y2="108" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="74" y1="108" x2="74" y2="128" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      {/* Barbell */}
      <rect x="30" y="125" width="88" height="8" rx="4" fill={EQ}/>
      <ellipse cx="32" cy="129" rx="7" ry="11" fill={HR}/>
      <ellipse cx="116" cy="129" rx="7" ry="11" fill={HR}/>
      {/* Hips up */}
      <ellipse cx="93" cy="80" rx="10" ry="8" fill={NV}/>
      {/* Legs */}
      <line x1="88" y1="85" x2="76" y2="118" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="76" y1="118" x2="73" y2="142" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="98" y1="83" x2="104" y2="116" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="104" y1="116" x2="106" y2="142" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <ellipse cx="71" cy="144" rx="13" ry="5" fill={SH}/>
      <ellipse cx="107" cy="144" rx="13" ry="5" fill={SH}/>
    </svg>
  )
}

function RowSVG() {
  return (
    <svg viewBox="0 0 145 155" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="145" height="155" fill={BG} rx="14"/>
      <line x1="10" y1="147" x2="135" y2="147" stroke="#e2e8f0" strokeWidth="2"/>
      <ellipse cx="27" cy="46" rx="12" ry="13" fill={SK}/>
      <path d="M15 44 Q15 31 27 31 Q39 31 39 44" fill={HR}/>
      {/* Torso ~45° */}
      <line x1="37" y1="54" x2="84" y2="86" stroke={LM} strokeWidth="18" strokeLinecap="round"/>
      {/* Support arm (left, on knee) */}
      <line x1="50" y1="65" x2="44" y2="92" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="44" y1="92" x2="40" y2="115" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      {/* Pulling arm (right, elbow back) */}
      <line x1="76" y1="80" x2="84" y2="60" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="84" y1="60" x2="88" y2="42" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      {/* Dumbbell */}
      <rect x="84" y="35" width="26" height="8" rx="4" fill={EQ}/>
      <ellipse cx="85" cy="39" rx="5" ry="8" fill={HR}/>
      <ellipse cx="109" cy="39" rx="5" ry="8" fill={HR}/>
      {/* Hips */}
      <ellipse cx="85" cy="88" rx="10" ry="8" fill={NV}/>
      {/* Front leg (bent) */}
      <line x1="80" y1="93" x2="60" y2="122" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="60" y1="122" x2="54" y2="147" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      {/* Back leg */}
      <line x1="90" y1="92" x2="105" y2="122" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="105" y1="122" x2="108" y2="147" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <ellipse cx="52" cy="149" rx="14" ry="5" fill={SH}/>
      <ellipse cx="108" cy="149" rx="13" ry="5" fill={SH}/>
    </svg>
  )
}

function PullSVG() {
  return (
    <svg viewBox="0 0 110 175" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="110" height="175" fill={BG} rx="14"/>
      {/* Bar */}
      <rect x="8" y="12" width="94" height="8" rx="4" fill={EQ}/>
      <rect x="16" y="8" width="8" height="18" rx="3" fill={HR}/>
      <rect x="86" y="8" width="8" height="18" rx="3" fill={HR}/>
      {/* Arms raised holding bar */}
      <line x1="34" y1="18" x2="42" y2="48" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="42" y1="48" x2="48" y2="65" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="76" y1="18" x2="68" y2="48" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="68" y1="48" x2="62" y2="65" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      {/* Head */}
      <ellipse cx="55" cy="55" rx="12" ry="13" fill={SK}/>
      <path d="M43 53 Q43 40 55 40 Q67 40 67 53" fill={HR}/>
      {/* Torso */}
      <line x1="55" y1="68" x2="55" y2="115" stroke={LM} strokeWidth="18" strokeLinecap="round"/>
      {/* Legs hanging */}
      <line x1="50" y1="115" x2="46" y2="148" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="46" y1="148" x2="44" y2="166" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="60" y1="115" x2="64" y2="148" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="64" y1="148" x2="66" y2="166" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <ellipse cx="43" cy="168" rx="11" ry="4" fill={SH}/>
      <ellipse cx="67" cy="168" rx="11" ry="4" fill={SH}/>
    </svg>
  )
}

function PressSVG() {
  return (
    <svg viewBox="0 0 120 165" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="165" fill={BG} rx="14"/>
      <line x1="18" y1="157" x2="102" y2="157" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Barbell overhead */}
      <rect x="16" y="14" width="88" height="7" rx="3" fill={EQ}/>
      <ellipse cx="18" cy="17" rx="6" ry="10" fill={HR}/>
      <ellipse cx="102" cy="17" rx="6" ry="10" fill={HR}/>
      {/* Arms raised */}
      <line x1="37" y1="22" x2="44" y2="52" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="44" y1="52" x2="50" y2="68" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="83" y1="22" x2="76" y2="52" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="76" y1="52" x2="70" y2="68" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      {/* Head */}
      <ellipse cx="60" cy="46" rx="12" ry="13" fill={SK}/>
      <path d="M48 44 Q48 31 60 31 Q72 31 72 44" fill={HR}/>
      {/* Torso */}
      <line x1="60" y1="59" x2="60" y2="108" stroke={LM} strokeWidth="18" strokeLinecap="round"/>
      {/* Legs */}
      <line x1="54" y1="108" x2="50" y2="138" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="50" y1="138" x2="48" y2="157" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="66" y1="108" x2="70" y2="138" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="70" y1="138" x2="72" y2="157" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <ellipse cx="46" cy="159" rx="13" ry="5" fill={SH}/>
      <ellipse cx="74" cy="159" rx="13" ry="5" fill={SH}/>
    </svg>
  )
}

function CurlSVG() {
  return (
    <svg viewBox="0 0 115 165" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="115" height="165" fill={BG} rx="14"/>
      <line x1="12" y1="157" x2="103" y2="157" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Head */}
      <ellipse cx="57" cy="22" rx="12" ry="13" fill={SK}/>
      <path d="M45 20 Q45 7 57 7 Q69 7 69 20" fill={HR}/>
      {/* Torso */}
      <line x1="57" y1="35" x2="57" y2="92" stroke={LM} strokeWidth="18" strokeLinecap="round"/>
      {/* Left arm down with dumbbell */}
      <line x1="45" y1="52" x2="36" y2="78" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="36" y1="78" x2="34" y2="108" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <rect x="22" y="108" width="24" height="7" rx="3" fill={EQ}/>
      <ellipse cx="23" cy="111" rx="5" ry="7" fill={HR}/>
      <ellipse cx="45" cy="111" rx="5" ry="7" fill={HR}/>
      {/* Right arm curled with dumbbell */}
      <line x1="69" y1="52" x2="78" y2="78" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="78" y1="78" x2="73" y2="52" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <rect x="68" y="44" width="22" height="7" rx="3" fill={EQ}/>
      <ellipse cx="69" cy="47" rx="5" ry="7" fill={HR}/>
      <ellipse cx="89" cy="47" rx="5" ry="7" fill={HR}/>
      {/* Legs */}
      <line x1="51" y1="92" x2="47" y2="128" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="47" y1="128" x2="45" y2="157" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="63" y1="92" x2="67" y2="128" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="67" y1="128" x2="69" y2="157" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <ellipse cx="43" cy="159" rx="13" ry="5" fill={SH}/>
      <ellipse cx="71" cy="159" rx="13" ry="5" fill={SH}/>
    </svg>
  )
}

function PlankSVG() {
  return (
    <svg viewBox="0 0 168 105" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="168" height="105" fill={BG} rx="14"/>
      <line x1="10" y1="97" x2="158" y2="97" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Head side */}
      <ellipse cx="22" cy="58" rx="11" ry="12" fill={SK}/>
      <path d="M11 56 Q11 43 22 43 Q33 43 33 56" fill={HR}/>
      {/* Body */}
      <line x1="31" y1="62" x2="128" y2="68" stroke={LM} strokeWidth="16" strokeLinecap="round"/>
      {/* Forearms on floor */}
      <line x1="46" y1="66" x2="32" y2="78" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="32" y1="78" x2="18" y2="80" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      <line x1="90" y1="68" x2="94" y2="80" stroke={LM} strokeWidth="9" strokeLinecap="round"/>
      <line x1="94" y1="80" x2="108" y2="82" stroke={SK} strokeWidth="8" strokeLinecap="round"/>
      {/* Hips */}
      <ellipse cx="128" cy="70" rx="10" ry="7" fill={NV}/>
      {/* Legs */}
      <line x1="128" y1="74" x2="145" y2="90" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="134" y1="70" x2="152" y2="84" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      {/* Forearms flat */}
      <ellipse cx="17" cy="81" rx="11" ry="4" fill={SK}/>
      <ellipse cx="108" cy="83" rx="11" ry="4" fill={SK}/>
      {/* Toes */}
      <ellipse cx="145" cy="94" rx="9" ry="4" fill={SH}/>
      <ellipse cx="153" cy="87" rx="8" ry="4" fill={SH}/>
    </svg>
  )
}

function CrunchSVG() {
  return (
    <svg viewBox="0 0 168 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="168" height="108" fill={BG} rx="14"/>
      <line x1="10" y1="100" x2="158" y2="100" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Head raised */}
      <ellipse cx="22" cy="52" rx="11" ry="12" fill={SK}/>
      <path d="M11 50 Q11 37 22 37 Q33 37 33 50" fill={HR}/>
      {/* Upper torso raised */}
      <line x1="30" y1="58" x2="74" y2="74" stroke={LM} strokeWidth="16" strokeLinecap="round"/>
      {/* Hands behind head */}
      <line x1="33" y1="52" x2="21" y2="40" stroke={SK} strokeWidth="7" strokeLinecap="round"/>
      <line x1="34" y1="52" x2="46" y2="40" stroke={SK} strokeWidth="7" strokeLinecap="round"/>
      {/* Lower back / hips on floor */}
      <line x1="74" y1="74" x2="118" y2="80" stroke={NV} strokeWidth="14" strokeLinecap="round"/>
      {/* Knees bent, feet on floor */}
      <line x1="108" y1="80" x2="132" y2="66" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="132" y1="66" x2="150" y2="82" stroke={NV} strokeWidth="11" strokeLinecap="round"/>
      <line x1="118" y1="82" x2="140" y2="68" stroke={NV} strokeWidth="11" strokeLinecap="round"/>
      <line x1="140" y1="68" x2="156" y2="86" stroke={NV} strokeWidth="10" strokeLinecap="round"/>
      <ellipse cx="150" cy="86" rx="11" ry="4" fill={SH}/>
      <ellipse cx="156" cy="90" rx="10" ry="4" fill={SH}/>
    </svg>
  )
}

function BridgeSVG() {
  return (
    <svg viewBox="0 0 172 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="172" height="112" fill={BG} rx="14"/>
      <line x1="10" y1="103" x2="162" y2="103" stroke="#e2e8f0" strokeWidth="2"/>
      {/* Head on floor */}
      <ellipse cx="22" cy="82" rx="11" ry="12" fill={SK}/>
      <path d="M11 80 Q11 67 22 67 Q33 67 33 80" fill={HR}/>
      {/* Shoulders/upper back */}
      <line x1="30" y1="88" x2="68" y2="90" stroke={LM} strokeWidth="14" strokeLinecap="round"/>
      {/* Arms on floor */}
      <line x1="38" y1="90" x2="28" y2="100" stroke={LM} strokeWidth="8" strokeLinecap="round"/>
      <line x1="58" y1="90" x2="66" y2="100" stroke={LM} strokeWidth="8" strokeLinecap="round"/>
      {/* Lower back rising */}
      <line x1="68" y1="88" x2="100" y2="55" stroke={NV} strokeWidth="14" strokeLinecap="round"/>
      {/* Hips at top */}
      <ellipse cx="100" cy="54" rx="11" ry="8" fill={NV}/>
      {/* Thighs going down to feet */}
      <line x1="104" y1="59" x2="132" y2="83" stroke={NV} strokeWidth="13" strokeLinecap="round"/>
      <line x1="110" y1="57" x2="138" y2="79" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      {/* Shins vertical */}
      <line x1="132" y1="83" x2="132" y2="103" stroke={NV} strokeWidth="12" strokeLinecap="round"/>
      <line x1="138" y1="79" x2="140" y2="103" stroke={NV} strokeWidth="11" strokeLinecap="round"/>
      <ellipse cx="130" cy="104" rx="13" ry="5" fill={SH}/>
      <ellipse cx="140" cy="104" rx="12" ry="5" fill={SH}/>
    </svg>
  )
}

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

// ── Export ──────────────────────────────────────────────────────────────────

interface Props {
  slug: string
  className?: string
}

export default function ExerciseIllustration({ slug, className = '' }: Props) {
  const pose = getPose(slug)
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {POSE_SVGS[pose]}
    </div>
  )
}
