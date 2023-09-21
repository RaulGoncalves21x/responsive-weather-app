import { LocationSpecification } from "../forecast.component";

type LocationComponentProps = {
  location: LocationSpecification;
};

function LocationComponent(props: LocationComponentProps) {
  const { location } = props;

  return (
    <>
      {location && (
        <>
          <h1>CIDADE:</h1>
          <p>
            {location.name}, {location.sys.country}
          </p>
        </>
      )}
    </>
  );
}

export default LocationComponent;
