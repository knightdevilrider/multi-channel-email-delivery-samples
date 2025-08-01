import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, TrendingUp, QrCode } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface CardData {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  iconColor: string;
}

const cardData: CardData[] = [
  {
    icon: Mic,
    title: 'Voice Command',
    subtitle: 'Try voice-first expense management',
    iconColor: 'from-neon-blue to-neon-magenta'
  },
  {
    icon: TrendingUp,
    title: 'AI Insights',
    subtitle: 'Real-time predictive analytics for smarter financial decisions',
    iconColor: 'from-neon-magenta to-neon-blue'
  },
  {
    icon: QrCode,
    title: 'AR Experience',
    subtitle: 'Scan to experience your dashboard in augmented reality',
    iconColor: 'from-cyber-silver to-white'
  }
];

const InteractiveCards: React.FC = () => {
  const [animatingCard, setAnimatingCard] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const animationFrameRef = useRef<number>();

  const colors = ['#4169E1', '#FF007A', '#C0C0C0', '#00FFFF', '#FF69B4', '#9370DB'];

  const createParticles = (cardIndex: number) => {
    const canvas = canvasRefs.current[cardIndex];
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newParticles: Particle[] = [];
    
    // Create 30 particles for a vibrant burst
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 2 + Math.random() * 3;
      
      newParticles.push({
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 4,
        life: 1.0
      });
    }

    setParticles(newParticles);
  };

  const animateParticles = (cardIndex: number) => {
    const canvas = canvasRefs.current[cardIndex];
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prevParticles => {
        const updatedParticles = prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.98, // Slight deceleration
          vy: particle.vy * 0.98,
          life: particle.life - 0.02 // Fade out over time
        })).filter(particle => particle.life > 0);

        // Draw particles
        updatedParticles.forEach(particle => {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        if (updatedParticles.length > 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }

        return updatedParticles;
      });
    };

    animate();
  };

  const handleCardClick = (cardIndex: number) => {
    if (animatingCard !== null) return; // Prevent multiple animations

    setAnimatingCard(cardIndex);
    
    // Start particle animation after content fades out
    setTimeout(() => {
      createParticles(cardIndex);
      animateParticles(cardIndex);
    }, 200);

    // Reset after animation completes
    setTimeout(() => {
      setAnimatingCard(null);
      setParticles([]);
    }, 1200); // 200ms fade out + 800ms animation + 200ms delay
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          className="relative bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(65, 105, 225, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCardClick(index)}
        >
          {/* Canvas for particle animation */}
          <canvas
            ref={el => canvasRefs.current[index] = el}
            className="absolute inset-0 w-full h-full pointer-events-none"
            width={300}
            height={200}
            style={{ zIndex: 10 }}
          />

          {/* Card content */}
          <AnimatePresence>
            {animatingCard !== index && (
              <motion.div
                className="text-center relative z-20"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${card.iconColor} flex items-center justify-center`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                <p className="text-cyber-silver text-sm leading-relaxed">{card.subtitle}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content fade back in */}
          <AnimatePresence>
            {animatingCard === index && (
              <motion.div
                className="text-center relative z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 1.0 }} // Delay for animation to complete
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${card.iconColor} flex items-center justify-center`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                <p className="text-cyber-silver text-sm leading-relaxed">{card.subtitle}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-magenta/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </motion.div>
      ))}
    </div>
  );
};

export default InteractiveCards;