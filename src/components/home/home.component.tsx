import { useState } from "react";
import WeatherForecastComponent from "../forecast/forecast.component";
import SearchLocationComponent from "../search//search.component";

export type LocationType = {
  lat: number;
  lon: number;
};

function HomeComponent() {
  const [searchInputValue, setSearchInputValue] = useState<LocationType>({
    lat: 34.05223,
    lon: -118.24368,
  });

  return (
    <>
      <SearchLocationComponent setLocationCoords={setSearchInputValue} />
      <WeatherForecastComponent locationCoords={searchInputValue} />
    </>
  );
}

export default HomeComponent;
