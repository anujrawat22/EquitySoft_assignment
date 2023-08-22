import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        dispatch(logout())
        navigate('/login')
    }
  return (
    <Button variant="contained"  onClick={handleLogout}>LogOut</Button>
  )
}

export default LogoutButton