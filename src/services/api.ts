import axios from 'axios';

// const token = "teste";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API,
    
    // headers: {
    //     'Authorization': `Bearer ${token}`
    // }
});

export default api;