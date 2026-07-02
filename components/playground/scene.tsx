'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { KeyboardControls, useGLTF, useKeyboardControls } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { LANDMARKS, nearestLandmark } from './landmarks';

export type TouchState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

/* Palette (fixed hexes — the canvas doesn't participate in theming) */
const INK = '#1b1a17';
const RUST = '#c96f4a';
const CREAM = '#e4dfd3';

const CONTROL_MAP = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'right', keys: ['KeyD', 'ArrowRight'] },
];

const ARENA = 42; // half-extent of the drivable floor

/* Driving feel */
const DRIVE_POWER = 90; // impulse per second along the nose
const MAX_SPEED = 13; // u/s cap so the arena stays controllable
const MAX_YAW = 2.4; // rad/s at full steering authority
const FULL_TURN_SPEED = 4; // u/s at which steering reaches full authority
const IDLE_TURN = 0.35; // fraction of yaw available when stationary
const GRIP = 7; // how quickly momentum realigns with the heading

/* Kenney (CC0) kits + coffee shop set piece, staged in public/models */
const MODELS = {
  loader: '/models/carkit/loader.glb',
  van: '/models/carkit/van.glb',
  shop: '/models/coffee-shop.glb',
  cup: '/models/foodkit/cup.glb',
  cat: '/models/cubepets/cat.glb',
  screenWide: '/models/factorykit/screen-wide.glb',
  screenFlat: '/models/factorykit/screen-flat.glb',
  boxLarge: '/models/factorykit/box-large.glb',
  boxSmall: '/models/factorykit/box-small.glb',
  boxWide: '/models/factorykit/box-wide.glb',
};
Object.values(MODELS).forEach((url) => useGLTF.preload(url));

function Model({
  url,
  scale = 1,
  position,
  rotation,
}: {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);
  return <primitive object={cloned} scale={scale} position={position} rotation={rotation} />;
}

/** Procedural concrete ops floor: dark speckle, tile seams, rust seam marks. */
function makeFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const g = canvas.getContext('2d')!;
  g.fillStyle = '#16130f';
  g.fillRect(0, 0, 512, 512);
  // Deterministic speckle (mulberry32) — stable across re-renders
  let seed = 0x9a4a32;
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < 9000; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    g.fillStyle = rand() > 0.5 ? 'rgba(246,244,239,0.025)' : 'rgba(0,0,0,0.06)';
    g.fillRect(x, y, 1.5, 1.5);
  }
  g.strokeStyle = 'rgba(0,0,0,0.4)';
  g.lineWidth = 2;
  for (let i = 0; i <= 4; i++) {
    g.beginPath();
    g.moveTo(i * 128, 0);
    g.lineTo(i * 128, 512);
    g.stroke();
    g.beginPath();
    g.moveTo(0, i * 128);
    g.lineTo(512, i * 128);
    g.stroke();
  }
  g.fillStyle = 'rgba(201,111,74,0.28)';
  for (let i = 0; i <= 4; i++) {
    for (let k = 0; k <= 4; k++) {
      g.fillRect(i * 128 - 5, k * 128 - 1, 10, 2);
      g.fillRect(i * 128 - 1, k * 128 - 5, 2, 10);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10.5, 10.5);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function useFloorTexture() {
  return useMemo(() => makeFloorTexture(), []);
}

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

/** BrewLoop — the coffee shop, with a knockable giant coffee cup outside. */
function CafeStand({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[3.2, 2.7, 2.9]} position={[0, 2.7, 0]} />
        <Model url={MODELS.shop} scale={6} position={[0, 2.16, 0]} />
      </RigidBody>
      <RigidBody position={[4.4, 1, 3.4]} colliders="cuboid">
        <Model url={MODELS.cup} scale={5} />
      </RigidBody>
      <Beacon position={[0, 7.2, 0]} />
    </group>
  );
}

/** SwiftDispatch — delivery van. */
function DispatchVan({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[1.0, 1.65, 2.2]} position={[0, 1.65, 0]} />
        <Model url={MODELS.van} scale={1.3} position={[0, 1.3, 0]} rotation={[0, Math.PI / 5, 0]} />
      </RigidBody>
      <Beacon position={[0, 5, 0]} />
    </group>
  );
}

/** Serpent Ascension League — esports stage: plinth, pillars, hanging screens. */
function LeagueArena({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[3.4, 0.35, 3.4]} position={[0, 0.35, 0]} />
        <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[3.4, 3.7, 0.7, 24]} />
          <meshStandardMaterial color={INK} roughness={0.9} />
        </mesh>
        {[-2.4, 2.4].map((x) => (
          <mesh key={x} castShadow position={[x, 2.6, 0]}>
            <boxGeometry args={[0.4, 4.5, 0.4]} />
            <meshStandardMaterial color={CREAM} roughness={0.85} />
          </mesh>
        ))}
      </RigidBody>
      {/* Big hanging screen between the pillars + angled side panels */}
      <Model url={MODELS.screenWide} scale={1.3} position={[0, 3.0, 0]} />
      <Model url={MODELS.screenFlat} scale={1.0} position={[-3.2, 0.7, 1.9]} rotation={[0, 0.8, 0]} />
      <Model url={MODELS.screenFlat} scale={1.0} position={[3.2, 0.7, 1.9]} rotation={[0, -0.8, 0]} />
      <Beacon position={[0, 6.4, 0]} />
    </group>
  );
}

