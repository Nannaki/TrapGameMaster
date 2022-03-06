import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomsService from './roomsService'


const initialState = {
    rooms: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Get Rooms
export const getRooms = createAsyncThunk('rooms/show', async () => {
    try {
        return await roomsService.getRooms();
    }
    catch (error) {
        return error.response;
    }
});

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.rooms = []
        }
    },
    extraReducers: (builder =>  {
      builder
          .addCase(getRooms.pending, (state) => {
              state.isLoading = true
        })
          .addCase(getRooms.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.rooms = action.payload
          })
    })
})

export const {reset} = roomsSlice.actions;
export default roomsSlice.reducer;