import { useState } from "react";
import WeatherCastComponent from "../forecast/forecast.component";
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
      <WeatherCastComponent cityCoords={searchInputValue} />
    </>
  );
}

export default HomeComponent;
