import { BookPagination } from "./Pagination";

export enum BookStatus {
	UNREAD = "Not read",
	READING = "Reading",
	FINISHED = "Finished"
}

export interface Book {
	_id: string;
	userID: string;
	isbn: string;
	title: string;
	author: string;
	tags: string[];
	status: BookStatus;
	dateAdded: Date;
}

export interface BookList {
	books: Book[];
	pagination: BookPagination;

}
