import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js"
import axiosInstance from "../../utilities/axios.js"

const initialState = {
    loading: false,
    channelStats: [],
    channelVideos: []
}

export const getChannelStats = createAsyncThunk(
    "getChannelStats",
    asyncThunkHandler(async()=>{
        const response = await axiosInstance.get("/dashboard/stats");
        return response.data.data;
    })
)

export const getChannelVideos = createAsyncThunk(
    "getChannelVideos",
    asyncThunkHandler(async()=>{
        const response = await axiosInstance.get("/dashboard/videos");
        return response.data.data;
    })
)

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getChannelStats.pending, (state)=>{
            state.loading = true
        }),
        builder.addCase(getChannelStats.fulfilled, (state,action)=>{
            state.loading = false,
            state.channelStats = action.payload
        })
    }
})

export default dashboardSlice.reducer;