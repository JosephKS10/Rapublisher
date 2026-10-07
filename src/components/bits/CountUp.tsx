// Adapted from React Bits (https://github.com/DavidHDev/react-bits), Copyright (c) 2026 David Haz.
// MIT + Commons Clause licence: used here as part of this website only. See THIRD_PARTY_NOTICES.md.
// RaPublisher: same props, with the motion spring swapped for a small requestAnimationFrame ease so the site
// doesn't ship the motion library. The start value renders in the HTML (prerender shows a real number), and a
// new `to` eases from the value on screen rather than restarting from zero.
import { useCallback, useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
}

export default function CountUp({ to, from = 0, delay = 0, duration = 2, className = '', separator = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(from);

  const format = useCallback(
    (n: number) => {
      const s = Intl.NumberFormat('en-AU', { useGrouping: !!separator, maximumFractionDigits: 0 }).format(n);
      return separator ? s.replace(/,/g, separator) : s;
    },
    [separator]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = current.current;
    if (start === to || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = to;
      el.textContent = format(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + delay * 1000;
    const ms = duration * 1000;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / ms));
      const eased = 1 - Math.pow(1 - p, 3);
      current.current = start + (to - start) * eased;
      el.textContent = format(current.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay, duration, format]);

  return <span className={className} ref={ref}>{format(from)}</span>;
}
