'use client'

import { useEffect, useState } from 'react'

interface Props { slug: string }

const KEY = 'mt-notes'

function load(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') } catch { return {} }
}

export default function ExerciseNotes({ slug }: Props) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setText(load()[slug] ?? '')
  }, [slug])

  const save = () => {
    const map = load()
    if (text.trim()) map[slug] = text.trim()
    else delete map[slug]
    localStorage.setItem(KEY, JSON.stringify(map))
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const hasNote = !!text.trim()

  return (
    <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-5">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between">
        <h3 className="font-bold text-[#EDE8E0] flex items-center gap-2">
          <span style={{ color: '#E63946' }}>📝</span> Mes notes
          {hasNote && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(230,57,70,0.15)', color: '#E63946' }}>1</span>}
        </h3>
        <span className="text-[#5A6478] text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Mes sensations, ajustements, prise, angle de banc…"
            rows={4}
            className="w-full rounded-xl px-3 py-2.5 text-sm leading-relaxed resize-none focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(230,57,70,0.15)',
              color: '#EDE8E0',
            }}
          />
          <div className="flex gap-2">
            <button onClick={save}
              className="flex-1 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: '#E63946', color: '#fff' }}>
              ✓ Enregistrer
            </button>
            {saved && <span className="text-xs text-green-500 self-center">Sauvegardé !</span>}
          </div>
        </div>
      )}
    </div>
  )
}
