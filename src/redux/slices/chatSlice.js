import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api";

const initialState = {
  chatHistory: [{ current_chat: [] }],
  isLoading: false,
  error: null,
  isClearing: false,
};

export const getChatHistory = createAsyncThunk(
  "chat/getChatHistory",
  async () => {
    try {
      const response = await api.getChatHistory();
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || "Failed to fetch chat history."
      );
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/sendChatMessage",
  async (messageData, { dispatch }) => {
    try {
      const content = messageData.get("content");
      const file = messageData.get("file");
      const fileURL = file ? URL.createObjectURL(file) : null;

      dispatch(
        sendMessage({
          parts: content ? [content] : [],
          role: "user",
          file: file, // Keep File object here
          fileURL: fileURL, // Add a separate property for the file URL
          uploadProgress: 0,
        })
      );

      const response = await api.sendMessage(messageData, (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(updateMessageProgress(percentage));
      });

      dispatch(
        sendMessage({
          parts: Array.isArray(response.data.parts)
            ? response.data.parts
            : [response.data.parts],
          role: "model",
        })
      );
    } catch (error) {
      // If an error occurs, rollback the optimistic update
      throw new Error(
        error.response?.data?.detail || "Failed to send message."
      );
    }
  }
);

export const clearChatHistory = createAsyncThunk(
  "chat/clearChatHistory",
  async () => {
    try {
      await api.clearChat();
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || "Failed to clear chat history."
      );
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage(state, action) {
      if (state.chatHistory.length === 0) {
        // If empty, initialize it with an object containing current_chat:
        state.chatHistory.push({ current_chat: [action.payload] });
        state.chatHistory[0].current_chat.push(action.payload);
      } else {
        // If not empty, push to the existing current_chat:
        state.chatHistory[0].current_chat.push(action.payload);
      }
    },
    updateMessage(state, action) {
      const messageIndex = state.chatHistory.findIndex(
        (message) => message.id === action.payload.id
      );
      if (messageIndex !== -1) {
        state.chatHistory[messageIndex] = action.payload.updatedMessage;
      }
    },
    deleteMessage(state, action) {
      state.chatHistory = state.chatHistory.filter(
        (message) => message.id !== action.payload
      );
    },
    clearChatError(state) {
      state.error = null;
    },
    updateMessageProgress(state, action) {
      const lastMessage =
        state.chatHistory[0].current_chat[
          state.chatHistory[0].current_chat.length - 1
        ];
      if (lastMessage && lastMessage.role === "user") {
        lastMessage.uploadProgress = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Chat History
      .addCase(getChatHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatHistory = action.payload;
      })
      .addCase(getChatHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Send Chat Message
      .addCase(sendChatMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Clear Chat History
      .addCase(clearChatHistory.pending, (state) => {
        state.isClearing = true;
      })
      .addCase(clearChatHistory.fulfilled, (state) => {
        state.chatHistory = [];
        state.isClearing = false;
      });
  },
});

export const {
  sendMessage,
  updateMessage,
  deleteMessage,
  clearChatError,
  updateMessageProgress,
} = chatSlice.actions;
export default chatSlice.reducer;
