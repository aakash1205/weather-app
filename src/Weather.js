import React, { useState } from "react";
import axios from "axios";
import "./Weather.css"; // Add this CSS file for different backgrounds

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "38f6759f3597c9c875273068901278df"; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  // Function to get background based on temperature
  const getBackgroundClass = () => {
    if (!weather) return "default-bg"; // Default background if no weather info

    const temp = weather.main.temp;
    if (temp > 30) {
      return "hot-bg"; // Hot weather
    } else if (temp >= 15 && temp <= 30) {
      return "warm-bg"; // Warm weather
    } else if (temp < 15) {
      return "cold-bg"; // Cold weather
    }
  };

  return (
    <div className={`weather-container ${getBackgroundClass()}`}>
      <h1>Weather Tracker</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
