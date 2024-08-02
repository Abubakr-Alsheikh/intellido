import axios from 'axios'; 

// export const API_BASE_URL = 'http://localhost:8000/intellido/'; // Replace with your backend URL
export const API_BASE_URL = 'https://abubakralsheikh.pythonanywhere.com/intellido/'; // Replace with your backend URL

// Function to get the access token from local storage
const getAccessToken = () => localStorage.getItem('access_token');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

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