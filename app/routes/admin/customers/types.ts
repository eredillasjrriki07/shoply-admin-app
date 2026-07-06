import type { UserRole } from "~/lib/types/types";
import type { BaseEntity } from "~/lib/common/base.entity";
import type { Order } from "../orders/types";
import type { Review } from "../products/types";

export interface CustomersViewFilter {
    page: number;
    email?: string;
};

export interface CustomersViewState {
    customers: CustomerViewItem[];
    count: number;
};

interface CustomerViewItem {
    id: string;
    name: string;
    email: string;
    joined: Date;
    orders: number;
    spent: number;
};

interface Customer extends BaseEntity {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isActive: boolean;
    lastLoginAt: Date;
    orderCount: number;
    totalSpent: number;
};

interface CustomerWithRelation extends Customer {
    orders: Order[];
    reviews: Review[];
};

export interface CustomerState {
    customer: CustomerWithRelation | null;
    loading: boolean;
}