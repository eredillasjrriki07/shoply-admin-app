import type { User } from "~/routes/auth/types";

export interface PaginatedResponse {
    page: number;
    count: number;
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
