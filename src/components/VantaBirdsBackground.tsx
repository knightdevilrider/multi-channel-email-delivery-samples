import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Bird {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
  wingPhase: number;
}

const BirdsSystem: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const birdsRef = useRef<THREE.Group>(null);
  const birds = useRef<Bird[]>([]);
  const mouseInfluence = useRef(new THREE.Vector3());

  // Initialize birds
  useEffect(() => {
    birds.current = Array.from({ length: 50 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.02
      ),
      phase: Math.random() * Math.PI * 2,
      wingPhase: Math.random() * Math.PI * 2
    }));
  }, []);

  useFrame((state) => {
    if (!birdsRef.current) return;

    // Update mouse influence
    mouseInfluence.current.set(
      (mousePosition.x - 0.5) * 10,
      -(mousePosition.y - 0.5) * 5,
      0
    );

    birds.current.forEach((bird, index) => {
      const birdMesh = birdsRef.current?.children[index] as THREE.Group;
      if (!birdMesh) return;

      // Flocking behavior
      const separation = new THREE.Vector3();
      const alignment = new THREE.Vector3();
      const cohesion = new THREE.Vector3();
      let neighborCount = 0;

      birds.current.forEach((otherBird, otherIndex) => {
        if (index === otherIndex) return;
        
        const distance = bird.position.distanceTo(otherBird.position);
        
        if (distance < 2) {
          // Separation
          const diff = new THREE.Vector3().subVectors(bird.position, otherBird.position);
          diff.normalize();
          diff.divideScalar(distance);
          separation.add(diff);
          
          // Alignment and Cohesion
          alignment.add(otherBird.velocity);
          cohesion.add(otherBird.position);
          neighborCount++;
        }
      });

      if (neighborCount > 0) {
        alignment.divideScalar(neighborCount);
        cohesion.divideScalar(neighborCount);
        cohesion.sub(bird.position);
      }

      // Mouse attraction/repulsion
      const mouseDistance = bird.position.distanceTo(mouseInfluence.current);
      const mouseForce = new THREE.Vector3().subVectors(mouseInfluence.current, bird.position);
      
      if (mouseDistance < 5) {
        mouseForce.normalize();
        mouseForce.multiplyScalar(0.001);
      } else {
        mouseForce.multiplyScalar(0);
      }

      // Apply forces
      bird.velocity.add(separation.multiplyScalar(0.01));
      bird.velocity.add(alignment.multiplyScalar(0.005));
      bird.velocity.add(cohesion.multiplyScalar(0.005));
      bird.velocity.add(mouseForce);

      // Limit velocity
      if (bird.velocity.length() > 0.05) {
        bird.velocity.normalize().multiplyScalar(0.05);
      }

      // Update position
      bird.position.add(bird.velocity);

      // Boundary wrapping
      if (bird.position.x > 15) bird.position.x = -15;
      if (bird.position.x < -15) bird.position.x = 15;
      if (bird.position.y > 8) bird.position.y = -8;
      if (bird.position.y < -8) bird.position.y = 8;
      if (bird.position.z > 15) bird.position.z = -15;
      if (bird.position.z < -15) bird.position.z = 15;

      // Update bird mesh
      birdMesh.position.copy(bird.position);
      
      // Face movement direction
      if (bird.velocity.length() > 0.001) {
        birdMesh.lookAt(
          bird.position.x + bird.velocity.x,
          bird.position.y + bird.velocity.y,
          bird.position.z + bird.velocity.z
        );
      }

      // Wing animation
      bird.wingPhase += 0.3;
      const wingScale = 1 + Math.sin(bird.wingPhase) * 0.3;
      birdMesh.scale.set(wingScale, 1, wingScale);

      // Update phase for floating motion
      bird.phase += 0.02;
      bird.position.y += Math.sin(bird.phase) * 0.002;
    });
  });

  return (
    <group ref={birdsRef}>
      {birds.current.map((_, index) => (
        <group key={index}>
          {/* Bird body */}
          <mesh>
            <sphereGeometry args={[0.05, 8, 6]} />
            <meshBasicMaterial 
              color="#4169E1" 
              transparent 
              opacity={0.8}
            />
          </mesh>
          
          {/* Bird wings */}
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
            <planeGeometry args={[0.1, 0.03]} />
            <meshBasicMaterial 
              color="#FF007A" 
              transparent 
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <planeGeometry args={[0.1, 0.03]} />
            <meshBasicMaterial 
              color="#FF007A" 
              transparent 
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const VantaBirdsBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      });
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setMousePosition({
          x: event.touches[0].clientX / window.innerWidth,
          y: event.touches[0].clientY / window.innerHeight
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4169E1" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF007A" />
        
        <BirdsSystem mousePosition={mousePosition} />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#0a0a0a', 15, 25]} />
      </Canvas>
    </div>
  );
};

export default VantaBirdsBackground;