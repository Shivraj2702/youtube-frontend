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
import ChannelVideos from './Pages/Channel/ChannelVideo'
import ChannelPlaylist from './Pages/Channel/ChannelPlaylist'
import ChannelSubscribers from './Pages/Channel/ChannelSubscriber'
import ChannelTweets from './Pages/Channel/ChannelTweets'
import Subscription from './store/Slice/subscription'


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
         >
                <Route
                    path="videos"
                    element={
                        <AuthLayout authentication>
                                <ChannelVideos/>
                        </AuthLayout>
                            }
                />
                        <Route
                            path="playlists"
                            element={
                                <AuthLayout authentication>
                                    <ChannelPlaylist/>
                                </AuthLayout>
                            }
                        />
                         <Route
                            path="subscribed"
                            element={
                                <AuthLayout authentication={false}>
                                    <ChannelSubscribers/>
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="tweets"
                            element={
                                <AuthLayout authentication={false}>
                                    <ChannelTweets/>
                                </AuthLayout>
                            }
                        />

         </Route>
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

                    <Route
                        path="/subscriptions"
                        element={
                            <AuthLayout authentication>
                                <Subscription/>
                            </AuthLayout>
                        }
                    />

      </Route>
    </Routes>
    </>
  )
}

export default App