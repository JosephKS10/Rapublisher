import { Fragment, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { ArrowRightIcon, CheckIcon } from '@phosphor-icons/react'
import MagicBento from './bits/MagicBento'
import { industries } from '../content/industries'
import { getService } from '../content/services'
import { commitments, ladder, problems, team } from '../content/site'
import { clientLabel, getWork, verifiedOutcomes, type Shot, type Work } from '../content/work'
import { Iso } from './Iso'
import { Live } from './Live'
import { Mark } from './Logo'
import { accent } from './palette'
import { BookButton, filled, hasPhone, PhoneLink, Rich, TitleBlock, type Field } from './ui'


export function CtaBand() {
  const { hex } = accent()
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <Live
        className="cta-rays"
        load={() => import('./bits/LightRays')}
        props={{ raysOrigin: 'top-center', raysColor: hex, raysSpeed: 0.7, lightSpread: 0.9, rayLength: 1.3, followMouse: true, mouseInfluence: 0.06, noiseAmount: 0.06, distortion: 0.03 }}
      />
      <div className="wrap">
        <div data-reveal>
          <h2 id="cta-title">Tell us what would make your working day easier.</h2>
          <p>Book a free site walk. An engineer comes to you, sees how the work flows and tells you straight whether we can help.</p>
          <div className="actions">
            <BookButton />
            {hasPhone && <span>Or call <PhoneLink /></span>}
          </div>
        </div>
        <Live
          className="cta-metal"
          load={() => import('./bits/MetallicPaint')}
          props={{ imageSrc: '/mark-metal.svg', lightColor: '#ffffff', darkColor: '#07080a', tintColor: hex, speed: 0.25, liquid: 0.8, brightness: 1.7, chromaticSpread: 1 }}
          poster={<Mark />}
        />
      </div>
    </section>
  )
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.filter((f) => filled(f.a)).map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <div><p><Rich text={f.a} /></p></div>
        </details>
      ))}
    </div>
  )
}

// Six services in React Bits' MagicBento grid; operations software and field apps take the two large cells.
const BENTO_ORDER = ['integrations', 'ai-in-operations', 'operations-software', 'field-and-floor-apps', 'rescue', 'run-and-improve']

export function ServiceBento() {
  return (
    <div data-reveal>
      <MagicBento
        items={BENTO_ORDER.map(getService).filter((s) => !!s).map((s) => {
          const big = s.slug === 'operations-software' || s.slug === 'field-and-floor-apps'
          return {
            key: s.slug,
            content: (
              <div className={`svc${big ? ' big' : ''}`}>
                <Iso name={s.slug} className="svc-fig" />
                <div>
                  <h3><Link to={`/services/${s.slug}`}>{s.title}</Link></h3>
                  <p><Rich text={s.summary} /></p>
                  <span className="go" aria-hidden="true">Learn more <ArrowRightIcon /></span>
                </div>
              </div>
            ),
          }
        })}
        textAutoHide={false}
        enableSpotlight
        enableBorderGlow
        enableTilt
        enableMagnetism={false}
        clickEffect={false}
        spotlightRadius={320}
        particleCount={0}
        glowColor={accent().csv}
      />
    </div>
  )
}

