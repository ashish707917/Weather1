import React, { useState } from 'react';
import './Weather.css';

const api = {
  key: "7f007ade629621d70d0d038cf07b0ea8",
  base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod === "404") {
            setError("City not found. Please enter a valid city name.");
            setWeather({});
          } else {
            setWeather(result);
            setError('');
          }
          setQuery('');
          console.log(result);
        })
        .catch(() => {
          setError("An error occurred. Please try again.");
          setWeather({});
          setQuery('');
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Enter your city name'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={search}
          />
        </div>

        {error && (
          <div className='error-message'>{error}</div>
        )}

        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className='weather'>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
};

export default Weather;
