import React, { useEffect, useState } from 'react'
import { deepViewApi } from '../api/api';
import { VideoRow } from '../features/VideoRow'

import Chart from 'chart.js/auto'
import { Container } from 'react-bootstrap';

export type VideoStatus = 'processing' | 'processed' | 'stopped' | 'unprocessed';
export interface Video {
  name: string,
  size_in_MB: number,
  duration_in_seconds: number,
  fps: number,
  // resolution: string,
  status: VideoStatus,
}

export const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = async () => {
    (window as any).chart = Chart
    deepViewApi.fetchAvailableVideos().then(videos => {
      console.log(videos);
      setVideos(videos);
    }).catch(err => {
      console.log(err);
    });
  }
  
  useEffect(() => {
    console.log("heelo");

    fetchVideos();
  }, []);


  return (
    <>
      <h1>Vídeos</h1>
      <p>Aquí puedes ver los vídeos que están disponibles en el servidor</p>

      <Container  className='mb-5'>
        {
          videos.map(v => <VideoRow key={v.name} video={v}/>)
        }
      </Container>
    </>
  )
}
