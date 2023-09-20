import { LocationType } from "../../home/home.component";
import {
  CurrentLocationDropdownOption,
  BaseDropdownOption,
  LocationDropdown,
} from "./location-dropdown.style";

type LocationDropdownComponentProps = {
  active?: boolean;
  fetchingSpecifiedCoordsStatus: (status: boolean) => void;
  setLocationCoords: (coords: LocationType) => void;
};

function LocationDropdownComponent(props: LocationDropdownComponentProps) {
  const { active, setLocationCoords, fetchingSpecifiedCoordsStatus } = props;

  const fetchUserLocation = () => {
    console.log("Clicked on Use Current Location"); // Add this line
    fetchingSpecifiedCoordsStatus(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setLocationCoords({ lat: latitude, lon: longitude });
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
      {Array.from(Array(5)).map((_, index) => (
        <BaseDropdownOption
          key={index}
          onClick={() =>
            setLocationCoords({
              lat: Math.floor(Math.random() * 100),
              lon: Math.floor(Math.random() * 100),
            })
          }
        >
          Random Location
        </BaseDropdownOption>
      ))}
    </LocationDropdown>
  );
}

export default LocationDropdownComponent;
