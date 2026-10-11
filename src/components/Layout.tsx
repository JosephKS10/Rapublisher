import { useRef, useState } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router'
import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { footerLinks, nav, site } from '../content/site'
import { Brand } from './Logo'
import { setTheme, useTheme } from './theme'
import { BookButton, EmailLink, hasPhone, JsonLd, ORG_ID, personId, PhoneLink, Rich, SITE_ID } from './ui'

function ThemeSwitch() {
  const next = useTheme() === 'light' ? 'dark' : 'light'
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm theme-btn"
      aria-label={`Switch to ${next} mode`}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setTheme(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
      }}
    >
      {next === 'light' ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
    </button>
  )
}

function Header() {
  const menu = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const close = () => menu.current?.close()
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="bar">
          <Brand withDescriptor />
          <nav className="nav" aria-label="Main">
            {nav.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
          </nav>
          <ThemeSwitch />
          <BookButton className="btn btn-primary btn-sm header-cta" />
          <button className="btn btn-ghost btn-sm menu-btn" aria-haspopup="dialog" aria-expanded={open} onClick={() => { menu.current?.showModal(); setOpen(true) }}>
            Menu
          </button>
        </div>
      </div>
      {/* Native dialog: focus trap, Escape to close and inert background for free */}
      <dialog ref={menu} className="menu" aria-label="Menu" onClose={() => setOpen(false)} onClick={(e) => (e.target as HTMLElement).closest('a') && close()}>
        <div className="menu-layers" aria-hidden="true"><i /><i /></div>
        <div className="wrap">
          <div className="menu-top">
            <Brand />
            <button className="btn btn-ghost btn-sm" onClick={close}>Close</button>
          </div>
          <nav aria-label="Menu">
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

// Site-wide structured data (A3): the organisation and the website, as one graph. Pages link to these by @id.
// Only confirmed facts: no phone, street address, hours or profiles until the owners supply them.
const org = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORG_ID,
      name: 'RaPublisher',
      legalName: 'RA PUBLISHER PTY LTD',
      identifier: { '@type': 'PropertyValue', propertyID: 'ACN', value: '643 002 279' },
      url: site.url,
      logo: `${site.url}/logo.png`,
      image: `${site.url}/og/home.jpg`,
      email: site.email,
      slogan: site.line,
      description: site.defaultDescription,
      areaServed: [{ '@type': 'City', name: 'Melbourne' }, { '@type': 'State', name: 'Victoria' }],
      address: { '@type': 'PostalAddress', addressRegion: 'VIC', postalCode: '3166', addressCountry: 'AU' },
      founder: ['Ramin Shirzad', 'Joseph Saji'].map((name) => ({ '@type': 'Person', '@id': personId(name), name })),
    },
    { '@type': 'WebSite', '@id': SITE_ID, url: site.url, name: 'RaPublisher', inLanguage: 'en-AU', publisher: { '@id': ORG_ID } },
  ],
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
