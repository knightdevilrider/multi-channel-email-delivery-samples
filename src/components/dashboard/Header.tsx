import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  ChevronDown
} from 'lucide-react';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const notifications = [
    { id: 1, message: 'New receipt processed: $45.99', time: '2 min ago', unread: true },
    { id: 2, message: 'Monthly report ready', time: '1 hour ago', unread: true },
    { id: 3, message: 'Budget alert: Marketing 80% used', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-card-bg backdrop-blur-sm border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyber-silver" />
            <input
              type="text"
              placeholder="Search expenses, categories, or receipts..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-cyber-silver focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-cyber-silver" />
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-neon-magenta rounded-full flex items-center justify-center text-xs font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  className="absolute right-0 top-full mt-2 w-80 bg-card-bg backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors duration-200 ${
                          notification.unread ? 'bg-neon-blue/5' : ''
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-cyber-silver text-xs mt-1">{notification.time}</p>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className="w-full text-center text-neon-blue hover:text-neon-blue/80 text-sm font-medium">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium hidden sm:block">John Doe</span>
              <ChevronDown className="w-4 h-4 text-cyber-silver" />
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  className="absolute right-0 top-full mt-2 w-48 bg-card-bg backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2">
                    {[
                      { icon: User, label: 'Profile', href: '#' },
                      { icon: Settings, label: 'Settings', href: '#' },
                      { icon: LogOut, label: 'Sign Out', href: '/' },
                    ].map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-cyber-silver hover:text-white"
                        whileHover={{ x: 4 }}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;