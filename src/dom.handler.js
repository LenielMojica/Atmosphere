import { format } from "date-fns";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const days = [
  daysOfWeek[new Date().getDay()],
  daysOfWeek[new Date().getDay() + 1],
  daysOfWeek[new Date().getDay() + 2],
  daysOfWeek[new Date().getDay() + 3],
  daysOfWeek[new Date().getDay() + 4],
  daysOfWeek[new Date().getDay() + 5],
  daysOfWeek[new Date().getDay() + 6],
  daysOfWeek[new Date().getDay() + 7],
];
for (let i = 0; i < days.length; i++) {
  console.log(days[i]);
}
export const renderUI = (currentData, hourlyData) => {
  renderCurrentWeather(currentData);
  renderHourlyWeather(hourlyData);
  renderMetrics(currentData);
  renderDailyWeather(currentData);
  console.log(currentData);
};

const renderCurrentWeather = (data) => {
  if (!data) return;
  const date = document.getElementById("date");
  const temp = document.querySelector(".temp-number");
  const status = document.getElementById("status-badge");
  const mintemp = document.getElementById("mintemp");
  const maxtemp = document.getElementById("maxtemp");

  const city = document.getElementById("city");
  city.innerHTML = data.address.charAt(0).toUpperCase() + data.address.slice(1);
  date.innerHTML = format(new Date(), "EEEE, d MMM");
  temp.innerHTML = Math.round(data.currentConditions.temp);
  status.innerHTML = data.currentConditions.conditions;
  mintemp.innerHTML = "Low: " + Math.round(data.days[0].tempmin) + "°C";
  maxtemp.innerHTML = "High: " + Math.round(data.days[0].tempmax) + "°C";
};
const renderHourlyWeather = (data) => {
  const hourlyCard = document.querySelector(".hourly-track");
  const currentTime = format(new Date(), "HHmmss");

  hourlyCard.innerHTML = "";
  const hours = data.days[0].hours.filter((hour) =>
    Number(hour.datetime.replaceAll(":", "") >= Number(currentTime)),
  );
  console.log(hours);
  data.days[0].hours.forEach((element, i) => {
    if (Number(element.datetime.replaceAll(":", "")) < Number(currentTime)) {
      return;
    }
    if (i == 6) {
      return;
    }
    const hourlyContainer = document.createElement("div");
    const hourlyTime = document.createElement("span");
    const hourlyTemp = document.createElement("span");
    hourlyTemp.classList.add("hourly-temp");
    hourlyTemp.innerHTML = Math.round(element.temp) + "°";
    hourlyContainer.classList.add("hourly-item");
    hourlyTime.innerHTML = element.datetime;
    hourlyContainer.appendChild(hourlyTime);
    hourlyContainer.appendChild(hourlyTemp);
    hourlyTime.classList.add("hourly-time");

    hourlyCard.appendChild(hourlyContainer);
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
  };

  resultArray.forEach((element) => {
    if (element.property == "temp" || element.property == "conditions") return;
    const unit = unitMap[element.property] || "";
    const metricCard = document.createElement("div");
    metricCard.classList.add("metric-card", "glass-card");
    const metricHeader = document.createElement("div");
    metricHeader.classList.add("metric-header");
    const metricTitle = document.createElement("span");
    const metricValue = document.createElement("div");
    metricValue.classList.add("metric-value");
    metricHeader.appendChild(metricTitle);
    metricCard.appendChild(metricHeader);
    metricCard.appendChild(metricValue);
    metricsGrid.appendChild(metricCard);
    metricTitle.innerHTML =
      element.property.charAt(0).toUpperCase() + element.property.slice(1);
    metricValue.innerHTML = `${element.val}${unit}`;
  });
};
const renderDailyWeather = (data) => {
  const daysContainer = document.querySelector(".daily-list");
  daysContainer.innerHTML = "";
  data.days.forEach((day, i) => {
    const dailyItem = document.createElement("div");
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
    dailyCondition.appendChild(condition);
    dailyItem.appendChild(dailyDay);
    dailyItem.appendChild(dailyCondition);

    dailyItem.appendChild(dailyTemps);
    daysContainer.appendChild(dailyItem);
    dailyDay.innerHTML = i == 0 ? "Today" : days[i];
    dailyMax.innerHTML = Math.round(day.tempmax) + "°C";
    dailyMin.innerHTML = Math.round(day.tempmin) + "°C";
    condition.innerHTML = day.conditions;
  });
};
