import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiService.interceptors.response.use(
  async (response) => response,
  async (error) => {
    try {
      throw error;
    } catch (innerError) {

      console.error('Error while handling main error:', innerError);

      throw innerError;
    }
  }
);

export default apiService;
