import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Grid, Box, Divider } from '@mui/material';
import logo from "../images/logo.png"; // Assuming you have a logo image

const AuthPage = () => {
  return (
    <Container maxWidth="sm" sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundImage: 'url(your-background-image.jpg)', // Add a subtle background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 10,
          textAlign: 'center'
        }}
      >
        <img 
          src={logo} 
          alt="IntelliDo Logo" 
          style={{ width: 100, height: 100, marginBottom: 2 }} // Larger logo
        />
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3}} color="secondary">
          IntelliDo
        </Typography>
        <Divider />
        
        <Typography variant="body1" align="center" paragraph sx={{ mb: 3, mt: 3 }}>
          {/* Your more compelling project description here */}
          Revolutionize your task management with the power of AI. 
          IntelliDo helps you break down complex tasks, stay organized, 
          and achieve your goals faster.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button component={Link} to="/login" variant="contained" color="primary" fullWidth sx={{ height: '48px' }}>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button component={Link} to="/signup" variant="outlined" color="primary" fullWidth sx={{ height: '48px' }}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AuthPage;