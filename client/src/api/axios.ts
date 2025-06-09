import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  withCredentials: true,
});

// API 호출 함수
export const fetchPosts = () => instance.get('/posts');
export const fetchPostById = (id: number) => instance.get(`/posts/${id}`);

export default instance;