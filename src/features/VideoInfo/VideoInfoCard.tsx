import React from 'react'
import { Card, Form, InputGroup } from 'react-bootstrap'
import { Video } from '../../types/Video'
import { getFormattedTime } from '../../utils/time'
import './styles.css'

export interface VideoInfoCardProps {
  video: Video
}

export const VideoInfoCard = (props: VideoInfoCardProps) => {
  const { video } = props;
  const inputStyle = { backgroundColor: 'white' };


  // Handlers
  const getFormattedDuration = (durationInSeconds: number) => {
    return getFormattedTime(durationInSeconds);
  }


  return (
    <Card className='info-card'>
      <Card.Body>
        <Card.Title>Información</Card.Title>
        <InputGroup>
          <InputGroup.Text>Nombre</InputGroup.Text>
          <Form.Control type="text" value={video.name} readOnly style={inputStyle} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Duración</InputGroup.Text>
          <Form.Control type="text" value={getFormattedDuration(video.duration_in_seconds)} readOnly style={inputStyle} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Tamaño</InputGroup.Text>
          <Form.Control type="text" value={Math.round(video.size_in_MB * 100) / 100 + ' MB'} readOnly style={inputStyle} />
        </InputGroup>
        {
          video.secondsSpent !== undefined ?
            <InputGroup>
              <InputGroup.Text>T. Proc.</InputGroup.Text>
              <Form.Control type="number" value={getFormattedDuration(video.secondsSpent)} readOnly style={inputStyle} />
            </InputGroup>
            : null
        }
      </Card.Body>
    </Card>
  )
}
