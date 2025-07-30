import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import AccessibleCarousel from './AccessibleCarousel';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Solutions',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'ExpenseIQ transformed our financial chaos into crystal-clear insights. We\'ve saved $50K in the first quarter alone.',
    rating: 5,
    savings: '$50,000'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder, GrowthLab',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The voice commands are revolutionary. I can manage expenses while driving to client meetings. Pure genius.',
    rating: 5,
    savings: '$28,500'
  },
  {
    name: 'Emily Watson',
    role: 'CFO, InnovateCorp',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The AI predictions helped us avoid a cash flow crisis. ExpenseIQ isn\'t just software—it\'s a financial advisor.',
    rating: 5,
    savings: '$125,000'
  }
];

const TestimonialsSection: React.FC = () => {
  const carouselItems = testimonials.map((testimonial, index) => ({
    id: `testimonial-${index}`,
    content: (
      <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/40 to-purple-900/60 backdrop-blur-2xl rounded-3xl p-8 border-2 border-cyan-400/40 h-[420px] flex flex-col justify-center text-center relative overflow-hidden shadow-2xl hover:shadow-cyan-400/30 transition-all duration-500 group">
        {/* Neural scanning overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quantum scanning beam */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            y: [0, 400, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        
        {/* Quantum corner accents */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 border-cyan-400 ${
              i === 0 ? 'top-2 left-2 border-l-2 border-t-2 rounded-tl-3xl' :
              i === 1 ? 'top-2 right-2 border-r-2 border-t-2 rounded-tr-3xl' :
              i === 2 ? 'bottom-2 left-2 border-l-2 border-b-2 rounded-bl-3xl' :
              'bottom-2 right-2 border-r-2 border-b-2 rounded-br-3xl'
            }`}
            animate={{
              opacity: [0.4, 1, 0.4],
              borderColor: ['#22d3ee', '#a855f7', '#22d3ee']
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        
        {/* Neural Quote Icon */}
        <div className="relative z-10">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 relative"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
            <Quote className="w-full h-full text-cyan-400 relative z-10 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.8))' }} />
            
            {/* Neural synapses around quote */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-4 bg-cyan-400/60 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'bottom',
                  transform: `rotate(${i * 60}deg) translateX(-50%)`
                }}
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Quantum Rating System */}
        <div className="flex justify-center space-x-3 mb-6 relative z-10">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            >
              <Star 
                className="w-8 h-8 text-yellow-300 fill-current relative z-10" 
                style={{ 
                  filter: 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.8))'
                }} 
              />
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Neural Content Display */}
        <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-light relative z-10 drop-shadow-2xl">
          "{testimonial.content}"
        </blockquote>

        {/* Quantum Author Profile */}
        <div className="flex items-center justify-center space-x-6 relative z-10">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full border-3 border-cyan-400 shadow-2xl relative z-10"
              style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.6))' }}
            />
            {/* Holographic ring */}
            <motion.div
              className="absolute inset-0 border-2 border-purple-400/60 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border border-cyan-400/40 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <div className="text-left">
            <div className="text-2xl font-bold text-white drop-shadow-2xl mb-1">
              {testimonial.name}
            </div>
            <div className="text-cyan-300 font-medium mb-2">
              {testimonial.role}
            </div>
            <motion.div 
              className="text-green-400 font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))' }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Neural Savings: {testimonial.savings}
            </motion.div>
          </div>
        </div>

        {/* Quantum Status Indicators */}
        <div className="absolute top-6 right-6 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* Neural Data Streams */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-8 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full"
            style={{
              left: 12 + i * 8,
              bottom: 12 + i * 4
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4
            }}
          />
        ))}

        {/* Quantum Processing Indicator */}
        <motion.div
          className="absolute bottom-4 left-4 w-6 h-6 border-2 border-purple-400/60 rounded-full flex items-center justify-center"
          animate={{
            rotate: 360,
            borderColor: ['#a855f7', '#22d3ee', '#a855f7']
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        </motion.div>

        {/* Holographic Verification Badge */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-sm rounded-full border border-green-400/40 text-xs text-green-400 font-semibold"
          animate={{
            opacity: [0.7, 1, 0.7],
            boxShadow: [
              '0 0 10px rgba(34, 197, 94, 0.3)',
              '0 0 20px rgba(34, 197, 94, 0.6)',
              '0 0 10px rgba(34, 197, 94, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          VERIFIED
        </motion.div>

        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 60px 60px, 40px 40px'
          }} />
        </div>

        {/* Quantum Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 60}%`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4
            }}
          />
        ))}
      </div>
    )
  }));

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" id="testimonials">
      {/* Advanced Quantum Grid */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px),
            linear-gradient(45deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px'
        }} />
      </div>
      
      {/* Quantum Particles Field */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl relative"
            style={{ filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.4))' }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Neural Testimonials from Visionary Leaders
            
            {/* Quantum accent */}
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
            className="text-xl text-cyan-100 max-w-4xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            Real quantum results from real entrepreneurs who've revolutionized their financial neural networks
          </motion.p>
        </motion.div>

        <AccessibleCarousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={6000}
          ariaLabel="Neural customer testimonials from visionary entrepreneurs"
          className="max-w-4xl mx-auto"
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;