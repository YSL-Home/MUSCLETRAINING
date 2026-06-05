'use client'

import { useState } from 'react'

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(230,57,70,0.1)',
  borderRadius: '1rem',
  padding: '1.5rem',
}

const LABEL_STYLE = {
  color: '#E63946',
  fontSize: '0.875rem',
  fontWeight: 600,
  display: 'block',
  marginBottom: '0.25rem',
}

const INPUT_STYLE = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  padding: '0.625rem 0.75rem',
  color: '#EDE8E0',
  outline: 'none',
  fontSize: '1rem',
}

const SELECT_STYLE = {
  ...INPUT_STYLE,
  cursor: 'pointer',
}

function IMCCalculateur() {
  const [poids, setPoids] = useState('')
  const [taille, setTaille] = useState('')
  const imc = poids && taille ? (parseFloat(poids) / Math.pow(parseFloat(taille) / 100, 2)).toFixed(1) : null

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Insuffisance pondérale', color: '#3b82f6' }
    if (val < 25) return { label: 'Corpulence normale ✓', color: '#16a34a' }
    if (val < 30) return { label: 'Surpoids', color: '#d97706' }
    return { label: 'Obésité', color: '#e11d48' }
  }

  const cat = imc ? getCategory(parseFloat(imc)) : null

  return (
    <div style={CARD_STYLE}>
      <h2 style={{ color: '#EDE8E0', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>Calcul IMC</h2>
      <p style={{ color: '#5A6478', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Indice de Masse Corporelle — évalue votre corpulence</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={LABEL_STYLE}>Poids (kg)</label>
          <input type="number" value={poids} onChange={e => setPoids(e.target.value)} placeholder="70" style={INPUT_STYLE} />
        </div>
        <div>
          <label style={LABEL_STYLE}>Taille (cm)</label>
          <input type="number" value={taille} onChange={e => setTaille(e.target.value)} placeholder="175" style={INPUT_STYLE} />
        </div>
      </div>
      {imc && cat && (
        <div style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '0.75rem', background: cat.color + '22', border: `1px solid ${cat.color}44` }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: cat.color, lineHeight: 1, marginBottom: '0.25rem' }}>{imc}</div>
          <div style={{ fontWeight: 600, color: cat.color }}>{cat.label}</div>
        </div>
      )}
    </div>
  )
}

