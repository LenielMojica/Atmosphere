import { format } from "date-fns";
import { getWeatherIcon } from "./icon.js";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const days = [
  daysOfWeek[new Date().getDay()],
  daysOfWeek[new Date().getDay() + 1],
  daysOfWeek[new Date().getDay() + 2],
  daysOfWeek[new Date().getDay() + 3],
  daysOfWeek[new Date().getDay() + 4],
  daysOfWeek[new Date().getDay() + 5],
  daysOfWeek[new Date().getDay() + 6],
];
for (let i = 0; i < days.length; i++) {
  console.log(days[i]);
}
export const renderUI = (currentData) => {
  renderCurrentWeather(currentData);
  renderHourlyWeather(currentData);
  renderMetrics(currentData);
  renderDailyWeather(currentData);
  console.log(currentData);
};

const renderCurrentWeather = (data) => {
  const mainSection = document.querySelector(".main-section");
  const date = document.getElementById("date");
  const temp = document.querySelector(".temp-number");
  const status = document.getElementById("status-badge");
  const mintemp = document.getElementById("mintemp");
  const maxtemp = document.getElementById("maxtemp");
  const icon = document.createElement("img");
  const heroBody = document.querySelector(".hero-body");
  icon.classList.add("current-icon");

  const city = document.getElementById("city");
  city.innerHTML = data.address.charAt(0).toUpperCase() + data.address.slice(1);
  date.innerHTML = format(new Date(), "EEEE, d MMM");
  temp.innerHTML = Math.round(data.currentConditions.temp);
  status.innerHTML = data.currentConditions.conditions;
  mintemp.innerHTML = "Low: " + Math.round(data.days[0].tempmin) + "°C";
  maxtemp.innerHTML = "High: " + Math.round(data.days[0].tempmax) + "°C";
  heroBody.appendChild(icon);

  icon.src = getWeatherIcon(data.currentConditions.icon);
};
const renderHourlyWeather = (data) => {
  const hourlyCard = document.querySelector(".hourly-track");
  const currentTime = format(new Date(), "HHmmss");

  hourlyCard.innerHTML = "";
  const hours =
    data.days[0].hours.length > 4
      ? data.days[0].hours.filter((hour) =>
          Number(hour.datetime.replaceAll(":", "") >= Number(currentTime)),
        )
      : data.days[0].hours.filter((hour) =>
          Number(hour.datetime.replaceAll(":", "") >= Number(currentTime)),
        );
  console.log(hours);
  let counter = 0;
  data.days[0].hours.forEach((element, i) => {
    if (Number(element.datetime.replaceAll(":", "")) < Number(currentTime)) {
      return;
    }
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
    windspeed: " km/h",
    pressure: " hPa",
    visibility: " km",
    feelslike: "°C",
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
    dailyDay.innerHTML = i == 0 ? "Today" : days[i] == undefined ? "" : days[i];
    dailyMax.innerHTML = Math.round(day.tempmax) + "°C";
    dailyMin.innerHTML = Math.round(day.tempmin) + "°C";
    condition.innerHTML = day.conditions;
  });
};
