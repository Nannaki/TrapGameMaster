//Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scheduleService from "./scheduleService";

//State initaux
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    months: [],
    days: [],
    usersAvailblity: [],
}

//Appel fonction pour obtenir le mois actuel dans le service "Schedule"
export const getActualsMonths = createAsyncThunk('schedule/actualsMonths', async (_, thunkAPI) => {
    try {
        return await scheduleService.getActualsMonths()
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour obtenir les jours du mois le service "Schedule"
export const getAllDaysInMonth = createAsyncThunk('schedule/alldaysinmonth', async (dateData, thunkAPI) => {
    try {
        return await scheduleService.getAllDaysInMonth(dateData)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour obtenir les disponibilités des utilisateurs le service "Schedule"
export const getUsersAvailblity = createAsyncThunk('schedule/getUserAvailblity', async (dateData, thunkAPI) => {
    try {
        return await scheduleService.getUsersAvailblity(dateData);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour enregistrer les disponibilités des utilisateurs le service "Schedule"
export const registerUserAvailblity = createAsyncThunk('schedule/registerUserAvailblity', async (availblityData, thunkAPI) =>{
    try {
        return await scheduleService.registerUserAvailblity(availblityData)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Creation du Slice
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
            state.days = []
            state.usersAvailblity = []
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
                state.months = action.payload
            })
            .addCase(getActualsMonths.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder getallDaysInMonth
            .addCase(getAllDaysInMonth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllDaysInMonth.fulfilled, (state, action) => {
                state.isLoading = false
                state.days = action.payload
            })
            .addCase(getAllDaysInMonth.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //getUsersAvailblity
            .addCase(getUsersAvailblity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsersAvailblity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.usersAvailblity = action.payload
            })
            .addCase(getUsersAvailblity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder redisterUserAvailblity
            .addCase(registerUserAvailblity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUserAvailblity.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(registerUserAvailblity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    })
})

//Exports
export const {reset} = scheduleSlice.actions;
export default scheduleSlice.reducer;
