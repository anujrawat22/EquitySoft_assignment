
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../features/postSlice'


const PostCard = ({ title, content, _id }) => {
    const dispatch = useDispatch()
    return (
        <div style={{ width: '350px', height: '400px', padding: '2%', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: "5%" }}>
            <h1>{title}</h1>
            <div style={{ height: '60%' }}>
                <p>{content}</p>
            </div>
            <div style={{ height: '20%', display: 'flex', alignItems: "center", columnGap: '15px' }}>
                <button className='button'>Edit</button>
                <button className='button' onClick={()=>dispatch(deletePost(_id))}>Delete</button>
            </div>
        </div>
    )
}

export default PostCard