import axios from 'axios';
import {API_BASE_URL} from "../constants";

const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 || error.response.status === 500 || error.response.status === 403 || error.response.status === 400) {
        alert('다시 로그인해주세요.');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('admin');
        window.location.href = '/login';
    } else {
        return Promise.reject(error);
    }
});

export default api;
