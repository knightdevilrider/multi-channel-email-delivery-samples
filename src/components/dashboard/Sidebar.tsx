import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Receipt, 
  Mic, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Receipt, label: 'Receipts' },
  { icon: Mic, label: 'Voice Entries' },
  { icon: FileText, label: 'Text Entries' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help' },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <motion.aside
      className="fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 border-r border-white/10 z-40"
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Zap className="w-8 h-8 text-neon-blue animate-pulse" />
                <span className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
                  ExpenseIQ
                </span>
              </motion.div>
            )}
            
            <motion.button
              onClick={() => onToggle(!collapsed)}
              className="p-2 rounded-lg bg-card-bg hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-cyber-silver" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-cyber-silver" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    item.active
                      ? 'bg-gradient-to-r from-neon-blue/20 to-neon-magenta/20 border border-neon-blue/30 text-white'
                      : 'hover:bg-white/5 text-cyber-silver hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? 'text-neon-blue' : 'group-hover:text-neon-blue'} transition-colors duration-200`} />
                  {!collapsed && (
                    <motion.span
                      className="font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          {!collapsed && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs text-cyber-silver mb-2">
                ExpenseIQ v2.0
              </p>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;