import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchAPI from '../../utilities/fetch';
import { useContext, Context } from '../../context';
import { registerValidator } from '../../utilities/loginValidators';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Register = (props) => {
  const { setters } = useContext(Context);
  const navigate = useNavigate();

  const initialValues = { name: '', email: '', password: '', confirm: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setFormErrors(registerValidator(formValues));

    if (!Object.keys(registerValidator(formValues)).length) {
      const { confirm, ...filtered } = formValues;
      const res = await fetchAPI('POST', null, 'admin/auth/register', filtered)
      if (res.error) setFormErrors({ input: res.error });
      else {
        setters.setToken(res.token);
        localStorage.setItem('token', res.token);
        navigate('/');
      }
    }
  }

  return (
    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
      <TextField
        fullWidth
        margin="normal"
        type="text"
        name="name"
        autoComplete="name"
        label="Full Name"
        value={formValues.name}
        onChange={handleChange}
        autoFocus
        error={'name' in formErrors}
        helperText={formErrors.name}
      />
      <TextField
        fullWidth
        margin="normal"
        type="text"
        name="email"
        autoComplete="email"
        label="Email Address"
        value={formValues.email}
        onChange={handleChange}
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
      <TextField
        fullWidth
        margin="normal"
        type="password"
        name="confirm"
        label="Confirm Password"
        value={formValues.confirm}
        onChange={handleChange}
        error={formErrors.confirm}
        helperText={formErrors.confirm}
      />
      <Typography variant="body2" sx={{ color: 'error.main' }}>{formErrors.input}</Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Box>
  );
}

export default Register;
