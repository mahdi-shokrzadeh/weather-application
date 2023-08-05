import axios from "axios";

const WEATHER_API_KEY = "614fc7b8530705bcff92e7a0db8d06a0";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
export const getCurrentWeather =  (lat , lon) => {

    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}` ;
    return axios.get(url) ;

}