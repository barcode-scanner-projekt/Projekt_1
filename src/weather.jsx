import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=53.1&lon=-0.13&units=metric&appid=e6cce4265626ee46eb49814c1ec68e24"
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        setWeatherData(await res.json());
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return <p>Loading...</p>;

  return (
    <div>
      <h2>
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Condition: {weatherData.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="condition"
      />
      <p>
        Wind: {weatherData.wind.speed} m/s, Humidity:{" "}
        {weatherData.main.humidity}%
      </p>
    </div>
  );
};

export default Weather;
