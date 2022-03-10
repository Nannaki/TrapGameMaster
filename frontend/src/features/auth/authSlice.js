import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';


//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    users: [],
    userInfo: [],
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

}

//Get users
export const getUsers = createAsyncThunk('auth/show', async () => {
    try {
        return await authService.getUsers();
    }
    catch (error) {
        return error.response
    }
})

//Get user by Id
export const getUserById = createAsyncThunk('auth/getOne', async (userId, thunkAPI) =>{
    try {
        return await authService.getUserById(userId);
    }
    catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update user
export const updateUser = createAsyncThunk('/auth/updateuser', async (userData, thunkAPI) => {
    try {
        return await authService.updateUser(userData);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Delete user
export const deleteUser = createAsyncThunk('auth/delete', async (userId, thunkAPI) => {
    try {
        return await authService.deleteUser(userId);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

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

            //Builder updateUser
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
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

export const {reset} = authSlice.actions;
export default authSlice.reducer;