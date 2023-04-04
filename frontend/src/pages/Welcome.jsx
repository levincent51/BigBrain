import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

function Welcome () {
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
        </Box>
      </Container>
    </>
  );
}

export default Welcome;
