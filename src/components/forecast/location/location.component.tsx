import { useEffect, useState } from "react";
import { LocationType } from "../../home/home.component";

type LocationSpecificationResponse = {
  name: string;
  country: string;
};

type LocationComponentProps = {
  locationCoords: LocationType;
  setLoadingState: (loadingState: boolean) => void;
  setErrorState: (errorState: boolean) => void;
};

function LocationComponent(props: LocationComponentProps) {
  const { locationCoords, setLoadingState, setErrorState } = props;
  const [locationSpecification, setLocationSpecification] =
    useState<LocationSpecificationResponse>();

  useEffect(() => {
    if (!locationCoords) {
      return;
    }

    async function fetchLocationData() {
      setLoadingState(true);
      setErrorState(false);

      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${
            locationCoords.lat
          }&lon=${locationCoords.lon}&appid=${
            import.meta.env.VITE_OPEN_WEATHER_API_KEY
          }`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        const data = await response.json();
        console.log("Location: ", data);
        setLocationSpecification(data[0]);
      } catch (error) {
        console.error("Error fetching city data:", error);
        setErrorState(true);
      } finally {
        setLoadingState(false); // Set loading to false when all fetching is done
      }
    }

    fetchLocationData();
  }, [locationCoords]);

  /*   useEffect(() => {
    if (!locationCoords) {
      return;
    }
    setLoadingState(true);
    setErrorState(false);

    // Fetch location specification
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${
        locationCoords.lat
      }&lon=${locationCoords.lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Location: ", data);
        setLocationSpecification(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        setErrorState(true);
      })
      .finally(() => {
        setLoadingState(false); // Set loading to false when all fetching is done
      });
  }, [locationCoords]); */

  return (
    <>
      {locationSpecification && (
        <>
          <h1>CIDADE:</h1>
          <p>
            {locationSpecification.name}, {locationSpecification.country}
          </p>
        </>
      )}
    </>
  );
}

export default LocationComponent;
