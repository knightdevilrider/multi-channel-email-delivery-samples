import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Ultra-Modern 2030+ Animated Icon Components
const SmartCaptureIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Phone with Neural Scanning */}
      <motion.div
        className="relative w-20 h-32 bg-gradient-to-b from-slate-800/90 via-blue-900/60 to-slate-900/90 rounded-3xl border-2 border-cyan-400/60 backdrop-blur-xl shadow-2xl"
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
        {/* Neural Network Screen */}
        <div className="absolute inset-3 bg-gradient-to-b from-cyan-900/50 via-blue-900/30 to-purple-900/20 rounded-2xl overflow-hidden border border-cyan-400/30">
          {/* AI Scanning Grid */}
          <motion.div
            className="absolute inset-2 border-2 border-cyan-400/80 rounded-xl"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              borderColor: ['rgba(34, 211, 238, 0.8)', 'rgba(0, 255, 136, 0.8)', 'rgba(34, 211, 238, 0.8)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Neural Scanning Beam */}
          <motion.div
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ y: [0, 80, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Data Extraction Points */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: 8 + (i % 3) * 12,
                top: 15 + Math.floor(i / 3) * 20
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
        
        {/* Holographic Corners */}
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
      
      {/* Neural Data Streams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full"
          style={{
            right: -20,
            top: 30 + i * 8,
            transformOrigin: 'left'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0]
          }}
          transition={{
            delay: 1 + i * 0.2,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      ))}
    </div>
  );
};

const AIProcessingIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Quantum AI Core */}
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full relative shadow-2xl"
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
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity },
          boxShadow: { duration: 3, repeat: Infinity }
        }}
      >
        {/* Quantum Layers */}
        <div className="absolute inset-3 border-2 border-white/50 rounded-full">
          <motion.div
            className="absolute inset-2 border border-white/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Neural Synapses */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-6 bg-white/70 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'bottom',
              transform: `rotate(${i * 45}deg) translateX(-50%)`
            }}
            animate={{ 
              scaleY: [1, 1.8, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        
        {/* Quantum Core */}
        <motion.div
          className="absolute inset-6 bg-white/40 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Processing Streams */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"
          style={{
            left: -8,
            top: 35 + i * 8
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4
          }}
        />
      ))}
    </div>
  );
};

const UnifiedDashboardIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Holographic Command Center */}
      <motion.div
        className="relative w-24 h-16 bg-gradient-to-br from-slate-800/90 via-blue-900/60 to-slate-900/90 rounded-2xl border-2 border-cyan-400/60 backdrop-blur-xl shadow-2xl"
        animate={{
          boxShadow: [
            '0 0 30px rgba(34, 211, 238, 0.4)',
            '0 0 60px rgba(34, 211, 238, 0.8)',
            '0 0 30px rgba(34, 211, 238, 0.4)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Neural Dashboard Grid */}
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
        
        {/* Real-time Status */}
        <motion.div
          className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Connected Nodes */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 35;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const colors = ['#4169E1', '#FF007A', '#00ff88', '#ffd700', '#ff6b6b', '#8a2be2'];
        
        return (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-xl shadow-lg border border-white/30 backdrop-blur-xl"
            style={{
              left: `calc(50% + ${x}px - 12px)`,
              top: `calc(50% + ${y}px - 12px)`,
              background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}dd)`
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <div className="absolute inset-1 bg-white/40 rounded-lg" />
          </motion.div>
        );
      })}
    </div>
  );
};

const GrowthAccelerationIcon: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Quantum Growth Chart */}
      <div className="relative w-24 h-16 bg-gradient-to-t from-slate-900/80 via-yellow-900/20 to-transparent rounded-2xl border-2 border-yellow-400/60 backdrop-blur-xl shadow-2xl">
        {/* Holographic Grid */}
        <div className="absolute inset-2 opacity-40">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute w-full h-0.5 bg-yellow-400/20" style={{ top: `${i * 33}%` }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute h-full w-0.5 bg-yellow-400/20" style={{ left: `${i * 25}%` }} />
          ))}
        </div>
        
        {/* Quantum Growth Bars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-2 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400 rounded-t-sm shadow-lg"
            style={{
              left: 4 + i * 3,
              width: 2.5,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: [0, (i + 1) * 3, (i + 2) * 4, (i + 3) * 6],
              opacity: [0, 1, 1, 1],
              boxShadow: [
                '0 0 5px rgba(251, 191, 36, 0.3)',
                '0 0 20px rgba(251, 191, 36, 0.8)',
                '0 0 15px rgba(251, 191, 36, 0.6)'
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
        
        {/* Exponential Curve */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 96 64"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path
            d="M 8 50 Q 20 40 35 25 Q 50 15 70 10 Q 85 5 88 3"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))"
          />
        </motion.svg>
      </div>
      
      {/* Quantum Multiplier */}
      <motion.div
        className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center"
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
        <span className="text-white font-bold text-xs">10x</span>
      </motion.div>
    </div>
  );
};

const journeySteps = [
  {
    AnimatedIcon: SmartCaptureIcon,
    title: 'Neural Capture',
    subtitle: 'AI-Powered Recognition',
    description: 'Quantum-enhanced AI instantly recognizes and processes financial data with 99.9% accuracy through advanced neural networks.',
    color: '#00D4FF',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600'
  },
  {
    AnimatedIcon: AIProcessingIcon,
    title: 'Quantum Processing',
    subtitle: 'Intelligent Analysis',
    description: 'Advanced quantum algorithms analyze patterns, predict trends, and optimize financial strategies in real-time.',
    color: '#FF0080',
    gradient: 'from-pink-500 via-purple-500 to-indigo-600'
  },
  {
    AnimatedIcon: UnifiedDashboardIcon,
    title: 'Neural Command Center',
    subtitle: 'Unified Intelligence',
    description: 'All financial data converges into one intelligent neural network with predictive analytics and autonomous insights.',
    color: '#00D4FF',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600'
  },
  {
    AnimatedIcon: GrowthAccelerationIcon,
    title: 'Quantum Growth',
    subtitle: 'Exponential Optimization',
    description: 'Quantum-powered algorithms unlock exponential growth opportunities and maximize ROI through predictive intelligence.',
    color: '#FFD700',
    gradient: 'from-yellow-400 via-orange-500 to-red-500'
  }
];

const JourneyTimeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Quantum Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255, 0, 128, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255, 215, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px'
        }} />
      </div>
      
      {/* Floating Quantum Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Futuristic Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent relative"
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
            Neural Financial Evolution
            {/* Holographic Accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-60"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Four quantum-powered stages that transform financial chaos into exponential growth through neural intelligence
          </motion.p>
        </motion.div>

        {/* Futuristic Journey Grid */}
        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 1.5, 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  z: 20
                }}
              >
                {/* Quantum Card Container */}
                <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 border-2 border-cyan-400/30 group-hover:border-cyan-400/70 transition-all duration-500 h-full shadow-2xl overflow-hidden">
                  {/* Holographic Scanning Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 6
                    }}
                  />
                  
                  {/* Quantum Corners */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-6 h-6 border-cyan-400/80 ${
                        i === 0 ? 'top-3 left-3 border-l-2 border-t-2 rounded-tl-3xl' :
                        i === 1 ? 'top-3 right-3 border-r-2 border-t-2 rounded-tr-3xl' :
                        i === 2 ? 'bottom-3 left-3 border-l-2 border-b-2 rounded-bl-3xl' :
                        'bottom-3 right-3 border-r-2 border-b-2 rounded-br-3xl'
                      }`}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        borderColor: [step.color + '80', step.color, step.color + '80']
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                  
                  {/* Step Number with Quantum Glow */}
                  <motion.div
                    className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 flex items-center justify-center font-bold text-lg shadow-2xl z-20"
                    style={{ 
                      borderColor: step.color,
                      color: step.color
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${step.color}40`,
                        `0 0 40px ${step.color}80`,
                        `0 0 20px ${step.color}40`
                      ],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {index + 1}
                  </motion.div>
                  
                  {/* Quantum Icon */}
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-4 cursor-pointer relative"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 15,
                      rotateX: 5
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.AnimatedIcon />
                  </motion.div>
                  
                  {/* Neural Title */}
                  <motion.h3 
                    className="text-xl font-black mb-2 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 2, delay: index * 0.3 + 1 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  {/* Quantum Subtitle */}
                  <motion.p 
                    className="text-sm font-semibold mb-3 text-center"
                    style={{ color: step.color }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 2.5, delay: index * 0.3 + 1.3 }}
                  >
                    {step.subtitle}
                  </motion.p>
                  
                  {/* Neural Description */}
                  <motion.p 
                    className="text-cyan-100 leading-relaxed text-center text-sm"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 3, delay: index * 0.3 + 1.6 }}
                  >
                    {step.description}
                  </motion.p>

                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;