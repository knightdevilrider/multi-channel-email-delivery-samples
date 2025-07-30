import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Zap, TrendingUp, Brain, Shield, Sparkles, Award } from 'lucide-react';

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
    color: '#00D4FF',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600'
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
    color: '#FF0080',
    gradient: 'from-pink-500 via-purple-500 to-indigo-600'
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
    color: '#00FF88',
    gradient: 'from-emerald-400 via-green-500 to-teal-600'
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
    });
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-900/20 via-black/40 to-slate-900/20" 
      id="testimonials"
      onMouseMove={handleMouseMove}
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 0, 122, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
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
        {/* Ultra-Modern Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full border border-cyan-400/30 backdrop-blur-xl"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">SUCCESS STORIES</span>
            <Sparkles className="w-6 h-6 text-pink-400" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.3))'
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
            Visionary Results
            
            {/* Holographic Accent */}
            <motion.div
              className="absolute -top-4 -right-8 w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-60 blur-sm"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            Real entrepreneurs. Revolutionary results. Exponential growth.
          </motion.p>
        </motion.div>

        {/* Holographic Testimonial Display */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Controls */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={prevTestimonial}
              className="group relative p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border-2 border-cyan-400/40 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-8 h-8 text-cyan-400 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={nextTestimonial}
              className="group relative p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border-2 border-cyan-400/40 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-8 h-8 text-cyan-400 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          {/* Main Testimonial Card */}
          <div className="mx-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  rotateX: mousePosition.y * 2,
                  rotateZ: mousePosition.x * 1
                }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                {/* Holographic Card */}
                <div 
                  className={`relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl rounded-3xl p-12 border-2 transition-all duration-500 overflow-hidden shadow-2xl`}
                  style={{
                    borderColor: currentTestimonial.color + '60',
                    boxShadow: `0 0 60px ${currentTestimonial.color}40, inset 0 0 60px rgba(255,255,255,0.05)`
                  }}
                >
                  {/* Neural Scanning Lines */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 4
                    }}
                  />

                  {/* Holographic Grid Overlay */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `
                      linear-gradient(${currentTestimonial.color}40 1px, transparent 1px),
                      linear-gradient(90deg, ${currentTestimonial.color}40 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                  }} />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    {/* Avatar Section */}
                    <motion.div
                      className="text-center lg:text-left"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="relative inline-block mb-6">
                        {/* Avatar with Neural Ring */}
                        <div className="relative">
                          <img
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.name}
                            className="w-32 h-32 rounded-full border-4 shadow-2xl relative z-10"
                            style={{ 
                              borderColor: currentTestimonial.color,
                              filter: `drop-shadow(0 0 30px ${currentTestimonial.color}60)`
                            }}
                          />
                          
                          {/* Rotating Neural Rings */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 border-2 rounded-full opacity-40"
                              style={{ 
                                borderColor: currentTestimonial.color,
                                width: `${140 + i * 20}px`,
                                height: `${140 + i * 20}px`,
                                left: `${-10 - i * 10}px`,
                                top: `${-10 - i * 10}px`
                              }}
                              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                            />
                          ))}

                          {/* Status Indicator */}
                          <motion.div
                            className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
                            style={{ backgroundColor: currentTestimonial.color }}
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                `0 0 20px ${currentTestimonial.color}60`,
                                `0 0 40px ${currentTestimonial.color}80`,
                                `0 0 20px ${currentTestimonial.color}60`
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <currentTestimonial.icon className="w-6 h-6 text-white" />
                          </motion.div>
                        </div>

                        {/* Author Info */}
                        <div className="mt-6">
                          <h3 className="text-2xl font-black text-white mb-2">
                            {currentTestimonial.name}
                          </h3>
                          <p className="text-cyan-300 font-semibold mb-4">
                            {currentTestimonial.role}
                          </p>
                          
                          {/* Stars */}
                          <div className="flex justify-center lg:justify-start space-x-1">
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  rotate: [0, 360]
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity, 
                                  delay: i * 0.2 
                                }}
                              >
                                <Star 
                                  className="w-6 h-6 text-yellow-400 fill-current" 
                                  style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))' }}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Quote Section */}
                    <div className="lg:col-span-2">
                      <motion.blockquote 
                        className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      >
                        <span className="text-6xl text-cyan-400 opacity-50 absolute -top-4 -left-4">"</span>
                        {currentTestimonial.content}
                        <span className="text-6xl text-cyan-400 opacity-50 absolute -bottom-8 -right-4">"</span>
                      </motion.blockquote>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-6">
                        <motion.div
                          className="relative p-6 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-green-600/20 rounded-2xl border border-green-400/40 backdrop-blur-sm overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative z-10">
                            <div className="text-3xl font-black text-green-400 mb-2">
                              {currentTestimonial.savings}
                            </div>
                            <div className="text-green-300 font-semibold">Total Saved</div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>

                        <motion.div
                          className="relative p-6 bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-purple-600/20 rounded-2xl border border-purple-400/40 backdrop-blur-sm overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative z-10">
                            <div className="text-3xl font-black text-purple-400 mb-2">
                              {currentTestimonial.metric}
                            </div>
                            <div className="text-purple-300 font-semibold">Performance</div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Quantum Corners */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-8 h-8 ${
                        i === 0 ? 'top-6 left-6 border-l-2 border-t-2 rounded-tl-2xl' :
                        i === 1 ? 'top-6 right-6 border-r-2 border-t-2 rounded-tr-2xl' :
                        i === 2 ? 'bottom-6 left-6 border-l-2 border-b-2 rounded-bl-2xl' :
                        'bottom-6 right-6 border-r-2 border-b-2 rounded-br-2xl'
                      }`}
                      style={{ borderColor: currentTestimonial.color }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        borderColor: [
                          currentTestimonial.color + '60', 
                          currentTestimonial.color, 
                          currentTestimonial.color + '60'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Neural Indicators */}
        <div className="flex justify-center space-x-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-4 h-4 rounded-full transition-all duration-300 overflow-hidden ${
                index === currentIndex ? '' : 'bg-slate-600/50 hover:bg-cyan-400/50'
              }`}
              style={{
                backgroundColor: index === currentIndex ? testimonial.color : undefined,
                boxShadow: index === currentIndex ? `0 0 20px ${testimonial.color}60` : undefined
              }}
              whileHover={{ scale: 1.3 }}
              animate={index === currentIndex ? {
                boxShadow: [
                  `0 0 15px ${testimonial.color}40`,
                  `0 0 30px ${testimonial.color}80`,
                  `0 0 15px ${testimonial.color}40`
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: testimonial.color }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;