import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    isLoggedIn: localStorage.getItem('access_token') ? true : false, // Check for access token
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isLoggedIn = true;
      localStorage.setItem('access_token', action.payload.access);
      localStorage.setItem('refresh_token', action.payload.refresh);
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true; // Update isLoggedIn as well
      localStorage.setItem('access_token', action.payload.accessToken);
      localStorage.setItem('refresh_token', action.payload.refreshToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('access_token', action.payload); // Update local storage
    },
  },
});

export const { login, logout, updateAccessToken, setTokens } = authSlice.actions;

export default authSlice.reducer;