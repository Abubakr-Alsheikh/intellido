import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice'; 
import chatSlice from './slices/chatSlice'; 
import authReducer from './slices/authSlice'; // Import authReducer

const store = configureStore({
  reducer: {
    tasks: tasksReducer, 
    chat: chatSlice,
    auth: authReducer, // Add auth reducer
  },
});

export default store;