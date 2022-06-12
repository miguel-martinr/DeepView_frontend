import React, { useEffect, useState } from 'react'
import { deepViewApi } from '../api/api';
import { VideoRow } from '../features/Videos'


export interface Video {
  name: string,
  size: string,
  date: string,
  duration: string,
  fps: number,
  resolution: string,
  status: string,
}

export const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      deepViewApi.fetchAvailableVideos().then(videos => {
        setVideos(videos);
      }).catch(err => {
        console.log(err);
      });
    }

    fetchVideos();
  })


  return (
    <>
      <h1>Vídeos</h1>
      <p>Aquí están los vídeos disponibles en el servidor</p>

      <div>
        {
          videos.map(v => <VideoRow key={v.name} video={v}/>)
        }
      </div>
    </>
  )
}
