import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { currentUser } from './store/Slices/auth.slice.js'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/header/Navbar.jsx'
import Sidebar from './components/header/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function App() {

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(currentUser());
  // }, [dispatch]);


  return (
    <>
        <Navbar/>

        <div className='sm:flex flex-none'>
            <div className=''>
                <Sidebar/>
            </div>
            <div className='sm:flex-1'>
                <Outlet/>        
            </div>
        </div>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
            error: {
                style: { borderRadius: "0", color: "red" },
            },
            success: {
                style: { borderRadius: "0", color: "green" },
            },
            duration: 2500,
        }}
      />
    </>
  )
}

export default App