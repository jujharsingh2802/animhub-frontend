import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/axios';
import asyncThunkHandler from '../storeUtils/asyncThunkHandler.js';

const initialState = {
    loading: false,
    history: [],
    profile: null,
};

export const userChannelProfile = createAsyncThunk(
    "getUserChannelProfile",
    asyncThunkHandler(async (username) => {
            const response = await axiosInstance.get(`/users/c/${username}`);
            return response.data.data;
    })
);

export const getWatchHistory = createAsyncThunk(
    "getWatchHistory",
    asyncThunkHandler(async () => {
            const response = await axiosInstance.get(`/users/history`);
            return response.data.data;
    })
);
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder.addCase(userChannelProfile.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(userChannelProfile.fulfilled, (state, action)=>{
            state.loading = false;
            state.profile = action.payload;
        })
        builder.addCase(getWatchHistory.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getWatchHistory.fulfilled, (state, action)=>{
            state.loading = false;
            state.history = action.payload;
        })
    }

});

export default userSlice.reducer;