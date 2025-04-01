import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './constants';
import { clearToken, getToken } from '@/utils/token';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            clearToken();
            // TODO: Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;