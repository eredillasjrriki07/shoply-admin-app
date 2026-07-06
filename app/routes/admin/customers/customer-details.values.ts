export interface CustomerOrdersTableItemProps {
    orderNumber: string;
    status: string;
    date: string;
    total: number;
    border: string;
};

export const CustomerOrdersTableHeaders = [
    { label: 'order', span: 'col-span-2' },
    { label: 'status', span: 'col-span-2' },
    { label: 'date', span: 'col-span-1' },
    { label: 'total', span: 'col-span-1' }
];