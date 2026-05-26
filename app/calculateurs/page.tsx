'use client'

import { useState } from 'react'

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
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Calcul IMC</h2>
      <p className="text-slate-500 text-sm mb-5">Indice de Masse Corporelle — évalue votre corpulence</p>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">Poids (kg)</label>
          <input type="number" value={poids} onChange={e => setPoids(e.target.value)} placeholder="70" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-lime-300 transition-colors" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">Taille (cm)</label>
          <input type="number" value={taille} onChange={e => setTaille(e.target.value)} placeholder="175" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-lime-300 transition-colors" />
        </div>
      </div>
      {imc && cat && (
        <div className="text-center p-5 rounded-xl" style={{ background: cat.color + '11', border: `1px solid ${cat.color}33` }}>
          <div className="text-4xl font-black mb-1" style={{ color: cat.color }}>{imc}</div>
          <div className="font-semibold" style={{ color: cat.color }}>{cat.label}</div>
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
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Calculateur Macros</h2>
      <p className="text-slate-500 text-sm mb-5">Estimez vos besoins caloriques et macronutriments</p>
      <div className="space-y-4 mb-5">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">Poids (kg)</label>
          <input type="number" value={poids} onChange={e => setPoids(e.target.value)} placeholder="70" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-lime-300" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Objectif</label>
          <div className="grid grid-cols-3 gap-2">
            {([['prise', 'Prise de masse'], ['maintien', 'Maintien'], ['seche', 'Sèche']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setObjectif(key)} className={`py-2 rounded-lg text-sm font-semibold transition-all ${objectif === key ? 'text-white' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'}`} style={objectif === key ? { background: '#b8d400' } : {}}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Niveau d&apos;activité</label>
          <select value={activite} onChange={e => setActivite(e.target.value as typeof activite)} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-lime-300">
            <option value="sedentaire">Sédentaire (bureau, peu d&apos;exercice)</option>
            <option value="leger">Léger (1–2 séances/semaine)</option>
            <option value="modere">Modéré (3–4 séances/semaine)</option>
            <option value="actif">Actif (5–6 séances/semaine)</option>
          </select>
        </div>
      </div>
      {cal && (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 text-center p-4 rounded-xl" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
            <div className="text-3xl font-black text-lime-500">{cal}</div>
            <div className="text-lime-700 text-sm font-medium">calories / jour</div>
          </div>
          {[['Protéines', proteines, 'g', '#3b82f6'], ['Glucides', glucides, 'g', '#16a34a'], ['Lipides', lipides, 'g', '#f59e0b']].map(([label, val, unit, color]) => (
            <div key={label as string} className="text-center p-3 rounded-xl border border-slate-100 bg-slate-50">
              <div className="text-xl font-black" style={{ color: color as string }}>{val}{unit}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
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
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Calculateur 1RM</h2>
      <p className="text-slate-500 text-sm mb-5">Estimez votre répétition maximale (formule d&apos;Epley)</p>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">Charge soulevée (kg)</label>
          <input type="number" value={poids} onChange={e => setPoids(e.target.value)} placeholder="100" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-lime-300" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">Répétitions réalisées</label>
          <input type="number" value={reps} onChange={e => setReps(e.target.value)} placeholder="5" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-lime-300" />
        </div>
      </div>
      {rm && (
        <div>
          <div className="text-center p-4 rounded-xl mb-4" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div className="text-3xl font-black text-green-600">{rm} kg</div>
            <div className="text-green-700 text-sm font-medium">1 répétition maximale estimée</div>
          </div>
          <div className="space-y-2">
            {pourcentages.map(p => (
              <div key={p} className="flex justify-between items-center py-1.5 px-3 rounded-lg hover:bg-slate-50 text-sm">
                <span className="text-slate-500">{p}% 1RM</span>
                <span className="font-bold text-slate-800">{Math.round(rm * p / 100)} kg</span>
                <span className="text-slate-400 text-xs">≈ {p >= 95 ? '1' : p >= 90 ? '2-3' : p >= 85 ? '4-5' : p >= 80 ? '6' : p >= 75 ? '8' : p >= 70 ? '10-12' : p >= 65 ? '15' : '20+'} reps</span>
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-black text-slate-900 mb-2">Calculateurs</h1>
      <p className="text-slate-500 text-lg mb-10">Des outils gratuits pour optimiser votre entraînement et votre nutrition.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IMCCalculateur />
        <MacroCalculateur />
        <div className="lg:col-span-2">
          <RepMaxCalculateur />
        </div>
      </div>
    </div>
  )
}
