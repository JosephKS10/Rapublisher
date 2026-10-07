import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CaseGrid, CtaBand, Img, workFields } from '../components/blocks'
import TiltedCard from '../components/bits/TiltedCard'
import { PageHead, Rich, Section, Seo, TitleBlock, Ticks, filled, track } from '../components/ui'
import { getWork, published, verifiedOutcomes, type Work } from '../content/work'
import NotFound from './NotFound'

const FILTERS: { label: string; test: (w: Work) => boolean }[] = [
  { label: 'All', test: () => true },
  { label: 'Manufacturing', test: (w) => w.industry === 'manufacturing' },
  { label: 'Wholesale', test: (w) => w.industry === 'wholesale' },
  { label: 'Multi-site services', test: (w) => w.industry === 'services' },
  { label: 'Field apps', test: (w) => w.services.includes('field-and-floor-apps') },
]

export function WorkIndex() {
  const [filter, setFilter] = useState(FILTERS[0])
  const shown = published.filter(filter.test)
  return (
    <>
      <Seo
        title="Work our engineers have led | RaPublisher"
        description="Workforce portals, operations platforms, B2B ordering and mobile apps for Australian businesses, led by our Melbourne engineers."
      />
      <PageHead
        title="Work our engineers have led"
        lead="Systems for businesses that run on crews, stock and sites. Each one started with time spent understanding the work."
      />
      <section className="wrap pad-b" aria-label="Case studies">
        <div className="filters" role="group" aria-label="Filter by industry">
          {FILTERS.map((f) => (
            <button key={f.label} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f.label}</button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{shown.length} case studies shown</p>
        {shown.length ? <CaseGrid items={shown} /> : <div className="empty"><p>Nothing in this category yet. Try another filter.</p></div>}
      </section>
      <CtaBand />
    </>
  )
}

export function CaseStudy() {
  const w = getWork(useParams().slug)
  useEffect(() => { if (w) track('case_study_view', { slug: w.slug }) }, [w])
  if (!w) return <NotFound />
  const outcomes = verifiedOutcomes(w)
  const quote = w.testimonial?.permission ? w.testimonial : undefined
  const img = w.images[0]
  const heroH = img && (img.mobile ? `calc(18rem * ${img.h / img.w})` : `calc(min(100vw - 2 * var(--pad), 78rem) * ${(img.h / img.w).toFixed(4)})`)
  return (
    <>
      <Seo title={w.metaTitle ?? `${w.title} | RaPublisher`} description={w.summary.length > 155 ? w.summary.split('. ')[0] + '.' : w.summary} />
      <PageHead title={w.title} lead={w.summary} crumbs={[{ to: '/work', label: 'Work' }, { to: `/work/${w.slug}`, label: w.title }]}>
        <div className="mt-2"><TitleBlock fields={workFields(w)} /></div>
        {w.note && filled(w.note) && <p className="mt-2"><Rich text={w.note} /></p>}
      </PageHead>

      {img && (
        <div className="wrap case-hero" data-reveal>
          {/* React Bits TiltedCard: the lead screen tilts toward the pointer */}
          <TiltedCard
            imageSrc={img.src}
            altText={img.alt}
            containerWidth="100%"
            containerHeight={heroH}
            imageWidth={img.mobile ? '18rem' : '100%'}
            imageHeight={heroH}
            scaleOnHover={1.02}
            rotateAmplitude={img.mobile ? 10 : 5}
          />
        </div>
      )}

      <Section title="The situation">
        <p className="lead"><Rich text={w.problem} /></p>
      </Section>
      {w.onSite && filled(w.onSite) && (
        <Section title="What we saw on site">
          <p><Rich text={w.onSite} /></p>
        </Section>
      )}
      <Section title="What we built">
        <Ticks items={w.built} />
      </Section>
      {w.images.length > 1 && (
        <section className="gallery-wrap" aria-label="Screens from the build">
          {/* Every screen at its own shape: wide for desktop, tall for phone. The strip scrolls sideways and snaps. */}
          <ul className="strip" tabIndex={0}>
            {w.images.map((s) => (
              <li key={s.src} className={s.mobile ? 'mob' : undefined}>
                <figure>
                  <div className="bezel"><Img s={{ ...s, alt: '' }} sizes={s.mobile ? '15rem' : '(min-width: 960px) 58rem, 86vw'} /></div>
                  <figcaption>{s.caption ?? s.alt}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="wrap gallery-hint">Scroll sideways to see every screen. Personal and client details are blurred.</p>
        </section>
      )}
      {w.rollout && filled(w.rollout) && (
        <Section title="Rollout">
          <p><Rich text={w.rollout} /></p>
        </Section>
      )}
      {(outcomes.length > 0 || filled('[TODO]')) && (
        <Section title="What changed">
          {outcomes.length ? (
            <TitleBlock cols={2} fields={outcomes.map((o) => ({ label: o.metric, value: o.value }))} />
          ) : (
            <p><Rich text="[TODO: verified outcomes, with how they were measured]" /></p>
          )}
        </Section>
      )}
      {(quote || (w.testimonialTodo && filled(w.testimonialTodo))) && (
        <Section title="In their words">
          {quote ? (
            <figure className="stack">
              <blockquote className="quote"><p>{quote.quote}</p></blockquote>
              <figcaption className="muted">{[quote.name, quote.role, quote.company].filter(Boolean).join(', ')}</figcaption>
            </figure>
          ) : (
            <p><Rich text={w.testimonialTodo!} /></p>
          )}
        </Section>
      )}
      {w.stack.length > 0 && (
        <Section title="Under the hood">
          <p className="muted">{w.stack.join(', ')}.</p>
        </Section>
      )}
      <CtaBand />
    </>
  )
}
