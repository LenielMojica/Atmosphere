import { format, parseISO } from "date-fns";
import { getWeatherIcon } from "./icon.js";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const days = [];
for (let day of daysOfWeek) {
  days.push(day);
}
console.log(days);
for (let i = 0; i < days.length; i++) {
  console.log(i, ":", days[i]);
}
export const renderUI = (currentData) => {
  renderCurrentWeather(currentData);
  renderHourlyWeather(currentData);
  renderMetrics(currentData);
  renderDailyWeather(currentData);

  console.log(currentData);
};

const renderCurrentWeather = (data) => {
  const heroCard = document.querySelector(".hero-card");
  heroCard.innerHTML = "";
  //Header
  //===============================================
  const heroHeader = document.createElement("div");
  heroHeader.classList.add("hero-header");
  heroCard.appendChild(heroHeader);
  const locationInfo = document.createElement("div");
  heroHeader.appendChild(locationInfo);
  const city = document.createElement("h2");
  const date = document.createElement("p");
  date.setAttribute("id", "date");
  locationInfo.appendChild(city);
  locationInfo.appendChild(date);
  const statusContainer = document.createElement("div");
  const statusBadge = document.createElement("span");
  statusBadge.setAttribute("id", "status-badge");
  statusContainer.classList.add("weather-status-badge");
  statusContainer.appendChild(statusBadge);
  heroHeader.appendChild(statusContainer);
  //===============================================
  // Body
  const body = document.createElement("div");
  body.classList.add("hero-body");
  heroCard.appendChild(body);
  const temperatureDisplay = document.createElement("div");
  const tempNumber = document.createElement("span");
  const tempUnit = document.createElement("span");
  const iconWrapper = document.createElement("div");
  body.appendChild(temperatureDisplay);
  body.appendChild(iconWrapper);
  temperatureDisplay.appendChild(tempNumber);
  temperatureDisplay.appendChild(tempUnit);
  temperatureDisplay.classList.add("temperature-display");
  //===============================================
  // Footer
  const heroFooter = document.createElement("div");
  heroFooter.classList.add("hero-footer");

  heroCard.appendChild(heroFooter);

  const maxTemp = document.createElement("span");
  const minTemp = document.createElement("span");
  maxTemp.classList.add("max-temp");
  minTemp.classList.add("min-temp");
  heroFooter.appendChild(maxTemp);
  heroFooter.appendChild(minTemp);
  iconWrapper.classList.add("hero-icon-wrapper");

  tempUnit.classList.add("temp-unit");
  tempNumber.classList.add("temp-number");

  city.innerHTML = data.city
    ? data.city
    : data.address.charAt(0).toUpperCase() + data.address.slice(1);
  date.innerHTML = format(new Date(), "EEEE, d MMM");
  tempNumber.innerHTML = Math.round(data.currentConditions.temp);
  tempUnit.innerHTML = data.unit == "metric" ? "°C" : "°F";
  statusBadge.innerHTML = data.currentConditions.conditions;
  minTemp.innerHTML =
    "Low: " +
    Math.round(data.days[0].tempmin) +
    (data.unit == "metric" ? "°C" : "°F");
  maxTemp.innerHTML =
    "High: " +
    Math.round(data.days[0].tempmax) +
    (data.unit == "metric" ? "°C" : "°F");
  const icon = document.createElement("img");
  icon.classList.add("current-icon");
  iconWrapper.appendChild(icon);

  icon.src = getWeatherIcon(data.currentConditions.icon);
};
const renderHourlyWeather = (data) => {
  const hourlyCard = document.querySelector(".hourly-track");
  const currentTime = format(new Date(), "HH'0000'");

  hourlyCard.innerHTML = "";

  let counter = 0;

  const startHourIndex = data.days[0].hours.findIndex(
    (item) => item.datetime.replaceAll(":", "") == currentTime,
  );

  const hours = [
    ...data.days[0].hours.slice(startHourIndex),
    ...data.days[1].hours,
  ];

  hours.forEach((element, i) => {
    if (counter >= 7) return;
    const hourlyContainer = document.createElement("div");
    const hourlyTime = document.createElement("span");
    const hourlyTemp = document.createElement("span");
    const icon = document.createElement("img");
    icon.classList.add("hourly-icon");
    hourlyTemp.classList.add("hourly-temp");
    hourlyTemp.innerHTML = Math.round(element.temp) + "°";
    hourlyContainer.classList.add("hourly-item");
    hourlyTime.innerHTML = element.datetime.replace(":00", "") + " ";
    hourlyContainer.appendChild(hourlyTime);

    hourlyContainer.appendChild(icon);
    hourlyContainer.appendChild(hourlyTemp);

    hourlyTime.classList.add("hourly-time");
    icon.src = getWeatherIcon(element.icon);
    hourlyCard.appendChild(hourlyContainer);
    counter++;
  });
};

