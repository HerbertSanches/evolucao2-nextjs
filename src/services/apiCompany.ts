import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const apiCompany = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API,
});

export default apiCompany;