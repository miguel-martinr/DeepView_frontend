import React from 'react'
import { Button, FormCheck, Table } from 'react-bootstrap'
import { DeepViewEvent } from '../../types/Responses/get-data'
import { EventsData } from '../../types/Video'
import { getFormattedTime } from '../../utils/time'

export interface EventsTableProps {
  events: DeepViewEvent[]
}

export const EventsTable = ({ events }: EventsTableProps) => {

  // Go to instant event
  const goToFrameEvent = (frameIndex: number) => {
    const video = document.getElementById('videoInput') as HTMLVideoElement;
    
    if (!video) {
      console.warn('No video element found');
      return;
    }
    
    const approxInstant = frameIndex / 30;
    video.currentTime = approxInstant;
  }


  return (
    <div>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Instante</th>
            <th>Ir</th>
            <th>Acciones</th>
          </tr>

          {

            events.map((e, i) => {
              return (
                <tr key={'second-' + i}>
                  <td>{i}</td>
                  <td>{getFormattedTime((1 / 30) * e.frame_index)}</td>
                  <td><Button onClick={() => goToFrameEvent(e.frame_index)}>Ver</Button></td>
                  <td>
                    <FormCheck type="checkbox" />
                  </td>
                </tr>
              )
            })

          }
        </thead>
      </Table>
    </div>
  )
}
