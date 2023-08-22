import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from './authSlice';



const apiurl = `http://localhost:8080/api`

const initialState = {
    posts: [],
    selectedPost: null,
    status: 'idle',
    error: null
}




export const fetchAllPosts = createAsyncThunk("/posts/getPosts", async () => {
    const response = await axios.get(`${apiurl}/posts/getPosts`)
    console.log(response.data.data)
    return response.data.data
})

export const fetchUserPosts = createAsyncThunk('posts/userPost', async (token) => {
    
    const response = await axios.get(`${apiurl}/posts/userPost`, {
        headers: { Authorization: `bearer ${token}` }
    });
    return response.data.data;
});

export const createNewPost = createAsyncThunk(`posts/create`, async (post, { getState }) => {
    const token = selectToken(getState());
    console.log(post, token)
    const response = await axios.post(`${apiurl}/posts/create`, post, { headers: { Authorization: `bearer ${token}` } });
    console.log(response.data.data)
    return response.data.data;
});

export const deletePost = createAsyncThunk("posts/delete", async (id, { getState }) => {
    const token = selectToken(getState());
    console.log(token)
    try {
        await axios.delete(`${apiurl}/posts/delete/${id}`, {
            headers: { Authorization: `bearer ${token}` }
        })
        return id
    } catch (error) {
        throw error.response.data.msg;
    }
})

export const fetchPostDetails = createAsyncThunk('posts/fetchPostDetails', async (id) => {
    const response = await axios.get(`${apiurl}/posts/post/${id}`);
    return response.data.data;
});


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        selectPost: (state, action) => {
            state.selectedPost = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllPosts.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUserPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload);
            })
            .addCase(fetchPostDetails.fulfilled, (state, action) => {
                state.selectedPost = action.payload;
            });

    },
})

export const { selectPost } = postSlice.actions

export default postSlice.reducer;