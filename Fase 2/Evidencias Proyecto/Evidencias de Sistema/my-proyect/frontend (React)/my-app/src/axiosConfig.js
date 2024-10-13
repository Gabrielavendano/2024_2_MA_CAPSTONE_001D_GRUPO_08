import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Asegúrate de que la URL sea correcta
});

export default api;
