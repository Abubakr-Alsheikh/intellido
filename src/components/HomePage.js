import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header'; 

const HomePage = ({ toggleTheme }) => {
  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: 2 }}>
        <Header toggleTheme={toggleTheme} /> 
      </Container>
      <Outlet /> 
    </div>
  );
};

export default HomePage;