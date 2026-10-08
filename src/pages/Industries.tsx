import { Link, useParams } from 'react-router'
import { CtaBand, Faq, IndustryPanels, RelatedWork } from '../components/blocks'
import { Iso, neonOf, toneOf } from '../components/Iso'
import { BookButton, PageHead, Pair, Paras, Rich, Section, Seo } from '../components/ui'
import { getIndustry } from '../content/industries'
import { getService } from '../content/services'
import { pickFaqs } from '../content/site'
import NotFound from './NotFound'

export function IndustriesIndex() {
  return (
    <>
      <Seo
        title="Industries we work with | RaPublisher"
        description="Software for Victorian manufacturers, wholesalers and multi-site service teams, designed on site by Melbourne forward deployed engineers."
      />
      <PageHead
        title="Businesses we know"
        tone={['rose', 'orange', 'lime']}
        lead="Victorian businesses that make, move and service physical things, and run on spreadsheets, disconnected apps and a few people's memory."
        crumbs={[{ to: '/industries', label: 'Industries' }]}
      />
      <div className="wrap pad-b">
        <h2 className="sr-only">Industries</h2>
        <IndustryPanels />
      </div>
      <CtaBand />
    </>
  )
}

export function IndustryPage() {
  const i = getIndustry(useParams().slug)
  if (!i) return <NotFound />
  return (
    <>
      <Seo title={i.metaTitle} description={i.metaDescription} />
      <PageHead title={i.h1} lead={i.lead} art={<Iso name={i.slug} />} style={neonOf(i.slug)} tone={toneOf(i.slug)} crumbs={[{ to: '/industries', label: 'Industries' }, { to: `/industries/${i.slug}`, label: i.title }]}>
        <div className="actions mt-2"><BookButton /></div>
      </PageHead>
      <Pair style={neonOf(i.slug)} before={{ title: 'What gets in the way', items: i.pains }} after={{ title: 'What we build', items: i.systems }} />
      <Section title={i.special.heading}>
        {i.special.body && <Paras text={i.special.body} />}
      </Section>
      <Section title="Where we usually start">
        <ul className="ruled">
          {i.services.map(getService).filter((s) => !!s).map((s) => (
            <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-link">{s.title}</Link>: <Rich text={s.summary} /></li>
          ))}
        </ul>
      </Section>
      <Section title="Related work" wide>
        <RelatedWork slugs={i.proof} />
      </Section>
      {i.faqs && (
        <Section title="Questions">
          <Faq items={pickFaqs(...i.faqs)} />
        </Section>
      )}
      <CtaBand />
    </>
  )
}
