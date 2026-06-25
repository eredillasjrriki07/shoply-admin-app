import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../types";

const initialState: ProductState = {
    selectedProduct: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedProduct(state, action) {
            state.selectedProduct = action.payload;
        }
    }
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;