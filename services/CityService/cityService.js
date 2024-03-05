import axios from "axios";


const cityApiOptions = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
};
const  CITY_API_URL = `https://wft-geo-db.p.rapidapi.com/v1/geo`




export const getCities =  (query) => {
    const url = `${CITY_API_URL}/cities?minPopulation=10000&namePrefix=${query}&sort=population` ;
    return axios.get(url , cityApiOptions) ;
}
