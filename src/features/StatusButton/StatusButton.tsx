import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { VideoStatus } from '../../pages/VideosPage'
import './styles.css'
export interface StatusButtonProps {
  status: VideoStatus
}

export const StatusButton = ({ status }: StatusButtonProps) => {

  const StatusType = {
    processing: { message: 'Procesando', color: 'warning', buttonVariant: '' },
    processed: { message: 'Procesado', color: 'success', buttonVariant: 'success' },
    unprocessed: { message: 'No procesado', color: 'danger', buttonVariant: 'danger' },
    stopped: {message: 'Detenido', color: 'secondary', buttonVariant: 'secondary'}
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
      {StatusType[status].message}
    </Button>
  )
}
