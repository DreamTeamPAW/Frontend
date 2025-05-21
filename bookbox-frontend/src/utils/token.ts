import { AUTH_TOKEN_KEY } from "@/services/constants"

export const setToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const clearToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getIDfromToken = (): string => {
    const token = getToken();
    if (!token) {
        throw new Error("Token not found");
    }

    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);

    return payloadObj?.id;
}
