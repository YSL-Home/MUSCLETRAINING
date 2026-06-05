import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Muscle Training",
  description: "Consultez les conditions générales d'utilisation du site Muscle Training. Informations légales, responsabilités, données personnelles et propriété intellectuelle.",
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    id: 'objet',
    titre: '1. Objet du site',
    contenu: `Muscle Training (accessible à l'adresse www.muscletraining.uk) est un site web à vocation informative et éducative dans le domaine de la musculation, du sport et de la santé physique.

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
    contenu: `IMPORTANT : Les informations publiées sur Muscle Training ont un caractère purement informatif et ne constituent en aucun cas un avis médical, un diagnostic ou une prescription.

Avant de commencer tout programme d'entraînement, nous vous recommandons vivement de :
— Consulter un médecin ou un professionnel de santé qualifié
— Faire évaluer votre condition physique par un coach certifié
— Adapter toute recommandation à votre état de santé personnel

Muscle Training décline toute responsabilité en cas de blessure, d'accident ou de problème de santé résultant de la pratique des exercices présentés sur le site, que ces exercices aient été suivis correctement ou non.`,
  },
  {
    id: 'propriete',
    titre: '3. Propriété intellectuelle',
    contenu: `L'ensemble des contenus présents sur Muscle Training (textes, illustrations SVG, structure des programmes, descriptions d'exercices) sont la propriété exclusive de Muscle Training, sauf mention contraire.

Contenus tiers :
— Les vidéos intégrées proviennent de YouTube et appartiennent à leurs créateurs respectifs. Muscle Training n'en revendique aucune propriété.
— Toute reproduction, distribution ou utilisation commerciale des contenus originaux du site sans autorisation écrite préalable est interdite.

Vous êtes autorisé à partager des liens vers nos pages et à utiliser les contenus à des fins personnelles et non commerciales, en citant la source.`,
  },
  {
    id: 'responsabilite',
    titre: '4. Limitation de responsabilité',
    contenu: `Muscle Training s'efforce de maintenir des informations exactes et à jour. Toutefois, le site ne peut garantir l'exactitude, l'exhaustivité ou l'actualité de toutes les informations publiées.

Muscle Training ne saurait être tenu responsable :
— Des erreurs ou omissions dans les contenus publiés
— Des dommages directs ou indirects résultant de l'utilisation ou de l'incapacité à utiliser le site
— Des contenus des sites tiers vers lesquels des liens sont proposés
— Des interruptions ou dysfonctionnements temporaires du service

Les vidéos YouTube intégrées sont soumises aux conditions d'utilisation de YouTube/Google. Muscle Training ne contrôle pas leur disponibilité ni leur contenu.`,
  },
  {
    id: 'donnees',
    titre: '5. Données personnelles (RGPD)',
    contenu: `Muscle Training s'engage à respecter votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679).

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
    contenu: `Muscle Training peut contenir des liens vers des sites tiers (YouTube, réseaux sociaux, etc.). Ces liens sont fournis à titre informatif uniquement.

Muscle Training n'exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur disponibilité, leur exactitude ou leurs pratiques en matière de confidentialité.

La création de liens vers Muscle Training est libre, à condition que :
— Le lien ne soit pas trompeur ou malveillant
— Le site source ne porte pas atteinte à l'image de Muscle Training
— Le contenu ne soit pas reproduit dans un cadre (iframe) sans autorisation`,
  },
  {
    id: 'modification',
    titre: '8. Modification des CGU',
    contenu: `Muscle Training se réserve le droit de modifier les présentes Conditions Générales d'Utilisation à tout moment et sans préavis.

Les modifications prennent effet dès leur publication sur cette page. La date de dernière mise à jour est indiquée en bas de page. Il vous appartient de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.

L'utilisation continue du site après modification des CGU vaut acceptation des nouvelles conditions.`,
  },
  {
    id: 'droit',
    titre: '9. Droit applicable et juridiction',
    contenu: `Les présentes CGU sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes conditions, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.

Si vous résidez dans un autre pays de l'Union Européenne, vous bénéficiez également de la protection offerte par les lois impératives de votre pays de résidence.

Pour toute question relative aux présentes CGU, vous pouvez nous contacter via notre page <a href="/faq" class="text-lime-400 hover:underline">FAQ</a>.`,
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
        <h1 className="text-3xl sm:text-4xl font-black text-[#EDE8E0] mb-3">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="text-[#5A6478] text-sm">
          Dernière mise à jour : <strong>{lastUpdate}</strong>
        </p>
        <div className="mt-4 p-4 bg-lime-50 border border-lime-200 rounded-xl text-sm text-lime-800">
          <strong>En utilisant Muscle Training, vous acceptez les présentes conditions.</strong> Veuillez les lire attentivement, en particulier l&apos;avertissement médical (section 2).
        </div>
      </div>

      {/* Sommaire */}
      <nav className="mb-10 p-5 bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)]">
        <p className="text-xs font-bold text-[#3A4152] uppercase tracking-wider mb-3">Sommaire</p>
        <ol className="space-y-1.5">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-[#8A9BB5] hover:text-lime-400 transition-colors">
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
            <h2 className="text-xl font-bold text-[#EDE8E0] mb-4 pb-2 border-b border-[rgba(230,57,70,0.1)]">
              {s.titre}
            </h2>
            <div className="text-[#8A9BB5] text-sm leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: s.contenu.replace(/\n/g, '<br />') }}
            />
          </section>
        ))}
      </div>

      {/* Footer CGU */}
      <div className="mt-14 pt-8 border-t border-[rgba(230,57,70,0.1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-[#3A4152]">
          © {new Date().getFullYear()} Muscle Training — Tous droits réservés<br />
          Dernière mise à jour : {lastUpdate}
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/faq" className="text-lime-400 hover:text-[#E63946] font-medium transition-colors">
            Voir la FAQ →
          </Link>
          <Link href="/" className="text-[#5A6478] hover:text-[#C4CDD9] transition-colors">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
