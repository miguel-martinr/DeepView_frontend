import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { VideoStatus } from '../../types/Video'

import './styles.css'
export interface StatusButtonProps {
  status: VideoStatus,
  percentage?: number,
}

export const StatusButton = ({ status, percentage }: StatusButtonProps) => {

  const StatusType = {
    processing: { message: 'Procesando', color: 'warning', buttonVariant: '' },
    processed: { message: 'Procesado', color: 'success', buttonVariant: 'success' },
    unprocessed: { message: 'No procesado', color: 'secondary', buttonVariant: 'secondary' },
    stopped: {message: 'Detenido', color: 'danger', buttonVariant: 'danger'}
  }

  return (
    <Button className='status-button' variant={StatusType[status].buttonVariant} >
      {status === 'processing' ?
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          variant={StatusType[status].color}
          className="me-2"
        /> : null}
      {StatusType[status].message + (status === 'processing' && percentage !== undefined ? ` ${percentage}%` : '')}
    </Button>
  )
}
