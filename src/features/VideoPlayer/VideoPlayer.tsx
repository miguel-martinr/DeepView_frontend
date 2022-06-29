import React, { useState } from 'react'
import './styles.css'

export interface VideoPlayerProps {
  src: string,
  videoId: string,
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const { src, videoId } = props;

  return (
    <>
      <video controls id={videoId}>
        <source src={src} />
      </video>
    </>
  )
}
