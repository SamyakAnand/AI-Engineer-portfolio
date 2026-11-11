'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Neural-network node positions (input / hidden / output layers).
const LAYERS = [
  // input
  { x: -6, y: -1.2 },
  { x: -3, y: -1.2 },
  { x: 0, y: -1.2 },
  { x: 3, y: -1.2 },
  { x: 6, y: -1.2 },
  // hidden
  { x: -5, y: 0 },
  { x: -2.5, y: 0 },
  { x: 0, y: 0 },
  { x: 2.5, y: 0 },
  { x: 5, y: 0 },
  { x: -5, y: 1.3 },
  { x: -2.5, y: 1.3 },
  { x: 0, y: 1.3 },
  { x: 2.5, y: 1.3 },
  { x: 5, y: 1.3 },
  // output
  { x: -3, y: 2.6 },
  { x: 0, y: 2.6 },
  { x: 3, y: 2.6 },
];

const COLORS = {
  input: new THREE.Color('#6366f1'),
  hidden: new THREE.Color('#7c3aed'),
  output: new THREE.Color('#3b82f6'),
};

function Node({ color, index }: { color: THREE.Color; index: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2.4 + index) * 0.02 + 1;
      mesh.current.scale.set(pulse, pulse, pulse);
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * 1.1 + index) * 0.004;
    }
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.9} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  );
}

function Edge({ a, b, color }: { a: { x: number; y: number }; b: { x: number; y: number }; color: THREE.Color }) {
  const line = useRef<THREE.Line>(null as any);
  useFrame((state) => {
    if (line.current) {
      const t = (state.clock.elapsedTime * 1.5 + a.x + a.y) % 1;
      line.current.position.x = THREE.MathUtils.lerp(a.x, b.x, t);
      line.current.position.y = THREE.MathUtils.lerp(a.y, b.y, t);
    }
  });
  return (
    <line ref={line as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2} itemSize={3} array={new Float32Array([a.x, a.y, 0, b.x, b.y, 0])} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.35} linewidth={1} />
    </line>
  );
}

// Ambient particle field (low-res fallback).
export default function NeuralNetworkScene() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-bg">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 10], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={[0x0a0a0f]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} color="#7c3aed" />

      {/* Glow ambient particles inside the network */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={LAYERS.length} itemSize={3} array={new Float32Array(LAYERS.map((l, i) => [l.x, l.y, i % 3 === 0 ? 0.3 : 0]).flat())} />
        </bufferGeometry>
        <pointsMaterial color="#7c3aed" size={0.06} sizeAttenuation={true} transparent opacity={0.3} />
      </points>

      {/* Edges between layers */}
        {LAYERS.slice(0, -3).map((a, ai) =>
          LAYERS.slice(ai + 1, ai + 4).map((b) => (
            <Edge key={`${a.x}-${b.x}`} a={a} b={b} color={COLORS.hidden} />
          ))
        )}
        {LAYERS.slice(4).map((a, ai) =>
          LAYERS.slice(ai + 1, ai + 4).map((b) => (
            <Edge key={`${a.x}-${b.x}-h`} a={a} b={b} color={COLORS.hidden} />
          ))
        )}
        {LAYERS.slice(9).map((a, ai) =>
          LAYERS.slice(ai + 1, ai + 3).map((b) => (
            <Edge key={`${a.x}-${b.x}-o`} a={a} b={b} color={COLORS.output} />
          ))
        )}

        {/* Input nodes */}
        {LAYERS.slice(0, 5).map((_, i) => (
          <Node key={i} color={COLORS.input} index={i * 3} />
        ))}
        {/* Hidden nodes */}
        {LAYERS.slice(5, 14).map((_, i) => (
          <Node key={i + 5} color={COLORS.hidden} index={i + 5} />
        ))}
        {/* Output nodes */}
        {LAYERS.slice(14).map((_, i) => (
          <Node key={i + 14} color={COLORS.output} index={i + 14} />
        ))}

        {/* Scene overlay particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={LAYERS.length} itemSize={3} array={new Float32Array(LAYERS.map((l) => [l.x, l.y, 0.5]).flat())} />
          </bufferGeometry>
          <pointsMaterial color="#3b82f6" size={0.05} sizeAttenuation={true} transparent opacity={0.2} />
        </points>

        <Environment preset="city" />
      </Canvas>

      {/* Fallback decorative overlay (visible when WebGL is unavailable) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="h-2 w-2 rounded-full bg-accent mx-auto mb-3" />
          <p className="text-sm uppercase tracking-[.2em] text-text-dim">3D display unavailable</p>
          <p className="text-xs text-text-dim">Content stays fully accessible.</p>
        </div>
      </div>
    </div>
  );
}
