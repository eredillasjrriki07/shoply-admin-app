import type { OrderStatus } from "~/lib/types/types";

export interface Dashboard {
    products: number;
    orders: number;
    customers: number;
    revenue: Revenue;
    statusCounts: StatusCount[];
    topProducts: TopProduct[];
    recentOrders: RecentOrder[];
    lowStockProducts: LowStockProduct[];
};

interface Revenue {
    revenue: number;
    revenueDataPoints: RevenueDataPoint[];
};

export interface RevenueDataPoint {
    date: string;
    revenue: number;
};

export interface StatusCount {
    status: OrderStatus;
    count: number;
};

export interface TopProduct {
    name: string;
    sold: number;
};

interface RecentOrder {
    id: number;
    orderNumber: string;
    customerName: string;
    status: OrderStatus;
    date: Date;
    total: number;
};

interface LowStockProduct {
    productId: string;
    name: string;
    category: string;
    totalStock: number;
    status: string;
};