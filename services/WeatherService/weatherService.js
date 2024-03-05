import axios from "axios";

const WEATHER_API_KEY = "";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5"

export const getCurrentWeather =  (lat , lon) => {

    const url = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}` ;
    return axios.get(url) ;

}

export const getForecastWeather = (lat , long) => {
    const url = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`;
    return axios.get(url); 
}
