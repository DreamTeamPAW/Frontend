import { UserPagination } from './Pagination';

export interface User {
	id: string;
	username: string;
	email: string;
	role: UserRole;
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user'
}

export interface UserAdminInfo {
	id: string;
	passwordHash: string;
	email: string;
}

export interface UserList {
	users: UserAdminInfo[];
	pagination: UserPagination;
}
