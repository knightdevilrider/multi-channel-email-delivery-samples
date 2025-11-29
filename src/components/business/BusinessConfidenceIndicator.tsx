import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, TrendingUp } from 'lucide-react';

interface BusinessConfidenceIndicatorProps {
  confidence: number;
  reason: string;
  className?: string;
}

const BusinessConfidenceIndicator: React.FC<BusinessConfidenceIndicatorProps> = ({
  confidence,
  reason,
  className = ''
}) => {
  const getConfidenceColor = () => {
    if (confidence > 0.8) return 'text-green-400 bg-green-400/20';
    if (confidence > 0.5) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getConfidenceIcon = () => {
    switch (reason) {
      case 'vendor_history':
        return TrendingUp;
      case 'location':
        return Brain;
      default:
        return Sparkles;
    }
  };

  const getReasonText = () => {
    switch (reason) {
      case 'vendor_history':
        return 'Based on vendor history';
      case 'location':
        return 'Based on location';
      case 'time_pattern':
        return 'Based on time pattern';
      case 'amount_range':
        return 'Based on amount range';
      default:
        return 'AI suggestion';
    }
  };

  const Icon = getConfidenceIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor()} ${className}`}
    >
      <Icon className="w-3 h-3" />
      <span>{Math.round(confidence * 100)}% confident</span>
      <span className="text-gray-400">•</span>
      <span className="text-gray-400">{getReasonText()}</span>
    </motion.div>
  );
};

export default BusinessConfidenceIndicator;