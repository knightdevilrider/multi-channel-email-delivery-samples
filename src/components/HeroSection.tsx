import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mic, Play, QrCode, Star, TrendingUp } from 'lucide-react';
import VoiceDemo from './VoiceDemo';
import ThreeScene from './ThreeScene';

const HeroSection: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
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

        {/* Interactive Elements */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {/* Voice Demo */}
          <motion.div
            className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-neon-blue/20 cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveDemo('voice')}
          >
            {activeDemo === 'voice' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 to-neon-magenta/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Futuristic Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent animate-pulse" 
                       style={{ 
                         backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(65, 105, 225, 0.3) 50%, transparent 100%)',
                         backgroundSize: '200% 100%',
                         animation: 'gradient-shift 2s ease-in-out infinite'
                       }} />
                  <div className="grid grid-cols-8 grid-rows-6 h-full w-full gap-1 p-4">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="border border-neon-blue/20 rounded-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.05,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Holographic Particles */}
                <div className="absolute inset-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-neon-blue rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-20, -40, -20],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-magenta flex items-center justify-center relative"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                      boxShadow: [
                        "0 0 20px rgba(65, 105, 225, 0.5), 0 0 40px rgba(255, 0, 122, 0.3)",
                        "0 0 40px rgba(255, 0, 122, 0.8), 0 0 80px rgba(65, 105, 225, 0.5)",
                        "0 0 20px rgba(65, 105, 225, 0.5), 0 0 40px rgba(255, 0, 122, 0.3)"
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Orbital Rings */}
                    <motion.div
                      className="absolute inset-0 border-2 border-neon-blue/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-2 border border-neon-magenta/30 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <Mic className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    VOICE NEURAL LINK ACTIVE
                  </motion.h3>
                  <motion.p 
                    className="text-neon-blue mb-4 font-mono text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    > PROCESSING: "Add $50 coffee to marketing"
                    <motion.span
                      className="inline-block ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  </motion.p>
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full text-white font-bold text-sm tracking-wider border border-white/20 hover:border-white/40 transition-all duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(65, 105, 225, 0.5)"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDemo(null);
                    }}
                  >
                    INITIALIZE NEURAL INTERFACE
                  </motion.button>
                </div>
              </motion.div>
            )}
            <motion.div
              animate={{ 
                opacity: activeDemo === 'voice' ? 0.1 : 1,
                scale: activeDemo === 'voice' ? 0.95 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <VoiceDemo />
            </motion.div>
          </motion.div>

          {/* AI Showcase */}
          <motion.div
            className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-neon-magenta/20 cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveDemo('ai')}
          >
            {activeDemo === 'ai' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-magenta/30 to-neon-blue/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Neural Network Background */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-neon-magenta/30 rounded-full"
                      style={{
                        width: `${(i + 1) * 60}px`,
                        height: `${(i + 1) * 60}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Data Stream Lines */}
                <div className="absolute inset-0">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-px bg-gradient-to-r from-transparent via-neon-magenta to-transparent"
                      style={{
                        width: '100%',
                        top: `${10 + i * 10}%`,
                        left: 0
                      }}
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-neon-magenta to-neon-blue flex items-center justify-center relative"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotateY: [0, 180, 360],
                      boxShadow: [
                        "0 0 20px rgba(255, 0, 122, 0.5)",
                        "0 0 60px rgba(255, 0, 122, 0.8), 0 0 80px rgba(65, 105, 225, 0.4)",
                        "0 0 20px rgba(255, 0, 122, 0.5)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* AI Processing Indicators */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon-blue rounded-full animate-ping" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-neon-magenta rounded-full animate-pulse" />
                    <TrendingUp className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-neon-magenta to-neon-blue bg-clip-text text-transparent"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    QUANTUM AI PROCESSING
                  </motion.h3>
                  <motion.p 
                    className="text-neon-magenta mb-4 font-mono text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    > NEURAL PREDICTION: 23% cost optimization detected
                    <motion.div
                      className="w-full bg-neon-magenta/20 h-1 rounded-full mt-2 overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-neon-magenta to-neon-blue"
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.p>
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-neon-magenta to-neon-blue rounded-full text-white font-bold text-sm tracking-wider border border-white/20 hover:border-white/40 transition-all duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(255, 0, 122, 0.5)"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDemo(null);
                    }}
                  >
                    ACCESS QUANTUM INSIGHTS
                  </motion.button>
                </div>
              </motion.div>
            )}
            <motion.div 
              className="text-center"
              animate={{ 
                opacity: activeDemo === 'ai' ? 0.1 : 1,
                scale: activeDemo === 'ai' ? 0.95 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-magenta to-neon-blue flex items-center justify-center animate-pulse-neon">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
              <p className="text-cyber-silver text-sm">Real-time predictive analytics for smarter financial decisions</p>
            </motion.div>
          </motion.div>

          {/* AR Portal */}
          <motion.div
            className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-cyber-silver/20 cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveDemo('ar')}
          >
            {activeDemo === 'ar' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 to-cyber-silver/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Holographic Scan Lines */}
                <div className="absolute inset-0 opacity-30">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                      style={{ top: `${i * 5}%` }}
                      animate={{
                        opacity: [0, 1, 0],
                        scaleX: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* AR Portal Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border-2 border-neon-blue/40 rounded-2xl"
                      style={{
                        width: `${100 + i * 20}px`,
                        height: `${100 + i * 20}px`,
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-neon-blue to-cyber-silver flex items-center justify-center relative"
                    animate={{ 
                      rotateY: [0, 180, 360],
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 20px rgba(65, 105, 225, 0.5)",
                        "0 0 40px rgba(65, 105, 225, 0.8), 0 0 60px rgba(192, 192, 192, 0.4)",
                        "0 0 20px rgba(65, 105, 225, 0.5)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Holographic Frame */}
                    <div className="absolute inset-0 border border-cyber-silver/50 rounded-2xl animate-pulse" />
                    <div className="absolute -inset-1 border border-neon-blue/30 rounded-2xl" />
                    <QrCode className="w-10 h-10 text-dark-bg" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-neon-blue to-cyber-silver bg-clip-text text-transparent"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    HOLOGRAPHIC PORTAL ONLINE
                  </motion.h3>
                  <motion.p 
                    className="text-neon-blue mb-4 font-mono text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    > DIMENSIONAL GATEWAY: Ready for neural scan
                    <motion.div
                      className="flex justify-center mt-2 space-x-1"
                    >
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-neon-blue rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1,
                            delay: i * 0.2,
                            repeat: Infinity
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.p>
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-neon-blue to-cyber-silver text-dark-bg rounded-full font-bold text-sm tracking-wider border border-white/20 hover:border-white/40 transition-all duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(65, 105, 225, 0.5)"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDemo(null);
                    }}
                  >
                    ENTER HOLOGRAPHIC REALM
                  </motion.button>
                </div>
              </motion.div>
            )}
            <motion.div 
              className="text-center"
              animate={{ 
                opacity: activeDemo === 'ar' ? 0.1 : 1,
                scale: activeDemo === 'ar' ? 0.95 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyber-silver to-white flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <QrCode className="w-8 h-8 text-dark-bg" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">AR Experience</h3>
              <p className="text-cyber-silver text-sm">Scan to experience your dashboard in augmented reality</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;