import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import BusinessConfidenceIndicator from './BusinessConfidenceIndicator';

interface Business {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface BusinessSuggestion {
  businessId: string;
  confidence: number;
  reason: string;
}

interface SmartBusinessSuggestionProps {
  business: Business;
  suggestion: BusinessSuggestion;
  onAccept: () => void;
  onDismiss: () => void;
  autoAcceptDelay?: number;
}

const SmartBusinessSuggestion: React.FC<SmartBusinessSuggestionProps> = ({
  business,
  suggestion,
  onAccept,
  onDismiss,
  autoAcceptDelay = 3000
}) => {
  const [timeLeft, setTimeLeft] = useState(autoAcceptDelay / 1000);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (suggestion.confidence > 0.8) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onAccept();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [suggestion.confidence, onAccept]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: business.color }}
                >
                  {business.icon}
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </motion.div>
              </div>
              <div>
                <div className="text-white font-medium">Suggested: {business.name}</div>
                <BusinessConfidenceIndicator 
                  confidence={suggestion.confidence}
                  reason={suggestion.reason}
                />
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={onAccept}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="w-4 h-4" />
                <span>Accept</span>
              </motion.button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-lg text-white transition-colors duration-200"
              >
                Choose Different
              </button>
            </div>

            {suggestion.confidence > 0.8 && timeLeft > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-4 h-4 relative">
                  <svg className="w-4 h-4 transform -rotate-90">
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="opacity-20"
                    />
                    <motion.circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 6}`}
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ 
                        strokeDashoffset: (2 * Math.PI * 6) * (1 - timeLeft / (autoAcceptDelay / 1000))
                      }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </svg>
                </div>
                <span>Auto-accepting in {timeLeft}s</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartBusinessSuggestion;