import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import Logout from "./components/Logout";

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IntelliDo
          </Typography>
          <Link href="/intellido/#/signup" color="inherit" underline="none">
            Sign Up
          </Link>
          <Link href="/intellido/#/tasks" color="inherit" underline="none">
            Tasks
          </Link>
          <Link href="/intellido/#/ai-chat" color="inherit" underline="none">
            AI chat
          </Link>
          <Logout />
          {location.pathname !== "/login" && (
            <>
              <Link href="/intellido/#/login" color="inherit" underline="none">
                Login
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default App;
