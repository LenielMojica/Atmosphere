const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export const fetchCurrentMetric = async (location) => {
  const response = await fetch(
    `${BASE_URL}/${location}?unitGroup=metric&iconSet=icons2&include=hours,current&elements=temp,datetime,humidity,uvindex,feelslike,,%2Baqius,windspeed,conditions,pressure,visibility,tempmin,tempmax,icon`,
  );
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Location not found. Check the city name.");
    }
    if (response.status === 401) {
      throw new Error("Invalid or missing API key.");
    }
    if (response.status === 429) {
      throw new Error("API rate limit exceeded. Try again later.");
    }
    throw new Error(`HTTP error: ${response.status}`);
  }
  const parsed = await response.json();

  return parsed;
};
export const fetchCurrentUS = async (location) => {
  const response = await fetch(
    `${BASE_URL}/${location}?unitGroup=us&iconSet=icons2&include=hours,current&elements=temp,datetime,humidity,uvindex,feelslike,,%2Baqius,windspeed,conditions,pressure,visibility,tempmin,tempmax,icon`,
  );
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Location not found. Check the city name.");
    }
    if (response.status === 401) {
      throw new Error("Invalid or missing API key.");
    }
    if (response.status === 429) {
      throw new Error("API rate limit exceeded. Try again later.");
    }
    throw new Error(`HTTP error: ${response.status}`);
  }
  const parsed = await response.json();

  return parsed;
};
