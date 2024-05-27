import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPost = () => api.get('/posts');
export const getPostDetail = (postId) => api.get(`/posts/${postId}/comments`);

export default api;
