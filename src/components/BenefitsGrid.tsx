import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Enhanced Animated Icon Components with larger, more detailed animations
const InstantAICaptureIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Phone Frame */}
      <motion.div
        className="relative w-20 h-28 bg-gradient-to-b from-slate-800/90 via-slate-900/80 to-black/90 rounded-2xl border-2 border-cyan-400/40 backdrop-blur-xl shadow-2xl"
        initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotateY: 0,
          boxShadow: [
            '0 0 20px rgba(34, 211, 238, 0.3)',
            '0 0 40px rgba(34, 211, 238, 0.5)',
            '0 0 20px rgba(34, 211, 238, 0.3)'
          ]
        }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
      >
        {/* Screen with holographic effect */}
        <div className="absolute inset-2 bg-gradient-to-b from-slate-900 via-blue-900/30 to-purple-900/20 rounded-xl overflow-hidden border border-cyan-400/20">
          {/* Camera viewfinder overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Scanning lines */}
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ y: [0, 80, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Receipt being captured */}
          <motion.div
            className="absolute bottom-4 left-2 right-2 h-16 bg-gradient-to-b from-white via-gray-100 to-white rounded-lg shadow-lg border border-gray-300"
            initial={{ y: 40, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.2, repeat: Infinity, repeatDelay: 4 }}
          >
            {/* Receipt content */}
            <div className="p-2 space-y-1">
              <motion.div 
                className="h-1 bg-gray-800 rounded w-3/4"
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
              />
              <motion.div 
                className="h-0.5 bg-gray-600 rounded w-1/2"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ delay: 1.7, duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
              />
              <motion.div 
                className="h-0.5 bg-gray-600 rounded w-2/3"
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ delay: 1.9, duration: 0.7, repeat: Infinity, repeatDelay: 4 }}
              />
              <motion.div 
                className="h-1 bg-green-600 rounded w-1/3 ml-auto"
                initial={{ width: 0 }}
                animate={{ width: '33%' }}
                transition={{ delay: 2.1, duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Camera flash effect */}
        <motion.div
          className="absolute inset-0 bg-white rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ delay: 2.5, duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
        />
        
        {/* Holographic corners */}
        <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400 rounded-tl-2xl animate-pulse" />
        <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400 rounded-tr-2xl animate-pulse" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400 rounded-bl-2xl animate-pulse" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400 rounded-br-2xl animate-pulse" />
      </motion.div>
      
      {/* AI Processing Neural Network */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg"
        animate={{ 
          scale: [1, 1.3, 1], 
          rotate: [0, 180, 360],
          boxShadow: [
            '0 0 10px rgba(34, 211, 238, 0.5)',
            '0 0 20px rgba(34, 211, 238, 0.8)',
            '0 0 10px rgba(34, 211, 238, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 3 }}
      >
        <div className="absolute inset-1 bg-white/30 rounded-full animate-pulse" />
      </motion.div>
      
      {/* Data extraction beams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full"
          style={{
            right: -20,
            top: 30 + i * 6,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0],
            boxShadow: [
              '0 0 5px rgba(34, 211, 238, 0.3)',
              '0 0 15px rgba(34, 211, 238, 0.8)',
              '0 0 5px rgba(34, 211, 238, 0.3)'
            ]
          }}
          transition={{
            delay: 3.5 + i * 0.2,
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 4
          }}
        />
      ))}
      
      {/* Floating data particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            right: -10 + Math.random() * 20,
            top: 20 + Math.random() * 40
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 4 + i * 0.3,
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
      {/* Futuristic Microphone */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [1, 1.05, 1],
          rotateY: [0, 5, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Mic body with holographic effect */}
        <div className="w-12 h-16 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 rounded-full relative shadow-2xl border-2 border-pink-400/40">
          {/* Holographic surface */}
          <motion.div
            className="absolute inset-1 bg-gradient-to-b from-pink-400/20 via-transparent to-purple-400/20 rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Mic grille pattern */}
          <div className="absolute inset-x-3 top-4 bottom-4 space-y-1">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="h-0.5 bg-slate-800/60 rounded-full"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          
          {/* Active indicator */}
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
              boxShadow: [
                '0 0 5px rgba(236, 72, 153, 0.5)',
                '0 0 15px rgba(236, 72, 153, 0.8)',
                '0 0 5px rgba(236, 72, 153, 0.5)'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
        
        {/* Mic stand */}
        <div className="w-2 h-8 bg-gradient-to-b from-slate-400 to-slate-600 mx-auto rounded-full shadow-lg" />
        <div className="w-12 h-2 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-full shadow-lg" />
      </motion.div>
      
      {/* Advanced Sound waves */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 rounded-full"
          style={{
            width: 30 + i * 12,
            height: 30 + i * 12,
            borderColor: i % 2 === 0 ? '#ec4899' : '#a855f7'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5, 0], 
            opacity: [0, 0.8, 0],
            borderWidth: [2, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Voice command visualization */}
      <motion.div
        className="absolute -top-8 -right-12 bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-xl rounded-2xl px-4 py-2 text-sm text-white border border-pink-400/40 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: [0, 1, 1, 1, 0], 
          scale: [0.8, 1, 1, 1, 0.8],
          y: [10, 0, 0, 0, 10]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
        >
          "Add $50 coffee to marketing"
        </motion.span>
        
        {/* Speech bubble tail */}
        <div className="absolute bottom-0 left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-500/90 transform translate-y-full" />
      </motion.div>
      
      {/* AI processing indicator */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-purple-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const UnifiedHubIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central AI Core */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full relative z-10 shadow-2xl"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(139, 92, 246, 0.5)',
            '0 0 40px rgba(139, 92, 246, 0.8)',
            '0 0 20px rgba(139, 92, 246, 0.5)'
          ]
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity },
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        {/* Core inner glow */}
        <div className="absolute inset-2 bg-white/20 rounded-full animate-pulse" />
        
        {/* Neural network pattern */}
        <motion.div
          className="absolute inset-3 border border-white/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      {/* Connected platform nodes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const radius = 35;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const colors = ['#4169E1', '#FF007A', '#00ff88', '#ffd700', '#ff6b6b', '#8a2be2', '#00ffff', '#ff4500'];
        
        return (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-xl shadow-lg border-2 border-white/20 backdrop-blur-xl"
            style={{
              left: `calc(50% + ${x}px - 16px)`,
              top: `calc(50% + ${y}px - 16px)`,
              background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}dd)`
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4
            }}
          >
            {/* Platform icons simulation */}
            <div className="absolute inset-1 bg-white/30 rounded-lg" />
            
            {/* Connection beam to center */}
            <motion.div
              className="absolute w-0.5 bg-current opacity-40 rounded-full"
              style={{
                height: radius,
                left: '50%',
                top: '50%',
                transformOrigin: 'top',
                transform: `rotate(${180 + i * 45}deg) translateX(-50%)`,
                background: `linear-gradient(to bottom, ${colors[i]}, transparent)`
              }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                boxShadow: [
                  `0 0 5px ${colors[i]}40`,
                  `0 0 15px ${colors[i]}80`,
                  `0 0 5px ${colors[i]}40`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Data flow particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg"
          animate={{
            x: [0, 25, 0, -25, 0],
            y: [0, -25, 0, 25, 0],
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1, 1, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Orbital rings */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute border border-purple-400/30 rounded-full"
          style={{
            width: 80 + i * 20,
            height: 80 + i * 20
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const PredictiveInsightsIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Chart Display */}
      <div className="relative w-20 h-16 bg-gradient-to-t from-slate-900/80 via-blue-900/20 to-transparent rounded-xl border-2 border-cyan-400/40 backdrop-blur-xl shadow-2xl">
        {/* Chart grid */}
        <div className="absolute inset-2 opacity-30">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute w-full h-0.5 bg-cyan-400/20" style={{ top: `${i * 25}%` }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute h-full w-0.5 bg-cyan-400/20" style={{ left: `${i * 25}%` }} />
          ))}
        </div>
        
        {/* Animated chart bars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-2 bg-gradient-to-t from-cyan-400 via-blue-400 to-purple-400 rounded-t-sm shadow-lg"
            style={{
              left: 4 + i * 2.5,
              width: 2,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: [0, (i + 1) * 8, (i + 2) * 6, (i + 1) * 10, (i + 3) * 7],
              opacity: [0, 1, 1, 1, 1],
              boxShadow: [
                '0 0 5px rgba(34, 211, 238, 0.3)',
                '0 0 15px rgba(34, 211, 238, 0.6)',
                '0 0 10px rgba(34, 211, 238, 0.4)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Predictive trend line */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 80 64"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path
            d="M 8 48 Q 20 40 32 28 T 72 12"
            stroke="#FF007A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="drop-shadow(0 0 8px rgba(255, 0, 122, 0.6))"
          />
        </motion.svg>
        
        {/* Future projection area */}
        <motion.div
          className="absolute right-2 top-2 bottom-2 w-6 bg-gradient-to-r from-transparent via-pink-400/10 to-pink-400/20 rounded-r-lg"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      {/* AI Brain Processor */}
      <motion.div
        className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          boxShadow: [
            '0 0 10px rgba(236, 72, 153, 0.5)',
            '0 0 20px rgba(236, 72, 153, 0.8)',
            '0 0 10px rgba(236, 72, 153, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute inset-1 bg-white/30 rounded-full animate-pulse" />
        
        {/* Neural connections */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-3 bg-pink-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'bottom',
              transform: `rotate(${i * 90}deg) translateX(-50%)`
            }}
            animate={{ 
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </motion.div>
      
      {/* Prediction arrows */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
          style={{
            right: -12,
            top: 20 + i * 8,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0],
            boxShadow: [
              '0 0 5px rgba(251, 191, 36, 0.3)',
              '0 0 15px rgba(251, 191, 36, 0.8)',
              '0 0 5px rgba(251, 191, 36, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 2 + i * 0.4
          }}
        />
      ))}
      
      {/* Data insights floating */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`insight-${i}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full shadow-lg"
          style={{
            right: -5 + Math.random() * 10,
            top: 15 + Math.random() * 30
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 3 + i * 0.5
          }}
        />
      ))}
    </div>
  );
};

const OneTapOnboardingIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Futuristic Device */}
      <motion.div
        className="relative w-16 h-24 bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-2xl border-2 border-yellow-400/40 shadow-2xl backdrop-blur-xl"
        initial={{ y: 10, opacity: 0, rotateX: -10 }}
        animate={{ 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          boxShadow: [
            '0 0 20px rgba(251, 191, 36, 0.3)',
            '0 0 40px rgba(251, 191, 36, 0.5)',
            '0 0 20px rgba(251, 191, 36, 0.3)'
          ]
        }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
      >
        {/* Screen with setup interface */}
        <div className="absolute inset-2 bg-gradient-to-b from-blue-900 via-purple-900/50 to-slate-900 rounded-xl overflow-hidden border border-yellow-400/20">
          {/* Setup progress bars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-10 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
              style={{ top: 12 + i * 6, left: 4 }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: [0, 40, 40],
                opacity: [0, 1, 1],
                boxShadow: [
                  '0 0 5px rgba(251, 191, 36, 0.3)',
                  '0 0 15px rgba(251, 191, 36, 0.8)',
                  '0 0 10px rgba(251, 191, 36, 0.5)'
                ]
              }}
              transition={{
                delay: i * 0.6,
                duration: 1,
                repeat: Infinity,
                repeatDelay: 4
              }}
            />
          ))}
          
          {/* AI learning indicator */}
          <motion.div
            className="absolute top-4 right-2 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="absolute inset-0.5 bg-white/40 rounded-full animate-pulse" />
          </motion.div>
          
          {/* Success checkmark animation */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-green-400 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              opacity: [0, 1, 1],
              borderColor: ['#4ade80', '#22c55e', '#16a34a']
            }}
            transition={{ delay: 3.5, duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
          >
            <motion.svg
              className="w-3 h-3 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 3.8, duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          </motion.div>
        </div>
        
        {/* Holographic corners */}
        <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-yellow-400 rounded-tl-2xl animate-pulse" />
        <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-yellow-400 rounded-tr-2xl animate-pulse" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-yellow-400 rounded-bl-2xl animate-pulse" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-yellow-400 rounded-br-2xl animate-pulse" />
      </motion.div>
      
      {/* Holographic finger tap */}
      <motion.div
        className="absolute w-8 h-10 bg-gradient-to-b from-pink-300/80 via-pink-400/60 to-pink-500/40 rounded-full backdrop-blur-sm border border-pink-400/40 shadow-2xl"
        style={{ right: -4, bottom: 12 }}
        animate={{ 
          scale: [1, 0.9, 1],
          y: [0, 3, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        {/* Tap ripple effects */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute -inset-2 border-2 border-pink-400/60 rounded-full"
            animate={{ 
              scale: [1, 2.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              repeatDelay: 3
            }}
          />
        ))}
      </motion.div>
      
      {/* Magic setup sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg"
          style={{
            left: 12 + (i % 3) * 12,
            top: 8 + Math.floor(i / 3) * 12
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 4 + i * 0.3
          }}
        />
      ))}
      
      {/* AI learning beams */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute w-12 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full shadow-lg"
          style={{
            left: -8,
            top: 30 + i * 8
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 4.5 + i * 0.3
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
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    glowColor: 'cyan-400'
  },
  {
    AnimatedIcon: VoiceControlIcon,
    title: 'Voice-First Control',
    description: 'Command your finances naturally with advanced voice AI that understands business context.',
    gradient: 'from-pink-500 via-purple-500 to-indigo-600',
    glowColor: 'pink-500'
  },
  {
    AnimatedIcon: UnifiedHubIcon,
    title: 'Unified Hub',
    description: 'Connect all accounts, cards, and platforms into one intelligent financial command center.',
    gradient: 'from-purple-500 via-blue-500 to-cyan-400',
    glowColor: 'purple-500'
  },
  {
    AnimatedIcon: PredictiveInsightsIcon,
    title: 'Predictive Insights',
    description: 'AI-powered forecasting and trend analysis to optimize cash flow and growth strategies.',
    gradient: 'from-cyan-400 via-pink-500 to-yellow-400',
    glowColor: 'cyan-400'
  },
  {
    AnimatedIcon: OneTapOnboardingIcon,
    title: 'One-Tap Onboarding',
    description: 'Get started in seconds with intelligent setup that learns your business patterns instantly.',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    glowColor: 'yellow-400'
  }
];

const BenefitsGrid: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Auto-advance carousel on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
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
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1.2
      }
    }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-dark-bg via-slate-900/50 to-dark-bg" id="features" ref={containerRef}>
      {/* Futuristic background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.3))'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Unite Your Financial Empire
          </motion.h2>
          <motion.p 
            className="text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Five revolutionary capabilities that transform financial chaos into entrepreneurial mastery
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Desktop Radial Hub Layout */}
          <div className="hidden md:block">
            <div className="relative w-full h-[800px] flex items-center justify-center">
              {/* Central Unified Hub */}
              <motion.div
                className="absolute z-20 w-48 h-48 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-400/20 backdrop-blur-xl rounded-full border-2 border-cyan-400/40 flex items-center justify-center group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(34, 211, 238, 0.3)',
                    '0 0 60px rgba(34, 211, 238, 0.6)',
                    '0 0 30px rgba(34, 211, 238, 0.3)'
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity },
                  scale: { duration: 0.3 }
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    {React.createElement(benefits[2].AnimatedIcon)}
                  </motion.div>
                  <h3 className="text-2xl font-black text-white mb-2">Unified Hub</h3>
                  <p className="text-cyan-300 text-sm">AI Command Center</p>
                </div>
              </motion.div>

              {/* Radial Feature Cards */}
              {benefits.slice(0, 4).map((benefit, index) => {
                const angle = (index * 90) * (Math.PI / 180); // 90-degree intervals
                const radius = 280;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute group"
                    style={{
                      left: `calc(50% + ${x}px - 160px)`,
                      top: `calc(50% + ${y}px - 120px)`,
                    }}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.05,
                      z: 50
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Connection Line to Center */}
                    <motion.div
                      className="absolute w-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full"
                      style={{
                        height: radius - 96,
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'top',
                        transform: `rotate(${180 + index * 90}deg) translateX(-50%)`,
                      }}
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                        boxShadow: [
                          '0 0 5px rgba(34, 211, 238, 0.3)',
                          '0 0 15px rgba(34, 211, 238, 0.8)',
                          '0 0 5px rgba(34, 211, 238, 0.3)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Feature Card */}
                    <div className="w-80 h-60 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 group-hover:bg-white/15 group-hover:border-cyan-400/50 transition-all duration-500">
                      {/* Holographic corners */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-2xl animate-pulse" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-2xl animate-pulse" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-2xl animate-pulse" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60 rounded-br-2xl animate-pulse" />
                      
                      <motion.div 
                        className="w-20 h-20 mx-auto mb-4 cursor-pointer relative"
                        whileHover={{ 
                          scale: 1.1,
                          rotateY: 15,
                          rotateX: 5
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <benefit.AnimatedIcon />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-400 transition-colors duration-500">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-cyan-100 group-hover:text-white transition-colors duration-500 leading-relaxed text-sm text-center">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className="group relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mx-auto max-w-sm"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Holographic corners */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-2xl animate-pulse" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-2xl animate-pulse" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-2xl animate-pulse" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60 rounded-br-2xl animate-pulse" />
                      
                      <motion.div 
                        className="w-24 h-24 mx-auto mb-6 cursor-pointer relative"
                        whileHover={{ 
                          scale: 1.1,
                          rotateY: 15,
                          rotateX: 5
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <benefit.AnimatedIcon />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-cyan-400 transition-colors duration-500">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-cyan-100 group-hover:text-white transition-colors duration-500 leading-relaxed text-center">
                        {benefit.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {benefits.slice(0, 4).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;