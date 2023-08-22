
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.role = action.payload.role;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = action.payload;
            state.role = null;
        },
        logout: state => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.role = null;
        },

    },
});



export const  selectToken  = (state) => state.auth.token

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
