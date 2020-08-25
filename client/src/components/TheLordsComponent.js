import React, {useState} from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import TheLord from "./TheLord";
import TheLordsInput from "./TheLordsInput";
import TheLordsOutput from "./TheLordsOutput";

function TheLordsComponent (props) {

  let [ prayerState, setPrayerState] = useState("...")

  return (
    <Container>
      <h1 className="lordsTitle">Praise Him</h1>
      <Row>
        <TheLord />
      </Row>
      <TheLordsInput setPrayer={(prayer) => setPrayerState(prayer)}/>
      <Row>
        <TheLordsOutput prayerOutput={prayerState}/>
      </Row>
    </Container>
  )
}

export default TheLordsComponent;