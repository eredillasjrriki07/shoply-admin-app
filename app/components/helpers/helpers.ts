export function generateSku(productName: string, size?: string, color?: string) {
    let sku = productName.split(' ').join('-');;
    if (size) sku += `-${size.toUpperCase()}`;
    if (color) sku += `-${color.toUpperCase()}`;
    return sku.toUpperCase();
}