import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/auth.slice.js'
import userSliceReducer from './Slices/user.slice.js'
import tweetSliceReducer from './Slices/tweet.slice.js'
import playlistSliceReducer from './Slices/playlist.slice.js'
import dashboardSliceReducer from './Slices/dashboard.js'
import videoSliceReducer from './Slices/video.slice.js'
import commentSliceReducer from './Slices/comment.slice.js'
import subscriptionSliceReducer from './Slices/subscription.slice.js'
import likeSliceReducer from './Slices/like.slice.js'
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    tweet: tweetSliceReducer,
    playlist: playlistSliceReducer,
    dashboard: dashboardSliceReducer,
    video: videoSliceReducer,
    comment: commentSliceReducer,
    subscription: subscriptionSliceReducer,
    like: likeSliceReducer,
  },
});

export default store