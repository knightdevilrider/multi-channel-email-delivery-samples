import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mic, Play, QrCode, Star, TrendingUp } from 'lucide-react';
import InteractiveCards from './InteractiveCards';
import ThreeScene from './ThreeScene';

const HeroSection: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = [
    "Command Your Finances",
    "Conquer Chaos", 
    "Amplify Growth"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  return (
    <section 
      id="main-content"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ThreeScene />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/20 to-dark-bg z-10" />

      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="h-32 md:h-40 lg:h-48 flex items-center justify-center mb-8">
          <motion.h1
            key={currentPhrase}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-center"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            style={{
             background: 'linear-gradient(135deg, #4169E1, #FF007A, #4169E1, #FF007A)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {phrases[currentPhrase]}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-cyber-silver mb-12 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          The ultimate AI-powered finance management revolution for visionary entrepreneurs. 
          Transform chaos into clarity with voice-first commands and predictive intelligence.
        </motion.p>

        {/* Social Proof */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 mb-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-2 bg-card-bg backdrop-blur-sm rounded-full px-6 py-3 border border-neon-blue/20">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-cyber-silver">Trusted by 3,000+ visionary entrepreneurs</span>
          </div>
          <div className="flex items-center space-x-2 bg-card-bg backdrop-blur-sm rounded-full px-6 py-3 border border-neon-magenta/20">
            <TrendingUp className="w-5 h-5 text-neon-magenta" />
            <span className="text-cyber-silver">Savings Unlocked: $1.5M+</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          variants={itemVariants}
        >
          <motion.button
            className="group relative px-12 py-4 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full font-bold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Launch your financial revolution with ExpenseIQ"
            onClick={() => {
              // Particle explosion effect would go here
              console.log('Launch Your Financial Revolution!');
            }}
          >
            <span className="relative z-10">Launch Your Financial Revolution</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 px-8 py-4 border-2 border-neon-blue rounded-full font-semibold hover:bg-neon-blue/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Watch live demo of ExpenseIQ"
          >
            <Play className="w-5 h-5" />
            <span>Watch Live Demo</span>
          </motion.button>
        </motion.div>

        {/* Interactive Cards with Particle Animation */}
        <motion.div
          variants={itemVariants}
        >
          <InteractiveCards />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;