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
                {/* Mobile Phone - Left Side */}
                <motion.div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="w-16 h-24 bg-gradient-to-b from-neon-blue to-neon-magenta rounded-lg p-1 shadow-lg">
                    <div className="w-full h-full bg-dark-bg rounded-md flex flex-col items-center justify-center">
                      <motion.div
                        className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center mb-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Mic className="w-4 h-4 text-white" />
                      </motion.div>
                      <div className="text-xs text-neon-blue font-mono">LISTENING</div>
                    </div>
                  </div>
                </motion.div>

                {/* Person with Receipt - Right Side */}
                <motion.div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {/* Person Figure */}
                  <div className="relative">
                    {/* Head */}
                    <div className="w-6 h-6 bg-cyber-silver rounded-full mx-auto mb-1"></div>
                    {/* Body */}
                    <div className="w-8 h-12 bg-gradient-to-b from-neon-blue to-neon-magenta rounded-lg relative">
                      {/* Arm with Receipt */}
                      <motion.div
                        className="absolute -right-2 top-2 w-3 h-1 bg-cyber-silver rounded-full"
                        animate={{ rotate: [0, -30, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* Receipt */}
                      <motion.div
                        className="absolute -right-4 top-1 w-2 h-3 bg-white rounded-sm text-xs"
                        animate={{ 
                          x: [0, -20, -40],
                          y: [0, 5, 10],
                          rotate: [0, 45, 90],
                          opacity: [1, 0.5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Speech Bubble */}
                <motion.div
                  className="absolute top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="bg-neon-blue/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-neon-blue/30">
                    <p className="text-xs text-neon-blue font-mono">"Add $50 coffee to marketing"</p>
                  </div>
                </motion.div>

                {/* Success Checkmark */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
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
                className="absolute inset-0 bg-gradient-to-br from-neon-magenta/30 to-neon-blue/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* AI Brain - Left Side */}
                <motion.div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="relative">
                    {/* AI Brain Core */}
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-neon-magenta to-neon-blue rounded-full flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 10px rgba(255, 0, 122, 0.5)",
                          "0 0 20px rgba(255, 0, 122, 0.8)",
                          "0 0 10px rgba(255, 0, 122, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="w-6 h-6 text-white" />
                    </motion.div>
                    {/* Neural Connections */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-4 bg-neon-blue rounded-full"
                        style={{
                          top: `${20 + i * 8}px`,
                          right: `${-5 + i * 2}px`,
                        }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scaleY: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity 
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Data Visualization - Right Side */}
                <motion.div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="w-16 h-20 bg-dark-bg/50 rounded-lg border border-neon-magenta/30 p-2">
                    {/* Chart Bars */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-neon-magenta to-neon-blue rounded-sm mb-1"
                        style={{ width: '100%' }}
                        animate={{ 
                          height: [`${20 + i * 5}px`, `${30 + i * 8}px`, `${20 + i * 5}px`]
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

                {/* Data Flow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-neon-blue rounded-full"
                      animate={{
                        x: [-30, 30],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Insight Popup */}
                <motion.div
                  className="absolute top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="bg-neon-magenta/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-neon-magenta/30">
                    <p className="text-xs text-neon-magenta font-mono">23% cost optimization detected</p>
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
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 to-cyber-silver/30 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Phone with AR - Left Side */}
                <motion.div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="w-16 h-24 bg-gradient-to-b from-neon-blue to-cyber-silver rounded-lg p-1 shadow-lg">
                    <div className="w-full h-full bg-dark-bg rounded-md flex flex-col items-center justify-center relative overflow-hidden">
                      {/* AR Dashboard Hologram */}
                      <motion.div
                        className="absolute inset-1 bg-gradient-to-br from-neon-blue/30 to-cyber-silver/30 rounded-md"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-8 h-8 bg-neon-blue/20 rounded-lg flex items-center justify-center relative z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <QrCode className="w-4 h-4 text-neon-blue" />
                      </motion.div>
                      <div className="text-xs text-cyber-silver font-mono mt-1">AR VIEW</div>
                    </div>
                  </div>
                </motion.div>

                {/* Person Scanning - Right Side */}
                <motion.div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="relative">
                    {/* Head */}
                    <div className="w-6 h-6 bg-cyber-silver rounded-full mx-auto mb-1"></div>
                    {/* Body */}
                    <div className="w-8 h-12 bg-gradient-to-b from-neon-blue to-cyber-silver rounded-lg relative">
                      {/* Arm pointing */}
                      <motion.div
                        className="absolute -right-2 top-2 w-3 h-1 bg-cyber-silver rounded-full"
                        animate={{ rotate: [0, -20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* AR Glasses */}
                      <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-neon-blue rounded-full opacity-80"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Holographic Dashboard */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="w-20 h-16 bg-neon-blue/10 backdrop-blur-sm rounded-lg border border-neon-blue/30 p-2">
                    {/* Holographic Elements */}
                    <motion.div
                      className="w-full h-2 bg-gradient-to-r from-neon-blue to-cyber-silver rounded-full mb-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-3/4 h-2 bg-gradient-to-r from-cyber-silver to-neon-blue rounded-full mb-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-1/2 h-2 bg-gradient-to-r from-neon-blue to-cyber-silver rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Scan Effect */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                    animate={{ y: [0, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* AR Label */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="bg-cyber-silver/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-cyber-silver/30">
                    <p className="text-xs text-cyber-silver font-mono">AR Dashboard Active</p>
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