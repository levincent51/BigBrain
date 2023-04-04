import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logout from './Logout';
import { Link } from '@mui/material';

const Navbar = (props) => {
  const { isLoggedin } = props;
  const navigate = useNavigate();
  function handleLoginClick () {
    navigate('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link color='inherit' component='button' underline="none" onClick={() => navigate('/')}>
              Big Brain
            </Link>
          </Typography>
          {isLoggedin
            ? <Logout/>
            : <Button color="inherit" onClick={handleLoginClick}>
              Login/Register
            </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
