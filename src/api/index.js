export const getLocationFromSearch = async (searchTerm) => {
  try {
    console.log(process.env.REACT_APP_geoForwardAPI, "work please");
    console.log(searchTerm, "what I put in");
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${searchTerm}&limit=1&apiKey=${process.env.REACT_APP_geoForwardAPI}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(result, "the geolocation api");
    return result;
  } catch (error) {
    console.error(error);
  }
};

// export const requestOptions = {
//   method: 'GET',
// };

// fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=${process.env.REACT_APP_geoForwardAPI}`, requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

export const getMetadataFromCoordinates = async (lon, lat) => {
  try {
    const response = await fetch(
      `https://fnw-us.foreca.com/api/v1/location/${lon},${lat}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_forecaAPI}`,
        },
      }
    );
    const result = await response.json();
    // console.log(result, "the weather api");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherFromCoordinates = async (lon, lat) => {
  try {
    const response = await fetch(
      `https://fnw-us.foreca.com/api/v1/current/${lon},${lat}&tempunit=F&windunit=MPH`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_forecaAPI}`,
        },
      }
    );
    const result = await response.json();
    console.log(result, "the weather api");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getDailyForecast = async (location) => {
  try {
    const response = await fetch(
      `https://fnw-us.foreca.com/api/v1/forecast/daily/${location}&tempunit=F&windunit=MPH&periods=14&dataset=full`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_forecaAPI}`,
        },
      }
    );
    const result = await response.json();
    console.log(result, "the weather api");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getNowcastLong = async (location) => {
  try {
    const response = await fetch(
      `https://fnw-us.foreca.com//api/v1/forecast/15minutely/${location}&tempunit=F&windunit=MPH&periods=8&dataset=full`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_forecaAPI}`,
        },
      }
    );
    const result = await response.json();
    console.log(result, "the weather api");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getSevenDayForcast = async (location) => {
  try {
    const response = await fetch(
      `https://fnw-us.foreca.com//api/v1/forecast/hourly/${location}&tempunit=F&windunit=MPH&periods=168&dataset=full`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_forecaAPI}`,
        },
      }
    );
    const result = await response.json();
    console.log(result, "the weather api");
    return result;
  } catch (error) {
    console.error(error);
  }
};

// USER FUNCTIONS

export const BASE = `https://obscure-harbor-35179.herokuapp.com/api`;

export async function createUser(name, password) {
  try {
    const response = await fetch(`${BASE}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

export const getUser = async (id, token) => {
  const response = await fetch(`${BASE}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

export async function updateEmail(userId, updateObj) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateObj),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

export async function updateName(userId, updateObj) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateObj),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}
