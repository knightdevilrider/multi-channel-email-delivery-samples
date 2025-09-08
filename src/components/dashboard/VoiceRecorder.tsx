import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Pause, Square, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendVoice, sendTextMessage } from '../../services/telegram';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [processing, setProcessing] = useState(false);
  const [recordingQuality, setRecordingQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused' | 'stopped' | 'ready'>('idle');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  // Check microphone permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (navigator.permissions) {
          const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          setHasPermission(permission.state === 'granted');
          
          permission.onchange = () => {
            setHasPermission(permission.state === 'granted');
          };
        }
      } catch (error) {
        logger.warn('Could not check microphone permissions:', error);
      }
    };
    
    checkPermissions();
  }, []);
  // Generate waveform animation
  useEffect(() => {
    if (recordingState === 'recording') {
      const generateWaveform = () => {
        setWaveform(Array.from({ length: 20 }, () => Math.random() * 60 + 10));
        animationRef.current = requestAnimationFrame(generateWaveform);
      };
      generateWaveform();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (recordingState === 'idle') {
        setWaveform([]);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [recordingState]);

  // Duration timer
  useEffect(() => {
    if (recordingState === 'recording') {
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [recordingState]);

  const startRecording = async () => {
    try {
      // Request permissions explicitly
      if (hasPermission === false) {
        toast.error('Microphone permission denied. Please allow microphone access in your browser settings.');
        return;
      }

      // Enhanced audio constraints for better quality
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: recordingQuality === 'high' ? 48000 : recordingQuality === 'medium' ? 44100 : 22050,
          channelCount: 1, // Mono for smaller file size
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setHasPermission(true);
      
      // Check for supported MIME types and choose the best one
      let mimeType = 'audio/webm;codecs=opus'; // Default for Telegram compatibility
      
      if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        mimeType = 'audio/ogg;codecs=opus'; // Preferred for Telegram
      } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/wav')) {
        mimeType = 'audio/wav';
      }
      
      logger.info('Using MIME type for recording:', mimeType);
      
      const mediaRecorder = new MediaRecorder(stream, { 
        mimeType,
        audioBitsPerSecond: recordingQuality === 'high' ? 128000 : recordingQuality === 'medium' ? 64000 : 32000
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setRecordingState('ready');
        stream.getTracks().forEach(track => track.stop());
        
        // Log recording details for debugging
        logger.info('Recording completed', {
          size: blob.size,
          type: blob.type,
          duration: duration,
          quality: recordingQuality
        });
      };

      mediaRecorder.onerror = (event) => {
        logger.error('MediaRecorder error:', event);
        toast.error('Recording error occurred');
        setRecordingState('idle');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      setRecordingState('recording');
      setDuration(0);
      toast.success('Recording started');
    } catch (error) {
      logger.error('Failed to start recording:', error);
      
      if (error.name === 'NotAllowedError') {
        setHasPermission(false);
        toast.error('Microphone access denied. Please allow microphone permissions.');
      } else if (error.name === 'NotFoundError') {
        toast.error('No microphone found. Please connect a microphone.');
      } else if (error.name === 'NotSupportedError') {
        toast.error('Audio recording not supported in this browser.');
      } else {
        toast.error(`Failed to access microphone: ${error.message}`);
      }
      setRecordingState('idle');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
      toast.success('Recording paused');
    } else if (mediaRecorderRef.current && recordingState === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
      toast.success('Recording resumed');
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'paused') {
        mediaRecorderRef.current.resume();
        setRecordingState('recording');
        toast.success('Recording resumed');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (recordingState === 'recording' || recordingState === 'paused')) {
      mediaRecorderRef.current.stop();
      setRecordingState('stopped');
      toast.success('Recording stopped');
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const deleteRecording = () => {
    // Clean up audio URL to prevent memory leaks
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioBlob(null);
    setAudioUrl('');
    setDuration(0);
    setIsPlaying(false);
    setRecordingState('idle');
    chunksRef.current = [];
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    toast.success('Recording deleted');
  };

  const processRecording = async () => {
    if (!audioBlob) {
      toast.error('No recording to process');
      return;
    }

    // Validate audio file before sending
    if (audioBlob.size === 0) {
      toast.error('Recording is empty. Please try recording again.');
      return;
    }

    if (audioBlob.size > 50 * 1024 * 1024) { // 50MB Telegram limit
      toast.error('Recording too large for Telegram (max 50MB). Please record a shorter message.');
      return;
    }

    setProcessing(true);
    try {
      toast.loading('Sending voice to Telegram...', { id: 'voice-processing' });
      
      // Enhanced caption with more details
      const caption = `🎤 <b>Voice Expense Entry</b>\n\n⏱️ Duration: ${formatTime(duration)}\n📊 Size: ${(audioBlob.size / 1024).toFixed(1)} KB\n🎵 Format: ${audioBlob.type}\n📅 ${new Date().toLocaleString()}\n👤 User: ${import.meta.env.VITE_USER_ID || 'demo_user'}`;
      
      // Try to send as voice message first
      let result;
      try {
        result = await sendVoice(audioBlob, caption, (progress) => {
          // Update progress in toast
          toast.loading(`Sending voice: ${Math.round(progress)}%`, { id: 'voice-processing' });
        });
      } catch (voiceError) {
        logger.warn('Failed to send as voice, trying as audio document:', voiceError);
        
        // Fallback: send as audio document if voice fails
        const audioCaption = `🎵 <b>Audio Expense Entry</b>\n\n⏱️ Duration: ${formatTime(duration)}\n📊 Size: ${(audioBlob.size / 1024).toFixed(1)} KB\n📅 ${new Date().toLocaleString()}\n👤 User: ${import.meta.env.VITE_USER_ID || 'demo_user'}`;
        
        // Send as text message with audio info if all else fails
        result = await sendTextMessage(audioCaption + '\n\n⚠️ Audio file could not be sent directly due to format compatibility.');
      }
      
      toast.dismiss('voice-processing');
      toast.success('Voice message sent to Telegram successfully!');
      
      // Clear the recording after successful send
      deleteRecording();
      
      console.log('Processing result:', result);
    } catch (error) {
      toast.dismiss('voice-processing');
      
      logger.error('Voice processing failed:', error);
      
      // Enhanced error handling with specific messages
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        toast.error('Invalid bot token. Please check your Telegram configuration.');
      } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
        toast.error('Bot blocked or chat not found. Please check your chat ID.');
      } else if (error.message.includes('413') || error.message.includes('too large')) {
        toast.error('Audio file too large. Please record a shorter message.');
      } else if (error.message.includes('400') || error.message.includes('Bad Request')) {
        toast.error('Invalid audio format. Please try recording again.');
      } else if (error.message.includes('timeout')) {
        toast.error('Voice send timed out. Please try again.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error(`Failed to send voice: ${error.message}`);
      }
    } finally {
      setProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Add logger for debugging
  const logger = {
    info: (message, data = null) => {
      console.info(`[VOICE RECORDER] ${message}`, data || '');
    },
    warn: (message, data = null) => {
      console.warn(`[VOICE RECORDER] ${message}`, data || '');
    },
    error: (message, error = null) => {
      console.error(`[VOICE RECORDER] ${message}`, error || '');
    }
  };

  return (
    <div className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon-magenta/20 flex items-center justify-center">
          <Mic className="w-5 h-5 text-neon-magenta" />
        </div>
        <h3 className="text-xl font-bold text-white">Voice Recorder</h3>
      </div>

      {/* Recording Quality Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-cyber-silver mb-2">
          Recording Quality
        </label>
        <div className="flex space-x-2">
          {(['low', 'medium', 'high'] as const).map((quality) => (
            <button
              key={quality}
              onClick={() => setRecordingQuality(quality)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                recordingQuality === quality
                  ? 'bg-neon-magenta text-white'
                  : 'bg-white/10 text-cyber-silver hover:bg-white/20'
              }`}
              disabled={isRecording}
            >
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Recording Controls */}
      <div className="text-center mb-6">
        <motion.div
          className="relative inline-block mb-4"
          whileHover={{ scale: 1.05 }}
        >
          {/* Main Record/Stop Button */}
          <motion.button
            onClick={recordingState === 'idle' || recordingState === 'ready' ? startRecording : stopRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              recordingState === 'recording' || recordingState === 'paused'
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-gradient-to-r from-neon-magenta to-neon-blue hover:shadow-lg hover:shadow-neon-magenta/25'
            }`}
            whileTap={{ scale: 0.95 }}
            disabled={processing}
            aria-label={recordingState === 'idle' || recordingState === 'ready' ? 'Start recording' : 'Stop recording'}
          >
            {recordingState === 'recording' || recordingState === 'paused' ? (
              <Square className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </motion.button>

          {/* Recording indicator */}
          {recordingState === 'recording' && (
            <motion.div
              className="absolute -inset-2 border-2 border-red-500 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Pause button (only show when recording) */}
        <AnimatePresence>
          {(recordingState === 'recording' || recordingState === 'paused') && (
            <motion.button
              onClick={recordingState === 'recording' ? pauseRecording : resumeRecording}
              className="ml-4 p-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors duration-200"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={recordingState === 'recording' ? 'Pause recording' : 'Resume recording'}
            >
              {recordingState === 'paused' ? (
                <Play className="w-5 h-5 text-yellow-400" />
              ) : (
                <Pause className="w-5 h-5 text-yellow-400" />
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Duration */}
        <div className="text-2xl font-mono text-white mt-4">
          {formatTime(duration)}
        </div>

        {/* Status */}
        <p className="text-cyber-silver text-sm mt-2">
          {recordingState === 'recording' 
            ? 'Recording...' 
            : recordingState === 'paused'
            ? 'Recording paused - Click play to resume'
            : recordingState === 'ready' && audioBlob
            ? `Recording ready (${(audioBlob.size / 1024).toFixed(1)} KB)`
            : recordingState === 'stopped'
            ? 'Processing recording...'
            : hasPermission === false
            ? 'Microphone permission required'
            : 'Click to start recording'
          }
        </p>
      </div>

      {/* Waveform Visualization */}
      <div className="flex justify-center items-end space-x-1 h-16 mb-6">
        {(recordingState === 'recording' ? waveform : Array(20).fill(5)).map((height, i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-full ${
              recordingState === 'recording' ? 'bg-neon-magenta' : 'bg-white/20'
            }`}
            style={{ height: `${height}%` }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>

      {/* Audio Player */}
      <AnimatePresence>
        {audioUrl && recordingState === 'ready' && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              onLoadedMetadata={() => {
                // Update duration from actual audio file
                if (audioRef.current) {
                  const actualDuration = Math.floor(audioRef.current.duration);
                  if (actualDuration && actualDuration !== duration) {
                    setDuration(actualDuration);
                  }
                }
              }}
              className="hidden"
            />
            
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-center">
                <p className="text-white font-medium mb-2">Recording Preview</p>
                <p className="text-cyber-silver text-sm">
                  Duration: {formatTime(duration)} | Size: {audioBlob ? (audioBlob.size / 1024).toFixed(1) : '0'} KB
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={playAudio}
                className="p-3 rounded-full bg-neon-blue/20 hover:bg-neon-blue/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isPlaying ? 'Pause playback' : 'Play recording'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-neon-blue" />
                ) : (
                  <Play className="w-5 h-5 text-neon-blue" />
                )}
              </motion.button>

              <motion.button
                onClick={deleteRecording}
                className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Delete recording"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Process Button */}
      <motion.button
        onClick={processRecording}
        disabled={recordingState !== 'ready' || !audioBlob || processing}
        className="w-full px-4 py-3 bg-gradient-to-r from-neon-magenta to-neon-blue rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-magenta/25 transition-all duration-300 flex items-center justify-center space-x-2"
        whileHover={{ scale: recordingState === 'ready' && audioBlob && !processing ? 1.02 : 1 }}
        whileTap={{ scale: recordingState === 'ready' && audioBlob && !processing ? 0.98 : 1 }}
        aria-label="Send recording to Telegram"
      >
        {processing ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Sending to Telegram...</span>
          </>
        ) : (
          <>
            <span>Send to Telegram</span>
            <span className="text-xs opacity-75">
              ({audioBlob ? `${(audioBlob.size / 1024).toFixed(1)} KB` : '0 KB'})
            </span>
          </>
        )}
      </motion.button>

      {/* Recording Tips */}
      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">💡 Recording Tips:</h4>
        <ul className="text-xs text-cyber-silver space-y-1">
          <li>• Speak clearly and close to the microphone</li>
          <li>• Keep recordings under 50MB for Telegram compatibility</li>
          <li>• Use 'Medium' quality for best balance of size and quality</li>
          <li>• Ensure stable internet connection before sending</li>
        </ul>
            <span className="text-sm">Sending voice message to Telegram...</span>
    </div>
  );
};

export default VoiceRecorder;