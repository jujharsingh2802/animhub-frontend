import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js"
import { BASE_URL } from "../../constant.js"
import axiosInstance from "../../utilities/axios.js"
import toast from "react-hot-toast"

initialState = {
    loading: false,
    playlists: [],
    playlist: []
}

export const createPlaylist = createAsyncThunk(
    "createPlaylist",

    asyncThunkHandler(async({name , description})=>{
        const response = await axiosInstance.post("/playlist", {name , description});
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const addVideoToPlaylist = createAsyncThunk(
    "addVideoToPlaylist",
    asyncThunkHandler(async({playlistId, videoId})=>{
        const response = await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const removeVideoFromPlaylist = createAsyncThunk(
    "removeVideoFromPlaylist",
    asyncThunkHandler(async({playlistId, videoId})=>{
        const response = await axiosInstance.patch(`/playlist/remove/${videoId}/${playlistId}`);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const updatePlaylist = createAsyncThunk(
    "updatePlaylist",
    asyncThunkHandler(async({playlistId, name, description})=>{
        const response = await axiosInstance.patch(`/playlist/${playlistId}`,{name, description});
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const deletePlaylist = createAsyncThunk(
    "deletePlaylist",
    asyncThunkHandler(async({playlistId})=>{
        const response = await axiosInstance.delete(`/playlist/${playlistId}`);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const getPlayListById = createAsyncThunk(
    "getPlayListById",
    asyncThunkHandler(async(playlistId)=>{
        const response = await axiosInstance.get(`/playlist/${playlistId}`);
        return response.data.data;
    })
)

export const getAllUserPlaylist = createAsyncThunk(
    "getAllUserPlaylist",
    asyncThunkHandler(async(userId)=>{
        const response = await axiosInstance.get(`/playlist/user/${userId}`);
        return response.data.data;
    })
)

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},

    extraReducers: (builder) =>{
        builder.addCase(getAllUserPlaylist.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getAllUserPlaylist.fulfilled, (state, action)=>{
            state.loading = false;
            state.playlists = action.payload;
        })

        builder.addCase(getPlayListById.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getPlayListById.fulfilled, (state, action)=>{
            state.loading = false;
            state.playlist = action.payload;
        })
    }
})

export default playlistSlice.reducer