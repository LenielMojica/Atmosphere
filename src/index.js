import "./style.css";
import { fetchCurrent } from "./api.handler.js";
import { renderUI } from "./dom.handler.js";
const input = document.querySelector(".search-input");

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
    const { lat, lon } = getUserCoordinates();
    const locationString = `${lat},${lon}`;
    const weatherData = await fetchCurrent(locationString);
    renderUI(weatherData);
  } catch (error) {
    const fallbackData = await fetchCurrent("Santo Domingo");
    renderUI(fallbackData);
  }
};
getCurrentLocationWeather();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dataCurrent = await fetchCurrent(input.value);

  renderUI(dataCurrent);
});
