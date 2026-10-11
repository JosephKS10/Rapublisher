import { useEffect } from 'react'
import { Link } from 'react-router'
import { CtaBand, Faq, PricingLadder } from '../components/blocks'
import { Calculator } from '../components/Calculator'
import { PageHead, Section, Seo, Ticks, track } from '../components/ui'
import { pickFaqs } from '../content/site'

// No prices are published (owner's decision, 8 October 2026). Every piece of work is quoted in writing before it
// starts: first the Blueprint, then each phase of the build. This page explains how that works and who it suits.
export default function Pricing() {
  useEffect(() => track('pricing_view'), [])
  return (
    <>
      <Seo
        title="How we price our work | RaPublisher"
        description="We don't publish a price list. Every engagement is scoped and quoted after a conversation and a look at the work, in a written proposal."
      />
      <PageHead
        crumbs={[{ to: '/pricing', label: 'Pricing' }]}
        tone={['violet', 'lime', 'cyan']}
        title="Priced once we understand the work"
        lead="RaPublisher doesn't publish a price list, because we don't sell packages. Every engagement is shaped around one business, so we talk first, come and see the work for ourselves, and quote each piece of work in writing before it starts."
      />

      <Section title="From first conversation to proposal" lead="What happens between your first message and a written proposal." wide>
        <PricingLadder />
        <p><Link to="/how-we-work" className="text-link">See each step in detail</Link></p>
      </Section>

      <Section title="Why there's no price list">
        <p className="lead">
          Two businesses can ask for the same thing and need very different work. One has tidy data and a single site. The other has
          ten years of spreadsheets and crews spread across dozens of sites.
        </p>
        <p>
          A price pulled from a list would be wrong for both. So we look first, and you get a proposal that fits your business: what
          we'll do, how long it should take and what it costs.
        </p>
      </Section>

      <Section title="Who we're the right fit for">
        <p className="lead">
          We work with Victorian manufacturers, wholesalers and multi-site service businesses, usually with 10 to 200 people and no
          developers of their own.
        </p>
        <p>
          If that sounds like you, and people are retyping the same information every day, it's worth a conversation. We don't quote
          from a one-line brief, and we'd rather tell you early if someone else would suit you better.
        </p>
      </Section>

      <Section title="What shapes the cost">
        <Ticks
          items={[
            'How many kinds of users there are and how many screens they need.',
            'How many systems we connect, and how tidy their data is.',
            'How much existing data needs cleaning and moving.',
            'Whether it has to work offline or on phones.',
            'The reports you need.',
            'How many sites we roll out to and train.',
          ]}
        />
      </Section>

      <Section title="What your proposal and agreement set out">
        <Ticks
          items={[
            'The scope of each phase, and what is left out.',
            'The timing of each phase.',
            'The price of each phase, agreed before it starts.',
            'Who owns the code, the data and the accounts the system runs on.',
            'Where your system and your data are hosted.',
            'What support covers after go-live, and how we respond when something breaks.',
            'How changes are handled partway through.',
            'How a handover works if you ever move on.',
          ]}
        />
      </Section>

      <Section title="What double handling costs you now" wide>
        <Calculator />
      </Section>

      <Section title="Other ways to work with us">
        <ul className="ruled">
          <li><strong><Link to="/services/rescue">Rescue check</Link>.</strong> A careful review of an existing system, a stalled project or an AI-built tool, with a plain-English report on what it needs.</li>
          <li><strong>Embedded engineer.</strong> For teams that need an engineer on site, working alongside their own people for a period.</li>
        </ul>
        <p>Both are quoted after a first conversation.</p>
      </Section>

      <Section title="Grants and tax incentives">
        <p>
          Some projects may be eligible for government grants or the R&amp;D Tax Incentive, but many software projects aren't. Ask your
          accountant or tax adviser before counting on either.
        </p>
        <p className="note">General information only, not tax advice.</p>
      </Section>

      <Section title="Questions">
        <Faq items={pickFaqs(4, 5, 6, 16, 17)} />
      </Section>

      <CtaBand />
    </>
  )
}
