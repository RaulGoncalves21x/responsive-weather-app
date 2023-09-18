import { useState } from "react";
import WeatherCastComponent from "../WeatherCast/weathercast.component";
import SearchLocationComponent from "../SearchLocation/searchlocation.component";

function HomePageComponent() {
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <>
      <SearchLocationComponent setLocation={setSearchInputValue} />
      <WeatherCastComponent city={searchInputValue} />
    </>
  );
}

export default HomePageComponent;
