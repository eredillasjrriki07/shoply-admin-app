export interface PromoCodesUsageTableProps {
    order: string;
    status: string;
    customer: string;
    date: string;
    discount: number;
    total: number;
};

export const PromoCodeUsageTableHeaders = [
    { label: 'order', span: 'col-span-2' },
    { label: 'status', span: 'col-span-2' },
    { label: 'customer', span: 'col-span-3' },
    { label: 'date', span: 'col-span-2' },
    { label: 'discount', span: 'col-span-2' },
    { label: 'total', span: 'col-span-1' }
];