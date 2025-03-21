import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './constants';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // TODO: Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;