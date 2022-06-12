import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Video } from '../../pages/VideosPage'
import './Videos.css'

interface VideoRowProps {
  video: Video
}

export const VideoRow = (props: VideoRowProps) => {
  const { video } = props;
  return (
    <Row className="video-row p-1 mt-1">
      <Col sm={1}>
        <img className="card-img" src="src/favicon.svg" alt="" />
      </Col>
      {/* d-flex flex-column justify-content-center  */}
      <Col>
        <Row>
          <Col>
            <h5>{video.name}</h5>
          </Col>
        </Row>
        <Row>
          <div className="btn-group" role="group" aria-label="Basic example">
            <Button>Abrir</Button>
            <Button variant='success'>Procesar</Button>
            <Button disabled variant="warning">{video.status}</Button>            
          </div>
        </Row>
      </Col>
    </Row>
  )
}
