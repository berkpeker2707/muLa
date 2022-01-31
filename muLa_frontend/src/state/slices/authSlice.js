import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    
};

export const authSlice = createSlice({
name: "auth",
initialState:{
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: null,
    avatar:null
},
reducers: {
    loadUser, 
    loadUserAvatar,
    registerUser,
    confirmTokenAction,
    login,
    logout
}



})

// Action creators
export const { loadUser, 
    loadUserAvatar,
    registerUser,
    confirmTokenAction,
    login,
    logout } = authSlice.actions;

export default authSlice.reducer;
