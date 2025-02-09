import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Like } from "./index.js";
import { toggleSubscription } from "../store/Slices/subscription.slice.js";
import { BsDownload, PiShareFat } from "./icons.js";
import toast from "react-hot-toast";
import { timeSince, viewFormatter } from "../utilities/time.js";

function Description({
  isSubscribed,
  title,
  views,
  createdAt,
  description,
  isLiked,
  videoId,
  channelId,
  likesCount,
  subscribersCount,
  avatar,
  videoFile,
  channelName,
}) {
  const dispatch = useDispatch();
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount);

  const [isOpenedDescription, setIsOpenedDescription] = useState(false);

  const handleSubscribe = () => {
    setLocalIsSubscribed(!localIsSubscribed);
    if (localIsSubscribed) {
      setLocalSubscribersCount(localSubscribersCount - 1);
    } else {
      setLocalSubscribersCount(localSubscribersCount + 1);
    }

    dispatch(toggleSubscription(channelId));
  };

    const copyTheText = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = videoFile;
        link.download = `${title}.mp4`;
        toast.success("Click on the three dots to download the video");
        setTimeout(()=>{
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 2000)
        
    }

    const extractHashtags = (text = "") => {
      return (text.match(/#[a-zA-Z0-9_]+/g) || []).join(" ");
    };
    
    
  return (
    <div>
      <section className="sm:max-w-4xl w-full text-white sm:p-5 p-2 space-y-2">
        <div className="border-b border-slate-600 pb-2">
          <div className="space-y-2 mb-2">
            <h1 className=" sm:text-2xl text-xl font-medium">{title}</h1>
            <div className=" flex ">
              <div className="flex space-x-4">
                <img
                  src={avatar}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div className="flex flex-col">
                  <h2 className=" font-semibold">{channelName}</h2>
                  <span className=" text-sm opacity-70">
                    {localSubscribersCount} subscribers
                  </span>
                </div>
                <Button
                  onClick={handleSubscribe}
                  textColor="text-black"
                  className=" rounded-full py-2 px-3 bg-[#D9D9D9]"
                >
                  {" "}
                  {localIsSubscribed ? "Subscribed" : "Subscribe"}{" "}
                </Button>
              </div>
              <div className=" px-4 pt-3 ml-56 rounded-full bg-[#282828] hover:bg-[#3d3d3d] ">
                  <Like
                    size={21}
                    isLiked={isLiked}
                    likesCount={likesCount}
                    videoId={videoId}
                  />
                </div>
              <Button onClick={copyTheText} className="ml-2 flex bg-[#282828] rounded-full hover:bg-[#3d3d3d] px-4 py-2" >
                <span className="pr-2">Share</span> <PiShareFat size={25} />
              </Button>
              <Button onClick={handleDownload} className=" flex ml-2 bg-[#282828] rounded-full hover:bg-[#3d3d3d] px-4 py-2" >
                <span className="pr-2">Download</span> <BsDownload size={23} />
              </Button>
            </div>
            <div className=" cursor-pointer rounded-lg bg-[#282828] p-2 hover:bg-[#393939e8]" onClick={()=>setIsOpenedDescription(!isOpenedDescription)}>
              
              { 
                !isOpenedDescription ? 
                (
                  <>
                  <span className="text-sm font-semibold pr-2">
                    {viewFormatter(views)} views <span className=" pl-1"></span> {timeSince(createdAt) }
                  </span>
                  <span className="text-sm text-[#3EA6FF] font-light">{extractHashtags(description)}</span>
                  <div className=" whitespace-pre-line">{`${description?.slice(0,100)}`}  {description?.length > 100 ? <span className=" font-semibold">...more</span> : null}</div>
                  </>
                )
                : (
                  <>
                  <span className="text-sm font-semibold pr-2">
                    {views} views <span className=" pl-1"></span> {timeSince(createdAt) }
                  </span>
                  <span className="text-sm text-[#3EA6FF] font-light ">{extractHashtags(description)}</span>
                  <div className=" whitespace-pre-line">{description}</div>

                  </>
                )
              }                            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Description;
