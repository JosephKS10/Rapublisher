import { useEffect, useState, type ComponentType, type ReactNode } from 'react'

// Mounts a heavy WebGL or animation component in the browser only, once the page has painted, and never
// under reduced motion or without WebGL. The poster renders on the server and at first paint, so prerendered
// HTML, LCP and no-JS visitors all get a finished frame; the live layer fades in over it.
const hasWebGL = () => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function Live<P extends object>({
  load,
  props,
  poster,
  className = '',
}: {
  load: () => Promise<{ default: ComponentType<P> }>
  props: P
  poster?: ReactNode
  className?: string
}) {
  const [Comp, setComp] = useState<ComponentType<P> | null>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !hasWebGL()) return
    let alive = true
    const go = () => load().then((m) => alive && setComp(() => m.default))
    const idle = 'requestIdleCallback' in window
    const id = idle ? requestIdleCallback(go, { timeout: 1500 }) : window.setTimeout(go, 300)
    return () => {
      alive = false
      if (idle) cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- load once

  return (
    <div className={`live ${className}`} aria-hidden="true">
      {poster && <div className="live-poster">{poster}</div>}
      {Comp && <div className="live-layer"><Comp {...props} /></div>}
    </div>
  )
}
