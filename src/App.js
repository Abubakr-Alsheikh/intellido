import React from "react";
import {
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import SignupForm from "./components/Auth/SignupForm";
import LoginForm from "./components/Auth/LoginForm";
import TaskList from "./components/Tasks/TaskList";
import AIChat from "./components/AIChat/AIChat";
import PageTransition from "./components/PageTransition";

const App = ({toggleTheme}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <HashRouter>
      <PageTransition>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthPage />} /> {/* Landing page */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Protected Routes - Only accessible when logged in */}
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage toggleTheme={toggleTheme} /> : <Navigate to="/login" />}
        >
          <Route path="tasks" element={<TaskList />} />
          <Route path="ai-chat" element={<AIChat />} />
        </Route>
      </Routes>
      
      </PageTransition>
    </HashRouter>
  );
};

export default App;
