import axios from 'axios';
import { HF_CONFIG } from '../config/huggingface';

const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const textDecoder = new TextDecoder('utf-8');

export const generateImage = async (prompt, settings) => {
  try {
    const response = await axios({
      url: HF_CONFIG.API_URL,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_CONFIG.WRITE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        inputs: prompt,
        parameters: {
          seed: settings.seed,
          width: settings.width,
          height: settings.height,
          num_inference_steps: settings.numInferenceSteps
        },
        options: {
          wait_for_model: true
        }
      },
      responseType: 'arraybuffer',
      validateStatus: (status) => status === 200
    });

    // Check if the response is actually an image
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('image')) {
      // If it's not an image, it might be an error message
      const errorText = textDecoder.decode(response.data);
      console.error('API Error:', errorText);
      throw new Error(errorText || 'Invalid response from the API');
    }

    const base64Image = arrayBufferToBase64(response.data);
    return `data:${contentType};base64,${base64Image}`;
  } catch (error) {
    // Handle specific axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorText = error.response.data instanceof ArrayBuffer 
        ? textDecoder.decode(error.response.data)
        : error.response.data;
      console.error('API Response Error:', {
        status: error.response.status,
        data: errorText
      });
      throw new Error(`API Error: ${error.response.status} - ${errorText}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network error: No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Setup Error:', error.message);
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};