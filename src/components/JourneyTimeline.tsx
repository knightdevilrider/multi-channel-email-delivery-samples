import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Cpu, Layers, TrendingUp } from 'lucide-react';

// Enhanced Animated Icon Components for Journey Steps
const CaptureIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Phone with Camera */}
      <motion.div
        className="relative w-16 h-24 bg-gradient-to-b from-slate-800/90 via-slate-900/80 to-black/90 rounded-2xl border-2 border-cyan-400/60 backdrop-blur-xl shadow-2xl"
        animate={{ 
          rotateY: [0, 10, -10, 0],
          boxShadow: [
            '0 0 20px rgba(34, 211, 238, 0.4)',
            '0 0 40px rgba(34, 211, 238, 0.7)',
            '0 0 20px rgba(34, 211, 238, 0.4)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Screen with camera interface */}
        <div className="absolute inset-2 bg-gradient-to-b from-slate-900 via-blue-900/30 to-purple-900/20 rounded-xl overflow-hidden border border-cyan-400/30">
          {/* Camera viewfinder */}
          <motion.div
            className="absolute inset-4 border-2 border-cyan-400/60 rounded-lg"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Receipt being captured */}
          <motion.div
            className="absolute bottom-6 left-3 right-3 h-12 bg-gradient-to-b from-white via-gray-100 to-white rounded-lg shadow-lg border border-gray-300"
            initial={{ y: 30, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
          >
            {/* Receipt lines */}
            <div className="p-2 space-y-1">
              {[...Array(4)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="h-0.5 bg-gray-700 rounded"
                  style={{ width: `${60 + i * 10}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${60 + i * 10}%` }}
                  transition={{ delay: 1.5 + i * 0.2, duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Scanning effect */}
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ y: [0, 70, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Camera flash */}
        <motion.div
          className="absolute inset-0 bg-white rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ delay: 2.5, duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
        />
      </motion.div>
      
      {/* Data extraction particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            right: -10 + Math.random() * 20,
            top: 20 + Math.random() * 40
          }}
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 3 + i * 0.3
          }}
        />
      ))}
    </div>
  );
};

const AIOptimizeIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* AI Brain Core */}
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full relative shadow-2xl"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(236, 72, 153, 0.5)',
            '0 0 40px rgba(236, 72, 153, 0.8)',
            '0 0 20px rgba(236, 72, 153, 0.5)'
          ]
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity },
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        {/* Inner neural network */}
        <div className="absolute inset-3 border-2 border-white/40 rounded-full">
          <motion.div
            className="absolute inset-2 border border-white/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Neural synapses */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-6 bg-white/60 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'bottom',
              transform: `rotate(${i * 45}deg) translateX(-50%)`
            }}
            animate={{ 
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
      
      {/* Data processing streams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"
          style={{
            left: -8,
            top: 30 + i * 8,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* AI insights floating out */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`insight-${i}`}
          className="absolute w-2 h-2 bg-purple-400 rounded-full"
          style={{
            right: -5 + Math.random() * 15,
            top: 15 + Math.random() * 30
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1 + i * 0.4
          }}
        />
      ))}
    </div>
  );
};

const UnifyIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Dashboard Hub */}
      <motion.div
        className="w-16 h-12 bg-gradient-to-br from-slate-800 via-blue-900/50 to-slate-900 rounded-xl border-2 border-cyan-400/60 backdrop-blur-xl shadow-2xl relative"
        animate={{
          boxShadow: [
            '0 0 20px rgba(34, 211, 238, 0.4)',
            '0 0 40px rgba(34, 211, 238, 0.7)',
            '0 0 20px rgba(34, 211, 238, 0.4)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Dashboard grid */}
        <div className="absolute inset-2 grid grid-cols-3 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-cyan-400/30 rounded-sm"
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                backgroundColor: [
                  'rgba(34, 211, 238, 0.3)',
                  'rgba(139, 92, 246, 0.5)',
                  'rgba(34, 211, 238, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Connected data sources */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const colors = ['#4169E1', '#FF007A', '#00ff88', '#ffd700', '#ff6b6b', '#8a2be2'];
        
        return (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-lg shadow-lg border border-white/20 backdrop-blur-xl"
            style={{
              left: `calc(50% + ${x}px - 12px)`,
              top: `calc(50% + ${y}px - 12px)`,
              background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}dd)`
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            {/* Connection line to center */}
            <motion.div
              className="absolute w-0.5 bg-current opacity-50 rounded-full"
              style={{
                height: radius,
                left: '50%',
                top: '50%',
                transformOrigin: 'top',
                transform: `rotate(${180 + i * 60}deg) translateX(-50%)`,
                background: `linear-gradient(to bottom, ${colors[i]}, transparent)`
              }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Data flow animation */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`flow-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            x: [0, 15, 0, -15, 0],
            y: [0, -15, 0, 15, 0],
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1, 1, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1
          }}
        />
      ))}
    </div>
  );
};

const ThriveIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Growth Chart Hologram */}
      <div className="relative w-20 h-16 bg-gradient-to-t from-slate-900/80 via-yellow-900/20 to-transparent rounded-xl border-2 border-yellow-400/60 backdrop-blur-xl shadow-2xl">
        {/* Chart grid */}
        <div className="absolute inset-2 opacity-40">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute w-full h-0.5 bg-yellow-400/20" style={{ top: `${i * 25}%` }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute h-full w-0.5 bg-yellow-400/20" style={{ left: `${i * 25}%` }} />
          ))}
        </div>
        
        {/* Animated growth bars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-2 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400 rounded-t-sm shadow-lg"
            style={{
              left: 4 + i * 2.5,
              width: 2,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: [0, (i + 1) * 6, (i + 2) * 8, (i + 3) * 10],
              opacity: [0, 1, 1, 1],
              boxShadow: [
                '0 0 5px rgba(251, 191, 36, 0.3)',
                '0 0 15px rgba(251, 191, 36, 0.6)',
                '0 0 10px rgba(251, 191, 36, 0.4)'
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
        
        {/* Growth trend line */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 80 64"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path
            d="M 8 48 Q 20 35 32 25 T 72 8"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))"
          />
        </motion.svg>
      </div>
      
      {/* Success indicators */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg"
        animate={{ 
          scale: [1, 1.3, 1],
          boxShadow: [
            '0 0 10px rgba(34, 197, 94, 0.5)',
            '0 0 20px rgba(34, 197, 94, 0.8)',
            '0 0 10px rgba(34, 197, 94, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute inset-1 bg-white/40 rounded-full animate-pulse" />
      </motion.div>
      
      {/* Profit arrows */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full"
          style={{
            right: -10,
            top: 20 + i * 6,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1 + i * 0.4
          }}
        />
      ))}
      
      {/* Growth sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            right: -5 + Math.random() * 15,
            top: 10 + Math.random() * 25
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 2 + i * 0.5
          }}
        />
      ))}
    </div>
  );
};

const journeySteps = [
  {
    AnimatedIcon: CaptureIcon,
    title: 'Capture',
    subtitle: 'Snap, Speak, Sync',
    description: 'Effortlessly capture expenses through photos, voice commands, or automatic sync with your financial accounts.',
    color: '#00D4FF',
    position: { x: 15, y: 120 }
  },
  {
    AnimatedIcon: AIOptimizeIcon,
    title: 'AI Optimizes',
    subtitle: 'Intelligent Processing',
    description: 'Advanced AI categorizes, analyzes, and optimizes your financial data with predictive insights.',
    color: '#FF0080',
    position: { x: 75, y: 200 }
  },
  {
    AnimatedIcon: UnifyIcon,
    title: 'Unify',
    subtitle: 'Dashboard Merge',
    description: 'All financial data converges into a unified, intuitive dashboard with real-time analytics.',
    color: '#00D4FF',
    position: { x: 20, y: 400 }
  },
  {
    AnimatedIcon: ThriveIcon,
    title: 'Thrive',
    subtitle: 'Growth Acceleration',
    description: 'Make data-driven decisions that accelerate growth and maximize profitability.',
    color: '#FFD700',
    position: { x: 70, y: 520 }
  }
];

const JourneyTimeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Grid Network Background */}
      <div className="absolute inset-0">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="journeyGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="0.1"/>
            </pattern>
            <linearGradient id="connectionGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0.4)" />
              <stop offset="25%" stopColor="rgba(255, 0, 128, 0.4)" />
              <stop offset="75%" stopColor="rgba(0, 212, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 215, 0, 0.4)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#journeyGrid)" />
          
          {/* Animated connection lines between journey steps */}
          {journeySteps.map((step, i) => (
            <g key={i}>
              {/* Glowing connection nodes */}
              <motion.circle
                cx={benefit.position.x}
                cy={benefit.position.y / 8}
                r="1.2"
                fill={step.color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.6, 1, 0.6], 
                  scale: [1, 1.8, 1],
                  filter: [
                    `drop-shadow(0 0 8px ${step.color})`,
                    `drop-shadow(0 0 20px ${step.color})`,
                    `drop-shadow(0 0 8px ${step.color})`
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 0.7 
                }}
              />
              
              {/* Connection lines between steps */}
              {i < journeySteps.length - 1 && (
                <motion.line
                  x1={benefit.position.x}
                  y1={benefit.position.y / 8}
                  x2={journeySteps[i + 1].position.x}
                  y2={journeySteps[i + 1].position.y / 8}
                  stroke="url(#connectionGlow)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0], 
                    opacity: [0, 0.9, 0] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 1 + 1.5 
                  }}
                />
              )}
              
              {/* Pulsing energy rings */}
              <motion.circle
                cx={benefit.position.x}
                cy={benefit.position.y / 8}
                r="3"
                fill="none"
                stroke={step.color}
                strokeWidth="0.1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 0.7 + 0.5 
                }}
              />
            </g>
          ))}
        </svg>
        
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 border border-cyan-400/30 backdrop-blur-sm"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 30}%`,
              transform: `rotate(${i * 30}deg)`
            }}
            animate={{
              rotate: [i * 30, i * 30 + 360],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.3))'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Your Path to Financial Mastery
          </motion.h2>
          <motion.p 
            className="text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.8 }}
          >
            Four transformative steps that revolutionize how you manage business finances
          </motion.p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Journey Steps as Floating Cards - Fixed Container */}
          <div className="relative min-h-[800px] w-full">
          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              className="absolute z-10"
              style={{
                left: `${step.position.x}%`,
                top: `${step.position.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.4,
                type: "spring",
                stiffness: 80
              }}
            >
              {/* Floating Card */}
              <motion.div
                className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 border-2 border-cyan-400/30 shadow-2xl w-[300px] max-w-[90vw]"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: step.color + '80',
                  boxShadow: `0 0 40px ${step.color}40`
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Holographic corners */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-3xl animate-pulse" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-3xl animate-pulse" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-3xl animate-pulse" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60 rounded-br-3xl animate-pulse" />
                
                {/* Large animated icon */}
                <motion.div 
                  className="w-20 h-20 mx-auto mb-4 cursor-pointer relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <step.AnimatedIcon />
                </motion.div>
                
                {/* Title with slow animation */}
                <motion.h3 
                  className="text-xl font-black mb-2 text-center text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 2, delay: index * 0.4 + 0.8 }}
                >
                  {step.title}
                </motion.h3>
                
                {/* Subtitle */}
                <motion.p 
                  className="text-sm font-semibold mb-3 text-center"
                  style={{ color: step.color }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 2.5, delay: index * 0.4 + 1 }}
                >
                  {step.subtitle}
                </motion.p>
                
                {/* Description with slower reveal */}
                <motion.p 
                  className="text-cyan-100 leading-relaxed text-center text-sm"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 3, delay: index * 0.4 + 1.2 }}
                >
                  {step.description}
                </motion.p>

                {/* Scanning line effect */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                />
                
                {/* Status indicator */}
                <div 
                  className="absolute top-6 right-6 w-3 h-3 rounded-full opacity-80 animate-pulse"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;