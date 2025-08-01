import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Icosahedron, Octahedron, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

// Network node component with gravitational response
const NetworkNode: React.FC<{ 
  position: [number, number, number]; 
  color: string; 
  size: number;
  mousePosition: THREE.Vector2;
}> = ({ position, color, size, mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [activity, setActivity] = useState(0);

  useFrame((state) => {
    if (meshRef.current && ringRef.current) {
      // Base floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      
      // Gravitational response to mouse
      const mouseInfluence = new THREE.Vector2(
        (mousePosition.x - 0.5) * 2,
        -(mousePosition.y - 0.5) * 2
      );
      
      const distance = Math.sqrt(
        Math.pow(meshRef.current.position.x - mouseInfluence.x * 5, 2) +
        Math.pow(meshRef.current.position.z - mouseInfluence.y * 5, 2)
      );
      
      const influence = Math.max(0, 1 - distance / 8);
      
      meshRef.current.position.x = position[0] + mouseInfluence.x * influence * 0.5;
      meshRef.current.position.z = position[2] + mouseInfluence.y * influence * 0.5;
      
      // Activity-based scaling
      const targetActivity = 0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.3 + influence * 0.5;
      setActivity(prev => THREE.MathUtils.lerp(prev, targetActivity, 0.05));
      
      meshRef.current.scale.setScalar(size * (1 + activity * 0.3));
      
      // Ring rotation
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      <Icosahedron ref={meshRef} args={[size]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3 + activity * 0.4}
          transparent
          opacity={0.8}
        />
      </Icosahedron>
      
      {/* Activity ring */}
      <mesh ref={ringRef} position={position}>
        <torusGeometry args={[size * 1.5, size * 0.1, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 + activity * 0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

// Expense cluster component
const ExpenseCluster: React.FC<{
  startPosition: [number, number, number];
  targetPosition: [number, number, number];
  color: string;
  delay: number;
  mousePosition: THREE.Vector2;
}> = ({ startPosition, targetPosition, color, delay, mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      const time = (state.clock.elapsedTime + delay) * 0.3;
      const newProgress = (Math.sin(time) + 1) * 0.5;
      setProgress(newProgress);

      // Curved path with gravitational influence
      const mouseInfluence = new THREE.Vector2(
        (mousePosition.x - 0.5) * 2,
        -(mousePosition.y - 0.5) * 2
      );

      const baseX = THREE.MathUtils.lerp(startPosition[0], targetPosition[0], newProgress);
      const baseY = THREE.MathUtils.lerp(startPosition[1], targetPosition[1], newProgress) + 
                   Math.sin(newProgress * Math.PI) * 2;
      const baseZ = THREE.MathUtils.lerp(startPosition[2], targetPosition[2], newProgress);

      // Apply gravitational pull
      const distance = Math.sqrt(
        Math.pow(baseX - mouseInfluence.x * 5, 2) +
        Math.pow(baseZ - mouseInfluence.y * 5, 2)
      );
      
      const influence = Math.max(0, 1 - distance / 10) * 0.3;
      
      meshRef.current.position.set(
        baseX + mouseInfluence.x * influence,
        baseY,
        baseZ + mouseInfluence.y * influence
      );

      meshRef.current.rotation.x = time;
      meshRef.current.rotation.y = time * 0.7;
    }
  });

  return (
    <Octahedron ref={meshRef} args={[0.2]} position={startPosition}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.7}
      />
    </Octahedron>
  );
};

// Central consolidation nexus
const ConsolidationNexus: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current && ring1Ref.current && ring2Ref.current && ring3Ref.current) {
      // Core pulsing
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      coreRef.current.scale.setScalar(pulse);

      // Gravitational response
      const mouseInfluence = new THREE.Vector2(
        (mousePosition.x - 0.5) * 0.5,
        -(mousePosition.y - 0.5) * 0.5
      );

      coreRef.current.position.x = mouseInfluence.x;
      coreRef.current.position.z = mouseInfluence.y;

      // Efficiency rings rotation
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring1Ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      ring2Ref.current.rotation.x = -state.clock.elapsedTime * 0.2;
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.4;
      
      ring3Ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      ring3Ref.current.rotation.z = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Central core */}
      <Dodecahedron ref={coreRef} args={[1.2]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4169E1"
          emissive="#4169E1"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </Dodecahedron>

      {/* Efficiency rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.05, 8, 32]} />
        <meshStandardMaterial
          color="#00FFFF"
          emissive="#00FFFF"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.03, 8, 32]} />
        <meshStandardMaterial
          color="#FF007A"
          emissive="#FF007A"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.5, 0.02, 8, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

const Interactive3DBackground: React.FC = () => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0.5, 0.5));

  // Network nodes configuration
  const networkNodes = useMemo(() => [
    { position: [-4, 2, -2] as [number, number, number], color: '#4169E1', size: 0.6, category: 'Operations' },
    { position: [4, 1, -3] as [number, number, number], color: '#FF007A', size: 0.5, category: 'Marketing' },
    { position: [-3, -2, 2] as [number, number, number], color: '#00FFFF', size: 0.7, category: 'Travel' },
    { position: [3, -1, 3] as [number, number, number], color: '#FFD700', size: 0.5, category: 'Technology' },
    { position: [0, 3, -4] as [number, number, number], color: '#9370DB', size: 0.6, category: 'Office' },
    { position: [-2, -3, -1] as [number, number, number], color: '#32CD32', size: 0.4, category: 'Legal' },
    { position: [2, 2, 4] as [number, number, number], color: '#FF6347', size: 0.5, category: 'Entertainment' },
  ], []);

  // Expense clusters flowing to nodes
  const expenseClusters = useMemo(() => {
    const clusters = [];
    networkNodes.forEach((node, nodeIndex) => {
      for (let i = 0; i < 3; i++) {
        const angle = (nodeIndex * 3 + i) * (Math.PI * 2 / 21);
        const radius = 8;
        clusters.push({
          startPosition: [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.5,
            Math.sin(angle * 2) * radius
          ] as [number, number, number],
          targetPosition: node.position,
          color: node.color,
          delay: (nodeIndex * 3 + i) * 0.5
        });
      }
    });
    return clusters;
  }, [networkNodes]);

  // Mouse tracking
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition(new THREE.Vector2(
        event.clientX / window.innerWidth,
        event.clientY / window.innerHeight
      ));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Camera orbit
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.1;
    camera.position.x = Math.cos(time) * 12;
    camera.position.z = Math.sin(time) * 12;
    camera.position.y = Math.sin(time * 0.5) * 3;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4169E1" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#FF007A" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#00FFFF" />
      <pointLight position={[10, -10, 0]} intensity={0.5} color="#FFD700" />

      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#0a0a0a', 8, 25]} />

      {/* Central consolidation nexus */}
      <ConsolidationNexus mousePosition={mousePosition} />

      {/* Network nodes */}
      {networkNodes.map((node, index) => (
        <NetworkNode
          key={index}
          position={node.position}
          color={node.color}
          size={node.size}
          mousePosition={mousePosition}
        />
      ))}

      {/* Expense clusters */}
      {expenseClusters.map((cluster, index) => (
        <ExpenseCluster
          key={index}
          startPosition={cluster.startPosition}
          targetPosition={cluster.targetPosition}
          color={cluster.color}
          delay={cluster.delay}
          mousePosition={mousePosition}
        />
      ))}

      {/* Consolidation beams */}
      {networkNodes.map((node, index) => (
        <mesh key={`beam-${index}`}>
          <cylinderGeometry args={[0.02, 0.02, 
            Math.sqrt(
              Math.pow(node.position[0], 2) + 
              Math.pow(node.position[1], 2) + 
              Math.pow(node.position[2], 2)
            ), 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
};

export default Interactive3DBackground;