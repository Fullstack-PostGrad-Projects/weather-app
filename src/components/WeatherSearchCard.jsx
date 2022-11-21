import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function WeatherSearchCard({searchWeatherResults, setIsLoading}) {
    const weatherObj = {...searchWeatherResults}

  


  return ( 
    <div className="weatherContainer">
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`./images/${weatherObj.symbol}.png`} />
      <Card.Body>
        <Card.Title>{weatherObj.city ? `${weatherObj.city}, ${weatherObj.country}` : weatherObj.country}</Card.Title>
        <Card.Text>
          {weatherObj.temperature}°F
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