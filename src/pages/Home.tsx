import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { BeforeAfter, Commitments, CtaBand, Facts, Faq, Img, IndustryPanels, ProblemList, ServiceBento, TeamCards, WorkSwap } from '../components/blocks'
import { Calculator } from '../components/Calculator'
import { BookButton, Seo } from '../components/ui'
import { pickFaqs } from '../content/site'
import { getWork, type Work } from '../content/work'

const featured = ['super-pro-services', 'ccsm-mobile-commerce', 'multi-site-operations-platform', 'calpinemate-employee-app']
  .map(getWork)
  .filter((w): w is Work => !!w)
// Hero stage: three real screens. A staff schedule in front, the operations calendar behind, the ordering app on a phone.
const shotOf = (slug: string, name: string) => getWork(slug)?.images.find((i) => i.src.includes(`/${name}-`))
const heroFront = shotOf('super-pro-services', 'schedule')
const heroBack = shotOf('multi-site-operations-platform', 'calendar')
const heroPhone = shotOf('ccsm-mobile-commerce', 'home')

// Section headings rise in as they scroll into view (CSS only, see [data-reveal]).
const Heading = ({ id, text }: { id: string; text: string }) => <h2 id={id} data-reveal>{text}</h2>

// The statement lights up word by word as it scrolls through the viewport (CSS scroll timeline; plain text elsewhere).
const STATEMENT =
  "We're forward deployed engineers based in Melbourne. We come to your factory, warehouse or sites, learn how the work really flows, then build and connect the software that ends the double handling. And we stay to look after it."

export default function Home() {
  return (
    <>
      <Seo
        title="Forward deployed engineers, Melbourne | RaPublisher"
        description="Melbourne engineers who come on site, learn how your business runs, and build the software that ends double handling. Book a free site walk."
      />

      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap grid hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-title">
              <span>Software built where</span> <span className="accent">the work happens.</span>
            </h1>
            <p className="hero-lead">We come into your business, learn how the work flows, and build the software that gets rid of the double handling.</p>
            <div className="actions">
              <BookButton />
              <Link to="/work" className="btn btn-ghost">See our work</Link>
            </div>
          </div>
          <div className="hero-stage">
            <div className="scene">
              {heroBack && <figure className="shot back"><Img s={heroBack} sizes="(min-width: 960px) 46rem, 82vw" /></figure>}
              {heroFront && <figure className="shot front"><Img s={heroFront} sizes="(min-width: 960px) 46rem, 82vw" eager priority /></figure>}
              {heroPhone && <figure className="shot phone"><Img s={heroPhone} sizes="12rem" /></figure>}
            </div>
          </div>
        </div>
      </section>

      <section className="section statement" aria-label="What we do">
        <div className="wrap">
          <p className="statement-text">
            {STATEMENT.split(' ').map((w, i) => <span key={i} style={{ '--i': i } as CSSProperties}>{w} </span>)}
          </p>
          <Facts
            items={[
              ['Free site walk', 'About an hour, at your place'],
              ['Fixed price per phase', 'Agreed before work starts'],
              ['Yours to keep', 'Code, data and accounts from day one'],
              ['Same engineers', 'From the first site walk to the hundredth improvement'],
            ]}
          />
        </div>
      </section>

      <section className="section lit" aria-labelledby="sound-familiar">
        <div className="wrap">
          <ProblemList />
        </div>
      </section>

      <section className="section" aria-labelledby="come-to-you">
        <div className="wrap">
          <div className="section-head">
            <Heading id="come-to-you" text="Engineers who come to you" />
            <p>
              Most software is built from a brief written in a meeting room. Ours starts on your floor. A forward deployed engineer spends
              time where the work happens, with the people who do it, before designing anything.
            </p>
          </div>
          <BeforeAfter />
          <div className="stack after-compare">
            <p>
              Then we build in small steps you can see and test, roll it out alongside your team, and stay on to improve it. You deal
              with the same engineers from the first site walk to the hundredth improvement.
            </p>
            <Faq items={pickFaqs(1)} />
            <p><Link to="/how-we-work" className="text-link">How we work</Link></p>
          </div>
        </div>
      </section>

      <section className="section lit" aria-labelledby="what-we-build">
        <div className="wrap">
          <div className="section-head">
            <Heading id="what-we-build" text="What we build" />
          </div>
          <ServiceBento />
        </div>
      </section>

      <section className="section" aria-labelledby="work-led">
        <div className="wrap">
          <div className="section-head">
            <Heading id="work-led" text="Work our engineers have led" />
            <p>Systems for Australian businesses that run on crews, stock and sites.</p>
          </div>
          <WorkSwap items={featured} />
          <p className="mt-2"><Link to="/work" className="text-link">See all work</Link></p>
        </div>
      </section>

      <section className="section lit" aria-labelledby="retyping-cost">
        <div className="wrap">
          <div className="section-head">
            <Heading id="retyping-cost" text="What is retyping costing you?" />
            <p>
              Tell us how many people re-enter or reconcile the same information, and for how long each day. It's a rough estimate, but
              it's usually bigger than people expect.
            </p>
          </div>
          <Calculator />
        </div>
      </section>

      <section className="section" aria-labelledby="hold-us-to">
        <div className="wrap">
          <div className="section-head">
            <Heading id="hold-us-to" text="What you can hold us to" />
          </div>
          <Commitments />
        </div>
      </section>

      <section className="section lit" aria-labelledby="businesses">
        <div className="wrap">
          <div className="section-head">
            <Heading id="businesses" text="Businesses we know" />
          </div>
          <IndustryPanels />
        </div>
      </section>

      <section className="section" aria-labelledby="people">
        <div className="wrap grid team-split">
          <div className="section-head">
            <h2 id="people">The people you meet are the people who build it</h2>
            <p>Both live in Melbourne.</p>
          </div>
          <TeamCards />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
