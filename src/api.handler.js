import { format } from "date-fns";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const otherParams = "";
export const fetchCurrent = async (location) => {
  try {
    const data = await fetch(
      `${BASE_URL}/${location}?unitGroup=metric&include=hours,current&elements=temp,datetime,humidity,windspeed,conditions,pressure,visibility,tempmin,tempmax`,
    );
    const parsed = await data.json();
    console.log(parsed.status);
    return parsed;
  } catch (exception) {
    console.log(e);
  } finally {
    console.log("Fetched");
  }
};
