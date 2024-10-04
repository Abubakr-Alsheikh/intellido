import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: -2, marginBottom: 4, textAlign: 'center' }}>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        href="https://abubakr-alsheikh.github.io/my-portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ 
          textTransform: 'none',
          fontWeight: 'normal', 
          '&:hover': { textDecoration: 'underline' },
          background: 'linear-gradient(90deg, #284181, #ff531d)',
          color: "white",
          borderRadius: "32px"
        }}
      >
        Built by Abubakr Alsheikh
      </Button>

    </Container>
  );
};

export default Footer;