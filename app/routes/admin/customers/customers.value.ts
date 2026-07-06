export interface CustomerEntryProps {
    id: string;
    name: string;
    email: string;
    dateJoined: string;
    orderCount: number;
    spent: number;
    border: string;
};

export const CustomersTableHeaders = [
    { label: 'name', span: 'col-span-4' },
    { label: 'email', span: 'col-span-4' },
    { label: 'joined', span: 'col-span-2' },
    { label: 'orders', span: 'col-span-1' },
    { label: 'spent', span: 'col-span-1' }
];