import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSlice.js"
import userSlice from "./Slice/userSlice.js";
import videoSlice from "./Slice/videoSlice.js";
import subscription from "./Slice/subscription.js";
import likeSlice from "./Slice/like.js";
import tweetSlice from "./Slice/tweetSlice.js";
import commentSlice from "./Slice/comment.js";
import dashboardSlice from "./Slice/dashboard.js";
import playlistSlice from "./Slice/playlist.js";

 const store = configureStore({
    reducer: {
      user: userSlice,
      video: videoSlice,
      auth: authSlice,
      subscription: subscription,
      like: likeSlice,
      tweet: tweetSlice,
      comment: commentSlice,
      dashboard: dashboardSlice,
      playlist: playlistSlice
    }
  })

  export default store