//Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomsService from './roomsService'

//Déclarations des states initiaux
const initialState = {
    rooms: [],
    room: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Appel fonction pour charger les salles dans le service "room"
export const getRooms = createAsyncThunk('rooms/show', async () => {
    try {
        return await roomsService.getRooms();
    }
    catch (error) {
        return error.response;
    }
});

//Appel fonction pour charger une salle avec un ID dans le service "room"
export const getRoomById = createAsyncThunk('rooms/getOne', async (roomId, thunkAPI) => {
    try {
        return await roomsService.getRoomById(roomId);

    }
    catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour enregistrer une salle dans le service "room"
export const addRoom = createAsyncThunk('rooms/addroom', async (room, thunkAPI) => {
    try {
        return await roomsService.addRoom(room);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour modifier une salle dans le service "room"
export const updateRoom = createAsyncThunk('rooms/updateroom', async ( roomData, thunkAPI) =>{

    try {
        return await roomsService.updateRoom(roomData);

    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour effacer une salle dans le service "room"
export const deleteRoom = createAsyncThunk('rooms/delete', async (roomId,thunkAPI) => {
    try {
        return await roomsService.deleteRoom(roomId)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//Creation du Slice
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
          //Builder getRooms
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

          //Builder GetRoomById
          .addCase(getRoomById.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.room = action.payload
          })
          .addCase(getRoomById.rejected, (state, action) =>{
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })

          //Builder AddRoom
          .addCase(addRoom.pending, (state) => {
              state.isLoading = true
          })
          .addCase(addRoom.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
          })
          .addCase(addRoom.rejected, (state, action) =>{
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })

          //Builder UpdateRoom
          .addCase(updateRoom.pending, (state) =>{
              state.isloading = true
          })
          .addCase(updateRoom.fulfilled, (state, action) =>{
              state.isLoading = false
              state.isSuccess = true
          })
          .addCase(updateRoom.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })

          //Builde DeleteRoom
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

//Exports
export const {reset} = roomsSlice.actions;
export default roomsSlice.reducer;