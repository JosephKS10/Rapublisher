import { Fragment, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { EmailLink, hasPhone, PhoneLink, track } from './ui'

// BookingForm (C9). Posts to Netlify Forms; the static twin in index.html lets Netlify detect the fields at deploy.
// Three steps styled after React Bits' Stepper, but every field stays in the form (hidden steps are only hidden),
// so the submission always carries all of them.
export const FORM_NAME = 'site-walk'

const MESSAGES: Record<string, string> = {
  name: 'Please enter your name.',
  business: 'Please enter your business name.',
  email: 'Please enter your email so we can reply.',
  team: 'Please choose your team size.',
  industry: 'Please choose your industry.',
  suburb: 'Please enter your suburb so we can plan the visit.',
  message: "Please tell us a little about what you'd like to fix.",
  consent: 'Please agree so we can use your details to reply.',
}

const opts = {
  role: ['Owner or director', 'General or operations manager', 'Finance', 'IT', 'Other'],
  team: ['1 to 9', '10 to 49', '50 to 199', '200 or more'],
  industry: ['Manufacturing', 'Wholesale or distribution', 'Cleaning, facilities or field services', 'Other'],
  systems: ['Xero', 'MYOB', 'Shopify', 'WooCommerce', 'Zoho', 'Spreadsheets', 'Something built for us', 'Other'],
  budget: ['Not sure yet', 'Under A$15,000', 'A$15,000 to A$50,000', 'A$50,000 to A$150,000', 'More than A$150,000'],
}

const STEPS = ['About you', 'Your business', 'What to fix']

type Status = { kind: 'idle' | 'sending' | 'error' } | { kind: 'sent'; first: string }
type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const invalidIn = (root: Element) =>
  [...root.querySelectorAll<Control>('input, select, textarea')].filter((el) => el.name && !el.validity.valid)

export function BookingForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [step, setStep] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)

  const check = (el: Control) =>
    setErrors((e) => {
      const { [el.name]: _, ...rest } = e
      return el.validity.valid ? rest : { ...rest, [el.name]: MESSAGES[el.name] ?? 'Please check this field.' }
    })

  const flag = (bad: Control[]) => {
    setErrors((e) => ({ ...e, ...Object.fromEntries(bad.map((el) => [el.name, MESSAGES[el.name] ?? 'Please check this field.'])) }))
    requestAnimationFrame(() => bad[0].focus())
  }

  function next() {
    const panel = formRef.current?.querySelector(`[data-step="${step}"]`)
    const bad = panel ? invalidIn(panel) : []
    if (bad.length) return flag(bad)
    setStep(step + 1)
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[data-step="${step + 1}"] input, [data-step="${step + 1}"] select, [data-step="${step + 1}"] textarea`)?.focus())
  }

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = ev.currentTarget
    const bad = invalidIn(form)
    if (bad.length) {
      const first = Number(bad[0].closest<HTMLElement>('[data-step]')?.dataset.step ?? step)
      setStep(first)
      return flag(bad)
    }
    const data = new FormData(form)
    data.set('consent_at', new Date().toISOString()) // consent timestamp stored with each enquiry (A3)
    data.set('systems', data.getAll('systems_option').join(', '))
    data.delete('systems_option')
    setStatus({ kind: 'sending' })
    track('form_submit')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus({ kind: 'sent', first: String(data.get('name')).trim().split(/\s+/)[0] })
      requestAnimationFrame(() => doneRef.current?.focus())
    } catch {
      setStatus({ kind: 'error' })
    }
  }

  if (status.kind === 'sent')
    return (
      <div className="form-status" role="status" tabIndex={-1} ref={doneRef}>
        <h2>Thanks, {status.first}.</h2>
        <p>
          We've got your message, and an engineer will reply within one business day to find a time.
          {hasPhone && <> If it's urgent, call <PhoneLink />.</>}
        </p>
      </div>
    )

  const err = (name: string) => (errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${name}-err` } : {})
  const Err = ({ name }: { name: string }) => (errors[name] ? <p className="err" id={`${name}-err`}>{errors[name]}</p> : null)
  const field = (name: string, extra = '') => ({ 'data-invalid': errors[name] ? '' : undefined, className: `field ${extra}`.trim() })
  const blur = { onBlur: (e: { target: Control }) => errors[e.target.name] !== undefined && check(e.target) }

  return (
    <form ref={formRef} name={FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" noValidate onSubmit={submit} className="stepper glass" aria-label="Book a site walk: three steps (about you, your business, the visit)">
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hp" aria-hidden="true">
        <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>

      <ol className="step-dots" aria-label="Form steps">
        {STEPS.map((label, i) => (
          <Fragment key={label}>
            {i > 0 && <li aria-hidden="true" className={`step-line${step >= i ? ' done' : ''}`}><i /></li>}
            <li className={`step-dot${i === step ? ' on' : i < step ? ' done' : ''}`} aria-current={i === step ? 'step' : undefined}>
              <span aria-hidden="true">{i + 1}</span>
              <span className="sr-only">Step {i + 1} of {STEPS.length}: {label}</span>
            </li>
          </Fragment>
        ))}
      </ol>

      <fieldset data-step="0" hidden={step !== 0} className="step-panel">
        <legend className="step-title">About you</legend>
        <div className="form">
          <div {...field('name')}>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" autoComplete="name" required {...err('name')} {...blur} />
            <Err name="name" />
          </div>
          <div {...field('business')}>
            <label htmlFor="business">Business name</label>
            <input id="business" name="business" autoComplete="organization" required {...err('business')} {...blur} />
            <Err name="business" />
          </div>
          <div {...field('email')}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required {...err('email')} {...blur} />
            <Err name="email" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone <span className="req">(optional)</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" aria-describedby="phone-hint" />
            <p className="hint" id="phone-hint">Easier to arrange a visit by phone?</p>
          </div>
          <div className="field full">
            <label htmlFor="role">Your role <span className="req">(optional)</span></label>
            <select id="role" name="role" defaultValue="">
              <option value="">Choose one</option>
              {opts.role.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset data-step="1" hidden={step !== 1} className="step-panel">
        <legend className="step-title">Your business</legend>
        <div className="form">
          <div {...field('team')}>
            <label htmlFor="team">Team size</label>
            <select id="team" name="team" required defaultValue="" {...err('team')} {...blur}>
              <option value="">Choose one</option>
              {opts.team.map((o) => <option key={o}>{o}</option>)}
            </select>
            <Err name="team" />
          </div>
          <div {...field('industry')}>
            <label htmlFor="industry">Industry</label>
            <select id="industry" name="industry" required defaultValue="" {...err('industry')} {...blur}>
              <option value="">Choose one</option>
              {opts.industry.map((o) => <option key={o}>{o}</option>)}
            </select>
            <Err name="industry" />
          </div>
          <div {...field('suburb')}>
            <label htmlFor="suburb">Suburb</label>
            <input id="suburb" name="suburb" autoComplete="address-level2" required aria-describedby="suburb-hint" {...err('suburb')} {...blur} />
            <p className="hint" id="suburb-hint">So we can plan the visit.</p>
            <Err name="suburb" />
          </div>
          <div className="field">
            <label htmlFor="budget">Budget in mind <span className="req">(optional)</span></label>
            <select id="budget" name="budget" defaultValue="Not sure yet">
              {opts.budget.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <fieldset className="field full">
            <legend>Systems you use today <span className="req">(optional)</span></legend>
            <div className="choices">
              {opts.systems.map((o) => (
                <label className="choice" key={o}><input type="checkbox" name="systems_option" value={o} />{o}</label>
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      <fieldset data-step="2" hidden={step !== 2} className="step-panel">
        <legend className="step-title">What to fix</legend>
        <div className="form">
          <div {...field('message', 'full')}>
            <label htmlFor="message">What would make your working day easier?</label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="For example: we retype every web order into Xero, and the stock never matches."
              {...err('message')}
              {...blur}
            />
            <Err name="message" />
          </div>
          <div className="field">
            <label htmlFor="heard">How did you hear about us? <span className="req">(optional)</span></label>
            <input id="heard" name="heard" aria-describedby="heard-hint" />
            <p className="hint" id="heard-hint">If someone referred you, we'd like to thank them.</p>
          </div>
          <div className="field">
            <label htmlFor="times">Best days or times for a visit <span className="req">(optional)</span></label>
            <input id="times" name="times" />
          </div>
          <div {...field('consent', 'full')}>
            <label className="choice consent">
              <input type="checkbox" name="consent" value="yes" required {...err('consent')} {...blur} />
              <span>
                I agree to RaPublisher using these details to respond to my enquiry, as set out in the <Link to="/privacy">privacy policy</Link>.
              </span>
            </label>
            <Err name="consent" />
          </div>
        </div>
      </fieldset>

      {status.kind === 'error' && (
        <div className="form-status error" role="alert">
          <p>Something went wrong and your message didn't send. Please try again, or email us at <EmailLink />.</p>
        </div>
      )}

      <div className="form-nav">
        {step > 0 ? <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button> : <span className="spacer" />}
        {step < STEPS.length - 1 ? (
          <button type="button" className="btn btn-primary" onClick={next} aria-label={`Next: step ${step + 2} of 3`}>Next</button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={status.kind === 'sending'}>
            {status.kind === 'sending' ? 'Sending' : 'Book a site walk'}
          </button>
        )}
      </div>
    </form>
  )
}
