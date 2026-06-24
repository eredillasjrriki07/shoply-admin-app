import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "./types";

const initialState: ProductState = {
    products: [],
    count: 0,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        setProducts(state, action) {
            state.products = action.payload.products;
            state.count = action.payload.count;
        }
    }
});

export const { addProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;