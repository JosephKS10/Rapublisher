// The mark: a Fibonacci rectangle (squares 5, 3, 2, 1, 1 tiling an 8 by 5 golden rectangle) with its spiral.
// The smallest square, where the spiral ends, is the accent: the site walk. Each step after it builds on the last.
import { useId, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { cleanText } from '../content/markers'
import { processSteps, site } from '../content/site'

const GRID = 'M0 0H8V5H0Z M5 0V5 M5 3H8 M6 3V5 M5 4H6'
// The spiral stops where it meets the last unit square, which is solid accent.
const SPIRAL = 'M0 5A5 5 0 0 1 5 0A3 3 0 0 1 8 3A2 2 0 0 1 6 5A1 1 0 0 1 5 4'
// The same spiral drawn outward, from the site walk to run and improve, for the animated drawing.
const OUTWARD = 'M5 4A1 1 0 0 0 6 5A2 2 0 0 0 8 3A3 3 0 0 0 5 0A5 5 0 0 0 0 5'

export function Mark({ className, line }: { className?: string; line?: boolean }) {
  // line: big decorative drawing with hairline strokes that don't scale with size
  const vfx = line ? 'non-scaling-stroke' : undefined
  const clip = useId()
  return (
    <svg viewBox="-0.3 -0.3 8.6 5.6" className={className} aria-hidden="true" focusable="false">
      <clipPath id={clip}><rect width="8" height="5" /></clipPath>
      {!line && <rect x="5" y="3" width="1" height="1" fill="var(--accent)" />}
      <path d={GRID} fill="none" stroke="currentColor" strokeWidth={line ? 1 : 0.2} vectorEffect={vfx} />
      <path d={SPIRAL} fill="none" stroke="currentColor" strokeWidth={line ? 2 : 0.44} vectorEffect={vfx} clipPath={`url(#${clip})`} />
    </svg>
  )
}

export function Brand({ withDescriptor }: { withDescriptor?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="RaPublisher home">
      <Mark className="brand-mark" />
      <span className="brand-name">RaPublisher</span>
      {withDescriptor && <span className="brand-desc">{site.descriptor.replace(/\.$/, '')}</span>}
    </Link>
  )
}

// Five squares, smallest first, in the same order as the five process steps.
const SQUARES = [
  { x: 5, y: 3, s: 1 },
  { x: 5, y: 4, s: 1 },
  { x: 6, y: 3, s: 2 },
  { x: 5, y: 0, s: 3 },
  { x: 0, y: 0, s: 5 },
]

// The mark at drawing scale, each square labelled with its step. `active` lights one square (How we work).
export function ProcessDrawing({ active, animate, caption }: { active?: number; animate?: boolean; caption?: boolean }) {
  return (
    <figure className={`pd${animate ? ' pd-anim' : ''}`} aria-label="Five steps, each square bigger than the last, starting from a free site walk">
      <div className="pd-sheet">
        <svg viewBox="0 0 8 5" aria-hidden="true" focusable="false">
          {SQUARES.map((q, i) => (
            <rect key={i} className={`pd-hl${active === i ? ' on' : ''}`} x={q.x} y={q.y} width={q.s} height={q.s} />
          ))}
          <rect className="pd-start" x="5" y="3" width="1" height="1" style={{ '--i': 0 } as CSSProperties} />
          <path className="pd-grid" d={GRID} />
          <path className="pd-spiral" d={OUTWARD} pathLength={1} />
        </svg>
        {SQUARES.map((q, i) => (
          <div
            key={i}
            className={`pd-label${i === 0 ? ' start' : ''}`}
            data-s={q.s}
            aria-hidden="true"
            style={{ left: `${(q.x / 8) * 100}%`, top: `${(q.y / 5) * 100}%`, width: `${(q.s / 8) * 100}%`, height: `${(q.s / 5) * 100}%`, '--i': i } as CSSProperties}
          >
            <b>{processSteps[i].title}</b>{' '}
            <span>{cleanText(processSteps[i].meta).split('. ')[0].replace(/\.$/, '')}</span>
          </div>
        ))}
      </div>
      {caption && (
        <dl className="pd-caption">
          <div><dt>Drawing</dt><dd>How every engagement grows</dd></div>
          <div><dt>Start</dt><dd>A free site walk</dd></div>
          <div><dt>Rule</dt><dd>Each step is useful on its own</dd></div>
        </dl>
      )}
    </figure>
  )
}
