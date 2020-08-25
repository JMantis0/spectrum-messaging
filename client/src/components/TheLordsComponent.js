import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import TheLord from "./TheLord";

function TheLordsComponent (props) {

  return (
    <Container>
      <h1 className="lordsTitle">Praise Him</h1>
      <Row>
        <TheLord />
      </Row>
    </Container>
  )
}

export default TheLordsComponent;