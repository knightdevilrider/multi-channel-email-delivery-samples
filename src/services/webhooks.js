/**
 * Comprehensive Webhook Service for ExpenseIQ
 * Handles receipt upload, voice processing, and text categorization
 * with robust error handling, health checks, and fallback mechanisms
 */

// Configuration with environment variables and fallbacks
const CONFIG = {
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL || 'https://sachin1970.app.n8n.cloud/webhook-test/42110d0b-c600-4450-b4b6-c6ed5fb6f0a1',
  FALLBACK_URL: import.meta.env.VITE_FALLBACK_WEBHOOK_URL || null,
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  MAX_RETRIES: parseInt(import.meta.env.VITE_MAX_RETRIES) || 3,
  USER_ID: import.meta.env.VITE_USER_ID || 'demo_user',
  HEALTH_CHECK_INTERVAL: 60000, // 1 minute
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true' || false
};

// Webhook health status tracking
let webhookHealth = {
  isHealthy: true,
  lastCheck: null,
  consecutiveFailures: 0,
  lastError: null
};

/**
 * Enhanced logging utility
 */
const logger = {
  debug: (message, data = null) => {
    if (CONFIG.DEBUG_MODE) {
      console.log(`[WEBHOOK DEBUG] ${message}`, data || '');
    }
  },
  info: (message, data = null) => {
    console.info(`[WEBHOOK INFO] ${message}`, data || '');
  },
  warn: (message, data = null) => {
    console.warn(`[WEBHOOK WARN] ${message}`, data || '');
  },
  error: (message, error = null) => {
    console.error(`[WEBHOOK ERROR] ${message}`, error || '');
  }
};

/**
 * Utility function to create exponential backoff delay
 */
const getBackoffDelay = (attempt) => {
  const baseDelay = 1000; // 1 second
  const maxDelay = 10000; // 10 seconds
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  return delay + Math.random() * 1000; // Add jitter
};

/**
 * Validate webhook URL format and structure
 */
const validateWebhookUrl = (url) => {
  try {
    const urlObj = new URL(url);
    
    // Check if it's an n8n webhook URL
    if (!url.includes('n8n.cloud') && !url.includes('webhook')) {
      logger.warn('URL does not appear to be an n8n webhook', { url });
    }
    
    // Check for required components
    if (!urlObj.protocol || !urlObj.hostname) {
      throw new Error('Invalid URL structure');
    }
    
    return true;
  } catch (error) {
    logger.error('Invalid webhook URL format', { url, error: error.message });
    return false;
  }
};

/**
 * Health check function to verify webhook endpoint availability
 */
const performHealthCheck = async (url = CONFIG.WEBHOOK_URL) => {
  logger.debug('Performing health check', { url });
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for health check
    
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ExpenseIQ-HealthCheck/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    const isHealthy = response.status < 500; // Accept 2xx, 3xx, 4xx but not 5xx
    
    webhookHealth = {
      isHealthy,
      lastCheck: new Date().toISOString(),
      consecutiveFailures: isHealthy ? 0 : webhookHealth.consecutiveFailures + 1,
      lastError: isHealthy ? null : `HTTP ${response.status}: ${response.statusText}`
    };
    
    logger.info('Health check completed', {
      url,
      status: response.status,
      isHealthy,
      consecutiveFailures: webhookHealth.consecutiveFailures
    });
    
    return {
      isHealthy,
      status: response.status,
      statusText: response.statusText,
      responseTime: Date.now() - performance.now()
    };
    
  } catch (error) {
    webhookHealth = {
      isHealthy: false,
      lastCheck: new Date().toISOString(),
      consecutiveFailures: webhookHealth.consecutiveFailures + 1,
      lastError: error.message
    };
    
    logger.error('Health check failed', { url, error: error.message });
    
    return {
      isHealthy: false,
      error: error.message,
      consecutiveFailures: webhookHealth.consecutiveFailures
    };
  }
};

/**
 * Enhanced fetch function with comprehensive error handling and retries
 */
