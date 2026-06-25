import { configureStore } from "@reduxjs/toolkit";
import productsViewReducer from "./routes/admin/products/slice/productsViewSlice";
import productReducer from "./routes/admin/products/slice/productSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        productsView: productsViewReducer,
        product: productReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;