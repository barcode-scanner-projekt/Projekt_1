import React, { useState, useEffect } from "react";
import "./weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e6cce4265626ee46eb49814c1ec68e24`
            );
            if (!res.ok) throw new Error("Failed to fetch data");
            setWeatherData(await res.json());
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        },
        (geoError) => {
          setError("Failed to get location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
    ];
    const months = [
      "januari",
      "februari",
      "mars",
      "april",
      "maj",
      "juni",
      "juli",
      "augusti",
      "september",
      "oktober",
      "november",
      "december",
    ];
    return `${days[date.getDay()]} ${date.getDate()} ${
      months[date.getMonth()]
    }`;
  };

  if (loading) return <p className="text-white text-xl">Loading...</p>;
  if (error) return <p className="text-red-500 text-xl">Error: {error}</p>;
  if (!weatherData)
    return <p className="text-gray-400 text-xl">No weather data available</p>;

  return (
    <div className="h-80 bg-gradient-to-b from-black/40 to-fuchsia-800/50 p-8 rounded-3xl 
		shadow-2xl text-left text-white w-[35rem] backdrop-blur-md shadow-fuchsia-950 mx-auto">
      <div className="absolute top-4 left-4">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="condition"
          className="w-40 h-50"
        />
      </div>
      <div className="pl-36">
        <div className="text-xl font-bold mb-1 text-fuchsia-500">
          {formatDate(currentTime)}
        </div>

        <div className="text-6xl font-extrabold mb-3">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>

        <div className="text-xl font-extrabold mb-1 text-cyan-500">
          {"LUNCH: 11:00-13:00"}
        </div>

        <p className="text-5xl font-extrabold mb-2 e1">
          {Math.round(weatherData.main.temp)}°
        </p>
      </div>
    </div>
  );
};

export default Weather;
