import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Financial Pillar/Mountain Structure Component
const FinancialStructure: React.FC<{
  position: THREE.Vector3;
  height: number;
  width: number;
  depth: number;
  color: string;
  category: string;
  isIlluminated: boolean;
  illuminationIntensity: number;
}> = ({ position, height, width, depth, color, category, isIlluminated, illuminationIntensity }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const topCapRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && topCapRef.current) {
      // Gentle floating animation
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.5 + position.x * 0.5) * 0.1;
      meshRef.current.position.y = position.y + floatOffset;
      topCapRef.current.position.y = position.y + height / 2 + 0.2 + floatOffset;
      
      // Illumination effects
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const capMaterial = topCapRef.current.material as THREE.MeshStandardMaterial;
      
      const targetIntensity = isIlluminated ? illuminationIntensity * 0.8 : 0.1;
      material.emissiveIntensity += (targetIntensity - material.emissiveIntensity) * 0.1;
      capMaterial.emissiveIntensity += (targetIntensity * 1.2 - capMaterial.emissiveIntensity) * 0.1;
      
      // Subtle rotation when illuminated
      if (isIlluminated) {
        meshRef.current.rotation.y += 0.005;
        topCapRef.current.rotation.y += 0.008;
      }
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group>
        {/* Main pillar structure */}
        <mesh
          ref={meshRef}
          position={position}
        >
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.1}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Glowing top cap */}
        <mesh
          ref={topCapRef}
          position={[position.x, position.y + height / 2 + 0.2, position.z]}
        >
          <cylinderGeometry args={[width * 0.6, width * 0.6, 0.4, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>
        
        {/* Energy core */}
        <mesh position={[position.x, position.y + height / 2 + 0.4, position.z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isIlluminated ? illuminationIntensity : 0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Energy Connection Line Component
const EnergyConnection: React.FC<{
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  isActive: boolean;
  intensity: number;
}> = ({ start, end, color, isActive, intensity }) => {
  const lineRef = useRef<THREE.Line>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const { points, particlePositions } = useMemo(() => {
    // Create curved path between structures
    const midPoint = new THREE.Vector3(
      (start.x + end.x) / 2,
      Math.max(start.y, end.y) + 1.5,
      (start.z + end.z) / 2
    );
    
    const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);
    const points = curve.getPoints(50);
    
    // Create particles along the path
    const particleCount = 20;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / (particleCount - 1);
      const point = curve.getPoint(t);
      particlePositions[i * 3] = point.x;
      particlePositions[i * 3 + 1] = point.y;
      particlePositions[i * 3 + 2] = point.z;
    }
    
    return { points, particlePositions };
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    return geometry;
  }, [particlePositions]);

  useFrame((state) => {
    if (lineRef.current && isActive) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2 * intensity;
    }
    
    if (particlesRef.current && isActive) {
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.3 * intensity;
      
      // Animate particles along the path
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const offset = Math.sin(state.clock.elapsedTime * 2 + i * 0.1) * 0.1;
        positions[i + 1] += offset * 0.1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!isActive) return null;

  return (
    <group>
      {/* Energy line */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          linewidth={2}
        />
      </line>
      
      {/* Energy particles */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          color={color}
          size={0.1}
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};

// Mouse Interaction Handler
const MouseInteractionHandler: React.FC<{
  onMouseMove: (position: THREE.Vector2) => void;
  structures: Array<{ position: THREE.Vector3; category: string }>;
}> = ({ onMouseMove, structures }) => {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      onMouseMove(new THREE.Vector2(x, y));
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    return () => gl.domElement.removeEventListener('mousemove', handleMouseMove);
  }, [gl, onMouseMove]);

  useFrame((state) => {
    // Gentle camera orbit
    const time = state.clock.elapsedTime * 0.1;
    camera.position.x = Math.sin(time) * 15;
    camera.position.z = Math.cos(time) * 15;
    camera.position.y = 8 + Math.sin(time * 0.5) * 2;
    camera.lookAt(0, 3, 0);
  });

  return null;
};

// Main Financial Landscape Scene
const FinancialLandscapeScene: React.FC = () => {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0));
  const [illuminatedStructures, setIlluminatedStructures] = useState<Set<string>>(new Set());

  // Financial structures representing different categories
  const financialStructures = useMemo(() => [
    {
      position: new THREE.Vector3(-8, 2, -6),
      height: 4,
      width: 2,
      depth: 2,
      color: '#4169E1',
      category: 'Operations',
    },
    {
      position: new THREE.Vector3(-3, 3, -8),
      height: 6,
      width: 1.8,
      depth: 1.8,
      color: '#00D4FF',
      category: 'Marketing',
    },
    {
      position: new THREE.Vector3(3, 1.5, -4),
      height: 3,
      width: 2.2,
      depth: 2.2,
      color: '#FF007A',
      category: 'Travel',
    },
    {
      position: new THREE.Vector3(8, 4, -7),
      height: 8,
      width: 1.5,
      depth: 1.5,
      color: '#00FF88',
      category: 'Technology',
    },
    {
      position: new THREE.Vector3(-6, 2.5, 2),
      height: 5,
      width: 1.9,
      depth: 1.9,
      color: '#FFD700',
      category: 'Office',
    },
    {
      position: new THREE.Vector3(0, 3.5, 6),
      height: 7,
      width: 1.7,
      depth: 1.7,
      color: '#8A2BE2',
      category: 'Legal',
    },
    {
      position: new THREE.Vector3(6, 2, 4),
      height: 4,
      width: 2.1,
      depth: 2.1,
      color: '#FF6B6B',
      category: 'Entertainment',
    },
  ], []);

  // Generate connections between nearby structures
  const connections = useMemo(() => {
    const connections = [];
    for (let i = 0; i < financialStructures.length; i++) {
      for (let j = i + 1; j < financialStructures.length; j++) {
        const distance = financialStructures[i].position.distanceTo(financialStructures[j].position);
        if (distance < 12) { // Only connect nearby structures
          connections.push({
            start: new THREE.Vector3(
              financialStructures[i].position.x,
              financialStructures[i].position.y + financialStructures[i].height / 2,
              financialStructures[i].position.z
            ),
            end: new THREE.Vector3(
              financialStructures[j].position.x,
              financialStructures[j].position.y + financialStructures[j].height / 2,
              financialStructures[j].position.z
            ),
            color: financialStructures[i].color,
            id: `${i}-${j}`,
          });
        }
      }
    }
    return connections;
  }, [financialStructures]);

  // Calculate illumination based on mouse position
  useEffect(() => {
    const illuminated = new Set<string>();
    const mouseWorld = new THREE.Vector3(mousePosition.x * 10, 0, mousePosition.y * 10);
    
    financialStructures.forEach((structure, index) => {
      const distance = structure.position.distanceTo(mouseWorld);
      if (distance < 8) {
        illuminated.add(structure.category);
      }
    });
    
    setIlluminatedStructures(illuminated);
  }, [mousePosition, financialStructures]);

  // Calculate illumination intensity based on mouse proximity
  const getIlluminationIntensity = (structure: any) => {
    const mouseWorld = new THREE.Vector3(mousePosition.x * 10, 0, mousePosition.y * 10);
    const distance = structure.position.distanceTo(mouseWorld);
    return Math.max(0, 1 - distance / 8);
  };

  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      
      {/* Colored point lights for atmosphere */}
      <pointLight position={[-10, 8, -10]} intensity={0.8} color="#4169E1" />
      <pointLight position={[10, 8, 10]} intensity={0.8} color="#00D4FF" />
      <pointLight position={[0, 12, 0]} intensity={0.6} color="#FF007A" />

      {/* Financial structures */}
      {financialStructures.map((structure, index) => (
        <FinancialStructure
          key={index}
          position={structure.position}
          height={structure.height}
          width={structure.width}
          depth={structure.depth}
          color={structure.color}
          category={structure.category}
          isIlluminated={illuminatedStructures.has(structure.category)}
          illuminationIntensity={getIlluminationIntensity(structure)}
        />
      ))}

      {/* Energy connections */}
      {connections.map((connection, index) => (
        <EnergyConnection
          key={index}
          start={connection.start}
          end={connection.end}
          color={connection.color}
          isActive={illuminatedStructures.size > 0}
          intensity={Math.min(1, illuminatedStructures.size / 3)}
        />
      ))}

      {/* Mouse interaction handler */}
      <MouseInteractionHandler
        onMouseMove={setMousePosition}
        structures={financialStructures}
      />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#0a0a0a', 10, 50]} />
    </>
  );
};

// Main Interactive 3D Background Component
const Interactive3DBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [15, 8, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <FinancialLandscapeScene />
      </Canvas>
    </div>
  );
};

export default Interactive3DBackground;