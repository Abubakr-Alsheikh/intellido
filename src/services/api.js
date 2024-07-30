import axios from 'axios'; 

// export const API_BASE_URL = 'http://localhost:8000/intellido/'; // Replace with your backend URL
export const API_BASE_URL = 'https://abubakralsheikh.pythonanywhere.com/intellido/'; // Replace with your backend URL

// Function to get the access token from local storage
const getAccessToken = () => localStorage.getItem('access_token');

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      const response = await axios.post('http://localhost:8000/intellido/api/token/refresh/', {
        refresh: refreshToken,
      });
      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } catch (error) {
      console.error('Refresh token error:', error);
      // Handle refresh token errors (e.g., redirect to login)
      // ... 
    }
  } else {
    // Handle case where there's no refresh token
    // ...
  }
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

// Interceptor for 401 unauthorized errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401) {
//       const newAccessToken = await refreshAccessToken();
//       if (newAccessToken) {
//         // Update the Authorization header with the new access token
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

//         // Retry the original request
//         return apiClient(error.config);
//       } else {
//         console.error('Error Refreshing token:', error);
//         // Handle refresh token errors
//         // ... 
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// Tasks API
export const fetchTasks = () => apiClient.get(`tasks/`); 
export const fetchTask = (taskId) => apiClient.get(`tasks/${taskId}/`); 
export const createTask = (taskData) => apiClient.post(`tasks/`, taskData);
export const deleteTask = (taskId) => apiClient.delete(`tasks/${taskId}/`);
export const updateTask = (taskData) => apiClient.put(`tasks/${taskData.id}/`, taskData);

// Chat API
export const getChatHistory = () => axios.get(`${API_BASE_URL}chat/`);
export const sendMessage = (messageData) => axios.post(`${API_BASE_URL}chat/`, messageData); 
export const clearChat = () => axios.put(`${API_BASE_URL}chat/`, { clear_chat: true });