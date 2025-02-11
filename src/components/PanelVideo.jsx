import React from 'react'

function PanelVideo({
    thumbnail,
    title,
    duration,
    avatar = "",
    views = 0,
    channelName,
    createdAt,
    videoId,
  }) {
  return (
    <div 
        className=''
        onClick={() => navigate(`/video/${videoId}`)}
    >
    <div>
        {/* TODO: Implement the side function */}
    </div>

    </div>
  )
}

export default PanelVideo