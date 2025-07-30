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
      <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/20 to-purple-900/30 backdrop-blur-xl rounded-3xl p-8 border-2 border-cyan-400/30 h-96 flex flex-col justify-center text-center relative overflow-hidden shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 group">
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400 rounded-tl-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400 rounded-tr-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400 rounded-bl-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400 rounded-br-3xl animate-pulse" />
        
        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-60" />
        {/* Quote Icon */}
        <div className="relative z-10">
          <Quote className="w-16 h-16 text-cyan-400 mx-auto mb-6 opacity-80 animate-pulse drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))' }} />
        </div>

        {/* Rating */}
        <div className="flex justify-center space-x-2 mb-6 relative z-10">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star 
              key={i} 
              className="w-7 h-7 text-yellow-300 fill-current animate-pulse hover:scale-110 transition-transform duration-300" 
              style={{ 
                filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.6))',
                animationDelay: `${i * 0.1}s`
              }} 
            />
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-light relative z-10 drop-shadow-lg">
          "{testimonial.content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center space-x-4 relative z-10">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full border-3 border-cyan-400 shadow-lg hover:scale-105 transition-transform duration-300"
            style={{ filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.4))' }}
          />
          <div className="text-left">
            <div className="text-xl font-bold text-white drop-shadow-lg">
              {testimonial.name}
            </div>
            <div className="text-cyan-300 font-medium">
              {testimonial.role}
            </div>
            <div className="text-green-400 font-bold text-lg animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))' }}>
              Saved: {testimonial.savings}
            </div>
          </div>
        </div>

        {/* Futuristic Decorative Elements */}
        <div className="absolute top-6 right-6 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-60" />
        <div className="absolute top-6 right-6 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute bottom-6 left-6 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-60" />
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        
        {/* Data stream lines */}
        <div className="absolute left-4 top-1/2 w-12 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent animate-pulse" />
        <div className="absolute right-4 top-1/3 w-8 h-0.5 bg-gradient-to-l from-green-400/60 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute right-4 bottom-1/3 w-10 h-0.5 bg-gradient-to-l from-purple-400/60 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    )
  }));

  return (
    <section className="py-20 relative overflow-hidden" id="testimonials">
      {/* Futuristic background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
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
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
            <span style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.3))' }}>
              Visionary Leaders Choose ExpenseIQ
            </span>
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto drop-shadow-lg">
            Real results from real entrepreneurs who've revolutionized their financial management
          </p>
        </motion.div>

        <AccessibleCarousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={5000}
          ariaLabel="Customer testimonials"
          className="max-w-4xl mx-auto"
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;