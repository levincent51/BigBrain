import React from 'react'
import { useNavigate } from 'react-router-dom'
import fetchAPI from '../../utilities/fetch'
import Button from '@mui/material/Button'

import { useContext, Context } from '../../context'

const Logout = (props) => {
  const { getters, setters } = useContext(Context)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await fetchAPI('POST', getters.token, 'admin/auth/logout')
    localStorage.removeItem('token')
    setters.setToken(null)
    navigate('/')
  }

  return (
      <Button name='logout' color="inherit" aria-label='logout' onClick={handleLogout}>Logout</Button>
  )
}

export default Logout
