import { Fragment, useState, type CSSProperties, type PointerEvent } from 'react'
import { Link } from 'react-router'
import { ArrowRightIcon, CheckIcon } from '@phosphor-icons/react'
import { industries } from '../content/industries'
import { getService } from '../content/services'
import { care, ladder, problems, team } from '../content/site'
import { clientLabel, getWork, verifiedOutcomes, type Shot, type Work } from '../content/work'
import { Iso, neonOf } from './Iso'
import { Live } from './Live'
import { Mark } from './Logo'
import { neon, token } from './palette'
import { useTheme } from './theme'
import { BookButton, filled, Rich, slug, TitleBlock, type Field } from './ui'


export function CtaBand() {
  const light = useTheme() === 'light' // also re-renders this on a theme change, so the colours below are re-read
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      {/* React Bits ShapeWaves (WebGPU): a field of shapes that swell along rolling waves and light up under the pointer */}
      <Live
        gpu
        className="cta-waves"
        load={() => import('./bits/ShapeWaves')}
        props={{ color: light ? '#5a5f69' : '#8f9399', hoverColor: neon('pink', true), backgroundColor: token('--bg', '#07080a'), cellSize: 14, dotSize: 0.7, speed: 0.6, brightness: light ? 0.5 : 0.34, contrast: 1.1, fade: 0.3, glow: 0.5, splashRadius: 60, splashStrength: 0.5 }}
        poster={<span />}
      />
      <div className="wrap">
        <div data-reveal>
          <h2 id="cta-title">Tell us what would make your working day easier.</h2>
          <p>Our engineers do the work themselves, so we take on only a few engagements at a time. Tell us about your business, and if we're the right people to help, we'll come and see the work for ourselves.</p>
          <div className="actions">
            <BookButton />
          </div>
        </div>
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

// Six services in a bento grid; operations software and field apps take the two large cells.
const BENTO_ORDER = ['integrations', 'ai-in-operations', 'operations-software', 'field-and-floor-apps', 'rescue', 'run-and-improve']

// The glow follows the pointer: each card gets the pointer's position in its own coordinates, so the card under it
// lights up and its neighbours catch the edge of the light.
const followPointer = (e: PointerEvent<HTMLElement>) => {
  for (const card of e.currentTarget.children as HTMLCollectionOf<HTMLElement>) {
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
}

export function ServiceBento() {
  return (
    <div className="bento glow-group" data-reveal onPointerMove={followPointer}>
      {BENTO_ORDER.map(getService).filter((s) => !!s).map((s) => {
        const big = s.slug === 'operations-software' || s.slug === 'field-and-floor-apps'
        return (
          <article key={s.slug} className="bento-card glow-card" style={neonOf(s.slug)}>
            <div className={`svc${big ? ' big' : ''}`}>
              <Iso name={s.slug} className="svc-fig" />
              <div>
                <h3><Link to={`/services/${s.slug}`}>{s.title}</Link></h3>
                <p><Rich text={s.summary} /></p>
                <span className="go" aria-hidden="true">Learn more <ArrowRightIcon /></span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export function IndustryPanels() {
  return (
    <div className="acc glow-group" data-reveal onPointerMove={followPointer}>
      {industries.map((ind) => {
        return (
          <Link key={ind.slug} to={`/industries/${ind.slug}`} className="glow-card" style={neonOf(ind.slug)}>
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

// eager: above the fold. priority: the one image that is the page's largest paint.
export const Img = ({ s, sizes = '(min-width: 960px) 40vw, 90vw', eager, priority }: { s: Shot; sizes?: string; eager?: boolean; priority?: boolean }) => (
  <img
    src={s.src}
    srcSet={s.small ? `${s.small} ${s.small.match(/-(\d+)\.webp$/)?.[1]}w, ${s.src} ${s.w}w` : undefined}
    sizes={sizes}
    width={s.w}
    height={s.h}
    alt={s.alt}
    loading={eager ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined}
    decoding="async"
  />
)

// A phone screenshot in an iPhone 17 Pro style body: orange unless the project asks for another colour (`tone`). The screen is a fixed shape with a white ground, so a short
// screenshot sits at the top and the rest of the screen stays white.
export const Phone = ({ s, sizes = '14rem', eager, priority, tone }: { s: Shot; sizes?: string; eager?: boolean; priority?: boolean; tone?: Work['phone'] }) => (
  <div className="iphone" data-tone={tone}>
    <div className="iphone-body">
      <div className="iphone-screen"><Img s={s} sizes={sizes} eager={eager} priority={priority} /></div>
    </div>
  </div>
)

// A desktop screenshot filling an iPad's screen. The screenshot is wider than the screen, so it is scaled to the
// screen's height and the sides are trimmed (never stretched); `focus` on the shot says which part to keep.
export const Tablet = ({ s, sizes = '(min-width: 960px) 58rem, 115vw' }: { s: Shot; sizes?: string }) => (
  <div className="ipad">
    <div className="ipad-body">
      <div className="ipad-screen" style={s.focus ? ({ '--focus': s.focus } as CSSProperties) : undefined}>
        <Img s={s} sizes={sizes} />
      </div>
    </div>
  </div>
)

// A project on its devices: an iPad for a desktop system, three phones for a mobile app.
export function DeviceStage({ w, active = true }: { w: Work; active?: boolean }) {
  const mobile = !!w.images[0]?.mobile
  const shots = mobile ? w.images.filter((s) => s.mobile).slice(0, 3) : w.images.slice(0, 1)
  return (
    <div className={`work-view ${mobile ? 'mob' : 'desk'}`} data-active={active || undefined}>
      {shots.map((s) => (mobile ? <Phone key={s.src} s={s} tone={w.phone} /> : <Tablet key={s.src} s={s} />))}
    </div>
  )
}

// Real screens as the cover: one desktop shot, or three phone screens side by side.
function Cover({ w }: { w: Work }) {
  const first = w.images[0]
  if (!first) return <div className="case-cover" />
  if (first.mobile) {
    return <div className="case-cover mob">{w.images.filter((i) => i.mobile).slice(0, 3).map((s) => <Phone key={s.src} s={s} sizes="15vw" tone={w.phone} />)}</div>
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

export const hasWork = (slugs: string[]) => slugs.some((s) => !!getWork(s))

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
              <b>{w.title}</b>{' '}
              <span><Rich text={clientLabel(w)} />, led by <Rich text={w.ledBy.join(', ')} /></span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="work-stage" aria-hidden="true">
        {items.map((w, i) => <DeviceStage key={w.slug} w={w} active={i === active} />)}
      </div>
    </div>
  )
}

// How an engagement comes together, as a staircase: each plate stands a little taller than the last. A true
// sequence, so it is numbered. No prices: see content/site.ts.
export function PricingLadder() {
  return (
    <ol className="rungs" data-reveal>
      {ladder.map((r, i) => (
        <li key={r.step} className="glass" style={{ '--n': i } as CSSProperties}>
          <span className="rung-n" aria-hidden="true">{i + 1}</span>
          <h3>{r.step}</h3>
          <p><Rich text={r.gets} /></p>
        </li>
      ))}
    </ol>
  )
}

export function Care() {
  return (
    <ul className="clauses" data-reveal>
      {care.map((c) => (
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
        <article id={slug(m.name)} className={`person${m.photo ? '' : ' no-photo'}`} key={m.name} data-reveal>
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
// (`:has(input:checked ~ input:checked)`), so the inputs stay siblings and no JavaScript is needed. Each box sits in
// the same grid cell as its label, invisible but in place: a box parked elsewhere pulls the page to it on focus.
export function ProblemList() {
  return (
    <div className="self-check grid">
      <div className="sc-head">
        <h2 id="sound-familiar">Sound familiar?</h2>
        <p className="lead">Tick the ones that sound like your week.</p>
      </div>
      <div className="tiles" role="group" aria-labelledby="sound-familiar">
        {problems.map((p, i) => {
          // Box and label share one grid cell (two columns on wide screens, an odd last one spans both)
          const spans = i === problems.length - 1 && problems.length % 2 === 1
          const cell = { '--k': i + 1, '--row': Math.floor(i / 2) + 1, '--col': spans ? '1 / -1' : (i % 2) + 1 } as CSSProperties
          return (
            <Fragment key={p}>
              <input type="checkbox" id={`problem-${i}`} style={cell} />
              <label htmlFor={`problem-${i}`} style={cell}><span>{p}</span></label>
            </Fragment>
          )
        })}
      </div>
      <div className="sc-verdict">
        <p className="hits" aria-hidden="true">of {problems.length} sound like your week</p>
        <p className="verdict">If two or more of these sound like your week, it's worth a conversation.</p>
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
