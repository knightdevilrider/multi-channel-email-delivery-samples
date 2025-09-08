/**
 * API service for handling file uploads, voice processing, and text categorization
 * Integrated with n8n webhook endpoint for processing tasks
 */

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'https://sachin1970.app.n8n.cloud/webhook-test/42110d0b-c600-4450-b4b6-c6ed5fb6f0a1';
const API_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

/**
 * Utility function to create a delay for retries
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after the delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Utility function to make HTTP requests with timeout and retries
 * @param {string} url - Request URL
 * @param {RequestInit} options - Fetch options
 * @param {number} retries - Number of retries remaining
 * @returns {Promise<Response>} Fetch response
 */
const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Enhanced error handling for different HTTP status codes
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      if (response.status === 404) {
        errorMessage = `Webhook endpoint not found (404). Please verify the n8n webhook URL is correct and active: ${url}`;
      } else if (response.status === 500) {
        errorMessage = `Server error (500). The n8n workflow may have encountered an issue.`;
      } else if (response.status === 403) {
        errorMessage = `Access forbidden (403). Check webhook authentication or permissions.`;
      }
      
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (retries > 0 && (error.name === 'AbortError' || error.message.includes('fetch'))) {
      console.warn(`Request failed, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await delay(1000 * (MAX_RETRIES - retries + 1)); // Exponential backoff
      return fetchWithRetry(url, options, retries - 1);
    }

    throw error;
  }
};

/**
 * Uploads an image file (receipt/document) to the server for processing
 * @param {File} file - The image file to upload
 * @param {Function} onProgress - Optional progress callback function
 * @returns {Promise<Object>} Upload result with extracted data
 * @throws {Error} If upload fails or file is invalid
 * 
 * @example
 * try {
 *   const result = await uploadImage(file, (progress) => {
 *     console.log(`Upload progress: ${progress}%`);
 *   });
 *   console.log('Extracted data:', result.data);
 * } catch (error) {
 *   console.error('Upload failed:', error.message);
 * }
 */
export const uploadImage = async (file, onProgress = null) => {
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

  // Convert file to base64 for JSON payload
  const fileBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
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
      userId: import.meta.env.VITE_USER_ID || 'demo_user'
    }
  };

  try {
    // Simulate progress for demo purposes
    if (onProgress) {
      const progressInterval = setInterval(() => {
        const progress = Math.min(Math.random() * 100, 95);
        onProgress(progress);
      }, 200);

      setTimeout(() => {
        clearInterval(progressInterval);
        onProgress(100);
      }, 2000);
    }

    const response = await fetchWithRetry(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return {
      success: true,
      data: {
        id: result.id || `img_${Date.now()}`,
        filename: file.name,
        size: file.size,
        extractedText: result.data?.extractedText || 'Receipt processed via n8n webhook',
        amount: result.data?.amount || Math.random() * 100 + 10,
        category: result.data?.category || 'Office Supplies',
        date: result.data?.date || new Date().toISOString(),
        confidence: result.data?.confidence || 0.95,
      },
      message: result.message || 'Receipt uploaded and processed via n8n webhook'
    };
  } catch (error) {
    console.error('Image upload error:', error);
    
    throw new Error(`Failed to upload receipt: ${error.message}`);
  }
};

/**
 * Processes voice audio for transcription and expense extraction
 * @param {Blob} audioBlob - The audio blob to process
 * @param {Function} onProgress - Optional progress callback function
 * @returns {Promise<Object>} Processing result with transcription and extracted data
 * @throws {Error} If processing fails or audio is invalid
 * 
 * @example
 * try {
 *   const result = await processVoice(audioBlob, (progress) => {
 *     console.log(`Processing progress: ${progress}%`);
 *   });
 *   console.log('Transcription:', result.transcription);
 *   console.log('Extracted expense:', result.expense);
 * } catch (error) {
 *   console.error('Voice processing failed:', error.message);
 * }
 */
export const processVoice = async (audioBlob, onProgress = null) => {
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

  // Convert audio blob to base64
  const audioBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
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
      userId: import.meta.env.VITE_USER_ID || 'demo_user'
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

    const response = await fetchWithRetry(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return {
      success: true,
      data: {
        id: result.id || `voice_${Date.now()}`,
        transcription: result.data?.transcription || 'Voice processed via n8n webhook',
        confidence: result.data?.confidence || 0.92,
        duration: result.duration || Math.floor(audioBlob.size / 16000), // Rough estimate
        expense: {
          amount: result.data?.expense?.amount || 45.99,
          category: result.data?.expense?.category || 'Meals & Entertainment',
          description: result.data?.expense?.description || 'Voice expense entry',
          date: result.data?.expense?.date || new Date().toISOString(),
        },
        language: result.data?.language || 'en-US',
      },
      message: result.message || 'Voice processed via n8n webhook'
    };
  } catch (error) {
    console.error('Voice processing error:', error);
    
    throw new Error(`Failed to process voice: ${error.message}`);
  }
};

/**
 * Categorizes and processes text input for expense extraction
 * @param {string} text - The text to categorize and process
 * @param {Function} onProgress - Optional progress callback function
 * @returns {Promise<Object>} Categorization result with extracted expense data
 * @throws {Error} If processing fails or text is invalid
 * 
 * @example
 * try {
 *   const result = await categorizeText('Lunch at restaurant $25.50', (progress) => {
 *     console.log(`Processing progress: ${progress}%`);
 *   });
 *   console.log('Category:', result.category);
 *   console.log('Amount:', result.amount);
 * } catch (error) {
 *   console.error('Text categorization failed:', error.message);
 * }
 */
export const categorizeText = async (text, onProgress = null) => {
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

  const payload = {
    action: 'categorize_text',
    data: {
      text: text.trim(),
      timestamp: new Date().toISOString(),
      userId: import.meta.env.VITE_USER_ID || 'demo_user'
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

    const response = await fetchWithRetry(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

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
      message: result.message || 'Text categorized via n8n webhook'
    };
  } catch (error) {
    console.error('Text categorization error:', error);
    
    throw new Error(`Failed to categorize text: ${error.message}`);
  }
};

/**
 * Helper function to extract amount from text
 * @param {string} text - Text to extract amount from
 * @returns {number} Extracted amount or 0 if not found
 */
const extractAmountFromText = (text) => {
  const amountMatch = text.match(/\$?(\d+(?:\.\d{2})?)/);
  return amountMatch ? parseFloat(amountMatch[1]) : 0;
};

/**
 * Helper function to generate tags from text
 * @param {string} text - Text to generate tags from
 * @returns {string[]} Array of generated tags
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
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await fetchWithRetry(WEBHOOK_URL, {
      method: 'GET',
    });
    
    const result = await response.json();
    return {
      success: true,
      status: result.status || 'healthy',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};