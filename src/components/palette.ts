// Neon colours from styles/tokens.css, in the forms the canvas effects take as props. Read in the browser, so changing
// a token needs no code change. The fallbacks are for prerendering: keep them equal to the tokens.
const FALLBACK = { violet: '#a98bff', pink: '#ff4fd8', cyan: '#3de8ff', lime: '#b9ff4f', orange: '#ff9a3d', rose: '#ff5d7a' }

export type Neon = keyof typeof FALLBACK
// Three neons for a page head's waves: the far haze, the body of the waves, and their crests.
export type Tone = [haze: Neon, wave: Neon, crest: Neon]

// `fill`: the colour is for a large fill with no text on it, so take the theme's brighter twin (--nf-*) if it has one.
export const neon = (name: Neon, fill?: boolean) => {
  if (typeof document === 'undefined') return FALLBACK[name]
  const css = getComputedStyle(document.documentElement)
  return (fill && css.getPropertyValue(`--nf-${name}`).trim()) || css.getPropertyValue(`--n-${name}`).trim() || FALLBACK[name]
}

// Any colour token as written in tokens.css (for hex tokens only: the effects cannot parse color-mix()).
export const token = (name: string, fallback: string) =>
  (typeof document !== 'undefined' && getComputedStyle(document.documentElement).getPropertyValue(name).trim()) || fallback
