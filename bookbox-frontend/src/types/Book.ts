import { BookPagination } from "./Pagination";

export enum BookStatus {
	UNREAD = "Not read",
	READING = "Reading",
	FINISHED = "Finished"
}

export enum BookStatusColors {
	UNREAD = "purple",
	READING = "blue",
	FINISHED = "green"
}

export interface Book {
	_id: string;
	userID: string;
	title: string;
	author: string;
	cover: string;
	status: BookStatus;
	dateAdded: Date;
}

export interface BookList {
	books: Book[];
	pagination: BookPagination;

}
