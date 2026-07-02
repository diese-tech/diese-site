'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MacWindow } from '@/components/mac-window';
import { allProjects, featuredProjects } from '@/content/projects';
import type { TouchState } from './scene';

const Scene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => null,
});

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

const TOUCH_BUTTONS: { key: keyof TouchState; label: string; cluster: 'steer' | 'drive' }[] = [
  { key: 'left', label: '◀', cluster: 'steer' },
  { key: 'right', label: '▶', cluster: 'steer' },
  { key: 'forward', label: '▲', cluster: 'drive' },
  { key: 'backward', label: '▼', cluster: 'drive' },
];

/**
 * Gate for the 3D playground: loads the scene when WebGL is available and
 * reduced motion isn't requested — touch devices get on-screen controls.
 * Everyone else gets the poster with normal links. The scene bundle loads
 * lazily so the rest of the site never pays for it.
 */
export function PlaygroundClient() {
  const [mode, setMode] = useState<'checking' | 'scene' | 'poster'>('checking');
  const [showTouchControls, setShowTouchControls] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const touchRef = useRef<TouchState>({ forward: false, backward: false, left: false, right: false });
  const activeProject = activeSlug ? allProjects.find((p) => p.slug === activeSlug) : null;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      // ?force=scene|poster overrides the capability gate (debug/testing)
      const force = new URLSearchParams(window.location.search).get('force');
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      setShowTouchControls(coarse);
      if (force === 'scene' || force === 'poster') {
        setMode(force);
        return;
      }
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setMode(!reducedMotion && webglAvailable() ? 'scene' : 'poster');
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
              : 'It needs WebGL and motion — so it sits this device out. The projects it showcases are all one click away instead:'}
          </p>
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
        </MacWindow>
      </main>
    );
  }

  const press = (key: keyof TouchState, down: boolean) => {
    touchRef.current[key] = down;
  };

  return (
    <main className="relative w-full" style={{ height: 'calc(100dvh - 58px)' }}>
      <Scene onLandmark={setActiveSlug} onReady={() => setSceneReady(true)} touch={touchRef} />

      {/* Boot overlay until the first physics frame */}
      {!sceneReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-paper">
          <div className="flex flex-col items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-ink-faint">
              booting the ops floor…
            </span>
          </div>
        </div>
      )}

      {/* Proximity project card */}
      {activeProject && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-5">
          <div className="pointer-events-auto w-full max-w-md rounded-lg border border-rule bg-paper-panel/95 p-5 backdrop-blur-sm shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]">
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-signal mb-1.5">
              {activeProject.ref} · {activeProject.domain}
            </div>
            <div className="font-grotesk font-semibold text-lg text-ink leading-tight">
              {activeProject.title}
            </div>
            <p className="font-sans text-[13px] leading-[1.5] text-ink-muted mt-1.5">
              {activeProject.summary}
            </p>
            <Link
              href={`/projects/${activeProject.slug}`}
              className="inline-block mt-3 font-grotesk font-semibold text-sm text-ink border-b-2 border-signal pb-0.5 hover:text-signal transition-colors duration-[120ms]"
            >
              Open case file →
            </Link>
          </div>
        </div>
      )}

      {/* HTML HUD — navigation never lives in the canvas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <div className="pointer-events-auto rounded-lg border border-rule bg-paper-panel/85 px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted backdrop-blur-sm">
          {showTouchControls ? 'Use the on-screen controls' : 'WASD / arrows to drive'}
        </div>
        <Link
          href="/"
          className="pointer-events-auto rounded-lg border border-rule bg-paper-panel/85 px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted backdrop-blur-sm hover:text-signal hover:border-signal transition-colors duration-[120ms]"
        >
          ← Exit playground
        </Link>
      </div>

      {/* Touch controls (coarse pointers) */}
      {showTouchControls && sceneReady && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 pointer-events-none select-none">
          {(['steer', 'drive'] as const).map((cluster) => (
            <div key={cluster} className="flex gap-3 pointer-events-auto">
              {TOUCH_BUTTONS.filter((b) => b.cluster === cluster).map((btn) => (
                <button
                  key={btn.key}
                  aria-label={btn.key}
                  className="h-16 w-16 rounded-xl border border-rule bg-paper-panel/80 backdrop-blur-sm text-ink-muted text-xl active:border-signal active:text-signal touch-none"
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    press(btn.key, true);
                  }}
                  onPointerUp={() => press(btn.key, false)}
                  onPointerCancel={() => press(btn.key, false)}
                  onPointerLeave={() => press(btn.key, false)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
