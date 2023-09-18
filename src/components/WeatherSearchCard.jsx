import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsStar, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  WiDirectionDownLeft,
  WiDirectionDownRight,
  WiDirectionDown,
  WiDirectionLeft,
  WiDirectionUp,
  WiDirectionRight,
  WiDirectionUpLeft,
  WiDirectionUpRight
} from "react-icons/wi";


// const WeatherIcon = windIconDictionary[weatherObj.windDirString]

function WeatherSearchCard({searchWeatherResults, setIsLoading, WeatherIcon, metaLocation}) {
  const [readableTime, setReadableTime] = useState('')
  const [isFavorite, setIsFavorite] = useState(false);


  const symbolBank = {
    'd000' : 'Clear',
    'd100' : 'Mostly clear',
    'd200' : 'Partly cloudy',
    'd210' : 'Partly cloudy and light rain',
    'd220' : 'Partly cloudy and showers',
    'd240' : 'Partly cloudy, thunderstorms with rain',
    'd211' : 'Partly cloudy and light wet snow',
    'd221' : 'Partly cloudy and wet snow showers',
    'd212' : 'Partly cloudy and light snow',
    'd222' : 'Partly cloudy and snow showers',
    'd300' : 'Cloudy',
    'd310' : 'Cloudy and light rain',
    'd320' : 'Cloudy and showers',
    'd340' : 'Cloudy, thunderstorms with rain',
    'd311' : 'Cloudy and light wet snow',
    'd321' : 'Cloudy and wet snow showers',
    'd312' : 'Cloudy and light snow',
    'd322' : 'Cloudy and snow showers',
    'd400' : 'Overcast',
    'd410' : 'Overcast and light rain',
    'd420' : 'Overcast showers',
    'd430' : 'Overcast and rain',
    'd440' : 'Overcast, thunderstorms with rain',
    'd411' : 'Overcast and light wet snow',
    'd421' : 'Overcast and wet snow showers',
    'd431' : 'Overcast and wet snow',
    'd412' : 'Overcast and light snow',
    'd422' : 'Overcast snow showers',
    'd432' : 'Overcast and snow',
    'd500' : 'Thin upper cloud',
    'd600' : 'Fog',
    'n000' : 'Clear',
    'n100' : 'Mostly clear',
    'n200' : 'Partly cloudy',
    'n210' : 'Partly cloudy and light rain',
    'n220' : 'Partly cloudy and showers',
    'n240' : 'Partly cloudy, thunderstorms with rain',
    'n211' : 'Partly cloudy and light wet snow',
    'n221' : 'Partly cloudy and wet snow showers',
    'n212' : 'Partly cloudy and light snow',
    'n222' : 'Partly cloudy and snow showers',
    'n300' : 'Cloudy',
    'n310' : 'Cloudy and light rain',
    'n320' : 'Cloudy and showers',
    'n340' : 'Cloudy, thunderstorms with rain',
    'n311' : 'Cloudy and light wet snow',
    'n321' : 'Cloudy and wet snow showers',
    'n312' : 'Cloudy and light snow',
    'n322' : 'Cloudy and snow showers',
    'n400' : 'Overcast',
    'n410' : 'Overcast and light rain',
    'n420' : 'Overcast showers',
    'n430' : 'Overcast and rain',
    'n440' : 'Overcast, thunderstorms with rain',
    'n411' : 'Overcast and light wet snow',
    'n421' : 'Overcast and wet snow showers',
    'n431' : 'Overcast and wet snow',
    'n412' : 'Overcast and light snow',
    'n422' : 'Overcast snow showers',
    'n432' : 'Overcast and snow',
    'n500' : 'Thin upper cloud',
    'n600' : 'Fog',
  }
    const weatherObj = {...searchWeatherResults}
    console.log(weatherObj.symbol, 'what is passed in')

    const updateTime = (timestamp)=>{
      let time = ''
      console.log(timestamp, 'what Im working with')
      for(let i = 0; i<timestamp.length; i++){
        if(timestamp.charAt(i) === 'T'){
          let isoDate = timestamp.slice(0,i)
          let isoTime = timestamp.slice(i+1, i+6)
          const date = new Date(isoDate.replace(/-/g, '\/')).toDateString()
          console.log(isoDate, 'datteeeee')
          console.log(date, 'hereeeeee')
          setReadableTime(date + ' ' + isoTime)
        }
      }
    }
    useEffect(()=>{
      updateTime(weatherObj.time)
    },[searchWeatherResults])
    
    
    const handleOnClick = (event) => {
      event.preventDefault();
      console.log("I was clicked");
      setIsFavorite(!isFavorite);
      console.log(metaLocation)
    };
    
    // const WeatherIcon = windIconDictionary[weatherObj.windDirString]

  return ( 
    <div className="weatherContainer">
    <Card style={{ width: '25rem' }}>
    {isFavorite ? (
          <BsStarFill onClick={handleOnClick} size="4rem" />
        ) : (
          <BsStar onClick={handleOnClick} size="4rem" />
        )}
      <Card.Header>{readableTime}</Card.Header>
      <Link to={`/cityprofile`} state={{weatherObj: weatherObj, metaLocation: metaLocation, symbolBank: symbolBank}}><Card.Img variant="top" src={`./images/${weatherObj.symbol}.png`} /></Link>
      <Card.Body className="cardBody">
        {/* <Card.Title>{weatherObj.city ? `${weatherObj.cityName}, ${weatherObj.country}` : weatherObj.country}</Card.Title> */}
        <Card.Title>{weatherObj.formatted}</Card.Title>
        <Card.Text className="tempLine tempBlock">
          
          <span id="bigText">{weatherObj.temperature}°F</span><small>Feels Like {weatherObj.feelsLikeTemp}°F</small>
          
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="testBox">
          {symbolBank[weatherObj.symbol]},
          {' '}
          {weatherObj.windSpeed}mph {weatherObj.windDirString}
        </ListGroup.Item>
        {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
      </ListGroup>
      <Card.Body className="dayOptions">
        <Link to={`/CityProfile7Day/${searchWeatherResults.city.toLowerCase()}`} state={{weatherObj: weatherObj, metaLocation: metaLocation, symbolBank: symbolBank}}>7 Days</Link>
        <Link to={`/cityprofile/${searchWeatherResults.city.toLowerCase()}`} state={{weatherObj: weatherObj, metaLocation: metaLocation, symbolBank: symbolBank}}>14 Days</Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default WeatherSearchCard