'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  q: string
  r: string
}

interface Categorie {
  id: string
  label: string
  emoji: string
  questions: Question[]
}

const CATEGORIES: Categorie[] = [
  {
    id: 'debutant',
    label: 'Débutant',
    emoji: '🌱',
    questions: [
      {
        q: 'Par où commencer quand on débute la musculation ?',
        r: 'Commencez par les exercices polyarticulaires de base : squat, développé couché, rowing, développé militaire et soulevé de terre. Ces 5 mouvements sollicitent l\'ensemble du corps et donnent les meilleurs résultats pour un débutant. Faites 3 séances par semaine en full body pendant les 3 premiers mois, avec des charges légères et une technique parfaite. Consultez notre programme Full Body Débutant.',
      },
      {
        q: 'Combien de fois par semaine dois-je m\'entraîner ?',
        r: '3 séances par semaine est le rythme idéal pour un débutant. Cela permet une récupération suffisante entre chaque séance (48h minimum) tout en stimulant la croissance musculaire. À partir du niveau intermédiaire (6 mois+), vous pouvez passer à 4-5 séances avec un split musculaire (PPL, upper/lower).',
      },
      {
        q: 'Faut-il absolument une salle de sport pour progresser ?',
        r: 'Non. Avec les exercices au poids du corps (pompes, tractions, dips, squats, gainage), vous pouvez construire un physique solide sans aucun équipement. Notre section Maison propose des programmes complets. L\'avantage de la salle est de pouvoir progresser en charge (surcharge progressive), qui reste le principe clé de la musculation.',
      },
      {
        q: 'J\'ai peur de me blesser, comment éviter les blessures ?',
        r: 'Les blessures surviennent presque toujours pour 3 raisons : trop de charge trop vite, mauvaise technique, ou manque de récupération. Respectez ces règles : (1) apprenez la technique avant d\'augmenter les charges, (2) progressez lentement (+2,5 kg par semaine max sur les grands mouvements), (3) dormez 7-8h par nuit, (4) échauffez-vous toujours 5-10 minutes avant. Lisez les descriptions des erreurs fréquentes sur chaque fiche exercice.',
      },
      {
        q: 'Combien de temps dure une séance ?',
        r: 'Pour un débutant, 45-60 minutes suffisent. Au-delà, la qualité de l\'effort baisse (fatigue nerveuse et musculaire). Un entraînement intense de 45 minutes vaut mieux qu\'une séance mollassonne de 2 heures. Concentrez-vous sur 5-7 exercices maximum par séance.',
      },
    ],
  },
  {
    id: 'technique',
    label: 'Technique',
    emoji: '🎯',
    questions: [
      {
        q: 'Comment savoir si j\'exécute correctement un exercice ?',
        r: 'Regardez d\'abord la vidéo YouTube sur la fiche exercice (toutes en français). Ensuite : (1) commencez léger pour apprendre le mouvement, (2) filmez-vous de profil et de face pour analyser votre posture, (3) ressentez le bon muscle travailler — si vous ne le sentez pas, la technique est sûrement incorrecte. Pour les grands mouvements (squat, soulevé de terre), un coach ou un partenaire d\'entraînement est très utile au début.',
      },
      {
        q: 'Quelle est la vitesse d\'exécution idéale ?',
        r: 'La règle générale est : 2 secondes en phase concentrique (contraction), 1 seconde de pause, 3 secondes en phase excentrique (retour). La phase excentrique lente est souvent négligée mais est essentielle pour l\'hypertrophie. Pour les exercices d\'endurance (cardio, HIIT), le rythme est différent — suivez les indications de chaque programme.',
      },
      {
        q: 'C\'est quoi la "surcharge progressive" ?',
        r: 'C\'est le principe fondamental de la musculation : pour que le muscle grossisse, il faut lui donner un stress progressivement croissant. Cela peut être : plus de poids, plus de répétitions, moins de temps de repos, plus de séries, ou une meilleure amplitude. Sans progression, le corps s\'adapte et arrête de se développer. Notez vos performances d\'une séance à l\'autre dans un carnet.',
      },
      {
        q: 'Comment bien respirer pendant l\'effort ?',
        r: 'La règle générale : expirez à l\'effort (phase concentrique / la plus difficile), inspirez au retour (phase excentrique). Exemple au développé couché : inspirez en descendant la barre, expirez en la poussant. Pour les charges très lourdes, certains pratiquent la manœuvre de Valsalva (bloquer le souffle pendant l\'effort) mais uniquement pour les exercices polyarticulaires lourds et avec expérience.',
      },
      {
        q: 'Quelle amplitude de mouvement utiliser ?',
        r: 'En général, l\'amplitude complète (full range of motion) donne les meilleurs résultats : plus d\'étirement musculaire, plus de recrutement des fibres. Exceptions : si vous avez une douleur articulaire à certains angles, réduisez l\'amplitude sans forcer. Certains exercices (bench press, squat) offrent une option d\'amplitude partielle pour des protocoles spécifiques (techniques d\'intensification), mais ce n\'est pas recommandé pour les débutants.',
      },
    ],
  },
  {
    id: 'programmes',
    label: 'Programmes',
    emoji: '📋',
    questions: [
      {
        q: 'Quelle est la différence entre le Full Body et le PPL ?',
        r: 'Full Body : vous entraînez tout le corps à chaque séance (idéal débutant, 3 séances/sem). Chaque muscle est stimulé 3x par semaine avec peu de volume par séance.\n\nPPL (Push / Pull / Legs) : vous divisez les muscles par groupes — Poussé (pecs, épaules, triceps), Tiré (dos, biceps), Jambes. 6 séances/sem maximum. Chaque muscle est travaillé 2x/sem avec plus de volume.\n\nUpper/Lower : 2 séances haut du corps + 2 séances bas du corps par semaine. Bon compromis intermédiaire.',
      },
      {
        q: 'Comment choisir le bon programme pour moi ?',
        r: 'Posez-vous 3 questions : (1) Quel est mon niveau ? Débutant (<1 an) → Full Body 3j. Intermédiaire (1-3 ans) → PPL ou Upper/Lower 4-5j. Avancé → splits spécialisés. (2) Combien de jours puis-je m\'entraîner par semaine ? (3) Quel est mon objectif principal — force, hypertrophie (volume), perte de poids ou endurance ? Nos programmes sont organisés par mode (salle/maison) et niveau.',
      },
      {
        q: 'Combien de temps faut-il suivre un programme avant de changer ?',
        r: 'Minimum 8-12 semaines. Les changements trop fréquents empêchent la progression — le corps a besoin de temps pour s\'adapter à un stimulus. La tentation de "varier" est forte mais contreproductive. Changez de programme uniquement si : (1) vous avez atteint un plateau depuis plus de 4 semaines malgré les ajustements, (2) votre mode de vie a changé (disponibilités), (3) vous avez atteint vos objectifs et souhaitez une nouvelle phase.',
      },
      {
        q: 'Dois-je faire du cardio en plus de la musculation ?',
        r: 'Pour la santé cardio-vasculaire : oui, 2-3 sessions de 20-30 min de cardio modéré par semaine sont recommandées. Pour la perte de poids : le cardio aide mais l\'alimentation est la variable principale. Pour la masse musculaire : trop de cardio peut interférer avec la récupération (évitez les longues sessions cardio le même jour qu\'une grosse séance jambes). Le HIIT est plus efficace et moins chronophage que le cardio longue durée.',
      },
      {
        q: 'Qu\'est-ce que le "déload" et quand en faire ?',
        r: 'Le déload est une semaine d\'entraînement allégé (charges réduites de 40-50%, volume réduit) pour permettre une récupération profonde du système nerveux, des articulations et des muscles. Faites-en un toutes les 4-8 semaines, ou dès que vous ressentez une fatigue persistante, une perte de motivation, ou une stagnation des performances. Après un déload, vous revenez souvent plus fort.',
      },
    ],
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    emoji: '🥗',
    questions: [
      {
        q: 'Combien de protéines dois-je consommer par jour ?',
        r: 'Pour la prise de masse : 1,6 à 2,2 g de protéines par kg de poids de corps. Exemple : 80 kg → 128 à 176 g/jour. Pour la perte de poids avec maintien musculaire : jusqu\'à 2,5 g/kg. Les meilleures sources : poulet, poisson, œufs, fromage blanc, légumineuses (pour les végétariens), yaourt grec. Utilisez notre calculateur de macronutriments pour avoir vos besoins personnalisés.',
      },
      {
        q: 'Faut-il manger avant ou après l\'entraînement ?',
        r: 'Avant (1h30-2h) : repas complet glucides + protéines (ex : riz + poulet). Si moins de temps : une banane ou quelques dattes suffisent. Après (dans les 2h) : repas riche en protéines + glucides pour la récupération (ex : shake protéiné + fruit, ou poulet + riz). La "fenêtre anabolique" post-workout est moins critique qu\'on le croit — l\'apport total journalier en protéines est plus important que le timing exact.',
      },
      {
        q: 'Dois-je prendre des compléments alimentaires (whey, créatine…) ?',
        r: 'Les compléments ne sont PAS indispensables si votre alimentation est équilibrée. Ceux qui ont une réelle efficacité scientifique : (1) Créatine monohydrate : +5-10% de force et volume, sans danger, ~3-5g/jour. (2) Whey protéinée : pratique pour atteindre les apports en protéines, pas magique. (3) Caféine : améliore les performances à l\'entraînement. Tout le reste (BCAA, booster, brûle-graisses) a peu ou pas de preuves scientifiques solides.',
      },
      {
        q: 'Comment calculer mes calories pour la prise de masse ou la sèche ?',
        r: 'Calculez d\'abord votre TDEE (dépense énergétique journalière) avec notre calculateur de macros. Ensuite :\n— Prise de masse : TDEE + 200 à 300 kcal/jour (surplus modéré pour limiter le gras)\n— Sèche : TDEE - 300 à 500 kcal/jour (déficit pour perdre ~0,5 kg/sem)\n— Maintien : TDEE ± 100 kcal\nPesez-vous le matin à jeun 2-3 fois par semaine et ajustez en fonction des résultats réels.',
      },
      {
        q: 'Le jeûne intermittent est-il compatible avec la musculation ?',
        r: 'Oui, pour la plupart des pratiquants. Le jeûne 16:8 (16h de jeûne, 8h de fenêtre alimentaire) permet de maintenir la masse musculaire tout en perdant du gras, à condition d\'atteindre vos apports journaliers en protéines dans la fenêtre alimentaire. Le mieux est de placer l\'entraînement en fin de période de jeûne ou au début de la fenêtre alimentaire. Non recommandé si vous cherchez une prise de masse maximale.',
      },
    ],
  },
  {
    id: 'muscles',
    label: 'Muscles & Anatomie',
    emoji: '💪',
    questions: [
      {
        q: 'Pourquoi j\'ai des courbatures après l\'entraînement ?',
        r: 'Les courbatures (DOMS — Delayed Onset Muscle Soreness) apparaissent 24-48h après l\'effort et sont causées par de micro-lésions musculaires — c\'est normal et signe que le muscle a été sollicité. Elles ne sont PAS nécessaires à la progression (vous pouvez progresser sans courbatures). Pour les soulager : léger cardio, étirements doux, chaleur, alimentation riche en protéines. Elles diminuent avec la régularité de l\'entraînement.',
      },
      {
        q: 'Pourquoi je ne sens pas le bon muscle travailler ?',
        r: 'C\'est un problème de "connexion neuromusculaire". Solutions : (1) réduisez la charge et concentrez-vous mentalement sur le muscle cible, (2) faites des exercices d\'isolation d\'abord (ex : écarté avant le développé couché pour "activer" les pectoraux), (3) touchez le muscle avec votre main libre pour améliorer la conscience corporelle, (4) ralentissez la phase excentrique, (5) regardez les vidéos techniques sur nos fiches exercices.',
      },
      {
        q: 'Peut-on cibler la perte de graisse sur une zone précise (ventre, cuisses…) ?',
        r: 'Non — la perte de graisse localisée (spot reduction) est un mythe scientifiquement réfuté. Faire 500 abdos ne fera pas fondre la graisse du ventre en priorité. La graisse se perd de manière globale selon votre génétique. Ce qui fonctionne : un déficit calorique global + musculation pour préserver la masse musculaire + cardio pour augmenter la dépense. Votre corps choisit où il perd en premier.',
      },
      {
        q: 'Comment savoir si un muscle est bien développé ou en retard ?',
        r: 'Photographiez-vous régulièrement (tous les mois) sous le même éclairage et les mêmes angles (face, profil, dos). Comparez les proportions : un développé équilibré implique une harmonie entre le haut et le bas du corps, et entre l\'avant et l\'arrière. Les déséquilibres courants : pecs développés mais dos faible, quadriceps forts mais ischios faibles (risque de blessure). Pratiquez des exercices unilatéraux pour corriger les asymétries.',
      },
      {
        q: 'Quel muscle dois-je prioriser en premier dans une séance ?',
        r: 'Travaillez toujours les groupes musculaires prioritaires ou les plus grands en premier, quand vous êtes le plus frais. Règle générale : grands groupes avant petits groupes (ex : dos avant biceps, pectoraux avant triceps). Pour les muscles en retard, placez-les en début de séance. Commencez toujours par les exercices polyarticulaires (squat, soulevé de terre, bench) avant les exercices d\'isolation.',
      },
    ],
  },
  {
    id: 'site',
    label: 'À propos du site',
    emoji: '💻',
    questions: [
      {
        q: 'Vert Lime est-il gratuit ?',
        r: 'Oui, entièrement et définitivement gratuit. Aucune inscription, aucun abonnement, aucune fonctionnalité payante. L\'accès à tous les exercices, programmes, calculateurs et guides est libre.',
      },
      {
        q: 'D\'où viennent les vidéos YouTube intégrées ?',
        r: 'Les vidéos sont sélectionnées parmi les meilleures ressources YouTube francophones sur la musculation. Elles appartiennent à leurs créateurs respectifs. Nous les intégrons via l\'API YouTube officielle (embed). Si une vidéo n\'est plus disponible, contactez-nous via ce formulaire.',
      },
      {
        q: 'Comment fonctionne le mode Salle / Maison ?',
        r: 'Le bouton en haut à droite de la navigation vous permet de basculer entre le mode Salle (exercices avec matériel) et le mode Maison (exercices au poids du corps). Votre préférence est mémorisée dans votre navigateur (localStorage) et persiste entre les visites. Aucune donnée n\'est envoyée à nos serveurs.',
      },
      {
        q: 'Je veux signaler une erreur ou suggérer un exercice, comment faire ?',
        r: 'Utilisez le formulaire de contact ci-dessous. Précisez : la page concernée, l\'erreur constatée ou votre suggestion. Nous révisons régulièrement les contenus et prenons en compte les retours des utilisateurs. Les exercices très demandés sont ajoutés en priorité.',
      },
      {
        q: 'Les informations sont-elles vérifiées scientifiquement ?',
        r: 'Nous nous efforçons de baser nos contenus sur des données probantes et des études en sciences du sport. Cependant, Vert Lime n\'est pas un site médical. En cas de doute, consultez un professionnel de santé ou un coach certifié. Voyez nos CGU pour plus d\'informations sur les limites de nos conseils.',
      },
    ],
  },
]

