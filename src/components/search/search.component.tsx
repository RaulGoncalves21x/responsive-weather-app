import { useEffect, useState } from "react";
import {
  LocationMainContainer,
  LocationInputContainer,
  LocationInputField,
} from "./search.style.tsx";
import LocationDropdownComponent from "./location-dropdown/location-dropdown.component.tsx";
import LoadingBackdrop from "../common/loading-backdrop.component.tsx";

export type LocationsAPIResponse = {
  results: [
    {
      geo: {
        name: string;
        cc: string;
        type: string;
        center: {
          latitude: number;
          longitude: number;
        };
      };
    }
  ];
};

type SearchLocationComponentProps = {
  setLocationCoords: (coords: URLSearchParams) => void;
};

function SearchLocationComponent(props: SearchLocationComponentProps) {
  const { setLocationCoords } = props;
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<LocationsAPIResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const [shouldRender, setShouldRender] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdownRender = () => {
    setShouldRender(!shouldRender);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${import.meta.env.VITE_FOURSQUARE_PLACES_API_KEY}`,
      },
    };

    fetch(
      `https://api.foursquare.com/v3/autocomplete?query=${searchValue}&types=geo&bias=geo`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSearchResult(response))
      .catch((err) => console.error(err));
  }, [searchValue]);

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
              searchResult={searchResult}
            />
          )}
        </LocationInputContainer>
      </LocationMainContainer>
      <LoadingBackdrop loading={isLoading} />
    </>
  );
}

export default SearchLocationComponent;
