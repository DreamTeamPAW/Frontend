import api from './api';
import { AxiosError } from 'axios';

export interface Credentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    role: 'user' | 'admin';
}

interface AuthResponse {
    message: string;
}

export const login = async (credentials: Credentials): Promise<void> => {
    try{
        const response = await api.post<AuthResponse>('/auth/login', credentials);
         console.log(response.data.message);
    } catch(error){
        console.error("Error logging in: ", error);
        let errorMessage = 'Error logging in';
        if(error instanceof AxiosError && error.response?.data?.message){
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
};

export const register = async (credentials: Credentials): Promise<void> => {
    try{
        const response = await api.post<AuthResponse>('/auth/register', credentials);
        console.log(response.data.message);
    } catch(error){
        console.error("Error registering: ", error);
        let errorMessage = 'Error registering';
        if(error instanceof AxiosError && error.response?.data?.message){
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}

export const logout = async (): Promise<void> => {
    try{
        const response = await api.post<AuthResponse>('/auth/logout');
        console.log(response.data.message);
    } catch(error){
        console.error("Error logging out: ", error);
        let errorMessage = 'Error logging out';
        if(error instanceof AxiosError && error.response?.data?.message){
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}

export const getUser = async (): Promise<User> => {
    try{
        const response = await api.get<User>('/auth/me');
        return response.data;
    } catch (error) {
        console.error("Error fetching user: ", error);
        let errorMessage = 'Error fetching user';
        if(error instanceof AxiosError && error.response?.data?.message){
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}