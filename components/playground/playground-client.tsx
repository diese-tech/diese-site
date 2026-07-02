'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MacWindow } from '@/components/mac-window';
import { featuredProjects } from '@/content/projects';

const Scene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-[12px] tracking-[0.1em] uppercase text-ink-faint">
      booting playground…
    </div>
  ),
});

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Gate for the 3D playground: loads the scene only on capable, keyboard-first
 * devices without reduced motion; everyone else gets the poster with normal
 * links (issue #27). The scene bundle is loaded lazily so the rest of the
 * site never pays for it.
 */
export function PlaygroundClient() {
  const [mode, setMode] = useState<'checking' | 'scene' | 'poster'>('checking');

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      // ?force=scene|poster overrides the capability gate (debug/testing)
      const force = new URLSearchParams(window.location.search).get('force');
      if (force === 'scene' || force === 'poster') {
        setMode(force);
        return;
      }
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setMode(finePointer && !reducedMotion && webglAvailable() ? 'scene' : 'poster');
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (mode !== 'scene') {
    return (
      <main className="mx-auto max-w-content px-6 md:px-10 py-12 md:py-16">
        <MacWindow title="playground.app" bodyClassName="p-6 md:p-8">
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal mb-4">
            The ops floor
          </div>
          <h1 className="font-grotesk font-semibold text-[26px] md:text-[32px] tracking-[-0.015em] leading-[1.1] text-ink max-w-[24ch]">
            A drivable 3D playground lives here.
          </h1>
          <p className="font-sans text-[15px] leading-[1.65] text-ink-muted max-w-[58ch] mt-4">
            {mode === 'checking'
              ? 'Checking what this device can do…'
              : 'It needs WebGL, a keyboard, and motion — so it sits this device out. The projects it showcases are all one click away instead:'}
          </p>
          {mode === 'poster' && (
            <ul className="mt-6 flex flex-col gap-2">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-mono text-xs tracking-[0.06em] uppercase text-ink-muted border-b border-rule pb-px hover:text-signal hover:border-signal transition-colors duration-[120ms]"
                  >
                    {project.ref} — {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </MacWindow>
      </main>
    );
  }

  return (
    <main className="relative w-full" style={{ height: 'calc(100dvh - 58px)' }}>
      <Scene />
      {/* HTML HUD — navigation never lives in the canvas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <div className="pointer-events-auto rounded-lg border border-rule bg-paper-panel/85 px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted backdrop-blur-sm">
          WASD / arrows to drive
        </div>
        <Link
          href="/"
          className="pointer-events-auto rounded-lg border border-rule bg-paper-panel/85 px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted backdrop-blur-sm hover:text-signal hover:border-signal transition-colors duration-[120ms]"
        >
          ← Exit playground
        </Link>
      </div>
    </main>
  );
}
