import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios.js";
import asyncThunkHandler from "../storeUtils/asyncThunkHandler.js";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    status: null,
    userdata: null
}
export const createAccount = createAsyncThunk(
    "register",
    asyncThunkHandler(async (data) => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("fullName", data.fullName);
      formData.append("avatar", data.avatar[0]);
      if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const response = await axiosInstance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response.data);
      toast.success("Account created successfully");
      return response.data;
    })
  );

export const userLogin = createAsyncThunk(
    "login",
    asyncThunkHandler(async(data)=>{
        const response = await axiosInstance.post("/users/login", data);
        console.log(response.data);
        toast.success("Login successful");
        return response.data.data?.user;
    })
)

export const userLogout = createAsyncThunk(
    "logout",
    asyncThunkHandler(async()=>{
        const response = await axiosInstance.post("/users/logout");
        console.log(response.data?.message);
        toast.success("Logout Successful");
        return response.data;
    })
)

export const refreshtoken = createAsyncThunk(
    "refreshAccessToken",
    asyncThunkHandler(async()=>{
        const response = await axiosInstance.post("/users/refresh-token");
        console.log(response.data);
        toast.success(response.data?.message);
        return response.data;
    })
)

export const currentUser = createAsyncThunk(
    "getCurrentUser",
    asyncThunkHandler(async ()=>{
        const response = await axiosInstance.get("users/current-user");
        console.log(response.data);
        return response.data.data;
    })
)

export const newpassword = createAsyncThunk(
    "changePassword",
    asyncThunkHandler(async (data) =>{
        const response = await axiosInstance.post("/users/change-password");
        toast.success(response.data?.message);
        return response.data;
    })
)

export const updateUserDetails = createAsyncThunk(
    "updateAccountDetails",
    asyncThunkHandler(async (data)=>{
        const response = await axiosInstance.patch("/users/update-account" , data);
        toast.success(response.data.message);
        return response.data
    })
)

export const updateCoverImg = createAsyncThunk(
    "updateUserCoverImage",
    asyncThunkHandler(async(coverImage)=>{
        const response = await axiosInstance.patch("/users/update-cover-image" , coverImage);
        toast.success(response.data.message);
        return response.data;
    })
)

export const updateAvatar = createAsyncThunk(
    "updateUserAvatar",
    asyncThunkHandler(async(avatar)=>{
        const response = await axiosInstance.patch("/users/update-avatar" , avatar);
        toast.success(response.data.message);
        return response.data
    })
)

export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.userdata = action.payload;
        })

        builder.addCase(userLogin.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(userLogin.fulfilled, (state, action)=>{
            state.loading = false;
            state.status = true;
            state.userdata = action.payload;
        })

        builder.addCase(userLogout.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(userLogout.fulfilled, (state)=>{
            state.loading = false;
            state.userdata = null;
            state.status = false;
        })

        builder.addCase(currentUser.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(currentUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.status = true;
            state.userdata = action.payload;
        })
        builder.addCase(currentUser.rejected, (state)=>{
            state.loading = false;
            state.status = false;
            state.userdata = null;
        })

        builder.addCase(updateUserDetails.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(updateUserDetails.fulfilled, (state, action)=>{
            state.loading = false;
            state.userdata = action.payload;
        })

        builder.addCase(updateAvatar.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(updateAvatar.fulfilled,(state, action)=>{
            state.loading = false;
            state.userdata = action.payload;
        })
        builder.addCase(updateAvatar.rejected, (state)=>{
            state.loading = false;
        })

        builder.addCase(updateCoverImg.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(updateCoverImg.fulfilled,(state, action)=>{
            state.loading = false;
            state.userdata = action.payload;
        })
        builder.addCase(updateCoverImg.rejected, (state)=>{
            state.loading = false;
        })

    }
})


export default authSlice.reducer