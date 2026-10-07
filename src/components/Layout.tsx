import { useRef } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router'
import { footerLinks, nav, site } from '../content/site'
import { Brand } from './Logo'
import { BookButton, EmailLink, hasPhone, JsonLd, PhoneLink, Rich } from './ui'

function Header() {
  const menu = useRef<HTMLDialogElement>(null)
  const close = () => menu.current?.close()
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="bar">
          <Brand withDescriptor />
          <nav className="nav" aria-label="Main">
            {nav.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
          </nav>
          <BookButton className="btn btn-primary btn-sm header-cta" />
          <button className="btn btn-ghost btn-sm menu-btn" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}>
            Menu
          </button>
        </div>
      </div>
      {/* Native dialog: focus trap, Escape to close and inert background for free */}
      <dialog ref={menu} className="menu" aria-label="Menu" onClick={(e) => (e.target as HTMLElement).closest('a') && close()}>
        <div className="menu-layers" aria-hidden="true"><i /><i /></div>
        <div className="wrap">
          <div className="menu-top">
            <Brand />
            <button className="btn btn-ghost btn-sm" onClick={close}>Close</button>
          </div>
          <nav aria-label="Main">
            <NavLink to="/" end>Home</NavLink>
            {nav.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <BookButton />
        </div>
      </dialog>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid footer-grid">
          <div className="stack">
            <Brand />
            <p className="footer-line">{site.line}</p>
            <p>{site.descriptor}</p>
          </div>
          <div className="stack">
            <h2>Contact</h2>
            <p><EmailLink />{hasPhone && <><br /><PhoneLink /></>}</p>
            <p>{site.area}</p>
            <p><Rich text={site.hours} /></p>
          </div>
          <nav aria-label="Footer">
            <h2>Pages</h2>
            <ul className="footer-links">
              {footerLinks.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </nav>
        </div>
        <div className="footer-legal">
          <p>{site.acknowledgement}</p>
          <p><Rich text={site.legal} /> {site.copyright}</p>
        </div>
      </div>
      <p className="footer-mark" aria-hidden="true">RaPublisher</p>
    </footer>
  )
}

// Organization and ProfessionalService structured data (A3).
const org = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  name: 'RaPublisher',
  legalName: 'RA PUBLISHER PTY LTD',
  url: site.url,
  email: site.email,
  slogan: site.line,
  description: site.defaultDescription,
  areaServed: [{ '@type': 'City', name: 'Melbourne' }, { '@type': 'State', name: 'Victoria' }, { '@type': 'Country', name: 'Australia' }],
  address: { '@type': 'PostalAddress', addressRegion: 'VIC', postalCode: '3166', addressCountry: 'AU' },
  founder: [{ '@type': 'Person', name: 'Ramin Shirzad' }, { '@type': 'Person', name: 'Joseph Saji' }],
}

export function Layout() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <JsonLd data={org} />
      <ScrollRestoration />
    </>
  )
}
