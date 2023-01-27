import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function WeatherSearchCard({searchWeatherResults, setIsLoading}) {
  const [readableTime, setReadableTime] = useState('')
    const weatherObj = {...searchWeatherResults}


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
  


  return ( 
    <div className="weatherContainer">
    <Card style={{ width: '18rem' }}>
      <Card.Header>{readableTime}</Card.Header>
      <Card.Img variant="top" src={`./images/${weatherObj.symbol}.png`} />
      <Card.Body>
        <Card.Title>{weatherObj.city ? `${weatherObj.city}, ${weatherObj.country}` : weatherObj.country}</Card.Title>
        <Card.Text className="tempLine">
          {weatherObj.temperature}°F
          <small>Feels Like {weatherObj.feelsLikeTemp}°F</small>

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