import axios from 'axios';

const API = axios.create({
  // In production, point to the deployed backend via VITE_API_URL.
  // Locally, fall back to '/api' which Vite proxies to localhost:5000.
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export default API;
