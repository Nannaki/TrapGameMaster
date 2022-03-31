import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socketSlice",
    initialState: {
        loading: null,
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.loading = action.payload
        },
    },
});

export const { toggleLoading } = socketSlice.actions;

export default socketSlice.reducer;