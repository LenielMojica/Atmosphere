import clearDay from "./assets/icons/clear-day.svg";
import clearNight from "./assets/icons/clear-night.svg";
import cloudy from "./assets/icons/cloudy.svg";
import fog from "./assets/icons/fog.svg";
import hail from "./assets/icons/hail.svg";
import partlyCloudyDay from "./assets/icons/partly-cloudy-day.svg";
import partlyCloudyNight from "./assets/icons/partly-cloudy-night.svg";
import rain from "./assets/icons/rain.svg";
import rainSnow from "./assets/icons/rain-snow.svg";
import rainSnowShowersDay from "./assets/icons/rain-snow-showers-day.svg";
import rainSnowShowersNight from "./assets/icons/rain-snow-showers-night.svg";
import showersDay from "./assets/icons/showers-day.svg";
import showersNight from "./assets/icons/showers-night.svg";
import sleet from "./assets/icons/sleet.svg";
import snow from "./assets/icons/snow.svg";
import snowShowersDay from "./assets/icons/snow-showers-day.svg";
import snowShowersNight from "./assets/icons/snow-showers-night.svg";
import thunder from "./assets/icons/thunder.svg";
import thunderRain from "./assets/icons/thunder-rain.svg";
import thunderShowersDay from "./assets/icons/thunder-showers-day.svg";
import thunderShowersNight from "./assets/icons/thunder-showers-night.svg";
import wind from "./assets/icons/wind.svg";

const iconMap = {
  "clear-day": clearDay,
  "clear-night": clearNight,
  cloudy: cloudy,
  fog: fog,
  hail: hail,
  "partly-cloudy-day": partlyCloudyDay,
  "partly-cloudy-night": partlyCloudyNight,
  rain: rain,
  "rain-snow": rainSnow,
  "rain-snow-showers-day": rainSnowShowersDay,
  "rain-snow-showers-night": rainSnowShowersNight,
  "showers-day": showersDay,
  "showers-night": showersNight,
  sleet: sleet,
  snow: snow,
  "snow-showers-day": snowShowersDay,
  "snow-showers-night": snowShowersNight,
  thunder: thunder,
  "thunder-rain": thunderRain,
  "thunder-showers-day": thunderShowersDay,
  "thunder-showers-night": thunderShowersNight,
  wind: wind,
};

export function getWeatherIcon(iconName) {
  return iconMap[iconName] || clearDay;
}
