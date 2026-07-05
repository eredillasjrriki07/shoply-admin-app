export interface OrdersViewItem {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    status: string;
    date: Date;
    items: number;
    total: number;
};

export interface OrdersViewState {
    count: number;
    total: number;
    orders: OrdersViewItem[];
};

export interface OrdersViewFilter {
    page: number;
    fromDate?: string;
    toDate?: string;
};