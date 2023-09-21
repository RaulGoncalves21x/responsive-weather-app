import { useState, useEffect } from "react";
import { LocationType } from "../../home/home.component";
import { LocationSpecification } from "../forecast.component";
import {
  CurrentForecastWrapper,
  ForecastPrimaryData,
  ForecastSecondaryData,
} from "./current-forecast.style";

type CurrentForecastDataResponse = {
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
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
};

type CurrentForecastComponentProps = {
  locationCoords: LocationType;
  setLocationSpecification: (
    LocationSpecification: LocationSpecification
  ) => void;
  setLoadingState: (loadingState: boolean) => void;
  setErrorState: (errorState: boolean) => void;
};

function CurrentForecastComponent(props: CurrentForecastComponentProps) {
  const {
    locationCoords,
    setLocationSpecification,
    setLoadingState,
    setErrorState,
  } = props;
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentForecastDataResponse>();

  useEffect(() => {
    if (!locationCoords) {
      return;
    }

    // Fetch current forecast data and specified location
    async function fetchCurrentForecastData() {
      setLoadingState(true);
      setErrorState(false);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            locationCoords.lat
          }&lon=${locationCoords.lon}&units=metric&appid=${
            import.meta.env.VITE_OPEN_WEATHER_API_KEY
          }`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        const data: CurrentForecastDataResponse = await response.json();
        console.log("Current: ", data);
        setCurrentWeatherData(data);
        setLocationSpecification({
          name: data.name,
          sys: {
            country: data.sys.country,
          },
          timezone: data.timezone,
        });
      } catch (error) {
        console.error("Error fetching current weather data:", error);
        setErrorState(true);
      } finally {
        setLoadingState(false);
      }
    }

    fetchCurrentForecastData();
  }, [locationCoords]);

  return (
    <>
      {currentWeatherData && currentWeatherData.main && (
        <CurrentForecastWrapper>
          <ForecastPrimaryData>
            <div>weather: {currentWeatherData.weather[0].main}</div>
            <div>temp: {currentWeatherData.main.temp} </div>
            <div>weather desc: {currentWeatherData.weather[0].description}</div>
          </ForecastPrimaryData>
          <ForecastSecondaryData>
            <div>humidity: {currentWeatherData.main.humidity}</div>
            <div>wind speed: {currentWeatherData.wind.speed}</div>
            <div>wind deg: {currentWeatherData.wind.deg}</div>
            <div>sunrise: {currentWeatherData.sys.sunrise}</div>
            <div>sunset: {currentWeatherData.sys.sunset}</div>
          </ForecastSecondaryData>
        </CurrentForecastWrapper>
      )}
    </>
  );
}

export default CurrentForecastComponent;
