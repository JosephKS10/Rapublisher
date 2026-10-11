import { Link } from 'react-router'
import { PageHead, Seo } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <Seo notFound og="home" title="Page not found | RaPublisher" description="This page isn't here. Head back to the home page, or tell us what you were looking for." />
      <PageHead
        title="This page isn't here."
        lead="It may have moved, or the link might be wrong. Head back to the home page, or tell us what you were looking for."
      >
        <div className="actions mt-2">
          <Link to="/" className="btn btn-primary">Go to the home page</Link>
          <Link to="/contact" className="btn btn-secondary">Contact us</Link>
        </div>
      </PageHead>
    </>
  )
}
