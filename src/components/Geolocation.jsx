import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { getLocationFromSearch, getWeatherFromCoordinates } from "../api";
import Loading from "./Loading";

const Geolocation = () =>{
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('')
    const [longitute, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [isLoading, setIsLoading] = useState(false)





    // console.log(process.env.REACT_APP_forecaAPI, 'here')
    // console.log(process.env.REACT_APP_geoForwardAPI, 'why you working now')

    const  handleSubmit = async (event) =>{
        event.preventDefault()
        console.log(searchTerm, 'here I am')
        const searchLocation = await getLocationFromSearch(searchTerm)
        setLongitude(searchLocation.features[0].properties.lon)
        setLatitude(searchLocation.features[0].properties.lat)

        const test = await getWeatherFromCoordinates(searchLocation.features[0].properties.lon, searchLocation.features[0].properties.lat)
        console.log(test, 'imagine')
        // console.log(searchLocation.features[0].properties.lon, 'this is it!')
        // setLocation(searchLocation)

    }

    
    return(
        <>
        <h1>Hello World!</h1>
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(event)=>{setSearchTerm(event.target.value)}}
            />
            <Button variant="outline-info">Search</Button>
          </Form>
        </>
    )
}



export default Geolocation