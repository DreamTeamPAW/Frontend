import api from './api'
import { BOOKS_URL } from './constants'
import { AxiosError } from 'axios';
import { Book, BookStatus, BookList } from '../types/Book';
import { PaginationParams } from '@/types/Pagination';


export interface BookCU {
    userID: string;
    isbn: string;
    title: string;
    author: string;
    tags: string[];
    status: BookStatus;
    dateAdded: Date;
}

export interface BookCreateResponse {
    message: string;
    book: BookCU;
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
        let errorMessage = 'Error adding a book';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
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

export const updateBook = async (book: BookCU, id: string): Promise<Book> => {
    try {
        const response = await api.put<Book>(BOOKS_URL, book, { params: { id: id } });
        return response.data;
    } catch (error) {
        console.error("Error updating book: ", error);
        let errorMessage = 'Error updating book';
        if (error instanceof AxiosError && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        throw new Error(errorMessage);
    }
}

