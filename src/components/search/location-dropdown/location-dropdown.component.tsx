import { LocationsAPIResponse } from "../search.component";
import {
  CurrentLocationDropdownOption,
  BaseDropdownOption,
  LocationDropdown,
} from "./location-dropdown.style";

type LocationDropdownComponentProps = {
  active?: boolean;
  searchResult?: LocationsAPIResponse;
  fetchingSpecifiedCoordsStatus: (status: boolean) => void;
  setLocationCoords: (coords: URLSearchParams) => void;
};

function LocationDropdownComponent(props: LocationDropdownComponentProps) {
  const {
    active,
    searchResult,
    setLocationCoords,
    fetchingSpecifiedCoordsStatus,
  } = props;

  const fetchUserLocation = () => {
    console.log("Clicked on Use Current Location");
    fetchingSpecifiedCoordsStatus(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          const newSearchParams = new URLSearchParams();
          newSearchParams.set("lat", latitude.toString());
          newSearchParams.set("lon", longitude.toString());
          setLocationCoords(newSearchParams);

          fetchingSpecifiedCoordsStatus(false);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LocationDropdown active={active}>
      <CurrentLocationDropdownOption onClick={fetchUserLocation}>
        <i className="bi bi-geo-fill"></i>Use Current Location
      </CurrentLocationDropdownOption>
      {searchResult &&
        searchResult.results.map((result) => {
          if (result.geo.type === "country") {
            return;
          }

          return (
            <BaseDropdownOption
              key={result.geo.name}
              onClick={() => {
                const newSearchParams = new URLSearchParams();
                newSearchParams.set(
                  "lat",
                  result.geo.center.latitude.toString()
                );
                newSearchParams.set(
                  "lon",
                  result.geo.center.longitude.toString()
                );
                setLocationCoords(newSearchParams);
              }}
            >
              {result.geo.name}, {result.geo.cc}
            </BaseDropdownOption>
          );
        })}
    </LocationDropdown>
  );
}

export default LocationDropdownComponent;
