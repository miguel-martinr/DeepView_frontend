import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

  const navigate = useNavigate();


  return (
    <Container>
      <Row className='mt-2'>
        <Col sm={1}>
          <Button onClick={() => navigate('/videos')}>
            Vídeos
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
