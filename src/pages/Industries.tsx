import { useParams } from 'react-router'
import { CtaBand, IndustryPanels, RelatedWork } from '../components/blocks'
import { Iso } from '../components/Iso'
import { BookButton, PageHead, Pair, Paras, Section, Seo } from '../components/ui'
import { getIndustry } from '../content/industries'
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
        lead="Victorian businesses that make, move and service physical things, and run on spreadsheets, disconnected apps and a few people's memory."
      />
      <div className="wrap pad-b">
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
      <PageHead title={i.h1} lead={i.lead} art={<Iso name={i.slug} />} crumbs={[{ to: '/industries', label: 'Industries' }, { to: `/industries/${i.slug}`, label: i.title }]}>
        <div className="actions mt-2"><BookButton /></div>
      </PageHead>
      <Pair before={{ title: 'What gets in the way', items: i.pains }} after={{ title: 'What we build', items: i.systems }} />
      <Section title={i.special.heading}>
        {i.special.body && <Paras text={i.special.body} />}
      </Section>
      <Section title="Related work" wide>
        <RelatedWork slugs={i.proof} />
      </Section>
      <CtaBand />
    </>
  )
}