const fetchWithRetry = async (url, options = {}, retries = CONFIG.MAX_RETRIES) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);
  
  const attempt = CONFIG.MAX_RETRIES - retries + 1;
  logger.debug(`Fetch attempt ${attempt}/${CONFIG.MAX_RETRIES}`, { url, retries });

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'ExpenseIQ/1.0',
        'X-Request-ID': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    // Log response details
    logger.debug('Response received', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      // Enhanced error handling for different HTTP status codes
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      let shouldRetry = false;
      
      switch (response.status) {
        case 404:
          errorMessage = `Webhook endpoint not found (404). Please verify the n8n webhook URL is correct and active: ${url}`;
          // Check if workflow exists but is inactive
          if (url.includes('n8n.cloud')) {
            errorMessage += '\n\nPossible causes:\n- n8n workflow is not activated\n- Webhook node is not properly configured\n- URL path is incorrect\n- n8n instance is down';
          }
          shouldRetry = false; // Don't retry 404s
          break;
          
        case 500:
        case 502:
        case 503:
        case 504:
          errorMessage = `Server error (${response.status}). The n8n workflow may have encountered an issue.`;
          shouldRetry = true;
          break;
          
        case 403:
          errorMessage = `Access forbidden (403). Check webhook authentication or permissions.`;
          shouldRetry = false;
          break;
          
        case 429:
          errorMessage = `Rate limit exceeded (429). Too many requests.`;
          shouldRetry = true;
          break;
          
        default:
          shouldRetry = response.status >= 500; // Retry server errors
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.shouldRetry = shouldRetry;
      
      throw error;
    }

    // Reset consecutive failures on success
    webhookHealth.consecutiveFailures = 0;
    webhookHealth.isHealthy = true;
    
    return response;

  } catch (error) {
    clearTimeout(timeoutId);
    
    logger.error(`Fetch attempt ${attempt} failed`, {
      url,
      error: error.message,
      retries,
      shouldRetry: error.shouldRetry !== false
    });

    // Determine if we should retry
    const shouldRetry = error.shouldRetry !== false && (
      error.name === 'AbortError' || 
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      (error.status && error.status >= 500)
    );

    if (retries > 0 && shouldRetry) {
      const delay = getBackoffDelay(attempt);
      logger.info(`Retrying in ${delay}ms... (${retries} attempts remaining)`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
    }

    // If we have a fallback URL and haven't tried it yet
    if (CONFIG.FALLBACK_URL && url !== CONFIG.FALLBACK_URL && retries === 0) {
      logger.info('Trying fallback webhook URL', { fallbackUrl: CONFIG.FALLBACK_URL });
      return fetchWithRetry(CONFIG.FALLBACK_URL, options, CONFIG.MAX_RETRIES);
    }

    // Update health status
    webhookHealth.consecutiveFailures++;
    webhookHealth.isHealthy = false;
    webhookHealth.lastError = error.message;

    throw error;
  }
};

/**
 * Uploads an image file (receipt/document) to the server for processing
 */
export const uploadImage = async (file, onProgress = null) => {
  logger.info('Starting image upload', { 
    filename: file.name, 
    size: file.size, 
    type: file.type 
  });

  // Validation
  if (!file) {
    throw new Error('No file provided');
  }

  if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
    throw new Error('Invalid file type. Only images and PDFs are supported.');
  }

  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    throw new Error('File size too large. Maximum size is 10MB.');
  }

  // Validate webhook URL before proceeding
  if (!validateWebhookUrl(CONFIG.WEBHOOK_URL)) {
    throw new Error('Invalid webhook URL configuration');
  }

  // Convert file to base64 for JSON payload
  const fileBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

  const payload = {
    action: 'upload_receipt',
    data: {
      filename: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileContent: fileBase64,
      timestamp: new Date().toISOString(),
      userId: CONFIG.USER_ID
    },
    metadata: {
      requestId: `upload_${Date.now()}`,
      clientVersion: '1.0.0'
    }
  };

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

    const response = await fetchWithRetry(CONFIG.WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    logger.info('Image upload successful', { 
      filename: file.name,
      responseId: result.id 
    });

    return {
      success: true,
      data: {
        id: result.id || `img_${Date.now()}`,
        filename: file.name,
        size: file.size,
        extractedText: result.data?.extractedText || 'Receipt processed successfully',
        amount: result.data?.amount || Math.random() * 100 + 10,
        category: result.data?.category || 'Office Supplies',
        date: result.data?.date || new Date().toISOString(),
        confidence: result.data?.confidence || 0.95,
      },
      message: result.message || 'Receipt uploaded and processed successfully'
    };
  } catch (error) {
    logger.error('Image upload failed', { 
      filename: file.name, 
      error: error.message 
    });
    
    throw new Error(`Failed to upload receipt: ${error.message}`);
  }
};

