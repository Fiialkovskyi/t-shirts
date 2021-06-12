import React from 'react'
import { Row, Col } from 'react-bootstrap';

const SelectedRow = ({label, value}) => {
  return (
    <Row>
      <Col xs={4}>{label}</Col>
      <Col xs={8}>
        <strong>{value}</strong>
      </Col>
  </Row>
  )
}

export default SelectedRow;