export function IndustryPanels() {
  return (
    <div className="acc" data-reveal>
      {industries.map((ind) => {
        return (
          <Link key={ind.slug} to={`/industries/${ind.slug}`}>
            <Iso name={ind.slug} className="acc-fig" />
            <h3>{ind.title}</h3>
            <div className="stack">
              <p>{ind.summary}</p>
              <span className="more">See how we help</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export function workFields(w: Work): Field[] {
  const outcome = verifiedOutcomes(w)[0]
  return [
    { label: 'Client', value: clientLabel(w) },
    { label: 'Site', value: w.location },
    { label: w.engagement === 'prior' ? 'Led by' : 'Engineers', value: w.ledBy.join(', ') },
    { label: 'Scope', value: w.scope, full: true },
    { label: 'Outcome', value: outcome ? `${outcome.metric}: ${outcome.value}` : '[TODO verified metric]', full: true },
  ]
}

export const Img = ({ s, sizes = '(min-width: 960px) 40vw, 90vw', eager }: { s: Shot; sizes?: string; eager?: boolean }) => (
  <img
    src={s.src}
    srcSet={s.small ? `${s.small} ${s.small.match(/-(\d+)\.webp$/)?.[1]}w, ${s.src} ${s.w}w` : undefined}
    sizes={sizes}
    width={s.w}
    height={s.h}
    alt={s.alt}
    loading={eager ? 'eager' : 'lazy'}
    fetchPriority={eager ? 'high' : undefined}
    decoding="async"
  />
)

// Real screens as the cover: one desktop shot, or three phone screens side by side.
function Cover({ w }: { w: Work }) {
  const first = w.images[0]
  if (!first) return <div className="case-cover"><Mark className="svc-art" line /></div>
  if (first.mobile) {
    return <div className="case-cover mob">{w.images.filter((i) => i.mobile).slice(0, 3).map((s) => <Img key={s.src} s={s} sizes="15vw" />)}</div>
  }
  return <div className="case-cover"><Img s={first} /></div>
}

export function CaseCard({ w }: { w: Work }) {
  return (
    <article className="case">
      <Cover w={w} />
      <div className="case-body">
        <h3><Link to={`/work/${w.slug}`}>{w.title}</Link></h3>
        <TitleBlock fields={workFields(w).slice(0, 3)} />
      </div>
    </article>
  )
}

export function CaseGrid({ items }: { items: Work[] }) {
  return <div className="cases" data-reveal>{items.map((w) => <CaseCard key={w.slug} w={w} />)}</div>
}

// Related work for service and industry pages. Drafts are filtered out by getWork.
export function RelatedWork({ slugs }: { slugs: string[] }) {
  const items = slugs.map(getWork).filter((w): w is Work => !!w)
  if (!items.length) return filled('[TODO]') ? <p><Rich text="[TODO: link at least one case study here (A4)]" /></p> : null
  return <CaseGrid items={items} />
}

// Home: the case list drives a stage. Point at or tab to a project and its real screens show, crisp and at their
// own ratio. Without JavaScript the first project shows.
export function WorkSwap({ items }: { items: Work[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="grid work-split">
      <ul className="work-list" data-reveal>
        {items.map((w, i) => (
          <li key={w.slug}>
            <Link to={`/work/${w.slug}`} className="work-row" data-active={i === active || undefined} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
              <b>{w.title}</b>
              <span><Rich text={clientLabel(w)} />, led by <Rich text={w.ledBy.join(', ')} /></span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="work-stage" aria-hidden="true">
        {items.map((w, i) => {
          const mobile = !!w.images[0]?.mobile
          const shots = mobile ? w.images.filter((s) => s.mobile).slice(0, 3) : w.images.slice(0, 1)
          return (
            <div key={w.slug} className={`work-view ${mobile ? 'mob' : 'desk'}`} data-active={i === active || undefined}>
              {shots.map((s) => <div className="bezel" key={s.src}><Img s={{ ...s, alt: '' }} sizes={mobile ? '14rem' : '(min-width: 960px) 46rem, 92vw'} /></div>)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// The four steps as a staircase: each plate stands a little taller than the last. A true sequence, so it is numbered.
export function PricingLadder() {
  return (
    <ol className="rungs" data-reveal>
      {ladder.map((r, i) => (
        <li key={r.step} className="glass" style={{ '--n': i } as CSSProperties}>
          <span className="rung-n" aria-hidden="true">{i + 1}</span>
          <h3>{r.step}</h3>
          <p className="rung-price"><Rich text={r.price} /></p>
          <p><Rich text={r.gets} /></p>
        </li>
      ))}
    </ol>
  )
}

export function Commitments() {
  return (
    <ul className="clauses" data-reveal>
      {commitments.map((c) => (
        <li key={c}>
          <div className="clause">
            <CheckIcon weight="bold" aria-hidden="true" />
            <span><Rich text={c} /></span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Facts({ items }: { items: [string, string][] }) {
  return (
    <dl className="facts" data-reveal>
      {items.map(([t, d]) => (
        <div key={t} className="fact">
          <dt>{t}</dt>
          <dd>{d}</dd>
        </div>
      ))}
    </dl>
  )
}

export function TeamCards() {
  return (
    <div className="team">
      {team.map((m) => (
        <article className={`person${m.photo ? '' : ' no-photo'}`} key={m.name} data-reveal>
          <div className="portrait">
            {m.photo ? <img src={m.photo} alt={`${m.name} on site`} loading="lazy" /> : <Mark className="art" line />}
            {!m.photo && <b aria-hidden="true">{m.name.split(' ').map((n) => n[0]).join('')}</b>}
          </div>
          <h3>{m.name}</h3>
          <p className="role">{m.role}</p>
          {filled(m.bio) && <p><Rich text={m.bio} /></p>}
          {m.linkedin && <a href={m.linkedin}>{m.name.split(' ')[0]} on LinkedIn</a>}
        </article>
      ))}
    </div>
  )
}

// "Sound familiar?" as a self-check. CSS counts the ticks (counter) and lights the verdict at two
// (`:has(input:checked ~ input:checked)`), so the inputs stay siblings and no JavaScript is needed.
export function ProblemList() {
  return (
    <div className="self-check grid">
      <div className="sc-head">
        <h2 id="sound-familiar">Sound familiar?</h2>
        <p className="lead">Tick the ones that sound like your week.</p>
      </div>
      <div className="tiles" role="group" aria-labelledby="sound-familiar">
        {problems.map((p, i) => (
          <Fragment key={p}>
            <input type="checkbox" id={`problem-${i}`} className="sr-only" />
            <label htmlFor={`problem-${i}`}><span>{p}</span></label>
          </Fragment>
        ))}
      </div>
      <div className="sc-verdict">
        <p className="hits" aria-hidden="true">of {problems.length} sound like your week</p>
        <p className="verdict">If two or more of these sound like your week, an hour on site is worth it.</p>
        <div><BookButton /></div>
      </div>
    </div>
  )
}

export function BeforeAfter() {
  return (
    <div className="compare" data-reveal>
      <div className="panel glass before">
        <h3>Before</h3>
        <ol className="flow">
          <li>Phone order</li>
          <li>Written on a notepad</li>
          <li>Typed into a spreadsheet</li>
          <li>Typed into Xero</li>
          <li>Typed onto a pick slip</li>
        </ol>
        <p className="panel-sum">Same order, entered four times.</p>
      </div>
      <div className="panel glass after">
        <h3>After</h3>
        <ol className="flow">
          <li>Phone order</li>
          <li className="key">Entered once</li>
        </ol>
        <ul className="flow-out">
          <li>Xero invoice</li>
          <li>Pick slip</li>
          <li>Stock updated</li>
        </ul>
        <p className="panel-sum">Same order, entered once.</p>
      </div>
    </div>
  )
}
