import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { VideoInfoCard } from '../features/VideoInfo/VideoInfoCard';
import { Video } from './VideosPage';

export const VideoPage = () => {

  // Internal state
  const video = useAppSelector(({ workspace }) => workspace.video);



  return (
    !video ? null :
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>Player</Col>
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
