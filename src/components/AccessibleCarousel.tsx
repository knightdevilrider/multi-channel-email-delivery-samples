import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

interface AccessibleCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  ariaLabel: string;
  className?: string;
}

const AccessibleCarousel: React.FC<AccessibleCarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  ariaLabel,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Detect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !reducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, reducedMotion, items.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false); // Pause when user manually navigates
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNext();
        break;
      case ' ':
        event.preventDefault();
        togglePlayPause();
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(items.length - 1);
        break;
    }
  };

  return (
    <div 
      className={`relative ${className}`}
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      ref={carouselRef}
    >
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {items.length}
      </div>

      {/* Carousel controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-card-bg backdrop-blur-sm border border-neon-blue/30 hover:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-neon-blue" />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-card-bg backdrop-blur-sm border border-neon-blue/30 hover:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg transition-all duration-300"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            disabled={reducedMotion}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-neon-blue" />
            ) : (
              <Play className="w-5 h-5 text-neon-blue" />
            )}
          </button>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-card-bg backdrop-blur-sm border border-neon-blue/30 hover:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-neon-blue" />
          </button>
        </div>

        {/* Slide counter */}
        <div className="text-cyber-silver text-sm">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Carousel content */}
      <div 
        className="relative overflow-hidden rounded-2xl"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="tabpanel"
        aria-label={`Slide ${currentIndex + 1}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={reducedMotion ? {} : { opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, x: -50 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="w-full"
          >
            {items[currentIndex].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center space-x-2 mt-4" role="tablist">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg ${
              index === currentIndex
                ? 'bg-neon-blue shadow-neon'
                : 'bg-cyber-silver/30 hover:bg-cyber-silver/50'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
            tabIndex={index === currentIndex ? 0 : -1}
          />
        ))}
      </div>

      {/* Instructions for keyboard users */}
      <div className="sr-only">
        Use arrow keys to navigate slides, spacebar to play/pause, Home and End to go to first or last slide.
      </div>
    </div>
  );
};

export default AccessibleCarousel;