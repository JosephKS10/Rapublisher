import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@fontsource-variable/mona-sans/wdth.css'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './styles/tokens.css'
import './styles/site.css'
import { routes } from './routes'

// Every full page load shares React Router's 'default' scroll key, so a fresh visit would restore the last page's
// position. Keep restoration for reload and back/forward only.
const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
if (nav?.type === 'navigate') {
  try {
    sessionStorage.removeItem('react-router-scroll-positions')
  } catch {
    // storage blocked: nothing to clear
  }
}

const app = (
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>
)
// Pages are prerendered at build time (scripts/prerender.js) and record their path. Hydrate when the HTML was
// rendered for this URL (or is the 404 page, which renders the same for any unknown path); otherwise, such as a
// host serving index.html as a fallback, render fresh. Dev has an empty root.
const root = document.getElementById('root')!
const built = root.dataset.path
if (root.hasChildNodes() && (built === location.pathname.replace(/(.)\/$/, '$1') || built === '/404')) hydrateRoot(root, app)
else {
  // Drop head tags prerendered for another page; React adds this page's own.
  document.head
    .querySelectorAll('title, meta[name="description"], link[rel="canonical"], meta[property="og:title"], meta[property="og:description"], meta[property="og:url"]')
    .forEach((el) => el.remove())
  createRoot(root).render(app)
}
