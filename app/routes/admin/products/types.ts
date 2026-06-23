import type { PaginatedResponse } from "~/types/types";

export interface InventoryStats {
    products: number;
    totalUnits: number;
    lowStock: number;
    outOfStock: number;
};

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    oldPrice: number;
    imageUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    totalStock: number;
    rating: number;
};

export interface ProductListResponse extends PaginatedResponse {
    products: Product[],
}

export interface ProductState {
    products: Product[];
    count: number;
};

export interface ProductFilter {
    page?: number;
    name?: string;
    category?: string;
    status?: string;
};