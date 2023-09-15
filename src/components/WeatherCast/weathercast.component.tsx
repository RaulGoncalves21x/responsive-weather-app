import { useEffect, useState } from "react";

type WeatherCastComponentProps = {
  city: string;
};

type CitySpecificationsResponse = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

function WeatherCastComponent(props: WeatherCastComponentProps) {
  const { city } = props;
  const [weatherData, setWeatherData] = useState<CitySpecificationsResponse>();

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);

  /* fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${process.env.OPENWEATHER_API_KEY}`) */

  return (
    <>
      {weatherData ? (
        <>
          <p>
            {weatherData.name} {weatherData.country}
          </p>
          <p>
            {weatherData.lat} {weatherData.lon}
          </p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default WeatherCastComponent;
