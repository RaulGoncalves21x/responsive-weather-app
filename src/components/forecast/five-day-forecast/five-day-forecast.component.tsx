import { useEffect, useState } from "react";
import { LocationType } from "../../home/home.component";
import {
  FiveDayComponent,
  FiveDayForecastWrapper,
} from "./five-day-forecast.style";

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

function returnDay(datetime: string, offsetInSeconds: number): string {
  const initialDate = new Date(datetime);
  const offsetMilliseconds = offsetInSeconds * 1000;
  const localTime = new Date(initialDate.getTime() + offsetMilliseconds);

  const day = localTime.toLocaleString("en-US", { day: "numeric" });
  const dayOfWeek = localTime.toLocaleDateString("en-US", { weekday: "short" });

  return `${dayOfWeek}, ${day}`;
}

function returnHour(datetime: string, offsetInSeconds: number): string {
  const initialDate = new Date(datetime);
  const offsetMilliseconds = offsetInSeconds * 1000;
  const localTime = new Date(initialDate.getTime() + offsetMilliseconds);

  const hour =
    localTime.getUTCHours().toString().length === 1
      ? `0${localTime.getUTCHours()}`
      : localTime.getUTCHours();
  const minute =
    localTime.getUTCMinutes().toString().length === 1
      ? `0${localTime.getUTCMinutes()}`
      : localTime.getUTCMinutes();

  return `${hour}:${minute}`;
}

type FiveDayForecastComponentProps = {
  locationCoords: LocationType;
  setLoadingState: (loadingState: boolean) => void;
  setErrorState: (errorState: boolean) => void;
  timezone?: number;
};

function FiveDayForecastComponent(props: FiveDayForecastComponentProps) {
  const { locationCoords, setLoadingState, setErrorState, timezone } = props;
  const [fiveDayWeatherData, setFiveDayWeatherData] =
    useState<FiveDayWeatherDataResponse>();

  useEffect(() => {
    if (!locationCoords) {
      return;
    }

    // Fetch five day forecast data
    async function fetchFiveDayForecastData() {
      setLoadingState(true);
      setErrorState(false);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${
            locationCoords.lat
          }&lon=${locationCoords.lon}&units=metric&appid=${
            import.meta.env.VITE_OPEN_WEATHER_API_KEY
          }`
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        const data: FiveDayWeatherDataResponse = await response.json();
        console.log("Five Day: ", data);
        setFiveDayWeatherData(data);
      } catch (error) {
        console.error("Error fetching five day weather data:", error);
        setErrorState(true);
      } finally {
        setLoadingState(false);
      }
    }

    fetchFiveDayForecastData();
  }, [locationCoords]);

  return (
    <>
      {fiveDayWeatherData && fiveDayWeatherData.list && timezone && (
        <FiveDayForecastWrapper>
          {fiveDayWeatherData.list.map((item) => (
            <FiveDayComponent key={item.dt_txt}>
              <span className="date">{returnDay(item.dt_txt, timezone)}</span>
              <span className="hour">{returnHour(item.dt_txt, timezone)}</span>
              <span className="weather">{item.weather[0].main}</span>
              <span className="temp">{item.main.temp}</span>
            </FiveDayComponent>
          ))}
        </FiveDayForecastWrapper>
      )}
    </>
  );
}

/* humidity: {item.main.humidity} | weather: {item.weather[0].main} |
weather desc: {item.weather[0].description} | rain prob:{" "}
{item.pop} | wind speed: {item.wind.speed} | wind deg:{" "}
{item.wind.deg} | */

export default FiveDayForecastComponent;
