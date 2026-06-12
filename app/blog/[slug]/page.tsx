import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import ShareButtons from '@/components/ShareButtons'
import AffiliateRecommendations from '@/components/AffiliateRecommendations'
import TelegramCTA from '@/components/TelegramCTA'
import { ARTICLES, getArticleBySlug } from '@/data/articles'
import type { Section } from '@/data/articles'

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  const img = article.image
    ? (article.image.startsWith('http') ? article.image : `https://www.muscletraining.uk${article.image}`)
    : 'https://www.muscletraining.uk/logo-512.png'
  return {
    title: article.titre,
    description: article.descriptionSeo,
    alternates: { canonical: `https://www.muscletraining.uk/blog/${slug}` },
    openGraph: {
      title: article.titre,
      description: article.descriptionSeo,
      type: 'article',
      publishedTime: article.datePublication,
      images: [img],
    },
    twitter: { card: 'summary_large_image', title: article.titre, description: article.descriptionSeo, images: [img] },
  }
}

function renderSection(section: Section, idx: number) {
  const content = section.content
  switch (section.type) {
    case 'h2':
      return <h2 key={idx} className="text-2xl font-black text-[#EDE8E0] mt-10 mb-4">{content as string}</h2>
    case 'h3':
      return <h3 key={idx} className="text-lg font-bold text-[#EDE8E0] mt-6 mb-3">{content as string}</h3>
    case 'p':
      return <p key={idx} className="text-[#8A9BB5] leading-relaxed mb-4">{content as string}</p>
    case 'ul':
      return (
        <ul key={idx} className="space-y-2 mb-5 pl-1">
          {(content as string[]).map((item, i) => (
            <li key={i} className="flex gap-2 text-[#8A9BB5] text-sm leading-relaxed">
              <span className="text-[#E63946] font-bold flex-shrink-0 mt-0.5">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={idx} className="space-y-2 mb-5">
          {(content as string[]).map((item, i) => (
            <li key={i} className="flex gap-3 text-[#8A9BB5] text-sm leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.04)] text-[#C4CDD9] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    case 'tip':
      return (
        <div key={idx} className="flex gap-3 p-4 rounded-xl my-5" style={{ background: '#b8d40015', border: '1px solid #b8d40040' }}>
          <span className="text-xl flex-shrink-0">💡</span>
          <p className="text-sm leading-relaxed" style={{ color: '#6b7f00' }}>{content as string}</p>
        </div>
      )
    case 'warning':
      return (
        <div key={idx} className="flex gap-3 p-4 rounded-xl my-5 bg-amber-50 border border-amber-200">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <p className="text-sm leading-relaxed text-amber-800">{content as string}</p>
        </div>
      )
    default:
      return null
  }
}

const CAT_COLORS: Record<string, string> = {
  'Programmes': '#b8d400',
  'Nutrition & Musculation': '#38bdf8',
  'Exercices': '#f59e0b',
  'Récupération': '#10b981',
  'Prévention': '#e11d48',
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const couleur = CAT_COLORS[article.categorie] ?? '#b8d400'
  const articlesLies = ARTICLES.filter(a => a.slug !== article.slug && a.categorie === article.categorie).slice(0, 3)
  const pageUrl = `https://www.muscletraining.uk/blog/${article.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titre,
    description: article.descriptionSeo,
    datePublished: article.datePublication,
    author: { '@type': 'Organization', name: 'Muscle Training' },
    publisher: { '@type': 'Organization', name: 'Muscle Training', url: 'https://www.muscletraining.uk' },
    keywords: article.tags.join(', '),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.contenu
      .filter(s => s.type === 'h2')
      .slice(0, 4)
      .map(s => ({
        '@type': 'Question',
        name: s.content as string,
        acceptedAnswer: {
          '@type': 'Answer',
          text: (() => {
            const idx = article.contenu.indexOf(s)
            const next = article.contenu.slice(idx + 1).find(x => x.type === 'p')
            return next ? (Array.isArray(next.content) ? next.content.join(' ') : next.content as string) : ''
          })(),
        },
      })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb crumbs={[
          { nom: 'Accueil', url: '/' },
          { nom: 'Blog', url: '/blog' },
          { nom: article.categorie, url: '/blog' },
          { nom: article.titre.slice(0, 40) + '...' },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Article principal */}
          <article className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: couleur + '20', color: couleur }}>
                  {article.categorie}
                </span>
                <span className="text-[#3A4152] text-xs">{article.tempsLecture} min de lecture</span>
                <span className="text-[#3A4152]">·</span>
                <span className="text-[#3A4152] text-xs">
                  {new Date(article.datePublication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#EDE8E0] leading-tight mb-4">{article.titre}</h1>
              <p className="text-[#5A6478] text-lg leading-relaxed">{article.description}</p>
              <div className="mt-4">
                <ShareButtons url={pageUrl} title={article.titre} compact />
              </div>
            </div>

            {article.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={article.image} alt={article.titre} loading="eager"
                className="w-full rounded-2xl mb-8 border border-[rgba(230,57,70,0.12)]"
                style={{ aspectRatio: '16/9', objectFit: 'cover' }} />
            )}

            <div className="h-px bg-[rgba(255,255,255,0.06)] mb-8" />

            {/* Contenu */}
            <div className="prose-sport">
              {article.contenu.map((section, idx) => renderSection(section, idx))}
            </div>

            {/* Rejoindre Telegram */}
            <TelegramCTA />

            {/* Matériel recommandé (liens affiliés) */}
            <AffiliateRecommendations labels={article.tags} title="🛒 Pour t'équiper" compact />

            <div className="mt-10 pt-6 border-t border-[rgba(230,57,70,0.1)]">
              <div className="flex flex-wrap gap-2 mb-5">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[#8A9BB5] font-medium">#{tag}</span>
                ))}
              </div>
              <ShareButtons url={pageUrl} title={article.titre} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Articles liés */}
              {articlesLies.length > 0 && (
                <div className="bg-[#0C0C1A] rounded-2xl border border-[rgba(230,57,70,0.1)] p-4">
                  <h3 className="font-bold text-[#EDE8E0] text-sm mb-3">Articles similaires</h3>
                  <div className="space-y-3">
                    {articlesLies.map(a => (
                      <Link key={a.slug} href={`/blog/${a.slug}`}
                        className="block group">
                        <p className="text-xs font-semibold text-[#C4CDD9] group-hover:text-[#E63946] transition-colors leading-snug mb-1">{a.titre.slice(0, 60)}...</p>
                        <span className="text-xs text-[#3A4152]">{a.tempsLecture} min</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Exercices */}
              <div className="rounded-2xl p-4 text-center" style={{ background: '#b8d40015', border: '1px solid #b8d40030' }}>
                <p className="text-sm font-bold text-[#EDE8E0] mb-2">Passez à la pratique</p>
                <p className="text-xs text-[#5A6478] mb-3">60+ exercices avec vidéos</p>
                <Link href="/" className="inline-block text-xs font-bold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ background: '#b8d400' }}>
                  Voir les exercices
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
