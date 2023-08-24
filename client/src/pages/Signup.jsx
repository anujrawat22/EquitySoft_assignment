import React, { useState } from 'react'
import { Button, Container, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const apiurl = process.env.REACT_APP_API_URL

const Signup = () => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [role, setRole] = useState('reader')
  const signupform = (data) => {
    axios.post(`${apiurl}/users/signup`, {
      ...data,role
    }).then(res => {
      MySwal.fire(
        'Singup Successfull',
        '',
        'success'
      )
      navigate("/login")
    }
    )
      .catch(err => console.log(err.response.data.msg))
  }

  const handleChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <div style={{ margin: "auto", width: "30dvw", height: "auto", marginTop: "10dvh", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "7rem 0", borderRadius: "5%" }} >
      <Typography variant="h4" textAlign={"center"}>
        Signup
      </Typography>;
      <Container maxWidth="xs" >
        <form onSubmit={handleSubmit((data) => {
          signupform(data)
        })}>
          <Stack spacing={3}>
            <TextField id="outlined-basic" label="Username" variant="outlined" size="small" {...register('username', { required: true })} />
            <TextField id="outlined-basic" label="Email" variant="outlined" size="small" {...register('email', { required: true })} />
            <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type='password' {...register('password', {
              required: true, minLength: {
                value: 8,
                message: "Password must have 8 characters"
              }
            })} />
            <Typography variant='caption' color={"red"}>{errors.password?.message}</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={'reader'}>Reader</MenuItem>
              <MenuItem value={'author'}>Author</MenuItem>

            </Select>
            <Button variant='outlined' type='submit'>Signup</Button>
            <Typography variant='subtitle2' textAlign={"center"}>Already a user ? <Link to={'/login'}>Login</Link></Typography>
          </Stack>
        </form>
      </Container>
    </div>
  )
}

export default Signup