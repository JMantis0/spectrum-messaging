import React, { useRef } from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function TheLordsInput(props) {

  const lordsRef = useRef("");
  


  return (
    <Col>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button onClick={() => props.handlePrayer(lordsRef)} variant="outline-secondary">
            Pray
          </Button>
          
        </InputGroup.Prepend>
        <FormControl
          className="theLordsInput"
          aria-describedby="basic-addon1"
          ref={lordsRef}
        />
      </InputGroup>
    </Col>
  );
}

export default TheLordsInput;
