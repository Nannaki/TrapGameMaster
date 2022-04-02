//Imports
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import roomsReducer from './slices/rooms/roomsSlice';
import scheduleReducer from './slices/schedule/scheduleSlice'

//Creation du store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    schedule: scheduleReducer,
  },
});
