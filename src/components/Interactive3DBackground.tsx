import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// AI Data Particle Component
const DataParticle: React.FC<{
  position: THREE.Vector3;
  targetPosition: THREE.Vector3;
  color: string;
  size: number;
  speed: number;
  onReachTarget: () => void;
}> = ({ position, targetPosition, color, size, speed, onReachTarget }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !hasReachedTarget) {
      // Move particle towards the central nexus
      const direction = targetPosition.clone().sub(meshRef.current.position).normalize();
      meshRef.current.position.add(direction.multiplyScalar(speed));
      
      // Check if reached target
      const distance = meshRef.current.position.distanceTo(targetPosition);
      if (distance < 1) {
        setHasReachedTarget(true);
        onReachTarget();
      }
      
      // Add subtle floating motion
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position.x) * 0.01;
    }
  });

  if (hasReachedTarget) return null;

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Organized Data Cluster Component
const DataCluster: React.FC<{
  position: THREE.Vector3;
  color: string;
  shape: 'cube' | 'sphere' | 'octahedron';
  category: string;
}> = ({ position, color, shape, category }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.2;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.6, 16, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [shape]);

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

// Central AI Nexus Brain Component
const AIBrain: React.FC<{ onParticleAbsorbed: (category: string) => void }> = ({ onParticleAbsorbed }) => {
  const brainRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.005;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group ref={brainRef} position={[0, 2, 0]}>
      {/* Central Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#4169E1"
          emissive="#4169E1"
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Neural Network Nodes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.5) * 1;

        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.3}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.4}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        );
      })}

      {/* Neural Connections */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={`connection-${i}`} position={[x * 0.5, 0, z * 0.5]} rotation={[0, angle, 0]}>
            <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Storage Zone Component
const StorageZone: React.FC<{
  position: THREE.Vector3;
  color: string;
  category: string;
}> = ({ position, color, category }) => {
  const zoneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (zoneRef.current) {
      zoneRef.current.material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime + position.x) * 0.05;
    }
  });

  return (
    <mesh ref={zoneRef} position={position}>
      <boxGeometry args={[4, 0.1, 4]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

// Data Stream Manager Component
const DataStreamManager: React.FC = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    position: THREE.Vector3;
    color: string;
    size: number;
    speed: number;
    category: string;
  }>>([]);
  
  const [clusters, setClusters] = useState<Array<{
    id: number;
    position: THREE.Vector3;
    color: string;
    shape: 'cube' | 'sphere' | 'octahedron';
    category: string;
  }>>([]);

  const nextParticleId = useRef(0);
  const nextClusterId = useRef(0);

  const dataTypes = [
    { color: '#4169E1', category: 'receipts', shape: 'cube' as const },
    { color: '#FF007A', category: 'voice', shape: 'sphere' as const },
    { color: '#00ff88', category: 'transactions', shape: 'octahedron' as const },
    { color: '#ffd700', category: 'reports', shape: 'cube' as const },
  ];

  const storagePositions = [
    new THREE.Vector3(-8, -2, -8),
    new THREE.Vector3(8, -2, -8),
    new THREE.Vector3(-8, -2, 8),
    new THREE.Vector3(8, -2, 8),
  ];

  // Generate new particles
  useEffect(() => {
    const interval = setInterval(() => {
      const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 5;
      const startPosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.random() * 4 - 2,
        Math.sin(angle) * radius
      );

      const newParticle = {
        id: nextParticleId.current++,
        position: startPosition,
        color: dataType.color,
        size: 0.1 + Math.random() * 0.1,
        speed: 0.05 + Math.random() * 0.03,
        category: dataType.category,
      };

      setParticles(prev => [...prev, newParticle]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleParticleAbsorbed = (particleId: number, category: string) => {
    // Remove the particle
    setParticles(prev => prev.filter(p => p.id !== particleId));

    // Create a new organized cluster
    const dataType = dataTypes.find(dt => dt.category === category) || dataTypes[0];
    const storageIndex = dataTypes.findIndex(dt => dt.category === category);
    const targetPosition = storagePositions[storageIndex] || storagePositions[0];
    
    // Add some randomness to the final position
    const finalPosition = targetPosition.clone().add(
      new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        Math.random() * 2,
        (Math.random() - 0.5) * 3
      )
    );

    const newCluster = {
      id: nextClusterId.current++,
      position: finalPosition,
      color: dataType.color,
      shape: dataType.shape,
      category: category,
    };

    setClusters(prev => [...prev, newCluster]);

    // Remove old clusters to prevent memory issues
    setTimeout(() => {
      setClusters(prev => prev.filter(c => c.id !== newCluster.id));
    }, 10000);
  };

  return (
    <>
      {/* Render particles */}
      {particles.map((particle) => (
        <DataParticle
          key={particle.id}
          position={particle.position}
          targetPosition={new THREE.Vector3(0, 2, 0)}
          color={particle.color}
          size={particle.size}
          speed={particle.speed}
          onReachTarget={() => handleParticleAbsorbed(particle.id, particle.category)}
        />
      ))}

      {/* Render organized clusters */}
      {clusters.map((cluster) => (
        <DataCluster
          key={cluster.id}
          position={cluster.position}
          color={cluster.color}
          shape={cluster.shape}
          category={cluster.category}
        />
      ))}

      {/* Storage zones */}
      {storagePositions.map((position, index) => (
        <StorageZone
          key={index}
          position={position}
          color={dataTypes[index].color}
          category={dataTypes[index].category}
        />
      ))}
    </>
  );
};

// Mouse Interaction Handler
const MouseHandler: React.FC = () => {
  const { camera } = useThree();

  useFrame((state) => {
    // Gentle camera movement
    const time = state.clock.elapsedTime;
    camera.position.x += (Math.sin(time * 0.1) * 2 - camera.position.x) * 0.02;
    camera.position.z += (Math.cos(time * 0.08) * 3 - camera.position.z) * 0.02;
    camera.lookAt(0, 2, 0);
  });

  return null;
};

// Main Scene Component
const AIDataNexusScene: React.FC = () => {
  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#4169E1" />
      <pointLight position={[-10, 10, -10]} intensity={0.6} color="#00ffff" />
      <pointLight position={[0, 15, 0]} intensity={0.4} color="#FF007A" />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#00ff88" />

      {/* Central AI Brain */}
      <AIBrain onParticleAbsorbed={() => {}} />

      {/* Data Stream Management */}
      <DataStreamManager />

      {/* Mouse Interaction */}
      <MouseHandler />

      {/* Ambient Fog */}
      <fog attach="fog" args={['#0a0a0a', 10, 50]} />
    </>
  );
};

const Interactive3DBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 8, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <AIDataNexusScene />
      </Canvas>
    </div>
  );
};

export default Interactive3DBackground;