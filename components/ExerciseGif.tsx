import AI_IMAGES from '@/data/exercise-images.json'
import ExerciseMuscleMap from './ExerciseMuscleMap'

const BASE = 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main'

export const EXERCISE_GIFS: Record<string, string> = {
  // ── PECTORAUX ─────────────────────────────────────────────────────────
  'developpe-couche-barre':      `${BASE}/pectorals/barbell-bench-press.gif`,
  'developpe-couche-halteres':   `${BASE}/pectorals/dumbbell-bench-press.gif`,
  'developpe-incline-barre':     `${BASE}/pectorals/barbell-incline-bench-press.gif`,
  'ecarte-halteres':             `${BASE}/pectorals/dumbbell-fly.gif`,
  'pompes':                      `${BASE}/pectorals/push-up.gif`,
  'pompes-serrees':              `${BASE}/pectorals/chest-tap-push-up-male.gif`,
  'pompes-declinees':            `${BASE}/pectorals/decline-push-up.gif`,
  'pike-push-up':                `${BASE}/pectorals/exercise-ball-pike-push-up.gif`,
  'archer-push-up':              `${BASE}/pectorals/archer-push-up.gif`,
  'pseudo-planche-push-up':      `${BASE}/pectorals/full-planche-push-up.gif`,
  'developpe-arnold':            `${BASE}/delts/dumbbell-arnold-press.gif`,
  'pullover':                    `${BASE}/pectorals/dumbbell-pullover.gif`,

  // ── DOS ───────────────────────────────────────────────────────────────
  'tractions':                   `${BASE}/lats/pull-up.gif`,
  'tractions-supination':        `${BASE}/lats/chin-up.gif`,
  'souleve-de-terre':            `${BASE}/glutes/barbell-deadlift.gif`,
  'rowing-barre':                `${BASE}/upper-back/barbell-reverse-grip-bent-over-row.gif`,
  'rowing-haltere':              `${BASE}/upper-back/barbell-one-arm-bent-over-row.gif`,
  'tirage-poitrine':             `${BASE}/lats/cable-pulldown.gif`,
  'tirage-horizontal':           `${BASE}/upper-back/cable-rope-seated-row.gif`,
  'tirage-menton':               `${BASE}/delts/barbell-upright-row.gif`,
  'superman':                    `${BASE}/glutes/swimmer-kicks-v-2-male.gif`,
  'good-morning':                `${BASE}/hamstrings/barbell-good-morning.gif`,
  'extension-lombaires':         `${BASE}/glutes/lever-reverse-hyperextension.gif`,
  'muscle-up':                   `${BASE}/lats/muscle-up.gif`,
  'skin-the-cat':                `${BASE}/lats/l-pull-up.gif`,
  'front-lever-tuck':            `${BASE}/abs/front-lever.gif`,

  // ── ÉPAULES ───────────────────────────────────────────────────────────
  'developpe-militaire':         `${BASE}/delts/barbell-seated-overhead-press.gif`,
  'developpe-halteres-epaules':  `${BASE}/delts/dumbbell-seated-shoulder-press.gif`,
  'elevations-laterales':        `${BASE}/delts/dumbbell-lateral-raise.gif`,
  'haussements-epaules':         `${BASE}/traps/barbell-shrug.gif`,
  'oiseau-halteres':             `${BASE}/delts/dumbbell-rear-delt-raise.gif`,
  'face-pull':                   `${BASE}/delts/cable-rear-delt-row-with-rope.gif`,

  // ── BICEPS ────────────────────────────────────────────────────────────
  'curl-barre':                  `${BASE}/biceps/barbell-curl.gif`,
  'curl-halteres-alternes':      `${BASE}/biceps/dumbbell-alternate-biceps-curl.gif`,
  'curl-marteau':                `${BASE}/biceps/dumbbell-hammer-curl.gif`,
  'curl-inverse':                `${BASE}/biceps/barbell-reverse-curl.gif`,
  'curl-pupitre':                `${BASE}/biceps/barbell-preacher-curl.gif`,

  // ── TRICEPS ───────────────────────────────────────────────────────────
  'dips':                        `${BASE}/triceps/triceps-dip.gif`,
  'dips-banc':                   `${BASE}/triceps/bench-dip-knees-bent.gif`,
  'extension-triceps-poulie':    `${BASE}/triceps/cable-triceps-pushdown-v-bar.gif`,
  'skull-crusher':               `${BASE}/triceps/barbell-lying-triceps-extension-skull-crusher.gif`,

  // ── ABDOMINAUX ────────────────────────────────────────────────────────
  'planche':                     `${BASE}/abs/weighted-front-plank.gif`,
  'planche-laterale':            `${BASE}/abs/side-bridge-v-2.gif`,
  'planche-commando':            `${BASE}/abs/push-up-to-side-plank.gif`,
  'crunch':                      `${BASE}/abs/crunch-floor.gif`,
  'mountain-climbers':           `${BASE}/cardio/mountain-climber.gif`,
  'releve-de-jambes':            `${BASE}/abs/hanging-straight-leg-raise.gif`,
  'russian-twist':               `${BASE}/abs/russian-twist.gif`,
  'v-up':                        `${BASE}/abs/band-v-up.gif`,
  'ab-wheel-rollout':            `${BASE}/abs/wheel-rollerout.gif`,
  'dragon-flag':                 `${BASE}/abs/flag.gif`,
  'l-sit':                       `${BASE}/abs/l-sit-on-floor.gif`,
  'hollow-body':                 `${BASE}/abs/crunch-hands-overhead.gif`,
  'pallof-press':                `${BASE}/abs/band-horizontal-pallof-press.gif`,
  'dead-bug':                    `${BASE}/abs/dead-bug.gif`,
  'bird-dog':                    `${BASE}/abs/kneeling-plank-tap-shoulder-male.gif`,

  // ── PILATES ───────────────────────────────────────────────────────────
  'hundred-pilates':             `${BASE}/abs/curl-up.gif`,
  'roll-up':                     `${BASE}/abs/arms-overhead-full-sit-up-male.gif`,
  'teaser-pilates':              `${BASE}/abs/v-sit-on-floor.gif`,
  'clamshell':                   `${BASE}/abductors/side-hip-abduction.gif`,
  'swimming-pilates':            `${BASE}/glutes/swimmer-kicks-v-2-male.gif`,

  // ── QUADRICEPS / JAMBES ───────────────────────────────────────────────
  'squat-barre':                 `${BASE}/quads/barbell-wide-squat.gif`,
  'squat-gobelet':               `${BASE}/quads/dumbbell-goblet-squat.gif`,
  'fentes':                      `${BASE}/glutes/barbell-lunge.gif`,
  'squat-bulgare':               `${BASE}/quads/barbell-side-split-squat.gif`,
  'presse-cuisses':              `${BASE}/glutes/sled-45-leg-press.gif`,
  'hack-squat':                  `${BASE}/glutes/barbell-hack-squat.gif`,
  'leg-extension':               `${BASE}/quads/lever-leg-extension.gif`,
  'pistol-squat':                `${BASE}/glutes/single-leg-squat-pistol-male.gif`,
  'shrimp-squat':                `${BASE}/quads/barbell-one-leg-squat.gif`,
  'wall-sit':                    `${BASE}/glutes/march-sit-wall.gif`,
  'farmer-walk':                 `${BASE}/quads/farmers-walk.gif`,

  // ── ISCHIO-JAMBIERS ───────────────────────────────────────────────────
  'souleve-de-terre-roumain':    `${BASE}/glutes/barbell-romanian-deadlift.gif`,
  'leg-curl-allonge':            `${BASE}/hamstrings/lever-lying-leg-curl.gif`,
  'nordic-curl':                 `${BASE}/hamstrings/glute-ham-raise.gif`,
  'reverse-nordic-curl':         `${BASE}/hamstrings/inverse-leg-curl-bench-support.gif`,
  'jefferson-curl':              `${BASE}/hamstrings/barbell-straight-leg-deadlift.gif`,

  // ── FESSIERS ──────────────────────────────────────────────────────────
  'hip-thrust':                  `${BASE}/glutes/resistance-band-hip-thrusts-on-knees-female.gif`,
  'pont-fessier':                `${BASE}/glutes/barbell-glute-bridge.gif`,
  'donkey-kicks':                `${BASE}/glutes/band-bent-over-hip-extension.gif`,
  'abduction-hanche-cable':      `${BASE}/abductors/side-hip-abduction.gif`,
  'soulevé-sumo':                `${BASE}/glutes/barbell-sumo-deadlift.gif`,
  'copenhagen-plank':            `${BASE}/adductors/side-plank-hip-adduction.gif`,

  // ── MOLLETS ───────────────────────────────────────────────────────────
  'mollets-debout':              `${BASE}/calves/barbell-standing-calf-raise.gif`,
  'mollets-assis':               `${BASE}/calves/barbell-seated-calf-raise.gif`,

  // ── CARDIO ────────────────────────────────────────────────────────────
  'burpees':                     `${BASE}/cardio/burpee.gif`,

  // ── SPORT — PADEL ─────────────────────────────────────────────────────
  'rotation-tronc-padel':        `${BASE}/abs/spine-twist.gif`,
  'fentes-laterales-padel':      `${BASE}/glutes/barbell-lateral-lunge.gif`,
  'rotation-externe-epaule':     `${BASE}/delts/cable-standing-shoulder-external-rotation.gif`,
  'sauts-lateraux-padel':        `${BASE}/cardio/skater-hops.gif`,
  'gainage-oblique-padel':       `${BASE}/abs/side-bridge-v-2.gif`,
  'shoulder-press-padel':        `${BASE}/delts/barbell-seated-overhead-press.gif`,

  // ── SPORT — GOLF ─────────────────────────────────────────────────────
  'rotation-hanche-golf':        `${BASE}/abs/cable-standing-lift.gif`,
  'deadlift-roumain-golf':       `${BASE}/glutes/barbell-romanian-deadlift.gif`,
  'planche-golf':                `${BASE}/abs/weighted-front-plank.gif`,
  'squat-gobelet-golf':          `${BASE}/quads/dumbbell-goblet-squat.gif`,
  'face-pull-golf':              `${BASE}/delts/cable-rear-delt-row-with-rope.gif`,

  // ── SPORT — TENNIS ───────────────────────────────────────────────────
  'split-step-tennis':           `${BASE}/cardio/skater-hops.gif`,
  'rotation-service-tennis':     `${BASE}/abs/cable-standing-lift.gif`,
  'bulgarian-split-tennis':      `${BASE}/quads/barbell-side-split-squat.gif`,
  'nordic-curl-tennis':          `${BASE}/hamstrings/glute-ham-raise.gif`,
  'gainage-rotation-tennis':     `${BASE}/abs/front-plank-with-twist.gif`,
}

