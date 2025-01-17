import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constant.js";
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js";
import axiosInstance from "../../utilities/axios.js";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        data: [],
        hasNextPage: false,
    },
    video: null,
    publishToggle: false,
}

export const getAllVideos = createAsyncThunk(
    "getAllVideos",
    asyncThunkHandler(async ({ page, query, limit, sortType, sortBy, userId }) => {
        const url = new URL(`${BASE_URL}/videos`);

        if (userId) url.searchParams.set("userId", userId);
        if (page) url.searchParams.set("page", page);
        if (!query) url.searchParams.set("query", "MongoDB");
        else url.searchParams.set("query", query);
        if (limit) url.searchParams.set("limit", limit);
        if (sortType && sortBy) {
            url.searchParams.set("sortType", sortType);
            url.searchParams.set("sortBy", sortBy);
        }

        const response = await axiosInstance.get(url.toString());
        console.log(response.data);
        return response.data;
    })
);

export const getVideo = createAsyncThunk(
    "getVideoById",
    asyncThunkHandler(async ({videoId}) => {
        const response = await axiosInstance.get(`${BASE_URL}/v/${videoId}`);
        return response.data.data;
    })
);

export const publishVideo = createAsyncThunk(
    "publishAVideo",
    asyncThunkHandler( async (data)=>{
        const form = new FormData();
        form.append("title", data.title);
        form.append("description", data?.description);
        form.append("videoFile", data.videoFile);
        if(data.thumbnail){
            form.append("thumbnail", data.thumbnail);
        }
        const response = await axiosInstance.post(`/videos`, form);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const updateVideo = createAsyncThunk(
    "updateVideo",
    asyncThunkHandler(async(videoId, data)=>{
        const form = new FormData();
        form.append("title", data.title);
        form.append("description", data?.description);
        if(data.thumbnail){
            form.append("thumbnail", data.thumbnail);
        }
        const response = await axiosInstance.patch(`/videos/v/${videoId}`, form);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const deleteVideo = createAsyncThunk(
    "deleteVideo",
    asyncThunkHandler(async(videoId)=>{
        const response = await axiosInstance.delete(`/videos/v/${videoId}`);
        toast.success(response.data?.message);
        return response.data.data;
    })
)

export const togglePublish = createAsyncThunk(
    "togglePublishStatus",
    asyncThunkHandler(async(videoId)=>{
        const response = await axiosInstance.patch(`/videos/toggle/publish/${videoId}`);
        toast.success(response.data?.message);
        return response.data.data.isPublished;
    })
)

const videoSlice = createSlice({
    initialState,
    name: "video",
    reducers: {
        updateUploadState: (state) =>{
            state.uploading = false;
            state.uploaded = false;
        },
        makeVideosNull: (state) =>{
            state.videos.docs = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = {
              data: [...(state.videos.data || []), ...action.payload.data.docs],
              hasNextPage: action.payload.data.page < action.payload.data.totalPages, 
            };
          });
          
        builder.addCase(getVideo.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getVideo.fulfilled, (state, action)=>{
            state.loading = false;
            state.video = action.payload;
        })

        builder.addCase(publishVideo.pending, (state)=>{
            state.uploading = true;
        })
        builder.addCase(publishVideo.fulfilled, (state, action)=>{
            state.uploading = false;
            state.uploaded = true;
            state.videos.data.unshift(action.payload);
        })

        builder.addCase(updateVideo.pending, (state)=>{
            state.uploading = true;
        })
        builder.addCase(updateVideo.fulfilled, (state)=>{
            state.uploading = false;
            state.uploaded = true;
        })

        builder.addCase(deleteVideo.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(deleteVideo.fulfilled, (state, action)=>{
            state.loading = false;
            state.videos.data = state.videos.data.filter(video => video._id !== action.payload._id);
        })

        builder.addCase(togglePublish.fulfilled, (state)=>{
            state.loading = false;
            state.publishToggle = !state.publishToggle;
        })
    }
})


export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;