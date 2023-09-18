import { useState } from "react";
import WeatherCastComponent from "../WeatherCast/weathercast.component";
import SearchLocationComponent from "../SearchLocation/searchlocation.component";

export type LocationType = {
  lat: number;
  lon: number;
};

function HomePageComponent() {
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

export default HomePageComponent;
