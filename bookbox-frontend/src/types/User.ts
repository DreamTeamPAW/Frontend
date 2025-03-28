export interface User {
	id: number;
	username: string;
	email: string;
	role: UserRole;
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user'
}
