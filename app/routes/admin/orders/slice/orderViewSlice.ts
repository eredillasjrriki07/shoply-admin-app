import { createSlice } from "@reduxjs/toolkit";
import type { OrdersViewState } from "../types";

const initialState: OrdersViewState = {
    orders: [],
    count: 0,
    total: 0,
};

const ordersViewSlice = createSlice({
    name: 'ordersView',
    initialState,
    reducers: {
        setOrders(state, action) {
            state.orders = action.payload.orders;
            state.count = action.payload.count;
            state.total = action.payload.total;
        },
    },
});

export const { setOrders } = ordersViewSlice.actions;
export default ordersViewSlice.reducer;