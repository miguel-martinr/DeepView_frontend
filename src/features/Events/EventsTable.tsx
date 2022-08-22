import React from 'react'
import { Button, FormCheck, Table } from 'react-bootstrap'
import { EventsData } from '../../types/Video'
import { getFormattedTime } from '../../utils/time'

export interface EventsTableProps {
  events: EventsData
}

export const EventsTable = ({ events }: EventsTableProps) => {

  const { secondsWithEvents } = events;


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

            secondsWithEvents.map((second, i) => {
              return (
                <tr key={'second-' + i}>
                  <td>{i}</td>
                  <td>{getFormattedTime(second)}</td>
                  <td><Button>Ver</Button></td>
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
