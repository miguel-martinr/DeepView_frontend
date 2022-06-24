import React, { useEffect, useState } from 'react'
import { deepViewApi } from '../api/api';
import { VideoRow } from '../features/VideoRow'
import { Col, Container, Fade, Row, Spinner } from 'react-bootstrap';
import { setVideos } from '../state/workspace-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Video } from '../types/Video';
import './styles.css'



export const VideosPage = () => {

  // Global state
  const videos = useAppSelector(({ workspace }) => workspace.videos);
  const dispatch = useAppDispatch();


  // Internal state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);


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
