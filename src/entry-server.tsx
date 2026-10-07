// Build-time renderer used by scripts/prerender.js. Never shipped to the browser.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { industries } from './content/industries'
import { publishedInsights } from './content/insights'
import { services } from './content/services'
import { published } from './content/work'
import { routes } from './routes'

export const paths = [
  '/', '/how-we-work', '/services', '/industries', '/work', '/about', '/pricing', '/insights', '/contact', '/privacy', '/terms', '/accessibility',
  ...services.map((s) => `/services/${s.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
  ...published.map((w) => `/work/${w.slug}`),
  ...publishedInsights.map((i) => `/insights/${i.slug}`),
]

// Pages with a real date. The sitemap gives lastmod only for these: a build date on every URL teaches crawlers to ignore it.
export const lastmods: Record<string, string> = Object.fromEntries(publishedInsights.map((i) => [`/insights/${i.slug}`, i.date]))

export async function render(path: string) {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`https://rapublisher.com.au${path}`))
  if (context instanceof Response) throw new Error(`Unexpected response for ${path}`)
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  )
}
