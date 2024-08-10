import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api"; // Import your API functions

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await api.fetchTasks();
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch tasks.");
  }
});

// Async thunk for creating a task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    try {
      const response = await api.createTask(taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || "Failed to create task.");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await api.deleteTask(taskId);
      return taskId; // Return the ID of the deleted task
    } catch (error) {
      throw new Error(error.response?.data?.detail || "Failed to delete task.");
    }
  }
);

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData) => {
  try {
    const response = await api.updateTask(taskData); // Call your update API function
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to update task.');
  }
});

export const toggleTaskCompletion = (taskId) => (dispatch, getState) => { 
  // Get the current task from the state
  const task = getState().tasks.tasks.find((t) => t.id === taskId);

  if (task) {
    // Update the task on the backend 
    dispatch(updateTask({ ...task, is_completed: !task.is_completed })); 
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true; 
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Remove deleted task from state
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload;
        }
      });
  },
});

// export const { toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;
