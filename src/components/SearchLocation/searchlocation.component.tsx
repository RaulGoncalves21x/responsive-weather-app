import { useEffect, useState } from "react";
import {
  LocationMainContainer,
  LocationInputContainer,
  LocationInputField,
} from "./searchlocation.style.tsx";
import LocationDropdownComponent from "./LocationDropdown/locationdropdown.component.tsx";
import { LocationType } from "../Home/homepage.component.tsx";

type SearchLocationComponentProps = {
  setLocationCoords: (location: LocationType) => void;
};

function SearchLocationComponent(props: SearchLocationComponentProps) {
  const { setLocationCoords } = props;

  const [shouldRender, setShouldRender] = useState(false);
  const toggleDropdownRender = () => {
    setShouldRender(!shouldRender);
  };
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      // Delay applying the 'visible' class to allow for the transition effect to be seen
      setTimeout(() => {
        setShowDropdown(true);
      }, 100);
    } else {
      setShowDropdown(false);
    }
  }, [shouldRender]);

  return (
    <>
      <LocationMainContainer>
        <LocationInputContainer>
          <i className="bi bi-search"></i>
          <LocationInputField
            placeholder="Search..."
            onFocus={toggleDropdownRender}
            onBlur={toggleDropdownRender}
          />
          {shouldRender && <LocationDropdownComponent active={showDropdown} />}
        </LocationInputContainer>
      </LocationMainContainer>
    </>
  );
}

export default SearchLocationComponent;
