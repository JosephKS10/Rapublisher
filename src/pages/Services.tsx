import { Link, useParams } from 'react-router'
import { CtaBand, Faq, hasWork, RelatedWork, ServiceBento } from '../components/blocks'
import { Iso, neonOf, toneOf } from '../components/Iso'
import { BookButton, JsonLd, ORG_ID, PageHead, Pair, Paras, REVIEW, Section, Seo, Ticks } from '../components/ui'
import { getInsight } from '../content/insights'
import { getService } from '../content/services'
import { pickFaqs, site } from '../content/site'
import NotFound from './NotFound'

export function ServicesIndex() {
  return (
    <>
      <Seo
        title="Custom software development, Melbourne | RaPublisher"
        description="Operations software, integrations, practical AI, field apps, rescue and support, designed on site by Melbourne forward deployed engineers."
      />
      <PageHead
        title="What we build"
        tone={['cyan', 'violet', 'pink']}
        lead="We build and connect the systems your team uses every day: orders, stock, production and people."
        crumbs={[{ to: '/services', label: 'Services' }]}
      />
      <div className="wrap pad-b">
        <h2 className="sr-only">All services</h2>
        <ServiceBento />
      </div>
      <Section title="Questions">
        <Faq items={pickFaqs(9, 4, 7)} />
      </Section>
      <CtaBand />
    </>
  )
}

export function ServicePage() {
  const s = getService(useParams().slug)
  if (!s) return <NotFound />
  const questions = [...s.faqs, ...pickFaqs(...(s.moreFaqs ?? []))]
  const insight = getInsight(s.insight)
  return (
    <>
      <Seo title={s.metaTitle} description={s.metaDescription} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          description: s.metaDescription,
          serviceType: s.title,
          url: `${site.url}/services/${s.slug}`,
          provider: { '@id': ORG_ID },
          areaServed: [{ '@type': 'City', name: 'Melbourne' }, { '@type': 'State', name: 'Victoria' }],
        }}
      />
      <PageHead title={s.h1} lead={s.lead} art={<Iso name={s.slug} />} style={neonOf(s.slug)} tone={toneOf(s.slug)} crumbs={[{ to: '/services', label: 'Services' }, { to: `/services/${s.slug}`, label: s.title }]}>
        <div className="actions mt-2"><BookButton label={s.cta} /></div>
      </PageHead>

      <Pair style={neonOf(s.slug)} before={{ title: 'Signs you need this', items: s.symptoms }} after={{ title: 'What we build', items: s.examples }} />
      {s.extra?.map((x) => (
        <Section key={x.heading} title={x.heading}>
          {x.body && <Paras text={x.body} />}
          {x.items && <Ticks items={x.items} />}
        </Section>
      ))}
      <section className="wrap pair">
        <div className="terms glass" data-reveal>
          <div>
            <h2>How this is scoped</h2>
            <p>Every engagement is shaped around one business, so it starts with a conversation and a look at the work.</p>
          </div>
          <div>
            <h2>What it costs</h2>
            <p>Quoted by proposal, once we understand what you need.</p>
            <p className="muted">See <Link to="/how-we-work">how we work</Link> and <Link to="/pricing">how we price</Link>.</p>
            {insight && <p className="muted">Background: <Link to={`/insights/${insight.slug}`}>{insight.title}</Link></p>}
          </div>
        </div>
      </section>
      {(hasWork(s.relatedWork) || REVIEW) && (
        <Section title="Related work" wide>
          <RelatedWork slugs={s.relatedWork} />
        </Section>
      )}
      {questions.length > 0 && (
        <Section title="Questions">
          <Faq items={questions} />
        </Section>
      )}
      <CtaBand />
    </>
  )
}
