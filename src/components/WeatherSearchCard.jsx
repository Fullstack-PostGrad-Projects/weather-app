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

    const weatherObj = {...searchWeatherResults}
    // console.log(weatherObj, 'what is passed in')

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
    <Card style={{ width: '18rem' }}>
    {isFavorite ? (
          <BsStarFill onClick={handleOnClick} size="2rem" />
        ) : (
          <BsStar onClick={handleOnClick} size="2rem" />
        )}
      <Card.Header>{readableTime}</Card.Header>
      <Link to='/cityprofile' state={{weatherObj: weatherObj, metaLocation: metaLocation}}><Card.Img variant="top" src={`./images/${weatherObj.symbol}.png`} /></Link>
      <Card.Body>
        {/* <Card.Title>{weatherObj.city ? `${weatherObj.cityName}, ${weatherObj.country}` : weatherObj.country}</Card.Title> */}
        <Card.Title>{weatherObj.formatted}</Card.Title>
        <Card.Text className="tempLine" id="tempBlock">
          
          <span id="bigText">{weatherObj.temperature}°F</span><small>Feels Like {weatherObj.feelsLikeTemp}°F</small>
          
        </Card.Text>
      </Card.Body>
      
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{weatherObj.windSpeed}mph {weatherObj.windDirString}</ListGroup.Item>
        {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">7 Days</Card.Link>
        <Card.Link href="#">14 Days</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default WeatherSearchCard