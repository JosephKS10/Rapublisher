import { EmailLink, filled, PageHead, Rich, Seo } from '../components/ui'
import { site } from '../content/site'

// Legal pages (C12). Outlines only: a lawyer drafts and reviews the privacy policy and terms before launch.
function Legal({ title, description, lead, sections }: { title: string; description: string; lead: string; sections: [string, string][] }) {
  const ready = sections.filter(([, body]) => filled(body))
  return (
    <>
      <Seo title={`${title} | RaPublisher`} description={description} />
      <PageHead title={title} lead={lead} />
      <div className="wrap pad-b">
        <div className="prose">
          {ready.length ? (
            ready.map(([h, body]) => (
              <section key={h}>
                <h2>{h}</h2>
                <p><Rich text={body} /></p>
              </section>
            ))
          ) : (
            <div className="empty"><p>We're finalising this page. If you have a question in the meantime, email <EmailLink />.</p></div>
          )}
          <p className="note"><Rich text={site.legal} /></p>
        </div>
      </div>
    </>
  )
}

export const Privacy = () => (
  <Legal
    title="Privacy policy"
    description="How RaPublisher collects, uses, stores and shares personal information, and how to access, correct or complain about it."
    lead="[TODO: lawyer to draft and review before launch. Date the policy and review it every six months.]"
    sections={[
      ['Who we are', 'RA PUBLISHER PTY LTD, ACN 643 002 279. ABN [TODO]. Contact: ' + site.email + '.'],
      ['What we collect', 'Enquiry and booking details you send us, emails, and website analytics collected without cookies. [TODO]'],
      ['Why we collect it', '[TODO]'],
      ['Who we share it with', '[TODO: hosting, email, booking and CRM providers, listed by type]'],
      ['Overseas disclosure', '[TODO: countries where providers or people may store or access information, matching where the engineering happens (B5)]'],
      ['How long we keep it', '[TODO]'],
      ['Security', '[TODO]'],
      ['Accessing or correcting your information', '[TODO]'],
      ['Complaints', '[TODO: how to complain to us, and the Office of the Australian Information Commissioner (OAIC) as the next step]'],
    ]}
  />
)

export const Terms = () => (
  <Legal
    title="Website terms"
    description="Terms for using the RaPublisher website. Client work runs under separate signed agreements."
    lead="These are website terms only. Client work runs under separate signed agreements. [TODO: lawyer to draft]"
    sections={[
      ['Using this site', '[TODO]'],
      ['General information, not advice', 'Information on this site is general in nature and is not legal, tax or other professional advice. [TODO]'],
      ['Intellectual property', '[TODO: intellectual property in site content]'],
      ['Links to other sites', '[TODO]'],
      ['Limitation of liability', '[TODO: to the extent the law allows]'],
      ['Governing law', 'These terms are governed by the laws of Victoria, Australia. [CONFIRM]'],
    ]}
  />
)

export function Accessibility() {
  return (
    <>
      <Legal
        title="Accessibility"
        description="RaPublisher aims to meet WCAG 2.2 level AA. How to tell us if something on this site is hard to use."
        lead="We want everyone to be able to use this site, including people who use a keyboard, a screen reader or zoom."
        sections={[
          ['Our target', 'We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.'],
          ['What we have tested', '[TODO: keyboard-only and screen reader passes (VoiceOver and NVDA) on Home and Contact, with dates]'],
          ['Known issues', '[TODO]'],
        ]}
      />
      <div className="wrap pad-b">
        <h2>Having trouble?</h2>
        <p className="mt-2">Email <EmailLink /> and tell us what happened. We'll reply within one business day. <Rich text="[CONFIRM]" /></p>
      </div>
    </>
  )
}
