import api from './api';
import { AxiosError } from 'axios';
import { UserList } from '../types/User';
import { USERS_URL } from './constants';
import { UserPaginationParams } from '@/types/Pagination';

const buildUserUrl = (id: string) => `${USERS_URL}/${id}`

export const getUsers = async (params: UserPaginationParams): Promise<UserList> => {
    try {
        const response = await api.get<UserList>(USERS_URL, { params: params });
        return response.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        let errorMessage = 'Error fetching users';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}

export const deleteUser = async (userID: string): Promise<void> => {
    try {
        await api.delete(buildUserUrl(userID));
    } catch (error) {
        console.error("Error deleting user: ", error);
        let errorMessage = 'Error deleting user';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}
