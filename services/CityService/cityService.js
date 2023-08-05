import axios from "axios";


const cityApiOptions = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "9335c54581msh921529f6b3e0dd6p180416jsn9f01106406b9",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
};
const  CITY_API_URL = `https://wft-geo-db.p.rapidapi.com/v1/geo`




export const getCities =  (query) => {
    const url = `${CITY_API_URL}/cities?minPopulation=10000&namePrefix=${query}&sort=population` ;
    return axios.get(url , cityApiOptions) ;
}