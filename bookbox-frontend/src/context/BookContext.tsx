import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    getBooks as getBooksService,
    getBook as getBookService,
    addBook as addBookService,
    deleteBook as deleteBookService,
    updateBook as updateBookService,
    BookCU,
} from '../services/bookService';
import { Book, BookList } from '../types/Book';
import { DEFAULT_LIMIT, INITIAL_PAGE } from '@/services/constants';
import { PaginationParams } from '@/types/Pagination';


type BookContextType = {
    books: BookList | null;
    currentParams: PaginationParams;
    error: string | null;
    loading: boolean;
    fetchBooks: (params: PaginationParams) => Promise<void>;
    addBook: (book: BookCU) => Promise<void>;
    updateBook: (book: BookCU, id: string) => Promise<void>;
    deleteBook: (bookID: string) => Promise<void>;
    getBook: (bookID: string) => Promise<Book>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [books, setBooks] = useState<BookList | null>(null);
    const [currentParams, setCurrentParams] = useState<PaginationParams>({ page: INITIAL_PAGE, limit: DEFAULT_LIMIT });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks(currentParams);
    }, []);

    const fetchBooks = async (params: PaginationParams) => {
        try {
            setLoading(true);
            const bookList = await getBooksService(params);
            setBooks(bookList);
            console.log("Books fetched successfully");
            setCurrentParams(params);
        } catch (error) {
            setError("Error fetching books");
            console.error("Error fetching books: ", error);
        } finally {
            setLoading(false);
        }
    }

    const addBook = async (book: BookCU) => {
        try {
            await addBookService(book);
            fetchBooks(currentParams);
        } catch (error) {
            setError("Error adding a book");
            console.error("Error adding a book: ", error);
        }
    }

    const updateBook = async (book: BookCU, id: string) => {
        try {
            await updateBookService(book, id);
            fetchBooks(currentParams);
        } catch (error) {
            setError("Error updating a book");
            console.error("Error updating a book: ", error);
        }
    }

    const deleteBook = async (bookID: string) => {
        try {
            await deleteBookService(bookID);
            fetchBooks(currentParams);
        } catch (error) {
            setError("Error deleting a book");
            console.error("Error deleting a book: ", error);
        }
    }

    const getBook = async (bookID: string) => {
        try {
            return await getBookService(bookID);
        } catch (error) {
            setError("Error fetching the book");
            console.error("Error fetching the book: ", error);
            throw error;
        }
    }

    return (
        <BookContext.Provider value={{ books, currentParams, error, loading, fetchBooks, addBook, updateBook, deleteBook, getBook }}>
            {children}
        </BookContext.Provider>
    )
}

export const useBooks = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBooks must be used within a BooksProvider');
    }
    return context;
}
