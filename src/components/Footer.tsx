import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Twitter, Linkedin, Instagram, Shield, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-dark-bg to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Final CTA Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-neon-blue via-neon-magenta to-cyan-400 bg-clip-text text-transparent animate-glow">
            Ready to Revolutionize Your Finances?
          </h2>
          <p className="text-xl text-cyber-silver mb-8 max-w-3xl mx-auto">
            Join thousands of visionary entrepreneurs who've already transformed their financial mastery with ExpenseIQ
          </p>
          
          <motion.button
            className="group relative px-12 py-4 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full font-bold text-lg overflow-hidden animate-pulse-neon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Start Your Financial Revolution</span>
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-10 h-10 text-neon-blue animate-pulse" />
              <span className="text-3xl font-black bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
                ExpenseIQ
              </span>
            </motion.div>
            <p className="text-cyber-silver leading-relaxed mb-6 max-w-md">
              The ultimate AI-powered finance management revolution for visionary entrepreneurs. 
              Command your finances, conquer chaos, and amplify growth.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-card-bg backdrop-blur-sm border border-neon-blue/30 flex items-center justify-center hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-neon-blue" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Demo', 'Integrations'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-cyber-silver hover:text-neon-blue transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'API Docs', 'Contact', 'Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-cyber-silver hover:text-neon-blue transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-cyber-silver text-sm">
              <span>© 2025 ExpenseIQ. All rights reserved.</span>
              <a href="#" className="hover:text-neon-blue transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-neon-blue transition-colors duration-300">Terms of Service</a>
            </div>
            
            {/* Security Badge */}
            <motion.div
              className="flex items-center space-x-2 text-cyber-silver text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-4 h-4 text-neon-blue" />
              <span>AES-256 Encrypted</span>
            </motion.div>
          </div>
        </div>

        {/* Hidden Easter Egg */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-10 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <div className="text-xs text-neon-blue font-mono">
            Powered by Bolt ⚡
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;