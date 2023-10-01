import { useState, useEffect } from "react";
import { LocationType } from "../../home/home.component";
import { LocationSpecification } from "../forecast.component";
import {
  CurrentForecastWrapper,
  ForecastPrimaryData,
  ForecastSecondaryData,
} from "./current-forecast.style";
import WeatherIconComponent from "../weather-icon.component";
import {
  getCurrentHourFromOffset,
  getTimeFromUnixWithOffset,
} from "../../../utils/helpers";

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
            <div>
              <WeatherIconComponent
                weather={currentWeatherData.weather[0].main}
                hour={getCurrentHourFromOffset(currentWeatherData.timezone)}
              />
            </div>
            <div>
              <span>{Math.round(currentWeatherData.main.temp)}&deg;</span>
              <span>{currentWeatherData.weather[0].description}</span>
            </div>
          </ForecastPrimaryData>
          <ForecastSecondaryData>
            <div>
              <span>{currentWeatherData.main.humidity}</span>
              <span>Humidity</span>
            </div>
            <div>
              <span>{currentWeatherData.wind.speed}</span>
              <span>Wind</span>
            </div>
            <div>
              <span>
                {getTimeFromUnixWithOffset(
                  currentWeatherData.sys.sunrise,
                  currentWeatherData.timezone
                )}
              </span>
              <span>Sunrise</span>
            </div>
            <div>
              <span>{currentWeatherData.wind.deg}</span>
              <span>wind deg</span>
            </div>
            <div>
              <span>{currentWeatherData.wind.deg}</span>
              <span>wind deg</span>
            </div>
            <div>
              <span>
                {getTimeFromUnixWithOffset(
                  currentWeatherData.sys.sunset,
                  currentWeatherData.timezone
                )}
              </span>
              <span>sunset</span>
            </div>
          </ForecastSecondaryData>
        </CurrentForecastWrapper>
      )}
    </>
  );
}

export default CurrentForecastComponent;
