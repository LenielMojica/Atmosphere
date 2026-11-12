import { format } from "date-fns";
export const renderUI = (currentData, hourlyData) => {
  const date = document.getElementById("date");
  const temp = document.querySelector(".temp-number");
  const status = document.getElementById("status-badge");
  const mintemp = document.getElementById("mintemp");
  const maxtemp = document.getElementById("maxtemp");
  const hourlyCard = document.querySelector(".hourly-track");
  const currentTime = format(new Date(), "HHmmss");
  const city = document.getElementById("city");
  const metricsGrid = document.querySelector(".metrics-grid");
  metricsGrid.innerHTML = "";
  city.innerHTML = currentData.address.toUpperCase();
  date.innerHTML = format(new Date(), "EEEE, d MMM");
  temp.innerHTML = Math.round(currentData.currentConditions.temp);
  status.innerHTML = currentData.currentConditions.conditions;
  mintemp.innerHTML = "Low: " + Math.round(currentData.days[0].tempmin) + "°C";
  maxtemp.innerHTML = "High: " + Math.round(currentData.days[0].tempmax) + "°C";
  hourlyCard.innerHTML = "";
  hourlyData.days[0].hours.forEach((element) => {
    if (Number(element.datetime.replaceAll(":", "")) < Number(currentTime)) {
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

  console.log(currentData);
};
