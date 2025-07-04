// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.48.95:5000', // Replace with your local IP
  timeout: 30000,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('API Error:', error.config?.url, error.response?.status);
    return Promise.reject(error);
  }
);

export const pingServer = async () => {
  try {
    const res = await api.get('/ping');
    return res.status === 200;
  } catch (e) {
    console.error('Server ping failed:', e.message);
    return false;
  }
};

export const makePredictionRequest = async (formData, token) => {
  try {
    
    if (!formData) throw new Error('No form data provided');
    if (!token) throw new Error('No authentication token');
    const response = await api.post('/predict', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
       'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Response headers:', response.headers);
    return response.data;
  } catch (error) {
    console.error('Full error context:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};

export default api;
