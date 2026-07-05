export interface OrderItemProps {
    orderId: string;
    customer: string;
    status: string;
    date: string;
    itemCount: number;
    total: number;
    border: string;
};

export type Tab = {
    id: string;
    label: string;
};

export const tabs: Tab[] = [
    { id: "All", label: "All" },
    { id: "To Ship", label: "To Ship" },
    { id: "To Receive", label: "To Receive" },
    { id: "Completed", label: "Completed" },
    { id: "Cancelled", label: "Cancelled" },
    { id: "Returned", label: "Returned" },
];

export const OrdersTableHeaders = [
    { label: 'order', span: 'col-span-2' },
    { label: 'customer', span: 'col-span-3' },
    { label: 'status', span: 'col-span-2' },
    { label: 'date', span: 'col-span-2' },
    { label: 'items', span: 'col-span-2' },
    { label: 'total', span: 'col-span-1' }
];