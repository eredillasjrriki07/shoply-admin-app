export interface ItemProps {
    name: string;
    price: number;
    qty: number;
};

export const ItemsTableHeaders = [
    { label: 'product', span: 'col-span-3' },
    { label: 'price', span: 'col-span-3' },
    { label: 'qty', span: 'col-span-3' },
    { label: 'subtotal', span: 'col-span-3' }
];