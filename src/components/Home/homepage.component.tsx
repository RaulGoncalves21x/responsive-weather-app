import { useState } from "react";
import WeatherCastComponent from "../WeatherCast/weathercast.component";
import {
  LocationMainContainer,
  LocationInputContainer,
  LocationInputField,
} from "./homepage.style";

function HomePageComponent() {
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <>
      <LocationMainContainer>
        <LocationInputContainer>
          <i className="bi bi-search"></i>
          <LocationInputField placeholder="Search..." onChange={event => setSearchInputValue(event.target.value)} />
        </LocationInputContainer>
      </LocationMainContainer>
      <WeatherCastComponent city={searchInputValue} />
    </>
  );
}

export default HomePageComponent;
