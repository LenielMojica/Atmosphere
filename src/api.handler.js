import { format } from "date-fns";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const otherParams = "";
export const fetchCurrent = async (location) => {
  const data = await fetch(
    `${BASE_URL}/${location}?unitGroup=metric&include=current&elements=temp,humidity,windspeed,conditions,pressure,visibility,tempmin,tempmax`,
  );
  const parsed = await data.json();
  return parsed;
};

export const fetchHourly = async (location) => {
  const data = await fetch(
    `${BASE_URL}/${location}/${format(new Date(), "yyyy-MM-dd")}?unitGroup=metric&include=days,hours&elements=datetime,tempmax,tempmin,temp,humidity,conditions`,
  );
  const parsed = await data.json();
  return parsed;
};
