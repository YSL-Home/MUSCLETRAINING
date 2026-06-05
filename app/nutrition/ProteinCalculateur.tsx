'use client'

import { useState } from 'react'

const LABEL_STYLE = {
  color: '#E63946',
  fontSize: '0.875rem',
  fontWeight: 600,
  display: 'block',
  marginBottom: '0.25rem',
} as const

const INPUT_STYLE = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  padding: '0.625rem 0.75rem',
  color: '#EDE8E0',
  outline: 'none',
  fontSize: '1rem',
} as const

const SOURCES: Record<string, { aliment: string; pour100g: number; quantite: string }[]> = {
  prise: [
    { aliment: 'Blanc de poulet', pour100g: 31, quantite: '200g / repas' },
    { aliment: 'Thon en boîte', pour100g: 25, quantite: '1 boîte (185g)' },
    { aliment: 'Œufs entiers', pour100g: 13, quantite: '3–4 œufs' },
    { aliment: 'Fromage blanc 0%', pour100g: 10, quantite: '250g' },
    { aliment: 'Whey protéine', pour100g: 78, quantite: '30g (1 dose)' },
  ],
  maintien: [
    { aliment: 'Steak haché 5%', pour100g: 21, quantite: '150g / repas' },
    { aliment: 'Saumon frais', pour100g: 25, quantite: '150g / repas' },
    { aliment: 'Lentilles cuites', pour100g: 9, quantite: '200g' },
    { aliment: 'Yaourt grec', pour100g: 9, quantite: '200g' },
    { aliment: 'Tofu ferme', pour100g: 16, quantite: '150g' },
  ],
  seche: [
    { aliment: 'Crevettes', pour100g: 24, quantite: '150g / repas' },
    { aliment: 'Cabillaud', pour100g: 20, quantite: '200g' },
    { aliment: 'Blanc d\'œuf', pour100g: 11, quantite: '5 blancs' },
    { aliment: 'Cottage cheese', pour100g: 11, quantite: '200g' },
    { aliment: 'Edamame', pour100g: 12, quantite: '150g' },
  ],
}

interface Props {
  onObjectifChange?: (o: 'prise' | 'maintien' | 'seche') => void
}

export default function ProteinCalculateur({ onObjectifChange }: Props = {}) {
  const [poids, setPoids] = useState('')
  const [objectif, setObjectif] = useState<'prise' | 'maintien' | 'seche'>('prise')

  const handleObjectif = (key: 'prise' | 'maintien' | 'seche') => {
    setObjectif(key)
    onObjectifChange?.(key)
  }

  const MULTIPLICATEUR = { prise: 2.2, maintien: 1.8, seche: 2.5 }

  const proteinesJour = poids
    ? Math.round(parseFloat(poids) * MULTIPLICATEUR[objectif])
    : null

  return (
    <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)', borderRadius: '1rem', padding: '1.5rem' }}>
      <h2 style={{ color: '#EDE8E0', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>Calculateur Besoins Protéines</h2>
      <p style={{ color: '#5A6478', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Estimez votre apport protéique quotidien selon votre objectif</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={LABEL_STYLE}>Poids (kg)</label>
          <input
            type="number"
            value={poids}
            onChange={e => setPoids(e.target.value)}
            placeholder="70"
            style={INPUT_STYLE}
          />
        </div>
        <div>
          <label style={{ ...LABEL_STYLE, marginBottom: '0.5rem' }}>Objectif</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {([['prise', 'Prise de masse'], ['maintien', 'Maintien'], ['seche', 'Sèche']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleObjectif(key)}
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
      </div>

      {proteinesJour && (
        <>
          <div style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1.25rem', background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.3)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#E63946', lineHeight: 1, marginBottom: '0.25rem' }}>{proteinesJour}g</div>
            <div style={{ color: '#E63946', fontSize: '0.875rem', fontWeight: 500 }}>protéines / jour</div>
            <div style={{ color: '#5A6478', fontSize: '0.75rem', marginTop: '0.375rem' }}>
              Soit {MULTIPLICATEUR[objectif]}g / kg de poids corporel
            </div>
          </div>
          <div>
            <div style={{ color: '#5A6478', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Sources recommandées
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {SOURCES[objectif].map(s => (
                <div key={s.aliment} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.03)', fontSize: '0.875rem' }}>
                  <span style={{ color: '#EDE8E0', fontWeight: 500 }}>{s.aliment}</span>
                  <span style={{ color: '#E63946', fontWeight: 700 }}>{s.pour100g}g prot/100g</span>
                  <span style={{ color: '#5A6478', fontSize: '0.75rem' }}>{s.quantite}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
