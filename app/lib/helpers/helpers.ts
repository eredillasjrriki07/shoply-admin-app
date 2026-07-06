import type { Order } from "~/routes/admin/orders/types";

export function generateSku(productName: string, size?: string, color?: string) {
    let sku = productName.split(' ').join('-');;
    if (size) sku += `-${size.toUpperCase()}`;
    if (color) sku += `-${color.toUpperCase()}`;
    return sku.toUpperCase();
}

export function getSalePercentage(price: number, oldPrice: number) {
    return oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
}

export function getStars(rating: number) {
    return ['★', '★', '★', '★', '★'].fill('☆', Math.trunc(rating)).join('');
}

export function getTotalSpent(orders: Order[]) {
    if (!orders.length) return 0;
    return orders.reduce((acc, curr) => acc + curr.total, 0);
}