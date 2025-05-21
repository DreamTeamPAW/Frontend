'use client';
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
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { getIDfromToken } from '@/utils/token';


type BookContextType = {
    books: BookList | null;
    currentParams: PaginationParams;
    error: string | null;
    loading: boolean;
    selectedBook: Book | null;
    updatedBook: Book | null;
    successMessage: string | null;
    fetchBooks: (params: PaginationParams) => Promise<void>;
    addBook: (book: BookCU) => Promise<void>;
    updateBook: (book: BookCU, id: string) => Promise<void>;
    deleteBook: (bookID: string) => Promise<void>;
    getBook: (bookID: string) => Promise<Book>;
    updateParams: (params: PaginationParams) => void;
    setSelectedBook: (book: Book | null) => void;
    setUpdatedBook: (book: Book | null) => void;
    triggerSuccessMessage: (message: string | null) => void;
    updateBookStatus: (book: BookCU, id: string) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [books, setBooks] = useState<BookList | null>(null);
    const [currentParams, setCurrentParams] = useState<PaginationParams>({
        page: INITIAL_PAGE,
        limit: DEFAULT_LIMIT,
        query: "",
        userId: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [updatedBook, setUpdatedBook] = useState<Book | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        currentParams.userId = getIDfromToken();
        console.log("Fetching with user ID:", currentParams.userId);
        fetchBooks(currentParams);
    }, []);

    const fetchBooks = async (params: PaginationParams = currentParams) => {
        try {
            setLoading(true);
            const bookList = await getBooksService(params);
            setBooks(bookList);
            setCurrentParams(params);
        } catch (error) {
            setError("Error fetching books");
            console.error("Error fetching books: ", error);
        } finally {
            setLoading(false);
        }
    }

    const updateParams = (params: PaginationParams) => {
        setCurrentParams((prevParams) => ({
            ...prevParams,
            ...params,
        }));
    }

    const addBook = async (book: BookCU) => {
        try {
            await addBookService(book);
            fetchBooks(currentParams);
            toast.success("Book added successfully");
        } catch (error) {
            setError("Error adding a book");
            console.error("Error adding a book: ", error);
        }
    }

    const updateBook = async (book: BookCU, id: string) => {
        try {
            const result = await updateBookService(book, id);
            fetchBooks(currentParams);
            toast.success("Book updated successfully");
            setSelectedBook(result.book);
            setUpdatedBook(null);
        } catch (error) {
            setError("Error updating a book");
            console.error("Error updating a book: ", error);
        }
    }

    const updateBookStatus = async (book: BookCU, id: string) => {

        try {
            await updateBookService(book, id);
            fetchBooks(currentParams);
            toast.success("Book status updated successfully");
        } catch (error) {
            setError("Error updating a book");
            console.error("Error updating a book: ", error);
        }

    }

    const deleteBook = async (bookID: string) => {
        try {
            await deleteBookService(bookID);
            toast.success("Book deleted successfully");
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

    const triggerSuccessMessage = (message: string | null) => {
        setSuccessMessage(message);
        if (message) {
            setTimeout(() => {
                setSuccessMessage(null);
            }, 10000);
        }
    }

    return (
        <BookContext.Provider value={{
            books,
            currentParams,
            error,
            loading,
            fetchBooks,
            addBook,
            updateBook,
            deleteBook,
            getBook,
            updateParams,
            selectedBook,
            setSelectedBook,
            updatedBook,
            setUpdatedBook,
            successMessage,
            triggerSuccessMessage,
            updateBookStatus
        }}>
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
