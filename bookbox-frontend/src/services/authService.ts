import api from './api';
import { AxiosError } from 'axios';
import { LOGIN_URL, REGISTER_URL, LOGOUT_URL, ME_URL , UserRole} from './constants';

export interface Credentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    role: UserRole;
}

interface AuthResponse {
    message: string;
}

export const login = async (credentials: Credentials): Promise<void> => {
    try{
        const response = await api.post<AuthResponse>(LOGIN_URL, credentials);
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
        const response = await api.post<AuthResponse>(REGISTER_URL, credentials);
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
        const response = await api.post<AuthResponse>(LOGOUT_URL);
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
        const response = await api.get<User>(ME_URL);
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