import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice'; 
// ... import other reducers (e.g., chatReducer) 

const store = configureStore({
  reducer: {
    tasks: tasksReducer, 
    // ... other reducers (e.g., chat: chatReducer)
  },
});

export default store;