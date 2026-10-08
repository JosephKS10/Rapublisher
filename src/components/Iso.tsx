import type { CSSProperties } from 'react'
import type { Neon, Tone } from './palette'

// Isometric hairline figures, one per service and industry. Each is a list of boxes [x, y, z, w, d, h] in grid units
// (x runs down-right, y down-left, z up). Boxes are drawn far to near, with solid faces, so nearer boxes cover the
// lines behind them.
type Box = [number, number, number, number, number, number]

const FIGURES: Record<string, Box[]> = {
  // One platform, several modules
  'operations-software': [[0, 0, 0, 5, 5, 0.3], [0.5, 0.5, 0.3, 1.6, 1.6, 1.4], [2.9, 0.5, 0.3, 1.6, 1.6, 0.8], [0.5, 2.9, 0.3, 1.6, 1.6, 0.6], [2.9, 2.9, 0.3, 1.6, 1.6, 2]],
  // Two systems and the bridge between them
  integrations: [[0, 0, 0, 2, 2, 1.6], [2, 0.7, 0.6, 2, 0.6, 0.4], [4, 0, 0, 2, 2, 1.6]],
  // Loose sheets in, a sorted pile out
  'ai-in-operations': [[0, 0, 0, 2.2, 0.12, 2.6], [0, 0.7, 0, 2.2, 0.12, 2.6], [0, 1.4, 0, 2.2, 0.12, 2.6], [0, 2.1, 0, 2.2, 0.12, 2.6], [3.2, 0.5, 0, 1.8, 1.8, 0.25], [3.2, 0.5, 0.35, 1.8, 1.8, 0.25], [3.2, 0.5, 0.7, 1.8, 1.8, 0.25]],
  // A phone standing among the sites it serves
  'field-and-floor-apps': [[0, 0, 0, 4.5, 4.5, 0.2], [0.4, 0.4, 0.2, 1.4, 1.4, 1], [0.4, 2.6, 0.2, 1.4, 1.4, 0.6], [2.8, 1.2, 0.2, 0.3, 2, 3.2]],
  // Four blocks, the last one being set back in place
  rescue: [[0, 0, 0, 1.8, 1.8, 1.2], [2, 0, 0, 1.8, 1.8, 1.2], [0, 2, 0, 1.8, 1.8, 1.2], [2, 2, 1.4, 1.8, 1.8, 1.2]],
  // Steps, each higher than the last
  'run-and-improve': [[0, 0, 0, 1.2, 3, 0.5], [1.2, 0, 0, 1.2, 3, 1], [2.4, 0, 0, 1.2, 3, 1.5], [3.6, 0, 0, 1.2, 3, 2.5], [4.8, 0, 0, 1.2, 3, 4]],
  // A plant: hall, two tanks, an annex
  manufacturing: [[0, 0, 0, 4, 3, 1.6], [0.4, 0.4, 1.6, 0.8, 0.8, 1.8], [1.6, 0.4, 1.6, 0.8, 0.8, 1.1], [4, 0.6, 0, 1.6, 2.4, 0.9]],
  // Pallets stacked to different heights
  'wholesale-distribution': [[0, 0, 0, 1.3, 1.3, 2], [1.6, 0, 0, 1.3, 1.3, 1], [3.2, 0, 0, 1.3, 1.3, 3], [0, 1.6, 0, 1.3, 1.3, 1], [1.6, 1.6, 0, 1.3, 1.3, 2], [3.2, 1.6, 0, 1.3, 1.3, 1]],
  // Separate buildings, one team
  'multi-site-services': [[0, 0, 0, 1.4, 1.4, 2.4], [2.4, 0.3, 0, 1.6, 1.2, 1.2], [0.6, 2.6, 0, 1.2, 1.6, 1.6], [4.8, 1.2, 0, 1, 1, 0.8], [3, 2.6, 0, 1.4, 1.4, 3]],
}

// The neon each service and industry owns, wherever it appears: its card, its figure, its page head.
const NEON: Record<string, Neon> = {
  'operations-software': 'violet',
  integrations: 'cyan',
  'ai-in-operations': 'pink',
  'field-and-floor-apps': 'lime',
  rescue: 'orange',
  'run-and-improve': 'rose',
  manufacturing: 'orange',
  'wholesale-distribution': 'cyan',
  'multi-site-services': 'lime',
}
// A page head's waves for a service or industry: its own neon, between its two neighbours on the colour ring.
const RING: Neon[] = ['cyan', 'violet', 'pink', 'rose', 'orange', 'lime']
export const toneOf = (name: string): Tone => {
  const i = RING.indexOf(NEON[name] ?? 'violet')
  return [RING[(i + 5) % 6], RING[i], RING[(i + 1) % 6]]
}
export const neonOf = (name: string) => ({ '--neon': `var(--n-${NEON[name] ?? 'violet'})` }) as CSSProperties

const C = Math.cos(Math.PI / 6)
const pt = (x: number, y: number, z: number): [number, number] => [(x - y) * C, (x + y) / 2 - z]

// The three faces you can see from the front: top, right (the x + w side) and left (the y + d side).
function faces([x, y, z, w, d, h]: Box) {
  const X = x + w
  const Y = y + d
  const Z = z + h
  return {
    t: [pt(x, y, Z), pt(X, y, Z), pt(X, Y, Z), pt(x, Y, Z)],
    r: [pt(X, y, Z), pt(X, Y, Z), pt(X, Y, z), pt(X, y, z)],
    l: [pt(x, Y, Z), pt(X, Y, Z), pt(X, Y, z), pt(x, Y, z)],
  }
}

const n = (v: number) => +v.toFixed(3)
const path = (q: [number, number][]) => 'M' + q.map(([a, b]) => `${n(a)} ${n(b)}`).join('L') + 'Z'

export function Iso({ name, className = '' }: { name: string; className?: string }) {
  const boxes = FIGURES[name]
  if (!boxes) return null
  const drawn = [...boxes].sort((a, b) => a[0] + a[1] - (b[0] + b[1]) || a[2] - b[2]).map(faces)
  const all = drawn.flatMap((f) => [...f.t, ...f.r, ...f.l])
  const xs = all.map((q) => q[0])
  const ys = all.map((q) => q[1])
  const pad = 0.1
  const box = [Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) - Math.min(...xs) + 2 * pad, Math.max(...ys) - Math.min(...ys) + 2 * pad]
  return (
    <svg className={`iso ${className}`} viewBox={box.map(n).join(' ')} aria-hidden="true" focusable="false">
      {drawn.map((f, i) => (
        <g key={i}>
          <path className="iso-l" d={path(f.l)} />
          <path className="iso-r" d={path(f.r)} />
          <path className="iso-t" d={path(f.t)} />
        </g>
      ))}
    </svg>
  )
}
