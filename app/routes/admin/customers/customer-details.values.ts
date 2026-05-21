export interface CustomerOrdersTableItemProps { 
    order: string;
    status: string;
    date: string;
    itemCount: number;
    total: number;
};

export const CustomerOrdersTableHeaders = [
    { label: 'order', span: 'col-span-2' },
    { label: 'status', span: 'col-span-1' },
    { label: 'date', span: 'col-span-1' },
    { label: 'items', span: 'col-span-1' },
    { label: 'total', span: 'col-span-1' }
];