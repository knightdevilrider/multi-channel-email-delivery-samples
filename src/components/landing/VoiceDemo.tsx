import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const VoiceDemo: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');

  const demoCommands = [
    "Add $50 coffee expense to marketing",
    "Show me this month's travel costs",
    "Create budget for Q1 operations",
    "Categorize last 5 transactions"
  ];

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveform(Array.from({ length: 20 }, () => Math.random() * 60 + 10));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setWaveform([]);
    }
  }, [isListening]);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      const randomCommand = demoCommands[Math.floor(Math.random() * demoCommands.length)];
      setCurrentCommand(randomCommand);
      
      // Simulate AI response after 2 seconds
      setTimeout(() => {
        setIsListening(false);
        setCurrentCommand('');
      }, 3000);
    }
  };

  return (
    <div className="text-center">
      <motion.button
        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-neon-magenta animate-pulse-neon' 
            : 'bg-gradient-to-r from-neon-blue to-neon-magenta'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleVoiceToggle}
      >
        {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
      </motion.button>

      <h3 className="text-lg font-semibold mb-2">Voice Command</h3>
      
      {/* Waveform Visualization */}
      <div className="flex justify-center items-end space-x-1 h-12 mb-4">
        {waveform.map((height, i) => (
          <motion.div
            key={i}
            className="bg-neon-blue w-1 rounded-full"
            style={{ height: `${height}%` }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>

      {currentCommand && (
        <motion.div
          className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-3 mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm text-neon-blue">"{currentCommand}"</p>
        </motion.div>
      )}

      <p className="text-cyber-silver text-sm">
        {isListening ? 'Listening...' : 'Try voice-first expense management'}
      </p>
    </div>
  );
};

export default VoiceDemo;