const WeatherIcons = {
  DAY_CLEAR: "/weather-icons/clear_day.png",
  DAY_CLOUDS: "/weather-icons/cloudy_day.png",
  DAY_RAIN: "/weather-icons/rainy_day.png",
  DAY_STORM: "/weather-icons/stormy_day.png",
  DAY_SNOW: "/weather-icons/snowy_day.png",
  NIGHT_CLEAR: "/weather-icons/clear_night.png",
  NIGHT_CLOUDS: "/weather-icons/cloudy_night.png",
  NIGHT_RAIN: "/weather-icons/rainy_night.png",
  NIGHT_STORM: "/weather-icons/stormy_night.png",
  NIGHT_SNOW: "/weather-icons/snowy_night.png",
};

type WeatherIconProps = {
  weather: string;
  hour: number;
};

function WeatherIconComponent(props: WeatherIconProps) {
  const { weather, hour } = props;

  let imageSrc = "";

  switch (weather) {
    case "Clear":
      if (hour >= 20 || hour <= 7) {
        imageSrc = WeatherIcons.NIGHT_CLEAR;
      } else {
        imageSrc = WeatherIcons.DAY_CLEAR;
      }
      break;
    case "Clouds":
      if (hour >= 20 || hour <= 7) {
        imageSrc = WeatherIcons.NIGHT_CLOUDS;
      } else {
        imageSrc = WeatherIcons.DAY_CLOUDS;
      }
      break;
    case "Rain":
      if (hour >= 20 || hour <= 7) {
        imageSrc = WeatherIcons.NIGHT_RAIN;
      } else {
        imageSrc = WeatherIcons.DAY_RAIN;
      }
      break;
    case "Snow":
      if (hour >= 20 || hour <= 7) {
        imageSrc = WeatherIcons.NIGHT_SNOW;
      } else {
        imageSrc = WeatherIcons.DAY_SNOW;
      }
      break;
    case "Storm":
      if (hour >= 20 || hour <= 7) {
        imageSrc = WeatherIcons.NIGHT_STORM;
      } else {
        imageSrc = WeatherIcons.DAY_STORM;
      }
      break;
    default:
      break;
  }

  return <img width="150px" src={imageSrc} alt={weather}></img>;
}

export default WeatherIconComponent;
