import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../types";

const initialState: ProductState = {
    selectedProduct: null,
    loading: true,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSelectedProduct(state, action) {
            state.selectedProduct = action.payload;
        },
        updateSelectedProduct(state, action) {
            state.selectedProduct = {
                ...state.selectedProduct,
                ...action.payload
            };
        }
    }
});

export const { setLoading, setSelectedProduct, updateSelectedProduct } = productSlice.actions;
export default productSlice.reducer;