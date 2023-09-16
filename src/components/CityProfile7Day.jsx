
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
import { getDailyForecast, getNowcastLong, getSevenDayForcast } from "../api";
import Loading from "./Loading";
import Image from "react-bootstrap/Image";
import { BsSunrise, BsSunset, BsWind, BsSun } from "react-icons/bs";
// import { PiWindDuotone } from "react-icons/pi";
import { IconContext } from "react-icons";
import Hourly from "./Hourly";

const CityProfile7Day = () => {
  let { state } = useLocation();

  const [cityData, setCityData] = useState([]);
  const [readableTime, setReadableTime] = useState("");
  const [nowcastLong, setNowcastLong] = useState('')
  const [justTime, setJustTime] = useState('')
  const [cityLocation, setCityLocation] = useState(state.metaLocation)
  const [testSwitch, setTestSwitch] = useState(false)
  const [hourlyOrWeekly, setHourlyOrWeekly] = useState({true: 'Hourly', false: 'Weekly'})
  const [hourNumber, setHourNumber] = useState(0)
  const [sevenDayForecast, setsevenDayForecast] = useState([])

  
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
      const cityInfo = await getSevenDayForcast(state.metaLocation);
      console.log(cityInfo.forecast, "lets see");
      console.log(cityInfo.forecast[0])
      setCityData(cityInfo.forecast);
      return cityInfo.forecast
    } catch (error) {
      console.error(error);
    }
  };

  const updateTime = (timestamp) => {
    let time = "";
    console.log(timestamp, "what Im working with");
    for (let i = 0; i < timestamp.length; i++) {
      if (timestamp.charAt(i) === "T") {
        let numberHour = Number(timestamp[i+1] + timestamp[i+2])
        setHourNumber(numberHour)
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
  const sevenDayTimeBreakdown = (data) =>{
    const overheadArray = []
    let firstArrayCutoff = 23 - hourNumber
    let firstArrayDone = false
    let firstArrayCounter = 0
    const firstArray = []
    let counter = 0
    let daysDone = 0
    let dayByDayArray = []
    let shouldSkip = false
    data.forEach(hour => {
        if(shouldSkip){
            return
        }
        if (firstArrayDone === false && firstArrayCounter < firstArrayCutoff) {
            firstArray.push(hour)
            firstArrayCounter++
        }else if (firstArrayDone === false && firstArrayCounter  === firstArrayCutoff) {
            firstArray.push(hour)
            firstArrayDone = true
            overheadArray.push(firstArray)
            return
        }
        if (counter < 24 && firstArrayDone ) {
            dayByDayArray.push(hour)
            counter++
        }else if (counter === 24 && firstArrayDone) {
            dayByDayArray.push(hour)
            overheadArray.push(dayByDayArray)
            dayByDayArray = []
            counter = 0
            daysDone++
        }
        if (daysDone === 6) {
            console.log(overheadArray, 'it should be working')
            setsevenDayForecast(overheadArray)
            shouldSkip = true
        }
    });
    return overheadArray
  }
  useEffect(() => {
    async function fetchData() {
        const data = await cityPrepData();
        console.log(cityData, "please no undefined");
        updateTime(state.weatherObj.time);
        const test = sevenDayTimeBreakdown(data)
        console.log(test, 'I IDD IT?!')
        setsevenDayForecast(test)

    } 
    fetchData()
  }, [state.metaLocation]);



  const handleOnClick = async () =>{
    console.log('hi')
    
    try {
      const hourlyWeatherObj = await getNowcastLong(state.metaLocation);
      console.log(hourlyWeatherObj, "lets see");
      // setNowcastLong(cityInfo.forecast);
      setTestSwitch(!testSwitch)
    } catch (error) {
      console.error(error);
    }
  };
  // Nested maps 
  //split data into 7 instances eg [[1], [2], [3], [4], [5], [6], [7]]
  //each number represents an object that can be mapped 
  //forEach -> map>
  //forEach in the accordian header
  //map in the accordian body

  return sevenDayForecast.length > 0 ? (
    <>
      <Container className="cityProfileContainer">
        <span>
          <h1>{state.weatherObj.city}</h1>
          {readableTime}
          <br></br>
          <Button onClick={handleOnClick}>{hourlyOrWeekly[testSwitch]}</Button>
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
      {testSwitch ? 'hi' : 'yo'}
      {sevenDayForecast.map((day, idx) => {
        // const dayOfTheWeekIndex = new Date(`${day.date} ${justTime}`);
        // let dayOfTheWeek = weekday[dayOfTheWeekIndex.getDay()];
        // // console.log(cityData, 'should be populated')
        // let dayNumber = dayOfTheWeekIndex.getDate();
        // let month = dayOfTheWeekIndex.toLocaleString("default", { month: "short" });
        // let toShow = month + " " + dayNumber;
        // let windDirectionAbbr = windDirection(day.windDir)
        // console.log(`./images/${day.symbol}.png`)
        return (
          <Accordion key={idx} defaultActiveKey={idx === 0 ? idx : null}>
            <Accordion.Item eventKey={idx}>
              <Accordion.Header>
                <Container>
                  <Row>
                    <Col>{idx}</Col>
                    <Col>
                      {/* <img className="miniIcon" src={require(`/public/images/${day.symbol}.png`)} alt="Current weather"/>
                      {day.maxTemp}°F/{day.minTemp}°F */}
                    </Col>
                  </Row>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <Container fluid>
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

export default CityProfile7Day;
