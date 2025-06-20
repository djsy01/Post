import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
