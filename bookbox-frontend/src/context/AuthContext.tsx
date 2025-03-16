import { createContext, useContext, useEffect, useState } from "react";
import { getUser, login, logout, register, User, Credentials } from "../services/authService";


interface AuthContextType {
    user: User | null;
    login: (credentials: Credentials) => Promise<void>;
    register: (credentials: Credentials) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser();
                setUser(user);
            } catch (error) {
                setError("Error fetching user");
                console.error("Error fetching user: ", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleLogin = async (credentials: Credentials) => {
        setError(null);
        setLoading(true);
        try {
            await login(credentials);
            const user = await getUser();
            setUser(user);
        } catch (error) {
            setError("Error logging in");
            console.error("Error logging in: ", error);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (credentials: Credentials) => {
        setError(null);
        setLoading(true);
        try {
            await register(credentials);
            const user = await getUser();
            setUser(user);
        } catch (error) {
            setError("Error registering");
            console.error("Error registering: ", error);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setError(null);
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            setError("Error logging out");
            console.error("Error logging out: ", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, register: handleRegister, logout: handleLogout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}