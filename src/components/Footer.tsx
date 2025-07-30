import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, QrCode, Star, TrendingUp } from 'lucide-react';

  const phrases = [
    "Command Your Finances",
    "Conquer Chaos", 
    "Amplify Growth"
  ];

    }
  };
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
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
      className="unified-section min-h-screen flex items-center justify-center pt-16"
      aria-label="Hero section"
    >
              <Zap className="w-10 h-10 unified-pulse" style={{ color: 'var(--primary-blue)' }} />
              <span className="text-3xl font-black unified-gradient-text">
        variants={containerVariants}
        initial="hidden"
        animate="visible"
            <p className="leading-relaxed mb-6 max-w-md" style={{ color: 'var(--text-secondary)' }}>
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
            className="unified-gradient-text unified-glow"
                  className="w-12 h-12 rounded-full unified-card flex items-center justify-center hover:scale-110 transition-all duration-300"
            {phrases[currentPhrase]}
          </motion.h1>
        </div>
                  <social.icon className="w-5 h-5" style={{ color: 'var(--primary-blue)' }} />
        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          variants={itemVariants}
        >
          The ultimate AI-powered finance management revolution for visionary entrepreneurs. 
          Transform chaos into clarity with voice-first commands and predictive intelligence.
        </motion.p>

        {/* Social Proof */}
                  <a href="#" className="transition-colors duration-300" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
          className="flex flex-wrap justify-center items-center gap-6 mb-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-2 unified-card rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <span style={{ color: 'var(--text-secondary)' }}>Trusted by 3,000+ visionary entrepreneurs</span>
          </div>
          <div className="flex items-center space-x-2 unified-card rounded-full px-6 py-3">
            <TrendingUp className="w-5 h-5" style={{ color: 'var(--primary-magenta)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Savings Unlocked: $1.5M+</span>
          </div>
        </motion.div>
                  <a href="#" className="transition-colors duration-300" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          variants={itemVariants}
        >
          <motion.button
            className="unified-button-primary text-lg px-12 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Launch your financial revolution with ExpenseIQ"
            onClick={() => {
            <div className="flex items-center space-x-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              console.log('Launch Your Financial Revolution!');
              <a href="#" className="transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Privacy Policy</a>
              <a href="#" className="transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Terms of Service</a>
            Launch Your Financial Revolution
          </motion.button>
            className="unified-button-primary px-12 py-4 text-lg unified-pulse"
          <motion.button
              className="flex items-center space-x-2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            whileHover={{ scale: 1.05 }}
            <span className="flex items-center space-x-2">
              <Shield className="w-4 h-4" style={{ color: 'var(--primary-blue)' }} />
          >
            <Play className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Interactive Elements */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="text-xs font-mono" style={{ color: 'var(--primary-blue)' }}>
          <motion.div
            className="unified-card p-6"
            whileHover={{ scale: 1.02 }}
          >
            <VoiceDemo />
          </motion.div>

          {/* AI Showcase */}
          <motion.div
            className="unified-card p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center unified-pulse" style={{ background: 'linear-gradient(135deg, var(--primary-magenta), var(--primary-blue))' }}>
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Real-time predictive analytics for smarter financial decisions</p>
            </div>
          </motion.div>

          {/* AR Portal */}
          <motion.div
            className="unified-card p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--neutral-silver), white)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <QrCode className="w-8 h-8" style={{ color: 'var(--dark-bg)' }} />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">AR Experience</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Scan to experience your dashboard in augmented reality</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;