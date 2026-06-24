import type { PaginatedResponse } from "~/types/types";

export interface InventoryStats {
    products: number;
    totalUnits: number;
    lowStock: number;
    outOfStock: number;
};
export interface Product {
    productId: string;
    name: string;
    imageUrl: string;
    category: string;
    price: number;
    oldPrice: number;
    isActive: boolean;
    totalStock: number;
    rating: number;
};

interface ProductSize {
    value: string;
};
interface ProductColor {
    value: string;
};

export interface ProductVariant {
    sku: string;
    size?: string;
    color?: string;
    stocks: number;
};
export interface CreateProduct {
    name: string;
    category: string;
    price: number;
    oldPrice: number;
    imageUrl: string;
    description: string;
    isActive: boolean;
    sizes?: ProductSize[];
    colors?: ProductColor[];
    variants?: ProductVariant[];
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