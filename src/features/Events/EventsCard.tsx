import React from 'react'
import { Card } from 'react-bootstrap'
import { EventsData } from '../../types/Video'
import { EventsTable } from './EventsTable'

export interface EventCardProps {
  events: EventsData
}


export const EventsCard = ({ events }: EventCardProps) => {

  const cardStyle = {
    overflowY: 'scroll' as 'scroll',
    height: '35%' as '35%',
  }

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Eventos</Card.Title>
        <EventsTable events={events} />
      </Card.Body>
    </Card>
  )
}
