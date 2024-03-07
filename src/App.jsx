import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HomePage from './Pages/HomePage'
import { AuthLayout } from './components'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import {getCurrentUser} from './store/Slice/authSlice'


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

      
      </Route>
    </Routes>
    </>
  )
}

export default App