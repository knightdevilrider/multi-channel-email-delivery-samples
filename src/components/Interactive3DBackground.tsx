import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Financial Pillar Component
const FinancialPillar: React.FC<{
  position: THREE.Vector3;
  height: number;
  category: string;
  color: string;
  mousePosition: THREE.Vector2;
  onConnect: (position: THREE.Vector3) => void;
}> = ({ position, height, category, color, mousePosition, onConnect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [isActive, setIsActive] = useState(false);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Calculate distance from mouse
      const screenPosition = position.clone().project(state.camera);
      const mouseDistance = mousePosition.distanceTo(new THREE.Vector2(screenPosition.x, screenPosition.y));
      
      // Activate if mouse is close
      const shouldActivate = mouseDistance < 0.3;
      if (shouldActivate !== isActive) {
        setIsActive(shouldActivate);
        if (shouldActivate) {
          onConnect(position);
        }
      }

      // Animate based on activation
      const targetIntensity = shouldActivate ? 2.0 : 0.5;
      const targetScale = shouldActivate ? 1.1 : 1.0;
      
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        targetIntensity,
        0.1
      );

      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      );

      // Gentle floating animation
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh position={[0, height / 2, 0]} scale={[1.2, height * 1.1, 1.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.2 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Energy Connection Line Component
const EnergyLine: React.FC<{
  start: THREE.Vector3;
  end: THREE.Vector3;
  active: boolean;
}> = ({ start, end, active }) => {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      start,
      new THREE.Vector3(
        (start.x + end.x) / 2,
        Math.max(start.y, end.y) + 2,
        (start.z + end.z) / 2
      ),
      end
    ]);
    return curve.getPoints(50);
  }, [start, end]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  useFrame((state) => {
    if (materialRef.current) {
      const targetOpacity = active ? 0.8 : 0.0;
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        targetOpacity,
        0.1
      );

      // Animated glow effect
      if (active) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
        materialRef.current.opacity = targetOpacity * pulse;
      }
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color="#00ffff"
        transparent
        opacity={0}
        linewidth={2}
      />
    </line>
  );
};

// Floating Data Particles
const DataParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current && materialRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      materialRef.current.opacity = pulse * 0.6;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#4169E1"
        size={0.1}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Ground Grid Component
const GroundGrid: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const gridRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const gridShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      mousePos: { value: new THREE.Vector2(0, 0) },
      color1: { value: new THREE.Color('#4169E1') },
      color2: { value: new THREE.Color('#00ff88') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 mousePos;
      uniform vec3 color1;
      uniform vec3 color2;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        // Grid pattern
        vec2 grid = abs(fract(vUv * 20.0) - 0.5);
        float line = smoothstep(0.0, 0.02, min(grid.x, grid.y));
        
        // Mouse interaction
        float mouseDist = distance(vUv, mousePos * 0.5 + 0.5);
        float mouseEffect = exp(-mouseDist * 3.0) * 0.8;
        
        // AI pulse
        float pulse = sin(time * 1.5) * 0.2 + 0.8;
        
        // Color mixing
        vec3 color = mix(color1, color2, sin(time + vUv.x * 3.0) * 0.5 + 0.5);
        
        float intensity = (1.0 - line) * pulse + mouseEffect;
        gl_FragColor = vec4(color * intensity, intensity * 0.4);
      }
    `
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.mousePos.value = mousePosition;
    }
  });

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        {...gridShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Mouse Interaction Handler
const MouseHandler: React.FC<{
  onMouseMove: (position: THREE.Vector2) => void;
}> = ({ onMouseMove }) => {
  const { gl, camera } = useThree();

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

  // Gentle camera movement
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x += (Math.sin(time * 0.1) * 2 - camera.position.x) * 0.02;
    camera.position.z += (Math.cos(time * 0.08) * 3 - camera.position.z) * 0.02;
    camera.lookAt(0, 2, 0);
  });

  return null;
};

// Main Scene Component
const FinancialLandscapeScene: React.FC = () => {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0));
  const [activeConnections, setActiveConnections] = useState<Array<{
    start: THREE.Vector3;
    end: THREE.Vector3;
    id: number;
  }>>([]);
  const [nextConnectionId, setNextConnectionId] = useState(0);

  // Financial categories with positions and colors
  const financialPillars = useMemo(() => [
    { position: new THREE.Vector3(-8, 2, -6), height: 4, category: 'Revenue', color: '#00ff88' },
    { position: new THREE.Vector3(-4, 1.5, -8), height: 3, category: 'Marketing', color: '#4169E1' },
    { position: new THREE.Vector3(0, 3, -4), height: 6, category: 'Operations', color: '#8a2be2' },
    { position: new THREE.Vector3(4, 2.5, -6), height: 5, category: 'Technology', color: '#00ffff' },
    { position: new THREE.Vector3(8, 1.8, -8), height: 3.6, category: 'HR', color: '#ff6b6b' },
    { position: new THREE.Vector3(-6, 2.2, 2), height: 4.4, category: 'Finance', color: '#ffd700' },
    { position: new THREE.Vector3(-2, 1.2, 4), height: 2.4, category: 'Legal', color: '#ff69b4' },
    { position: new THREE.Vector3(2, 2.8, 6), height: 5.6, category: 'Sales', color: '#32cd32' },
    { position: new THREE.Vector3(6, 1.6, 4), height: 3.2, category: 'Support', color: '#ff4500' },
  ], []);

  const handleConnection = (position: THREE.Vector3) => {
    // Create connections to nearby pillars
    const nearbyPillars = financialPillars.filter(pillar => 
      pillar.position.distanceTo(position) < 8 && pillar.position !== position
    );

    const newConnections = nearbyPillars.slice(0, 2).map(pillar => ({
      start: position,
      end: pillar.position,
      id: nextConnectionId + Math.random()
    }));

    setActiveConnections(prev => [...prev, ...newConnections]);
    setNextConnectionId(prev => prev + newConnections.length);

    // Remove old connections after 3 seconds
    setTimeout(() => {
      setActiveConnections(prev => 
        prev.filter(conn => !newConnections.some(newConn => newConn.id === conn.id))
      );
    }, 3000);
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#4169E1" />
      <pointLight position={[-10, 10, -10]} intensity={0.6} color="#00ff88" />
      <pointLight position={[0, 15, 0]} intensity={0.4} color="#8a2be2" />

      {/* Ground Grid */}
      <GroundGrid mousePosition={mousePosition} />

      {/* Financial Pillars */}
      {financialPillars.map((pillar, index) => (
        <FinancialPillar
          key={index}
          position={pillar.position}
          height={pillar.height}
          category={pillar.category}
          color={pillar.color}
          mousePosition={mousePosition}
          onConnect={handleConnection}
        />
      ))}

      {/* Energy Connections */}
      {activeConnections.map((connection) => (
        <EnergyLine
          key={connection.id}
          start={connection.start}
          end={connection.end}
          active={true}
        />
      ))}

      {/* Floating Data Particles */}
      <DataParticles />

      {/* Mouse Interaction */}
      <MouseHandler onMouseMove={setMousePosition} />
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
        <FinancialLandscapeScene />
      </Canvas>
    </div>
  );
};

export default Interactive3DBackground;