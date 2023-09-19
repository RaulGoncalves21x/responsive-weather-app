import { useState } from "react";
import LoadingBackdrop from "../../Common/loadingbackdrop.component";
import { LocationType } from "../../Home/homepage.component";
import {
  CurrentLocationDropdownOption,
  BaseDropdownOption,
  LocationDropdown,
} from "./locationdropdown.style";

type LocationDropdownComponentProps = {
  active?: boolean;
  setLocationCoords: (coords: LocationType) => void;
};

function LocationDropdownComponent(props: LocationDropdownComponentProps) {
  const { active, setLocationCoords } = props;
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserLocation = () => {
    console.log("Clicked on Use Current Location"); // Add this line
    setIsLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setLocationCoords({ lat: latitude, lon: longitude });
          setIsLoading(false);
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
    <LocationDropdown /*  active={active} */>
      <CurrentLocationDropdownOption onClick={fetchUserLocation}>
        Use Current Location
      </CurrentLocationDropdownOption>
      <LoadingBackdrop loading={isLoading} />
    </LocationDropdown>
  );
}

export default LocationDropdownComponent;
