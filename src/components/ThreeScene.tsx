import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4169E1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF007A" />

      <group ref={groupRef}>
        {/* Central AI Core */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere ref={sphereRef} args={[2, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#4169E1"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        {/* Orbiting Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere
              args={[0.2, 16, 16]}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 5,
                Math.sin((i / 8) * Math.PI * 2) * 2,
                Math.sin((i / 8) * Math.PI * 2) * 3
              ]}
            >
              <meshStandardMaterial
                color={i % 2 === 0 ? "#FF007A" : "#C0C0C0"}
                emissive={i % 2 === 0 ? "#FF007A" : "#C0C0C0"}
                emissiveIntensity={0.3}
              />
            </Sphere>
          </Float>
        ))}
      </group>

      {/* Background particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={`particle-${i}`}
          args={[0.02, 8, 8]}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
        >
          <meshStandardMaterial
            color="#4169E1"
            emissive="#4169E1"
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </>
  );
};

export default ThreeScene;