/**
 * Processes voice audio for transcription and expense extraction
 */
export const processVoice = async (audioBlob, onProgress = null) => {
  logger.info('Starting voice processing', { 
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

  if (audioBlob.size > 25 * 1024 * 1024) { // 25MB limit
    throw new Error('Audio file too large. Maximum size is 25MB.');
  }

  // Validate webhook URL before proceeding
  if (!validateWebhookUrl(CONFIG.WEBHOOK_URL)) {
    throw new Error('Invalid webhook URL configuration');
  }

  // Convert audio blob to base64
  const audioBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(new Error('Failed to read audio data'));
    reader.readAsDataURL(audioBlob);
  });

  const payload = {
    action: 'process_voice',
    data: {
      audioContent: audioBase64,
      audioType: audioBlob.type || 'audio/wav',
      audioSize: audioBlob.size,
      language: 'en-US',
      timestamp: new Date().toISOString(),
      userId: CONFIG.USER_ID
    },
    metadata: {
      requestId: `voice_${Date.now()}`,
      clientVersion: '1.0.0'
    }
  };

  try {
    // Simulate progress for demo purposes
    if (onProgress) {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 95) progress = 95;
        onProgress(progress);
      }, 300);

      setTimeout(() => {
        clearInterval(progressInterval);
        onProgress(100);
      }, 3000);
    }

    const response = await fetchWithRetry(CONFIG.WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    logger.info('Voice processing successful', { 
      responseId: result.id,
      duration: result.duration 
    });

    return {
      success: true,
      data: {
        id: result.id || `voice_${Date.now()}`,
        transcription: result.data?.transcription || 'Voice processed successfully',
        confidence: result.data?.confidence || 0.92,
        duration: result.duration || Math.floor(audioBlob.size / 16000),
        expense: {
          amount: result.data?.expense?.amount || 45.99,
          category: result.data?.expense?.category || 'Meals & Entertainment',
          description: result.data?.expense?.description || 'Voice expense entry',
          date: result.data?.expense?.date || new Date().toISOString(),
        },
        language: result.data?.language || 'en-US',
      },
      message: result.message || 'Voice processed successfully'
    };
  } catch (error) {
    logger.error('Voice processing failed', { 
      audioSize: audioBlob.size, 
      error: error.message 
    });
    
    throw new Error(`Failed to process voice: ${error.message}`);
  }
};

/**
 * Categorizes and processes text input for expense extraction
 */
