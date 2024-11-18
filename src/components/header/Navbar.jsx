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
        <div className="pl-3 flex items-center justify-center gap-2 cursor-pointer">
          <Logo />
        </div>

        <div className=' w-full sm:w-1/3 hidden sm:block'>
          <Search />
        </div>
        {/* !TODO:: MAKE SEARCH FOR SMALL SCREENS */}
        { authStatus ? (
          <div className=' rounded-full sm:block hidden'>
            <img
              src={profileImage}
              alt="profile"
              className="w-10 h-10 rounded-full border object-cover cursor-pointer"
            />
          </div>
        ) : (
          <div className=' sm:block space-x-2 hidden'>
            <Link to={"/login"}>
              <Button className=" font-semibold hover:bg-[#454444] delay-200 border px-2 py-1 mx-1 sm:px-4 sm:py-2 ">Login</Button>
            </Link>
            <Link to={"/signup"}>
              <Button className=" font-semibold hover:bg-[#454444] delay-200 border px-2 py-1 sm:px-4 sm:py-2 ">Sign up</Button>
            </Link>
          </div>
        )

        }
      </nav>

    </>
  )
}

export default Navbar