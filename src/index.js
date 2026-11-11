import "./style.css";
const input = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const form = document.getElementById("search-form");

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const fetchData = async (location) => {
  const data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?`,
  );
  const parsed = await data.json();
  console.log(parsed.address);
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData(input.value);
});
