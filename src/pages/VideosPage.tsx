import React, { useEffect, useState } from 'react'
import { deepViewApi } from '../api/api';
import { VideoRow } from '../features/VideoRow'
import './styles.css'
import { Col, Collapse, Container, Fade, Row, Spinner } from 'react-bootstrap';
import { StatusWatcher } from '../utils/fetch';
import { setCurrentVideo, setVideo, setVideos } from '../state/workspace-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

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

  // Global state
  const videos = useAppSelector(({ workspace }) => workspace.videos);
  const dispatch = useAppDispatch();


  // Internal state
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    Object.values(videos).filter(v => v.status === 'processing')
      .forEach((v, i) => {
        const watcher = new StatusWatcher();
        watcher.addEventListener('statusChanged', function (e) {
          const customEvent = e as CustomEvent;
          const updatedVideo: Video = JSON.parse(JSON.stringify(v));
          updatedVideo.status = customEvent.detail;
          dispatch(setVideo(updatedVideo));
          console.log('ok');
        })
        watcher.startWatching(v.name);
      })

  }, [videos]);

  // Handlers
  const fetchVideos = async () => {
    setIsLoading(true);
    deepViewApi.fetchAvailableVideos().then((fetchedVideos: Video[]) => {      
      dispatch(setVideos(fetchedVideos));
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
            <div className='centered'> <Spinner variant='primary' animation='grow' /></div> : null
        }
        <Fade in={!isLoading}>
          <Row>
            {Object.values(videos).map(v => <VideoRow key={v.name} name={v.name} />)}
          </Row>
        </Fade>
      </Container>
    </>
  )
}
