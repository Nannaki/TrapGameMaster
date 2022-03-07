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

//Delete Room
export const deleteRoom = createAsyncThunk('rooms/delete', async (roomId,thunkAPI) => {
    try {
        return await roomsService.deleteRoom(roomId)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

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
          .addCase(deleteRoom.pending, (state) => {
              state.isLoading = true
          })
          .addCase(deleteRoom.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.rooms = state.rooms.filter((rooms) => rooms._id !== action.payload.id)
          })
          .addCase(deleteRoom.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })
    })
})

export const {reset} = roomsSlice.actions;
export default roomsSlice.reducer;