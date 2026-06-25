import type { BaseEntity } from "~/lib/common/base.entity";
import type { PaginatedResponse } from "~/lib/types/types";
import type { User } from "~/routes/auth/types";

interface ProductEntityBase {
    name: string;
    imageUrl: string;
    category: string;
    price: number;
    oldPrice: number;
    isActive: boolean;
}
export interface InventoryStats {
    products: number;
    totalUnits: number;
    lowStock: number;
    outOfStock: number;
};
export interface ProductsViewItem extends ProductEntityBase {
    productId: string;
    totalStock: number;
    rating: number;
}

export interface Product extends BaseEntity, ProductEntityBase {
    description: string;
    sizes: ProductSize[];
    colors: ProductColor[];
    productVariants: ProductVariant[];
};

interface ProductVariantEntityBase extends BaseEntity {
    productId?: string;

};
interface ProductSize extends ProductVariantEntityBase {
    value: string;
};
interface ProductColor extends ProductVariantEntityBase {
    value: string;
};

export interface ProductVariant extends ProductVariantEntityBase {
    sku: string;
    size?: string;
    color?: string;
    priceOverride?: number | null;
    stocks: number;
};
export interface CreateProduct {
    name: string;
    category: string;
    price: number;
    oldPrice: number;
    imageUrl: string;
    description: string;
    isActive?: boolean;
    sizes?: ProductSize[];
    colors?: ProductColor[];
    variants?: ProductVariant[];
};

export interface UpdateProduct extends Partial<CreateProduct> { }

export interface ProductListResponse extends PaginatedResponse {
    products: Product[],
}

export interface ProductState {
    selectedProduct: Product | null;
    loading: boolean;
};

export interface ProductsViewState {
    products: ProductsViewItem[];
    count: number;
};

export interface ProductFilter {
    page?: number;
    name?: string;
    category?: string;
    status?: string;
};

export interface Review extends BaseEntity {
    userId: string;
    productId: string;
    orderItemId: string;
    rating: number;
    comment: string;
    user: User;
}

export interface ReviewList extends PaginatedResponse {
    reviews: Review[];
}

export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
    positivePercent: number;
    negativePercent: number;
}

export interface ReviewSummary {
    summary: ReviewStats;
    latestReview: Review;
}