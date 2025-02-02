import React from "react";
import {useNavigate} from "react-router-dom";
import { formatDuration, timeSince } from "../utilities/time.js";

function AllVideos({
  thumbnail,
  title,
  duration,
  avatar = "",
  views = 0,
  channelName,
  createdAt,
  videoId,
}) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };
  return (
    <>
      <div
        className=" w-full sm:p-2 cursor-pointer"
        onClick={() => navigate(`/video/${videoId}`)}
      >
        <div className=" relative sm:h-60 h-48">
          <img src={thumbnail} className=" object-cover w-full h-full" />
          <span className="absolute bottom-2 right-2 rounded-lg text-sm bg-black py-1 px-2">
            {formatDuration(duration)}
          </span>
        </div>
        <div className=" flex items-center py-2 px-2 gap-2">
          <div className="overflow-hidden rounded-full w-10 h-10 border border-[50%] absolute">
          {avatar && (
            <div onClick={handleAvatarClick}>
              <img
                src={avatar}
                className=" w-10 h-10 rounded-full object-cover border border-slate-800"
              />
            </div>
          )}
          </div>
        <div className=" ml-14">
          <h2 className=" font-medium">{title}</h2>
          <div className=" text-xs space-x-1 text-slate-400">
            <span>{views} views</span>
            <span>{timeSince(createdAt)}</span>
          </div>
          {
            channelName && (
              <h2 className=" text-xs space-x-1 text-slate-200">
                {channelName}
              </h2>
            )
          }
          </div>
        </div>
        
      </div>
    </>
  );
}

export default AllVideos;
