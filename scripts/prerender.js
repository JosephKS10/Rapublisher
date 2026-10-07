// Renders every route to static HTML after `vite build` (A2: static first). Also writes 404.html and sitemap.xml.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname } from 'node:path'

const { render, paths } = await import('../dist-ssr/entry-server.js')
const template = await readFile('dist/index.html', 'utf8')
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

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${SITE}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
)
await rm('dist-ssr', { recursive: true })
console.log(`Prerendered ${paths.length} pages, 404.html and sitemap.xml`)
