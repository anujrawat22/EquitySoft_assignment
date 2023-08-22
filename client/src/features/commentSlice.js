import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const selectToken = (state) => state.auth.token

const initialState = {
    comments: [],

}
const apiurl = `https://blog-app-2gw0.onrender.com/api`

export const fetchCommentForPost = createAsyncThunk("/comments/all",
    async (postId) => {
        const response = await axios.get(`${apiurl}/comments/all/${postId}`)
        return response.data.data
    }
)

export const addComment = createAsyncThunk(
    'comments/addComment',
    async (data, { getState }) => {
        const token = selectToken(getState())
        console.log(token)
        const response = await axios.post(`${apiurl}/comments/create`, data, {
            headers: { Authorization: `bearer ${token}` }
        });
        return response.data.data;
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (commentId) => {
        await axios.delete(`https://blog-app-2gw0.onrender.com/api/comments/delete/${commentId}`);
        return commentId;
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentForPost.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter((comment) => comment._id !== action.payload);
            });
    }
})


export default commentSlice.reducer