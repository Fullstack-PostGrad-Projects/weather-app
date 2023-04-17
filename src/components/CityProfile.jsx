import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Figure from "react-bootstrap/Figure";
import { useLocation } from "react-router-dom";
import { getDailyForecast } from "../api";
import Loading from "./Loading";
import Image from "react-bootstrap/Image";
import { BsSunrise, BsSunset } from "react-icons/bs";

const CityProfile = () => {
  const [cityData, setCityData] = useState([]);
  const [readableTime, setReadableTime] = useState("");

  let { state } = useLocation();
  console.log(state.weatherObj, state.metaLocation);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const cityPrepData = async () => {
    try {
      const cityInfo = await getDailyForecast(state.metaLocation);
      console.log(cityInfo.forecast, "lets see");
      setCityData(cityInfo.forecast);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTime = (timestamp) => {
    let time = "";
    console.log(timestamp, "what Im working with");
    for (let i = 0; i < timestamp.length; i++) {
      if (timestamp.charAt(i) === "T") {
        let isoDate = timestamp.slice(0, i);
        let isoTime = timestamp.slice(i + 1, i + 6);
        const date = new Date(isoDate.replace(/-/g, "/")).toDateString();
        console.log(isoDate, "datteeeee");
        console.log(date, "hereeeeee");
        setReadableTime(date + " " + isoTime);
      }
    }
  };
  useEffect(() => {
    cityPrepData();
    console.log(cityData, "please no undefined");
    updateTime(state.weatherObj.time);
  }, [state.metaLocation]);

  return cityData.length > 0 ? (
    <>
      <Container className="cityProfileContainer">
        <span>
          <h1>{state.weatherObj.city}</h1>
          {readableTime}
        </span>

        {/* <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src={`./images/${state.weatherObj.symbol}.png`}
          />
        <Figure.Caption>
          {state.weatherObj.temperature}
        </Figure.Caption>
      </Figure> */}
      </Container>
      {cityData.map((day, idx) => {
        const dayOfTheWeekIndex = new Date(day.date);
        let dayOfTheWeek = weekday[dayOfTheWeekIndex.getDay()];
        // console.log(cityData, 'should be populated')
        let dayNumber = dayOfTheWeekIndex.getDate();
        let month = dayOfTheWeekIndex.toLocaleString("default", { month: "short" });
        let toShow = month + " " + dayNumber;

        return (
          <Accordion key={idx} defaultActiveKey={idx === 1 ? idx : null}>
            <Accordion.Item eventKey={idx}>
              <Accordion.Header>
                <Container>
                  <Row>
                    <Col>{dayOfTheWeek} {toShow}</Col>
                    <Col>
                      {day.maxTemp}°F/{day.minTemp}°F
                    </Col>
                    <Col>3 of 3</Col>
                  </Row>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <Container fluid>
                  <Row>
                    <Col>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={`./images/${day.symbol}.png`}
                        />
                        <Card.Body className="testMe">
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <BsSunrise /> {day.sunrise}{" "}
                        </Col>
                        <Col>
                          <BsSunset /> {day.sunset}
                        </Col>
                      </Row>
                      <Row>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                      </Row>
                      <Row>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </>
  ) : (
    <Loading />
  );
};

export default CityProfile;
