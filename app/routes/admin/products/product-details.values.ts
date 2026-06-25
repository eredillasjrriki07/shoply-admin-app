import type { Product } from "./types";

export interface ReviewItemProps {
    name: string;
    date: string;
    rating: number;
    review: string;
};

export interface ProductDetailsProps {
    product: Product | null;
    setIsViewing?: (value: boolean) => void;
}

export interface RatingBarProps {
    ratingCount: number;
    reviewTotal: number;
};