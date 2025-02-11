import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js";
import axiosInstance from "../../utilities/axios.js";

const initialState = {
    loading: false,
    likedVideos: [],
}

export const likeVideo = createAsyncThunk(
    "toggleVideoLike",
    asyncThunkHandler(async({videoId})=>{
        const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
        console.log(response.data);
        return response.data.data;
    })
)

export const likeComment = createAsyncThunk(
    "toggleCommentLike",
    asyncThunkHandler(async(commentId)=>{
        const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
        console.log("Liked");
        return response.data.data;
    })
)

export const likeTweet = createAsyncThunk(
    "toggleTweetLike",
    asyncThunkHandler(async(tweetId)=>{
        const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
        console.log("Liked");
        return response.data.data;
    })
)

export const getLikedVideos = createAsyncThunk(
    "getLikedVideos",
    asyncThunkHandler(async()=>{
        const response = await axiosInstance.get(`/likes/videos`);
        console.log(response.data.data);
        return response.data.data;
    })
)

const likeSlice = createSlice({
    initialState,
    name: "like",
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(getLikedVideos.fulfilled, (state, action) =>{
            state.loading = false;
            state.likedVideos = action.payload;
        })
    }
})

export default likeSlice.reducer;