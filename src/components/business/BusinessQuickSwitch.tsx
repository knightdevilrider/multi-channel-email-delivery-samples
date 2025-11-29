import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface BusinessQuickSwitchProps {
  businesses: Business[];
  selectedBusinessId: string;
  onSelect: (businessId: string) => void;
  className?: string;
}

const BusinessQuickSwitch: React.FC<BusinessQuickSwitchProps> = ({
  businesses,
  selectedBusinessId,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-400 mr-2">Business:</span>
      <div className="flex items-center space-x-2">
        {businesses.slice(0, 4).map((business) => (
          <motion.button
            key={business.id}
            onClick={() => onSelect(business.id)}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 ${
              selectedBusinessId === business.id 
                ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-bg' 
                : 'hover:scale-110'
            }`}
            style={{ backgroundColor: business.color }}
            whileHover={{ scale: selectedBusinessId === business.id ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={business.name}
          >
            {business.icon}
            {selectedBusinessId === business.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center"
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
        {businesses.length > 4 && (
          <div className="w-10 h-10 rounded-xl bg-gray-600 flex items-center justify-center text-gray-400 text-sm">
            +{businesses.length - 4}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessQuickSwitch;