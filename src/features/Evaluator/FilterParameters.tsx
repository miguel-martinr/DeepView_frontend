import React from 'react'
import { InputGroup, FormControl, Card, Col, Row, Form } from 'react-bootstrap'

export interface Parameter {
  name: string,
  type: 'text' | 'number',
  defaultValue: any
}

export interface FilterParametersProps {
  filterName: string,
  parameters: Parameter[],
  setter: any
}

export const FilterParameters = (props: FilterParametersProps) => {
  const {
    filterName,
    parameters,
    setter
  } = props;


  return (
    <>
      <Card>
        <Row>
          <Col>

            {/* Title */}
            <Row>
              <Col className='ms-1 mt-1'>
                <Card.Title>
                  {filterName}
                </Card.Title>
              </Col>
            </Row>


            {/* Inputs */}
            <Row className='ms-1 me-1'>
              <Col>
                {
                  parameters.map(parameter => (
                    <Form.Group controlId={parameter.name}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>{parameter.name}</InputGroup.Text>
                        <FormControl
                          type={parameter.type}
                          onChange={setter}
                          defaultValue={parameter.defaultValue}
                        />
                      </InputGroup>
                    </Form.Group>
                  ))
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  )
}
