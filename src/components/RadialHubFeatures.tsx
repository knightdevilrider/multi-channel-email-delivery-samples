import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Camera, 
  Mic, 
  TrendingUp, 
  Zap, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Brain,
  Target
} from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  glowColor: string;
  position: { x: number; y: number };
}

const features: Feature[] = [
  {
    id: 'ai-capture',
    icon: Camera,
    title: 'Instant AI Capture',
    description: 'Snap receipts and let AI instantly categorize, extract data, and organize your expenses with 99% accuracy.',
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'cyan-400',
    position: { x: -200, y: -100 }
  },
  {
    id: 'voice-control',
    icon: Mic,
    title: 'Voice-First Control',
    description: 'Simply speak your expenses naturally. Our advanced AI understands context and processes voice commands instantly.',
    color: 'from-pink-500 to-purple-600',
    glowColor: 'pink-500',
    position: { x: 200, y: -100 }
  },
  {
    id: 'predictive-insights',
    icon: TrendingUp,
    title: 'Predictive Insights',
    description: 'AI-powered forecasting analyzes spending patterns to predict future expenses and optimize your budget.',
    color: 'from-green-400 to-emerald-500',
    glowColor: 'green-400',
    position: { x: 200, y: 100 }
  },
  {
    id: 'one-tap-onboarding',
    icon: Target,
    title: 'One-Tap Onboarding',
    description: 'Get started in seconds with intelligent setup that learns your business patterns and preferences automatically.',
    color: 'from-yellow-400 to-orange-500',
    glowColor: 'yellow-400',
    position: { x: -200, y: 100 }
  }
];

const RadialHubFeatures: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (isMobile && inView) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, inView]);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-dark-bg via-slate-900/50 to-dark-bg">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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
        {/* Section Header */}
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
            Revolutionary Features
          </motion.h2>
          <motion.p 
            className="text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Experience the future of expense management with AI-powered capabilities
          </motion.p>
        </motion.div>

        <div ref={ref}>
          {/* Desktop Radial Hub Layout */}
          <div className="hidden md:block">
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Central Hub */}
              <motion.div
                className="relative z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full relative shadow-2xl"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 40px rgba(139, 92, 246, 0.5)',
                      '0 0 80px rgba(139, 92, 246, 0.8)',
                      '0 0 40px rgba(139, 92, 246, 0.5)'
                    ]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity },
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                >
                  <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                  
                  {/* Orbital rings */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={`ring-${i}`}
                      className="absolute border border-purple-400/30 rounded-full"
                      style={{
                        width: 160 + i * 40,
                        height: 160 + i * 40,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{
                        duration: 30 + i * 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Central Hub Label */}
                <motion.div
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Unified Hub</h3>
                  <p className="text-cyan-300 text-sm">AI-Powered Core</p>
                </motion.div>
              </motion.div>

              {/* Feature Nodes */}
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${feature.position.x}px)`,
                    top: `calc(50% + ${feature.position.y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Connection Line */}
                  <motion.div
                    className="absolute w-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60"
                    style={{
                      height: Math.sqrt(feature.position.x ** 2 + feature.position.y ** 2),
                      left: '50%',
                      top: '50%',
                      transformOrigin: 'top',
                      transform: `translate(-50%, -50%) rotate(${Math.atan2(feature.position.y, feature.position.x) * 180 / Math.PI + 90}deg)`
                    }}
                    animate={{ 
                      opacity: hoveredFeature === feature.id ? 1 : 0.6,
                      boxShadow: hoveredFeature === feature.id ? 
                        `0 0 20px rgba(34, 211, 238, 0.8)` : 
                        `0 0 10px rgba(34, 211, 238, 0.4)`
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Feature Card */}
                  <motion.div
                    className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-6 border-2 border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-500 w-80 shadow-2xl"
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      z: 50
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Holographic corners */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-3xl animate-pulse" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-3xl animate-pulse" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-3xl animate-pulse" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60 rounded-br-3xl animate-pulse" />

                    {/* Feature Icon */}
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} p-4 shadow-lg`}
                      animate={{
                        boxShadow: hoveredFeature === feature.id ? 
                          `0 0 30px rgba(34, 211, 238, 0.6)` : 
                          `0 0 15px rgba(34, 211, 238, 0.3)`
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </motion.div>

                    {/* Feature Content */}
                    <h3 className="text-xl font-bold text-white mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-cyan-100 text-sm leading-relaxed text-center">
                      {feature.description}
                    </p>

                    {/* Status indicator */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-pulse" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel Layout */}
          <div className="md:hidden">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-3xl">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {features.map((feature, index) => (
                    <div key={feature.id} className="w-full flex-shrink-0 px-4">
                      <motion.div
                        className="bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 border-2 border-cyan-400/20 shadow-2xl text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        {/* Holographic corners */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-3xl animate-pulse" />
                        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-3xl animate-pulse" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-3xl animate-pulse" />
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60 rounded-br-3xl animate-pulse" />

                        {/* Feature Icon */}
                        <motion.div
                          className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} p-5 shadow-lg`}
                          animate={{
                            boxShadow: [
                              `0 0 20px rgba(34, 211, 238, 0.3)`,
                              `0 0 40px rgba(34, 211, 238, 0.6)`,
                              `0 0 20px rgba(34, 211, 238, 0.3)`
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <feature.icon className="w-full h-full text-white" />
                        </motion.div>

                        {/* Feature Content */}
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-cyan-100 leading-relaxed">
                          {feature.description}
                        </p>

                        {/* Decorative elements */}
                        <div className="absolute top-6 right-6 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-pulse" />
                        <div className="absolute bottom-6 left-6 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse" />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-between items-center mt-8">
                <motion.button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6 text-cyan-400" />
                </motion.button>

                {/* Slide Indicators */}
                <div className="flex space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                          : 'bg-slate-600/50 hover:bg-cyan-400/50'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6 text-cyan-400" />
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 w-full bg-slate-800/50 rounded-full h-1">
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentSlide + 1) / features.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadialHubFeatures;