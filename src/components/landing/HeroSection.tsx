import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, QrCode, Star, TrendingUp } from 'lucide-react';
import VoiceDemo from './VoiceDemo';

const HeroSection: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const phrases = [
    "Track expenses with your voice",
    "Get AI-powered insights",
    "Achieve financial freedom"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg pt-20"
      aria-label="Hero section"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/20 to-dark-bg z-10" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-blue rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-magenta to-neon-green bg-clip-text text-transparent">
            ExpenseIQ
          </h1>
          
          <div className="h-16 mb-8">
            <motion.p
              key={currentPhrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 font-light"
            >
              {phrases[currentPhrase]}
            </motion.p>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Revolutionary AI-powered expense tracking that understands your voice, 
            learns your habits, and transforms your financial future.
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            { icon: Mic, title: "Voice-First", desc: "Natural speech recognition" },
            { icon: TrendingUp, title: "AI Insights", desc: "Smart financial analysis" },
            { icon: Star, title: "Personalized", desc: "Adapts to your lifestyle" }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-dark-card/50 to-dark-card/30 backdrop-blur-sm border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-neon-blue mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          <motion.button
            className="group relative px-12 py-4 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full font-bold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Launch your financial revolution with ExpenseIQ"
            onClick={() => window.location.href = '/app'}
          >
            <span className="relative z-10">Launch Your Financial Revolution</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            className="group flex items-center gap-3 px-8 py-4 border-2 border-neon-green/50 rounded-full font-semibold text-neon-green hover:bg-neon-green/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Try voice demo"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Try Voice Demo
          </motion.button>
        </motion.div>

        {/* Voice Demo Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <VoiceDemo />
        </motion.div>

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <QrCode className="w-6 h-6 text-neon-blue" />
            <span className="text-gray-400">Scan to get the mobile app</span>
          </div>
          <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-2xl">
            {/* QR Code placeholder */}
            <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;