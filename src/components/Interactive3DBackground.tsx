import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Network Node Component - represents financial data consolidation points
const NetworkNode: React.FC<{
  position: THREE.Vector3;
  size: number;
  color: string;
  category: string;
  dataCount: number;
  isHighlighted: boolean;
  gravitationalPull: THREE.Vector3;
  onHover: (category: string) => void;
  onLeave: () => void;
}> = ({ position, size, color, category, dataCount, isHighlighted, gravitationalPull, onHover, onLeave }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Apply gravitational pull from cursor
      const pullStrength = 0.02;
      const currentPos = meshRef.current.position;
      const targetPos = new THREE.Vector3().addVectors(position, gravitationalPull.clone().multiplyScalar(pullStrength));
      currentPos.lerp(targetPos, 0.05);
      
      // Organic pulsing based on data activity
      const pulseIntensity = 1 + Math.sin(state.clock.elapsedTime * 2 + position.x) * 0.1;
      const activityScale = 1 + (dataCount * 0.02);
      meshRef.current.scale.setScalar(size * pulseIntensity * activityScale * (isHighlighted || hovered ? 1.2 : 1));
      
      // Gentle rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => {
          setHovered(true);
          onHover(category);
        }}
        onPointerLeave={() => {
          setHovered(false);
          onLeave();
        }}
      >
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHighlighted || hovered ? 0.6 : 0.3}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
        
        {/* Energy core */}
        <mesh scale={0.6}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Data activity rings */}
        {dataCount > 0 && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.05, 8, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        )}
      </mesh>
    </Float>
  );
};

// Adaptive Connection Pathway Component
const AdaptivePathway: React.FC<{
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  isActive: boolean;
  dataFlow: number;
  gravitationalField: THREE.Vector3;
}> = ({ start, end, color, isActive, dataFlow, gravitationalField }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  const points = useMemo(() => {
    // Create adaptive curved path influenced by gravitational field
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    midPoint.add(gravitationalField.clone().multiplyScalar(0.5));
    midPoint.y += 1; // Natural arc
    
    const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);
    return curve.getPoints(50);
  }, [start, end, gravitationalField]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (lineRef.current && isActive) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      const flowIntensity = 0.3 + dataFlow * 0.1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      material.opacity = Math.max(0.2, flowIntensity);
    }
  });

  if (!isActive) return null;

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.5}
        linewidth={2}
      />
    </line>
  );
};

// Expense Data Cluster - incoming financial data
const ExpenseCluster: React.FC<{
  startPosition: THREE.Vector3;
  targetNode: THREE.Vector3;
  color: string;
  category: string;
  speed: number;
  gravitationalPull: THREE.Vector3;
  onReachNode: (category: string) => void;
}> = ({ startPosition, targetNode, color, category, speed, gravitationalPull, onReachNode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);
  const [hasReached, setHasReached] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !hasReached) {
      setProgress(prev => Math.min(prev + speed, 1));
      
      // Adaptive routing influenced by gravitational field
      const baseTarget = new THREE.Vector3().lerpVectors(startPosition, targetNode, progress);
      const gravitationalInfluence = gravitationalPull.clone().multiplyScalar(0.3 * (1 - progress));
      const currentPos = baseTarget.add(gravitationalInfluence);
      
      // Add organic floating motion
      currentPos.y += Math.sin(state.clock.elapsedTime * 2 + startPosition.x) * 0.2;
      currentPos.x += Math.cos(state.clock.elapsedTime * 1.5 + startPosition.z) * 0.1;
      
      meshRef.current.position.copy(currentPos);
      
      // Rotation during travel
      meshRef.current.rotation.x += 0.05;
      meshRef.current.rotation.y += 0.03;
      
      // Check if reached target
      if (progress >= 0.95) {
        setHasReached(true);
        onReachNode(category);
      }
    }
  });

  if (hasReached) return null;

  return (
    <mesh ref={meshRef} position={startPosition}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
      
      {/* Cluster trail */}
      <mesh position={[0, 0, -0.5]} scale={0.7}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </mesh>
  );
};

