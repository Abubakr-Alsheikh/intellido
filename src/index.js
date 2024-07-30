// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import CssBaseline from '@mui/material/CssBaseline'; 

import App from './App';
import TaskList from './components/TaskList'; 
// import AddTaskForm from './components/AddTaskForm'; 
// import AIChat from './components/AIChat'; 
import store from './redux/store'; 
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
// ... other imports (store, etc.)

const theme = createTheme({
  // ... your Material UI theme customizations 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <ThemeProvider theme={theme}> 
        <CssBaseline /> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}> 
              <Route path="tasks" element={<TaskList />} /> 
              <Route path="signup" element={<SignupForm />} />
              <Route path="add-task" element={<AddTaskForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="edit-task/:taskId" element={<EditTaskForm />} /> 
              {/* <Route path="add-task" element={<AddTaskForm />} /> 
              <Route path="ai-chat" element={<AIChat />} />  */}
              {/* ... other routes */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);