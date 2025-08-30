import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animated Icon Components
const InstantAICaptureIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phone Frame */}
      <motion.div
        className="relative w-12 h-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-gray-600"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Screen */}
        <div className="absolute inset-1 bg-black rounded-md overflow-hidden">
          {/* Camera viewfinder */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Receipt being captured */}
          <motion.div
            className="absolute bottom-2 left-1 right-1 h-8 bg-white rounded-sm opacity-80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Receipt lines */}
            <div className="p-1 space-y-0.5">
              <div className="h-0.5 bg-gray-800 rounded w-3/4"></div>
              <div className="h-0.5 bg-gray-600 rounded w-1/2"></div>
              <div className="h-0.5 bg-gray-600 rounded w-2/3"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Camera flash effect */}
        <motion.div
          className="absolute inset-0 bg-white rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ delay: 1.5, duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.div>
      
      {/* AI Processing indicators */}
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 bg-neon-blue rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
      />
      
      {/* Data extraction lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-0.5 bg-neon-blue rounded-full"
          style={{
            right: -10,
            top: 20 + i * 4,
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 32, opacity: [0, 1, 0] }}
          transition={{
            delay: 2.5 + i * 0.2,
            duration: 1,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      ))}
    </div>
  );
};

const VoiceControlIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Microphone */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Mic body */}
        <div className="w-6 h-8 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full relative">
          {/* Mic grille */}
          <div className="absolute inset-x-2 top-2 bottom-2 bg-gray-800 rounded-full opacity-30"></div>
        </div>
        
        {/* Mic stand */}
        <div className="w-1 h-4 bg-gray-400 mx-auto"></div>
        <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
      </motion.div>
      
      {/* Sound waves */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-neon-magenta rounded-full"
          style={{
            width: 20 + i * 8,
            height: 20 + i * 8,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 0], 
            opacity: [0, 0.6, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Voice command text bubble */}
      <motion.div
        className="absolute -top-6 -right-8 bg-neon-magenta/20 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white border border-neon-magenta/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        "Add $50 coffee"
      </motion.div>
    </div>
  );
};

const UnifiedHubIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central hub */}
      <motion.div
        className="w-8 h-8 bg-gradient-to-br from-purple-500 to-neon-blue rounded-full relative z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-1 bg-white/20 rounded-full"></div>
      </motion.div>
      
      {/* Connected nodes */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `calc(50% + ${x}px - 8px)`,
              top: `calc(50% + ${y}px - 8px)`,
              background: ['#4169E1', '#FF007A', '#00ff88', '#ffd700', '#ff6b6b', '#8a2be2'][i]
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            {/* Connection lines */}
            <motion.div
              className="absolute w-0.5 bg-current opacity-30"
              style={{
                height: radius,
                left: '50%',
                top: '50%',
                transformOrigin: 'top',
                transform: `rotate(${180 + i * 60}deg) translateX(-50%)`
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Data flow particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            x: [0, 15, 0, -15, 0],
            y: [0, -15, 0, 15, 0],
            opacity: [0, 1, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const PredictiveInsightsIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Chart background */}
      <div className="relative w-12 h-10 bg-gradient-to-t from-gray-900/50 to-transparent rounded border border-gray-600/30">
        {/* Chart bars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 bg-gradient-to-t from-cyan-400 to-neon-blue rounded-t"
            style={{
              left: 2 + i * 2,
              width: 1.5,
            }}
            initial={{ height: 0 }}
            animate={{ 
              height: [0, (i + 1) * 6, (i + 2) * 4, (i + 1) * 7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Trend line */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 48 40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <motion.path
            d="M 4 32 Q 12 28 20 20 T 44 8"
            stroke="#FF007A"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>
      
      {/* AI brain indicator */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-neon-magenta to-purple-500 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="absolute inset-0.5 bg-white/30 rounded-full"></div>
      </motion.div>
      
      {/* Prediction arrows */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-0.5 bg-yellow-400 rounded-full"
          style={{
            right: -8,
            top: 12 + i * 6,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1 + i * 0.3
          }}
        />
      ))}
    </div>
  );
};

const OneTapOnboardingIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phone/Device */}
      <motion.div
        className="relative w-10 h-14 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-gray-600"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Screen */}
        <div className="absolute inset-1 bg-gradient-to-b from-blue-900 to-purple-900 rounded-md overflow-hidden">
          {/* Setup progress indicators */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-0.5 bg-neon-blue rounded-full"
              style={{ top: 8 + i * 4, left: 2 }}
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{
                delay: i * 0.5,
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
          
          {/* Checkmark animation */}
          <motion.div
            className="absolute bottom-2 right-2 w-3 h-3 border-2 border-green-400 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 2.5, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <motion.div
              className="w-1 h-1 bg-green-400 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7, repeat: Infinity, repeatDelay: 3.5 }}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Finger tap indicator */}
      <motion.div
        className="absolute w-4 h-5 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full"
        style={{ right: -2, bottom: 8 }}
        animate={{ 
          scale: [1, 0.9, 1],
          y: [0, 2, 0]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        {/* Tap ripple effect */}
        <motion.div
          className="absolute -inset-2 border-2 border-pink-400 rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      </motion.div>
      
      {/* Magic sparkles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: 8 + i * 8,
            top: 4 + i * 2
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 3 + i * 0.2
          }}
        />
      ))}
    </div>
  );
};

const benefits = [
  {
    AnimatedIcon: InstantAICaptureIcon,
    title: 'Instant AI Capture',
    description: 'Snap, speak, or sync receipts with lightning-fast AI recognition and categorization.',
    color: 'from-neon-blue to-cyan-400'
  },
  {
    AnimatedIcon: VoiceControlIcon,
    title: 'Voice-First Control',
    description: 'Command your finances naturally with advanced voice AI that understands business context.',
    color: 'from-neon-magenta to-pink-400'
  },
  {
    AnimatedIcon: UnifiedHubIcon,
    title: 'Unified Hub',
    description: 'Connect all accounts, cards, and platforms into one intelligent financial command center.',
    color: 'from-purple-500 to-neon-blue'
  },
  {
    AnimatedIcon: PredictiveInsightsIcon,
    title: 'Predictive Insights',
    description: 'AI-powered forecasting and trend analysis to optimize cash flow and growth strategies.',
    color: 'from-cyan-400 to-neon-magenta'
  },
  {
    AnimatedIcon: OneTapOnboardingIcon,
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
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} p-4 mb-6 cursor-pointer overflow-hidden`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <benefit.AnimatedIcon />
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