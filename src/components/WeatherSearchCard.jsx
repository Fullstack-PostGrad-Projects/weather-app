import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function WeatherSearchCard({searchWeatherResults, setIsLoading}) {
  const [readableTime, setReadableTime] = useState('')
    const weatherObj = {...searchWeatherResults}


    const updateTime = (timestamp)=>{
      let date = ''
      let time = ''

      for(let i = 0; i<timestamp.length; i++){
        date+= timestamp.charAt(i)
        if(timestamp.charAt(i) === 'T'){
          date = date.slice(0,i)
          time = timestamp.slice(i+1,i+6)
          setReadableTime(time.concat(' ' + date))
          console.log(time, date, 'dabiys')
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
        <Card.Text>
          {weatherObj.temperature}°F
          Feels Like {weatherObj.feelsLikeTemp}°F

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