import React from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
function TheLordsInput(props) {
  return (
    <Col>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-secondary">Pray</Button>
        </InputGroup.Prepend>
        <FormControl aria-describedby="basic-addon1" />
      </InputGroup>
    </Col>
  );
}

export default TheLordsInput;