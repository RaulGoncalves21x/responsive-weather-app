import { useEffect, useState } from "react";
import { LocationType } from "../../home/home.component";

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

type FiveDayForecastComponentProps = {
  locationCoords: LocationType;
  setLoadingState: (loadingState: boolean) => void;
  setErrorState: (errorState: boolean) => void;
};

function FiveDayForecastComponent(props: FiveDayForecastComponentProps) {
  const { locationCoords, setLoadingState, setErrorState } = props;
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
          }&lon=${locationCoords.lon}&appid=${
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

  /* useEffect(() => {
    if (!locationCoords) {
      return;
    }
    setLoadingState(true);
    setErrorState(false);

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        locationCoords.lat
      }&lon=${locationCoords.lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data: FiveDayWeatherDataResponse) => {
        console.log("Five Day: ", data);
        setFiveDayWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching five day weather data:", error);
        setErrorState(true);
      })
      .finally(() => {
        setLoadingState(false); // Set loading to false when all fetching is done
      });
  }, [locationCoords]); */

  return (
    <>
      {fiveDayWeatherData && fiveDayWeatherData.list && (
        <>
          <h1>PREVISÃO 5 DIAS:</h1>
          {fiveDayWeatherData.list.map((item) => (
            <p key={item.dt_txt}>
              date: {item.dt_txt} | temp: {item.main.temp} | felt temp:{" "}
              {item.main.feels_like} | humidity: {item.main.humidity} | weather:{" "}
              {item.weather[0].main} | weather desc:{" "}
              {item.weather[0].description} | rain prob: {item.pop} | wind
              speed: {item.wind.speed} | wind deg: {item.wind.deg} |
            </p>
          ))}
        </>
      )}
    </>
  );
}

export default FiveDayForecastComponent;
