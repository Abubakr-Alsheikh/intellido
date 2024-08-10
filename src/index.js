import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import store from './redux/store';
import { indigo, lightBlue } from '@mui/material/colors';

const getInitialTheme = () => {
  // Check if user has a preferred theme
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }

  // Use device theme if no preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } 

  // Default to light theme
  return 'light';
};

const AppWrapper = () => {
  const [mode, setMode] = useState(getInitialTheme());

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: indigo,
      secondary: lightBlue,
    },
    typography: {
      fontFamily: [
        'monospace',
        'Arial',
        'sans-serif',
        '"Segoe UI Symbol"',
        '"Segoe UI"',
        '"Segoe UI Emoji"',
      ].join(','),
    },
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>
);