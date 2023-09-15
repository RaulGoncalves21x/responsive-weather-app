import { Outlet } from "react-router-dom";
import { LogoContainer, NavigationContainer } from "./navbar.style";
import Logo from "../../assets/weatherwise.png";

function NavBarComponent() {
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

export default NavBarComponent;
