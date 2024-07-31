import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Link } from '@mui/material'; 
import Logout from './components/Logout'; // Import the Logout component

const App = () => {
  
  const location = useLocation(); // Get the current location

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI To-Do App
          </Typography>
          
          <Link href="/intellido/#/signup" color="inherit" underline="none">
            Sign Up
          </Link>
          <Link href="/intellido/#/tasks" color="inherit" underline="none">
            Tasks
          </Link>
          {location.pathname !== '/login' && (
            <>
              <Link href="/intellido/#/tasks" color="inherit" underline="none">
                Tasks
              </Link>
              {/* ... other navigation links */}
            </>
          )}
          {/* ... other navigation links */}
          <Logout /> {/* Add the logout button */}
          {location.pathname !== '/login' && (
            <>
              <Link href="/intellido/#/login" color="inherit" underline="none">
                Login
              </Link>
              {/* ... other navigation links */}
            </>
          )} 
        </Toolbar>
      </AppBar>

      <Outlet /> {/* Renders the nested routes (TaskList, AddTaskForm, etc.) */}
    </div>
  );
};

export default App;