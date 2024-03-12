import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HomePage from './Pages/HomePage'
import { AuthLayout } from './components'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import {getCurrentUser} from './store/Slice/authSlice'
import VideoDetail from './Pages/VideoDetail'
import {Login, Signup} from './components'
import AdminDashboard from './Pages/AdminDashboard'
import History from './Pages/History'
import LikedVideos from './Pages/LikedVideo'
import SearchVideos from './Pages/Searchvideos'
import Channel from './Pages/Channel/Channel'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
    <Routes>
      <Route 
        path='/'
        element={<Layout/>}
        >
          <Route
              path=''
              element={
                <AuthLayout authentication={false}>
                   <HomePage/>
                </AuthLayout>
              }
          />

        <Route
              path='/search/:query'
              element={
                <AuthLayout authentication={false}>
                   <SearchVideos/>
                </AuthLayout>
              }
          />
         <Route
            path='/channel/:username'
            element={
                <AuthLayout authentication>
                    <Channel/>
                </AuthLayout>
            }
         ></Route>
                 <Route
                    path="/watch/:videoId"
                    element={
                        <AuthLayout authentication>
                            <VideoDetail />
                        </AuthLayout>
                    }
            />
                <Route
                    path="/login"
                    element={
                        <AuthLayout authentication={false}>
                            <Login />
                        </AuthLayout>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <AuthLayout authentication={false}>
                            <Signup />
                        </AuthLayout>
                    }
                />
                 <Route
                    path="/collections"
                    element={
                        <AuthLayout authentication>
                            <AdminDashboard />
                        </AuthLayout>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <AuthLayout authentication>
                            <History />
                        </AuthLayout>
                    }
                />
                <Route
                    path="/liked-videos"
                    element={
                        <AuthLayout authentication>
                            <LikedVideos/>
                        </AuthLayout>
                    }
                />

      </Route>
    </Routes>
    </>
  )
}

export default App