/** ThreeTails — a big low-poly cat on a plinth. */
function CatTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[1.5, 0.5, 1.5]} position={[0, 0.5, 0]} />
        <CuboidCollider args={[0.9, 1.2, 0.95]} position={[0, 2.2, 0]} />
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.7, 2.0, 1, 18]} />
          <meshStandardMaterial color={INK} roughness={0.9} />
        </mesh>
        <Model url={MODELS.cat} scale={1.4} position={[0, 1.45, 0]} rotation={[0, -0.5, 0]} />
      </RigidBody>
      <Beacon position={[0, 5.6, 0]} />
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

    const vel = rb.linvel();
    // Signed speed along the nose: positive = moving forward
    const forwardSpeed = vel.x * dir.x + vel.z * dir.z;

    // Grip first: pull velocity toward the heading so momentum follows the
    // nose — this is what makes steering feel like turning rather than
    // rotating. Must run BEFORE the drive impulse, or setLinvel with the
    // frame-start velocity silently cancels the acceleration.
    if (Math.abs(forwardSpeed) > 0.1) {
      const k = Math.min(1, delta * GRIP);
      rb.setLinvel(
        {
          x: vel.x + (dir.x * forwardSpeed - vel.x) * k,
          y: vel.y,
          z: vel.z + (dir.z * forwardSpeed - vel.z) * k,
        },
        true
      );
    }

    const drive = (forward ? 1 : 0) - (backward ? 1 : 0);
    // The speed cap only blocks accelerating further in the direction of
    // motion — braking/reversing input must always work (review finding)
    const braking = drive * forwardSpeed < 0;
    if (drive !== 0 && (braking || Math.abs(forwardSpeed) < MAX_SPEED)) {
      const power = DRIVE_POWER * delta;
      rb.applyImpulse({ x: dir.x * drive * power, y: 0, z: dir.z * drive * power }, true);
    }

    const steer = (left ? 1 : 0) - (right ? 1 : 0);
    if (steer !== 0) {
      // Reverse steering when backing up, like a real vehicle. Yaw authority
      // scales with speed so the forklift carves arcs instead of spinning in
      // place (with a little in-place authority kept for maneuvering).
      const sign = forwardSpeed < -0.3 ? -1 : 1;
      const speedFactor = Math.min(1, Math.abs(forwardSpeed) / FULL_TURN_SPEED);
      const yaw = steer * sign * MAX_YAW * (IDLE_TURN + (1 - IDLE_TURN) * speedFactor);
      rb.setAngvel({ x: 0, y: yaw, z: 0 }, true);
    }

    const t = rb.translation();

    // Lightweight telemetry + teleport hook for tests/debugging
    const w = window as unknown as Record<string, unknown>;
    w.__fk = { x: t.x, z: t.z, fx: dir.x, fz: dir.z, wy: rb.angvel().y };
    if (!w.__fkTeleport) {
      w.__fkTeleport = (x: number, z: number) => {
        rb.setTranslation({ x, y: 1, z }, true);
        rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
      };
    }

    // Proximity: nearest landmark within radius pops the project card
    if (onLandmark) {
      const nearest = nearestLandmark(t.x, t.z);
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
      linearDamping={1.0}
      angularDamping={3}
      enabledRotations={[false, true, false]}
    >
      <CuboidCollider args={[0.9, 0.55, 1.3]} />
      {/* Kenney shovel tractor as the loader; model faces +Z, we drive -Z */}
      <Model
        url={MODELS.loader}
        scale={1.15}
        position={[0, 0.25, 0]}
        rotation={[0, Math.PI, 0]}
      />
    </RigidBody>
  );
}

function Crate({
  url,
  position,
  scale = 2,
  rotation = 0,
}: {
  url: string;
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}) {
  return (
    <RigidBody
      position={position}
      rotation={[0, rotation, 0]}
      colliders="cuboid"
      linearDamping={0.4}
      angularDamping={0.6}
    >
      <Model url={url} scale={scale} />
    </RigidBody>
  );
}

function Arena() {
  const floorTexture = useFloorTexture();
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[ARENA, 0.5, ARENA]} position={[0, -0.5, 0]} />
        <mesh receiveShadow position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[ARENA * 2, ARENA * 2]} />
          <meshStandardMaterial map={floorTexture} roughness={1} />
        </mesh>
      </RigidBody>
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
      {/* Factory crates to shove around */}
      <Crate url={MODELS.boxLarge} position={[6, 1, -8]} />
      <Crate url={MODELS.boxSmall} position={[6.8, 2.5, -8.2]} rotation={0.4} />
      <Crate url={MODELS.boxWide} position={[-9, 1, -6]} rotation={1.1} />
      <Crate url={MODELS.boxLarge} position={[10, 1, 6]} scale={1.6} rotation={2.2} />
      <Crate url={MODELS.boxSmall} position={[-8, 1, 9]} scale={2.4} />
      <Crate url={MODELS.boxWide} position={[2, 1, 12]} rotation={0.7} />
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
        <hemisphereLight args={['#c9946f', '#0d0b09', 0.4]} />
        <ambientLight color="#f6f4ef" intensity={0.5} />
        <directionalLight
          castShadow
          color="#fff3e4"
          intensity={1.7}
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
