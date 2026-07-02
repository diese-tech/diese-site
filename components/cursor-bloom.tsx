'use client';

import { useEffect, useRef } from 'react';

/**
 * Soft radial glow that follows the cursor (brittanychiang-style), tinted by
 * the theme's --bloom variable. Renders nothing for touch-only devices and
 * reduced-motion users.
 */
export function CursorBloom() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!finePointer || reducedMotion || !el) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = -200;

    const paint = () => {
      el.style.background = `radial-gradient(600px at ${x}px ${y}px, var(--bloom), transparent 80%)`;
      frame = 0;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    paint();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-30" aria-hidden="true" />;
}
