import { createSlice } from "@reduxjs/toolkit";
import type { CustomersViewState } from "../types";

const initialState: CustomersViewState = {
    customers: [],
    count: 0,
};

const customersViewSlice = createSlice({
    name: 'customersView',
    initialState,
    reducers: {
        setCustomers(state, action) {
            state.customers = action.payload.users;
            state.count = action.payload.count;
        },
    },
});

export const { setCustomers } = customersViewSlice.actions;
export default customersViewSlice.reducer;