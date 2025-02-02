import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Video from '../components/Video.jsx';
import Description from '../components/Description.jsx';
import { getVideo } from '../store/Slices/video.slice.js';
import { cleanUpComments } from '../store/Slices/comment.slice.js';

function VideoPage() {
    const dispatch = useDispatch();
    const { videoId} = useParams();

    const video = useSelector(state => state.video?.video);
    const comments = useSelector(state => state.comment?.comments);
    const totalComments = useSelector(state => state.comment?.totalComments);
    const hasNextPage = useSelector(state => state.comment?.hasNextPage);

    const loading = useSelector(state => state.video?.loading);

    useEffect(() => {
        if(videoId) {
          dispatch(getVideo({videoId}));
        // dispatch(getComments({ videoId, page: 1, limit: 5 }));
        }
        return ()=>dispatch(cleanUpComments());
    },[dispatch, videoId]);
  return (
    <div>
      <Video src={video?.videoFile} thumbnail={video?.thumbnail} />
      <Description 
        videoFile = {video?.videoFile}
        isSubscribed={video?.owner?.isSubscribed}
        title={video?.title}
        views={video?.views}
        createdAt={video?.createdAt}
        description={video?.description}
        isLiked={video?.isLiked}
        videoId={video?._id}
        channelId={video?.owner?._id}
        likesCount={video?.likesCount}
        subscribersCount={video?.owner?.subscribersCount}
        avatar={video?.owner?.avatar}
        channelName={video?.owner?.username}
        key={video?._id}
      />
    </div>
  )
}

export default VideoPage