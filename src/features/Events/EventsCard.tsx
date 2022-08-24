import React from 'react'
import { Card } from 'react-bootstrap'
import { EventsData } from '../../types/Video'
import { EventsTable } from './EventsTable'

export interface EventCardProps {
  eventsData: EventsData
}


export const EventsCard = ({ eventsData }: EventCardProps) => {

  const cardStyle = {
    overflowY: 'scroll' as 'scroll',
    height: '20rem' as '20rem',
  }

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Eventos</Card.Title>
        <EventsTable events={eventsData.events} />
      </Card.Body>
    </Card>
  )
}
