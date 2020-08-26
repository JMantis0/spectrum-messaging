import React, {useState} from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import TheLord from "./TheLord";
import TheLordsInput from "./TheLordsInput";
import TheLordsOutput from "./TheLordsOutput";

//  I want the TheLordsOutput component to be able to display the prayerState

function TheLordsComponent (props) {

  let [ prayerState, setPrayerState] = useState("...")

  // prayer should be a string
  function handlePrayer (event)  {
  console.log(event);
    // setPrayerState(prayer)
  }

  return (
    <Container>
      <h1 className="lordsTitle">Praise Him</h1>
      <Row>
        <TheLord />
      </Row>
      <TheLordsInput setPrayer={handlePrayer}/>
      <Row>
        <TheLordsOutput prayerOutput={prayerState}/>
      </Row>
    </Container>
  )
}

export default TheLordsComponent;