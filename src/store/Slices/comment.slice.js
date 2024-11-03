import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js"
import { BASE_URL } from "../../constant.js"
import axiosInstance from "../../utilities/axios.js"
import toast from "react-hot-toast"

const initialState = {
    loading: false,
    comments: [],
    totalComments: 0,
    hasNextPage: false,
}

export const getVideoComments = createAsyncThunk(
    "viewComments",
    asyncThunkHandler(async({videoId, page, limit})=>{
        const url = new URL(`${BASE_URL}/comments${videoId}`);
        if(page) url.searchParams.set("page", page);
        if(limit) url.searchParams.set("limit", limit);

        const response = await axiosInstance.get(url);
        return response.data.data;
    })
)

export const postComment = createAsyncThunk(
    "addComment",
    asyncThunkHandler(async({videoId, content})=>{
        const response = await axiosInstance.post(`/comments/${videoId}`,{content});
        return response.data.data;
    })
)

export const updateComment = createAsyncThunk(
    "updateComment",
    asyncThunkHandler(async({commentId, content})=>{
        const response = await axiosInstance.patch(`/comments/${commentId}`,{content});
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const deleteComment = createAsyncThunk(
    "deleteComment",
    asyncThunkHandler(async({commentId})=>{
        const response = await axiosInstance.delete(`/comments/${commentId}`);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

const commentSlice = createSlice({
    initialState, 
    name: "comment",
    reducers: {
        cleanUpComments: (state) =>{
            state.comments = [];
            state.totalComments = 0;
            state.hasNextPage = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getVideoComments.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getVideoComments.fulfilled, (state, action)=>{
            state.loading = false;
            state.comments = [...state.comments, ...action.payload.docs];
            state.totalComments = action.payload.totalDocs;
            state.hasNextPage = action.payload.hasNextPage;
        })

        builder.addCase(postComment.fulfilled, (state, action)=>{
            state.loading = false;
            state.comments.unshift(action.payload);
            state.totalComments += 1;
        })

        builder.addCase(updateComment.fulfilled, (state, action)=>{
            state.loading = false;
            const index = state.comments.findIndex(comment => comment._id === action.payload._id);
            state.comments[index] = action.payload;
        })

        builder.addCase(deleteComment.fulfilled, (state, action)=>{
            state.loading = false;
            state.comments = state.comments.filter(comment => comment._id !== action.payload._id);
            state.totalComments -= 1;
        })
    }
})

export const { cleanUpComments } = commentSlice.actions;
export default commentSlice.reducer;