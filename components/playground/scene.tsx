'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier';

export type TouchState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

/* Palette (fixed hexes — the canvas doesn't participate in theming) */
const FLOOR = '#12100d';
const INK = '#1b1a17';
const RUST = '#c96f4a';
const CREAM = '#e4dfd3';
const FAINT = '#71685b';

const CONTROL_MAP = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'right', keys: ['KeyD', 'ArrowRight'] },
];

const ARENA = 42; // half-extent of the drivable floor
const LANDMARK_RADIUS = 8; // proximity distance that pops the project card

/** Landmark anchor points (x, z) — the set-pieces the forklift can visit. */
const LANDMARKS: { slug: string; x: number; z: number }[] = [
  { slug: 'brewloop', x: -18, z: -14 },
  { slug: 'swiftdispatch', x: 18, z: -16 },
  { slug: 'serpent-ascension-league', x: 19, z: 15 },
  { slug: 'threetails-booking', x: -17, z: 16 },
];

function Beacon({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.6) * 0.25;
    ref.current.rotation.y = state.clock.elapsedTime * 0.8;
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.45, 0.45, 0.45]} />
      <meshStandardMaterial color={RUST} emissive={RUST} emissiveIntensity={0.55} />
    </mesh>
  );
}

/** BrewLoop — café stand with awning and a cup on the counter. */
function CafeStand({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
          <boxGeometry args={[4.2, 1.8, 1.7]} />
          <meshStandardMaterial color={CREAM} roughness={0.85} />
        </mesh>
        {[-1.9, 1.9].map((x) => (
          <mesh key={x} castShadow position={[x, 2.4, -0.7]}>
            <boxGeometry args={[0.16, 3, 0.16]} />
            <meshStandardMaterial color={INK} roughness={0.9} />
          </mesh>
        ))}
        <mesh castShadow position={[0, 3.7, -0.25]} rotation={[0.16, 0, 0]}>
          <boxGeometry args={[4.8, 0.14, 2.2]} />
          <meshStandardMaterial color={RUST} roughness={0.8} />
        </mesh>
      </RigidBody>
      {/* Cup — dynamic, knockable */}
      <RigidBody position={[1.1, 2.3, 0.25]} colliders="cuboid">
        <mesh castShadow>
          <cylinderGeometry args={[0.28, 0.22, 0.55, 14]} />
          <meshStandardMaterial color={RUST} roughness={0.7} />
        </mesh>
      </RigidBody>
      <Beacon position={[0, 5.2, 0]} />
    </group>
  );
}

/** SwiftDispatch — service van. */
function DispatchVan({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow position={[0, 1.5, 0.4]}>
          <boxGeometry args={[2.3, 2.2, 4]} />
          <meshStandardMaterial color={CREAM} roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 1.05, -2.6]}>
          <boxGeometry args={[2.3, 1.3, 1.6]} />
          <meshStandardMaterial color={RUST} roughness={0.75} />
        </mesh>
        <mesh castShadow position={[0, 2.75, -2.5]}>
          <boxGeometry args={[0.8, 0.25, 0.5]} />
          <meshStandardMaterial color={RUST} emissive={RUST} emissiveIntensity={0.3} />
        </mesh>
        {(
          [
            [-1.15, 0.45, -2.4],
            [1.15, 0.45, -2.4],
            [-1.15, 0.45, 1.6],
            [1.15, 0.45, 1.6],
          ] as const
        ).map(([x, y, z]) => (
          <mesh key={`${x}${z}`} castShadow position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
            <meshStandardMaterial color="#0c0a08" roughness={0.9} />
          </mesh>
        ))}
      </RigidBody>
      <Beacon position={[0, 4.6, 0]} />
    </group>
  );
}

/** Serpent Ascension League — arena plinth with pillars and a banner ring. */
function LeagueArena({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[3.4, 3.7, 0.7, 24]} />
          <meshStandardMaterial color={INK} roughness={0.9} />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          return (
            <mesh
              key={i}
              castShadow
              position={[Math.cos(angle) * 2.7, 2.1, Math.sin(angle) * 2.7]}
            >
              <boxGeometry args={[0.45, 3.4, 0.45]} />
              <meshStandardMaterial color={CREAM} roughness={0.85} />
            </mesh>
          );
        })}
      </RigidBody>
      <mesh position={[0, 3.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.7, 0.14, 10, 40]} />
        <meshStandardMaterial color={RUST} emissive={RUST} emissiveIntensity={0.35} />
      </mesh>
      <Beacon position={[0, 5.4, 0]} />
    </group>
  );
}

