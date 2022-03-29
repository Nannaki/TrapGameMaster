import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roomsReducer from '../features/rooms/roomsSlice';
import scheduleReducer from '../features/schedule/scheduleSlice'
import socketSlice from "../features/socket/socketSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    schedule: scheduleReducer,
    socketSlice: socketSlice
  },
});
