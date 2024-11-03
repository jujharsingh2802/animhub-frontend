import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js";
import axiosInstance from "../../utilities/axios.js";

const initialState = {
    loading: false,
    subscriptions: [],
    subscribed: null,
    mySubscriptions: [],
}

export const toggleSubscription = createAsyncThunk(
    "toggleSubscription",
    asyncThunkHandler(async(channelId)=>{
        const response = await axiosInstance.post(`/subscription/c/${channelId}`);
        return response.data.data.subscribed;
    })
)

export const getUserSubscribers = createAsyncThunk(
    "getUserSubscribers",
    asyncThunkHandler(async(channelId)=>{
        const response = await axiosInstance.get(`/subscription/c/${channelId}`);
        return response.data.data;
    })
)

export const getSubscribedChannels = createAsyncThunk(
    "getSubscribedChannels",
    asyncThunkHandler(async(subscribedId)=>{
        const response = await axiosInstance.get(`/subscription/u/${subscribedId}`);
        return response.data.data;
    })
)

const subscriptionSlice = createSlice({
    initialState,
    name: "subscription",
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(toggleSubscription.fulfilled, (state, action) =>{
            state.loading = false;
            state.subscribed = action.payload;
        })
        builder.addCase(getUserSubscribers.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(getUserSubscribers.fulfilled, (state, action) =>{
            state.loading = false;
            state.subscriptions = action.payload;
        })
        builder.addCase(getSubscribedChannels.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(getSubscribedChannels.fulfilled, (state, action) =>{
            state.loading = false;
            state.mySubscriptions = action.payload;
        })
    }
})

export default subscriptionSlice.reducer;