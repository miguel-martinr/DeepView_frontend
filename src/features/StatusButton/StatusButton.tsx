import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

export interface StatusButtonProps {
  status: 'processing' | 'processed' | 'unprocessed'
}

export const StatusButton = ({ status }: StatusButtonProps) => {

  const StatusType = {
    processing: { message: 'Procesando', color: 'warning', buttonVariant: '' },
    processed: { message: 'Procesado', color: 'success', buttonVariant: 'success' },
    unprocessed: { message: 'No procesado', color: 'danger', buttonVariant: 'danger' },
  }

  return (
    <Button variant={StatusType[status].buttonVariant} >
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
