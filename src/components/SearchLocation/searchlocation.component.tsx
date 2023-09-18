import { useState } from "react";
import {
  LocationMainContainer,
  LocationInputContainer,
  LocationInputField,
} from "./searchlocation.style.tsx";
import LocationDropdownComponent from "./LocationDropdown/locationdropdown.component.tsx";

type SearchLocationComponentProps = {
  setLocation: (location: string) => void;
};

function SearchLocationComponent(props: SearchLocationComponentProps) {
  const { setLocation } = props;
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <>
      <LocationMainContainer>
        <LocationInputContainer>
          <i className="bi bi-search"></i>
          <LocationInputField
            placeholder="Search..."
            onChange={(event) => setLocation(event.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <LocationDropdownComponent active={isInputFocused}/>
        </LocationInputContainer>
      </LocationMainContainer>
    </>
  );
}

export default SearchLocationComponent;
