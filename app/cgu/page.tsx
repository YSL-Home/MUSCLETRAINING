import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — MuscleGym",
  description: "Consultez les conditions générales d'utilisation du site MuscleGym. Informations légales, responsabilités, données personnelles et propriété intellectuelle.",
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    id: 'objet',
    titre: '1. Objet du site',
    contenu: `MuscleGym (accessible à l'adresse www.musclegym.fr) est un site web à vocation informative et éducative dans le domaine de la musculation, du sport et de la santé physique.

Le site propose :
— Une bibliothèque d'exercices avec descriptions techniques et vidéos YouTube intégrées
— Des programmes d'entraînement pour la salle et à domicile
— Des outils de calcul (IMC, macronutriments, force maximale)
— Des guides spécifiques par sport et par machine

L'accès au site est entièrement gratuit et ne nécessite aucune inscription.`,
  },
  {
    id: 'avertissement',
    titre: '2. Avertissement médical et santé',
    contenu: `IMPORTANT : Les informations publiées sur MuscleGym ont un caractère purement informatif et ne constituent en aucun cas un avis médical, un diagnostic ou une prescription.

Avant de commencer tout programme d'entraînement, nous vous recommandons vivement de :
— Consulter un médecin ou un professionnel de santé qualifié
— Faire évaluer votre condition physique par un coach certifié
— Adapter toute recommandation à votre état de santé personnel

MuscleGym décline toute responsabilité en cas de blessure, d'accident ou de problème de santé résultant de la pratique des exercices présentés sur le site, que ces exercices aient été suivis correctement ou non.`,
  },
  {
    id: 'propriete',
    titre: '3. Propriété intellectuelle',
    contenu: `L'ensemble des contenus présents sur MuscleGym (textes, illustrations SVG, structure des programmes, descriptions d'exercices) sont la propriété exclusive de MuscleGym, sauf mention contraire.

Contenus tiers :
— Les vidéos intégrées proviennent de YouTube et appartiennent à leurs créateurs respectifs. MuscleGym n'en revendique aucune propriété.
— Toute reproduction, distribution ou utilisation commerciale des contenus originaux du site sans autorisation écrite préalable est interdite.

Vous êtes autorisé à partager des liens vers nos pages et à utiliser les contenus à des fins personnelles et non commerciales, en citant la source.`,
  },
  {
    id: 'responsabilite',
    titre: '4. Limitation de responsabilité',
    contenu: `MuscleGym s'efforce de maintenir des informations exactes et à jour. Toutefois, le site ne peut garantir l'exactitude, l'exhaustivité ou l'actualité de toutes les informations publiées.

MuscleGym ne saurait être tenu responsable :
— Des erreurs ou omissions dans les contenus publiés
— Des dommages directs ou indirects résultant de l'utilisation ou de l'incapacité à utiliser le site
— Des contenus des sites tiers vers lesquels des liens sont proposés
— Des interruptions ou dysfonctionnements temporaires du service

Les vidéos YouTube intégrées sont soumises aux conditions d'utilisation de YouTube/Google. MuscleGym ne contrôle pas leur disponibilité ni leur contenu.`,
  },
  {
    id: 'donnees',
    titre: '5. Données personnelles (RGPD)',
    contenu: `MuscleGym s'engage à respecter votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679).

Données collectées :
— Aucune inscription ni création de compte n'est requise
— Aucune donnée personnelle identifiable n'est collectée à des fins commerciales
— Les préférences de navigation (mode Salle/Maison) sont sauvegardées uniquement dans votre navigateur via localStorage et ne sont jamais transmises à nos serveurs

Cookies :
— Cookies techniques : nécessaires au bon fonctionnement du site (localStorage)
— Cookies analytiques : nous pouvons utiliser des outils d'analyse anonymisés (ex. mesures d'audience agrégées) sans identification individuelle

Vos droits : conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute demande, contactez-nous via la page FAQ.`,
  },
  {
    id: 'cookies',
    titre: '6. Cookies et technologies similaires',
    contenu: `Le site utilise les technologies suivantes :

localStorage (stockage local navigateur) :
— Mémorise votre préférence Salle/Maison entre les sessions
— Stocké uniquement sur votre appareil, jamais transmis
— Vous pouvez le supprimer via les paramètres de votre navigateur

YouTube Embed :
— Les vidéos YouTube sont chargées à la demande (au clic) pour préserver vos données
— Lors du chargement d'une vidéo, YouTube peut déposer ses propres cookies selon ses CGU

Vous pouvez configurer votre navigateur pour refuser les cookies, ce qui peut affecter certaines fonctionnalités du site.`,
  },
  {
    id: 'liens',
    titre: '7. Liens hypertextes',
    contenu: `MuscleGym peut contenir des liens vers des sites tiers (YouTube, réseaux sociaux, etc.). Ces liens sont fournis à titre informatif uniquement.

MuscleGym n'exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur disponibilité, leur exactitude ou leurs pratiques en matière de confidentialité.

La création de liens vers MuscleGym est libre, à condition que :
— Le lien ne soit pas trompeur ou malveillant
— Le site source ne porte pas atteinte à l'image de MuscleGym
— Le contenu ne soit pas reproduit dans un cadre (iframe) sans autorisation`,
  },
  {
    id: 'modification',
    titre: '8. Modification des CGU',
    contenu: `MuscleGym se réserve le droit de modifier les présentes Conditions Générales d'Utilisation à tout moment et sans préavis.

Les modifications prennent effet dès leur publication sur cette page. La date de dernière mise à jour est indiquée en bas de page. Il vous appartient de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.

L'utilisation continue du site après modification des CGU vaut acceptation des nouvelles conditions.`,
  },
  {
    id: 'droit',
    titre: '9. Droit applicable et juridiction',
    contenu: `Les présentes CGU sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes conditions, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.

Si vous résidez dans un autre pays de l'Union Européenne, vous bénéficiez également de la protection offerte par les lois impératives de votre pays de résidence.

Pour toute question relative aux présentes CGU, vous pouvez nous contacter via notre page <a href="/faq" class="text-orange-500 hover:underline">FAQ</a>.`,
  },
]

export default function CguPage() {
  const lastUpdate = '26 mai 2026'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[
        { nom: 'Accueil', url: '/' },
        { nom: "Conditions d'utilisation" },
      ]} />

      {/* Header */}
      <div className="mt-6 mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="text-slate-500 text-sm">
          Dernière mise à jour : <strong>{lastUpdate}</strong>
        </p>
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-800">
          <strong>En utilisant MuscleGym, vous acceptez les présentes conditions.</strong> Veuillez les lire attentivement, en particulier l&apos;avertissement médical (section 2).
        </div>
      </div>

      {/* Sommaire */}
      <nav className="mb-10 p-5 bg-slate-50 rounded-2xl border border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sommaire</p>
        <ol className="space-y-1.5">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-slate-600 hover:text-orange-500 transition-colors">
                {s.titre}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map(s => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {s.titre}
            </h2>
            <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: s.contenu.replace(/\n/g, '<br />') }}
            />
          </section>
        ))}
      </div>

      {/* Footer CGU */}
      <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} MuscleGym — Tous droits réservés<br />
          Dernière mise à jour : {lastUpdate}
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/faq" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
            Voir la FAQ →
          </Link>
          <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
