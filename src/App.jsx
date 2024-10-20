import { useState } from 'react';
import Weather from './Weather';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'cca1f1d61930fc126710a7c18e1aef74'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) {
      setError('Please enter a city');
      return;
    }
    setError('');
    fetchWeather(city);
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          setError('Location access denied.');
        }
      );
    } else {
      setError('Geolocation not supported by your browser.');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      <button className="location-btn" onClick={getCurrentLocationWeather}>
        Get Weather by Current Location
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <Weather data={weatherData} />}
    </div>
  );
}

export default App;
