import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Modern 2030+ Animated Icon Components that show actual functionality
const SmartCaptureIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Phone with AI Vision */}
      <motion.div
        className="relative w-24 h-36 bg-gradient-to-b from-slate-800/90 via-blue-900/60 to-slate-900/90 rounded-3xl border-2 border-cyan-400/60 backdrop-blur-xl shadow-2xl"
        animate={{ 
          rotateY: [0, 5, -5, 0],
          boxShadow: [
            '0 0 30px rgba(34, 211, 238, 0.4)',
            '0 0 60px rgba(34, 211, 238, 0.8)',
            '0 0 30px rgba(34, 211, 238, 0.4)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* AI Vision Screen */}
        <div className="absolute inset-3 bg-gradient-to-b from-cyan-900/50 via-blue-900/30 to-purple-900/20 rounded-2xl overflow-hidden border border-cyan-400/30">
          {/* Receipt Detection Frame */}
          <motion.div
            className="absolute inset-4 border-2 border-cyan-400/80 rounded-xl"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              borderColor: ['rgba(34, 211, 238, 0.8)', 'rgba(0, 255, 136, 0.8)', 'rgba(34, 211, 238, 0.8)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Receipt being scanned */}
          <motion.div
            className="absolute bottom-8 left-4 right-4 h-20 bg-gradient-to-b from-white via-gray-100 to-white rounded-lg shadow-xl border border-gray-300"
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
          >
            {/* Receipt content with AI recognition */}
            <div className="p-2 space-y-1">
              <motion.div 
                className="h-1.5 bg-gray-800 rounded w-3/4"
                initial={{ width: 0, backgroundColor: '#1f2937' }}
                animate={{ 
                  width: '75%',
                  backgroundColor: ['#1f2937', '#059669', '#1f2937']
                }}
                transition={{ delay: 2, duration: 1, repeat: Infinity, repeatDelay: 5 }}
              />
              <motion.div 
                className="h-1 bg-gray-600 rounded w-1/2"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ delay: 2.3, duration: 0.8, repeat: Infinity, repeatDelay: 5 }}
              />
              <motion.div 
                className="h-1 bg-gray-600 rounded w-2/3"
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ delay: 2.6, duration: 0.7, repeat: Infinity, repeatDelay: 5 }}
              />
              <motion.div 
                className="h-1.5 bg-green-600 rounded w-1/3 ml-auto"
                initial={{ width: 0 }}
                animate={{ width: '33%' }}
                transition={{ delay: 2.9, duration: 0.6, repeat: Infinity, repeatDelay: 5 }}
              />
            </div>
          </motion.div>
          
          {/* AI Processing Indicators */}
          <motion.div
            className="absolute top-4 right-4 flex space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 3.5, duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
          
          {/* Scanning beam */}
          <motion.div
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ y: [0, 100, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Camera flash effect */}
        <motion.div
          className="absolute inset-0 bg-white rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ delay: 3.2, duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
        />
        
        {/* Holographic corners */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 border-cyan-400 animate-pulse ${
              i === 0 ? 'top-2 left-2 border-l-2 border-t-2 rounded-tl-3xl' :
              i === 1 ? 'top-2 right-2 border-r-2 border-t-2 rounded-tr-3xl' :
              i === 2 ? 'bottom-2 left-2 border-l-2 border-b-2 rounded-bl-3xl' :
              'bottom-2 right-2 border-r-2 border-b-2 rounded-br-3xl'
            }`}
          />
        ))}
      </motion.div>
      
      {/* AI Data Extraction Streams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full"
          style={{
            right: -25,
            top: 40 + i * 8,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0],
            boxShadow: [
              '0 0 5px rgba(34, 211, 238, 0.3)',
              '0 0 20px rgba(34, 211, 238, 0.8)',
              '0 0 5px rgba(34, 211, 238, 0.3)'
            ]
          }}
          transition={{
            delay: 4 + i * 0.2,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
      ))}
      
      {/* Floating data particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg"
          style={{
            right: -15 + Math.random() * 30,
            top: 30 + Math.random() * 60
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 4.5 + i * 0.4
          }}
        />
      ))}
    </div>
  );
};

const AIProcessingIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central AI Brain Core */}
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full relative shadow-2xl"
        animate={{ 
          rotate: 360,
          scale: [1, 1.15, 1],
          boxShadow: [
            '0 0 30px rgba(236, 72, 153, 0.5)',
            '0 0 60px rgba(236, 72, 153, 0.9)',
            '0 0 30px rgba(236, 72, 153, 0.5)'
          ]
        }}
        transition={{ 
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity },
          boxShadow: { duration: 3, repeat: Infinity }
        }}
      >
        {/* Neural network layers */}
        <div className="absolute inset-3 border-2 border-white/50 rounded-full">
          <motion.div
            className="absolute inset-2 border border-white/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 border border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Neural synapses */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-8 bg-white/70 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'bottom',
              transform: `rotate(${i * 30}deg) translateX(-50%)`
            }}
            animate={{ 
              scaleY: [1, 1.8, 1],
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                '0 0 5px rgba(255, 255, 255, 0.5)',
                '0 0 15px rgba(255, 255, 255, 0.8)',
                '0 0 5px rgba(255, 255, 255, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        
        {/* Core pulse */}
        <motion.div
          className="absolute inset-6 bg-white/40 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Data processing streams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"
          style={{
            left: -12,
            top: 40 + i * 10,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.4
          }}
        />
      ))}
      
      {/* AI insights floating out */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`insight-${i}`}
          className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-lg"
          style={{
            right: -10 + Math.random() * 20,
            top: 20 + Math.random() * 40
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: 1 + i * 0.5
          }}
        />
      ))}
      
      {/* Processing indicators */}
      <motion.div
        className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        {['Categorizing', 'Analyzing', 'Optimizing'].map((text, i) => (
          <motion.div
            key={text}
            className="bg-pink-500/90 backdrop-blur-xl rounded-full px-3 py-1 text-xs text-white border border-pink-400/40"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.3 }}
          >
            {text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const UnifiedDashboardIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Dashboard Screen */}
      <motion.div
        className="relative w-28 h-20 bg-gradient-to-br from-slate-800/90 via-blue-900/60 to-slate-900/90 rounded-2xl border-2 border-cyan-400/60 backdrop-blur-xl shadow-2xl"
        animate={{
          boxShadow: [
            '0 0 30px rgba(34, 211, 238, 0.4)',
            '0 0 60px rgba(34, 211, 238, 0.8)',
            '0 0 30px rgba(34, 211, 238, 0.4)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Dashboard content */}
        <div className="absolute inset-2 bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-purple-900/10 rounded-xl overflow-hidden border border-cyan-400/20">
          {/* Dashboard widgets grid */}
          <div className="absolute inset-2 grid grid-cols-4 gap-1">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-cyan-400/30 rounded-sm"
                animate={{ 
                  opacity: [0.3, 0.9, 0.3],
                  backgroundColor: [
                    'rgba(34, 211, 238, 0.3)',
                    'rgba(139, 92, 246, 0.6)',
                    'rgba(0, 255, 136, 0.4)',
                    'rgba(34, 211, 238, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          
          {/* Real-time data streams */}
          <motion.div
            className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Analytics chart simulation */}
          <div className="absolute bottom-2 left-2 right-2 h-6">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-t-sm"
                style={{
                  left: i * 2.5 + 2,
                  width: 2,
                }}
                initial={{ height: 0 }}
                animate={{ 
                  height: [0, (i + 1) * 3, (i + 2) * 4, (i + 1) * 5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Connected data sources orbiting */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const radius = 45;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const colors = ['#4169E1', '#FF007A', '#00ff88', '#ffd700', '#ff6b6b', '#8a2be2', '#00ffff', '#ff4500'];
        
        return (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-xl shadow-lg border border-white/30 backdrop-blur-xl"
            style={{
              left: `calc(50% + ${x}px - 16px)`,
              top: `calc(50% + ${y}px - 16px)`,
              background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}dd)`
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            {/* Platform icon simulation */}
            <div className="absolute inset-1 bg-white/40 rounded-lg" />
            
            {/* Connection beam to center */}
            <motion.div
              className="absolute w-0.5 bg-current opacity-50 rounded-full"
              style={{
                height: radius,
                left: '50%',
                top: '50%',
                transformOrigin: 'top',
                transform: `rotate(${180 + i * 45}deg) translateX(-50%)`,
                background: `linear-gradient(to bottom, ${colors[i]}, transparent)`
              }}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                boxShadow: [
                  `0 0 5px ${colors[i]}40`,
                  `0 0 20px ${colors[i]}80`,
                  `0 0 5px ${colors[i]}40`
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Data synchronization particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sync-${i}`}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg"
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, -30, 0, 30, 0],
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1.5, 1.5, 1.5, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const GrowthAccelerationIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Growth Chart */}
      <div className="relative w-28 h-20 bg-gradient-to-t from-slate-900/80 via-yellow-900/20 to-transparent rounded-2xl border-2 border-yellow-400/60 backdrop-blur-xl shadow-2xl">
        {/* Chart grid */}
        <div className="absolute inset-2 opacity-40">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute w-full h-0.5 bg-yellow-400/20" style={{ top: `${i * 25}%` }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute h-full w-0.5 bg-yellow-400/20" style={{ left: `${i * 20}%` }} />
          ))}
        </div>
        
        {/* Animated growth bars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-2 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400 rounded-t-sm shadow-lg"
            style={{
              left: 4 + i * 3,
              width: 2.5,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: [0, (i + 1) * 4, (i + 2) * 6, (i + 3) * 8, (i + 4) * 10],
              opacity: [0, 1, 1, 1, 1],
              boxShadow: [
                '0 0 5px rgba(251, 191, 36, 0.3)',
                '0 0 20px rgba(251, 191, 36, 0.8)',
                '0 0 15px rgba(251, 191, 36, 0.6)'
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Exponential growth trend line */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 112 80"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path
            d="M 8 60 Q 20 50 35 35 Q 50 20 70 15 Q 85 10 100 5"
            stroke="#FFD700"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            filter="drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))"
          />
        </motion.svg>
        
        {/* Profit projection area */}
        <motion.div
          className="absolute right-2 top-2 bottom-2 w-8 bg-gradient-to-r from-transparent via-green-400/10 to-green-400/30 rounded-r-lg"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
      
      {/* Success multiplier indicators */}
      <motion.div
        className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          boxShadow: [
            '0 0 15px rgba(34, 197, 94, 0.5)',
            '0 0 30px rgba(34, 197, 94, 0.9)',
            '0 0 15px rgba(34, 197, 94, 0.5)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.span
          className="text-white font-bold text-sm"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          10x
        </motion.span>
      </motion.div>
      
      {/* Growth acceleration arrows */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full"
          style={{
            right: -15,
            top: 25 + i * 8,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0],
            boxShadow: [
              '0 0 5px rgba(34, 197, 94, 0.3)',
              '0 0 20px rgba(34, 197, 94, 0.8)',
              '0 0 5px rgba(34, 197, 94, 0.3)'
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1 + i * 0.4
          }}
        />
      ))}
      
      {/* Profit sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`profit-${i}`}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
          style={{
            right: -10 + Math.random() * 20,
            top: 15 + Math.random() * 30
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 2 + i * 0.5
          }}
        />
      ))}
      
      {/* Revenue growth indicators */}
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500/90 via-orange-500/90 to-red-500/90 backdrop-blur-xl rounded-2xl px-4 py-2 text-sm text-white border border-yellow-400/40 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: [0, 1, 1, 1, 0], 
          scale: [0.8, 1, 1, 1, 0.8],
          y: [10, 0, 0, 0, 10]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5, repeat: Infinity, repeatDelay: 4.5 }}
        >
          +347% Revenue Growth
        </motion.span>
      </motion.div>
    </div>
  );
};

const journeySteps = [
  {
    AnimatedIcon: SmartCaptureIcon,
    title: 'Smart Capture',
    subtitle: 'AI-Powered Recognition',
    description: 'Instantly capture and digitize receipts, invoices, and expenses with advanced AI that understands context and extracts key financial data automatically.',
    color: '#00D4FF',
    position: { x: 20, y: 100 }
  },
  {
    AnimatedIcon: AIProcessingIcon,
    title: 'AI Processing',
    subtitle: 'Intelligent Analysis',
    description: 'Advanced machine learning categorizes, analyzes patterns, and optimizes your financial data while providing predictive insights for better decision-making.',
    color: '#FF0080',
    position: { x: 70, y: 150 }
  },
  {
    AnimatedIcon: UnifiedDashboardIcon,
    title: 'Unified Dashboard',
    subtitle: 'Complete Integration',
    description: 'All financial data from multiple sources converges into one intelligent command center with real-time analytics and comprehensive reporting.',
    color: '#00D4FF',
    position: { x: 25, y: 350 }
  },
  {
    AnimatedIcon: GrowthAccelerationIcon,
    title: 'Growth Acceleration',
    subtitle: 'Strategic Optimization',
    description: 'Make data-driven decisions that accelerate business growth, maximize profitability, and unlock hidden revenue opportunities through AI-powered insights.',
    color: '#FFD700',
    position: { x: 75, y: 400 }
  }
];

const JourneyTimeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Advanced Grid Network Background */}
      <div className="absolute inset-0">
        {/* Dynamic grid pattern */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="advancedGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="0.1"/>
            </pattern>
            <linearGradient id="connectionFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0.6)" />
              <stop offset="25%" stopColor="rgba(255, 0, 128, 0.6)" />
              <stop offset="75%" stopColor="rgba(0, 212, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 215, 0, 0.6)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#advancedGrid)" />
          
          {/* Animated connection network */}
          {journeySteps.map((step, i) => (
            <g key={i}>
              {/* Pulsing connection nodes */}
              <motion.circle
                cx={step.position.x}
                cy={step.position.y}
                r="1.2"
                fill={step.color}
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.7, 1, 0.7], 
                  scale: [1, 2, 1],
                  filter: [
                    `drop-shadow(0 0 10px ${step.color})`,
                    `drop-shadow(0 0 25px ${step.color})`,
                    `drop-shadow(0 0 10px ${step.color})`
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 0.7 
                }}
              />
              
              {/* Data flow connections */}
              {i < journeySteps.length - 1 && (
                <motion.line
                  x1={step.position.x}
                  y1={step.position.y}
                  x2={journeySteps[i + 1].position.x}
                  y2={journeySteps[i + 1].position.y}
                  stroke="url(#connectionFlow)"
                  strokeWidth="0.3"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0], 
                    opacity: [0, 1, 0] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 1 + 1.5 
                  }}
                />
              )}
              
              {/* Energy pulse rings */}
              <motion.circle
                cx={step.position.x}
                cy={step.position.y}
                r="4"
                fill="none"
                stroke={step.color}
                strokeWidth="0.1"
                opacity="0.6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.7 + 1 
                }}
              />
            </g>
          ))}
          
          {/* Background data streams */}
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`stream-${i}`}
              x1={10 + i * 15}
              y1="0"
              x2={15 + i * 15}
              y2="100"
              stroke="rgba(0, 212, 255, 0.1)"
              strokeWidth="0.1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.2
              }}
            />
          ))}
        </svg>
        
        {/* Floating holographic elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border border-cyan-400/20 backdrop-blur-sm"
            style={{
              left: `${15 + (i % 5) * 20}%`,
              top: `${10 + Math.floor(i / 5) * 30}%`,
              transform: `rotate(${i * 24}deg)`
            }}
            animate={{
              rotate: [i * 24, i * 24 + 360],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
              borderColor: [
                'rgba(34, 211, 238, 0.2)',
                'rgba(255, 0, 128, 0.4)',
                'rgba(255, 215, 0, 0.3)',
                'rgba(34, 211, 238, 0.2)'
              ]
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.4))'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Your Path to Financial Mastery
          </motion.h2>
          <motion.p 
            className="text-lg md:text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Four revolutionary steps that transform financial chaos into entrepreneurial mastery through AI-powered intelligence
          </motion.p>
        </motion.div>

        <div ref={ref} className="relative mt-8">
          {/* Journey Steps as Advanced Floating Cards */}
          <div className="relative min-h-[700px] md:min-h-[600px] w-full max-w-6xl mx-auto px-4">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                className="absolute z-10"
                style={{
                  left: index % 2 === 0 ? '8%' : '52%',
                  top: index < 2 ? '20px' : '350px',
                  transform: 'translate(0, 0)',
                }}
                initial={{ opacity: 0, scale: 0.7, y: 100 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.6,
                  type: "spring",
                  stiffness: 60
                }}
              >
                {/* Advanced Holographic Card */}
                <motion.div
                  className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/85 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-4 md:p-6 border-2 border-cyan-400/30 shadow-2xl w-[280px] max-w-[40vw] overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: step.color + '80',
                    boxShadow: `0 0 60px ${step.color}40`
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Holographic scanning effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  />
                  
                  {/* Advanced holographic corners */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-8 h-8 border-cyan-400/80 animate-pulse ${
                        i === 0 ? 'top-3 left-3 border-l-2 border-t-2 rounded-tl-3xl' :
                        i === 1 ? 'top-3 right-3 border-r-2 border-t-2 rounded-tr-3xl' :
                        i === 2 ? 'bottom-3 left-3 border-l-2 border-b-2 rounded-bl-3xl' :
                        'bottom-3 right-3 border-r-2 border-b-2 rounded-br-3xl'
                      }`}
                    />
                  ))}
                  
                  {/* Large animated icon */}
                  <motion.div 
                    className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 cursor-pointer relative"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 15,
                      rotateX: 5
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.AnimatedIcon />
                  </motion.div>
                  
                  {/* Title with ultra-slow animation */}
                  <motion.h3 
                    className="text-lg md:text-xl font-black mb-2 md:mb-3 text-center text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 2, delay: index * 0.6 + 1 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  {/* Subtitle with color */}
                  <motion.p 
                    className="text-sm md:text-base font-semibold mb-3 md:mb-4 text-center"
                    style={{ color: step.color }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 2.5, delay: index * 0.6 + 1.3 }}
                  >
                    {step.subtitle}
                  </motion.p>
                  
                  {/* Description with ultra-slow reveal */}
                  <motion.p 
                    className="text-cyan-100 leading-relaxed text-center text-xs md:text-sm"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 3, delay: index * 0.6 + 1.6 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Status indicator */}
                  <div 
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-2 h-2 md:w-3 md:h-3 rounded-full opacity-90 animate-pulse"
                    style={{ backgroundColor: step.color }}
                  />
                </motion.div>
                
                {/* Step number positioned outside the card */}
                <motion.div
                  className="absolute -top-8 -left-8 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 flex items-center justify-center font-bold text-lg md:text-xl shadow-2xl z-20"
                  style={{ 
                    borderColor: step.color,
                    color: step.color
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${step.color}40`,
                      `0 0 40px ${step.color}80`,
                      `0 0 20px ${step.color}40`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
            
            {/* Symmetrical Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 5 }}>
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#FF0080" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#00D4FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
                </linearGradient>
                <filter id="lineGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Symmetrical Grid Connections */}
              {[
                { from: [22, 15], to: [66, 15], delay: 0 }, // 1→2 (horizontal top)
                { from: [66, 15], to: [66, 75], delay: 1 }, // 2→4 (vertical right)
                { from: [66, 75], to: [22, 75], delay: 2 }, // 4→3 (horizontal bottom)
                { from: [22, 75], to: [22, 15], delay: 3 }, // 3→1 (vertical left)
              ].map((connection, i) => (
                <motion.line
                  key={`grid-connection-${i}`}
                  x1={connection.from[0]}
                  y1={connection.from[1]}
                  x2={connection.to[0]}
                  y2={connection.to[1]}
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.5"
                  filter="url(#lineGlow)"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0], 
                    opacity: [0, 0.8, 0],
                    strokeDashoffset: [0, -20, -40]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: connection.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Symmetrical Connection Nodes */}
              {[
                { pos: [22, 15], color: '#00D4FF' }, // Step 1
                { pos: [66, 15], color: '#FF0080' }, // Step 2  
                { pos: [22, 75], color: '#00D4FF' }, // Step 3
                { pos: [66, 75], color: '#FFD700' }, // Step 4
              ].map((node, i) => (
                <motion.circle
                  key={`node-${i}`}
                  cx={node.pos[0]}
                  cy={node.pos[1]}
                  r="1"
                  fill={node.color}
                  filter="url(#lineGlow)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0.6, 1, 0.6], 
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;