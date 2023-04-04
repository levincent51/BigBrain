import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const Copyright = (props) => {
  const navigate = useNavigate();

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" onClick={() => navigate('/')}>
        Big Brain
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoginPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const theme = createTheme();

  const isLoginPage = location.pathname === '/login';

  // if user already has a token, cannot reaccess login without logging out
  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/')
  }, [localStorage.getItem('token')])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            {isLoginPage ? 'Sign In' : 'Register'}
          </Typography>
          {isLoginPage ? <Login/> : <Register/>}
          <Grid container>
              <Grid item xs>
                <Link component="button" onClick={() => navigate('/')} variant="body2">
                  Back
                </Link>
              </Grid>
              <Grid item>
                <Link component="button" onClick={() => navigate(isLoginPage ? '/register' : '/login')} variant="body2">
                  {isLoginPage ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                </Link>
              </Grid>
          </Grid>
        </Box>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
};

export default LoginPage;
