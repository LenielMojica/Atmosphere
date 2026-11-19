import "./style.css";
import { fetchCurrentMetric, fetchCurrentUS } from "./api.handler.js";
import { renderUI } from "./dom.handler.js";
import { showError } from "./error.handler.js";
const BASE_URL_GEOLOCATION =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";
const input = document.querySelector(".search-input");
const title = document.getElementById("title");
const f = document.getElementById("unit-f");
const c = document.getElementById("unit-c");

title.setAttribute("style", "cursor:pointer;");
title.addEventListener("click", () => {
  getCurrentLocationWeather();
  input.value = "";
});

const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Your Browser does not support geolocation"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

const form = document.getElementById("search-form");
export const getCurrentLocationWeather = async () => {
  try {
    const { lat, lon } = await getUserCoordinates();
    const response = await fetch(
      `${BASE_URL_GEOLOCATION}latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    );
    const locationData = await response.json();

    const locationString = `${lat},${lon}`;
    const weatherData = await getWeather(locationString);
    weatherData.city = locationData.city;
    renderUI(weatherData);
  } catch (error) {
    renderUI(await getWeather("Santo Domingo"));
  }
};
getCurrentLocationWeather();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  renderUI(await getWeather(query));
});
const fetchByActiveUnit = async (location) => {
  const isMetric = c.classList.contains("active");
  const data = isMetric
    ? await fetchCurrentMetric(location)
    : await fetchCurrentUS(location);

  data.unit = isMetric ? "metric" : "us";
  return data;
};
const getWeather = async (city) => {
  try {
    return await fetchByActiveUnit(city);
  } catch (error) {
    showError(error);

    return await fetchByActiveUnit("Santo Domingo");
  }
};
const handleUnitChange = async (selectedUnit, otherUnit) => {
  otherUnit.classList.remove("active");
  selectedUnit.classList.add("active");

  if (!input.value.trim()) {
    await getCurrentLocationWeather();
  } else {
    renderUI(await getWeather(input.value.trim()));
  }
};
f.addEventListener("click", () => handleUnitChange(f, c));
c.addEventListener("click", () => handleUnitChange(c, f));
