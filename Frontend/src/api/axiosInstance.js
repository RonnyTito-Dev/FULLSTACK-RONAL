// axiosInstance.js

// Importamos axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // Para enviar cookie httpOnly
});

// Exportar la api
export default api;