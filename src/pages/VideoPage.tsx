import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/api';
import { useAppSelector } from '../app/hooks';
import { VideoInfoCard } from '../features/VideoInfo/VideoInfoCard';
import { VideoPlayer } from '../features/VideoPlayer/VideoPlayer';


export const VideoPage = () => {

  // Internal state
  const video = useAppSelector(({ workspace }) => workspace.video);



  return (
    !video ? null :
      <Container className='p-5' fluid>
        <Row>
          <Col sm={4}>
            <Row>
              <Col><VideoPlayer src={BASE_URL + 'static/videos/' + video.name}/></Col>
            </Row>
            <Row>
              <Col><VideoInfoCard video={video}></VideoInfoCard></Col>
            </Row>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
  )
}
