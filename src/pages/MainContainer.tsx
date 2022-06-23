import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'

import '../App.css'

export const MainContainer = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Container fluid>
        <header className="App-header">
          <Row>
            <Col className='text-center'>
              <h1>DeepView</h1>
            </Col>
          </Row>
        </header>
      </Container>
      <Outlet />
    </div>
  )
}
