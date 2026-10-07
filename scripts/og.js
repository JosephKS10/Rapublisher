// Social preview images (1200 by 630), one per page, in the site's own type. Reads each built page's title from
// dist/, renders scripts/og.html in a browser and writes public/og/<slug>.jpg. The images are committed, so the
// deploy build does not need a browser. Run after title changes: npm run build && npm run og && npm run build
// Needs playwright-cli on the PATH (npm i -g @playwright/cli).
import { execFile } from 'node:child_process'
import { mkdir, readFile, readdir } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { promisify } from 'node:util'
import sharp from 'sharp'

// The browser will not open file: URLs, so serve the template and the font files it needs from this folder.
const TYPES = { '.html': 'text/html', '.woff2': 'font/woff2' }
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
  if (!(path in { '/scripts/og.html': 1 }) && !path.startsWith('/node_modules/@fontsource-variable/')) return res.writeHead(404).end()
  try {
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(await readFile(join('.', path)))
  } catch {
    res.writeHead(404).end()
  }
}).listen(0)
const base = `http://localhost:${server.address().port}/scripts/og.html`

// Async on purpose: a blocking call would stop the server above from answering the browser.
const run = promisify(execFile)
const pw = (...args) => run('playwright-cli', args)
const files = (await readdir('dist', { recursive: true })).filter((f) => f.endsWith('.html') && f !== '404.html')
await mkdir('public/og', { recursive: true })
try {
  await pw('open', 'about:blank')
  await pw('resize', '1200', '630')
  for (const f of files) {
    const html = await readFile(`dist/${f}`, 'utf8')
    const title = html.match(/<title>([^<]*)<\/title>/)[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/ \| .*$/, '')
    const slug = f === 'index.html' ? 'home' : f.replace(/\.html$/, '').replaceAll('/', '-')
    await pw('goto', `${base}?${slug}#${encodeURIComponent(title)}`)
    await pw('screenshot', `--filename=.playwright-cli/og-${slug}.png`)
    await sharp(`.playwright-cli/og-${slug}.png`).resize(1200, 630).jpeg({ quality: 88, mozjpeg: true }).toFile(`public/og/${slug}.jpg`)
    console.log(`${slug}: ${title}`)
  }
} finally {
  await pw('close')
  server.close()
}