/** ThreeTails — cat tower with ears. */
function CatTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.4, 1.7, 1, 18]} />
          <meshStandardMaterial color={INK} roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 1.9, 0]}>
          <boxGeometry args={[1.5, 1.8, 1.5]} />
          <meshStandardMaterial color={CREAM} roughness={0.85} />
        </mesh>
        <mesh castShadow position={[0, 3.15, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.35, 18]} />
          <meshStandardMaterial color={RUST} roughness={0.8} />
        </mesh>
        {[-0.55, 0.55].map((x) => (
          <mesh key={x} castShadow position={[x, 3.75, 0]} rotation={[0, 0, x < 0 ? 0.3 : -0.3]}>
            <coneGeometry args={[0.32, 0.75, 4]} />
            <meshStandardMaterial color={RUST} roughness={0.8} />
          </mesh>
        ))}
      </RigidBody>
      <Beacon position={[0, 5.1, 0]} />
    </group>
  );
}

function Forklift({
  onLandmark,
  onReady,
  touch,
}: {
  onLandmark?: (slug: string | null) => void;
  onReady?: () => void;
  touch?: React.RefObject<TouchState>;
}) {
  const body = useRef<RapierRigidBody>(null);
  const activeLandmark = useRef<string | null>(null);
  const announcedReady = useRef(false);
  const [, getKeys] = useKeyboardControls();
  const camTarget = useMemo(() => new THREE.Vector3(), []);
  const camPos = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const rb = body.current;
    if (!rb) return;

    if (!announcedReady.current) {
      announcedReady.current = true;
      onReady?.();
    }

    const keys = getKeys() as Record<string, boolean>;
    const t2 = touch?.current;
    const forward = keys.forward || t2?.forward;
    const backward = keys.backward || t2?.backward;
    const left = keys.left || t2?.left;
    const right = keys.right || t2?.right;
    const rot = rb.rotation();
    quat.set(rot.x, rot.y, rot.z, rot.w);
    dir.set(0, 0, -1).applyQuaternion(quat);

    const drive = (forward ? 1 : 0) - (backward ? 1 : 0);
    if (drive !== 0) {
      const power = 42 * delta;
      rb.applyImpulse({ x: dir.x * drive * power, y: 0, z: dir.z * drive * power }, true);
    }

    const steer = (left ? 1 : 0) - (right ? 1 : 0);
    if (steer !== 0) {
      // Reverse steering when backing up, like a real vehicle
      const sign = drive < 0 ? -1 : 1;
      rb.applyTorqueImpulse({ x: 0, y: steer * sign * 9 * delta, z: 0 }, true);
    }

    const t = rb.translation();

    // Lightweight telemetry + teleport hook for tests/debugging
    const w = window as unknown as Record<string, unknown>;
    w.__fk = { x: t.x, z: t.z, fx: dir.x, fz: dir.z };
    if (!w.__fkTeleport) {
      w.__fkTeleport = (x: number, z: number) => {
        rb.setTranslation({ x, y: 1, z }, true);
        rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
      };
    }

    // Proximity: nearest landmark within radius pops the project card
    if (onLandmark) {
      let nearest: string | null = null;
      let best = LANDMARK_RADIUS * LANDMARK_RADIUS;
      for (const mark of LANDMARKS) {
        const dx = t.x - mark.x;
        const dz = t.z - mark.z;
        const d2 = dx * dx + dz * dz;
        if (d2 < best) {
          best = d2;
          nearest = mark.slug;
        }
      }
      if (nearest !== activeLandmark.current) {
        activeLandmark.current = nearest;
        onLandmark(nearest);
      }
    }

    // Follow camera: sit behind and above the forklift, ease toward it
    camTarget.set(t.x, t.y + 1, t.z);
    camPos.set(t.x - dir.x * 11, t.y + 7, t.z - dir.z * 11);
    state.camera.position.lerp(camPos, Math.min(1, delta * 3.5));
    state.camera.lookAt(camTarget);
  });

  return (
    <RigidBody
      ref={body}
      position={[0, 1, 0]}
      colliders={false}
      linearDamping={1.6}
      angularDamping={3}
      enabledRotations={[false, true, false]}
    >
      <CuboidCollider args={[0.9, 0.55, 1.3]} />
      {/* Body */}
      <mesh castShadow position={[0, 0.05, 0.15]}>
        <boxGeometry args={[1.6, 0.9, 2.1]} />
        <meshStandardMaterial color={RUST} roughness={0.75} />
      </mesh>
      {/* Cab */}
      <mesh castShadow position={[0, 0.85, 0.55]}>
        <boxGeometry args={[1.3, 0.8, 1.0]} />
        <meshStandardMaterial color={INK} roughness={0.85} />
      </mesh>
      {/* Mast */}
      <mesh castShadow position={[0, 0.7, -1.15]}>
        <boxGeometry args={[1.1, 1.9, 0.15]} />
        <meshStandardMaterial color={INK} roughness={0.85} />
      </mesh>
      {/* Forks */}
      {[-0.35, 0.35].map((x) => (
        <mesh key={x} castShadow position={[x, -0.42, -1.75]}>
          <boxGeometry args={[0.18, 0.08, 1.1]} />
          <meshStandardMaterial color={CREAM} roughness={0.6} metalness={0.2} />
        </mesh>
      ))}
      {/* Wheels */}
      {(
        [
          [-0.75, -0.35, 0.75],
          [0.75, -0.35, 0.75],
          [-0.75, -0.35, -0.7],
          [0.75, -0.35, -0.7],
        ] as const
      ).map(([x, y, z]) => (
        <mesh key={`${x}${z}`} castShadow position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.25, 18]} />
          <meshStandardMaterial color="#0c0a08" roughness={0.9} />
        </mesh>
      ))}
    </RigidBody>
  );
}

