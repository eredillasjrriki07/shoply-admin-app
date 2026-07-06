import { configureStore } from "@reduxjs/toolkit";
import productsViewReducer from "./routes/admin/products/slice/productsViewSlice";
import productReducer from "./routes/admin/products/slice/productSlice";
import ordersViewReducer from "./routes/admin/orders/slice/orderViewSlice";
import orderReducer from "./routes/admin/orders/slice/orderSlice";
import customersViewReducer from "./routes/admin/customers/slice/customersViewSlice";
import customerReducer from "./routes/admin/customers/slice/customerSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        productsView: productsViewReducer,
        product: productReducer,
        ordersView: ordersViewReducer,
        order: orderReducer,
        customersView: customersViewReducer,
        customer: customerReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;