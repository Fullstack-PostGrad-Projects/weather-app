import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import { getLocationFromSearch, getWeatherFromCoordinates } from "../api";
import Loading from "./Loading";
import Container from "react-bootstrap/Container";
import WeatherSearchCard from "./WeatherSearchCard";


const Geolocation = () =>{
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('')
    const [longitute, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [weatherImage, setWeatherImage] = useState('')
    const [searchWeatherResults, setSearchWeatherResults] = useState({})
    // const [cityName, setCityName] = useState('')





    // console.log(process.env.REACT_APP_forecaAPI, 'here')
    // console.log(process.env.REACT_APP_geoForwardAPI, 'why you working now')

    const  handleSubmit = async (event) =>{
        event.preventDefault()
        console.log(searchTerm, 'here I am')

        const searchLocation = await getLocationFromSearch(searchTerm)
        setLongitude(searchLocation.features[0].properties.lon)
        setLatitude(searchLocation.features[0].properties.lat)
        // setSearchTerm(searchLocation.features[0].properties.address_line1)

        const test = await getWeatherFromCoordinates(searchLocation.features[0].properties.lon, searchLocation.features[0].properties.lat)
        console.log(test, 'imagine')
        test.current.cityName = searchLocation.features[0].properties.address_line1
        test.current.country = searchLocation.features[0].properties.country
        test.current.formatted = searchLocation.features[0].properties.formatted
        test.current.city = searchLocation.features[0].properties.city



        setSearchWeatherResults(test.current)

        setIsLoading(true)


        //getting the relevant weather data

        /*
        

        */
        
    }

    
    return(
        <>
        <Container>
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
          {isLoading ? <WeatherSearchCard setIsLoading={setIsLoading} searchWeatherResults={searchWeatherResults}/> : <></>}
          </Container>
        </>
    )
}



export default Geolocation