import axios from 'axios';
console.log("API URL:", process.env.NEXT_PUBLIC_APP_API);
// const token = "teste";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API,
    
    // headers: {
    //     'Authorization': `Bearer ${token}`
    // }
});

export default api;