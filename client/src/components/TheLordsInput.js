import React from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

function TheLordsInput(props) {
  return (
    <Col>
      <InputGroup className="mb-3">
        <InputGroup.Prepend >
          <Button  variant="outline-secondary">Pray</Button>
        </InputGroup.Prepend>
        <FormControl className="theLordsInput" aria-describedby="basic-addon1" />
      </InputGroup>
    </Col>
  );
}

export default TheLordsInput;