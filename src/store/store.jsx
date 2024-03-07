import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './Slice/userSlice'
import videoSliceReducer from './Slice/videoSlice'
import authSliceReducer from './Slice/authSlice'

export const store = configureStore({
    reducer: {
      user: userSliceReducer,
      video: videoSliceReducer,
      auth: authSliceReducer,
    },
  })