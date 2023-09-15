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

type CurrentWeatherDataResponse = {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  wind: {
    speed: number;
    deg: number;
  };
};

type FiveDayWeatherDataResponse = {
  city: {
    sunrise: number;
    sunset: number;
  };
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
        }
      ];
      pop: number;
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
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherDataResponse>();
  const [fiveDayWeatherData, setFiveDayWeatherData] =
    useState<FiveDayWeatherDataResponse>();

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
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        selectedCitySpecifications.lat
      }&lon=${selectedCitySpecifications.lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching current weather data:", error);
      });

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
        setFiveDayWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching five day weather data:", error);
      });
  }, [selectedCitySpecifications]);

  return (
    <div style={{ color: "white" }}>
      {selectedCitySpecifications ? (
        <>
          <h1>CIDADE:</h1>
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
      <>
        <h1>PREVISÃO ATUAL:</h1>
        {currentWeatherData ? (
          <p>
            temp: {currentWeatherData.main.temp} | felt temp:{" "}
            {currentWeatherData.main.feels_like} | humidity:{" "}
            {currentWeatherData.main.humidity} | weather:{" "}
            {currentWeatherData.weather[0].main} | weather desc:{" "}
            {currentWeatherData.weather[0].description} | wind speed:{" "}
            {currentWeatherData.wind.speed} | wind deg:{" "}
            {currentWeatherData.wind.deg} |
          </p>
        ) : (
          <div>Loading weather data...</div>
        )}
      </>
      <>
        <h1>PREVISÃO 5 DIAS:</h1>
        {fiveDayWeatherData && fiveDayWeatherData.list ? (
          fiveDayWeatherData.list.map((fiveDayWeatherData) => (
            <p key={fiveDayWeatherData.dt_txt}>
              date: {fiveDayWeatherData.dt_txt} | temp:{" "}
              {fiveDayWeatherData.main.temp} | felt temp:{" "}
              {fiveDayWeatherData.main.feels_like} | humidity:{" "}
              {fiveDayWeatherData.main.humidity} | weather:{" "}
              {fiveDayWeatherData.weather[0].main} | weather desc:{" "}
              {fiveDayWeatherData.weather[0].description} | rain prob:{" "}
              {fiveDayWeatherData.pop} | wind speed:{" "}
              {fiveDayWeatherData.wind.speed} | wind deg:{" "}
              {fiveDayWeatherData.wind.deg} |
            </p>
          ))
        ) : (
          <div>Loading weather data...</div>
        )}
      </>
    </div>
  );
}

export default WeatherCastComponent;
