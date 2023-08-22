import { Typography } from '@mui/material';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostCard from '../Components/PostCard';
import { fetchUserPosts } from '../features/postSlice';

const ManagePost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, role } = useSelector(state => state.auth);

  const posts = useSelector(state => state.posts.posts)

  const checktoken = () => {
    if (!token && role !== "author") {
      navigate("/login")
    }
  }



  useEffect(() => {
    checktoken()
    if (token) {
      dispatch(fetchUserPosts(token))
    }
  }, [dispatch, token])



  return (

    <div style={{ display: "flex", flexWrap: "wrap", margin: 'auto', marginTop: "5dvh", width: "80dvw", justifyContent: "space-around", height: "auto" }}>
      {
        posts.length > 0 ? posts.map((el) => {
          return <PostCard key={el._id} {...el} />
        })
          :
          <Typography variant='h5'>No Post added yet</Typography>
      }
    </div>

  )
}

export default ManagePost