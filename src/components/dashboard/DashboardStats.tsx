import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Receipt, Mic, FileText } from 'lucide-react';

const stats = [
  {
    label: 'Total Expenses',
    value: '$12,847.50',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'neon-blue'
  },
  {
    label: 'This Month',
    value: '$3,247.80',
    change: '-8.2%',
    trend: 'down',
    icon: TrendingDown,
    color: 'neon-magenta'
  },
  {
    label: 'Receipts Processed',
    value: '247',
    change: '+23.1%',
    trend: 'up',
    icon: Receipt,
    color: 'cyan-400'
  },
  {
    label: 'Voice Entries',
    value: '89',
    change: '+45.6%',
    trend: 'up',
    icon: Mic,
    color: 'yellow-400'
  }
];

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}/20 flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}`} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">{stat.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-cyber-silver text-sm">{stat.label}</p>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-white/10 rounded-full h-1">
            <motion.div
              className={`h-1 bg-${stat.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.random() * 80 + 20}%` }}
              transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;