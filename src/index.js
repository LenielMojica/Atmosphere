import "./style.css";
import { fetchCurrentMetric, fetchCurrentUS } from "./api.handler.js";
import { renderUI } from "./dom.handler.js";
const BASE_URL_GEOLOCATION =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";
const input = document.querySelector(".search-input");
const title = document.getElementById("title");
const f = document.getElementById("unit-f");
const c = document.getElementById("unit-c");

title.setAttribute("style", "cursor:pointer;");
title.addEventListener("click", () => getCurrentLocationWeather());

const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Your Browser does not support geolocation"));
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      (resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }),
        (error) => {
          reject(error);
        });
    });
  });
};

const form = document.getElementById("search-form");
const getCurrentLocationWeather = async () => {
  try {
    const { lat, lon } = await getUserCoordinates();
    const response = await fetch(
      `${BASE_URL_GEOLOCATION}latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    );
    const locationData = await response.json();

    const locationString = `${lat},${lon}`;
    const weatherData = await fetchCurrentMetric(locationString);
    const weatherDataUs = await fetchCurrentUS(locationString);
    weatherData.city = locationData.city;
    weatherDataUs.city = locationData.city;
    weatherData.unit = "metric";
    weatherDataUs.unit = "us";
    if (c.classList.contains("active")) {
      renderUI(weatherData);
    } else {
      renderUI(weatherDataUs);
    }
  } catch (error) {
    const fallbackData = await fetchCurrentMetric("Santo Domingo");
    const fallbackDataUs = await fetchCurrentUS("Santo Domingo");

    if (c.classList.contains("active")) {
      renderUI(fallbackData);
    } else {
      renderUI(fallbackDataUs);
    }
  }
};
getCurrentLocationWeather();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  toggleUnits();
});
async function toggleUnits() {
  const dataCurrent = await fetchCurrentMetric(input.value);
  const dataCurrentUs = await fetchCurrentUS(input.value);
  if (c.classList.contains("active")) {
    renderUI(dataCurrent);
  } else {
    renderUI(dataCurrentUs);
  }
}
f.addEventListener("click", () => {
  c.classList.remove("active");
  f.classList.add("active");
  if (!input.value) {
    getCurrentLocationWeather();
  } else {
    toggleUnits();
  }
});
c.addEventListener("click", () => {
  f.classList.remove("active");
  c.classList.add("active");
  if (!input.value) {
    getCurrentLocationWeather();
  } else {
    toggleUnits();
  }
});
