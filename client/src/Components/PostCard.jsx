import { Button, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../features/postSlice'


const PostCard = ({ title, content, _id }) => {
    const dispatch = useDispatch()
    return (
        <Card sx={{ maxWidth: 350, p: 2 }}  >
            <Stack spacing={2}>
                <Typography variant="h5">Title</Typography>
                <Typography >{title}</Typography>
                <Typography variant="h5">Content</Typography>
                <Typography >{content}</Typography>
                <Stack direction="row" spacing={4}>
                    <Button variant='outlined' onClick={() => {
                        dispatch(deletePost(_id))
                    }}>Delete</Button>
                    <Button variant='outlined'>Edit</Button>
                </Stack>
            </Stack>
        </Card>
    )
}

export default PostCard