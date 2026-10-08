import { Fragment, useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { BeforeAfter, Care, CtaBand, Facts, Faq, Img, IndustryPanels, Phone, ProblemList, ServiceBento, TeamCards, WorkSwap } from '../components/blocks'
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

// The statement rises into place word by word as it scrolls up the screen. Browsers with CSS scroll timelines tie it
// to the scroll position; the others play it once when the paragraph comes into view (the observer below).
const STATEMENT =
  "We're forward deployed engineers based in Melbourne. We come to your factory, warehouse or sites and learn the work from the people who do it. Then we build the software that takes the double handling off their plates, and we stay to look after it."

export default function Home() {
  const statement = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = statement.current
    if (!el || CSS.supports('animation-timeline: view()') || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.dataset.ready = ''
    const io = new IntersectionObserver(([e]) => e.isIntersecting && ((el.dataset.in = ''), io.disconnect()), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <>
      <Seo
        title="Forward deployed engineers, Melbourne | RaPublisher"
        description="Melbourne engineers who come on site, learn how your business runs, and build the software that ends double handling. It starts with a conversation."
      />

      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap grid hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-title">
              <span>Software built where</span> <span className="accent">the work happens.</span>
            </h1>
            <p className="hero-lead">We spend time in your business, get to know your people and how the work really flows, then build software that makes their days easier.</p>
            <div className="actions">
              <BookButton />
              <Link to="/work" className="btn btn-ghost">See our work</Link>
            </div>
          </div>
          <div className="hero-stage">
            <div className="scene">
              {heroBack && <figure className="shot back"><Img s={heroBack} sizes="(min-width: 960px) 46rem, 82vw" /></figure>}
              {heroFront && <figure className="shot front"><Img s={heroFront} sizes="(min-width: 960px) 46rem, 82vw" eager priority /></figure>}
              {heroPhone && <div className="hero-phone"><Phone s={heroPhone} sizes="13rem" /></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="section statement" aria-label="What we do">
        <div className="wrap">
          <p className="statement-text" ref={statement}>
            {STATEMENT.split(' ').map((w, i) => <Fragment key={i}><span style={{ '--i': i } as CSSProperties}>{w}</span> </Fragment>)}
          </p>
          <Facts
            items={[
              ['We come to you', 'The work starts on your floor, with your people'],
              ['We listen first', 'Before we design anything'],
              ['The same engineers', 'From the first conversation to long after launch'],
              ['By engagement', 'Each one scoped and quoted once we understand the work'],
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
              with the same engineers from the first conversation to the hundredth improvement.
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
            <p>Systems for businesses that run on crews, stock and sites.</p>
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

      <section className="section" aria-labelledby="look-after">
        <div className="wrap">
          <div className="section-head">
            <Heading id="look-after" text="How we look after you" />
            <p>Good software comes from knowing a business and the people in it. This is what that looks like in practice.</p>
          </div>
          <Care />
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
            <p>Both live in Melbourne. <Link to="/about" className="text-link">About Ramin and Joseph</Link></p>
          </div>
          <TeamCards />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
