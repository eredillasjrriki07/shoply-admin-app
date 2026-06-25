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

export const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });