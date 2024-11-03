import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js"
import { BASE_URL } from "../../constant.js"
import axiosInstance from "../../utilities/axios.js"
import toast from "react-hot-toast"

initialState = {
    loading: false,
    tweets: [],
    totalTweets: 0,
    hasNextPage: false,
}

export const getUserTweets = createAsyncThunk(
    "getAllUserTweets",
    asyncThunkHandler(async({userId, page, limit})=>{
        
        const url = new URL(`${BASE_URL}/tweets/user/${userId}`);
        if(page) url.searchParams.set("page", page);
        if(limit) url.searchParams.set("limit", limit);

        const response = await axiosInstance.get(url);
        return response.data.data;
    })
)

export const createTweet = createAsyncThunk(
    "createTweet",
    asyncThunkHandler(async({content})=>{
        const response = await axiosInstance.post(`/tweets`,{content});
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const updateTweet = createAsyncThunk(
    "updateTweet",
    asyncThunkHandler(async({tweetId, content})=>{
        const response = await axiosInstance.patch(`/tweets/${tweetId}`,{content});
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const deleteTweet = createAsyncThunk(
    "deleteTweet",
    asyncThunkHandler(async(tweetId)=>{
        const response = await axiosInstance.delete(`/tweets/${tweetId}`);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

const tweetSlice = createSlice({
    initialState,
    name: "tweet",
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getUserTweets.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getUserTweets.fulfilled, (state, action)=>{
            state.loading = false;
            state.tweets = action.payload.tweets;
            state.totalTweets = action.payload?.totalTweets;
            state.hasNextPage = action.payload?.hasNextPage;
        })

        builder.addCase(createTweet.fulfilled,(state, action)=>{
            state.tweets.unshift(action.payload);
        })

        builder.addCase(updateTweet.fulfilled,(state, action)=>{
            const index = state.tweets.findIndex((tweet)=>tweet._id === action.payload._id);
            state.tweets[index] = action.payload;
        })

        builder.addCase(deleteTweet.fulfilled, (state, action)=>{
            state.tweets = state.tweets.filter((tweet)=> tweet._id !== action.payload._id);
        })
    }
})

export default tweetSlice.reducer;