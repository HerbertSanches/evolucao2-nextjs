import axios from 'axios';

// const token = "teste";
const api = axios.create({
    baseURL: "http://localhost:54321/evolucaoserv/v1/",
    // headers: {
    //     'Authorization': `Bearer ${token}`
    // }
});

export default api;