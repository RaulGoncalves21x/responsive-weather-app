import { useEffect, useState } from "react";
import {
  LocationMainContainer,
  LocationInputContainer,
  LocationInputField,
} from "./search.style.tsx";
import LocationDropdownComponent from "./location-dropdown/location-dropdown.component.tsx";
import { LocationType } from "../home/home.component.tsx";
import LoadingBackdrop from "../common/loading-backdrop.component.tsx";

type SearchLocationComponentProps = {
  setLocationCoords: (coords: LocationType) => void;
};

function SearchLocationComponent(props: SearchLocationComponentProps) {
  const { setLocationCoords } = props;
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (!showDropdown && shouldRender) {
      // Delay unmounting of 'LocationDropdownComponent' by a short duration
      // to allow for the transition effect to be seen and so the selection of a dropdown location is possible
      setTimeout(() => {
        toggleDropdownRender();
      }, 150);
    }
  }, [showDropdown]);

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
              setShowDropdown(false);
            }}
          />
          {shouldRender && (
            <LocationDropdownComponent
              active={showDropdown}
              setLocationCoords={setLocationCoords}
              fetchingSpecifiedCoordsStatus={setIsLoading}
            />
          )}
        </LocationInputContainer>
      </LocationMainContainer>
      <LoadingBackdrop loading={isLoading} />
    </>
  );
}

export default SearchLocationComponent;
