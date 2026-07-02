'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier';

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

function Forklift() {
  const body = useRef<RapierRigidBody>(null);
  const [, getKeys] = useKeyboardControls();
  const camTarget = useMemo(() => new THREE.Vector3(), []);
  const camPos = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const rb = body.current;
    if (!rb) return;

    const { forward, backward, left, right } = getKeys() as Record<string, boolean>;
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

    // Follow camera: sit behind and above the forklift, ease toward it
    const t = rb.translation();
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
      {/* Crates to shove around (landmarks arrive in R5b) */}
      <Crate position={[6, 2, -8]} color={CREAM} />
      <Crate position={[6.6, 3.4, -8.2]} size={0.8} color={RUST} />
      <Crate position={[-9, 2, -14]} size={1.4} color={INK} />
      <Crate position={[12, 2, 6]} size={1.2} color={RUST} />
      <Crate position={[-14, 2, 10]} color={CREAM} />
      <Crate position={[2, 2, 16]} size={0.9} color={INK} />
    </>
  );
}

export default function Scene() {
  return (
    <KeyboardControls map={CONTROL_MAP}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 7, 11], fov: 42 }}
        className="bg-paper"
      >
        <color attach="background" args={['#0d0b09']} />
        <fog attach="fog" args={['#0d0b09', 45, 85]} />
        <ambientLight color="#f6f4ef" intensity={0.55} />
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
        <Physics>
          <Arena />
          <Forklift />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
