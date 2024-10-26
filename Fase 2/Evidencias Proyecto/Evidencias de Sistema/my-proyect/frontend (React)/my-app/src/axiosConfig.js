import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Verifica que coincida con la configuración de Django
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

