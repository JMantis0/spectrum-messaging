import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TheLord from "./TheLord";
import TheLordsInput from "./TheLordsInput";
import TheLordsOutput from "./TheLordsOutput";
import API from "../../utils/API"

//  I want the TheLordsOutput component to be able to display the prayerState

function TheLordsComponent(props) {
  let [prayerState, setPrayerState] = useState("...");

  // prayer should be a string
  function handlePrayer(event) {
    setPrayerState("Dear Lord, " + event.current.value + "  -Amen");
  }

  // textToAnalyze coming from lordsRef
  function handleSubmit(textToAnalyze) {
 
    console.log("textToAnalyze", textToAnalyze)
    API.analyzeText(textToAnalyze);

  }

  return (
    <Container>
      <h1 className="lordsTitle">Praise Him</h1>
      <Row>
        <TheLord />
      </Row>
      <TheLordsInput handleSubmit={handleSubmit} handlePrayer={handlePrayer} />
      <Row>
        <TheLordsOutput prayerState={prayerState} />
      </Row>
    </Container>
  );
}

export default TheLordsComponent;
