import React from 'react'
import { Button, FormCheck, Table } from 'react-bootstrap'
import { DeepViewEvent } from '../../types/Responses/get-data'
import { drawObjectInCanvas } from '../../utils/Canvas'
import { drawCurrentFrame } from '../../utils/Canvas/drawCurrentFrameInCanvas'
import { getFormattedTime } from '../../utils/time'
import { getVideo } from '../../utils/Video'

export interface EventsTableProps {
  events: DeepViewEvent[]
}

export const EventsTable = ({ events }: EventsTableProps) => {

  // Go to instant event
  const goToFrameEvent = (frameIndex: number) => {
    try {
      const video = getVideo();
      const approxInstant = frameIndex / 30;
      console.log(`Current time: ${video.currentTime}`)
      video.currentTime = approxInstant;
      console.log(`Updated time: ${video.currentTime}`)

    } catch(error) {
      console.log(error);
    }    
  }

  const seekEvent = (event: DeepViewEvent) => {
    const video = getVideo();
    video.requestVideoFrameCallback(() => {
      drawCurrentFrame();
      drawObjectInCanvas({
        area: event.area,
        circle: [[event.x, event.y], event.radius],
      }, {color: '#ff0000'});
    });

    goToFrameEvent(event.frame_index);
    
    
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
                  <td><Button onClick={() => seekEvent(e)}>Ver</Button></td>
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
