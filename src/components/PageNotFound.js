import React from 'react';
import { Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home/tasks');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <Typography variant="h2" gutterBottom>404 - Page Not Found</Typography>
      <Typography variant="body1" paragraph>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Link onClick={handleGoHome} sx={{ cursor: 'pointer' }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;