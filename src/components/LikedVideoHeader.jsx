import React from 'react'
import { useSelector } from 'react-redux'

function LikedVideoHeader({ thumbnail , totalLikedVideos }) {
    const fullname = useSelector(state => state.auth?.userdata?.fullName);
    console.log(fullname)
    return (
        <div className="relative w-full text-white">
            <div 
                className="absolute inset-0 bg-cover bg-center blur-lg opacity-50" 
                style={{ backgroundImage: `url(${thumbnail})` }}
            ></div>
            <div className="relative flex items-center p-4">
                <img src={thumbnail} className="rounded-xl  w-96 h-44 object-cover lg:ml-32" alt="Thumbnail" />
                <div className='ml-4'>
                  <p className="sm:text-3xl text-xl font-semibold"> Liked Videos</p>
                  <p> {fullname} </p>
                  <p className=' text-[13px] opacity-80'> {totalLikedVideos} videos</p>
                </div>
            </div>
        </div>
    );
}

export default LikedVideoHeader;
