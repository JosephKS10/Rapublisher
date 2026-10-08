import { BookingForm } from '../components/BookingForm'
import { EmailLink, PageHead, Seo, TitleBlock } from '../components/ui'
import { site } from '../content/site'

export default function Contact() {
  return (
    <>
      <Seo
        title="Start a conversation | RaPublisher"
        description="Tell us about your business and what's getting in the way. If we're the right people to help, a Melbourne engineer will be in touch."
      />
      <PageHead
        crumbs={[{ to: '/contact', label: 'Contact' }]}
        tone={['pink', 'violet', 'cyan']}
        title="Start a conversation"
        lead="Tell us a little about your business and what's getting in the way. We take on only a few engagements at a time, so we read every enquiry properly before we reply."
      />
      <div className="wrap">
        <div className="sec grid contact">
          <BookingForm />
          <aside className="side-panel glass" aria-labelledby="what-next">
            <h2 id="what-next">What happens next</h2>
            <ol className="ruled">
              <li>Your message goes to our engineers, not a sales team.</li>
              <li>If we're the right people to help, one of us gets in touch to arrange a conversation.</li>
              <li>From there, we come and see the work for ourselves.</li>
            </ol>
            <TitleBlock cols={1} fields={[{ label: 'Email', value: <EmailLink /> }, { label: 'Service area', value: site.area }]} />
          </aside>
        </div>
      </div>
    </>
  )
}
