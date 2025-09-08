import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import ImageUpload from '../components/dashboard/ImageUpload';
import VoiceRecorder from '../components/dashboard/VoiceRecorder';
import TextInput from '../components/dashboard/TextInput';
import DashboardStats from '../components/dashboard/DashboardStats';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        
        <motion.main
          className="p-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Dashboard Stats */}
          <motion.div variants={itemVariants}>
            <DashboardStats />
          </motion.div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Image Upload Feature */}
            <motion.div variants={itemVariants}>
              <ImageUpload />
            </motion.div>

            {/* Voice Recorder Feature */}
            <motion.div variants={itemVariants}>
              <VoiceRecorder />
            </motion.div>

            {/* Text Input Feature */}
            <motion.div variants={itemVariants}>
              <TextInput />
            </motion.div>
          </div>

          {/* Additional Dashboard Content */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            {/* Recent Activity */}
            <div className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Receipt uploaded', amount: '$45.99', category: 'Office Supplies', time: '2 min ago' },
                  { action: 'Voice expense added', amount: '$120.00', category: 'Travel', time: '5 min ago' },
                  { action: 'Text entry processed', amount: '$89.50', category: 'Marketing', time: '10 min ago' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.action}</p>
                      <p className="text-cyber-silver text-sm">{item.category} • {item.time}</p>
                    </div>
                    <span className="text-neon-blue font-bold">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Generate Report', icon: '📊' },
                  { label: 'Export Data', icon: '📤' },
                  { label: 'Set Budget', icon: '🎯' },
                  { label: 'View Analytics', icon: '📈' },
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    className="p-4 bg-gradient-to-r from-neon-blue/20 to-neon-magenta/20 rounded-lg border border-neon-blue/30 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300 text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-white text-sm font-medium">{action.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;