import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({ baseURL: API_URL });

// Sisipkan token admin (jika ada) ke setiap request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('akapi_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
