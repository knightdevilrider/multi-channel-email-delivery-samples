import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Zap, TrendingUp, Brain, Shield } from 'lucide-react';

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
      }, 4000);
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
    <section className="py-16 relative overflow-hidden" id="testimonials">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Success Stories
          </motion.h2>
          <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
            Real results from visionary entrepreneurs
          </p>
        </motion.div>

        {/* Circular Testimonial Container */}
        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-0 z-20 p-3 rounded-full bg-slate-800/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className="absolute right-0 z-20 p-3 rounded-full bg-slate-800/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          </motion.button>

          {/* Circular Testimonial Card */}
          <motion.div
            className="relative w-96 h-96 mx-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl border-2 border-cyan-400/30 p-8 overflow-hidden shadow-2xl"
                initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  rotateY: 0, 
                  scale: 1,
                  borderColor: currentTestimonial.color + '60'
                }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                style={{
                  boxShadow: `0 0 40px ${currentTestimonial.color}40`
                }}
              >
                {/* Holographic Scanning Ring */}
                <motion.div
                  className="absolute inset-4 border-2 rounded-full opacity-30"
                  style={{ borderColor: currentTestimonial.color }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                  {/* Avatar with Neural Ring */}
                  <motion.div
                    className="relative mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-20 h-20 rounded-full border-3 shadow-xl relative z-10"
                      style={{ 
                        borderColor: currentTestimonial.color,
                        filter: `drop-shadow(0 0 20px ${currentTestimonial.color}60)`
                      }}
                    />
                    
                    {/* Neural Activity Ring */}
                    <motion.div
                      className="absolute inset-0 border-2 rounded-full opacity-60"
                      style={{ borderColor: currentTestimonial.color }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Status Indicator */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: currentTestimonial.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          `0 0 10px ${currentTestimonial.color}60`,
                          `0 0 20px ${currentTestimonial.color}80`,
                          `0 0 10px ${currentTestimonial.color}60`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <currentTestimonial.icon className="w-3 h-3 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Quote */}
                  <blockquote className="text-white text-sm mb-4 leading-relaxed max-w-xs">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="mb-4">
                    <div className="text-white font-bold text-lg mb-1">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-cyan-300 text-sm mb-2">
                      {currentTestimonial.role}
                    </div>
                    
                    {/* Stars */}
                    <div className="flex justify-center space-x-1 mb-3">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        >
                          <Star 
                            className="w-4 h-4 text-yellow-400 fill-current" 
                            style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))' }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 w-full max-w-xs px-4">
                    <div className="text-center p-2 bg-green-400/10 rounded-lg border border-green-400/30">
                      <div className="text-green-400 font-bold text-sm">
                        {currentTestimonial.savings}
                      </div>
                      <div className="text-green-300 text-xs truncate">Saved</div>
                    </div>
                    <div className="text-center p-2 bg-purple-400/10 rounded-lg border border-purple-400/30">
                      <div className="text-purple-400 font-bold text-sm">
                        {currentTestimonial.metric}
                      </div>
                      <div className="text-purple-300 text-xs truncate">Performance</div>
                    </div>
                  </div>
                </div>

                {/* Quantum Corners */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-8 h-8 ${
                      i === 0 ? 'top-4 left-4 border-l-2 border-t-2 rounded-tl-full' :
                      i === 1 ? 'top-4 right-4 border-r-2 border-t-2 rounded-tr-full' :
                      i === 2 ? 'bottom-4 left-4 border-l-2 border-b-2 rounded-bl-full' :
                      'bottom-4 right-4 border-r-2 border-b-2 rounded-br-full'
                    }`}
                    style={{ borderColor: currentTestimonial.color }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      borderColor: [currentTestimonial.color + '60', currentTestimonial.color, currentTestimonial.color + '60']
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'shadow-lg'
                  : 'bg-slate-600/50 hover:bg-cyan-400/50 border border-cyan-400/30'
              }`}
              style={{
                backgroundColor: index === currentIndex ? currentTestimonial.color : undefined,
                boxShadow: index === currentIndex ? `0 0 15px ${currentTestimonial.color}60` : undefined
              }}
              whileHover={{ scale: 1.2 }}
              animate={index === currentIndex ? {
                boxShadow: [
                  `0 0 10px ${currentTestimonial.color}40`,
                  `0 0 20px ${currentTestimonial.color}80`,
                  `0 0 10px ${currentTestimonial.color}40`
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;