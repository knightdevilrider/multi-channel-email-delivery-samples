import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, QrCode, Star, TrendingUp } from 'lucide-react';
                <div className="unified-card p-6 h-full group-hover:scale-105 transition-all duration-300">
          </motion.h1>
        </div>

                    className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg shadow-2xl z-20 unified-pulse"
        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
                      color: step.color,
                      background: 'var(--card-bg)'
          className="flex flex-wrap justify-center items-center gap-6 mb-12"
        >
          <div className="flex items-center space-x-2 unified-card rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <span style={{ color: 'var(--text-secondary)' }}>Trusted by 3,000+ visionary entrepreneurs</span>
      <div className="unified-container">
          <div className="flex items-center space-x-2 unified-card rounded-full px-6 py-3">
            <TrendingUp className="w-5 h-5" style={{ color: 'var(--primary-magenta)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Savings Unlocked: $1.5M+</span>
          <motion.button
            className="unified-button-secondary flex items-center space-x-2"
            className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
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
                    className="leading-relaxed text-center text-sm"
                    style={{ color: 'var(--text-secondary)' }}
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Real-time predictive analytics for smarter financial decisions</p>
            </div>
          </motion.div>

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