import React from 'react'
import { useNavigate } from 'react-router-dom'
import fetchAPI from '../../utilities/fetch'
import Button from '@mui/material/Button'

import { useContext, Context } from '../../context'

const Logout = (props) => {
  const { getters, setters } = useContext(Context)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const res = await fetchAPI('POST', getters.token, 'admin/auth/logout')
    console.log(res)
    localStorage.removeItem('token')
    setters.setToken(null)
    navigate('/')
  }

  return (
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
  )
}

export default Logout
