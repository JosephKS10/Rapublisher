import type { CSSProperties, ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { cleanText } from '../content/markers'
import { Live } from './Live'
import { neon, type Tone } from './palette'
import { useTheme } from './theme'
import { site } from '../content/site'

declare global {
  interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void }
}

// Analytics events from A3. Plausible is cookieless; this is a no-op until its script loads.
export const track = (event: string, props?: Record<string, string>) => window.plausible?.(event, props && { props })

// Staging markers (Part C). Build with VITE_REVIEW=1 (Netlify previews do) to see every [TODO], [CONFIRM] and
// [DECISION] in place. Otherwise unfinished sentences are left out (content/markers.ts) so the page reads finished.
export const REVIEW = import.meta.env.VITE_REVIEW === '1'
export const filled = (text: string) => REVIEW || cleanText(text) !== ''

const MARKER = /(\[(?:TODO|CONFIRM|DECISION)[^\]]*\])/
export function Rich({ text }: { text: string }) {
  if (!REVIEW) return <>{cleanText(text)}</>
  return (
    <>
      {text.split(MARKER).map((part, i) =>
        i % 2 ? <mark key={i} className={`mk mk-${part.slice(1).split(/[\s:\]]/)[0].toLowerCase()}`}>{part}</mark> : part,
      )}
    </>
  )
}

export const Paras = ({ text }: { text: string }) => (
  <>{text.split('\n\n').filter(filled).map((p) => <p key={p}><Rich text={p} /></p>)}</>
)

export const slug = (s: string) => s.toLowerCase().replace(/\[.*?\]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// React 19 hoists these into <head>.
// Structured data ids. Every page links back to these two nodes, which Layout.tsx defines.
export const ORG_ID = `${site.url}/#organization`
export const SITE_ID = `${site.url}/#website`
export const personId = (name: string) => `${site.url}/about#${slug(name)}`

// `og` names the social preview image in public/og (scripts/og.js makes one per page); pages without their own pass one.
// `notFound`: the address is not a page, so it gets no canonical, no page node, and is kept out of the index.
export function Seo({ title, description, og, notFound }: { title: string; description: string; og?: string; notFound?: boolean }) {
  const path = useLocation().pathname.replace(/\/$/, '')
  const url = site.url + path
  const image = `${site.url}/og/${og ?? (path.slice(1).replaceAll('/', '-') || 'home')}.jpg`
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {notFound ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {!notFound && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      {!notFound && <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: 'en-AU',
          isPartOf: { '@id': SITE_ID },
          // Case studies are work the engineers led before RaPublisher, so the business is not their subject (B8)
          about: path.startsWith('/work/') ? undefined : { '@id': ORG_ID },
          primaryImageOfPage: image,
        }}
      />}
    </>
  )
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function Section({ title, lead, wide, children }: { title: string; lead?: ReactNode; wide?: boolean; children: ReactNode }) {
  const id = slug(title)
  return (
    <section className="wrap" aria-labelledby={id}>
      <div className={`sec grid${wide ? ' sec-wide' : ''}`}>
        <div className="sec-head">
          <div>
            <h2 id={id}><Rich text={title} /></h2>
            {lead && <p>{lead}</p>}
          </div>
        </div>
        <div className="sec-body" data-reveal>{children}</div>
      </div>
    </section>
  )
}

// The problem beside the answer: two panels, the second one lit (service and industry pages).
export function Pair({ before, after, style }: { before: { title: string; items: string[] }; after: { title: string; items: string[] }; style?: CSSProperties }) {
  const sides = [{ ...before, cls: 'before' }, { ...after, cls: 'after' }].filter((x) => x.items.some(filled))
  if (!sides.length) return null
  return (
    <section className="wrap pair" style={style}>
      <div className="compare" data-reveal>
        {sides.map((x) => (
          <div key={x.title} className={`panel glass ${x.cls}`}>
            <h2>{x.title}</h2>
            <Ticks items={x.items} />
          </div>
        ))}
      </div>
    </section>
  )
}

// Every inner page opens on a sea of neon waves (React Bits GradientWaves). `tone` picks the page's three colours.
const DEFAULT_TONE: Tone = ['violet', 'pink', 'cyan']
const fillVar = (n: Tone[number]) => `var(--nf-${n}, var(--n-${n}))`

export function PageHead({ title, lead, crumbs, art, style, tone = DEFAULT_TONE, children }: { title: string; lead?: string; crumbs?: { to: string; label: string }[]; art?: ReactNode; style?: CSSProperties; tone?: Tone; children?: ReactNode }) {
  const [haze, wave, crest] = tone
  useTheme() // re-render on a theme change, so the waves pick up that theme's neons
  return (
    <header className="page-head" style={{ '--w1': fillVar(haze), '--w2': fillVar(wave), '--w3': fillVar(crest), ...style } as CSSProperties}>
      <Live
        className="head-waves"
        load={() => import('./bits/GradientWaves')}
        props={{ horizonColor: neon(haze, true), waveColor: neon(wave, true), crestColor: neon(crest, true), fogDepth: 60, tilt: 1.42, zoom: 1.6, waveScale: 1.2, amplitude: 3, speed: 0.35, mouseInteraction: false }}
        poster={<span />}
        wait
      />
      <div className="wrap">
        {crumbs && <Crumbs items={crumbs} />}
        <h1><Rich text={title} /></h1>
        {lead && filled(lead) && <p className="lead"><Rich text={lead} /></p>}
        {children}
        {art && <div className="head-art">{art}</div>}
      </div>
    </header>
  )
}

export function Crumbs({ items }: { items: { to: string; label: string }[] }) {
  const all = [{ to: '/', label: 'Home' }, ...items]
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {all.map((c, i) => (
          <li key={c.to}>{i === all.length - 1 ? <span aria-current="page">{c.label}</span> : <Link to={c.to}>{c.label}</Link>}</li>
        ))}
      </ol>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.url + c.to.replace(/\/$/, '') })),
        }}
      />
    </nav>
  )
}

