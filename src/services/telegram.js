/**
 * Telegram Bot API Integration for ExpenseIQ
 * Handles sending text, images, and voice messages to Telegram
 */

// Configuration with environment variables
const CONFIG = {
  TELEGRAM_BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || '',
  TELEGRAM_API_URL: 'https://api.telegram.org/bot',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  MAX_RETRIES: parseInt(import.meta.env.VITE_MAX_RETRIES) || 3,
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true' || false,
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB Telegram limit
  MAX_PHOTO_SIZE: 10 * 1024 * 1024, // 10MB for photos
  MAX_VOICE_SIZE: 50 * 1024 * 1024, // 50MB for voice
};

// Health status tracking
let telegramHealth = {
  isHealthy: true,
  lastCheck: null,
  consecutiveFailures: 0,
  lastError: null,
  botInfo: null
};

/**
 * Enhanced logging utility
 */
const logger = {
  debug: (message, data = null) => {
    if (CONFIG.DEBUG_MODE) {
      console.log(`[TELEGRAM DEBUG] ${message}`, data || '');
    }
  },
  info: (message, data = null) => {
    console.info(`[TELEGRAM INFO] ${message}`, data || '');
  },
  warn: (message, data = null) => {
    console.warn(`[TELEGRAM WARN] ${message}`, data || '');
  },
  error: (message, error = null) => {
    console.error(`[TELEGRAM ERROR] ${message}`, error || '');
  }
};

/**
 * Utility function for exponential backoff delay
 */
const getBackoffDelay = (attempt) => {
  const baseDelay = 1000;
  const maxDelay = 10000;
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  return delay + Math.random() * 1000; // Add jitter
};

/**
 * Validate Telegram configuration
 */
const validateTelegramConfig = () => {
  if (!CONFIG.TELEGRAM_BOT_TOKEN) {
    logger.error('Telegram bot token is missing. Please set VITE_TELEGRAM_BOT_TOKEN');
    return false;
  }
  
  if (!CONFIG.TELEGRAM_CHAT_ID) {
    logger.error('Telegram chat ID is missing. Please set VITE_TELEGRAM_CHAT_ID');
    return false;
  }
  
  // Basic token format validation (should contain ':')
  if (!CONFIG.TELEGRAM_BOT_TOKEN.includes(':')) {
    logger.error('Invalid Telegram bot token format');
    return false;
  }
  
  return true;
};

/**
 * Enhanced fetch with retry logic and error handling
 */
const fetchWithRetry = async (url, options = {}, retries = CONFIG.MAX_RETRIES) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);
  
  const attempt = CONFIG.MAX_RETRIES - retries + 1;
  logger.debug(`Telegram API attempt ${attempt}/${CONFIG.MAX_RETRIES}`, { url });

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent': 'ExpenseIQ-Telegram/1.0',
        'X-Request-ID': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      let errorMessage = `Telegram API Error ${response.status}: ${response.statusText}`;
      
      if (errorData.description) {
        errorMessage += ` - ${errorData.description}`;
      }
      
      // Handle specific Telegram API errors
      switch (response.status) {
        case 400:
          errorMessage += '\nPossible causes: Invalid parameters, malformed request, or unsupported file format';
          break;
        case 401:
          errorMessage += '\nBot token is invalid or expired. Please check your VITE_TELEGRAM_BOT_TOKEN';
          break;
        case 403:
          errorMessage += '\nBot was blocked by user or chat not found. Please check your VITE_TELEGRAM_CHAT_ID';
          break;
        case 429:
          errorMessage += '\nRate limit exceeded. Please wait before retrying';
          break;
        case 413:
          errorMessage += '\nFile too large. Check Telegram file size limits';
          break;
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.telegramError = errorData;
      throw error;
    }

    const result = await response.json();
    
    if (!result.ok) {
      throw new Error(`Telegram API returned error: ${result.description || 'Unknown error'}`);
    }

    // Reset consecutive failures on success
    telegramHealth.consecutiveFailures = 0;
    telegramHealth.isHealthy = true;
    
    return result;

  } catch (error) {
    clearTimeout(timeoutId);
    
    logger.error(`Telegram API attempt ${attempt} failed`, {
      error: error.message,
      retries
    });

    // Determine if we should retry
    const shouldRetry = retries > 0 && (
      error.name === 'AbortError' || 
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      (error.status && error.status >= 500) ||
      error.status === 429 // Rate limit
    );

    if (shouldRetry) {
      const delay = getBackoffDelay(attempt);
      logger.info(`Retrying in ${delay}ms... (${retries} attempts remaining)`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
    }

    // Update health status
    telegramHealth.consecutiveFailures++;
    telegramHealth.isHealthy = false;
    telegramHealth.lastError = error.message;

    throw error;
  }
};

