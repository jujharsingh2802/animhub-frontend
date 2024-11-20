import React from 'react'
import { useNavigate } from 'react-router-dom';

function Avatar({src, channelName}) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        navigate(`/channel/${channelName}`);
    };
  return (
    <div>
        <img 
            src={src} 
            alt="avatar" 
            className="rounded-full cursor-pointer object-cover w-10 h-10"
            onClick={handleClick}
        />
    </div>
  )
}

export default Avatar