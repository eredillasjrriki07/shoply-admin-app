import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { api, setUnauthorizedHandler } from './api';
import type { ApiResponse, AuthContextValue } from '~/lib/types/types';
import type { User } from '~/routes/auth/types';

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Re-hydrate the session on load. The httpOnly cookie is sent automatically;
    //    valid -> we get the user back, missing/expired -> 401 -> logged out.
    useEffect(() => {
        api
            .get<ApiResponse<User>>('/users/me')
            .then((res) => setUser(res.data.data)) // res.data = envelope, .data = the user
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    // 2. Hand the logout function to the axios interceptor so a 401 can clear state.
    useEffect(() => {
        setUnauthorizedHandler(() => setUser(null));
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        // Backend sets the httpOnly cookie; the body carries the user inside the envelope.
        // const { data } = await api.post<ApiResponse<User>>('/auth/login', { email, password });
        // setUser(data.data);
        // If your /auth/login does NOT return the user, do this instead:
        await api.post('/auth/login', { email, password });
        const { data } = await api.get<ApiResponse<User>>('/users/me');
        setUser(data.data);
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post('/auth/logout'); // backend clears the cookie
        } finally {
            setUser(null); // clear client state even if the network call fails
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
