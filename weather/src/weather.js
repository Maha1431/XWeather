import React, { useEffect, useState } from "react";
import axios from "axios";
import "./weather.css";

function Weather() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  


  const apiKey = "edda11a73b81466b905151133232711";
  const apiUrl = "https://api.weatherapi.com/v1/current.json";

  const fetchData = async () => {
    try {
        setLoading(true);
      const response = await axios.get(apiUrl, {
        params: {
          key: apiKey,
          q: cityName,
        },
      });

      setWeatherData(response.data);
     
    } catch (error) {
      setWeatherData(null);
      window.alert("Failed to fetch weather data");
       
    }
    finally{
        setLoading(false)
    }
  };



  return (
    <div className="container">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          className="input"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={fetchData} className="button">
          Search
        </button>
      </div>

      {loading && <p>Loading data...</p>}

       {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature </p>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity</p>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition</p>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed</p>
            <p> {weatherData.current.wind_kph}km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