const renderMetrics = (data) => {
  const metricsGrid = document.querySelector(".metrics-grid");
  metricsGrid.innerHTML = "";
  const resultArray = Object.entries(data.currentConditions).map(
    ([key, value]) => {
      return {
        property: key,
        val: value,
      };
    },
  );
  const unitMap = {
    humidity: " %",
    windspeed: data.unit == "metric" ? " kmh" : "mph",
    pressure: " hPa",
    visibility: data.unit == "metric" ? " km" : "mi",
    feelslike: data.unit == "metric" ? "°C" : "°F",
  };
  const iconMap = {
    humidity: "fa-droplet",
    windspeed: "fa-wind",
    pressure: "fa-gauge",
    visibility: "fa-eye",
    aqius: "fa-wind",
    feelslike: "fa-temperature-half",
    uvindex: "fa-sun",
  };
  const metricDescriptions = {
    humidity: (val) => {
      if (val < 30) return "Dry air";
      if (val <= 60) return "Comfortable";
      if (val <= 80) return "Muggy";
      return "Very humid";
    },
    windspeed: (val, unit) => {
      if (val < 12) return "Light breeze";
      if (val <= 28) return "Moderate breeze";
      if (val <= 49) return "Breezy & gusty";
      return "Strong winds";
    },
    uvindex: (val) => {
      if (val <= 2) return "No protection needed";
      if (val <= 5) return "Wear sunscreen";
      if (val <= 7) return "Seek midday shade";
      if (val <= 10) return "Extra protection";
      return "Avoid sun exposure";
    },
    visibility: (val) => {
      if (val >= 10) return "Clear view";
      if (val >= 5) return "Moderate haze";
      if (val >= 2) return "Poor visibility";
      return "Dense fog / mist";
    },
    pressure: (val) => {
      if (val < 1009) return "Low pressure";
      if (val <= 1022) return "Steady & normal";
      return "High pressure";
    },
    aqius: (val) => {
      if (val <= 50) return "Clean & fresh";
      if (val <= 100) return "Acceptable";
      if (val <= 150) return "Sensitive groups";
      return "Unhealthy air";
    },
    feelslike: (val, actualTemp) => {
      const diff = val - actualTemp;
      if (diff >= 3) return "Warmer due to humidity";
      if (diff <= -3) return "Cooler with wind";
      return "Similar to actual";
    },
  };
  function getUVCategory(uv) {
    if (uv <= 2) return " Low";
    if (uv <= 5) return " Moderate";
    if (uv <= 7) return " High";
    if (uv <= 10) return " Very High";
    return " Extreme";
  }
  function getAQICategory(aqi) {
    if (aqi <= 50) return " Good";
    if (aqi <= 100) return " Moderate";
    if (aqi <= 150) return " Unhealthy for Sensitive Groups";
    if (aqi <= 200) return " Unhealthy";
    if (aqi <= 300) return " Very Unhealthy";
    return " Hazardous";
  }
  const propertyLabels = {
    windspeed: "Wind Speed",
    uvindex: "UV Index",
    aqius: "Air Quality",
    feelslike: "Feels Like",
  };
  resultArray.forEach((element) => {
    if (
      element.property == "temp" ||
      element.property == "conditions" ||
      element.property == "datetime" ||
      element.property == "icon"
    )
      return;

    const unit = unitMap[element.property] || "";
    const metricCard = document.createElement("div");
    metricCard.classList.add("metric-card", "glass-card");
    const metricHeader = document.createElement("div");
    metricHeader.classList.add("metric-header");
    const metricTitle = document.createElement("span");
    const metricValue = document.createElement("div");
    const icon = document.createElement("i");
    const metricsFooter = document.createElement("div");

    metricsFooter.classList.add("metric-footer");
    icon.classList.add("fa-solid", iconMap[element.property]);

    metricValue.classList.add("metric-value");
    metricHeader.appendChild(icon);
    metricHeader.appendChild(metricTitle);
    metricCard.appendChild(metricHeader);
    metricCard.appendChild(metricValue);
    metricCard.appendChild(metricsFooter);
    metricsGrid.appendChild(metricCard);
    metricsFooter.innerHTML =
      element.property == "feelslike"
        ? metricDescriptions[element.property](
            element.val,
            data.currentConditions.temp,
          )
        : metricDescriptions[element.property](
            element.val,
            data.currentConditions.temp,
          );
    metricTitle.innerHTML =
      propertyLabels[element.property] ||
      element.property.charAt(0).toUpperCase() + element.property.slice(1);
    metricValue.innerHTML =
      element.property == "uvindex"
        ? `${element.val}${getUVCategory(element.val)}`
        : element.property == "aqius"
          ? `${element.val}${getAQICategory(element.val)}`
          : element.property == "feelslike"
            ? `${Math.round(element.val)}${unit}`
            : `${element.val}${unit}`;
  });
};
const renderDailyWeather = (data) => {
  const daysContainer = document.querySelector(".daily-list");
  daysContainer.innerHTML = "";

  data.days.forEach((day, i) => {
    if (i >= 7) return;

    const dailyItem = document.createElement("div");
    const icon = document.createElement("img");
    icon.classList.add("daily-icon");
    icon.src = getWeatherIcon(day.icon);
    dailyItem.classList.add("daily-item");
    const dailyDay = document.createElement("span");
    dailyDay.classList.add("daily-day");
    const dailyCondition = document.createElement("div");
    dailyCondition.classList.add("daily-condition");
    const condition = document.createElement("span");
    const dailyTemps = document.createElement("div");
    dailyTemps.classList.add("daily-temps");
    const dailyMax = document.createElement("span");
    dailyMax.classList.add("daily-max");
    const dailyMin = document.createElement("span");
    dailyMin.classList.add("daily-min");
    dailyTemps.appendChild(dailyMin);
    dailyTemps.appendChild(dailyMax);
    dailyCondition.appendChild(icon);
    dailyCondition.appendChild(condition);
    dailyItem.appendChild(dailyDay);

    dailyItem.appendChild(dailyCondition);

    dailyItem.appendChild(dailyTemps);
    daysContainer.appendChild(dailyItem);
    dailyDay.innerHTML =
      i == 0 ? "Today" : format(parseISO(data.days[i].datetime), "EEE");
    dailyMax.innerHTML = Math.round(day.tempmax) + "°";
    dailyMin.innerHTML = Math.round(day.tempmin) + "°";
    condition.innerHTML = day.conditions;
  });
};
