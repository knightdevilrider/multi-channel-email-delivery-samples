import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, Zap, TrendingUp, Brain, Shield } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Solutions',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'ExpenseIQ transformed our financial chaos into crystal-clear insights. We\'ve saved $50K in the first quarter alone.',
    rating: 5,
    savings: '$50,000',
    metric: '300% ROI',
    icon: TrendingUp,
    color: '#00D4FF'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder, GrowthLab',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The voice commands are revolutionary. I can manage expenses while driving to client meetings. Pure genius.',
    rating: 5,
    savings: '$28,500',
    metric: '98% Accuracy',
    icon: Brain,
    color: '#FF0080'
  },
  {
    name: 'Emily Watson',
    role: 'CFO, InnovateCorp',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The AI predictions helped us avoid a cash flow crisis. ExpenseIQ isn\'t just software—it\'s a financial advisor.',
    rating: 5,
    savings: '$125,000',
    metric: '99.9% Uptime',
    icon: Shield,
    color: '#00FF88'
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-32 relative overflow-hidden" id="testimonials">
      {/* Quantum Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255, 0, 128, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.4) 1px, transparent 1px),
            linear-gradient(45deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255, 0, 128, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 120px 120px, 80px 80px, 60px 60px, 60px 60px'
        }} />
      </div>
      
      {/* Floating Quantum Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
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
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative"
            style={{ filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.4))' }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Neural Success Stories
            
            {/* Quantum Accent */}
            <motion.div
              className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-60"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Brain className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </motion.h2>
          <motion.p 
            className="text-2xl text-cyan-100 max-w-4xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Quantum-powered results from visionary entrepreneurs who've revolutionized their financial neural networks
          </motion.p>
        </motion.div>

        {/* Holographic Testimonial Display */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Holographic Container */}
          <motion.div
            className="relative bg-gradient-to-br from-slate-900/20 via-blue-900/10 to-purple-900/20 backdrop-blur-3xl rounded-[3rem] border-2 border-cyan-400/30 p-12 overflow-hidden shadow-2xl"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
                linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)
              `
            }}
            animate={{
              borderColor: [
                'rgba(34, 211, 238, 0.3)',
                'rgba(255, 0, 128, 0.5)',
                'rgba(0, 255, 136, 0.4)',
                'rgba(34, 211, 238, 0.3)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            {/* Quantum Scanning Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Holographic Scanning Beam */}
            <motion.div
              className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
              animate={{
                y: [0, 600, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />

            {/* Quantum Corner Accents */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-16 h-16 border-cyan-400 ${
                  i === 0 ? 'top-4 left-4 border-l-4 border-t-4 rounded-tl-3xl' :
                  i === 1 ? 'top-4 right-4 border-r-4 border-t-4 rounded-tr-3xl' :
                  i === 2 ? 'bottom-4 left-4 border-l-4 border-b-4 rounded-bl-3xl' :
                  'bottom-4 right-4 border-r-4 border-b-4 rounded-br-3xl'
                }`}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  borderColor: [currentTestimonial.color + '80', currentTestimonial.color, currentTestimonial.color + '80']
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                {/* Neural Metrics Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Savings Metric */}
                  <motion.div
                    className="text-center p-6 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-2xl border border-green-400/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-4xl font-black text-green-400 mb-2"
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(34, 197, 94, 0.5)',
                          '0 0 40px rgba(34, 197, 94, 0.8)',
                          '0 0 20px rgba(34, 197, 94, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentTestimonial.savings}
                    </motion.div>
                    <div className="text-green-300 font-semibold">Neural Savings</div>
                  </motion.div>

                  {/* Performance Metric */}
                  <motion.div
                    className="text-center p-6 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-2xl border border-purple-400/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-4xl font-black text-purple-400 mb-2"
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(168, 85, 247, 0.5)',
                          '0 0 40px rgba(168, 85, 247, 0.8)',
                          '0 0 20px rgba(168, 85, 247, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentTestimonial.metric}
                    </motion.div>
                    <div className="text-purple-300 font-semibold">Quantum Performance</div>
                  </motion.div>

                  {/* Rating Metric */}
                  <motion.div
                    className="text-center p-6 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-2xl border border-yellow-400/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                        >
                          <Star 
                            className="w-6 h-6 text-yellow-400 fill-current" 
                            style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))' }}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-yellow-300 font-semibold">Neural Rating</div>
                  </motion.div>
                </div>

                {/* Holographic Quote Display */}
                <div className="text-center mb-12">
                  <motion.div
                    className="relative inline-block mb-8"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <div className="w-24 h-24 mx-auto relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full animate-pulse" />
                      <Quote 
                        className="w-full h-full text-cyan-400 relative z-10" 
                        style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))' }}
                      />
                      
                      {/* Neural Synapses */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-6 bg-cyan-400/60 rounded-full"
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
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  <blockquote className="text-3xl md:text-4xl text-white mb-12 leading-relaxed font-light max-w-4xl mx-auto">
                    <motion.span
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(255, 255, 255, 0.3)',
                          '0 0 40px rgba(255, 255, 255, 0.5)',
                          '0 0 20px rgba(255, 255, 255, 0.3)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      "{currentTestimonial.content}"
                    </motion.span>
                  </blockquote>
                </div>

                {/* Quantum Author Profile */}
                <div className="flex items-center justify-center space-x-8">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-2xl relative z-10"
                      style={{ filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.6))' }}
                    />
                    
                    {/* Holographic Rings */}
                    <motion.div
                      className="absolute inset-0 border-2 border-purple-400/60 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-4 border border-cyan-400/40 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Neural Activity Indicator */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          '0 0 15px rgba(34, 197, 94, 0.5)',
                          '0 0 30px rgba(34, 197, 94, 0.9)',
                          '0 0 15px rgba(34, 197, 94, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <currentTestimonial.icon className="w-4 h-4 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="text-left">
                    <div className="text-3xl font-bold text-white mb-2">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-xl text-cyan-300 font-medium mb-4">
                      {currentTestimonial.role}
                    </div>
                    <motion.div 
                      className="px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-sm rounded-full border border-green-400/40 text-green-400 font-semibold inline-block"
                      animate={{
                        boxShadow: [
                          '0 0 15px rgba(34, 197, 94, 0.3)',
                          '0 0 30px rgba(34, 197, 94, 0.6)',
                          '0 0 15px rgba(34, 197, 94, 0.3)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      NEURAL VERIFIED
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quantum Navigation */}
            <div className="flex justify-center items-center space-x-8 mt-16">
              <motion.button
                onClick={prevTestimonial}
                className="p-4 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>

              {/* Quantum Indicators */}
              <div className="flex space-x-4">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-6 h-6 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                        : 'bg-slate-600/50 hover:bg-cyan-400/50 border border-cyan-400/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    animate={index === currentIndex ? {
                      boxShadow: [
                        '0 0 15px rgba(34, 211, 238, 0.5)',
                        '0 0 30px rgba(34, 211, 238, 0.8)',
                        '0 0 15px rgba(34, 211, 238, 0.5)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                className="p-4 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>
            </div>

            {/* Neural Status Display */}
            <div className="absolute top-8 right-8 flex space-x-3">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>

            {/* Quantum Processing Indicator */}
            <motion.div
              className="absolute bottom-8 left-8 w-8 h-8 border-2 border-purple-400/60 rounded-full flex items-center justify-center"
              animate={{
                rotate: 360,
                borderColor: ['#a855f7', '#22d3ee', '#00ff88', '#a855f7']
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;