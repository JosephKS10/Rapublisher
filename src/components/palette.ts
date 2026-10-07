// The accent from styles/tokens.css (--a), in the forms the WebGL effects take as props. Read once in the browser, so
// changing the palette needs no code change. The fallback is the default accent, for prerendering: keep it equal to --a.
const DEFAULT = '249 249 249'

type Accent = { hex: string; csv: string; unit: [number, number, number] }
let memo: Accent | undefined

export function accent(): Accent {
  if (memo) return memo
  const inBrowser = typeof document !== 'undefined'
  const a = (inBrowser && getComputedStyle(document.documentElement).getPropertyValue('--a').trim()) || DEFAULT
  const rgb = a.split(/\s+/).map(Number)
  const value: Accent = {
    hex: '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join(''),
    csv: rgb.join(', '),
    unit: rgb.map((v) => v / 255) as [number, number, number],
  }
  if (inBrowser) memo = value
  return value
}
