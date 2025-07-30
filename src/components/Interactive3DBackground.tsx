import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Octahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

// Central AI Brain Component
const AIBrainCore: React.FC = () => {
  const brainRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (brainRef.current) {
      // Breathing scale animation
      brainRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
    if (groupRef.current) {
      // Continuous rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central AI Brain */}
      <Sphere ref={brainRef} args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4169E1"
          emissive="#4169E1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Neural Network Nodes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;

        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[0.2, 16, 16]} position={[x, y, z]}>
              <meshStandardMaterial
                color="#FF007A"
                emissive="#FF007A"
                emissiveIntensity={0.5}
              />
            </Sphere>
          </Float>
        );
      })}

      {/* Neural Connections */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
              <meshStandardMaterial
                color="#00D4FF"
                emissive="#00D4FF"
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
              />
              <primitive
                object={new THREE.Mesh().lookAt(new THREE.Vector3(x, 0, z))}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Data Stream Particles
const DataStreamParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const dataTypes = [
      { color: '#4169E1', size: 0.1, type: 'receipts' },
      { color: '#FF007A', size: 0.15, type: 'voice' },
      { color: '#00FF88', size: 0.12, type: 'transactions' },
      { color: '#FFD700', size: 0.08, type: 'reports' }
    ];

    return Array.from({ length: 50 }).map((_, i) => {
      const dataType = dataTypes[i % 4];
      const angle = Math.random() * Math.PI * 2;
      const distance = 15 + Math.random() * 10;
      
      return {
        id: i,
        position: [
          Math.cos(angle) * distance,
          (Math.random() - 0.5) * 10,
          Math.sin(angle) * distance
        ] as [number, number, number],
        color: dataType.color,
        size: dataType.size,
        speed: 0.02 + Math.random() * 0.03,
        type: dataType.type
      };
    });
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        const mesh = child as THREE.Mesh;
        
        // Move towards center
        const direction = new THREE.Vector3(0, 0, 0).sub(mesh.position).normalize();
        mesh.position.add(direction.multiplyScalar(particle.speed));
        
        // Reset if too close to center
        if (mesh.position.length() < 2) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 15 + Math.random() * 10;
          mesh.position.set(
            Math.cos(angle) * distance,
            (Math.random() - 0.5) * 10,
            Math.sin(angle) * distance
          );
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle) => (
        <Sphere
          key={particle.id}
          args={[particle.size, 8, 8]}
          position={particle.position}
        >
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.4}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Storage Zones for Categorized Data
const StorageZones: React.FC = () => {
  const zones = [
    { position: [8, 3, 8], color: '#4169E1', type: 'Business' },
    { position: [-8, 3, 8], color: '#FF007A', type: 'Personal' },
    { position: [8, 3, -8], color: '#00FF88', type: 'Travel' },
    { position: [-8, 3, -8], color: '#FFD700', type: 'Operations' }
  ];

  return (
    <>
      {zones.map((zone, i) => (
        <Float key={i} speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={zone.position}>
            {/* Storage Container */}
            <Box args={[1.5, 1.5, 1.5]}>
              <meshStandardMaterial
                color={zone.color}
                emissive={zone.color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.3}
              />
            </Box>
            
            {/* Organized Data Shapes */}
            {Array.from({ length: 3 }).map((_, j) => (
              <Float key={j} speed={1 + j * 0.2} rotationIntensity={1} floatIntensity={0.3}>
                {j === 0 && (
                  <Box args={[0.2, 0.2, 0.2]} position={[0.5, 0.5, 0]}>
                    <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={0.3} />
                  </Box>
                )}
                {j === 1 && (
                  <Sphere args={[0.15, 8, 8]} position={[-0.5, 0.3, 0.3]}>
                    <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={0.3} />
                  </Sphere>
                )}
                {j === 2 && (
                  <Octahedron args={[0.18]} position={[0.2, -0.4, -0.4]}>
                    <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={0.3} />
                  </Octahedron>
                )}
              </Float>
            ))}
          </group>
        </Float>
      ))}
    </>
  );
};

// Main Interactive 3D Background Component
const Interactive3DBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4169E1" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#FF007A" />
        <pointLight position={[10, -10, 10]} intensity={0.6} color="#00FF88" />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#FFD700" />

        {/* Fog for Atmospheric Depth */}
        <fog attach="fog" args={['#0A0A0F', 20, 50]} />

        {/* Main Components */}
        <AIBrainCore />
        <DataStreamParticles />
        <StorageZones />

        {/* Gentle Camera Movement */}
        <CameraController />
      </Canvas>
    </div>
  );
};

// Camera Controller for Gentle Movement
const CameraController: React.FC = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.1) * 2;
    state.camera.position.y = 5 + Math.cos(time * 0.15) * 1;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

export default Interactive3DBackground;