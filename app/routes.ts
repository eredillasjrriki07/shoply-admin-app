import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("auth/login", "routes/auth/login.tsx"),
    ...prefix("admin", [
        layout("components/layout/mainlayout.tsx", [
            index("routes/admin/_index.tsx"),
            route("products", "routes/admin/products/products.tsx"),
            route("products/add", "routes/admin/products/add-product.tsx"),
            route("products/:id", "routes/admin/products/product-details.tsx"),
            route("orders", "routes/admin/orders/orders.tsx"),
            route("orders/:id", "routes/admin/orders/order-details.tsx"),
            route("customers", "routes/admin/customers/customers.tsx"),
            route("customers/:id", "routes/admin/customers/customer-details.tsx"),
            route("promos", "routes/admin/promos/promos.tsx"),
            route("promos/:id", "routes/admin/promos/promo-details.tsx"),
        ])
    ])
] satisfies RouteConfig;
