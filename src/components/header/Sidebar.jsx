import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/Slices/auth.slice.js';
import { BiLike, MdHome, MdHistory ,IoFolderOutline, TbUserCheck, HiOutlineVideoCamera} from "../icons.js";
import { IoMdLogOut } from "react-icons/io";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);
  const username = useSelector(state =>state?.auth?.userdata?.username);

  const logout = async () => { 
    await dispatch(userLogout());
    navigate('/');
  }
  const sidebarItems = [
    {
      icon: <MdHome size={24}/>,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiLike size={24} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <MdHistory size={24} />,
      title: "History",
      url: "/history"
    },
    {
      icon: <IoFolderOutline size={24} />,
      title: "Playlists",
      url: "/playlists"
    },
    {
      icon: <TbUserCheck size={24}/>,
      title: "Subscriptions",
      url: "/subscriptions"
    },
    {
      icon: <HiOutlineVideoCamera size={24}/>,
      title: "My Content",
      url: "/channel/"+username,
    }
  ];



  return (
    <div>
        <div className=' sm:block hidden'>
          <div className='text-white lg:w-56 md:w-40 w-16 sm:p-3 p-2 border-slate-600 border-r h-screen flex flex-col justify-between '>
            <div className="flex flex-col gap-4 mt-5">
              {sidebarItems.map((item) => (
                <NavLink
                  to = {item.url}
                  key={item.title}
                  className={({isActive}) => (isActive ? 'bg-slate-700 text-white hover:rounded-none' : 'text-slate-300')}
                >
                <div key={item.title} className="flex items-center gap-4 cursor-pointer hover:bg-slate-600 hover:font-semibold hover:text-white rounded-sm p-2">
                  <span >{item.icon}</span> 
                  <span >{item.title}</span>
                </div>
                </NavLink>
              ))}
              </div>

              <div className=' space-y-4 mb-10'>
                { username && (
                  <div onClick={()=>logout()} className="flex items-center gap-3 justify-center sm:justify-start hover:text-white hover:bg-red-500 cursor-pointer rounded-sm p-2 ">
                    <IoMdLogOut size={24} />
                    <span className=' text-base sm:block hidden'>Logout</span>
                  </div>
                )}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Sidebar