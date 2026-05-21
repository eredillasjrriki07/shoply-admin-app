export interface ProductTableItemProps {
    name: string;
    category: string;
    price: number;
    stock: number;
    rating: number;
};

export const ProductTableHeaders = [
    { label: 'name', span: 'col-span-4' },
    { label: 'category', span: 'col-span-2' },
    { label: 'price', span: 'col-span-2' },
    { label: 'stock', span: 'col-span-2' },
    { label: 'rating', span: 'col-span-2' },
];