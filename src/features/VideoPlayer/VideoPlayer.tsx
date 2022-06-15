import React from 'react'
import './styles.css'

export interface VideoPlayerProps {
  src: string,
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const { src } = props;
  return (
    <video controls>
      <source src={src} />
    </video>
  )
}
