// Renders every route to static HTML after `vite build` (A2: static first). Also writes 404.html and sitemap.xml.
import { readFile, readdir, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname } from 'node:path'

const { render, paths, lastmods } = await import('../dist-ssr/entry-server.js')
// Preload the two fonts every first view needs (display and body, latin), so text paints in its final face sooner.
const assets = await readdir('dist/assets')
const fonts = ['mona-sans-latin-wdth-normal', 'geist-latin-wght-normal'].map((n) => assets.find((f) => f.startsWith(n) && f.endsWith('.woff2'))).filter(Boolean)
const template = (await readFile('dist/index.html', 'utf8')).replace(
  '</head>',
  fonts.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`).join('') + '</head>',
)
const SITE = 'https://rapublisher.com.au'

// React 19 emits <title>, <meta> and <link> first when there's no <head> in the tree; move them into the real head.
const HOISTED = /^(?:<title>[^<]*<\/title>|<meta [^>]*\/>|<link [^>]*\/>)+/

async function page(path, file) {
  const html = await render(path)
  const head = html.match(HOISTED)?.[0] ?? ''
  const out = template
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root" data-path="${path}">${html.slice(head.length)}</div>`)
  if (!head.includes('<title>')) throw new Error(`No title on ${path}`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, out)
}

for (const path of paths) await page(path, path === '/' ? 'dist/index.html' : `dist${path}.html`)
await page('/404', 'dist/404.html')

// Review builds (VITE_REVIEW=1, used for Netlify previews) show [TODO] markers: keep them out of search.
if (process.env.VITE_REVIEW === '1') {
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n')
} else {
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
      .map((p) => `  <url><loc>${SITE}${p === '/' ? '' : p}</loc>${lastmods[p] ? `<lastmod>${lastmods[p]}</lastmod>` : ''}</url>`)
      .join('\n')}\n</urlset>\n`,
  )
}
await rm('dist-ssr', { recursive: true })
console.log(`Prerendered ${paths.length} pages, 404.html and sitemap.xml`)
