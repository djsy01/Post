import axios from './axios';
import type { AxiosResponse } from 'axios';

export interface Post {
  b_id: number;
  b_name: string;
  b_title: string;
  b_mail?: string;
  b_content: string;
  b_pwd: string;
  b_filename?: string;
  b_filesize?: string;
  b_date: string;
  b_view: number;
}

const API_PATH = '/posts'; // 인스턴스 baseURL 포함되어 있으니 상대경로만

export const fetchPosts = (): Promise<Post[]> =>
  axios.get<Post[]>(API_PATH).then(res => res.data);

export const fetchPostById = (id: number): Promise<Post> =>
  axios.get<Post>(`${API_PATH}/${id}`).then(res => res.data);

export const createPost = (formData: FormData): Promise<any> =>
  axios.post(API_PATH, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

export const updatePost = (id: number, formData: FormData): Promise<any> =>
  axios.put(`${API_PATH}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

export const deletePost = (id: number, b_pwd: string): Promise<any> =>
  axios.delete(`${API_PATH}/${id}`, { data: { b_pwd } }).then(res => res.data);
