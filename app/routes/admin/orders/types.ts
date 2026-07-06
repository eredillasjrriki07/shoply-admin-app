import type { BaseEntity } from "~/lib/common/base.entity";
import type { OrderEventType, OrderStatus, PaymentStatus } from "~/lib/types/types";

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

export interface OrderState {
    selectedOrder: OrderWithRelations | null;
    loading: boolean;
};

export interface Order extends BaseEntity {
    userId: string;
    orderNumber: string;
    status: OrderStatus;
    subtotal: number;
    shippingFee: number;
    tax: number;
    promoId?: string | null;
    total: number;
};

export interface OrderWithRelations extends Order {
    user: CustomerDetails;
    orderItems: OrderItem[];
    orderShippingAddress: OrderShippingAddress;
    orderPayment: OrderPayment;
    orderTimelineEvents: OrderTimelineEvents[];
};

interface CustomerDetails {
    createdAt: Date;
    email: string;
    firstName: string;
    lastName: string;
}

interface OrderItem extends BaseEntity {
    orderId: number;
    variantId: string;
    productName: string;
    variantLabel: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
};

interface OrderShippingAddress extends BaseEntity {
    orderId: number;
    recipientName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country: string;
};

interface OrderPayment extends BaseEntity {
    orderId: number;
    method: string;
    checkoutSessionId: string;
    status: PaymentStatus;
    providerRef?: string | null;
    amount?: number | null;
    amountRefunded?: number | null;
    paidAt?: Date | null;
};

interface OrderTimelineEvents extends BaseEntity {
    orderId: number;
    eventType: OrderEventType;
    note?: string | null;
    occurredAt: Date;
};