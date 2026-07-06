import { createSlice } from "@reduxjs/toolkit";
import type { CustomerState } from "../types";

const initialState: CustomerState = {
    customer: null,
    loading: false,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSelectedCustomer(state, action) {
            state.customer = action.payload;
        },
    },
});

export const { setLoading, setSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;