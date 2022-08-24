import React from 'react'
import { Button, FormCheck, Table } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setMode } from '../../state/workspace-slice'
import { DeepViewEvent } from '../../types/Responses/get-data'
import { seekEvent } from '../../utils/Canvas'
import { getFormattedTime } from '../../utils/time'

export interface EventsTableProps {
  events: DeepViewEvent[]
}

export const EventsTable = ({ events }: EventsTableProps) => {
  const mode = useAppSelector(({ workspace }) => workspace.mode);
  const dispatch = useAppDispatch();

  const goToEvent = (event: DeepViewEvent) => {
    if (mode !== 'evaluation') {
      dispatch(setMode('evaluation'));    
    }  
    seekEvent(event);
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
                  <td><Button onClick={() => goToEvent(e)}>Ver</Button></td>
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
