/* import { useState } from "react";
 */ import WeatherForecastComponent from "../forecast/forecast.component";
import SearchLocationComponent from "../search//search.component";
import { useSearchParams } from "react-router-dom";

export type LocationType = {
  lat: string | null;
  lon: string | null;
};

function HomeComponent() {
  /* const [searchInputValue, setSearchInputValue] = useState<LocationType>({
    lat: 34.05223,
    lon: -118.24368,
  }); */
  const [locationCoords, setLocationCoords] = useSearchParams({
    lat: "34.05223",
    lon: "-118.24368",
  });

  const lat = locationCoords.get("lat");
  const lon = locationCoords.get("lon");

  return (
    <>
      <SearchLocationComponent setLocationCoords={setLocationCoords} />
      <WeatherForecastComponent locationCoords={{ lat, lon }} />
    </>
  );
}

export default HomeComponent;
