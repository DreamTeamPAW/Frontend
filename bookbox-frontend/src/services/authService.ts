import api from './api';
import { AxiosError } from 'axios';
import { LOGIN_URL, REGISTER_URL, ME_URL } from './constants';
import { User } from '@/types/User';
import { clearToken, setToken } from '@/utils/token';
import { toast } from 'react-toastify';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}


interface AuthResponse {
    message: string;
}

interface LoginResponse {
    token: string;
}

interface MeResponse {
    user: User;
}

export const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
        const response = await api.post<LoginResponse>(LOGIN_URL, credentials);
        const token = response.data.token;
        setToken(token);
        toast.success("Login successful!");
    } catch (error) {
        console.error("Error logging in: ", error);
        let errorMessage = 'Error logging in';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage + ". Invalid email or password!");
        throw new Error(errorMessage);
    }
};

export const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
        await api.post<AuthResponse>(REGISTER_URL, credentials);
        toast.success("Registration successful!");
    } catch (error) {
        console.error("Error registering: ", error);
        let errorMessage = 'Error registering';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
}

export const logout = async (): Promise<void> => {
    try {
        //const response = await api.post<AuthResponse>(LOGOUT_URL);
        clearToken();
        //console.log(response.data.message);
    } catch (error) {
        console.error("Error logging out: ", error);
        let errorMessage = 'Error logging out';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}

export const getUser = async (): Promise<User> => {
    try {
        const response = await api.get<MeResponse>(ME_URL);
        return response.data.user;
    } catch (error) {
        console.error("Error fetching user: ", error);
        let errorMessage = 'Error fetching user';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}
