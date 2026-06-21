export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
};

export type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};

export type AuthContextValue = {
    user: User | null;
    loading: boolean; // true only during the initial session check
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};