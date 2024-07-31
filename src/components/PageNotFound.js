import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const PageNotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h3">404 - Page Not Found</Typography>
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
      <Button component={Link} to="login" variant="contained" color="primary">
        Go to Login
      </Button>
    </div>
  );
};

export default PageNotFound;