// The one call to action. An enquiry, not a booking: the first step is a conversation.
export function BookButton({ label = 'Start a conversation', className = 'btn btn-primary' }: { label?: string; className?: string }) {
  return (
    <Link to="/contact" className={className} onClick={() => track('book_site_walk_click')}>
      {label}
    </Link>
  )
}

export const EmailLink = () => (
  <a href={`mailto:${site.email}`} onClick={() => track('email_click')}>{site.email}</a>
)

export const hasPhone = !site.phone.startsWith('[')
export const PhoneLink = () =>
  !hasPhone ? (
    <Rich text={site.phone} />
  ) : (
    <a href={`tel:${site.phone.replace(/\s/g, '')}`} onClick={() => track('phone_click')}>{site.phone}</a>
  )

export type Field = { label: string; value: ReactNode; full?: boolean }

export function TitleBlock({ fields, cols = 3, className = '' }: { fields: Field[]; cols?: number; className?: string }) {
  // Fields left empty in clean mode drop out, and the grid narrows so no blank cells show.
  const shown = fields.filter((f) => typeof f.value !== 'string' || filled(f.value))
  const n = Math.max(1, Math.min(cols, shown.filter((f) => !f.full).length))
  return (
    <dl className={`tb ${className}`} style={{ '--tb-cols': n } as CSSProperties}>
      {shown.map((f) => (
        <div key={f.label} className={f.full ? 'full' : undefined}>
          <dt>{f.label}</dt>
          <dd>{typeof f.value === 'string' ? <Rich text={f.value} /> : f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export const Ticks = ({ items }: { items: string[] }) => (
  <ul className="ticks">{items.filter(filled).map((t) => <li key={t}><Rich text={t} /></li>)}</ul>
)
