const WeatherIcons = {
  CLOUDS: "/weather-icons/clouds.png",
  RAIN: "/weather-icons/rain.png",
  DAY_CLEAR: "/weather-icons/clear.png",
  NIGHT_CLEAR: "/weather-icons/night.png",
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
      imageSrc = WeatherIcons.CLOUDS;
      break;
    case "Rain":
      imageSrc = WeatherIcons.RAIN;
      break;
    default:
      break;
  }

  return <img width="150px" src={imageSrc} alt={weather}></img>;
}

export default WeatherIconComponent;
