'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProteinCalculateur from './ProteinCalculateur'

interface Recette {
  nom: string
  emoji: string
  prot: number
  kcal: number
  glucides: number
  lipides: number
  temps: string
  img: string
  url: string
}

// Vraies recettes extraites de matbakh360.com (4706 recettes, filtrées par macros)
const RECETTES: Record<string, Recette[]> = {
  seche: [
    { nom: 'Kung Pao Chicken', emoji: '🍗', prot: 36, kcal: 309, glucides: 30, lipides: 11, temps: '56 min', img: 'https://www.themealdb.com/images/media/meals/1525872624.jpg', url: 'https://matbakh360.com/recipes/kung-pao-chicken.html' },
    { nom: 'Spanish Chicken Pie', emoji: '🥘', prot: 34, kcal: 258, glucides: 63, lipides: 8, temps: '21 min', img: 'https://www.themealdb.com/images/media/meals/8ovxf41763253962.jpg', url: 'https://matbakh360.com/recipes/spanish-chicken-pie.html' },
    { nom: 'Migas', emoji: '🥚', prot: 34, kcal: 275, glucides: 18, lipides: 6, temps: '51 min', img: 'https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg', url: 'https://matbakh360.com/recipes/migas.html' },
    { nom: 'Pad See Ew', emoji: '🍜', prot: 35, kcal: 320, glucides: 29, lipides: 9, temps: '32 min', img: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg', url: 'https://matbakh360.com/recipes/pad-see-ew.html' },
    { nom: 'Vietnamese Chicken Salad', emoji: '🥗', prot: 24, kcal: 285, glucides: 60, lipides: 6, temps: '58 min', img: 'https://www.themealdb.com/images/media/meals/pk8wtn1763758591.jpg', url: 'https://matbakh360.com/recipes/vietnamese-chicken-salad.html' },
    { nom: 'Thai Beef Stir-fry', emoji: '🥩', prot: 33, kcal: 346, glucides: 51, lipides: 7, temps: '51 min', img: 'https://www.themealdb.com/images/media/meals/kyuxew1763479470.jpg', url: 'https://matbakh360.com/recipes/thai-beef-stir-fry.html' },
    { nom: 'Mulukhiyah', emoji: '🫘', prot: 36, kcal: 317, glucides: 72, lipides: 9, temps: '42 min', img: 'https://www.themealdb.com/images/media/meals/x372ug1598733932.jpg', url: 'https://matbakh360.com/recipes/mulukhiyah.html' },
    { nom: 'Prawn & Noodle Salad', emoji: '🍤', prot: 22, kcal: 259, glucides: 42, lipides: 6, temps: '22 min', img: 'https://www.themealdb.com/images/media/meals/0iryz91763778419.jpg', url: 'https://matbakh360.com/recipes/prawn-noodle-salad-with-crispy-shallots.html' },
    { nom: 'Chinese Tomato Egg Stir Fry', emoji: '🥚', prot: 24, kcal: 375, glucides: 47, lipides: 9, temps: '26 min', img: 'https://www.themealdb.com/images/media/meals/rwvw8q1765660071.jpg', url: 'https://matbakh360.com/recipes/chinese-tomato-egg-stir-fry.html' },
    { nom: 'Ajo Blanco', emoji: '🥣', prot: 25, kcal: 332, glucides: 60, lipides: 8, temps: '55 min', img: 'https://www.themealdb.com/images/media/meals/5jdtie1763289302.jpg', url: 'https://matbakh360.com/recipes/ajo-blanco.html' },
    { nom: 'Vietnamese Veggie Hotpot', emoji: '🍲', prot: 26, kcal: 359, glucides: 72, lipides: 12, temps: '55 min', img: 'https://www.themealdb.com/images/media/meals/4uje7l1763762276.jpg', url: 'https://matbakh360.com/recipes/vietnamese-style-veggie-hotpot.html' },
    { nom: 'Lasagne', emoji: '🍝', prot: 28, kcal: 338, glucides: 28, lipides: 11, temps: '26 min', img: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg', url: 'https://matbakh360.com/recipes/lasagne.html' },
  ],
  masse: [
    { nom: 'Katsu Chicken Curry', emoji: '🍛', prot: 31, kcal: 540, glucides: 24, lipides: 25, temps: '57 min', img: 'https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg', url: 'https://matbakh360.com/recipes/katsu-chicken-curry.html' },
    { nom: 'Salmon Noodle Wraps', emoji: '🐟', prot: 33, kcal: 600, glucides: 36, lipides: 15, temps: '53 min', img: 'https://www.themealdb.com/images/media/meals/prrirc1763781360.jpg', url: 'https://matbakh360.com/recipes/salmon-noodle-wraps.html' },
    { nom: 'Chicken with Saffron & Pine Nuts', emoji: '🍗', prot: 33, kcal: 551, glucides: 19, lipides: 16, temps: '57 min', img: 'https://www.themealdb.com/images/media/meals/4mhr3u1763481087.jpg', url: 'https://matbakh360.com/recipes/chicken-with-saffron-raisins-pine-nuts.html' },
    { nom: 'Szechuan Beef', emoji: '🥩', prot: 32, kcal: 509, glucides: 51, lipides: 5, temps: '43 min', img: 'https://www.themealdb.com/images/media/meals/1529443236.jpg', url: 'https://matbakh360.com/recipes/szechuan-beef.html' },
    { nom: 'Ma Po Tofu', emoji: '🥟', prot: 31, kcal: 541, glucides: 53, lipides: 9, temps: '43 min', img: 'https://www.themealdb.com/images/media/meals/1525874812.jpg', url: 'https://matbakh360.com/recipes/ma-po-tofu.html' },
    { nom: 'Sichuan Eggplant', emoji: '🍆', prot: 36, kcal: 504, glucides: 71, lipides: 8, temps: '38 min', img: 'https://www.themealdb.com/images/media/meals/1oz4nb1765687990.jpg', url: 'https://matbakh360.com/recipes/sichuan-eggplant.html' },
    { nom: 'Rigatoni with Fennel Sausage', emoji: '🍝', prot: 32, kcal: 645, glucides: 44, lipides: 22, temps: '48 min', img: 'https://www.themealdb.com/images/media/meals/qtqvys1468573168.jpg', url: 'https://matbakh360.com/recipes/rigatoni-with-fennel-sausage-sauce.html' },
    { nom: 'Ham Croquetas', emoji: '🥘', prot: 32, kcal: 562, glucides: 65, lipides: 8, temps: '42 min', img: 'https://www.themealdb.com/images/media/meals/6dpa7m1763331105.jpg', url: 'https://matbakh360.com/recipes/ham-croquetas.html' },
    { nom: 'Salt & Pepper Squid', emoji: '🦑', prot: 30, kcal: 598, glucides: 58, lipides: 9, temps: '33 min', img: 'https://www.themealdb.com/images/media/meals/yxiilf1763759428.jpg', url: 'https://matbakh360.com/recipes/salt-pepper-squid.html' },
    { nom: 'Roast Aubergine & Goat Cheese', emoji: '🧀', prot: 33, kcal: 583, glucides: 18, lipides: 21, temps: '21 min', img: 'https://www.themealdb.com/images/media/meals/iydbwy1763816111.jpg', url: 'https://matbakh360.com/recipes/roast-aubergine-with-goat-s-cheese-toasted-flatbread.html' },
    { nom: 'Walnut, Date & Honey Cake', emoji: '🍰', prot: 33, kcal: 622, glucides: 38, lipides: 18, temps: '55 min', img: 'https://www.themealdb.com/images/media/meals/towo9c1763814590.jpg', url: 'https://matbakh360.com/recipes/walnut-date-honey-cake.html' },
    { nom: 'Griddled Flatbreads', emoji: '🫓', prot: 32, kcal: 647, glucides: 62, lipides: 23, temps: '27 min', img: 'https://www.themealdb.com/images/media/meals/8825lo1763815264.jpg', url: 'https://matbakh360.com/recipes/griddled-flatbreads.html' },
  ],
  maintien: [
    { nom: 'Chorizo & Soft-boiled Egg Salad', emoji: '🥗', prot: 19, kcal: 385, glucides: 35, lipides: 20, temps: '40 min', img: 'https://www.themealdb.com/images/media/meals/v8eaed1763257313.jpg', url: 'https://matbakh360.com/recipes/chorizo-soft-boiled-egg-salad.html' },
    { nom: 'Spicy Thai Prawn Noodles', emoji: '🍜', prot: 27, kcal: 368, glucides: 41, lipides: 24, temps: '27 min', img: 'https://www.themealdb.com/images/media/meals/568t931763584227.jpg', url: 'https://matbakh360.com/recipes/spicy-thai-prawn-noodles.html' },
    { nom: 'Garlicky Prawns with Sherry', emoji: '🦐', prot: 23, kcal: 404, glucides: 50, lipides: 14, temps: '23 min', img: 'https://www.themealdb.com/images/media/meals/u2lhqb1763331899.jpg', url: 'https://matbakh360.com/recipes/garlicky-prawns-with-sherry.html' },
    { nom: 'Chorizo, Potato & Cheese Omelette', emoji: '🥚', prot: 22, kcal: 436, glucides: 26, lipides: 10, temps: '51 min', img: 'https://www.themealdb.com/images/media/meals/0y6uvc1763258983.jpg', url: 'https://matbakh360.com/recipes/chorizo-potato-cheese-omelette.html' },
    { nom: 'Aubergine Couscous Salad', emoji: '🫙', prot: 26, kcal: 443, glucides: 32, lipides: 21, temps: '44 min', img: 'https://www.themealdb.com/images/media/meals/02s6gc1763799560.jpg', url: 'https://matbakh360.com/recipes/aubergine-couscous-salad.html' },
    { nom: 'Pizza Express Margherita', emoji: '🍕', prot: 33, kcal: 371, glucides: 61, lipides: 17, temps: '33 min', img: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg', url: 'https://matbakh360.com/recipes/pizza-express-margherita.html' },
    { nom: 'Fried Calamari', emoji: '🦑', prot: 29, kcal: 447, glucides: 25, lipides: 25, temps: '22 min', img: 'https://www.themealdb.com/images/media/meals/yhi46r1763330279.jpg', url: 'https://matbakh360.com/recipes/fried-calamari.html' },
    { nom: 'Seafood Fideuà', emoji: '🦞', prot: 21, kcal: 434, glucides: 62, lipides: 23, temps: '43 min', img: 'https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg', url: 'https://matbakh360.com/recipes/seafood-fideu.html' },
    { nom: 'Vietnamese Caramel Trout', emoji: '🐟', prot: 23, kcal: 485, glucides: 25, lipides: 20, temps: '45 min', img: 'https://www.themealdb.com/images/media/meals/p02vq41763754350.jpg', url: 'https://matbakh360.com/recipes/vietnamese-caramel-trout.html' },
    { nom: 'Chicken Wings with Cumin & Lemon', emoji: '🍗', prot: 20, kcal: 397, glucides: 51, lipides: 22, temps: '46 min', img: 'https://www.themealdb.com/images/media/meals/4hzyvq1763792564.jpg', url: 'https://matbakh360.com/recipes/chicken-wings-with-cumin-lemon-garlic.html' },
    { nom: 'Tuna and Egg Briks', emoji: '🐟', prot: 18, kcal: 359, glucides: 60, lipides: 28, temps: '59 min', img: 'https://www.themealdb.com/images/media/meals/2dsltq1560461468.jpg', url: 'https://matbakh360.com/recipes/tuna-and-egg-briks.html' },
    { nom: 'Cashew Ghoriba Biscuits', emoji: '🍪', prot: 18, kcal: 452, glucides: 35, lipides: 22, temps: '44 min', img: 'https://www.themealdb.com/images/media/meals/t3r3ka1560461972.jpg', url: 'https://matbakh360.com/recipes/cashew-ghoriba-biscuits.html' },
  ],
}

const OBJECTIFS = {
  seche: {
    label: 'Sèche', icon: '🔥', couleur: '#E63946',
    desc: 'Déficit calorique · Haut en protéines · Faible en graisses',
    criteres: '< 380 kcal · > 20g protéines · < 12g lipides',
  },
  masse: {
    label: 'Prise de Masse', icon: '📈', couleur: '#16a34a',
    desc: 'Surplus calorique · Haut en protéines · Glucides élevés',
    criteres: '> 500 kcal · > 30g protéines',
  },
  maintien: {
    label: 'Maintien', icon: '⚖️', couleur: '#2563eb',
    desc: 'Macros équilibrés · Protéines modérées · Varié',
    criteres: '350–500 kcal · > 18g protéines',
  },
} as const

// Map ProteinCalculateur objectif → recipe key
const PROTO_MAP: Record<string, keyof typeof OBJECTIFS> = {
  prise: 'masse',
  maintien: 'maintien',
  seche: 'seche',
}

export default function NutritionClient() {
  const [objectif, setObjectif] = useState<keyof typeof OBJECTIFS>('masse')

  const obj = OBJECTIFS[objectif]
  const recettes = RECETTES[objectif]

  return (
    <div style={{ background: '#07070F', minHeight: '100vh' }} className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#E63946' }}>Nutrition</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: '#EDE8E0' }}>
          Nutrition & Recettes
        </h1>
        <p className="text-sm max-w-xl" style={{ color: '#5A6478' }}>
          Entre ton poids, choisis ton objectif — les recettes adaptées de{' '}
          <a href="https://matbakh360.com" target="_blank" rel="noopener noreferrer"
            className="font-bold hover:underline" style={{ color: '#E63946' }}>Matbakh360</a>
          {' '}s&apos;affichent automatiquement.
        </p>
      </div>

      {/* Calculateur — le sélecteur d'objectif contrôle les recettes */}
      <div className="mb-10">
        <ProteinCalculateur
          onObjectifChange={(o) => setObjectif(PROTO_MAP[o])}
        />
      </div>

      {objectif && obj && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-black" style={{ color: '#EDE8E0' }}>
                {obj.icon} Recettes — {obj.label}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: '#5A6478' }}>
                {recettes.length} recettes · Filtrées par macros · Source:{' '}
                <a href="https://matbakh360.com" target="_blank" rel="noopener noreferrer"
                  className="font-bold hover:underline" style={{ color: obj.couleur }}>
                  Matbakh360
                </a>
              </p>
            </div>
            <a href="https://matbakh360.com" target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold hover:underline hidden sm:block" style={{ color: obj.couleur }}>
              Toutes les recettes →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recettes.map(r => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                className="rounded-2xl overflow-hidden group transition-all hover:-translate-y-1 block"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid rgba(255,255,255,0.06)` }}>

                {/* Image réelle depuis matbakh360 */}
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.nom}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-2 right-2 text-lg">{r.emoji}</span>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: obj.couleur, color: '#fff' }}>
                    {r.temps}
                  </span>
                </div>

                {/* Infos */}
                <div className="p-3">
                  <p className="font-black text-sm mb-2 line-clamp-1 group-hover:underline"
                    style={{ color: '#EDE8E0' }}>{r.nom}</p>

                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {[
                      { val: `${r.kcal}`, label: 'kcal', color: obj.couleur },
                      { val: `${r.prot}g`, label: 'prot', color: '#16a34a' },
                      { val: `${r.glucides}g`, label: 'gluc', color: '#2563eb' },
                      { val: `${r.lipides}g`, label: 'lip', color: '#d97706' },
                    ].map(m => (
                      <div key={m.label} className="text-center py-1 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="text-[11px] font-black" style={{ color: m.color }}>{m.val}</div>
                        <div className="text-[8px] uppercase" style={{ color: '#3A4152' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-semibold"
                    style={{ color: obj.couleur }}>
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Recette complète sur Matbakh360
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Timing nutrition */}
      <div className="mt-12 mb-6">
        <h2 className="text-xl font-black mb-5" style={{ color: '#EDE8E0' }}>⏱ Timing Nutritionnel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { phase: 'Pré-séance', icon: '⚡', temps: '1-2h avant', tips: ['Glucides complexes (riz, avoine)', 'Protéines légères (poulet, thon)', 'Éviter les graisses', '500ml d\'eau minimum'] },
            { phase: 'Pendant', icon: '💧', temps: 'En séance', tips: ['150-250ml eau / 15-20min', 'Si > 60min : eau + miel', 'Électrolytes si transpiration intense', 'Pas de repas solide'] },
            { phase: 'Post-séance', icon: '🔄', temps: '30min après', tips: ['Protéines rapides (whey, œufs)', '0.3g/kg dans les 30 min', 'Glucides pour recharger le glycogène', 'Fenêtre anabolique : ~2h'] },
          ].map(t => (
            <div key={t.phase} className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,57,70,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="font-black text-sm" style={{ color: '#EDE8E0' }}>{t.phase}</p>
                  <p className="text-[11px] font-semibold" style={{ color: '#E63946' }}>{t.temps}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {t.tips.map(tip => (
                  <li key={tip} className="flex items-start gap-1.5 text-xs" style={{ color: '#5A6478' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#E63946' }}>→</span>{tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl p-6 text-center mt-8"
        style={{ background: 'rgba(230,57,70,0.06)', border: '1px solid rgba(230,57,70,0.15)' }}>
        <p className="font-black text-lg mb-1" style={{ color: '#EDE8E0' }}>Prêt à t&apos;entraîner ?</p>
        <p className="text-sm mb-4" style={{ color: '#5A6478' }}>Combine une bonne nutrition avec un programme adapté à ton objectif</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/quiz" className="px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: '#E63946', color: '#fff' }}>🎯 Trouver mon programme</Link>
          <Link href="/generateur" className="px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(230,57,70,0.2)', color: '#E63946' }}>
            ⚡ Générer une séance
          </Link>
        </div>
      </div>

    </div>
  )
}
