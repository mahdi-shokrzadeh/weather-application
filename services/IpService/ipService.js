import axios from "axios";
const IP_API_URL = "https://api.ipify.org/?format=json";

export const getIPAddress = () => {
    const url = IP_API_URL;
    return axios.get(url);
};

export const sendIpAddress = (ip) => {

    const encodedParams = new URLSearchParams();
    encodedParams.set("ip", ip);

    const options = {
        method: "POST",
        url: "https://ip-location5.p.rapidapi.com/get_geo_info",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
                "9335c54581msh921529f6b3e0dd6p180416jsn9f01106406b9",
            "X-RapidAPI-Host": "ip-location5.p.rapidapi.com",
        },
        data: encodedParams,
    };
    
        return axios.request(options);
};
