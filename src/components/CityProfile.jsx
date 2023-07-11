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
import { getDailyForecast, getNowcastLong } from "../api";
import Loading from "./Loading";
import Image from "react-bootstrap/Image";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { IconContext } from "react-icons";
const CityProfile = () => {
  const [cityData, setCityData] = useState([]);
  const [readableTime, setReadableTime] = useState("");
  const [nowcastLong, setNowcastLong] = useState('')
  const [justTime, setJustTime] = useState('')
  
  
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

  const symbolBank = {
    'd000' : 'Clear',
    'd100' : 'Mostly Clear',
    'd200' : 'Partly Cloudy',
    'd210' : 'Partly Cloudy and light rain',
    'd220' : 'Partly Cloudy',
    'd240' : 'Partly Cloudy',
    'd211' : 'Partly Cloudy',
    'd221' : 'Partly Cloudy',
    'd212' : 'Partly Cloudy',
    'd222' : 'Partly Cloudy',
    'd300' : 'Cloudy',
    'd310' : 'Cloudy and light rain',
    'd320' : 'Cloudy',
    'd340' : 'Cloudy',
    'd311' : 'Cloudy',
    'd321' : 'Cloudy',
    'd312' : 'Cloudy',
    'd322' : 'Cloudy',
    'd400' : 'Overcast',
    'd410' : 'Overcast and light rain',
    'd420' : 'Overcast',
    'd430' : 'Overcast',
    'd440' : 'Overcast',
    'd411' : 'Overcast',
    'd421' : 'Overcast',
    'd431' : 'Overcast',
    'd412' : 'Overcast',
    'd422' : 'Overcast',
    'd432' : 'Overcast',
    'd500' : 'Thin upper cloud',
    'd600' : 'Fog',
  }

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
        setJustTime(isoTime)
      }
    }
  };
  useEffect(() => {
    cityPrepData();
    console.log(cityData, "please no undefined");
    updateTime(state.weatherObj.time);
  }, [state.metaLocation]);



  const handleOnClick = async () =>{
    console.log('hi')
    
    try {
      const hourlyWeatherObj = await getNowcastLong(state.metaLocation);
      console.log(hourlyWeatherObj, "lets see");
      // setNowcastLong(cityInfo.forecast);
    } catch (error) {
      console.error(error);
    }
  };
  
  return cityData.length > 0 ? (
    <>
      <Container className="cityProfileContainer">
        <span>
          <h1>{state.weatherObj.city}</h1>
          {readableTime}
          <br></br>
          <Button onClick={handleOnClick}>Hourly</Button>
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
        const dayOfTheWeekIndex = new Date(`${day.date} ${justTime}`);
        let dayOfTheWeek = weekday[dayOfTheWeekIndex.getDay()];
        // console.log(cityData, 'should be populated')
        let dayNumber = dayOfTheWeekIndex.getDate();
        let month = dayOfTheWeekIndex.toLocaleString("default", { month: "short" });
        let toShow = month + " " + dayNumber;
        // console.log(toShow, 'here the dates are wrong')

        return (
          <Accordion key={idx} defaultActiveKey={idx === 0 ? idx : null}>
            <Accordion.Item eventKey={idx}>
              <Accordion.Header>
                <Container>
                  <Row>
                    <Col>{dayOfTheWeek} {toShow}</Col>
                    <Col>
                      <img className="miniIcon" src={`./images/${day.symbol}.png`} />
                      {day.maxTemp}°F/{day.minTemp}°F
                    </Col>
                    <Col>Precipitation Chance: {day.precipProb}%</Col>
                  </Row>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <Container fluid>
                <IconContext.Provider value={{ className: "forecastIcons", size: 35 }}>
                  <Row>
                    <Col className="weekIconCol">
                    <img  src={`./images/${day.symbol}.png`}/>
                    </Col>
                    <Col className="weekIconCol">
                      <Row className="contentAccord">
                        <Col>
                          <BsSunrise/> {day.sunrise} 
                          </Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                      </Row>
                    </Col>
                    <Col className="weekIconCol">
                      <Row>
                        
                        <Col>
                          <BsSunset/> {day.sunset}{" "}
                          </Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                      </Row>
                    </Col>
                    </Row>
                    </IconContext.Provider>
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
