import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchAPI from '../../utilities/fetch'
import { loginValidator } from '../../utilities/loginValidators'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useContext, Context } from '../../context'

const Login = (props) => {
  const { setters } = useContext(Context)
  const navigate = useNavigate()

  const initialValues = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    setFormErrors(loginValidator(formValues))

    if (!Object.keys(loginValidator(formValues)).length) {
      const res = await fetchAPI('POST', null, 'admin/auth/login', formValues)
      if (res.error) setFormErrors({ input: res.error })
      else {
        setters.setToken(res.token)
        localStorage.setItem('token', res.token)
        navigate('/')
      }
    }
  }

  return (
    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
      <TextField
        fullWidth
        margin="normal"
        type="text"
        name="email"
        autoComplete="email"
        label="Email Address"
        value={formValues.email}
        onChange={handleChange}
        autoFocus
        error={'email' in formErrors}
        helperText={formErrors.email}
      />
      <TextField
        fullWidth
        margin="normal"
        type="password"
        name="password"
        label="Password"
        value={formValues.password}
        onChange={handleChange}
        error={'password' in formErrors}
        helperText={formErrors.password}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Typography variant="body2" sx={{ color: 'error.main' }}>{formErrors.input}</Typography>

      <Button
        type="submit"
        fullWidth
        name='login-button'
        variant="contained"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login
