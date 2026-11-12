import "./style.css";
import { fetchCurrent, fetchHourly } from "./api.handler.js";
import { renderUI } from "./dom.handler.js";
const input = document.querySelector(".search-input");

const form = document.getElementById("search-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dataCurrent = await fetchCurrent(input.value);
  const dataHourly = await fetchHourly(input.value);
  renderUI(dataCurrent, dataHourly);
});
