import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BiSolidLike, BiSolidDislike } from './icons.js'
import { likeVideo, likeComment, likeTweet } from '../store/Slices/like.slice.js';

function Like({isLiked, likesCount = 0, tweetId, commentId, videoId, size}) {
    const dispatch = useDispatch();
    const [isLocallyLiked, setIsLocallyLiked] = useState(isLiked);
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);

    const handleToggleLike = () => {

        if(isLocallyLiked){
            setLocalLikesCount((prev) => prev - 1);
        } else {
            setLocalLikesCount((prev) => prev + 1);
        }

        setIsLocallyLiked((prev) => !prev);

        if(tweetId){
            dispatch(likeTweet(tweetId));
        }
        else if(commentId){
            dispatch(likeComment(commentId));
        }
        else if(videoId){
            dispatch(likeVideo(videoId));
        }
    }

    useEffect(()=>{
        setIsLocallyLiked(isLiked);
        setLocalLikesCount(likesCount);
    },[isLiked, likesCount]);
    
  return (
    <div className=' flex items-center gap-1'>
        <BiSolidLike 
            onClick={handleToggleLike}
            size={size}
            className={`cursor-pointer ${isLocallyLiked ? 'text-blue-500' : ''}`}
        />
        <span className=' mr-2 text-xs'>{localLikesCount}</span>
        <BiSolidDislike
            size={size}
            className={`cursor-pointer}`}
        />
    </div>
  )
}

export default Like