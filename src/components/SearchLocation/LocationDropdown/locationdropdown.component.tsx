import { DropdownOption, LocationDropdown } from "./locationdropdown.style";

type LocationDropdownComponentProps = {
  active: boolean;
};

function LocationDropdownComponent(props: LocationDropdownComponentProps) {
  const { active } = props;

  /*useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lon: longitude });
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  }); */

  return (
    <LocationDropdown active={active}>
      <DropdownOption currentLocation>Use Current Location</DropdownOption>
      <DropdownOption>a</DropdownOption>
      <DropdownOption>a</DropdownOption>
    </LocationDropdown>
  );
}

export default LocationDropdownComponent;
