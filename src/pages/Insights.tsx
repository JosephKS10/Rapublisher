import { Link, useParams } from 'react-router'
import { CtaBand } from '../components/blocks'
import { filled, JsonLd, ORG_ID, PageHead, personId, Rich, Seo, SITE_ID, Ticks } from '../components/ui'
import { getInsight, publishedInsights, type Insight } from '../content/insights'
import { site, team } from '../content/site'
import { cleanText } from '../content/markers'
import NotFound from './NotFound'

// Dates are stored as YYYY-MM-DD and formatted in UTC so the server and the browser print the same day.
const fmt = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
const day = (d: string) => fmt.format(new Date(`${d}T00:00:00Z`))

const Byline = ({ i }: { i: Insight }) => (
  <p className="byline">
    <Link to="/about"><Rich text={i.author} /></Link>, <time dateTime={i.date}>{day(i.date)}</time>
  </p>
)

export default function Insights() {
  return (
    <>
      <Seo
        title="Insights from our engineers | RaPublisher"
        description="Articles from Melbourne forward deployed engineers on how forward deployed engineering works and what double handling costs a business."
      />
      <PageHead title="Insights" lead="Articles from RaPublisher's engineers on how we work and what double handling really costs a business." crumbs={[{ to: '/insights', label: 'Insights' }]} />
      <div className="wrap pad-b">
        {publishedInsights.length ? (
          <ul className="posts">
            {publishedInsights.map((i) => (
              <li key={i.slug} data-reveal>
                <p className="post-topic">{i.topic}</p>
                <div>
                  <h2><Link to={`/insights/${i.slug}`}>{i.title}</Link></h2>
                  <p>{i.description}</p>
                </div>
                <Byline i={i} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty"><p>Nothing published yet.</p></div>
        )}
      </div>
      <CtaBand />
    </>
  )
}

export function Article() {
  const i = getInsight(useParams().slug)
  if (!i) return <NotFound />
  const author = team.find((m) => m.name === cleanText(i.author))
  return (
    <>
      <Seo title={i.metaTitle} description={i.description} />
      <PageHead title={i.title} crumbs={[{ to: '/insights', label: 'Insights' }, { to: `/insights/${i.slug}`, label: i.title }]}>
        <Byline i={i} />
      </PageHead>
      <article className="wrap pad-b article">
        <div className="prose">
          {i.body.filter((b) => ('ul' in b ? b.ul.some(filled) : filled('h' in b ? b.h : b.p))).map((b, n) =>
            'h' in b ? <h2 key={n}><Rich text={b.h} /></h2> : 'ul' in b ? <Ticks key={n} items={b.ul} /> : <p key={n}><Rich text={b.p} /></p>,
          )}
          {i.disclaimer && <p className="note">General information only, not legal or tax advice.</p>}
        </div>
        {/* Beside the article on wide screens, under it on narrow ones */}
        <aside className="article-aside">
          {i.sources.length > 0 && (
            <section className="sources" aria-labelledby="sources">
              <h2 id="sources">Sources</h2>
              <ul>{i.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener">{s.label}</a></li>)}</ul>
            </section>
          )}
          <section className="sources" aria-labelledby="read-next">
            <h2 id="read-next">Read next</h2>
            <ul>{i.next.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </section>
          {author && (
            <p className="note">
              <strong>{author.name}</strong>, {author.role.toLowerCase()} at RaPublisher. {filled(author.bio) && <Rich text={author.bio} />}
            </p>
          )}
        </aside>
      </article>
      <CtaBand />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: i.title,
          description: i.description,
          datePublished: i.date,
          dateModified: i.date,
          inLanguage: 'en-AU',
          image: `${site.url}/og/insights-${i.slug}.jpg`,
          author: { '@type': 'Person', '@id': personId(cleanText(i.author)), name: cleanText(i.author), url: `${site.url}/about` },
          publisher: { '@id': ORG_ID },
          isPartOf: { '@id': SITE_ID },
          mainEntityOfPage: `${site.url}/insights/${i.slug}`,
        }}
      />
    </>
  )
}
