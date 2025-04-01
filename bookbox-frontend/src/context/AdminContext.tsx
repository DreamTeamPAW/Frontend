import React, { createContext, useContext, useEffect, useState } from "react";
import {
	getUsers as getUsersService,
	deleteUser as deleteUserService,
} from "../services/adminService";

import { UserList } from "../types/User";
import { PaginationParams } from "../types/Pagination";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../services/constants";

type AdminContextType = {
	users: UserList | null;
	currentParams: PaginationParams;
	error: string | null;
	loading: boolean;
	fetchUsers: (params: PaginationParams) => Promise<void>;
	deleteUser: (userID: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [users, setUsers] = useState<UserList | null>(null);
	const [currentParams, setCurrentParams] = useState<PaginationParams>({
		page: INITIAL_PAGE,
		limit: DEFAULT_LIMIT,
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers(currentParams);
	}, []);

	const fetchUsers = async (params: PaginationParams) => {
		try {
			setLoading(true);
			const userList = await getUsersService(params);
			setUsers(userList);
			console.log("Users fetched successfully");
			setCurrentParams(params);
		} catch (error) {
			setError("Error fetching users");
			console.error("Error fetching users: ", error);
		} finally {
			setLoading(false);
		}
	}

	const deleteUser = async (userID: string) => {
		try {
			await deleteUserService(userID);
			fetchUsers(currentParams);
		} catch (error) {
			setError("Error deleting user");
			console.error("Error deleting user: ", error);
		}
	}

	return (
		<AdminContext.Provider
			value={{
				users,
				currentParams,
				error,
				loading,
				fetchUsers,
				deleteUser,
			}}
		>
			{children}
		</AdminContext.Provider>
	);
}

export const useAdmin = () => {
	const context = useContext(AdminContext);
	if (!context) {
		throw new Error("useAdmin must be used within an AdminProvider");
	}
	return context;
}
