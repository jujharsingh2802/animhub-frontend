import React, { useState } from 'react'
import {Search, Button , Logo} from '../index.js'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../store/Slices/auth.slice.js'
import { GrLogout } from "react-icons/gr";


function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  
  const authStatus = useSelector(state => state.auth.authStatus)
  const username = useSelector(state => state.auth?.userData?.username)
  const profileImage = useSelector(state => state.auth?.userData?.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  }

  const sidebarItems = [
    {
      icon: "/images/logo.png",
      title: "Home",
      link: "/",
    },
    {

    }
  ]
  return (
    <>
      <nav className="w-full bg-[#0F0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <Logo />
        </div>

        <div className=' w-full sm:w-1/3 hidden sm:block'>
          <Search />
        </div>
        
      </nav>

    </>
  )
}

export default Navbar