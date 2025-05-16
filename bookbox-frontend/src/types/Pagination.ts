export interface BookPagination {
	currentPage: number;
	totalPages: number;
	totalBooks: number;
	limit: number;
}

export interface UserPagination {
	total: number;
	currentPage: number;
	pageSize: number;
	totalPages: number;
}

export interface PaginationParams {
	page: number;
	limit: number;
	query: string;
	userId?: string;
}

export interface UserPaginationParams {
	page: number;
	limit: number;
}
