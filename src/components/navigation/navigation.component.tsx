import { Outlet } from "react-router-dom";
import { LogoContainer, NavigationContainer } from "./navigation.style";
import Logo from "../../assets/weatherwise.png";

function NavigationComponent() {
  return (
    <>
      <NavigationContainer>
        <LogoContainer>
          <img src={Logo} />
          <span>WeatherWise</span>
        </LogoContainer>
      </NavigationContainer>
      <Outlet />
    </>
  );
}

export default NavigationComponent;
