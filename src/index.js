import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import TaskList from "./components/TaskList";
import store from "./redux/store";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import PageNotFound from "./components/PageNotFound";
// import AIChat from './components/AIChat';

const theme = createTheme({
  // ... your Material UI theme customizations
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter future={{ v7_startTransition: true }}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="tasks" element={<TaskList />} />
              <Route path="signup" element={<SignupForm />} />
              <Route path="add-task" element={<AddTaskForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="edit-task/:taskId" element={<EditTaskForm />} />
              {/* <Route path="ai-chat" element={<AIChat />} />  */}
              {/* Catch-all route for any unmatched URL */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
