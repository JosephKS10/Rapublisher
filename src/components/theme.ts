// Dark is the default theme; light is the visitor's choice. The choice is kept in localStorage and applied before
// first paint by public/theme.js. Both themes are token sets in styles/tokens.css.
import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const listeners = new Set<() => void>()
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

// Re-renders the caller when the theme changes. Prerendered HTML assumes dark.
export const useTheme = () => useSyncExternalStore(subscribe, read, (): Theme => 'dark')

// `from` is where the switch was pressed: the new theme sweeps out from that point (see theme-sweep in site.css).
export function setTheme(next: Theme, from?: { x: number; y: number }) {
  const root = document.documentElement
  const apply = () => {
    if (next === 'light') root.dataset.theme = 'light'
    else delete root.dataset.theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f1f2f4' : '#07080a')
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage blocked: the choice lasts for this page only
    }
    listeners.forEach((fn) => fn())
  }
  if (!from || !document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply()
  root.style.setProperty('--tx', `${from.x}px`)
  root.style.setProperty('--ty', `${from.y}px`)
  document.startViewTransition(apply)
}
