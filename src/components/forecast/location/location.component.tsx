import { LocationSpecification } from "../forecast.component";

function getTimeFromOffset(offsetInSeconds: number): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Calculate the current time by adding the offset to UTC time
  /* const utcTime = new Date();
  const offsetMilliseconds = offsetInSeconds * 1000;
  const localTime = new Date(utcTime.getTime() + offsetMilliseconds); */

  const utcTime = new Date();
  const offsetMilliseconds = offsetInSeconds * 1000;
  const localTime = new Date(utcTime.getTime() + offsetMilliseconds);

  const dayOfWeek = daysOfWeek[localTime.getDay()];
  const month = localTime.toLocaleString("en-US", { month: "long" });
  const year = localTime.getFullYear();
  const hour = localTime.getUTCHours();

  return `${dayOfWeek}, ${localTime.getUTCDate()} ${month}, ${year} - ${hour}:${localTime.getUTCMinutes()}`;
}

type LocationComponentProps = {
  location: LocationSpecification;
};

function LocationComponent(props: LocationComponentProps) {
  const { location } = props;

  return (
    <>
      {location && (
        <>
          <span>
            {location.name}, {location.sys.country}
          </span>
          <span>{getTimeFromOffset(location.timezone)}</span>
        </>
      )}
    </>
  );
}

export default LocationComponent;
