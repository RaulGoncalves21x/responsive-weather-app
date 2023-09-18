import { DropdownOption, LocationDropdown } from "./locationdropdown.style";

type LocationDropdownComponentProps = {
    active: boolean;
};

function LocationDropdownComponent(props: LocationDropdownComponentProps) {
    const { active } = props;

    return (
        <LocationDropdown active={active}>
            <DropdownOption currentLocation>Use Current Location</DropdownOption>
            <DropdownOption>a</DropdownOption>
            <DropdownOption>a</DropdownOption>
        </LocationDropdown>
    )
}

export default LocationDropdownComponent;