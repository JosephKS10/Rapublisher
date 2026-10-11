import { CtaBand, Faq, TeamCards } from '../components/blocks'
import { JsonLd, ORG_ID, PageHead, personId, Rich, Section, Seo } from '../components/ui'
import { beliefs, pickFaqs, site, team } from '../content/site'

export default function About() {
  return (
    <>
      <Seo
        title="About RaPublisher | Melbourne forward deployed engineers"
        description="Melbourne engineers who learn how your business runs before building anything, then stay to look after it. Meet Ramin and Joseph."
      />
      {team.map((m) => (
        <JsonLd key={m.name} data={{ '@context': 'https://schema.org', '@type': 'Person', '@id': personId(m.name), name: m.name, jobTitle: m.role, url: `${site.url}/about`, worksFor: { '@id': ORG_ID }, homeLocation: { '@type': 'Place', name: 'Melbourne, Victoria, Australia' } }} />
      ))}
      <PageHead
        tone={['orange', 'rose', 'violet']}
        title="Engineers who'd rather see the floor than read the brief"
        lead="RaPublisher is a forward deployed software engineering business in Melbourne. Our two engineers, Ramin Shirzad and Joseph Saji, go on site at Victorian manufacturers, wholesalers and multi-site service businesses with no developers of their own. We learn how the work flows, then build, connect and look after the software it needs."
        crumbs={[{ to: '/about', label: 'About' }]}
      />

      <Section title="Why we work this way">
        <p><Rich text="[TODO: the founders' story in their own words, 120 to 180 words. Prompts: what kept going wrong in the businesses you saw; why you decided to work on site; why these industries.]" /></p>
        <p className="muted">
          <Rich text="[CONFIRM draft to react to, keep only what's true] We kept meeting businesses where good people spent hours a day retyping the same information between systems that didn't talk to each other. The software was rarely the hard part. Understanding the work was. So we built RaPublisher around turning up, learning the work, and building what fixes it." />
        </p>
      </Section>

      <Section title="What we believe">
        <ul className="ruled">
          {beliefs.map((b) => (
            <li key={b.title}><strong>{b.title}</strong> {b.body}</li>
          ))}
        </ul>
      </Section>

      <Section title="Meet the engineers" lead="Both live in Melbourne. They do the site walks, design the systems, build them, roll them out on site and look after them." wide>
        <TeamCards />
      </Section>

      <Section title="Where we are">
        <p className="lead"><Rich text="Based in Melbourne's south-east [CONFIRM suburb], working across metro Melbourne, with regional Victoria by arrangement." /></p>
        <p><Rich text={site.legal} /></p>
      </Section>

      <Section title="Questions">
        <Faq items={pickFaqs(3, 8)} />
      </Section>

      <CtaBand />
    </>
  )
}
