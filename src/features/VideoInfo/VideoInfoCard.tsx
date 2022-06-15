import React from 'react'
import { Card, Form, InputGroup } from 'react-bootstrap'
import { Video } from '../../pages/VideosPage'
import './styles.css'

export interface VideoInfoCardProps {
  video: Video
}

export const VideoInfoCard = (props: VideoInfoCardProps) => {
  const { video } = props;
  const inputStyle = { backgroundColor: 'white' };


  // Handlers
  const getFormattedDuration = (durationInSeconds: number) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);
    const seconds = durationInSeconds - hours * 3600 - minutes * 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toFixed(0).toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }


  return (
    <Card>
      <Card.Body>
        <Card.Title>Información</Card.Title>
        <InputGroup>
          <InputGroup.Text>Nombre</InputGroup.Text>          
          <Form.Control type="text" value={video.name} readOnly style={ inputStyle } />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Duración</InputGroup.Text>          
          <Form.Control type="text" value={getFormattedDuration(video.duration_in_seconds)} readOnly style={ inputStyle } />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Tamaño</InputGroup.Text>          
          <Form.Control type="text" value={video.size_in_MB.toFixed(4) + ' MB'} readOnly style={ inputStyle } />
        </InputGroup>
      </Card.Body>
    </Card>
  )
}
