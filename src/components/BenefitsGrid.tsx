import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Mic, BarChart3, Network, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Instant AI Capture',
    description: 'Snap, speak, or sync receipts with lightning-fast AI recognition and categorization.',
    color: 'from-neon-blue to-cyan-400'
  },
  {
    icon: Mic,
    title: 'Voice-First Control',
    description: 'Command your finances naturally with advanced voice AI that understands business context.',
    color: 'from-neon-magenta to-pink-400'
  },
  {
    icon: Network,
    title: 'Unified Hub',
    description: 'Connect all accounts, cards, and platforms into one intelligent financial command center.',
    color: 'from-purple-500 to-neon-blue'
  },
  {
    icon: BarChart3,
    title: 'Predictive Insights',
    description: 'AI-powered forecasting and trend analysis to optimize cash flow and growth strategies.',
    color: 'from-cyan-400 to-neon-magenta'
  },
  {
    icon: Sparkles,
    title: 'One-Tap Onboarding',
    description: 'Get started in seconds with intelligent setup that learns your business patterns instantly.',
    color: 'from-yellow-400 to-neon-blue'
  }
];

const BenefitsGrid: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const calculateIconPosition = (index: number) => {
    const baseX = 0;
    const baseY = 0;
    
    // Calculate distance from mouse
    const iconElement = document.querySelector(`[data-icon-index="${index}"]`) as HTMLElement;
    if (!iconElement) return { x: baseX, y: baseY };
    
    const iconRect = iconElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: baseX, y: baseY };
    
    const iconCenterX = iconRect.left + iconRect.width / 2 - containerRect.left;
    const iconCenterY = iconRect.top + iconRect.height / 2 - containerRect.top;
    
    const distanceX = mousePosition.x - iconCenterX;
    const distanceY = mousePosition.y - iconCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If mouse is close (within 150px), make icon run away
    if (distance < 150 && distance > 0) {
      const force = Math.max(0, (150 - distance) / 150);
      const pushX = -(distanceX / distance) * force * 30;
      const pushY = -(distanceY / distance) * force * 30;
      
      return {
        x: Math.max(-20, Math.min(20, pushX)),
        y: Math.max(-20, Math.min(20, pushY))
      };
    }
    
    return { x: baseX, y: baseY };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-dark-bg" id="features" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
            Unite Your Financial Empire
          </h2>
          <p className="text-xl text-cyber-silver max-w-3xl mx-auto">
            Five revolutionary capabilities that transform financial chaos into entrepreneurial mastery
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-300"
                   style={{ background: `linear-gradient(135deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})` }} />
              
              <div className="relative bg-card-bg backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full">
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} p-4 mb-6 cursor-pointer`}
                  data-icon-index={index}
                  animate={calculateIconPosition(index)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.5
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <benefit.icon className="w-full h-full text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-magenta group-hover:bg-clip-text transition-all duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-cyber-silver group-hover:text-white transition-colors duration-300 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Animated corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsGrid;