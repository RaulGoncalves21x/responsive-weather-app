import { useState } from "react";
import { LocationType } from "../home/home.component";
import LoadingBackdrop from "../common/loading-backdrop.component";
import LocationComponent from "./location/location.component";
import CurrentWeatherComponent from "./current-forecast/current-forecast.component";
import FiveDayForecastComponent from "./five-day-forecast/five-day-forecast.component";
import { WeatherForecastMainContainer } from "./forecast.style";
import ErrorComponent from "./error/error.component";

type WeatherForecastComponentProps = {
  locationCoords?: LocationType;
};

function WeatherForecastComponent(props: WeatherForecastComponentProps) {
  const { locationCoords: locationCoords } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <WeatherForecastMainContainer>
      {locationCoords && !isError && (
        <>
          <LocationComponent
            locationCoords={locationCoords}
            setLoadingState={setIsLoading}
            setErrorState={setIsError}
          />
          <CurrentWeatherComponent
            locationCoords={locationCoords}
            setLoadingState={setIsLoading}
            setErrorState={setIsError}
          />
          <FiveDayForecastComponent
            locationCoords={locationCoords}
            setLoadingState={setIsLoading}
            setErrorState={setIsError}
          />
        </>
      )}
      {isError && <ErrorComponent />}
      <LoadingBackdrop loading={isLoading} />
    </WeatherForecastMainContainer>
  );
}

export default WeatherForecastComponent;
