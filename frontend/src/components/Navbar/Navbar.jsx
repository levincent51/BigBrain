import * as React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Logout from '../Login/Logout'
import { Link } from '@mui/material'

const Navbar = (props) => {
  const { isLoggedIn } = props
  const navigate = useNavigate()
  function handleLoginClick () {
    navigate('/login')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, width: '100%', zIndex: 99, margin: '30px' }}>
        <AppBar position="fixed" style={{ top: 0, width: '100%' }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Link color='inherit' component='button' underline="none" onClick={() => navigate('/')}>
                Big Brain
              </Link>
            </Typography>
            {isLoggedIn
              ? <Logout/>
              : <Button color="inherit" onClick={handleLoginClick}>
                Login/Register
              </Button>}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: '100px' }}> {/* 64px is the height of the navbar */}
        <Outlet/>
      </Box>
    </>
  )
}

export default Navbar
