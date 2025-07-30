import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Eye, Type, Contrast, Zap } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, announceToScreenReader } = useAccessibility();

  const togglePanel = () => {
    setIsOpen(!isOpen);
    announceToScreenReader(isOpen ? 'Accessibility panel closed' : 'Accessibility panel opened');
  };

  const handleSettingChange = (setting: string, value: any) => {
    updateSettings({ [setting]: value });
    announceToScreenReader(`${setting} changed to ${value}`);
  };

  return (
    <>
      {/* Accessibility toggle button */}
      <motion.button
        onClick={togglePanel}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-neon-blue rounded-full shadow-2xl flex items-center justify-center hover:bg-neon-blue/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neon-blue transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open accessibility controls"
        aria-expanded={isOpen}
      >
        <Settings className="w-6 h-6 text-white" />
      </motion.button>

      {/* Accessibility panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={togglePanel}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 h-full w-80 bg-dark-bg border-l border-white/20 shadow-2xl z-50 overflow-y-auto"
              role="dialog"
              aria-label="Accessibility settings"
              aria-modal="true"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-neon-blue" />
                    <span>Accessibility</span>
                  </h2>
                  <button
                    onClick={togglePanel}
                    className="w-8 h-8 rounded-full bg-card-bg hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
                    aria-label="Close accessibility panel"
                  >
                    <span className="text-cyber-silver text-lg">×</span>
                  </button>
                </div>

                {/* Settings */}
                <div className="space-y-6">
                  {/* Reduced Motion */}
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-white font-medium flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-neon-blue" />
                        <span>Reduce Motion</span>
                      </span>
                      <button
                        onClick={() => handleSettingChange('reducedMotion', !settings.reducedMotion)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg ${
                          settings.reducedMotion ? 'bg-neon-blue' : 'bg-gray-600'
                        }`}
                        role="switch"
                        aria-checked={settings.reducedMotion}
                        aria-label="Toggle reduced motion"
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="text-cyber-silver text-sm mt-1">
                      Reduces animations and motion effects
                    </p>
                  </div>

                  {/* High Contrast */}
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-white font-medium flex items-center space-x-2">
                        <Contrast className="w-4 h-4 text-neon-blue" />
                        <span>High Contrast</span>
                      </span>
                      <button
                        onClick={() => handleSettingChange('highContrast', !settings.highContrast)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg ${
                          settings.highContrast ? 'bg-neon-blue' : 'bg-gray-600'
                        }`}
                        role="switch"
                        aria-checked={settings.highContrast}
                        aria-label="Toggle high contrast"
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="text-cyber-silver text-sm mt-1">
                      Increases color contrast for better visibility
                    </p>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block">
                      <span className="text-white font-medium flex items-center space-x-2 mb-3">
                        <Type className="w-4 h-4 text-neon-blue" />
                        <span>Font Size</span>
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['small', 'medium', 'large'] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSettingChange('fontSize', size)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg ${
                              settings.fontSize === size
                                ? 'bg-neon-blue text-white'
                                : 'bg-card-bg text-cyber-silver hover:bg-white/10'
                            }`}
                            aria-pressed={settings.fontSize === size}
                          >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </button>
                        ))}
                      </div>
                    </label>
                  </div>

                  {/* Focus Indicators */}
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-white font-medium">
                        Enhanced Focus
                      </span>
                      <button
                        onClick={() => handleSettingChange('focusVisible', !settings.focusVisible)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg ${
                          settings.focusVisible ? 'bg-neon-blue' : 'bg-gray-600'
                        }`}
                        role="switch"
                        aria-checked={settings.focusVisible}
                        aria-label="Toggle enhanced focus indicators"
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            settings.focusVisible ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="text-cyber-silver text-sm mt-1">
                      Shows enhanced focus indicators for keyboard navigation
                    </p>
                  </div>
                </div>

                {/* Reset button */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      updateSettings({
                        reducedMotion: false,
                        highContrast: false,
                        fontSize: 'medium',
                        focusVisible: true
                      });
                      announceToScreenReader('Accessibility settings reset to defaults');
                    }}
                    className="w-full px-4 py-2 bg-card-bg hover:bg-white/10 text-cyber-silver hover:text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg"
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityControls;