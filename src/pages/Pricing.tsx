import { useEffect } from 'react'
import { Link } from 'react-router'
import { CtaBand, Faq, PricingLadder } from '../components/blocks'
import { Calculator } from '../components/Calculator'
import { filled, PageHead, Rich, Section, Seo, Ticks, track } from '../components/ui'
import { pickFaqs, typicalRanges } from '../content/site'

export default function Pricing() {
  useEffect(() => track('pricing_view'), [])
  return (
    <>
      <Seo
        title="Pricing: site walk, Blueprint and build | RaPublisher"
        description="A free site walk, a fixed-fee Blueprint, a fixed price for each build phase and monthly support plans. Typical ranges, plus GST."
      />
      <PageHead
        crumbs={[{ to: '/pricing', label: 'Pricing' }]}
        title="What it costs"
        lead="Custom software isn't cheap, and it shouldn't be a mystery. Here's how RaPublisher prices its work, what's typical, and what moves the number."
      />

      <Section title="Four steps, each priced before we start" lead="Each step is useful on its own, so you can stop at any rung and still be better off." wide>
        {filled('[DECISION: all figures on this page]') && <p><Rich text="[DECISION: all figures on this page]" /></p>}
        <PricingLadder />
      </Section>

      <Section title="Other ways to start">
        <ul className="ruled">
          <li><strong>Rescue check:</strong> from A$2,500 plus GST. A plain-English report on an existing system or AI-built tool, with a fixed quote to fix it.</li>
          <li><strong>Embedded engineer:</strong> <Rich text="A$1,100 to A$1,400 a day plus GST [DECISION], in blocks of five days or more, for teams that need an engineer on site." /></li>
        </ul>
      </Section>

      <Section title="Typical ranges" wide>
        <div className="table-wrap">
          <table className="table stacks">
            <caption className="sr-only">Typical ranges, plus GST</caption>
            <thead>
              <tr><th scope="col">Work</th><th scope="col">Typical range (plus GST)</th><th scope="col">Typical time</th></tr>
            </thead>
            <tbody>
              {typicalRanges.map((r) => (
                <tr key={r.work}>
                  <th scope="row">{r.work}</th>
                  <td className="data" data-label="Range">{r.range}</td>
                  <td className="data" data-label="Time">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>These are ranges, not quotes. Your Blueprint gives you a fixed price.</p>
        <p><Link to="/insights/custom-software-cost-melbourne" className="text-link">How these compare with published Melbourne rates</Link></p>
      </Section>

      <Section title="What moves the price">
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

      <Section title="Paying for it">
        <p><Rich text="A deposit starts each phase, with payments at agreed milestones. [CONFIRM terms] Hosting and app subscriptions are billed to you directly by the provider, so you always own the accounts." /></p>
        <p>
          <strong>Grants and tax incentives.</strong> Some projects may be eligible for government grants or the R&amp;D Tax Incentive, but
          many software projects aren't. Ask your accountant or tax adviser before counting on either.
        </p>
        <p className="note">General information only, not tax advice.</p>
        <p><strong>Small print:</strong> All prices are in Australian dollars and exclude GST.</p>
      </Section>

      <Section title="Questions">
        <Faq items={pickFaqs(4, 5, 6, 7, 16, 17)} />
      </Section>

      <CtaBand />
    </>
  )
}
