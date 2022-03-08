import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomsService from './roomsService'


const initialState = {
    rooms: [],
    room: [],
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

//Get RoomById
export const getRoomById = createAsyncThunk('rooms/getOne', async (roomId, thunkAPI) => {
    try {
        return await roomsService.getRoomById(roomId);

    }
    catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Add Room
export const addRoom = createAsyncThunk('rooms/addroom', async (room, thunkAPI) => {
    try {
        return await roomsService.addRoom(room);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

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
            state.room = []
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
          .addCase(getRooms.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })
          .addCase(getRoomById.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.room = action.payload
          })
          .addCase(addRoom.pending, (state) => {
              state.isLoading = true
          })
          .addCase(addRoom.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.rooms = state.rooms.push(action.payload)
          })
          .addCase(addRoom.rejected, (state, action) =>{
              state.isLoading = false
              state.isError = true
              state.message = action.payload
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