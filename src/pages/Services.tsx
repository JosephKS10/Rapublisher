import { Link, useParams } from 'react-router'
import { CtaBand, Faq, RelatedWork, ServiceBento } from '../components/blocks'
import { Iso } from '../components/Iso'
import { BookButton, JsonLd, ORG_ID, PageHead, Pair, Paras, Rich, Section, Seo, Ticks } from '../components/ui'
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
      <PageHead title={s.h1} lead={s.lead} art={<Iso name={s.slug} />} crumbs={[{ to: '/services', label: 'Services' }, { to: `/services/${s.slug}`, label: s.title }]}>
        <div className="actions mt-2"><BookButton label={s.cta ?? 'Book a site walk'} /></div>
      </PageHead>

      <Pair before={{ title: 'Signs you need this', items: s.symptoms }} after={{ title: 'What we build', items: s.examples }} />
      {s.extra?.map((x) => (
        <Section key={x.heading} title={x.heading}>
          {x.body && <Paras text={x.body} />}
          {x.items && <Ticks items={x.items} />}
        </Section>
      ))}
      {(s.timeline || s.investment) && (
        <section className="wrap pair">
          <div className="terms glass" data-reveal>
            {s.timeline && (
              <div>
                <h2>How it runs</h2>
                <p><Rich text={s.timeline} /></p>
              </div>
            )}
            {s.investment && (
              <div>
                <h2>Investment</h2>
                <p><Rich text={s.investment} /></p>
                <p className="muted">Prices are in Australian dollars and exclude GST. See <Link to="/pricing">pricing</Link> for how each step is priced.</p>
              </div>
            )}
          </div>
        </section>
      )}
      <Section title="Related work" wide>
        <RelatedWork slugs={s.relatedWork} />
      </Section>
      {s.faqs.length > 0 && (
        <Section title="Questions">
          <Faq items={s.faqs} />
        </Section>
      )}
      <CtaBand />
    </>
  )
}
