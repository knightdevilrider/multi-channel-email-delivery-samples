import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-8 h-8 text-neon-blue animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
              ExpenseIQ
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Demo', 'Testimonials', 'Pricing'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-cyber-silver hover:text-neon-blue transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onFocus={(e) => e.target.setAttribute('aria-current', 'page')}
                onBlur={(e) => e.target.removeAttribute('aria-current')}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              className="bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-2 rounded-full font-semibold hover:shadow-neon transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Launch ExpenseIQ application"
            >
              Launch Now
            </motion.button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyber-silver hover:text-neon-blue transition-colors duration-300"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          id="mobile-menu"
          className="md:hidden bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          role="menu"
        >
          <div className="px-4 py-4 space-y-4">
            {['Features', 'Demo', 'Testimonials', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-cyber-silver hover:text-neon-blue transition-colors duration-300"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                {item}
              </a>
            ))}
            <button 
              className="w-full bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-2 rounded-full font-semibold"
              role="menuitem"
              aria-label="Launch ExpenseIQ application"
            >
              Launch Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
    </>
  );
};

export default Navigation;