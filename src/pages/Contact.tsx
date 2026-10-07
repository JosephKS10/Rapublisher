import { BookingForm } from '../components/BookingForm'
import { EmailLink, hasPhone, PageHead, PhoneLink, REVIEW, Seo, TitleBlock } from '../components/ui'
import { site } from '../content/site'

export default function Contact() {
  return (
    <>
      <Seo
        title="Book a site walk in Melbourne | RaPublisher"
        description="Book a free site walk with a Melbourne forward deployed engineer, or tell us what would make your working day easier."
      />
      <PageHead
        crumbs={[{ to: '/contact', label: 'Contact' }]}
        title="Book a site walk"
        lead="Tell us a little about your business and what's slowing it down. An engineer will reply within one business day [CONFIRM] to find a time."
      />
      <div className="wrap">
        <div className="sec grid contact">
          <BookingForm />
          <aside className="side-panel glass" aria-labelledby="talk-first">
            <h2 id="talk-first">{hasPhone ? 'Prefer to talk first? Call us.' : 'Prefer to talk first?'}</h2>
            <TitleBlock
              cols={1}
              fields={[
                { label: 'Email', value: <EmailLink /> },
                ...(hasPhone || REVIEW ? [{ label: 'Phone', value: <PhoneLink /> }] : []),
                { label: 'Hours', value: site.hours },
                { label: 'Service area', value: site.area },
              ]}
            />
          </aside>
        </div>
      </div>
    </>
  )
}
