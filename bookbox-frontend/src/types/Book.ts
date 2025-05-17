import { BookPagination } from "./Pagination";

export enum BookStatus {
	UNREAD = "Not read",
	READING = "Reading",
	FINISHED = "Finished"
}

export function stringToBookStatus(str: string): BookStatus | undefined {
	const lowerStr = str.toLowerCase();

	const entry = Object.entries(BookStatus).find(
		([, value]) => value.toLowerCase() === lowerStr
	);

	return entry ? BookStatus[entry[0] as keyof typeof BookStatus] : undefined;
}

export function bookStatusToString(status: BookStatus): string {
	if (status === BookStatus.UNREAD) {
		return "unread";
	}
	if (status === BookStatus.READING) {
		return "reading";
	}
	else {
		return "finished";
	}
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
