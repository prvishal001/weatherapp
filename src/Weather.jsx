import React from 'react';

function Weather({ data }) {
  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

  return (
    <div className="weather-container">
      <h2>Weather in {name}, {sys.country}</h2>
      <div className="weather-info">
        <div className="weather-main">
          <img src={iconUrl} alt={weather[0].description} />
          <p>{weather[0].description}</p>
        </div>
        <div className="weather-details">
          <p>Temperature: <span>{main.temp}°C</span></p>
          <p>Feels like: <span>{main.feels_like}°C</span></p>
          <p>Humidity: <span>{main.humidity}%</span></p>
          <p>Wind Speed: <span>{wind.speed} m/s</span></p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
