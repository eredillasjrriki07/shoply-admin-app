import { createSlice } from "@reduxjs/toolkit";
import type { ProductsViewState } from "../types";

const initialState: ProductsViewState = {
    products: [],
    count: 0,
};

const productsViewSlice = createSlice({
    name: 'productsView',
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

export const { addProduct, setProducts } = productsViewSlice.actions;
export default productsViewSlice.reducer;