function MacroCalculateur() {
  const [poids, setPoids] = useState('')
  const [objectif, setObjectif] = useState<'prise' | 'maintien' | 'seche'>('maintien')
  const [activite, setActivite] = useState<'sedentaire' | 'leger' | 'modere' | 'actif'>('modere')

  const MULTIPLICATEUR = { sedentaire: 1.2, leger: 1.375, modere: 1.55, actif: 1.725 }
  const AJUSTEMENT = { prise: 300, maintien: 0, seche: -400 }

  const calcCalories = () => {
    if (!poids) return null
    const bmr = parseFloat(poids) * 22 * 1.6
    return Math.round(bmr * MULTIPLICATEUR[activite] + AJUSTEMENT[objectif])
  }

  const cal = calcCalories()
  const proteines = poids ? Math.round(parseFloat(poids) * 2) : null
  const lipides = cal ? Math.round(cal * 0.25 / 9) : null
  const glucides = cal && proteines && lipides ? Math.round((cal - proteines * 4 - lipides * 9) / 4) : null

  return (
    <div style={CARD_STYLE}>
      <h2 style={{ color: '#EDE8E0', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>Calculateur Macros</h2>
      <p style={{ color: '#5A6478', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Estimez vos besoins caloriques et macronutriments</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={LABEL_STYLE}>Poids (kg)</label>
          <input type="number" value={poids} onChange={e => setPoids(e.target.value)} placeholder="70" style={INPUT_STYLE} />
        </div>
        <div>
          <label style={{ ...LABEL_STYLE, marginBottom: '0.5rem' }}>Objectif</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {([['prise', 'Prise de masse'], ['maintien', 'Maintien'], ['seche', 'Sèche']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setObjectif(key)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: objectif === key ? '#E63946' : 'rgba(255,255,255,0.07)',
                  color: objectif === key ? '#07070F' : '#EDE8E0',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ ...LABEL_STYLE, marginBottom: '0.5rem' }}>Niveau d&apos;activité</label>
          <select value={activite} onChange={e => setActivite(e.target.value as typeof activite)} style={SELECT_STYLE}>
            <option value="sedentaire">Sédentaire (bureau, peu d&apos;exercice)</option>
            <option value="leger">Léger (1–2 séances/semaine)</option>
            <option value="modere">Modéré (3–4 séances/semaine)</option>
            <option value="actif">Actif (5–6 séances/semaine)</option>
          </select>
        </div>
      </div>
      {cal && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.3)' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#E63946' }}>{cal}</div>
            <div style={{ color: '#E63946', fontSize: '0.875rem', fontWeight: 500 }}>calories / jour</div>
          </div>
          {[['Protéines', proteines, 'g', '#3b82f6'], ['Glucides', glucides, 'g', '#16a34a'], ['Lipides', lipides, 'g', '#f59e0b']].map(([label, val, unit, color]) => (
            <div key={label as string} style={{ textAlign: 'center', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: color as string }}>{val}{unit}</div>
              <div style={{ color: '#5A6478', fontSize: '0.75rem', marginTop: '0.125rem' }}>{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function OneRMCalculateur() {
  const [poids, setPoids] = useState('')
  const [reps, setReps] = useState('')

  const w = parseFloat(poids)
  const r = parseFloat(reps)

  const calcEpley = () => (w && r) ? w * (1 + r / 30) : null
  const calcBrzycki = () => (w && r && r < 37) ? w * 36 / (37 - r) : null
  const calcLander = () => (w && r) ? (100 * w) / (101.3 - 2.67123 * r) : null

  const epley = calcEpley()
  const brzycki = calcBrzycki()
  const lander = calcLander()

  const POURCENTAGES: [number, string][] = [
    [90, '3-4'], [85, '5-6'], [80, '6-8'], [75, '8-10'], [70, '10-12'], [65, '14-16'], [60, '16-20'],
  ]

  const formulas = [
    { name: 'Epley', val: epley, color: '#E63946', formula: 'w × (1 + r/30)' },
    { name: 'Brzycki', val: brzycki, color: '#3b82f6', formula: 'w × 36 / (37 − r)' },
    { name: 'Lander', val: lander, color: '#f59e0b', formula: '100w / (101.3 − 2.67r)' },
  ]

  const hasResult = epley || brzycki || lander

  return (
    <div style={CARD_STYLE}>
      <h2 style={{ color: '#EDE8E0', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>Calculateur 1RM — 3 formules</h2>
      <p style={{ color: '#5A6478', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Comparez Epley, Brzycki et Lander pour estimer votre répétition maximale</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={LABEL_STYLE}>Poids soulevé (kg)</label>
          <input type="number" value={poids} onChange={e => setPoids(e.target.value)} placeholder="100" style={INPUT_STYLE} />
        </div>
        <div>
          <label style={LABEL_STYLE}>Répétitions effectuées</label>
          <input type="number" value={reps} onChange={e => setReps(e.target.value)} placeholder="5" style={INPUT_STYLE} min="1" max="36" />
        </div>
      </div>
      {hasResult && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {formulas.map(({ name, val, color, formula }) => (
              <div key={name} style={{ textAlign: 'center', padding: '1rem 0.5rem', borderRadius: '0.75rem', background: color + '18', border: `1px solid ${color}44` }}>
                <div style={{ fontSize: '1.375rem', fontWeight: 900, color, lineHeight: 1, marginBottom: '0.25rem' }}>
                  {val ? Math.round(val) + ' kg' : '—'}
                </div>
                <div style={{ color, fontSize: '0.875rem', fontWeight: 700 }}>{name}</div>
                <div style={{ color: '#5A6478', fontSize: '0.65rem', marginTop: '0.25rem' }}>{formula}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#5A6478', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tableau de % (basé sur Epley)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {epley && POURCENTAGES.map(([pct, approxReps]) => (
                <div key={pct} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.03)' }}>
                  <span style={{ color: '#5A6478', minWidth: '3.5rem' }}>{pct}% 1RM</span>
                  <span style={{ fontWeight: 700, color: '#EDE8E0' }}>{Math.round(epley * pct / 100)} kg</span>
                  <span style={{ color: '#5A6478', fontSize: '0.75rem' }}>≈ {approxReps} reps</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function RepMaxCalculateur() {
  const [poids, setPoids] = useState('')
  const [reps, setReps] = useState('')

  const calc1RM = () => {
    if (!poids || !reps) return null
    return Math.round(parseFloat(poids) * (1 + parseFloat(reps) / 30))
  }

  const rm = calc1RM()
  const pourcentages = rm ? [100, 95, 90, 85, 80, 75, 70, 65] : []

  return (
    <div style={CARD_STYLE}>
      <h2 style={{ color: '#EDE8E0', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>Calculateur 1RM</h2>
      <p style={{ color: '#5A6478', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Estimez votre répétition maximale (formule d&apos;Epley)</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={LABEL_STYLE}>Charge soulevée (kg)</label>
          <input type="number" value={poids} onChange={e => setPoids(e.target.value)} placeholder="100" style={INPUT_STYLE} />
        </div>
        <div>
          <label style={LABEL_STYLE}>Répétitions réalisées</label>
          <input type="number" value={reps} onChange={e => setReps(e.target.value)} placeholder="5" style={INPUT_STYLE} />
        </div>
      </div>
      {rm && (
        <div>
          <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1rem', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.3)' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#16a34a' }}>{rm} kg</div>
            <div style={{ color: '#16a34a', fontSize: '0.875rem', fontWeight: 500 }}>1 répétition maximale estimée</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {pourcentages.map(p => (
              <div key={p} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.03)' }}>
                <span style={{ color: '#5A6478' }}>{p}% 1RM</span>
                <span style={{ fontWeight: 700, color: '#EDE8E0' }}>{Math.round(rm * p / 100)} kg</span>
                <span style={{ color: '#5A6478', fontSize: '0.75rem' }}>≈ {p >= 95 ? '1' : p >= 90 ? '2-3' : p >= 85 ? '4-5' : p >= 80 ? '6' : p >= 75 ? '8' : p >= 70 ? '10-12' : p >= 65 ? '15' : '20+'} reps</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CalculateursPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#07070F', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#EDE8E0', marginBottom: '0.5rem' }}>Calculateurs</h1>
        <p style={{ color: '#5A6478', fontSize: '1.125rem', marginBottom: '2.5rem' }}>Des outils gratuits pour optimiser votre entraînement et votre nutrition.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IMCCalculateur />
          <MacroCalculateur />
          <div className="lg:col-span-2">
            <RepMaxCalculateur />
          </div>
          <div className="lg:col-span-2">
            <OneRMCalculateur />
          </div>
        </div>
      </div>
    </div>
  )
}
