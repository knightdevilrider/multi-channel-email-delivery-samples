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
                    transform: `translate(-50%, -50%) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="group relative w-full h-full">
                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})` }} 
                    />
                    
                    {/* Card Content */}
                    <div className="relative bg-card-bg backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center">
                      {/* Icon */}
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} p-4 mb-6 mx-auto`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -10, 10, -10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <benefit.icon className="w-full h-full text-white" />
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-magenta group-hover:bg-clip-text transition-all duration-300 text-center">
                        {benefit.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-cyber-silver group-hover:text-white transition-colors duration-300 leading-relaxed text-center">
                        {benefit.description}
                      </p>

                      {/* Animated corner accent */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {benefits.map((_, index) => {
              const isActive = Math.abs((currentRotation / cardAngle) % benefits.length) === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentRotation(-index * cardAngle)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-neon-blue shadow-neon scale-125' 
                      : 'bg-cyber-silver/30 hover:bg-cyber-silver/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Instructions */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-cyber-silver text-sm">
              Click and drag to rotate • Swipe on mobile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;