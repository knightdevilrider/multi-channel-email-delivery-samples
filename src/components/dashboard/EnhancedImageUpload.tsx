import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendImage } from '../../services/telegram';
import BusinessSelector from '../business/BusinessSelector';
import SmartBusinessSuggestion from '../business/SmartBusinessSuggestion';
import { useBusinessSuggestions } from '../../hooks/useBusinessSuggestions';

// Mock data - replace with actual data from your app
const mockBusinesses = [
  { id: '1', name: 'TechFlow Solutions', color: '#4169E1', icon: '🚀', isDefault: true, settings: { autoCategories: [], commonVendors: ['starbucks', 'uber'], budgetLimits: {} } },
  { id: '2', name: 'Marketing Agency', color: '#FF007A', icon: '📈', isDefault: false, settings: { autoCategories: [], commonVendors: ['adobe', 'canva'], budgetLimits: {} } },
  { id: '3', name: 'Consulting LLC', color: '#00FFFF', icon: '💼', isDefault: false, settings: { autoCategories: [], commonVendors: ['zoom', 'slack'], budgetLimits: {} } },
];

const EnhancedImageUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { suggestions, getSuggestions } = useBusinessSuggestions(mockBusinesses);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = async (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);

    // Get business suggestions based on file analysis
    if (validFiles.length > 0) {
      const context = {
        vendor: 'Unknown Vendor', // Would be extracted from OCR
        amount: 25.99, // Would be extracted from OCR
        description: `Receipt: ${validFiles[0].name}`,
        timestamp: new Date().toISOString()
      };

      const businessSuggestions = await getSuggestions(context);
      if (businessSuggestions.length > 0 && businessSuggestions[0].confidence > 0.5) {
        setShowSuggestion(true);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    if (!selectedBusinessId) {
      toast.error('Please select a business for this expense');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const selectedBusiness = mockBusinesses.find(b => b.id === selectedBusinessId);
        
        toast.loading(`Sending ${file.name} to Telegram...`, { id: `upload-${i}` });
        
        const caption = `📸 <b>Receipt Upload</b>\n\n🏢 Business: ${selectedBusiness?.name}\n📄 ${file.name}\n📅 ${new Date().toLocaleString()}\n👤 User: ${import.meta.env.VITE_USER_ID || 'demo_user'}`;
        
        await sendImage(file, caption);
        setUploadProgress(((i + 1) / files.length) * 100);
        
        toast.dismiss(`upload-${i}`);
        toast.success(`${file.name} sent to Telegram successfully`);
      }
      
      setFiles([]);
      setSelectedBusinessId('');
      setShowSuggestion(false);
      toast.success('All images sent to Telegram successfully!');
    } catch (error) {
      if (error.message.includes('401')) {
        toast.error('Invalid bot token. Please check your Telegram configuration.');
      } else if (error.message.includes('403')) {
        toast.error('Bot blocked or chat not found. Please check your chat ID.');
      } else if (error.message.includes('timeout')) {
        toast.error('Send timed out. Please try again.');
      } else {
        toast.error(`Send failed: ${error.message}`);
      }
      
      console.error('Telegram send error:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSuggestionAccept = () => {
    if (suggestions.length > 0) {
      setSelectedBusinessId(suggestions[0].businessId);
      setShowSuggestion(false);
      toast.success('Business selected based on AI suggestion');
    }
  };

  const topSuggestion = suggestions[0];
  const suggestedBusiness = topSuggestion ? mockBusinesses.find(b => b.id === topSuggestion.businessId) : null;

  return (
    <div className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-neon-blue" />
        </div>
        <h3 className="text-xl font-bold text-white">Receipt Upload</h3>
      </div>

      {/* Smart Business Suggestion */}
      {showSuggestion && topSuggestion && suggestedBusiness && (
        <SmartBusinessSuggestion
          business={suggestedBusiness}
          suggestion={topSuggestion}
          onAccept={handleSuggestionAccept}
          onDismiss={() => setShowSuggestion(false)}
        />
      )}

      {/* Business Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-cyber-silver mb-2">
          Select Business
        </label>
        <BusinessSelector
          businesses={mockBusinesses}
          selectedBusinessId={selectedBusinessId}
          suggestions={suggestions}
          onSelect={setSelectedBusinessId}
          showConfidence={true}
        />
      </div>

      {/* Drop Zone */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-neon-blue bg-neon-blue/10' 
            : 'border-white/20 hover:border-neon-blue/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <motion.div
          animate={{ y: dragActive ? -5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            dragActive ? 'text-neon-blue' : 'text-cyber-silver'
          }`} />
          <p className="text-white font-medium mb-2">
            Drop your receipts here or click to browse
          </p>
          <p className="text-cyber-silver text-sm">
            Supports JPG, PNG, PDF up to 10MB
          </p>
        </motion.div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="mt-6 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{file.name}</p>
                    <p className="text-cyber-silver text-xs">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => removeFile(index)}
                  className="p-1 rounded-full hover:bg-red-500/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-red-400" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      {uploading && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Uploading...</span>
            <span className="text-neon-blue text-sm font-medium">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="h-2 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}

      {/* Upload Button */}
      <motion.button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading || !selectedBusinessId}
        className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
        whileHover={{ scale: files.length > 0 && !uploading && selectedBusinessId ? 1.02 : 1 }}
        whileTap={{ scale: files.length > 0 && !uploading && selectedBusinessId ? 0.98 : 1 }}
      >
        {uploading ? 'Uploading...' : `Upload ${files.length} file${files.length !== 1 ? 's' : ''}`}
      </motion.button>

      {/* Business Selection Warning */}
      {files.length > 0 && !selectedBusinessId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center space-x-2 text-yellow-400 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Please select a business before uploading</span>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedImageUpload;