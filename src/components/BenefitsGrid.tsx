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
  
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const radius = 300; // Distance from center
  const cardAngle = 360 / benefits.length; // 72 degrees for 5 cards

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setLastRotation(currentRotation);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const sensitivity = 0.5;
    const newRotation = lastRotation + (deltaX * sensitivity);
    setCurrentRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap to nearest card
    const nearestCard = Math.round(currentRotation / cardAngle) * cardAngle;
    setCurrentRotation(nearestCard);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setLastRotation(currentRotation);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStart.x;
    const sensitivity = 0.5;
    const newRotation = lastRotation + (deltaX * sensitivity);
    setCurrentRotation(newRotation);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap to nearest card
    const nearestCard = Math.round(currentRotation / cardAngle) * cardAngle;
    setCurrentRotation(nearestCard);
  };

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* 3D Carousel Container */}
        <div 
          ref={ref}
          className="relative h-[600px] flex items-center justify-center"
          style={{ perspective: '1000px' }}
        >
          <div
            ref={carouselRef}
            className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateY(${currentRotation}deg)`
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {benefits.map((benefit, index) => {
              const rotateY = index * cardAngle;
              const translateZ = radius;
              
              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-80 h-96"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${rotateY}deg) translateZ(${translateZ}px) rotateY(${-rotateY}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="group relative w-full h-full"
                  >
                    {/* Glow Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl group-hover:opacity-60 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})` }} 
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Futuristic Border Animation */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent"
                      style={{
                        background: `linear-gradient(45deg, ${benefit.color.split(' ')[1]}, transparent, ${benefit.color.split(' ')[3]}) border-box`,
                        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude'
                      }}
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Holographic Scan Lines */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                    >
                      <motion.div
                        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                        animate={{
                          y: [-20, 400]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.4
                        }}
                      />
                    </motion.div>

                    {/* Card Content */}
                    <motion.div 
                      className="relative bg-card-bg backdrop-blur-md rounded-2xl p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full flex flex-col justify-center overflow-hidden"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: `0 20px 40px rgba(65, 105, 225, 0.3)`
                      }}
                    >
                      {/* Neural Grid Background */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="border border-neon-blue/20"
                              animate={{
                                opacity: [0.1, 0.3, 0.1],
                                backgroundColor: [
                                  'rgba(65, 105, 225, 0.1)',
                                  'rgba(255, 0, 122, 0.1)',
                                  'rgba(65, 105, 225, 0.1)'
                                ]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.05
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Icon */}
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} p-4 mb-6 mx-auto`}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -15, 15, -15, 0],
                          boxShadow: `0 0 30px rgba(65, 105, 225, 0.6)`,
                          transition: { duration: 0.6 }
                        }}
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Icon Glow Effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-magenta opacity-50 blur-md"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                        <benefit.icon className="w-full h-full text-white" />
                      </motion.div>
                      
                      {/* Title */}
                      <motion.h3 
                        className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-magenta group-hover:bg-clip-text transition-all duration-500 text-center relative z-10"
                        animate={{
                          textShadow: [
                            '0 0 10px rgba(65, 105, 225, 0.3)',
                            '0 0 20px rgba(255, 0, 122, 0.3)',
                            '0 0 10px rgba(65, 105, 225, 0.3)'
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        {benefit.title}
                      </motion.h3>
                      
                      {/* Description */}
                      <motion.p 
                        className="text-cyber-silver group-hover:text-white transition-colors duration-500 leading-relaxed text-center relative z-10"
                        animate={{
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      >
                        {benefit.description}
                      </motion.p>

                      {/* Floating Particles */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-neon-blue rounded-full"
                          style={{
                            top: `${20 + i * 30}%`,
                            right: `${10 + i * 5}%`
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5
                          }}
                        />
                      ))}

                      {/* Data Stream Effect */}
                      <motion.div
                        className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-neon-magenta to-transparent"
                        animate={{
                          scaleX: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {benefits.map((_, index) => {
              const isActive = Math.abs((currentRotation / cardAngle) % benefits.length) === index;
              return (
                <motion.button
                  key={index}
                  onClick={() => setCurrentRotation(-index * cardAngle)}
                  className={`w-4 h-4 rounded-full transition-all duration-500 relative ${
                    isActive 
                      ? 'bg-neon-blue scale-125' 
                      : 'bg-cyber-silver/30 hover:bg-cyber-silver/60'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-neon-blue"
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(65, 105, 225, 0.5)',
                          '0 0 20px rgba(65, 105, 225, 0.8)',
                          '0 0 10px rgba(65, 105, 225, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Instructions */}
          <motion.div 
            className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <p className="text-cyber-silver text-sm font-mono bg-dark-bg/50 backdrop-blur-sm px-4 py-2 rounded-full border border-neon-blue/20">
              Click and drag to rotate • Swipe on mobile
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;