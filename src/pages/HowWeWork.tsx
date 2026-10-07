import { useEffect, useRef, useState } from 'react'
import { CtaBand, Faq } from '../components/blocks'
import { ProcessDrawing } from '../components/Logo'
import { PageHead, Rich, Section, Seo, Ticks } from '../components/ui'
import { pickFaqs, processSteps } from '../content/site'

// The drawing stays put while the five steps scroll past; the step crossing the middle of the screen lights its square.
function Process() {
  const [active, setActive] = useState(0)
  const steps = useRef<(HTMLLIElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    steps.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className="grid process">
      <div className="process-art"><ProcessDrawing active={active} /></div>
      <ol className="steps">
        {processSteps.map((s, i) => (
          <li key={s.title} data-i={i} ref={(el) => { steps.current[i] = el }} className={`pstep${active === i ? ' on' : ''}`}>
            <span className="pstep-n" aria-hidden="true">{i + 1}</span>
            <h3>{s.title}</h3>
            <p className="meta"><Rich text={s.meta} /></p>
            <p><Rich text={s.body} /></p>
          </li>
        ))}
      </ol>
    </div>
  )
}

const compare = [
  ['Starting point', 'A brief written in a meeting', 'Time on your floor with your people'],
  ['Who you deal with', 'An account manager', 'The engineers who build it'],
  ['When you see progress', 'Near the end', 'Every week'],
  ['Price', 'Hourly estimates', 'A fixed price for each phase, agreed after the Blueprint'],
  ['Rollout', 'A handover email and a manual', 'Training on site, around your shifts'],
  ['After launch', 'A ticket queue', 'The same engineers, plus a quarterly visit'],
  ['Ownership', 'Sometimes unclear', 'You own the code, data and accounts from day one'],
]

export default function HowWeWork() {
  return (
    <>
      <Seo
        title="How forward deployed engineering works | RaPublisher"
        description="We start on your floor, not with a brief. A free site walk, a fixed-fee Blueprint, fixed-price builds and the same engineers after go-live."
      />
      <PageHead
        crumbs={[{ to: '/how-we-work', label: 'How we work' }]}
        title="We learn the work first. Then we build the software."
        lead="A forward deployed engineer works inside your operation: on the floor, in the warehouse, out at your sites. That's how we find out how the work really flows, and it's why what we build gets used."
      />

      <section className="section raised" aria-labelledby="five-steps">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <h2 id="five-steps">Five steps, the same engineers throughout</h2>
          </div>
          <Process />
        </div>
      </section>

      <Section title="How this differs from the usual way" wide>
        <div className="table-wrap">
          <table className="table stacks">
            <caption className="sr-only">The usual way compared with forward deployed engineering</caption>
            <thead>
              <tr><th scope="col"><span className="sr-only">Topic</span></th><th scope="col">The usual way</th><th scope="col">Forward deployed</th></tr>
            </thead>
            <tbody>
              {compare.map(([topic, usual, fd]) => (
                <tr key={topic}>
                  <th scope="row">{topic}</th>
                  <td data-label="The usual way" className="muted">{usual}</td>
                  <td data-label="Forward deployed" className="fd">{fd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Plenty of good firms do some of this. We've built our whole way of working around it.</p>
      </Section>

      <Section title="What we need from you">
        <Ticks
          items={[
            'One person who owns the project on your side. A couple of hours a week is usually enough.',
            'Access to the systems involved, and to the people who use them.',
            "About an hour of each user's time during testing.",
            "Quick decisions. We'll bring options and a recommendation; you choose.",
          ]}
        />
      </Section>

      <Section title="Who does the work">
        <p className="lead">
          <Rich text="Your engineers live in Melbourne. They come on site, design your system, build it and look after it. If a larger build ever needs extra hands, we'll tell you who and where before they start, and your Melbourne engineer stays accountable for all of it. [CONFIRM this matches practice]" />
        </p>
      </Section>

      <Section title="On site, safely">
        <p>
          <Rich text="We complete your induction, sign in and out, follow your site rules and bring our own PPE. We don't enter production or chemical areas without an escort, we never photograph people, formulas or screens without asking, and we sign a confidentiality agreement before we see formulas, pricing or customer data. We hold [TODO: public liability and professional indemnity cover] and can send certificates before the first visit." />
        </p>
      </Section>

      <Section title={'Why "forward deployed"? [DECISION: include or cut]'}>
        <p>
          The term comes from software companies that embedded engineers with their most important customers instead of building from a
          distance. Palantir made the role well known, and over the last two years the big AI companies have built large forward deployed
          teams for enterprise clients. We've taken the same idea and sized it for Victorian businesses with 10 to 200 people and no
          developers of their own.
        </p>
      </Section>

      <Section title="Questions">
        <Faq items={pickFaqs(1, 2, 3, 5, 15, 18)} />
      </Section>

      <CtaBand />
    </>
  )
}
