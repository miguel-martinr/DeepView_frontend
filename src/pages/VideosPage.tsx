import React, { useEffect, useState } from 'react'
import { deepViewApi } from '../api/api';
import { VideoRow } from '../features/VideoRow'
import './styles.css'
import { Col, Container, Row, Spinner } from 'react-bootstrap';

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

  // Internal state
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchVideos();
  }, []);


  // Handlers
  const fetchVideos = async () => {
    setIsLoading(true);
    deepViewApi.fetchAvailableVideos().then(videos => {
      console.log(videos);
      setVideos(videos);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
    });
  }



  return (
    <>
      <Container className='mb-5'>
        <Row className='mt-2'>
          <Col>
            <h1>Vídeos</h1>
          </Col>
        </Row>
        <p>Aquí puedes ver los vídeos que están disponibles en el servidor</p>

        {
          isLoading ?
            <div  className='centered'> <Spinner variant='primary' animation='grow' /></div> :
            videos.map(v => <VideoRow key={v.name} video={v} />)
        }
      </Container>
    </>
  )
}