function AccordionItem({ question, reponse, isOpen, onToggle }: {
  question: string
  reponse: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors gap-3"
      >
        <span className="font-semibold text-slate-800 text-sm leading-snug">{question}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform text-white text-sm font-bold ${isOpen ? 'rotate-45' : ''}`}
          style={{ background: '#b8d400' }}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 bg-white border-t border-slate-100">
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{reponse}</p>
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('debutant')
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const currentCat = CATEGORIES.find(c => c.id === activeCategory)!

  const handleToggle = (key: string) => {
    setOpenQuestion(prev => prev === key ? null : key)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Dans une vraie app, on enverrait le formulaire à une API
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
          Questions fréquentes
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Retrouvez les réponses aux questions les plus posées sur la musculation, les programmes et le site.
        </p>
      </div>

      {/* Catégories */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setOpenQuestion(null) }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat.id
                ? 'text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={activeCategory === cat.id ? { background: '#b8d400' } : {}}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3 mb-16">
        {currentCat.questions.map((item, i) => {
          const key = `${activeCategory}-${i}`
          return (
            <AccordionItem
              key={key}
              question={item.q}
              reponse={item.r}
              isOpen={openQuestion === key}
              onToggle={() => handleToggle(key)}
            />
          )
        })}
      </div>

      {/* Formulaire de contact */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Vous n&apos;avez pas trouvé votre réponse ?</h2>
        <p className="text-slate-500 text-sm mb-6">
          Posez votre question ou signalez une erreur — nous répondons sous 48h.
        </p>

        {submitted ? (
          <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="font-semibold text-green-800">Message envoyé !</p>
            <p className="text-green-600 text-sm mt-1">Nous vous répondrons sous 48h ouvrées.</p>
            <button
              onClick={() => { setSubmitted(false); setContactForm({ nom: '', email: '', sujet: '', message: '' }) }}
              className="mt-4 text-sm text-green-700 underline hover:text-green-900"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Votre nom
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.nom}
                  onChange={e => setContactForm(p => ({ ...p, nom: e.target.value }))}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-lime-300 focus:outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Votre email
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="jean@exemple.fr"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-lime-300 focus:outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Sujet
              </label>
              <select
                value={contactForm.sujet}
                onChange={e => setContactForm(p => ({ ...p, sujet: e.target.value }))}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-lime-300 focus:outline-none bg-white"
              >
                <option value="">Sélectionnez un sujet…</option>
                <option value="question">Question sur un exercice ou programme</option>
                <option value="erreur">Signaler une erreur de contenu</option>
                <option value="suggestion">Suggestion d&apos;exercice ou de fonctionnalité</option>
                <option value="video">Vidéo indisponible ou incorrecte</option>
                <option value="legal">Question légale / RGPD</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Votre message
              </label>
              <textarea
                required
                value={contactForm.message}
                onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Décrivez votre question ou votre problème en détail…"
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-lime-300 focus:outline-none bg-white resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-slate-400">
                En soumettant ce formulaire, vous acceptez nos{' '}
                <Link href="/cgu" className="text-lime-400 hover:underline">CGU</Link>{' '}
                et notre politique de confidentialité.
              </p>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: '#b8d400' }}
              >
                Envoyer le message →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
