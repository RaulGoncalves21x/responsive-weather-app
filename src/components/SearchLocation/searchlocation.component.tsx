import { useEffect, useState } from "react";
import {
  LocationMainContainer,
  LocationInputContainer,
  LocationInputField,
} from "./searchlocation.style.tsx";
import LocationDropdownComponent from "./LocationDropdown/locationdropdown.component.tsx";
import { LocationType } from "../Home/homepage.component.tsx";

type SearchLocationComponentProps = {
  setLocationCoords: (coords: LocationType) => void;
};

function SearchLocationComponent(props: SearchLocationComponentProps) {
  const { setLocationCoords } = props;
  const [searchValue, setSearchValue] = useState("");

  const [shouldRender, setShouldRender] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdownRender = () => {
    setShouldRender(!shouldRender);
  };

  useEffect(() => {
    if (shouldRender) {
      // Delay setting 'showDropdown' to true to allow for the transition effect to be seen
      setTimeout(() => {
        setShowDropdown(true);
      }, 100);
    }
  }, [shouldRender]);

  /*   useEffect(() => {
    if (!showDropdown && shouldRender) {
      // Delay remotion of 'LocationDropdownComponent' to allow for the transition effect to be seen
      setTimeout(() => {
        toggleDropdownRender();
      }, 150);
    }
  }, [showDropdown]); */

  return (
    <>
      <LocationMainContainer>
        <LocationInputContainer>
          <i className="bi bi-search"></i>
          <LocationInputField
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={toggleDropdownRender}
            onBlur={() => {
              toggleDropdownRender();
              setShowDropdown(false);
            }}
          />
          <LocationDropdownComponent
            active={showDropdown}
            setLocationCoords={setLocationCoords}
          />
          {/* {shouldRender && (
          )} */}
        </LocationInputContainer>
      </LocationMainContainer>
    </>
  );
}

export default SearchLocationComponent;
