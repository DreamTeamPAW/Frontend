import api from './api'
import { BOOKS_URL } from './constants'
import { AxiosError } from 'axios';
import { Book, BookStatus, BookList } from '../types/Book';
import { PaginationParams } from '@/types/Pagination';
import { toast } from 'react-toastify';


export interface BookCU {
    userId: string;
    title: string;
    author: string;
    cover: string;
    status: string;
    dateAdded: string;
}

export interface BookCreateResponse {
    message: string;
    book: BookCU;
}

export interface BookUpdateResponse {
    message: string;
    book: Book;
}

const buildBookUrl = (id: string) => `${BOOKS_URL}/${id}`


export const getBooks = async (params: PaginationParams): Promise<BookList> => {
    try {
        const response = await api.get<BookList>(BOOKS_URL, { params: params });
        return response.data;
    } catch (error) {
        console.error("Error fetching books: ", error);
        let errorMessage = 'Error fetchingg books';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
};

export const addBook = async (book: BookCU): Promise<BookCreateResponse> => {
    try {
        const response = await api.post(BOOKS_URL, book);
        return response.data;
    } catch (error) {
        console.error("Error adding a book: ", error);
        throw error;
    }
};

export const getBook = async (bookID: string): Promise<Book> => {
    try {
        const response = await api.get<Book>(buildBookUrl(bookID));
        return response.data;
    } catch (error) {
        console.error("Error fetching the book: ", error);
        let errorMessage = 'Error fetchingg the book';

        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
};

export const deleteBook = async (bookID: string): Promise<void> => {
    try {
        await api.delete(buildBookUrl(bookID));
    } catch (error) {
        console.error("Error deleting the book", error);
        let errorMessage = 'Error deleting the book';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
};

export const updateBook = async (book: BookCU, id: string): Promise<BookUpdateResponse> => {
    try {
        const response = await api.put<BookUpdateResponse>(`${BOOKS_URL}/${id}`, book);
        toast.success("Book updated successfully");
        return response.data;
    } catch (error: any) {
        console.error("Error updating book: ", error);
        let errorMessage = 'Error updating book';
        if (error.response.status === 413) {
            toast.error("Image too big!");
        }
        else {
            toast.error("Error updating book!", error);
        }
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;

        }
        throw new Error(errorMessage);
    }
}

