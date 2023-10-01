// Get Current Hour, according to specific timezone
export function getCurrentHourFromOffset(offsetInSeconds: number): number {
  const utcTime = new Date();
  const offsetMilliseconds = offsetInSeconds * 1000;
  const localTime = new Date(utcTime.getTime() + offsetMilliseconds);

  const hour = localTime.getUTCHours();

  return hour;
}

// Get Hour from Unix timestamp, according to specific timezone
export function getHourFromUnixWithOffset(
  unixTimestamp: number,
  timezoneOffsetSeconds: number
): number {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  date.setSeconds(date.getSeconds() + timezoneOffsetSeconds); // Convert to adequate timezone

  // Get individual date and time components
  const hours = date.getUTCHours();

  return hours;
}

// Get Hour and Minutes String from Unix timestamp, according to specific timezone
export function getTimeFromUnixWithOffset(
  unixTimestamp: number,
  timezoneOffsetSeconds: number
): string {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  date.setSeconds(date.getSeconds() + timezoneOffsetSeconds); // Convert to adequate timezone

  // Get individual date and time components
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}
