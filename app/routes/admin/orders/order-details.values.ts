export interface ItemProps {
    itemId: string;
    name: string;
    price: number;
    qty: number;
    border: string;
};

export interface HistoricalEventProps {
    eventType: string;
    date: string;
    isCurrent: boolean;
};

export const ItemsTableHeaders = [
    { label: 'product', span: 'col-span-3' },
    { label: 'price', span: 'col-span-3' },
    { label: 'qty', span: 'col-span-3' },
    { label: 'subtotal', span: 'col-span-3' }
];