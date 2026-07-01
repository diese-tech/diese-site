'use client';

import { useEffect, useRef, useState } from 'react';

const WORKFLOW_BLOCKS = [
  { code: 'INTAKE', width: 'w-3/4', tone: 'ok' },
  { code: 'QUOTE', width: 'w-2/3', tone: 'ok' },
  { code: 'DISPATCH', width: 'w-5/6', tone: 'active' },
  { code: 'NOTIFY', width: 'w-1/2', tone: 'ok' },
  { code: 'COMPLETE', width: 'w-3/5', tone: 'queued' },
] as const;

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Builder Console masthead visual: modular workflow blocks rendered as plain
 * HTML (works with no JS/WebGL and doubles as the mobile visual), progressively
 * upgraded to a lazy-loaded three.js block scene on desktop when WebGL is
 * available and reduced motion is not requested.
 */
export function BuilderConsole() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!desktop || reducedMotion || !webglAvailable() || !mountRef.current) return;

    let disposed = false;
    let frame = 0;
    let cleanupScene: (() => void) | undefined;

    import('three')
      .then((THREE) => {
        const mount = mountRef.current;
        if (disposed || !mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 50);
        camera.position.set(3.2, 2.6, 7.2);
        camera.lookAt(0, 0.4, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.domElement.setAttribute('aria-hidden', 'true');
        mount.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight('#f6f4ef', 1.1));
        const keyLight = new THREE.DirectionalLight('#fff8ec', 1.4);
        keyLight.position.set(4, 6, 5);
        scene.add(keyLight);

        const group = new THREE.Group();
        const edgeMaterial = new THREE.LineBasicMaterial({ color: '#9a8f7a', transparent: true, opacity: 0.5 });
        const blocks: { mesh: InstanceType<typeof THREE.Mesh>; baseY: number; phase: number }[] = [];
        const specs: { pos: [number, number, number]; size: [number, number, number]; color: string }[] = [
          { pos: [0, -0.2, 0], size: [2.4, 0.62, 1.5], color: '#1b1a17' },
          { pos: [-1.35, 0.75, 0.25], size: [1.25, 0.62, 1.2], color: '#9a4a32' },
          { pos: [1.25, 0.85, -0.35], size: [1.45, 0.62, 1.05], color: '#e4dfd3' },
          { pos: [0.15, 1.75, 0.1], size: [1.0, 0.62, 1.0], color: '#1b1a17' },
          { pos: [-0.85, -1.15, -0.2], size: [1.4, 0.62, 1.1], color: '#e4dfd3' },
        ];
        for (const [i, spec] of specs.entries()) {
          const geometry = new THREE.BoxGeometry(...spec.size);
          const material = new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.85, metalness: 0 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(...spec.pos);
          mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
          group.add(mesh);
          blocks.push({ mesh, baseY: spec.pos[1], phase: i * 1.4 });
        }
        scene.add(group);

        let pointerX = 0;
        let pointerY = 0;
        const onPointerMove = (event: PointerEvent) => {
          pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
          pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('pointermove', onPointerMove, { passive: true });

        const onResize = () => {
          if (!mount.clientWidth || !mount.clientHeight) return;
          camera.aspect = mount.clientWidth / mount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', onResize);

        const clock = new THREE.Clock();
        const tick = () => {
          const t = clock.getElapsedTime();
          group.rotation.y = t * 0.14 + pointerX * 0.12;
          group.rotation.x = pointerY * 0.06;
          for (const block of blocks) {
            block.mesh.position.y = block.baseY + Math.sin(t * 0.8 + block.phase) * 0.07;
          }
          renderer.render(scene, camera);
          frame = requestAnimationFrame(tick);
        };
        const onVisibility = () => {
          cancelAnimationFrame(frame);
          if (!document.hidden && !disposed) frame = requestAnimationFrame(tick);
        };
        document.addEventListener('visibilitychange', onVisibility);
        frame = requestAnimationFrame(tick);
        setSceneReady(true);

        cleanupScene = () => {
          cancelAnimationFrame(frame);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('resize', onResize);
          document.removeEventListener('visibilitychange', onVisibility);
          for (const block of blocks) {
            block.mesh.geometry.dispose();
            (block.mesh.material as InstanceType<typeof THREE.MeshStandardMaterial>).dispose();
          }
          edgeMaterial.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* three failed to load — the HTML fallback stays in place */
      });

    return () => {
      disposed = true;
      cleanupScene?.();
    };
  }, []);

  return (
    <div className="relative border border-rule bg-paper-panel" aria-hidden="true">
      {/* Console header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-rule font-mono text-[10px] tracking-[0.12em] uppercase text-ink-faint">
        <span>Builder Console</span>
        <span className="text-ok">● Live</span>
      </div>

      <div className="relative h-[240px] lg:h-[280px]">
        {/* HTML fallback / simplified mobile visual */}
        <div
          className={`absolute inset-0 flex flex-col justify-center gap-3 px-5 transition-opacity duration-300 ${sceneReady ? 'opacity-0' : 'opacity-100'}`}
        >
          {WORKFLOW_BLOCKS.map((block) => (
            <div key={block.code} className="flex items-center gap-3 font-mono">
              <span className="text-[9px] tracking-[0.1em] uppercase text-ink-faint w-20 shrink-0">
                {block.code}
              </span>
              <span
                className={`h-4 border ${block.width} ${
                  block.tone === 'active'
                    ? 'bg-signal/15 border-signal/50'
                    : block.tone === 'ok'
                      ? 'bg-paper-sunk border-rule'
                      : 'bg-transparent border-dashed border-rule'
                }`}
              />
              <span
                className={`text-[10px] ${
                  block.tone === 'active' ? 'text-signal' : block.tone === 'ok' ? 'text-ok' : 'text-ink-faint'
                }`}
              >
                {block.tone === 'queued' ? '○' : '●'}
              </span>
            </div>
          ))}
        </div>

        {/* three.js mount target (desktop enhancement) */}
        <div
          ref={mountRef}
          className={`absolute inset-0 transition-opacity duration-500 ${sceneReady ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  );
}
