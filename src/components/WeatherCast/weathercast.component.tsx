import {  useEffect, useState } from "react";

type WeatherCastComponentProps = {
  city: string;
};

type CitySpecificationsResponse = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

type WeatherDataResponse = {
  list: [
    {
      dt_txt: string;
      main: {
        temp: number;
        feels_like: number;
        humidity: number;
      };
      weather: [
        {
          main: string;
          description: string;
          icon: string;
        }
      ];
      wind: {
        speed: number;
        deg: number;
      };
    }
  ];
};

function WeatherCastComponent(props: WeatherCastComponentProps) {
  const { city } = props;
  const [selectedCitySpecifications, setSelectedCitySpecifications] =
    useState<CitySpecificationsResponse>();
  const [weatherData, setWeatherData] = useState<WeatherDataResponse>();

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedCitySpecifications(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  }, [city]);

  useEffect(() => {
    if (!selectedCitySpecifications) {
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        selectedCitySpecifications.lat
      }&lon=${selectedCitySpecifications.lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [selectedCitySpecifications]);

  return (
    <div style={{color: "green"}}>
      {selectedCitySpecifications ? (
        <>
          <p>
            {selectedCitySpecifications.name}{" "}
            {selectedCitySpecifications.country}
          </p>
          <p>
            {selectedCitySpecifications.lat} {selectedCitySpecifications.lon}
          </p>
        </>
      ) : (
        <div>Loading city data...</div>
      )}
      {weatherData && weatherData.list ? (
        weatherData.list.map((weatherData) => (
          <p key={weatherData.dt_txt}>
            {weatherData.dt_txt}{" "}
            {weatherData.main.temp}{" "}
            {weatherData.main.feels_like}{" "}
            {weatherData.main.humidity}{" "}
          </p>
        ))
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
}

export default WeatherCastComponent;
