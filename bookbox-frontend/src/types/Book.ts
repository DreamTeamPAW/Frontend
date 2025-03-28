

export enum BookStatus {
	UNREAD = "unread",
	READING = "reading",
	FINISHED = "finished"
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

export interface BookListPagination {
	currentPage: number;
	totalPages: number;
	totalBooks: number;
	limit: number;
}

export interface BookList {
	books: Book[];
	pagination: BookListPagination;

}
