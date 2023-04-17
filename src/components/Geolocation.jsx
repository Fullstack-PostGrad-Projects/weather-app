import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import {
  getLocationFromSearch,
  getWeatherFromCoordinates,
  getMetadataFromCoordinates,
} from "../api";
import Loading from "./Loading";
import Container from "react-bootstrap/Container";
import WeatherSearchCard from "./WeatherSearchCard";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

function GeoapifyForm({ onPlaceSelect, onSuggestionChange }) {
  return (
    <GeoapifyContext apiKey={process.env.REACT_APP_geoForwardAPI}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter city here"
        type="city"
        lang="en"
        limit={5}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggestionChange}
        // onUserInput={() => {
        //   console.log('mooo');
        // }}
      />
    </GeoapifyContext>
  );
}

const Geolocation = ({ button, setButton }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [longitute, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherImage, setWeatherImage] = useState("");
  const [searchWeatherResults, setSearchWeatherResults] = useState({});
  const [WeatherIcon, setWeatherIcon] = useState("");
  const [metaLocation, setMetaLocation] = useState(0);
  // const [cityName, setCityName] = useState('')

  const windIconDictionary = {
    S: "WiDirectionDown",
    W: "WiDirectionLeft",
    N: "WiDirectionUp",
    E: "WiDirectionRight",
    SW: "WiDirectionDownLeft",
    SE: "WiDirectionDownRight",
    NW: "WiDirectionUpLeft",
    NE: "WiDirectionUpRight",
  };

  // console.log(process.env.REACT_APP_forecaAPI, 'here')
  // console.log(process.env.REACT_APP_geoForwardAPI, 'why you working now')


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event, "what I am now working withhh");
    console.log(searchTerm, "here I am");

    const searchLocation = await getLocationFromSearch(searchTerm);
    setLongitude(searchLocation.features[0].properties.lon);
    setLatitude(searchLocation.features[0].properties.lat);
    // setSearchTerm(searchLocation.features[0].properties.address_line1)

    const test = await getWeatherFromCoordinates(
      searchLocation.features[0].properties.lon,
      searchLocation.features[0].properties.lat
    );
    console.log(test, "imagine");
    test.current.cityName = searchLocation.features[0].properties.address_line1;
    test.current.country = searchLocation.features[0].properties.country;
    test.current.formatted = searchLocation.features[0].properties.formatted;
    test.current.city = searchLocation.features[0].properties.city;
    const weatherIcon = windIconDictionary[test.current.windDirString];

    setSearchWeatherResults(test.current);

    setIsLoading(true);
    setWeatherIcon(weatherIcon);

    //getting the relevant weather data
    const metaData = await getMetadataFromCoordinates(
      searchLocation.features[0].properties.lon,
      searchLocation.features[0].properties.lat
    );
    console.log(metaData, "the location is somewhere");
    setMetaLocation(metaData.id);
  };

  const handlePlaceSelect = (event) => {
    console.log("Selected place:", event);
    setSearchTerm(event.properties.formatted)
  };

  const handleSuggestionChange = (event) => {
    console.log("Suggested places:", event);
  };

  return (
    <>
      <Container className="box">
        <h1>Hello World!</h1>
        <Form className="d-flex me-2" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as={GeoapifyForm}
              onPlaceSelect={handlePlaceSelect}
              onSuggestionChange={handleSuggestionChange}
            />
          </Form.Group>
          <Button variant="outline-info" type="submit">
            Search
          </Button>
        </Form>
        {isLoading ? (
          <WeatherSearchCard
            setIsLoading={setIsLoading}
            searchWeatherResults={searchWeatherResults}
            WeatherIcon={WeatherIcon}
            metaLocation={metaLocation}
          />
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Geolocation;
