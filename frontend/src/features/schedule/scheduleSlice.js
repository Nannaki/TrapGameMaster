import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scheduleService from "./scheduleService";


const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    months: [],
}

export const getActualsMonths = createAsyncThunk('schedule/actualsMonths', async (_, thunkAPI) => {
    try {
        return await scheduleService.getActualsMonths()
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const allDaysInMonth = createAsyncThunk('schedule/alldaysinmonth', async (dateData, thunkAPI) => {
    try {
        return await scheduleService.getAllDaysInMonth(dateData)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
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
            .addCase(getActualsMonths.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getActualsMonths.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.months = action.payload
            })
            .addCase(getActualsMonths.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    })
})

export const {reset} = scheduleSlice.actions;
export default scheduleSlice.reducer;