/**
 * Send text message to Telegram
 */
export const sendTextMessage = async (text, options = {}) => {
  logger.info('Sending text message to Telegram', { 
    textLength: text.length,
    preview: text.substring(0, 100) + (text.length > 100 ? '...' : '')
  });

  // Validation
  if (!text || typeof text !== 'string') {
    throw new Error('Text message cannot be empty');
  }

  if (text.length > 4096) {
    logger.warn('Text message too long, truncating to 4096 characters');
    text = text.substring(0, 4093) + '...';
  }

  if (!validateTelegramConfig()) {
    throw new Error('Invalid Telegram configuration');
  }

  const url = `${CONFIG.TELEGRAM_API_URL}${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const payload = {
    chat_id: CONFIG.TELEGRAM_CHAT_ID,
    text: text,
    parse_mode: options.parseMode || 'HTML',
    disable_web_page_preview: options.disablePreview || false,
    disable_notification: options.silent || false,
    ...options.extra
  };

  try {
    const result = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    logger.info('Text message sent successfully', { 
      messageId: result.result.message_id 
    });

    return {
      success: true,
      data: {
        messageId: result.result.message_id,
        text: result.result.text,
        date: new Date(result.result.date * 1000).toISOString(),
      },
      message: 'Text message sent to Telegram successfully'
    };
  } catch (error) {
    logger.error('Failed to send text message', { error: error.message });
    throw new Error(`Failed to send text message: ${error.message}`);
  }
};

/**
 * Send image to Telegram
 */
export const sendImage = async (imageFile, caption = '', onProgress = null) => {
  logger.info('Sending image to Telegram', { 
    filename: imageFile.name, 
    size: imageFile.size, 
    type: imageFile.type 
  });

  // Validation
  if (!imageFile) {
    throw new Error('No image file provided');
  }

  if (!imageFile.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  if (imageFile.size > CONFIG.MAX_PHOTO_SIZE) {
    throw new Error(`Image too large. Maximum size is ${CONFIG.MAX_PHOTO_SIZE / 1024 / 1024}MB`);
  }

  if (!validateTelegramConfig()) {
    throw new Error('Invalid Telegram configuration');
  }

  const url = `${CONFIG.TELEGRAM_API_URL}${CONFIG.TELEGRAM_BOT_TOKEN}/sendPhoto`;
  
  // Create FormData for file upload
  const formData = new FormData();
  formData.append('chat_id', CONFIG.TELEGRAM_CHAT_ID);
  formData.append('photo', imageFile);
  
  if (caption) {
    if (caption.length > 1024) {
      caption = caption.substring(0, 1021) + '...';
    }
    formData.append('caption', caption);
    formData.append('parse_mode', 'HTML');
  }

  try {
    // Simulate progress for demo purposes
    if (onProgress) {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress = Math.min(progress + Math.random() * 15, 95);
        onProgress(progress);
      }, 200);

      setTimeout(() => {
        clearInterval(progressInterval);
        onProgress(100);
      }, 2000);
    }

    const result = await fetchWithRetry(url, {
      method: 'POST',
      body: formData,
    });

    logger.info('Image sent successfully', { 
      messageId: result.result.message_id,
      fileId: result.result.photo[0].file_id
    });

    return {
      success: true,
      data: {
        messageId: result.result.message_id,
        fileId: result.result.photo[0].file_id,
        caption: result.result.caption || '',
        date: new Date(result.result.date * 1000).toISOString(),
      },
      message: 'Image sent to Telegram successfully'
    };
  } catch (error) {
    logger.error('Failed to send image', { 
      filename: imageFile.name, 
      error: error.message 
    });
    throw new Error(`Failed to send image: ${error.message}`);
  }
};

/**
 * Send voice message to Telegram
 */
export const sendVoice = async (audioBlob, caption = '', onProgress = null) => {
  logger.info('Sending voice message to Telegram', { 
    size: audioBlob.size, 
    type: audioBlob.type 
  });

  // Validation
  if (!audioBlob) {
    throw new Error('No audio data provided');
  }

  if (audioBlob.size === 0) {
    throw new Error('Audio data is empty');
  }

  if (audioBlob.size > CONFIG.MAX_VOICE_SIZE) {
    throw new Error(`Voice message too large. Maximum size is ${CONFIG.MAX_VOICE_SIZE / 1024 / 1024}MB`);
  }

  if (!validateTelegramConfig()) {
    throw new Error('Invalid Telegram configuration');
  }

  // Determine the best endpoint based on audio type and size
  let endpoint = 'sendVoice';
  let fileFieldName = 'voice';
  
  // For larger files or non-voice formats, use sendAudio
  if (audioBlob.size > 1024 * 1024 || // > 1MB
      !audioBlob.type.includes('ogg') && !audioBlob.type.includes('opus')) {
    endpoint = 'sendAudio';
    fileFieldName = 'audio';
    logger.info('Using sendAudio endpoint for better compatibility');
  }
  
  const url = `${CONFIG.TELEGRAM_API_URL}${CONFIG.TELEGRAM_BOT_TOKEN}/${endpoint}`;
  
  // Create FormData for file upload
  const formData = new FormData();
  formData.append('chat_id', CONFIG.TELEGRAM_CHAT_ID);
  
  // Create a File object from the Blob with appropriate extension
  let fileName = 'voice_message';
  let fileExtension = '.ogg';
  
  if (audioBlob.type.includes('webm')) {
    fileExtension = '.webm';
  } else if (audioBlob.type.includes('mp4')) {
    fileExtension = '.m4a';
  } else if (audioBlob.type.includes('wav')) {
    fileExtension = '.wav';
  } else if (audioBlob.type.includes('mp3')) {
    fileExtension = '.mp3';
  }
  
  const audioFile = new File([audioBlob], fileName + fileExtension, { 
    type: audioBlob.type || 'audio/ogg'
  });
  
  formData.append(fileFieldName, audioFile);
  
  // Add duration if we're using sendAudio
  if (endpoint === 'sendAudio') {
    // Estimate duration based on file size (rough approximation)
    const estimatedDuration = Math.max(1, Math.floor(audioBlob.size / 16000)); // Assume 16kbps
    formData.append('duration', estimatedDuration.toString());
    formData.append('title', 'Voice Expense Entry');
    formData.append('performer', 'ExpenseIQ');
  }
  
  if (caption) {
    if (caption.length > 1024) {
      caption = caption.substring(0, 1021) + '...';
    }
    formData.append('caption', caption);
    formData.append('parse_mode', 'HTML');
  }

  try {
    // Simulate progress for demo purposes
    if (onProgress) {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress = Math.min(progress + Math.random() * 15, 95);
        onProgress(progress);
      }, 300);

      setTimeout(() => {
        clearInterval(progressInterval);
        onProgress(100);
      }, 3000);
    }

    const result = await fetchWithRetry(url, {
      method: 'POST',
      body: formData,
    });

    logger.info('Voice message sent successfully', { 
      messageId: result.result.message_id,
      fileId: result.result.voice?.file_id || result.result.audio?.file_id,
      duration: result.result.voice?.duration || result.result.audio?.duration,
      endpoint: endpoint
    });

    return {
      success: true,
      data: {
        messageId: result.result.message_id,
        fileId: result.result.voice?.file_id || result.result.audio?.file_id,
        duration: result.result.voice?.duration || result.result.audio?.duration,
        caption: result.result.caption || '',
        date: new Date(result.result.date * 1000).toISOString(),
        endpoint: endpoint
      },
      message: 'Voice message sent to Telegram successfully'
    };
  } catch (error) {
    logger.error('Failed to send voice message', { 
      audioSize: audioBlob.size, 
      audioType: audioBlob.type,
      endpoint: endpoint,
      error: error.message 
    });
    throw new Error(`Failed to send voice message: ${error.message}`);
  }
};

/**
 * Health check function to verify Telegram Bot API
 */
export const healthCheck = async () => {
  logger.info('Performing Telegram health check');
  
  try {
    const result = await performHealthCheck();
    
    return {
      success: result.isHealthy,
      status: result.isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      details: {
        botInfo: result.botInfo,
        responseTime: result.responseTime,
        consecutiveFailures: telegramHealth.consecutiveFailures,
        lastError: telegramHealth.lastError
      }
    };
  } catch (error) {
    logger.error('Health check failed', { error: error.message });
    
    return {
      success: false,
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
      details: {
        consecutiveFailures: telegramHealth.consecutiveFailures
      }
    };
  }
};

/**
 * Get current Telegram health status
 */
export const getTelegramHealth = () => {
  return {
    ...telegramHealth,
    config: {
      botToken: CONFIG.TELEGRAM_BOT_TOKEN ? '***configured***' : 'missing',
      chatId: CONFIG.TELEGRAM_CHAT_ID || 'missing',
      apiUrl: CONFIG.TELEGRAM_API_URL,
      timeout: CONFIG.API_TIMEOUT,
      maxRetries: CONFIG.MAX_RETRIES
    }
  };
};

/**
 * Perform health check
 */
const performHealthCheck = async () => {
  if (!validateTelegramConfig()) {
    telegramHealth = {
      isHealthy: false,
      lastCheck: new Date().toISOString(),
      consecutiveFailures: telegramHealth.consecutiveFailures + 1,
      lastError: 'Invalid Telegram configuration'
    };
    return { isHealthy: false, error: 'Invalid configuration' };
  }
  
  try {
    const url = `${CONFIG.TELEGRAM_API_URL}${CONFIG.TELEGRAM_BOT_TOKEN}/getMe`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ExpenseIQ-Telegram/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    const result = await response.json();
    const isHealthy = response.ok && result.ok;
    
    telegramHealth = {
      isHealthy,
      lastCheck: new Date().toISOString(),
      consecutiveFailures: isHealthy ? 0 : telegramHealth.consecutiveFailures + 1,
      lastError: isHealthy ? null : result.description || `HTTP ${response.status}`,
      botInfo: isHealthy ? result.result : null
    };
    
    logger.info('Telegram health check completed', {
      status: response.status,
      isHealthy,
      botInfo: result.result
    });
    
    return {
      isHealthy,
      status: response.status,
      botInfo: result.result,
      responseTime: Date.now() - performance.now()
    };
    
  } catch (error) {
    telegramHealth = {
      isHealthy: false,
      lastCheck: new Date().toISOString(),
      consecutiveFailures: telegramHealth.consecutiveFailures + 1,
      lastError: error.message,
      botInfo: null
    };
    
    logger.error('Telegram health check failed', { error: error.message });
    
    return {
      isHealthy: false,
      error: error.message,
      consecutiveFailures: telegramHealth.consecutiveFailures
    };
  }
};

/**
 * Initialize Telegram service with periodic health checks
 */
export const initializeTelegramService = () => {
  logger.info('Initializing Telegram service', {
    botToken: CONFIG.TELEGRAM_BOT_TOKEN ? '***configured***' : 'missing',
    chatId: CONFIG.TELEGRAM_CHAT_ID || 'missing',
    timeout: CONFIG.API_TIMEOUT,
    maxRetries: CONFIG.MAX_RETRIES
  });

  // Perform initial health check
  performHealthCheck().catch(error => {
    logger.warn('Initial health check failed', { error: error.message });
  });

  // Set up periodic health checks (every 5 minutes)
  setInterval(() => {
    performHealthCheck().catch(error => {
      logger.warn('Periodic health check failed', { error: error.message });
    });
  }, 5 * 60 * 1000);

  // Validate configuration
  if (!validateTelegramConfig()) {
    logger.error('Invalid Telegram configuration detected');
  }

  logger.info('Telegram service initialized successfully');
};

// Auto-initialize when module is loaded
if (typeof window !== 'undefined') {
  initializeTelegramService();
}

// Legacy webhook compatibility functions
export const uploadImage = sendImage;
export const processVoice = sendVoice;
export const categorizeText = sendTextMessage;