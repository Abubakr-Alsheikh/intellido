import axios from "axios";
import store from "../redux/store";
import { logout, setTokens } from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

export const API_BASE_URL = "http://localhost:8000/intellido/";
// export const API_BASE_URL = 'https://abubakralsheikh.pythonanywhere.com/intellido/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken; // Get token from Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}api/token/refresh/`,
          {
            refresh: store.getState().auth.refreshToken,
          }
        );

        store.dispatch(
          setTokens({
            accessToken: refreshResponse.data.access,
            // Assuming your backend sends back the refreshed refresh token
            refreshToken:
              refreshResponse.data.refresh ||
              store.getState().auth.refreshToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Handle refresh token failure, potentially by logging the user out:
        store.dispatch(logout());
        Navigate("/login");
        return;
      }
    }
    return Promise.reject(error);
  }
);

// Tasks API
export const fetchTasks = () => apiClient.get(`tasks/`);
export const fetchTask = (taskId) => apiClient.get(`tasks/${taskId}/`);
export const createTask = (taskData) => apiClient.post(`tasks/`, taskData);
export const deleteTask = (taskId) => apiClient.delete(`tasks/${taskId}/`);
export const updateTask = (taskData) => apiClient.put(`tasks/${taskData.id}/`, taskData);

// Chat API
export const sendMessage = (messageData) => apiClient.post("chat/", messageData);
export const getChatHistory = () => apiClient.get("chat/");
export const clearChat = () => apiClient.post("chat/clear/");
