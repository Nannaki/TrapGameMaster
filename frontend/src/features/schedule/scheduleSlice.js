import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scheduleService from "./scheduleService";
import {getRooms, roomsSlice} from "../rooms/roomsSlice";

const initialState = {
    months: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getActualsMonths = createAsyncThunk('schedule/actualsMonths', async () => {
    try {
        return await scheduleService.getActualsRooms()
    }
    catch (error) {
        return error.response;
    }
})

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.months = []
        }
    },
    extraReducers: (builder => {
        builder
            //Builder getActualsMonths
            .addCase(getRooms.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.months = action.payload
            })
            .addCase(getRooms.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    })
})

export const {reset} = scheduleSlice.actions;
export default scheduleSlice.reducer;
