import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://carpool-backend-67hn.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
  if (tokenCookie) {
    const token = tokenCookie.split('=')[1];
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
