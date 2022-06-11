import React from 'react'
import { VideoRow } from '../features/Videos'

export const VideosPage = () => {
  return (
    <>
      <h1>Vídeos</h1>
      <p>Aquí están los vídeos disponibles en el servidor</p>

      <div>
        <VideoRow />
      </div>
    </>
  )
}
