import React from 'react';
import { useNavigate } from 'react-router-dom';
import fetchAPI from '../utilities/fetch';
import Button from '@mui/material/Button';

const Logout = (props) => {
  const { token, setToken } = props;
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetchAPI('POST', token, 'admin/auth/logout')
    console.log(res);
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  }

  return (
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
  );
}

export default Logout;
