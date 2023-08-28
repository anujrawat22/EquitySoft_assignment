import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllPosts, searchPosts } from '../features/postSlice';
import { Pagination, Stack, TextField, Typography } from '@mui/material';
import UserPostCard from '../Components/UserPostCard';




const Allposts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth);
  const [title, setTitle] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  const posts = useSelector(state => state.posts.posts)
  console.log(posts)

  const checktoken = () => {
    if (!token) {
      navigate("/login")
    }
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
    dispatch(searchPosts(title))
  }

  useEffect(() => {
    checktoken()
    if (token) {
      dispatch(fetchAllPosts(currentPage))
    }
  }, [dispatch])

  return (<>
    <div style={{ width: "80dvw", margin: 'auto', marginTop: '5dvh', height: 'auto', display: "flex", flexWrap: 'wrap', justifyContent: "center" }}>

      <TextField id="standard-basic" label="Search" variant="standard" onChange={handleChange} value={title} />
    </div>
    <div style={{ width: "80dvw", margin: 'auto', marginTop: '5dvh', height: 'auto', display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat auto", justifyContent: "space-around", rowGap: '30px' }}>

      {
        posts.length > 0 ? posts.map((el) => {
          return <UserPostCard key={el._id} {...el} />
        })
          :
          <Typography variant='h5'>No Posts to Show</Typography>
      }
    </div>
    <div style={{ margin: 'auto', display: 'flex', justifyContent: "center", padding: '5%' }} >
      <Stack spacing={2}>
        <Pagination count={10} color="primary" defaultPage={currentPage} onChange={(e, value) => {
          setCurrentPage(value)
          dispatch(fetchAllPosts(value))
        }
        } />
      </Stack>
    </div>
  </>
  )
}

export default Allposts