import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, Send, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendTextMessage } from '../../services/telegram';

const TextInput: React.FC = () => {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const maxLength = 500;
  const remainingChars = maxLength - text.length;

  // AI suggestions based on input
  const aiSuggestions = [
    'Coffee meeting with client - $45.99',
    'Uber ride to conference - $28.50',
    'Office supplies from Staples - $127.80',
    'Team lunch at restaurant - $89.45',
    'Software subscription renewal - $99.00',
    'Hotel booking for business trip - $245.00'
  ];

  useEffect(() => {
    if (text.length > 10) {
      const filtered = aiSuggestions.filter(suggestion => 
        !suggestion.toLowerCase().includes(text.toLowerCase().split(' ')[0])
      );
      setSuggestions(filtered.slice(0, 3));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [text]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    setProcessing(true);
    try {
      // Show initial processing message
      toast.loading('Sending to Telegram...', { id: 'text-processing' });
      
      // Format the message with expense context
      const formattedMessage = `💰 <b>Expense Entry</b>\n\n${text}\n\n📅 ${new Date().toLocaleString()}\n👤 User: ${import.meta.env.VITE_USER_ID || 'demo_user'}`;
      
      const result = await sendTextMessage(formattedMessage);
      
      // Dismiss loading toast and show success
      toast.dismiss('text-processing');
      toast.success('Message sent to Telegram successfully!');
      
      setText('');
      console.log('Telegram result:', result);
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss('text-processing');
      
      // Show more specific error message
      if (error.message.includes('401')) {
        toast.error('Invalid bot token. Please check your Telegram configuration.');
      } else if (error.message.includes('403')) {
        toast.error('Bot blocked or chat not found. Please check your chat ID.');
      } else if (error.message.includes('timeout')) {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error(`Failed to send message: ${error.message}`);
      }
      
      console.error('Telegram send error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const applySuggestion = (suggestion: string) => {
    setText(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Text Entry</h3>
      </div>

      {/* Text Input Area */}
      <div className="relative mb-4">
        <motion.div
          className={`relative border-2 rounded-xl transition-all duration-300 ${
            focused 
              ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' 
              : 'border-white/20 hover:border-cyan-400/50'
          }`}
          animate={{ scale: focused ? 1.01 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your expense... (e.g., 'Lunch with client at downtown restaurant - $45.99')"
            className="w-full h-32 p-4 bg-transparent text-white placeholder-cyber-silver resize-none focus:outline-none"
            maxLength={maxLength}
          />

          {/* AI Hint */}
          <AnimatePresence>
            {focused && text.length === 0 && (
              <motion.div
                className="absolute top-4 right-4 flex items-center space-x-2 text-cyan-400 text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI will categorize automatically</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Character Count */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-cyber-silver text-sm">
            Ctrl/Cmd + Enter to submit
          </div>
          <div className={`text-sm ${
            remainingChars < 50 ? 'text-yellow-400' : 'text-cyber-silver'
          }`}>
            {remainingChars} characters remaining
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">AI Suggestions</span>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => applySuggestion(suggestion)}
                  className="w-full text-left p-3 bg-white/5 hover:bg-cyan-400/10 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-white text-sm">{suggestion}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={!text.trim() || processing}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
        whileHover={{ scale: text.trim() && !processing ? 1.02 : 1 }}
        whileTap={{ scale: text.trim() && !processing ? 0.98 : 1 }}
      >
        {processing ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Process & Categorize</span>
          </>
        )}
      </motion.button>

      {/* Processing indicator */}
      {processing && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center space-x-2 text-cyan-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm">AI is analyzing your expense...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TextInput;