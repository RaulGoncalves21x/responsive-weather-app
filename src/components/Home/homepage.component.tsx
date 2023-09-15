import WeatherCastComponent from "../WeatherCast/weathercast.component";
import {
  LocationMainContainer,
  LocationInputContainer,
  LocationInputField,
} from "./homepage.style";

function HomePageComponent() {
  return (
    <>
      <LocationMainContainer>
        <LocationInputContainer>
          <i className="bi bi-search"></i>
          <LocationInputField placeholder="Search..." />
        </LocationInputContainer>
      </LocationMainContainer>
      <WeatherCastComponent city="Coimbra" />
    </>
  );
}

export default HomePageComponent;
