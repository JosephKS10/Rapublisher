import { useEffect } from 'react'
import { CtaBand, Faq, PricingLadder } from '../components/blocks'
import { Calculator } from '../components/Calculator'
import { PageHead, Section, Seo, Ticks, track } from '../components/ui'
import { pickFaqs } from '../content/site'

// No prices are published (owner's decision, 8 October 2026): every engagement is quoted by proposal after a
// conversation and a site walk. This page explains how that works.
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
        lead="We don't publish prices, because we don't sell packages. Every engagement is shaped around one business, so we talk first, see the work for ourselves, and then put a proposal in front of you."
      />

      <Section title="From first conversation to proposal" lead="We take the time to understand a business before we put a number on anything." wide>
        <PricingLadder />
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

      <Section title="What double handling costs you now" wide>
        <Calculator />
      </Section>

      <Section title="Other ways to work with us">
        <ul className="ruled">
          <li><strong>Rescue check.</strong> A careful review of an existing system, a stalled project or an AI-built tool, with a plain-English report on what it needs.</li>
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
        <Faq items={pickFaqs(4, 6, 5, 16, 17)} />
      </Section>

      <CtaBand />
    </>
  )
}
