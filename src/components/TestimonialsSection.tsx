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
      <div className="bg-card-bg backdrop-blur-sm rounded-3xl p-8 border border-white/10 h-96 flex flex-col justify-center text-center relative">
        {/* Quote Icon */}
        <Quote className="w-12 h-12 text-neon-blue mx-auto mb-6 opacity-50" />

        {/* Rating */}
        <div className="flex justify-center space-x-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-light">
          "{testimonial.content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center space-x-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full border-2 border-neon-blue"
          />
          <div className="text-left">
            <div className="text-lg font-semibold text-white">
              {testimonial.name}
            </div>
            <div className="text-cyber-silver">
              {testimonial.role}
            </div>
            <div className="text-neon-magenta font-bold">
              Saved: {testimonial.savings}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-neon-blue rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-neon-magenta rounded-full animate-pulse" />
      </div>
    )
  }));

  return (
    <section className="py-20 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
            Visionary Leaders Choose ExpenseIQ
          </h2>
          <p className="text-xl text-cyber-silver max-w-3xl mx-auto">
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