import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API,
    
    headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
    }
});

export default api;