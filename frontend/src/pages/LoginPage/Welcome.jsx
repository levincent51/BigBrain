import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function Welcome () {
  const navigate = useNavigate();
  return (
    <>
      <Navbar isLoggedIn={false}></Navbar>
      <Container>
        <Box
          sx={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            maxWidth: '50vw',
            gap: '50px'
          }}
        >
          <Typography variant='h3'>Welcome to Big Brain</Typography>
          <Button onClick={() => navigate('/login')}>
              Click here to Login
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Welcome;
