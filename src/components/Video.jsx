import React from 'react'

function Video({src , thumbnail}) {

  return (
    <video
        src = {src}
        poster = {thumbnail}
        controls
        autoPlay
        className=' sm:h-[70vh] sm:max-w-4xl h-64 w-full object-contain'

    />
  )
}

export default Video