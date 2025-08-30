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
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 to-neon-magenta/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Futuristic Voice Interface */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                >
                  {/* Central Voice Core */}
                  <motion.div
                    className="relative w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue to-neon-magenta flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 20px rgba(65, 105, 225, 0.5)",
                        "0 0 40px rgba(255, 0, 122, 0.8)",
                        "0 0 20px rgba(65, 105, 225, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mic className="w-10 h-10 text-white" />
                    
                    {/* Voice Waves */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border-2 border-neon-blue rounded-full"
                        style={{
                          width: `${80 + i * 30}px`,
                          height: `${80 + i * 30}px`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.8, 0, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Floating Voice Commands */}
                  {["$50 Coffee", "Travel Expense", "Office Supplies"].map((command, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-neon-blue/20 backdrop-blur-sm rounded-full px-3 py-1 border border-neon-blue/50"
                      style={{
                        top: `${30 + i * 15}%`,
                        left: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity
                      }}
                    >
                      <span className="text-xs text-neon-blue font-mono">{command}</span>
                    </motion.div>
                  ))}

                  {/* AI Processing Indicator */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-neon-magenta/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-neon-magenta/50"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-neon-magenta rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-xs text-neon-magenta font-mono">AI PROCESSING</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Holographic Display */}
                <motion.div
                  className="absolute top-4 right-4 w-16 h-12 bg-neon-blue/10 backdrop-blur-sm rounded-lg border border-neon-blue/30 p-2"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div className="text-xs text-neon-blue font-mono mb-1">EXPENSE TRACKER</div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-neon-blue rounded-full"
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="absolute top-2 right-2 w-6 h-6 bg-neon-magenta/20 rounded-full flex items-center justify-center text-white text-sm hover:bg-neon-magenta/40 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDemo(null);
                  }}
                >
                  ×
                </motion.button>
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
                className="absolute inset-0 bg-gradient-to-br from-neon-magenta/30 to-neon-blue/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Quantum AI Core */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                >
                  {/* Central AI Brain */}
                  <motion.div
                    className="relative w-16 h-16 rounded-lg bg-gradient-to-r from-neon-magenta to-neon-blue flex items-center justify-center"
                    animate={{ 
                      rotateY: [0, 360],
                      boxShadow: [
                        "0 0 20px rgba(255, 0, 122, 0.5)",
                        "0 0 40px rgba(65, 105, 225, 0.8)",
                        "0 0 20px rgba(255, 0, 122, 0.5)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <TrendingUp className="w-8 h-8 text-white" />
                    
                    {/* Quantum Particles */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon-blue rounded-full"
                        style={{
                          top: `${Math.sin((i / 8) * Math.PI * 2) * 40 + 50}%`,
                          left: `${Math.cos((i / 8) * Math.PI * 2) * 40 + 50}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Floating Data Insights */}
                  {[
                    { text: "23% Cost Saved", pos: { top: "20%", left: "15%" } },
                    { text: "AI Prediction: +15%", pos: { top: "60%", right: "15%" } },
                    { text: "Trend Analysis", pos: { bottom: "25%", left: "20%" } }
                  ].map((insight, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-neon-magenta/20 backdrop-blur-sm rounded-lg px-2 py-1 border border-neon-magenta/50"
                      style={insight.pos}
                      animate={{
                        y: [0, -5, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.8,
                        repeat: Infinity
                      }}
                    >
                      <span className="text-xs text-neon-magenta font-mono">{insight.text}</span>
                    </motion.div>
                  ))}

                  {/* Neural Network Visualization */}
                  <motion.div
                    className="absolute top-4 left-4 w-12 h-8 bg-neon-blue/10 backdrop-blur-sm rounded border border-neon-blue/30 p-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="grid grid-cols-3 gap-1 h-full">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="bg-neon-blue rounded-full"
                          animate={{ 
                            scale: [0.5, 1, 0.5],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{ 
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity 
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Quantum Processing Status */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-neon-blue/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-neon-blue/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-neon-blue rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs text-neon-blue font-mono">QUANTUM ANALYSIS</span>
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="absolute top-2 right-2 w-6 h-6 bg-neon-blue/20 rounded-full flex items-center justify-center text-white text-sm hover:bg-neon-blue/40 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDemo(null);
                  }}
                >
                  ×
                </motion.button>
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
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 to-cyber-silver/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Holographic Portal */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                >
                  {/* Central AR Portal */}
                  <motion.div
                    className="relative w-20 h-20 rounded-2xl bg-gradient-to-r from-neon-blue to-cyber-silver flex items-center justify-center"
                    animate={{ 
                      rotateX: [0, 360],
                      boxShadow: [
                        "0 0 20px rgba(192, 192, 192, 0.5)",
                        "0 0 40px rgba(65, 105, 225, 0.8)",
                        "0 0 20px rgba(192, 192, 192, 0.5)"
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <QrCode className="w-10 h-10 text-dark-bg" />
                    
                    {/* Holographic Rings */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border-2 border-cyber-silver rounded-2xl"
                        style={{
                          width: `${80 + i * 25}px`,
                          height: `${80 + i * 25}px`,
                        }}
                        animate={{
                          rotateZ: [0, 360],
                          opacity: [0.8, 0.2, 0.8]
                        }}
                        transition={{
                          duration: 4,
                          delay: i * 0.5,
                          repeat: Infinity
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Floating AR Elements */}
                  {[
                    { icon: "📊", pos: { top: "15%", left: "20%" } },
                    { icon: "💰", pos: { top: "25%", right: "25%" } },
                    { icon: "📈", pos: { bottom: "30%", left: "15%" } },
                    { icon: "🎯", pos: { bottom: "20%", right: "20%" } }
                  ].map((element, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 bg-cyber-silver/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-cyber-silver/50"
                      style={element.pos}
                      animate={{
                        y: [0, -10, 0],
                        rotateY: [0, 180, 360],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity
                      }}
                    >
                      <span className="text-sm">{element.icon}</span>
                    </motion.div>
                  ))}

                  {/* Holographic Grid */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-12 bg-neon-blue/10 backdrop-blur-sm rounded border border-neon-blue/30 p-1"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <div className="grid grid-cols-4 grid-rows-3 gap-px h-full">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="bg-cyber-silver rounded-sm"
                          animate={{ 
                            opacity: [0.2, 1, 0.2],
                            scale: [0.8, 1, 0.8]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity 
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Dimensional Scan Lines */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {/* Vertical Scan */}
                  <motion.div
                    className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyber-silver to-transparent"
                    animate={{ x: [0, 300] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Horizontal Scan */}
                  <motion.div
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                    animate={{ y: [0, 200] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Portal Status */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-cyber-silver/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-cyber-silver/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-cyber-silver rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs text-cyber-silver font-mono">PORTAL ACTIVE</span>
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="absolute top-2 right-2 w-6 h-6 bg-cyber-silver/20 rounded-full flex items-center justify-center text-white text-sm hover:bg-cyber-silver/40 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDemo(null);
                  }}
                >
                  ×
                </motion.button>
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