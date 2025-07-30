import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Expense Data Particle Component
const ExpenseParticle: React.FC<{
  startPosition: THREE.Vector3;
  targetCluster: THREE.Vector3;
  color: string;
  size: number;
  speed: number;
  category: string;
  onReachCluster: (category: string) => void;
}> = ({ startPosition, targetCluster, color, size, speed, category, onReachCluster }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hasReached, setHasReached] = useState(false);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (meshRef.current && !hasReached) {
      // Move particle towards cluster
      setProgress(prev => Math.min(prev + speed, 1));
      
      // Smooth curve path to cluster
      const currentPos = new THREE.Vector3().lerpVectors(startPosition, targetCluster, progress);
      currentPos.y += Math.sin(progress * Math.PI) * 2; // Arc trajectory
      
      meshRef.current.position.copy(currentPos);
      
      // Add subtle floating motion
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 3 + startPosition.x) * 0.1;
      
      // Rotation
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.01;
      
      // Check if reached cluster
      if (progress >= 0.95) {
        setHasReached(true);
        onReachCluster(category);
      }
    }
  });

  if (hasReached) return null;

  return (
    <mesh ref={meshRef} position={startPosition}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.8}
      />
      {/* Particle trail effect */}
      <mesh position={[0, 0, -0.3]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[size * 0.7, 6, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
    </mesh>
  );
};

// Data Cluster Component
const DataCluster: React.FC<{
  position: THREE.Vector3;
  color: string;
  category: string;
  particleCount: number;
  isHovered: boolean;
  onHover: (category: string) => void;
  onLeave: () => void;
}> = ({ position, color, category, particleCount, isHovered, onHover, onLeave }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      
      // Hover effects
      const targetScale = isHovered ? 1.2 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => onHover(category)}
      onPointerLeave={onLeave}
    >
      {/* Core cluster sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Orbiting particles around cluster */}
      {Array.from({ length: Math.min(particleCount, 8) }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.5) * 0.5;

        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.3}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        );
      })}

      {/* Category label (floating text effect) */}
      {isHovered && (
        <mesh position={[0, 2, 0]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  );
};

// Central Convergence Nexus
const ConvergenceNexus: React.FC<{
  clusteredData: Map<string, number>;
}> = ({ clusteredData }) => {
  const nexusRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (nexusRef.current) {
      nexusRef.current.rotation.y += 0.01;
    }
    
    if (coreRef.current) {
      const intensity = Math.max(clusteredData.size / 7, 0.5);
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2 * intensity);
    }
  });

  return (
    <group ref={nexusRef} position={[0, 0, 0]}>
      {/* Central core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#4169E1"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Energy rings */}
      {[1, 2, 3].map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[2 + i * 0.5, 0.05, 8, 32]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Data consolidation beams */}
      {Array.from(clusteredData.entries()).map(([category, count], i) => {
        const angle = (i / clusteredData.size) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={category} position={[x * 0.5, 0, z * 0.5]} rotation={[0, angle, 0]}>
            <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
            <meshStandardMaterial
              color="#00FF88"
              emissive="#00FF88"
              emissiveIntensity={0.3}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Data Stream Manager
const DataStreamManager: React.FC = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    startPosition: THREE.Vector3;
    targetCluster: THREE.Vector3;
    color: string;
    size: number;
    speed: number;
    category: string;
  }>>([]);
  
  const [clusteredData, setClusteredData] = useState<Map<string, number>>(new Map());
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);
  
  const nextParticleId = useRef(0);

  // Expense categories with their properties
  const expenseCategories = [
    { name: 'Travel', color: '#4169E1', position: new THREE.Vector3(-6, 2, -4) },
    { name: 'Office', color: '#00D4FF', position: new THREE.Vector3(-3, 3, -6) },
    { name: 'Marketing', color: '#FF007A', position: new THREE.Vector3(3, 2.5, -5) },
    { name: 'Technology', color: '#00FF88', position: new THREE.Vector3(6, 3, -3) },
    { name: 'Legal', color: '#FFD700', position: new THREE.Vector3(-4, 2.8, 4) },
    { name: 'Entertainment', color: '#8A2BE2', position: new THREE.Vector3(2, 2.2, 6) },
    { name: 'Operations', color: '#FF6B6B', position: new THREE.Vector3(5, 2.6, 4) },
  ];

  // Generate new expense particles
  useEffect(() => {
    const interval = setInterval(() => {
      const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + Math.random() * 3;
      const startPosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.random() * 4 + 1,
        Math.sin(angle) * radius
      );

      const newParticle = {
        id: nextParticleId.current++,
        startPosition,
        targetCluster: category.position,
        color: category.color,
        size: 0.1 + Math.random() * 0.1,
        speed: 0.008 + Math.random() * 0.004,
        category: category.name,
      };

      setParticles(prev => [...prev, newParticle]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleParticleReachCluster = (particleId: number, category: string) => {
    // Remove particle
    setParticles(prev => prev.filter(p => p.id !== particleId));
    
    // Update clustered data count
    setClusteredData(prev => {
      const newMap = new Map(prev);
      newMap.set(category, (newMap.get(category) || 0) + 1);
      return newMap;
    });
  };

  return (
    <>
      {/* Render flowing particles */}
      {particles.map((particle) => (
        <ExpenseParticle
          key={particle.id}
          startPosition={particle.startPosition}
          targetCluster={particle.targetCluster}
          color={particle.color}
          size={particle.size}
          speed={particle.speed}
          category={particle.category}
          onReachCluster={() => handleParticleReachCluster(particle.id, particle.category)}
        />
      ))}

      {/* Render data clusters */}
      {expenseCategories.map((category) => (
        <DataCluster
          key={category.name}
          position={category.position}
          color={category.color}
          category={category.name}
          particleCount={clusteredData.get(category.name) || 0}
          isHovered={hoveredCluster === category.name}
          onHover={setHoveredCluster}
          onLeave={() => setHoveredCluster(null)}
        />
      ))}

      {/* Central convergence nexus */}
      <ConvergenceNexus clusteredData={clusteredData} />
    </>
  );
};

// Main Data Stream Scene
const DataStreamScene: React.FC = () => {
  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#4169E1" />
      <pointLight position={[-10, 10, -10]} intensity={0.6} color="#00D4FF" />
      <pointLight position={[0, 15, 0]} intensity={0.4} color="#FF007A" />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#00FF88" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#FFFFFF"
        target-position={[0, 0, 0]}
      />

      {/* Data Stream Management */}
      <DataStreamManager />

      {/* Subtle Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={['#0a0a0a', 15, 40]} />
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
        <DataStreamScene />
      </Canvas>
    </div>
  );
};

export default Interactive3DBackground;