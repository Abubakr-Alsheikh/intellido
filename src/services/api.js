import axios from 'axios'; 

import store  from '../redux/store'; // Assuming you export the store
import { logout, setTokens } from '../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';

export const API_BASE_URL = 'http://localhost:8000/intellido/'; // Replace with your backend URL
// export const API_BASE_URL = 'https://abubakralsheikh.pythonanywhere.com/intellido/'; // Replace with your backend URL

// Function to get the access token from local storage
// const getAccessToken = () => localStorage.getItem('access_token');

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${getAccessToken()}`,
//   },
// });

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
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         if (error.response.data.code === 'token_not_valid') {
//           // Token is blacklisted, redirect to login 
//           store.dispatch(logout()); // Assuming you have a logout action
//           Navigate('/login'); 
//         }
//         // Refresh access token using refresh token
//         console.log(store.getState().auth.refreshToken);
//         const refreshResponse = await axios.post(`${API_BASE_URL}api/token/refresh/`, {
//           refresh: store.getState().auth.refreshToken,
//         });
//         // Update access token in the Redux store
//         store.dispatch({ type: 'auth/updateAccessToken', payload: refreshResponse.data.access });
//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
//         return axios(originalRequest);
//       } catch (error) {
//         console.error('Token refresh failed:', error);
//         // Handle refresh token failure (e.g., redirect to login)
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// {
//   "message": "Request failed with status code 400",
//   "name": "AxiosError",
//   "stack": "AxiosError: Request failed with status code 400\n    at settle (http://localhost:3000/intellido/static/js/bundle.js:86136:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/intellido/static/js/bundle.js:84802:66)\n    at Axios.request (http://localhost:3000/intellido/static/js/bundle.js:85289:41)\n    at async http://localhost:3000/intellido/static/js/bundle.js:2380:31\n    at async Axios.request (http://localhost:3000/intellido/static/js/bundle.js:85285:14)\n    at async http://localhost:3000/intellido/static/js/bundle.js:2113:22\n    at async http://localhost:3000/intellido/static/js/bundle.js:81997:27",
//   "config": {
//       "transitional": {
//           "silentJSONParsing": true,
//           "forcedJSONParsing": true,
//           "clarifyTimeoutError": false
//       },
//       "adapter": [
//           "xhr",
//           "http",
//           "fetch"
//       ],
//       "transformRequest": [
//           null
//       ],
//       "transformResponse": [
//           null
//       ],
//       "timeout": 0,
//       "xsrfCookieName": "XSRF-TOKEN",
//       "xsrfHeaderName": "X-XSRF-TOKEN",
//       "maxContentLength": -1,
//       "maxBodyLength": -1,
//       "env": {},
//       "headers": {
//           "Accept": "application/json, text/plain, */*",
//           "Content-Type": "application/json"
//       },
//       "method": "post",
//       "url": "http://localhost:8000/intellido/api/token/refresh/",
//       "data": "{\"refresh\":null}"
//   },
//   "code": "ERR_BAD_REQUEST",
//   "status": 400
// }

// Tasks API
export const fetchTasks = () => apiClient.get(`tasks/`); 
export const fetchTask = (taskId) => apiClient.get(`tasks/${taskId}/`); 
export const createTask = (taskData) => apiClient.post(`tasks/`, taskData);
export const deleteTask = (taskId) => apiClient.delete(`tasks/${taskId}/`);
export const updateTask = (taskData) => apiClient.put(`tasks/${taskData.id}/`, taskData);

// Chat API
export const sendMessage = (messageData) => apiClient.post('chat/', messageData);
export const getChatHistory = () => apiClient.get('chat/'); 
export const clearChat = () => apiClient.post('chat/clear/');