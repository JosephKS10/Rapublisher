import { BookingForm } from '../components/BookingForm'
import { EmailLink, PageHead, Rich, Seo, TitleBlock } from '../components/ui'
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
        lead="Tell us a little about your business and what's getting in the way. Ramin and Joseph read every enquiry themselves. [CONFIRM] We work with businesses across metro Melbourne, and regional Victoria by arrangement."
      />
      <div className="wrap">
        <div className="sec grid contact">
          <BookingForm />
          <aside className="side-panel glass" aria-labelledby="what-next">
            <h2 id="what-next">What happens next</h2>
            <ol className="ruled">
              <li><Rich text="Your message goes to our engineers, not a sales team. [CONFIRM]" /></li>
              <li>There are two of us and we do the work ourselves, so we work with a small number of businesses at a time.</li>
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
