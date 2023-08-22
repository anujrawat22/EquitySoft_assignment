import React from 'react'

import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Post from '../pages/Post';
import Allposts from '../pages/Allposts';
import AddPost from '../pages/AddPost';
import ManagePost from '../pages/ManagePost';
import Home from '../pages/Home';




const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/viewpost/:postId" element={<Post />} />
            <Route path="/allposts" element={<Allposts />} />
            <Route path='/addpost' element={<AddPost />} />
            <Route path='/manage' element={<ManagePost />} />
        </Routes>
    )
}

export default AllRoutes