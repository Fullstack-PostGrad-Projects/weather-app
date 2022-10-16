export const getLocationFromSearch = async (searchTerm) => {
    try {
      const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${searchTerm}&limit=1&apiKey=${process.env.REACT_APP_geoForwardAPI}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result, 'the geolocation api')
      return result;
    } catch (error) {
      console.error(error);
    }
  };

export const getMetadataFromCoordinates = async (lon, lat) => {
    try {
      const response = await fetch(`https://fnw-us.foreca.com/api/v1/location/${lon},${lat}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_forecaAPI}`,

        },
      });
      const result = await response.json();
      console.log(result, 'the weather api')
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  export const getWeatherFromCoordinates = async (lon, lat) => {
    try {

      const response = await fetch(`https://fnw-us.foreca.com/api/v1/current/${lon},${lat}&tempunit=F&windunit=MPH`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_forecaAPI}`,

        },
      });
      const result = await response.json();
      console.log(result, 'the weather api')
      return result;
    } catch (error) {
      console.error(error);
    }
  };

