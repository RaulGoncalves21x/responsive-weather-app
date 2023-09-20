import { useState, useEffect } from "react";
import { LocationType } from "../../home/home.component";

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

type CurrentWeatherComponentProps = {
  locationCoords: LocationType;
  setLoadingState: (loadingState: boolean) => void;
  setErrorState: (errorState: boolean) => void;
};

function CurrentWeatherComponent(props: CurrentWeatherComponentProps) {
  const { locationCoords, setLoadingState, setErrorState } = props;
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherDataResponse>();

  useEffect(() => {
    if (!locationCoords) {
      return;
    }

    // Fetch current forecast data
    async function fetchCurrentForecastData() {
      setLoadingState(true);
      setErrorState(false);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            locationCoords.lat
          }&lon=${locationCoords.lon}&appid=${
            import.meta.env.VITE_OPEN_WEATHER_API_KEY
          }`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        const data = await response.json();
        console.log("Current: ", data);
        setCurrentWeatherData(data);
      } catch (error) {
        console.error("Error fetching current weather data:", error);
        setErrorState(true);
      } finally {
        setLoadingState(false); // Set loading to false when all fetching is done
      }
    }

    fetchCurrentForecastData();
  }, [locationCoords]);

  /* useEffect(() => {
    if (!locationCoords) {
      return;
    }
    setLoadingState(true);
    setErrorState(false);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        locationCoords.lat
      }&lon=${locationCoords.lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Current: ", data);
        setCurrentWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching current weather data:", error);
        setErrorState(true);
      })
      .finally(() => {
        setLoadingState(false); // Set loading to false when all fetching is done
      });
  }, [locationCoords]); */

  return (
    <>
      {currentWeatherData && currentWeatherData.main && (
        <>
          <h1>PREVISÃO ATUAL:</h1>
          <p>
            temp: {currentWeatherData.main.temp} | felt temp:{" "}
            {currentWeatherData.main.feels_like} | humidity:{" "}
            {currentWeatherData.main.humidity} | weather:{" "}
            {currentWeatherData.weather[0].main} | weather desc:{" "}
            {currentWeatherData.weather[0].description} | wind speed:{" "}
            {currentWeatherData.wind.speed} | wind deg:{" "}
            {currentWeatherData.wind.deg} |
          </p>
        </>
      )}
    </>
  );
}

export default CurrentWeatherComponent;
