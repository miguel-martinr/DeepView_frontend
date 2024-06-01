import React from 'react'
import { Card } from 'react-bootstrap'
import { Video } from '../../types/Video'
import { EventsTable } from './EventsTable'

export interface EventCardProps {
  video: Video
}


export const EventsCard = ({ video }: EventCardProps) => {
  const {
    data: { eventsData },
  } = video;
  
  const cardStyle = {
    overflowY: 'scroll' as 'scroll',
    height: '20rem' as '20rem',
  }

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Eventos detectados: {eventsData.events.length}</Card.Title>
        <EventsTable events={eventsData.events} videoFps={video.fps}/>
      </Card.Body>
    </Card>
  )
}