function Crate({
  position,
  size = 1,
  color = CREAM,
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  return (
    <RigidBody position={position} colliders="cuboid" linearDamping={0.4} angularDamping={0.6}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
    </RigidBody>
  );
}

function Arena() {
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[ARENA, 0.5, ARENA]} position={[0, -0.5, 0]} />
        <mesh receiveShadow position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[ARENA * 2, ARENA * 2]} />
          <meshStandardMaterial color={FLOOR} roughness={1} />
        </mesh>
      </RigidBody>
      {/* Ruled grid, echoing the site's hairlines */}
      <Grid
        position={[0, 0.01, 0]}
        args={[ARENA * 2, ARENA * 2]}
        cellSize={2}
        cellThickness={0.6}
        cellColor={FAINT}
        sectionSize={10}
        sectionThickness={1}
        sectionColor={RUST}
        fadeDistance={70}
        fadeStrength={2}
      />
      {/* Low walls to keep the forklift in play */}
      {(
        [
          [0, 0.6, -ARENA, ARENA, 0.6, 0.4],
          [0, 0.6, ARENA, ARENA, 0.6, 0.4],
          [-ARENA, 0.6, 0, 0.4, 0.6, ARENA],
          [ARENA, 0.6, 0, 0.4, 0.6, ARENA],
        ] as const
      ).map(([x, y, z, w, h, d]) => (
        <RigidBody key={`${x}${z}`} type="fixed" colliders={false}>
          <CuboidCollider args={[w, h, d]} position={[x, y, z]} />
          <mesh receiveShadow position={[x, y, z]}>
            <boxGeometry args={[w * 2, h * 2, d * 2]} />
            <meshStandardMaterial color={INK} roughness={0.9} />
          </mesh>
        </RigidBody>
      ))}
      {/* Crates to shove around */}
      <Crate position={[6, 2, -8]} color={CREAM} />
      <Crate position={[6.6, 3.4, -8.2]} size={0.8} color={RUST} />
      <Crate position={[-9, 2, -6]} size={1.4} color={INK} />
      <Crate position={[10, 2, 6]} size={1.2} color={RUST} />
      <Crate position={[-8, 2, 9]} color={CREAM} />
      <Crate position={[2, 2, 12]} size={0.9} color={INK} />
      {/* Project landmarks */}
      <CafeStand position={[-18, 0, -14]} />
      <DispatchVan position={[18, 0, -16]} />
      <LeagueArena position={[19, 0, 15]} />
      <CatTower position={[-17, 0, 16]} />
    </>
  );
}

export default function Scene({
  onLandmark,
  onReady,
  touch,
}: {
  onLandmark?: (slug: string | null) => void;
  onReady?: () => void;
  touch?: React.RefObject<TouchState>;
}) {
  // Pause rendering + physics while the tab is hidden
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <KeyboardControls map={CONTROL_MAP}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        performance={{ min: 0.5 }}
        frameloop={paused ? 'never' : 'always'}
        camera={{ position: [0, 7, 11], fov: 42 }}
        className="bg-paper"
      >
        <color attach="background" args={['#0d0b09']} />
        <fog attach="fog" args={['#0d0b09', 45, 85]} />
        <hemisphereLight args={['#c9946f', '#0d0b09', 0.35]} />
        <ambientLight color="#f6f4ef" intensity={0.45} />
        <directionalLight
          castShadow
          color="#fff3e4"
          intensity={1.6}
          position={[14, 22, 10]}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <directionalLight color="#c96f4a" intensity={0.25} position={[-18, 8, -14]} />
        <Physics paused={paused}>
          <Arena />
          <Forklift onLandmark={onLandmark} onReady={onReady} touch={touch} />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
