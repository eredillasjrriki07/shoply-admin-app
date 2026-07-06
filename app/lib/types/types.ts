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

export enum OrderStatus {
    PLACED = 'Placed',
    TO_SHIP = 'To Ship',
    CANCELLED = 'Cancelled',
    TO_RECEIVE = 'To Receive',
    COMPLETED = 'Completed',
    RETURN_OR_REFUND = 'Return/Refund'
}

export enum PaymentStatus {
    PENDING = 'Pending',
    AUTHORIZED = 'Authorized',
    PAID = 'Paid',
    FAILED = 'Failed',
    REFUND_PENDING = 'Refund pending',
    REFUNDED = 'Refunded'
}

export enum OrderEventType {
    PLACED = 'Placed',
    TO_SHIP = 'To ship',
    CANCELLED = 'Cancelled',
    SHIPPED = 'Shipped',
    DELIVERED = 'Delivered',
    RETURN_REFUND = 'Return/Refund',
};

