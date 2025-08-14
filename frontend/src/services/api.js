import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Contact API
export const contactAPI = {
  submit: async (data) => {
    const response = await apiClient.post('/contact', data);
    return response.data;
  },
  
  getAll: async () => {
    const response = await apiClient.get('/contacts');
    return response.data;
  }
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/projects');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  }
};

// Services API
export const servicesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/services');
    return response.data;
  }
};

// Profile API
export const profileAPI = {
  get: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  }
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/testimonials');
    return response.data;
  }
};

export default apiClient;