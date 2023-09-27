import { LocationSpecification } from "../forecast.component";
import { Location, LocationDateTime } from "./location.style";

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
  const hour =
    localTime.getUTCHours().toString().length === 1
      ? `0${localTime.getUTCHours()}`
      : localTime.getUTCHours();

  const minute =
    localTime.getUTCMinutes().toString().length === 1
      ? `0${localTime.getUTCMinutes()}`
      : `${localTime.getUTCMinutes()}`;

  return `${dayOfWeek}, ${localTime.getUTCDate()} ${month} |  ${hour}:${minute}`;
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
          <Location>
            {location.name}, {location.sys.country}
          </Location>
          <LocationDateTime>
            {getTimeFromOffset(location.timezone)}
          </LocationDateTime>
        </>
      )}
    </>
  );
}

export default LocationComponent;
