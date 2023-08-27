import { Typography } from '@mui/material';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../Components/PostCard';
import { fetchUserPosts } from '../features/postSlice';

const ManagePost = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth);

  const posts = useSelector(state => state.posts.posts)

  const fetchPosts = () => {
    dispatch(fetchUserPosts(token))
  }
  useEffect(() => {
    fetchPosts()
  }, [dispatch])



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