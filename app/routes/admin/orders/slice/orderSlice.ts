import { createSlice } from "@reduxjs/toolkit";
import type { OrderState } from "../types";

const initialState: OrderState = {
    selectedOrder: null,
    loading: true,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSelectedOrder(state, action) {
            state.selectedOrder = action.payload;
        },
    }
});

export const { setLoading, setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;