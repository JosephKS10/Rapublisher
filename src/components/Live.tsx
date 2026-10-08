import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'

// Mounts a heavy WebGL or animation component in the browser only, once the page has painted and the layer is
// near the viewport, and never under reduced motion or without WebGL. The poster renders on the server and at first paint, so prerendered
// HTML, LCP and no-JS visitors all get a finished frame; the live layer fades in over it.
// Creating a WebGL context is slow on phones, so test once, and only when a layer is about to mount.
let webgl: boolean | undefined
const hasWebGPU = () => 'gpu' in navigator
const hasWebGL = () => {
  if (webgl === undefined) {
    try {
      const c = document.createElement('canvas')
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {
      webgl = false
    }
  }
  return webgl
}

export function Live<P extends object>({
  load,
  props,
  poster,
  className = '',
  gpu,
}: {
  load: () => Promise<{ default: ComponentType<P> }>
  props: P
  poster?: ReactNode
  className?: string
  gpu?: boolean // the layer draws with WebGPU; without it the poster stays
}) {
  const [Comp, setComp] = useState<ComponentType<P> | null>(null)
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Not under reduced motion, without WebGL, on data saver or on low-memory phones: the poster is the finished frame.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2) return
    let alive = true
    let id = 0
    const idle = 'requestIdleCallback' in window
    const go = () => (gpu ? hasWebGPU() : hasWebGL()) && load().then((m) => alive && setComp(() => m.default))
    // Wait until the layer is within a screen of the viewport, so effects far down the page cost nothing at load.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        id = idle ? requestIdleCallback(go, { timeout: 1500 }) : window.setTimeout(go, 300)
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(el.current!)
    return () => {
      alive = false
      io.disconnect()
      if (idle) cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- load once

  return (
    <div ref={el} className={`live ${className}`} aria-hidden="true">
      {poster && <div className="live-poster">{poster}</div>}
      {Comp && <div className="live-layer"><Comp {...props} /></div>}
    </div>
  )
}
