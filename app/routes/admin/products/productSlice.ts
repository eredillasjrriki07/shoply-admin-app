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
        setProducts(state, action) {
            state.products = action.payload.products;
            state.count = action.payload.count;
        }
    }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;