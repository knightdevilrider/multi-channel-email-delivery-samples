import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Building2, Sparkles } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
}

interface BusinessSuggestion {
  businessId: string;
  confidence: number;
  reason: string;
}

interface BusinessSelectorProps {
  businesses: Business[];
  selectedBusinessId?: string;
  suggestions?: BusinessSuggestion[];
  onSelect: (businessId: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showConfidence?: boolean;
}

const BusinessSelector: React.FC<BusinessSelectorProps> = ({
  businesses,
  selectedBusinessId,
  suggestions = [],
  onSelect,
  className = '',
  size = 'md',
  showConfidence = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  useEffect(() => {
    if (selectedBusinessId) {
      const business = businesses.find(b => b.id === selectedBusinessId);
      setSelectedBusiness(business || null);
    } else if (suggestions.length > 0) {
      // Auto-select highest confidence suggestion
      const topSuggestion = suggestions[0];
      if (topSuggestion.confidence > 0.8) {
        const business = businesses.find(b => b.id === topSuggestion.businessId);
        if (business) {
          setSelectedBusiness(business);
          onSelect(business.id);
        }
      }
    }
  }, [selectedBusinessId, suggestions, businesses, onSelect]);

  const handleSelect = (business: Business) => {
    setSelectedBusiness(business);
    onSelect(business.id);
    setIsOpen(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-green-400';
    if (confidence > 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence > 0.8) return 'High confidence';
    if (confidence > 0.5) return 'Medium confidence';
    return 'Low confidence';
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const topSuggestion = suggestions.find(s => s.businessId === selectedBusiness?.id);

  return (
    <div className={`relative ${className}`}>
      {/* Selected Business Display */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-card-bg backdrop-blur-sm border border-white/20 rounded-xl hover:border-white/40 transition-all duration-300 ${sizeClasses[size]}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-3">
          {selectedBusiness ? (
            <>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: selectedBusiness.color }}
              >
                {selectedBusiness.icon}
              </div>
              <div className="text-left">
                <div className="text-white font-medium">{selectedBusiness.name}</div>
                {showConfidence && topSuggestion && (
                  <div className={`text-xs ${getConfidenceColor(topSuggestion.confidence)}`}>
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {getConfidenceText(topSuggestion.confidence)}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-gray-400">Select business</span>
            </>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card-bg backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto"
          >
            {/* Suggested Businesses */}
            {suggestions.length > 0 && (
              <div className="p-2 border-b border-white/10">
                <div className="text-xs text-gray-400 mb-2 px-2">AI Suggestions</div>
                {suggestions.slice(0, 3).map((suggestion) => {
                  const business = businesses.find(b => b.id === suggestion.businessId);
                  if (!business) return null;
                  
                  return (
                    <motion.button
                      key={`suggestion-${business.id}`}
                      onClick={() => handleSelect(business)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-6 h-6 rounded-md flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: business.color }}
                        >
                          {business.icon}
                        </div>
                        <div className="text-left">
                          <div className="text-white text-sm font-medium">{business.name}</div>
                          <div className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}>
                            {Math.round(suggestion.confidence * 100)}% match
                          </div>
                        </div>
                      </div>
                      {selectedBusiness?.id === business.id && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* All Businesses */}
            <div className="p-2">
              {suggestions.length > 0 && (
                <div className="text-xs text-gray-400 mb-2 px-2">All Businesses</div>
              )}
              {businesses.map((business) => (
                <motion.button
                  key={business.id}
                  onClick={() => handleSelect(business)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-md flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: business.color }}
                    >
                      {business.icon}
                    </div>
                    <span className="text-white text-sm font-medium">{business.name}</span>
                    {business.isDefault && (
                      <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  {selectedBusiness?.id === business.id && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessSelector;