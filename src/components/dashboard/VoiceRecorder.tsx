import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Pause, Square, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { processVoice } from '../../services/webhooks';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [processing, setProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);

  // Generate waveform animation
  useEffect(() => {
    if (isRecording && !isPaused) {
      const generateWaveform = () => {
        setWaveform(Array.from({ length: 20 }, () => Math.random() * 60 + 10));
        animationRef.current = requestAnimationFrame(generateWaveform);
      };
      generateWaveform();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setWaveform([]);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, isPaused]);

  // Duration timer
  useEffect(() => {
    if (isRecording && !isPaused) {
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
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      toast.success('Recording started');
    } catch (error) {
      toast.error('Failed to access microphone');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        toast.success('Recording resumed');
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        toast.success('Recording paused');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
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
    setAudioBlob(null);
    setAudioUrl('');
    setDuration(0);
    setIsPlaying(false);
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

    setProcessing(true);
    try {
      toast.loading('Processing voice recording...', { id: 'voice-processing' });
      
      const result = await processVoice(audioBlob);
      
      toast.dismiss('voice-processing');
      toast.success(`Voice transcribed: "${result.data.transcription.substring(0, 50)}..."`);
      
      console.log('Processing result:', result);
    } catch (error) {
      toast.dismiss('voice-processing');
      
      // Show more specific error message
      if (error.message.includes('404')) {
        toast.error('Webhook endpoint not found. Please check n8n configuration.');
      } else if (error.message.includes('timeout')) {
        toast.error('Voice processing timed out. Please try again.');
      } else {
        toast.error(`Failed to process voice: ${error.message}`);
      }
      
      console.error('Voice processing error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card-bg backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon-magenta/20 flex items-center justify-center">
          <Mic className="w-5 h-5 text-neon-magenta" />
        </div>
        <h3 className="text-xl font-bold text-white">Voice Recorder</h3>
      </div>

      {/* Recording Controls */}
      <div className="text-center mb-6">
        <motion.div
          className="relative inline-block mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-gradient-to-r from-neon-magenta to-neon-blue hover:shadow-lg hover:shadow-neon-magenta/25'
            }`}
            whileTap={{ scale: 0.95 }}
            disabled={processing}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </motion.button>

          {/* Recording indicator */}
          {isRecording && (
            <motion.div
              className="absolute -inset-2 border-2 border-red-500 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Pause button (only show when recording) */}
        <AnimatePresence>
          {isRecording && (
            <motion.button
              onClick={pauseRecording}
              className="ml-4 p-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors duration-200"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPaused ? (
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
          {isRecording 
            ? (isPaused ? 'Recording paused' : 'Recording...') 
            : audioBlob 
            ? 'Recording ready' 
            : 'Click to start recording'
          }
        </p>
      </div>

      {/* Waveform Visualization */}
      <div className="flex justify-center items-end space-x-1 h-16 mb-6">
        {(isRecording ? waveform : Array(20).fill(5)).map((height, i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-full ${
              isRecording ? 'bg-neon-magenta' : 'bg-white/20'
            }`}
            style={{ height: `${height}%` }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>

      {/* Audio Player */}
      <AnimatePresence>
        {audioUrl && (
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
              className="hidden"
            />
            
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={playAudio}
                className="p-3 rounded-full bg-neon-blue/20 hover:bg-neon-blue/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
        disabled={!audioBlob || processing}
        className="w-full px-4 py-3 bg-gradient-to-r from-neon-magenta to-neon-blue rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-magenta/25 transition-all duration-300"
        whileHover={{ scale: audioBlob && !processing ? 1.02 : 1 }}
        whileTap={{ scale: audioBlob && !processing ? 0.98 : 1 }}
      >
        {processing ? 'Processing...' : 'Process Voice Recording'}
      </motion.button>
    </div>
  );
};

export default VoiceRecorder;