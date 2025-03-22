import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars() {
  const ref = useRef<any>();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(6000 * 3);
    for (let i = 0; i < 6000 * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 8;
      pos[i + 1] = (Math.random() - 0.5) * 8;
      pos[i + 2] = (Math.random() - 0.5) * 8;
      
      const distance = Math.sqrt(pos[i] * pos[i] + pos[i + 1] * pos[i + 1] + pos[i + 2] * pos[i + 2]);
      if (distance < 0.5) {
        const scale = 0.5 / distance;
        pos[i] *= scale;
        pos[i + 1] *= scale;
        pos[i + 2] *= scale;
      }
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Planet() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!sphereRef.current || !ringRef.current) return;
    sphereRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    sphereRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    ringRef.current.rotation.x = Math.PI / 2;
    ringRef.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <group position={[2, -1, 0]} scale={0.5}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.8}
          roughness={0.2}
          emissive="#312e81"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[1.5, 2, 80]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ShootingStars() {
  const count = 30;
  const mesh = useRef<THREE.Points>(null);
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      spd[i] = Math.random() * 0.02 + 0.01;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3] -= speeds[i];
      if (positions[i * 3] < -4) {
        positions[i * 3] = 4;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#ffffff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#000814]" />
      <Canvas
        camera={{ position: [0, 0, 2] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Stars />
        <Planet />
        <ShootingStars />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(67,56,202,0.1),transparent_60%)]" />
      <div className="absolute inset-0 animate-pulse-slow opacity-20 bg-[linear-gradient(45deg,transparent,rgba(99,102,241,0.1),transparent)]" />
    </div>
  );
}