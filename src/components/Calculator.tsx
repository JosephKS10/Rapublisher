import { useRef, useState, type CSSProperties } from 'react'
import CountUp from './bits/CountUp'
import { BookButton, Rich, filled, track } from './ui'

// DoubleHandlingCalculator (A5). Yearly cost = people x (minutes / 60) x hourly cost x days.
export const yearlyCost = (people: number, minutes: number, hourly: number, days: number) => people * (minutes / 60) * hourly * days

const aud = (n: number) => `A$${Math.round(n).toLocaleString('en-AU')}`

const FIELDS = [
  { key: 'people', label: 'People who retype or reconcile data', min: 1, max: 50, step: 1, show: (n: number) => String(n), hint: '' },
  { key: 'minutes', label: 'Minutes a day, each', min: 5, max: 240, step: 5, show: (n: number) => `${n} min`, hint: '' },
  { key: 'hourly', label: 'Hourly cost including on-costs', min: 30, max: 150, step: 1, show: aud, hint: 'Default A$45 [DECISION]' },
  { key: 'days', label: 'Working days a year', min: 100, max: 260, step: 5, show: (n: number) => String(n), hint: '' },
] as const

type Key = (typeof FIELDS)[number]['key']

export function Calculator() {
  const [v, setV] = useState<Record<Key, number>>({ people: 3, minutes: 30, hourly: 45, days: 230 })
  const used = useRef(false)
  const total = yearlyCost(v.people, v.minutes, v.hourly, v.days)

  return (
    <div className="calc glass" data-reveal>
      <div className="calc-inputs">
        {FIELDS.map((f) => (
          <div className="range" key={f.key}>
            <div className="range-head">
              <label htmlFor={`calc-${f.key}`}>{f.label}</label>
              <output htmlFor={`calc-${f.key}`}>{f.show(v[f.key])}</output>
            </div>
            <input
              id={`calc-${f.key}`}
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.key]}
              aria-valuetext={f.show(v[f.key])}
              style={{ '--p': `${((v[f.key] - f.min) / (f.max - f.min)) * 100}%` } as CSSProperties}
              onChange={(e) => {
                setV({ ...v, [f.key]: Number(e.target.value) })
                if (!used.current) {
                  used.current = true
                  track('calculator_used')
                }
              }}
            />
            {f.hint && filled(f.hint) && <p className="hint"><Rich text={f.hint} /></p>}
          </div>
        ))}
      </div>
      <div className="calc-result">
        <p>That's roughly</p>
        {/* React Bits CountUp: the total rolls to each new value */}
        <output className="big">A$<CountUp to={Math.round(total)} from={Math.round(total)} separator="," duration={0.5} /></output>
        <p>a year spent on double handling.</p>
        <p className="formula">
          {v.people} people × ({v.minutes} ÷ 60) hours × {aud(v.hourly)} × {v.days} days
        </p>
        <p className="small">A rough estimate, not a quote. Errors, rework and late deliveries come on top.</p>
        <p>Want to check the number?</p>
        <div><BookButton /></div>
      </div>
    </div>
  )
}
