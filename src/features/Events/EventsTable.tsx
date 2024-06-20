import React from 'react'
import { Button, FormCheck, Table } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setMode } from '../../state/workspace-slice'
import { DeepViewEvent } from '../../types/Responses/get-data'
import { seekEvent } from '../../utils/Canvas'
import { getFormattedTime } from '../../utils/time'

export interface EventsTableProps {
  events: DeepViewEvent[],
  videoFps: number
}

export const EventsTable = ({ events, videoFps }: EventsTableProps) => {
  const mode = useAppSelector(({ workspace }) => workspace.mode);
  const dispatch = useAppDispatch();

  const goToEvent = (event: DeepViewEvent) => {
    if (mode !== 'evaluation') {
      dispatch(setMode('evaluation'));    
    }  
    seekEvent(event, videoFps);
  }

  const frameRateIsDefined = videoFps !== undefined;

  return (
    <div>

      <Table>
        <thead>
          <tr>
            <th className='text-center'>#</th>
            <th className='text-center'>{frameRateIsDefined ? 'Instante' : 'Frame'}</th>
            {
              frameRateIsDefined &&
              <th className='text-center'>Ir</th>            
            }
          </tr>

          {

            events.map((e, i) => {
              return (
                <tr key={'second-' + i}>
                  <td className='text-center'>{i}</td>
                  <td className='text-center'>{frameRateIsDefined ? (getFormattedTime((1 / videoFps) * e.frame_index)) : e.frame_index}</td>
                  {
                    frameRateIsDefined &&
                    <td className='text-center'><Button onClick={() => goToEvent(e)}>Ver</Button></td>
                  }
                </tr>
              )
            })

          }
        </thead>
      </Table>
    </div>
  )
}
