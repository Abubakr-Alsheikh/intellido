import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice'; 
import chatSlice from './slices/chatSlice'; 

const store = configureStore({
  reducer: {
    tasks: tasksReducer, 
    chat: chatSlice,
  },
});

export default store;