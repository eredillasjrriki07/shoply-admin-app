export interface CustomerEntryProps {
    customerId: string;
    name: string;
    email: string;
    dateJoined: string;
    orderCount: number;
    spent: number;
};

export const CustomersTableHeaders = [
    { label: 'customer id', span: 'col-span-2' },
    { label: 'name', span: 'col-span-3' },
    { label: 'email', span: 'col-span-3' },
    { label: 'joined', span: 'col-span-2' },
    { label: 'orders', span: 'col-span-1' },
    { label: 'spent', span: 'col-span-1' }
];