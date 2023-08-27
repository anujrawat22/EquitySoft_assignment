
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const apiurl = process.env.REACT_APP_API_URL

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    role: null,
};

export const loginUser = createAsyncThunk("/users/login", async ({ data, extra: navigateCallback }) => {
    try {
        const response = await axios.post(`${apiurl}/users/login`, {
            ...data
        })

        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have been Logged in!',
            showConfirmButton: false,
            timer: 1000
        });
        navigateCallback(response.data)
        return response.data

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.response.data.err,
            showConfirmButton: false,
            timer: 1000
        });
        throw error.response.data.err;
    }
})

export const signupUser = createAsyncThunk("/users/signup", async (
    { data, extra: navigateCallback }
) => {
    try {
        const response = await axios.post(`${apiurl}/users/signup`, {
            ...data
        })

        Swal.fire({
            icon: 'success',
            title: 'Signup Successful',
            text: 'You have been Singed up!',
            showConfirmButton: false,
            timer: 1000
        });
        navigateCallback()
        return response.data
    } catch (error) {
       
        Swal.fire({
            icon: 'error',
            text: error.response.data.err,
            showConfirmButton: false,
            timer: 1000
        });
        throw error.response.data.err; 
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.role = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user = action.payload.user
                state.isAuthenticated = true
                state.role = action.payload.role
                state.loading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
});



export const selectToken = (state) => state.auth.token

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
