import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

const liveUpdates = [
  { name: 'Priya S.', action: 'unlocked $2,100 in savings', icon: DollarSign },
  { name: 'Alex M.', action: 'automated 500+ transactions', icon: Zap },
  { name: 'Jordan K.', action: 'gained 15% cost visibility', icon: TrendingUp },
  { name: 'Sam R.', action: 'joined the revolution', icon: Users },
  { name: 'Casey L.', action: 'discovered $890 in hidden costs', icon: DollarSign },
  { name: 'Morgan D.', action: 'streamlined expense workflow', icon: Zap },
];

const SocialProofTicker: React.FC = () => {
  const [currentUpdate, setCurrentUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % liveUpdates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Updates Ticker */}
        <motion.div
          className="bg-gradient-to-r from-neon-blue/10 via-neon-magenta/10 to-neon-blue/10 rounded-2xl p-6 mb-12 border border-neon-blue/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className="w-3 h-3 bg-neon-magenta rounded-full animate-pulse" />
            <span className="text-cyber-silver font-semibold">LIVE:</span>
            
            <motion.div
              key={currentUpdate}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {React.createElement(liveUpdates[currentUpdate].icon, { className: "w-5 h-5 text-neon-blue" })}
              <span className="text-white font-medium">
                {liveUpdates[currentUpdate].name}
              </span>
              <span className="text-cyber-silver">
                {liveUpdates[currentUpdate].action}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { number: '3,000+', label: 'Visionary Entrepreneurs', icon: Users },
            { number: '$1.5M+', label: 'Savings Unlocked', icon: DollarSign },
            { number: '98%', label: 'Accuracy Rate', icon: TrendingUp },
            { number: '4.9/5', label: 'User Rating', icon: Zap },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card-bg backdrop-blur-sm rounded-2xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-8 h-8 text-neon-blue mx-auto mb-3" />
              <div className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-cyber-silver text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Viral CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
            Join the Financial Revolution
          </h3>
          
          <motion.button
            className="group relative px-10 py-4 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full font-bold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Share functionality would be implemented here
              console.log('Sharing ExpenseIQ revolution!');
            }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Share the Revolution</span>
              <Zap className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          <p className="text-cyber-silver mt-4">
            Help other entrepreneurs discover financial mastery
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofTicker;