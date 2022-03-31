//Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';

//Récupère l'utilisateur depuis le localstorage
const user = JSON.parse(localStorage.getItem('user'));

//Déclarations des states initiaux
const initialState = {
    users: [],
    rooms: [],
    userInfo: [],
    unmasterized: [],
    chatMessages: [],
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

}

//Appel fonction pour charger les utilisateurs dans le service "auth"
export const getUsers = createAsyncThunk('auth/show', async () => {
    try {
        return await authService.getUsers();
    }
    catch (error) {
        return error.response
    }
})

//Appel fonction pour charger un utilisateur depuis son ID dans le service "auth"
export const getUserById = createAsyncThunk('auth/getOne', async (userId, thunkAPI) =>{
    try {
        return await authService.getUserById(userId);
    }
    catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour charger les salles non masterisées d'un utilisateur dans le service "auth"
export const getUnmasterizedRoomsFromUser = createAsyncThunk('auth//getunmasterizedroomsfromuser', async (userId, thunkAPI) => {
    try {
        return await authService.getUnmasterizedRoomFromUser(userId);
    }
    catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour modifier un utilisateur dans le service "auth"
export const updateUser = createAsyncThunk('auth/updateuser', async (userData, thunkAPI) => {
    try {
        return await authService.updateUser(userData);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour ajouter une salle à un utilisateur dans le service "auth"
export const addRoomToUser = createAsyncThunk('auth/addroomtouser', async (userData, thunkAPI) => {
    try {
        return await authService.addRoomToUser(userData);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour supprimer une salle d'un utilisateur dans le service "auth"
export const deleteRoomOfUser = createAsyncThunk('auth/deleteuserroom', async (userData, thunkAPI) => {
    try {
        return await authService.deleteRoomOfUser(userData);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour supprimer un utilisateur dans le service "auth"
export const deleteUser = createAsyncThunk('auth/delete', async (userId, thunkAPI) => {
    try {
        return await authService.deleteUser(userId);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour charger les messages (Socket.io) d'un utilisateur dans le service "auth"
export const getMessages = createAsyncThunk('auth/messages', async (userId, thunkAPI) =>{
    try {
        return await authService.getMessages(userId);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Appel fonction pour connecter un utilisateur dans le service "auth"
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Appel fonction pour enregistrer un utilisateur dans le service "auth"
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Appel fonction pour déconnecter un utilisateur dans le service "auth"
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

//Creation du Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.users = []
            state.userInfo = []
            state.rooms = []
            state.unmasterized = []
        }
    },
    extraReducers: (builder) => {
        builder
            //Builder getUsers
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder getUserById
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false
                state.userInfo = action.payload
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder getUnmasterizedRoomFromUser
            .addCase(getUnmasterizedRoomsFromUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUnmasterizedRoomsFromUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.unmasterized = action.payload
            })
            .addCase(getUnmasterizedRoomsFromUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder updateUser
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder addRoomToUser
            .addCase(addRoomToUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addRoomToUser.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(addRoomToUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder deleteRoomOfUser
            .addCase(deleteRoomOfUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRoomOfUser.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.rooms = state.rooms.filter((rooms) => rooms.name !== action.payload.name);
            })
            .addCase(deleteRoomOfUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.unmasterized = []
                state.message = action.payload
            })

            //Builder deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = state.users.filter((users) => users._id !== action.payload.id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder register
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(register.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Builder getMessage
            .addCase(getMessages.fulfilled, (state, action) => {
                state.chatMessages = action.payload
            })

            //Builder Login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            //Builder logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    },
})

//Exports
export const {reset} = authSlice.actions;
export default authSlice.reducer;