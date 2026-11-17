import { format } from "date-fns";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const otherParams = "";
export const fetchCurrent = async (location) => {
  try {
    const data = await fetch(
      `${BASE_URL}/${location}?unitGroup=metric&iconSet=icons2&include=hours,current&elements=temp,datetime,humidity,uvindex,feelslike,,%2Baqius,windspeed,conditions,pressure,visibility,tempmin,tempmax,icon`,
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
