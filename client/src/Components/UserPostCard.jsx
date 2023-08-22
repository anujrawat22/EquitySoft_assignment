import { Button, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPost } from '../features/postSlice';

const UserPostCard = ({ title, content, _id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
const viewpost = (id)=>{
console.log(id);
dispatch(selectPost(id))
navigate(`/viewpost/${id}`)
}

    return (
        <Card sx={{ minWidth: 300,maxWidth : 350, p: 2 }}  >
            <Stack
                spacing={2}>
                <Typography variant="h5">Title</Typography>
                <Typography >{title}</Typography>
                <Typography variant="h5">Content</Typography>
                <Typography >{content}</Typography>
                <Stack direction="row" spacing={4}>
                    <Button variant='outlined' onClick={()=>viewpost(_id)}>Show Post</Button>
                </Stack>
            </Stack>
        </Card>
    )
}

export default UserPostCard