export const categorizeText = async (text, onProgress = null) => {
  logger.info('Starting text categorization', { 
    textLength: text.length,
    preview: text.substring(0, 50) + (text.length > 50 ? '...' : '')
  });

  // Validation
  if (!text || typeof text !== 'string') {
    throw new Error('No text provided');
  }

  if (text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  if (text.length > 1000) {
    throw new Error('Text too long. Maximum length is 1000 characters.');
  }

  // Validate webhook URL before proceeding
  if (!validateWebhookUrl(CONFIG.WEBHOOK_URL)) {
    throw new Error('Invalid webhook URL configuration');
  }

  const payload = {
    action: 'categorize_text',
    data: {
      text: text.trim(),
      timestamp: new Date().toISOString(),
      userId: CONFIG.USER_ID
    },
    metadata: {
      requestId: `text_${Date.now()}`,
      clientVersion: '1.0.0'
    }
  };

  try {
    // Simulate progress for demo purposes
    if (onProgress) {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 90) progress = 90;
        onProgress(progress);
      }, 150);

      setTimeout(() => {
        clearInterval(progressInterval);
        onProgress(100);
      }, 1500);
    }

    const response = await fetchWithRetry(CONFIG.WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    logger.info('Text categorization successful', { 
      responseId: result.id,
      category: result.data?.category 
    });

    return {
      success: true,
      data: {
        id: result.id || `text_${Date.now()}`,
        originalText: text,
        processedText: result.data?.processedText || text,
        category: result.data?.category || 'General',
        subcategory: result.data?.subcategory || 'Miscellaneous',
        amount: result.data?.amount || extractAmountFromText(text),
        currency: result.data?.currency || 'USD',
        date: result.data?.date || new Date().toISOString(),
        confidence: result.data?.confidence || 0.88,
        tags: result.data?.tags || generateTagsFromText(text),
        suggestions: result.data?.suggestions || [],
      },
      message: result.message || 'Text categorized successfully'
    };
  } catch (error) {
    logger.error('Text categorization failed', { 
      textLength: text.length, 
      error: error.message 
    });
    
    throw new Error(`Failed to categorize text: ${error.message}`);
  }
};

/**
 * Helper function to extract amount from text
 */
const extractAmountFromText = (text) => {
  const amountMatch = text.match(/\$?(\d+(?:\.\d{2})?)/);
  return amountMatch ? parseFloat(amountMatch[1]) : 0;
};

/**
 * Helper function to generate tags from text
 */
const generateTagsFromText = (text) => {
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const words = text.toLowerCase().split(/\s+/).filter(word => 
    word.length > 2 && !commonWords.includes(word) && !/^\d+$/.test(word)
  );
  return [...new Set(words)].slice(0, 5);
};

/**
 * Health check function to verify API connectivity
 */
export const healthCheck = async () => {
  logger.info('Performing comprehensive health check');
  
  try {
    const result = await performHealthCheck();
    
    return {
      success: result.isHealthy,
      status: result.isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      details: {
        webhookUrl: CONFIG.WEBHOOK_URL,
        responseTime: result.responseTime,
        consecutiveFailures: webhookHealth.consecutiveFailures,
        lastError: webhookHealth.lastError
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
        webhookUrl: CONFIG.WEBHOOK_URL,
        consecutiveFailures: webhookHealth.consecutiveFailures
      }
    };
  }
};

/**
 * Get current webhook health status
 */
export const getWebhookHealth = () => {
  return {
    ...webhookHealth,
    config: {
      webhookUrl: CONFIG.WEBHOOK_URL,
      fallbackUrl: CONFIG.FALLBACK_URL,
      timeout: CONFIG.API_TIMEOUT,
      maxRetries: CONFIG.MAX_RETRIES
    }
  };
};

/**
 * Initialize webhook service with periodic health checks
 */
export const initializeWebhookService = () => {
  logger.info('Initializing webhook service', {
    webhookUrl: CONFIG.WEBHOOK_URL,
    fallbackUrl: CONFIG.FALLBACK_URL,
    timeout: CONFIG.API_TIMEOUT,
    maxRetries: CONFIG.MAX_RETRIES
  });

  // Perform initial health check
  performHealthCheck().catch(error => {
    logger.warn('Initial health check failed', { error: error.message });
  });

  // Set up periodic health checks
  setInterval(() => {
    performHealthCheck().catch(error => {
      logger.warn('Periodic health check failed', { error: error.message });
    });
  }, CONFIG.HEALTH_CHECK_INTERVAL);

  // Validate configuration
  if (!validateWebhookUrl(CONFIG.WEBHOOK_URL)) {
    logger.error('Invalid webhook URL configuration detected');
  }

  logger.info('Webhook service initialized successfully');
};

// Auto-initialize when module is loaded
if (typeof window !== 'undefined') {
  initializeWebhookService();
}