import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllPosts } from '../features/postSlice';
import PostCard from '../Components/PostCard';
import { Typography } from '@mui/material';
import UserPostCard from '../Components/UserPostCard';



const Allposts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth);

  const posts = useSelector(state => state.posts.posts)
  console.log(posts)

  const checktoken = () => {
    if (!token) {
      navigate("/login")
    }
  }

  useEffect(() => {
    checktoken()
    if (token) {
      dispatch(fetchAllPosts())
    }
  }, [dispatch])

  return (
    <div style={{ width: "80dvw", margin: 'auto', marginTop: '5dvh', height: 'auto', display: "flex", flexWrap: 'wrap', justifyContent: "space-around" }}>
      {
        posts.length > 0 ? posts.map((el) => {
          return <UserPostCard key={el._id} {...el} />
        })
          :
          <Typography variant='h5'>No Posts to Show</Typography>
      }
    </div>
  )
}

export default Allposts