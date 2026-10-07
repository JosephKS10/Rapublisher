// Adapted from React Bits (https://github.com/DavidHDev/react-bits), Copyright (c) 2026 David Haz.
// MIT + Commons Clause licence: used here as part of this website only. See THIRD_PARTY_NOTICES.md.
// RaPublisher: same props and feel, with the motion springs swapped for CSS variables and a CSS transition,
// so the site doesn't ship the motion library for one effect. The tooltip and mobile notice are dropped (unused).
import { useRef, type CSSProperties } from 'react';
import './TiltedCard.css';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  containerHeight?: CSSProperties['height'];
  containerWidth?: CSSProperties['width'];
  imageHeight?: CSSProperties['height'];
  imageWidth?: CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const set = (rx: number, ry: number, s: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
    el.style.setProperty('--s', String(s));
  };

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    set((offsetY / (rect.height / 2)) * -rotateAmplitude, (offsetX / (rect.width / 2)) * rotateAmplitude, scaleOnHover);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseLeave={() => set(0, 0, 1)}
    >
      <div className="tilted-card-inner" style={{ width: imageWidth, height: imageHeight }}>
        <img src={imageSrc} alt={altText} className="tilted-card-img" style={{ width: imageWidth, height: imageHeight }} />
        {displayOverlayContent && overlayContent && <div className="tilted-card-overlay">{overlayContent}</div>}
      </div>
    </figure>
  );
}
