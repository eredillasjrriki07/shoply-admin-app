import axios, { AxiosError } from 'axios';

let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(fn: () => void) {
    onUnauthorized = fn;
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        // Token missing/expired/invalid -> server says 401 -> log out.
        // Don't fire it for the login call itself (a bad password also 401s,
        // and the Login component handles that error locally).
        const isLoginCall = error.config?.url?.includes('/api/auth/login');

        if (error.response?.status === 401 && !isLoginCall) {
            onUnauthorized?.();
        }

        return Promise.reject(error);
    },
);