import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.8:4440'
});

export default api;