// Central Consolidation Nexus
const ConsolidationNexus: React.FC<{
  position: THREE.Vector3;
  totalData: number;
  gravitationalPull: THREE.Vector3;
}> = ({ position, totalData, gravitationalPull }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Apply gravitational influence
      const targetPos = new THREE.Vector3().addVectors(position, gravitationalPull.clone().multiplyScalar(0.01));
      groupRef.current.position.lerp(targetPos, 0.03);
      
      // Rotation based on data activity
      groupRef.current.rotation.y += 0.008 + totalData * 0.0001;
    }
    
    if (coreRef.current) {
      // Pulsing based on consolidation activity
      const pulseIntensity = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      const activityScale = 1 + totalData * 0.001;
      coreRef.current.scale.setScalar(pulseIntensity * activityScale);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Central consolidation core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#4169E1"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Efficiency rings */}
      {[1.5, 2.5, 3.5].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
          <torusGeometry args={[radius, 0.08, 8, 32]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Consolidation beams */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 4;
        
        return (
          <mesh key={i} position={[x * 0.5, 0, z * 0.5]} rotation={[0, angle, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
            <meshStandardMaterial
              color="#00FF88"
              emissive="#00FF88"
              emissiveIntensity={0.4}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Gravitational Interaction Handler
const GravitationalHandler: React.FC<{
  onGravitationalChange: (pull: THREE.Vector3) => void;
}> = ({ onGravitationalChange }) => {
  const { camera, gl, size } = useThree();
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePosition(new THREE.Vector2(x, y));
      
      // Convert mouse position to 3D gravitational field
      const gravitationalPull = new THREE.Vector3(x * 2, y * 1, 0);
      onGravitationalChange(gravitationalPull);
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    return () => gl.domElement.removeEventListener('mousemove', handleMouseMove);
  }, [gl, onGravitationalChange]);

  useFrame((state) => {
    // Gentle camera orbit
    const time = state.clock.elapsedTime * 0.1;
    camera.position.x = Math.sin(time) * 12;
    camera.position.z = Math.cos(time) * 12;
    camera.position.y = 8 + Math.sin(time * 0.5) * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main Adaptive Network Scene
const AdaptiveNetworkScene: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [gravitationalField, setGravitationalField] = useState(new THREE.Vector3(0, 0, 0));
  const [nodeData, setNodeData] = useState<Map<string, number>>(new Map());
  const [expenseClusters, setExpenseClusters] = useState<Array<{
    id: number;
    startPosition: THREE.Vector3;
    targetNode: THREE.Vector3;
    color: string;
    category: string;
    speed: number;
  }>>([]);
  
  const nextClusterId = useRef(0);

  // Network nodes representing different financial categories
  const networkNodes = useMemo(() => [
    { position: new THREE.Vector3(-6, 2, -4), color: '#4169E1', category: 'Operations', size: 1 },
    { position: new THREE.Vector3(-2, 3, -6), color: '#00D4FF', category: 'Marketing', size: 1.2 },
    { position: new THREE.Vector3(3, 2.5, -5), color: '#FF007A', category: 'Travel', size: 0.9 },
    { position: new THREE.Vector3(6, 3, -3), color: '#00FF88', category: 'Technology', size: 1.3 },
    { position: new THREE.Vector3(-4, 2.8, 4), color: '#FFD700', category: 'Office', size: 1.1 },
    { position: new THREE.Vector3(2, 2.2, 6), color: '#8A2BE2', category: 'Legal', size: 1 },
    { position: new THREE.Vector3(5, 2.6, 4), color: '#FF6B6B', category: 'Entertainment', size: 0.8 },
  ], []);

  // Generate expense clusters
  useEffect(() => {
    const interval = setInterval(() => {
      const targetNode = networkNodes[Math.floor(Math.random() * networkNodes.length)];
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 5;
      const startPosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.random() * 6 + 2,
        Math.sin(angle) * radius
      );

      const newCluster = {
        id: nextClusterId.current++,
        startPosition,
        targetNode: targetNode.position,
        color: targetNode.color,
        category: targetNode.category,
        speed: 0.006 + Math.random() * 0.004,
      };

      setExpenseClusters(prev => [...prev, newCluster]);
    }, 400);

    return () => clearInterval(interval);
  }, [networkNodes]);

  const handleClusterReachNode = (clusterId: number, category: string) => {
    setExpenseClusters(prev => prev.filter(c => c.id !== clusterId));
    setNodeData(prev => {
      const newMap = new Map(prev);
      newMap.set(category, (newMap.get(category) || 0) + 1);
      return newMap;
    });
  };

  const totalDataProcessed = Array.from(nodeData.values()).reduce((sum, count) => sum + count, 0);

  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#4169E1" />
      <pointLight position={[-10, 10, -10]} intensity={0.6} color="#00D4FF" />
      <pointLight position={[0, 15, 0]} intensity={0.4} color="#FF007A" />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#00FF88" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.5}
        color="#FFFFFF"
      />

      {/* Gravitational Interaction */}
      <GravitationalHandler onGravitationalChange={setGravitationalField} />

      {/* Network Nodes */}
      {networkNodes.map((node) => (
        <NetworkNode
          key={node.category}
          position={node.position}
          size={node.size}
          color={node.color}
          category={node.category}
          dataCount={nodeData.get(node.category) || 0}
          isHighlighted={hoveredNode === node.category}
          gravitationalPull={gravitationalField}
          onHover={setHoveredNode}
          onLeave={() => setHoveredNode(null)}
        />
      ))}

      {/* Adaptive Pathways */}
      {networkNodes.map((node, i) => 
        networkNodes.slice(i + 1).map((otherNode, j) => (
          <AdaptivePathway
            key={`${node.category}-${otherNode.category}`}
            start={node.position}
            end={otherNode.position}
            color={node.color}
            isActive={hoveredNode === node.category || hoveredNode === otherNode.category}
            dataFlow={(nodeData.get(node.category) || 0) + (nodeData.get(otherNode.category) || 0)}
            gravitationalField={gravitationalField}
          />
        ))
      )}

      {/* Expense Clusters */}
      {expenseClusters.map((cluster) => (
        <ExpenseCluster
          key={cluster.id}
          startPosition={cluster.startPosition}
          targetNode={cluster.targetNode}
          color={cluster.color}
          category={cluster.category}
          speed={cluster.speed}
          gravitationalPull={gravitationalField}
          onReachNode={() => handleClusterReachNode(cluster.id, cluster.category)}
        />
      ))}

      {/* Central Consolidation Nexus */}
      <ConsolidationNexus
        position={new THREE.Vector3(0, 0, 0)}
        totalData={totalDataProcessed}
        gravitationalPull={gravitationalField}
      />

      {/* Atmospheric Effects */}
      <fog attach="fog" args={['#0a0a0a', 20, 50]} />
    </>
  );
};

const Interactive3DBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [12, 8, 12], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveNetworkScene />
      </Canvas>
    </div>
  );
};

export default Interactive3DBackground;