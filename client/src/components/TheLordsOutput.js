import React from "react";
import Col from "react-bootstrap/Col"

function TheLordsOutput (props) {
  return (
    <Col>
      <h3>Output</h3>
      <div className="theLordsOutput">{props.prayerOutput}</div>
    </Col>
  )
}

export default TheLordsOutput;