const FALLBACK = `${BASE}/abs/weighted-front-plank.gif`

interface ExerciseGifProps {
  slug: string
  className?: string
}

export default function ExerciseGif({ slug, className = '' }: ExerciseGifProps) {
  const aiSrc = (AI_IMAGES as Record<string, string | null>)[slug]
  const gifSrc = EXERCISE_GIFS[slug]

  // 1. GIF animé GitHub DB — priorité absolue
  if (gifSrc) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-2xl flex flex-col ${className}`}
        style={{ aspectRatio: '9/16', background: '#08080f' }}
      >
        {/* Barre rouge haute — accent marque */}
        <div style={{ height: 3, background: '#E63946', flexShrink: 0 }}/>

        {/* Zone GIF — fond blanc intentionnel encadré */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#08080f',
          position: 'relative',
          padding: '16px 16px 12px',
        }}>
          {/* Halo rouge derrière le GIF */}
          <div style={{
            position: 'absolute',
            width: '70%', height: '50%',
            background: 'radial-gradient(ellipse, rgba(230,57,70,0.12) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}/>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gifSrc}
            alt={slug.replace(/-/g, ' ')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: 12,
              position: 'relative',
              zIndex: 1,
              filter: 'contrast(1.05) saturate(1.08)',
            }}
            loading="lazy"
          />
          {/* Badge top-right */}
          <div style={{
            position: 'absolute', top: 20, right: 20,
            background: '#E63946',
            color: '#fff', fontSize: 9, fontWeight: 800,
            letterSpacing: '0.12em', padding: '4px 8px', borderRadius: 4,
            zIndex: 2,
          }}>▶ ANIMÉ</div>
        </div>

        {/* Footer info */}
        <div style={{
          flexShrink: 0,
          padding: '10px 16px 12px',
          background: 'linear-gradient(180deg, #0d0d1a 0%, #0a0a14 100%)',
          borderTop: '1px solid rgba(230,57,70,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E63946', flexShrink: 0 }}/>
          <span style={{ color: '#EDE8E0', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {slug.replace(/-/g, ' ')}
          </span>
        </div>
      </div>
    )
  }

  // 2. Photo IA Imagen 4 Ultra (fallback si pas de GIF)
  if (aiSrc) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl ${className}`}
        style={{ aspectRatio: '9/16', background: '#0a0a14' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={aiSrc}
          alt={slug.replace(/-/g, ' ')}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }

  // 3. Fallback SVG mannequin 3D
  return <ExerciseMuscleMap slug={slug} className={className} />
}
