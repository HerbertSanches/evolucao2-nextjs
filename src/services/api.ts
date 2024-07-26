import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:54321/evolucaoserv/v1/",
});

export default api;