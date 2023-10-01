/* import { LocationType } from "../../home/home.component";
 */ import {
  CurrentLocationDropdownOption,
  BaseDropdownOption,
  LocationDropdown,
} from "./location-dropdown.style";

type LocationDropdownComponentProps = {
  active?: boolean;
  fetchingSpecifiedCoordsStatus: (status: boolean) => void;
  setLocationCoords: (coords: URLSearchParams) => void;
};

function LocationDropdownComponent(props: LocationDropdownComponentProps) {
  const { active, setLocationCoords, fetchingSpecifiedCoordsStatus } = props;

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
      {/* {Array.from(Array(5)).map((_, index) => (
        <BaseDropdownOption
          key={index}
          onClick={() => {
            const newSearchParams = new URLSearchParams();
            newSearchParams.set(
              "lat",
              Math.floor(Math.random() * 100).toString()
            );
            newSearchParams.set(
              "lon",
              Math.floor(Math.random() * 100).toString()
            );
            setLocationCoords(newSearchParams);
          }}
        >
          Random Location
        </BaseDropdownOption>
      ))} */}
    </LocationDropdown>
  );
}

export default LocationDropdownComponent;
