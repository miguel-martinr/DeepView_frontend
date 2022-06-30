import React from 'react'
import { InputGroup, FormControl, Card, Col, Row } from 'react-bootstrap'

export const GeneralParameters = () => {
  return (
    <>
      <Card>
        <Row>
          <Col>

            {/* Title */}
            <Row>
              <Col className='ms-1 mt-1'>
                <Card.Title>
                  Generales
                </Card.Title>
              </Col>
            </Row>


            {/* Inputs */}
            <Row className='ms-1 me-1'>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  )
}
