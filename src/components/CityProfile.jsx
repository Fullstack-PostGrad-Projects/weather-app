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
import { BsSunrise, BsSunset, BsWind, BsSun } from "react-icons/bs";
// import { PiWindDuotone } from "react-icons/pi";
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
  
  // const symbolBank = {
  //   'd000' : 'Clear',
  //   'd100' : 'Mostly clear',
  //   'd200' : 'Partly cloudy',
  //   'd210' : 'Partly cloudy and light rain',
  //   'd220' : 'Partly cloudy and showers',
  //   'd240' : 'Partly cloudy, thunderstorms with rain',
  //   'd211' : 'Partly cloudy and light wet snow',
  //   'd221' : 'Partly cloudy and wet snow showers',
  //   'd212' : 'Partly cloudy and light snow',
  //   'd222' : 'Partly cloudy and snow showers',
  //   'd300' : 'Cloudy',
  //   'd310' : 'Cloudy and light rain',
  //   'd320' : 'Cloudy and showers',
  //   'd340' : 'Cloudy, thunderstorms with rain',
  //   'd311' : 'Cloudy and light wet snow',
  //   'd321' : 'Cloudy and wet snow showers',
  //   'd312' : 'Cloudy and light snow',
  //   'd322' : 'Cloudy and snow showers',
  //   'd400' : 'Overcast',
  //   'd410' : 'Overcast and light rain',
  //   'd420' : 'Overcast showers',
  //   'd430' : 'Overcast and rain',
  //   'd440' : 'Overcast, thunderstorms with rain',
  //   'd411' : 'Overcast and light wet snow',
  //   'd421' : 'Overcast and wet snow showers',
  //   'd431' : 'Overcast and wet snow',
  //   'd412' : 'Overcast and light snow',
  //   'd422' : 'Overcast snow showers',
  //   'd432' : 'Overcast and snow',
  //   'd500' : 'Thin upper cloud',
  //   'd600' : 'Fog',
  // }

const windDirection = (deg) =>{
  if (deg >= 348.75 && deg <= 360 && deg < 11.25) {
    return 'N'
  } else if ( deg >= 11.25 && deg < 33.75){
    return 'NNE'
  } else if ( deg >= 33.75 && deg < 56.25){
    return 'NE'
  } else if ( deg >= 56.25 && deg < 78.75){
    return 'ENE'
  } else if ( deg >= 78.75 && deg < 101.25){
    return 'E'
  } else if ( deg >= 101.25 && deg < 123.75){
    return 'ESE'
  } else if ( deg >= 123.75 && deg < 146.25){
    return 'SE'
  } else if ( deg >= 146.25 && deg < 168.75){
    return 'SSE'
  } else if ( deg >= 168.75 && deg < 191.25){
    return 'S'
  } else if ( deg >= 191.25 && deg < 213.75){
    return 'SSW'
  } else if ( deg >= 213.75 && deg < 236.25){
    return 'SW'
  } else if ( deg >= 236.25 && deg < 258.75){
    return 'WSW'
  } else if ( deg >= 258.75 && deg < 281.25){
    return 'W'
  } else if ( deg >= 281.25 && deg < 303.75){
    return 'WNW'
  } else if ( deg >= 303.75 && deg < 326.25){
    return 'NW'
  } else if ( deg >= 326.25 && deg < 348.75){
    return 'NNW'
  } 
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
        {/* <img src="/public/images/d100.png" alt="Current weather top of the key"/> */}
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
      {cityData.map((day, idx) => {
        const dayOfTheWeekIndex = new Date(`${day.date} ${justTime}`);
        let dayOfTheWeek = weekday[dayOfTheWeekIndex.getDay()];
        // console.log(cityData, 'should be populated')
        let dayNumber = dayOfTheWeekIndex.getDate();
        let month = dayOfTheWeekIndex.toLocaleString("default", { month: "short" });
        let toShow = month + " " + dayNumber;
        let windDirectionAbbr = windDirection(day.windDir)
        // console.log(`./images/${day.symbol}.png`)

        return (
          <Accordion key={idx} defaultActiveKey={idx === 0 ? idx : null}>
            <Accordion.Item eventKey={idx}>
              <Accordion.Header>
                <Container>
                  <Row>
                    <Col>{dayOfTheWeek} {toShow}</Col>
                    <Col>
                      <img className="miniIcon" src={require(`/public/images/${day.symbol}.png`)} alt="Current weather"/>
                      {day.maxTemp}°F/{day.minTemp}°F
                    </Col>
                    <Col>Precipitation Chance: {day.precipProb}%</Col>
                  </Row>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <Container fluid>
                <IconContext.Provider value={{ className: "forecastIcons", size: 35 }}>
                  <Row >
                    <Col className="weekIconCol">
                    <img src={require(`/public/images/${day.symbol}.png`)}/>
                    <br/>
                    {state.symbolBank[day.symbol]}
                    </Col>
                    
                    <Col className="weekIconCol">
                      <Row className="contentAccord">
                        <Col>
                          <BsSunrise/> {day.sunrise} 
                          </Col>
                        <Col><BsSunset/> {day.sunset}</Col>
                      </Row>
                      
                    </Col>
                    <Col className="weekIconCol">
                      <Row>
                        
                        <Col>
                        <BsWind/><br/> {day.maxWindSpeed}mph {windDirectionAbbr}
                          </Col>
                        <Col><BsSun/><br/> UV Index: {day.uvIndex}</Col>
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
      </Container>

    </>
  ) : (
    <Loading />
  );
};

export default CityProfile;
