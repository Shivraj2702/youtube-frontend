import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slice/authSlice.js"
import userSliceReducer from "./Slice/userSlice.js";
import videoSliceReducer from "./Slice/videoSlice.js";
import subscriptionSlice from "./Slice/subscription.js";
import likeSlice from "./Slice/like.js";
import tweetSlice from "./Slice/tweetSlice.js";
import commentSlice from "./Slice/comment.js";
import dashboardSlice from "./Slice/dashboard.js";
import playlistSlice from "./Slice/playlist.js";

export const store = configureStore({
    reducer: {
      user: userSliceReducer,
      video: videoSliceReducer,
      auth: authSliceReducer,
      user: userSliceReducer,
      video: videoSliceReducer,
      subscription: subscriptionSlice,
      like: likeSlice,
      tweet: tweetSlice,
      comment: commentSlice,
      dashboard: dashboardSlice,
      playlist: playlistSlice
    }
  })