import "./App.css";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    SimpleGrid,
    Spacer,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef, useState } from "react";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import {
    TiWeatherPartlySunny,
    TiWeatherSnow,
    TiWeatherWindy,
} from "react-icons/ti";
import { TbClockSearch } from "react-icons/tb";
import { getCities } from "../services/CityService/cityService";
import {
    getCurrentWeather,
    getForecastWeather,
} from "../services/WeatherService/weatherService";

// import {
//     CITY_API_URL,
//     cityApiOptions,
// } from "../services/CityService/cityService";

const App = () => {
    ///

    const w = {
        coord: {
            lon: 10.99,
            lat: 44.34,
        },
        weather: [
            {
                id: 501,
                main: "Rain",
                description: "moderate rain",
                icon: "10d",
            },
        ],
        base: "stations",
        main: {
            temp: 298.48,
            feels_like: 298.74,
            temp_min: 297.56,
            temp_max: 300.05,
            pressure: 1015,
            humidity: 64,
            sea_level: 1015,
            grnd_level: 933,
        },
        visibility: 10000,
        wind: {
            speed: 0.62,
            deg: 349,
            gust: 1.18,
        },
        rain: {
            "1h": 3.16,
        },
        clouds: {
            all: 100,
        },
        dt: 1661870592,
        sys: {
            type: 2,
            id: 2075663,
            country: "IT",
            sunrise: 1661834187,
            sunset: 1661882248,
        },
        timezone: 7200,
        id: 3163858,
        name: "Zocca",
        cod: 200,
    };

    const f = {
        cod: "200",
        message: 0,
        cnt: 40,
        list: [
            {
                dt: 1691312400,
                main: {
                    temp: 291.62,
                    feels_like: 290.85,
                    temp_min: 291.62,
                    temp_max: 294.39,
                    pressure: 1006,
                    sea_level: 1006,
                    grnd_level: 924,
                    humidity: 51,
                    temp_kf: -2.77,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.11, deg: 2, gust: 2.09 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-06 09:00:00",
            },
            {
                dt: 1691323200,
                main: {
                    temp: 293.05,
                    feels_like: 292.43,
                    temp_min: 293.05,
                    temp_max: 295.92,
                    pressure: 1006,
                    sea_level: 1006,
                    grnd_level: 924,
                    humidity: 51,
                    temp_kf: -2.87,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10d",
                    },
                ],
                clouds: { all: 1 },
                wind: { speed: 1.67, deg: 21, gust: 2.59 },
                visibility: 10000,
                pop: 0.2,
                rain: { "3h": 0.24 },
                sys: { pod: "d" },
                dt_txt: "2023-08-06 12:00:00",
            },
            {
                dt: 1691334000,
                main: {
                    temp: 294.58,
                    feels_like: 294.08,
                    temp_min: 294.58,
                    temp_max: 296.06,
                    pressure: 1006,
                    sea_level: 1006,
                    grnd_level: 924,
                    humidity: 50,
                    temp_kf: -1.48,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10d",
                    },
                ],
                clouds: { all: 11 },
                wind: { speed: 0.81, deg: 116, gust: 2.22 },
                visibility: 10000,
                pop: 0.32,
                rain: { "3h": 0.32 },
                sys: { pod: "d" },
                dt_txt: "2023-08-06 15:00:00",
            },
            {
                dt: 1691344800,
                main: {
                    temp: 291.64,
                    feels_like: 291.4,
                    temp_min: 291.64,
                    temp_max: 291.64,
                    pressure: 1007,
                    sea_level: 1007,
                    grnd_level: 924,
                    humidity: 71,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03d",
                    },
                ],
                clouds: { all: 29 },
                wind: { speed: 1.67, deg: 169, gust: 3.3 },
                visibility: 10000,
                pop: 0.04,
                sys: { pod: "d" },
                dt_txt: "2023-08-06 18:00:00",
            },
            {
                dt: 1691355600,
                main: {
                    temp: 287.54,
                    feels_like: 287.23,
                    temp_min: 287.54,
                    temp_max: 287.54,
                    pressure: 1008,
                    sea_level: 1008,
                    grnd_level: 924,
                    humidity: 84,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 3.14, deg: 206, gust: 4.26 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-06 21:00:00",
            },
            {
                dt: 1691366400,
                main: {
                    temp: 286.79,
                    feels_like: 286.35,
                    temp_min: 286.79,
                    temp_max: 286.79,
                    pressure: 1009,
                    sea_level: 1009,
                    grnd_level: 924,
                    humidity: 82,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.99, deg: 244, gust: 2.15 },
                visibility: 10000,
                pop: 0.01,
                sys: { pod: "n" },
                dt_txt: "2023-08-07 00:00:00",
            },
            {
                dt: 1691377200,
                main: {
                    temp: 284.13,
                    feels_like: 283.53,
                    temp_min: 284.13,
                    temp_max: 284.13,
                    pressure: 1010,
                    sea_level: 1010,
                    grnd_level: 925,
                    humidity: 86,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.31, deg: 288, gust: 1.46 },
                visibility: 10000,
                pop: 0.23,
                sys: { pod: "n" },
                dt_txt: "2023-08-07 03:00:00",
            },
            {
                dt: 1691388000,
                main: {
                    temp: 286.21,
                    feels_like: 285.45,
                    temp_min: 286.21,
                    temp_max: 286.21,
                    pressure: 1011,
                    sea_level: 1011,
                    grnd_level: 926,
                    humidity: 72,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10d",
                    },
                ],
                clouds: { all: 2 },
                wind: { speed: 1.74, deg: 303, gust: 2.79 },
                visibility: 10000,
                pop: 0.31,
                rain: { "3h": 0.2 },
                sys: { pod: "d" },
                dt_txt: "2023-08-07 06:00:00",
            },
            {
                dt: 1691398800,
                main: {
                    temp: 288.87,
                    feels_like: 288.43,
                    temp_min: 288.87,
                    temp_max: 288.87,
                    pressure: 1013,
                    sea_level: 1013,
                    grnd_level: 929,
                    humidity: 74,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10d",
                    },
                ],
                clouds: { all: 41 },
                wind: { speed: 2.31, deg: 344, gust: 3.19 },
                visibility: 10000,
                pop: 0.29,
                rain: { "3h": 0.18 },
                sys: { pod: "d" },
                dt_txt: "2023-08-07 09:00:00",
            },
            {
                dt: 1691409600,
                main: {
                    temp: 292.9,
                    feels_like: 292.39,
                    temp_min: 292.9,
                    temp_max: 292.9,
                    pressure: 1013,
                    sea_level: 1013,
                    grnd_level: 930,
                    humidity: 56,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03d",
                    },
                ],
                clouds: { all: 35 },
                wind: { speed: 2.88, deg: 355, gust: 3.35 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-07 12:00:00",
            },
            {
                dt: 1691420400,
                main: {
                    temp: 293.95,
                    feels_like: 293.13,
                    temp_min: 293.95,
                    temp_max: 293.95,
                    pressure: 1013,
                    sea_level: 1013,
                    grnd_level: 930,
                    humidity: 40,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10d",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 2.38, deg: 358, gust: 3.9 },
                visibility: 10000,
                pop: 0.28,
                rain: { "3h": 0.12 },
                sys: { pod: "d" },
                dt_txt: "2023-08-07 15:00:00",
            },
            {
                dt: 1691431200,
                main: {
                    temp: 289.31,
                    feels_like: 288.52,
                    temp_min: 289.31,
                    temp_max: 289.31,
                    pressure: 1014,
                    sea_level: 1014,
                    grnd_level: 930,
                    humidity: 59,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 0.52, deg: 106, gust: 0.66 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-07 18:00:00",
            },
            {
                dt: 1691442000,
                main: {
                    temp: 286.32,
                    feels_like: 285.23,
                    temp_min: 286.32,
                    temp_max: 286.32,
                    pressure: 1016,
                    sea_level: 1016,
                    grnd_level: 931,
                    humidity: 59,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02n",
                    },
                ],
                clouds: { all: 12 },
                wind: { speed: 1.72, deg: 208, gust: 1.61 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-07 21:00:00",
            },
            {
                dt: 1691452800,
                main: {
                    temp: 285.71,
                    feels_like: 284.54,
                    temp_min: 285.71,
                    temp_max: 285.71,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 931,
                    humidity: 58,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 56 },
                wind: { speed: 1.93, deg: 207, gust: 1.77 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-08 00:00:00",
            },
            {
                dt: 1691463600,
                main: {
                    temp: 284.94,
                    feels_like: 283.66,
                    temp_min: 284.94,
                    temp_max: 284.94,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 931,
                    humidity: 57,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 86 },
                wind: { speed: 1.56, deg: 215, gust: 1.43 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-08 03:00:00",
            },
            {
                dt: 1691474400,
                main: {
                    temp: 287.73,
                    feels_like: 286.76,
                    temp_min: 287.73,
                    temp_max: 287.73,
                    pressure: 1018,
                    sea_level: 1018,
                    grnd_level: 932,
                    humidity: 58,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 91 },
                wind: { speed: 0.38, deg: 188, gust: 0.65 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-08 06:00:00",
            },
            {
                dt: 1691485200,
                main: {
                    temp: 293.23,
                    feels_like: 292.47,
                    temp_min: 293.23,
                    temp_max: 293.23,
                    pressure: 1017,
                    sea_level: 1017,
                    grnd_level: 934,
                    humidity: 45,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 89 },
                wind: { speed: 1.71, deg: 54, gust: 1.78 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-08 09:00:00",
            },
            {
                dt: 1691496000,
                main: {
                    temp: 296.23,
                    feels_like: 295.59,
                    temp_min: 296.23,
                    temp_max: 296.23,
                    pressure: 1016,
                    sea_level: 1016,
                    grnd_level: 934,
                    humidity: 38,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03d",
                    },
                ],
                clouds: { all: 50 },
                wind: { speed: 2.82, deg: 43, gust: 2.81 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-08 12:00:00",
            },
            {
                dt: 1691506800,
                main: {
                    temp: 295.9,
                    feels_like: 295.35,
                    temp_min: 295.9,
                    temp_max: 295.9,
                    pressure: 1016,
                    sea_level: 1016,
                    grnd_level: 933,
                    humidity: 43,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02d",
                    },
                ],
                clouds: { all: 16 },
                wind: { speed: 2.88, deg: 32, gust: 2.16 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-08 15:00:00",
            },
            {
                dt: 1691517600,
                main: {
                    temp: 290.34,
                    feels_like: 289.94,
                    temp_min: 290.34,
                    temp_max: 290.34,
                    pressure: 1016,
                    sea_level: 1016,
                    grnd_level: 932,
                    humidity: 70,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 54 },
                wind: { speed: 1.71, deg: 92, gust: 3.91 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-08 18:00:00",
            },
            {
                dt: 1691528400,
                main: {
                    temp: 287.32,
                    feels_like: 286.75,
                    temp_min: 287.32,
                    temp_max: 287.32,
                    pressure: 1018,
                    sea_level: 1018,
                    grnd_level: 933,
                    humidity: 75,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 71 },
                wind: { speed: 1.37, deg: 212, gust: 1.41 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-08 21:00:00",
            },
            {
                dt: 1691539200,
                main: {
                    temp: 286.62,
                    feels_like: 285.98,
                    temp_min: 286.62,
                    temp_max: 286.62,
                    pressure: 1018,
                    sea_level: 1018,
                    grnd_level: 932,
                    humidity: 75,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 76 },
                wind: { speed: 1.19, deg: 230, gust: 1.28 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-09 00:00:00",
            },
            {
                dt: 1691550000,
                main: {
                    temp: 286.34,
                    feels_like: 285.65,
                    temp_min: 286.34,
                    temp_max: 286.34,
                    pressure: 1018,
                    sea_level: 1018,
                    grnd_level: 933,
                    humidity: 74,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 98 },
                wind: { speed: 0.9, deg: 267, gust: 0.93 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-09 03:00:00",
            },
            {
                dt: 1691560800,
                main: {
                    temp: 288.36,
                    feels_like: 287.76,
                    temp_min: 288.36,
                    temp_max: 288.36,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 934,
                    humidity: 70,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 99 },
                wind: { speed: 0.47, deg: 293, gust: 0.86 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-09 06:00:00",
            },
            {
                dt: 1691571600,
                main: {
                    temp: 293.24,
                    feels_like: 292.58,
                    temp_min: 293.24,
                    temp_max: 293.24,
                    pressure: 1020,
                    sea_level: 1020,
                    grnd_level: 936,
                    humidity: 49,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 98 },
                wind: { speed: 1.87, deg: 39, gust: 1.38 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-09 09:00:00",
            },
            {
                dt: 1691582400,
                main: {
                    temp: 296.32,
                    feels_like: 295.79,
                    temp_min: 296.32,
                    temp_max: 296.32,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 936,
                    humidity: 42,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 98 },
                wind: { speed: 2.26, deg: 46, gust: 2.15 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-09 12:00:00",
            },
            {
                dt: 1691593200,
                main: {
                    temp: 296.79,
                    feels_like: 296.36,
                    temp_min: 296.79,
                    temp_max: 296.79,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 936,
                    humidity: 44,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 72 },
                wind: { speed: 2.68, deg: 39, gust: 1.88 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-09 15:00:00",
            },
            {
                dt: 1691604000,
                main: {
                    temp: 291.65,
                    feels_like: 291.36,
                    temp_min: 291.65,
                    temp_max: 291.65,
                    pressure: 1020,
                    sea_level: 1020,
                    grnd_level: 936,
                    humidity: 69,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 56 },
                wind: { speed: 0.9, deg: 58, gust: 1.07 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-09 18:00:00",
            },
            {
                dt: 1691614800,
                main: {
                    temp: 288.81,
                    feels_like: 288.39,
                    temp_min: 288.81,
                    temp_max: 288.81,
                    pressure: 1021,
                    sea_level: 1021,
                    grnd_level: 936,
                    humidity: 75,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 1 },
                wind: { speed: 1.54, deg: 213, gust: 1.58 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-09 21:00:00",
            },
            {
                dt: 1691625600,
                main: {
                    temp: 288.22,
                    feels_like: 287.71,
                    temp_min: 288.22,
                    temp_max: 288.22,
                    pressure: 1021,
                    sea_level: 1021,
                    grnd_level: 936,
                    humidity: 74,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 1 },
                wind: { speed: 1.56, deg: 219, gust: 1.43 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-10 00:00:00",
            },
            {
                dt: 1691636400,
                main: {
                    temp: 287.78,
                    feels_like: 287.23,
                    temp_min: 287.78,
                    temp_max: 287.78,
                    pressure: 1021,
                    sea_level: 1021,
                    grnd_level: 936,
                    humidity: 74,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.39, deg: 232, gust: 1.27 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-10 03:00:00",
            },
            {
                dt: 1691647200,
                main: {
                    temp: 290.88,
                    feels_like: 290.46,
                    temp_min: 290.88,
                    temp_max: 290.88,
                    pressure: 1021,
                    sea_level: 1021,
                    grnd_level: 937,
                    humidity: 67,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 0.58, deg: 258, gust: 0.73 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-10 06:00:00",
            },
            {
                dt: 1691658000,
                main: {
                    temp: 296.39,
                    feels_like: 296.05,
                    temp_min: 296.39,
                    temp_max: 296.39,
                    pressure: 1021,
                    sea_level: 1021,
                    grnd_level: 938,
                    humidity: 49,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 60 },
                wind: { speed: 1.43, deg: 39, gust: 1.08 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-10 09:00:00",
            },
            {
                dt: 1691668800,
                main: {
                    temp: 299.85,
                    feels_like: 299.8,
                    temp_min: 299.85,
                    temp_max: 299.85,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 938,
                    humidity: 40,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03d",
                    },
                ],
                clouds: { all: 50 },
                wind: { speed: 1.95, deg: 47, gust: 2.23 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-10 12:00:00",
            },
            {
                dt: 1691679600,
                main: {
                    temp: 299.49,
                    feels_like: 299.49,
                    temp_min: 299.49,
                    temp_max: 299.49,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 937,
                    humidity: 44,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03d",
                    },
                ],
                clouds: { all: 49 },
                wind: { speed: 2.39, deg: 45, gust: 1.98 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-10 15:00:00",
            },
            {
                dt: 1691690400,
                main: {
                    temp: 293.72,
                    feels_like: 293.69,
                    temp_min: 293.72,
                    temp_max: 293.72,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 936,
                    humidity: 71,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 71 },
                wind: { speed: 1.1, deg: 104, gust: 1.38 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-10 18:00:00",
            },
            {
                dt: 1691701200,
                main: {
                    temp: 292.43,
                    feels_like: 292.11,
                    temp_min: 292.43,
                    temp_max: 292.43,
                    pressure: 1020,
                    sea_level: 1020,
                    grnd_level: 936,
                    humidity: 65,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 100 },
                wind: { speed: 1.88, deg: 208, gust: 1.83 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-10 21:00:00",
            },
            {
                dt: 1691712000,
                main: {
                    temp: 290.42,
                    feels_like: 289.95,
                    temp_min: 290.42,
                    temp_max: 290.42,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 935,
                    humidity: 67,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 78 },
                wind: { speed: 2.22, deg: 223, gust: 2 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-11 00:00:00",
            },
            {
                dt: 1691722800,
                main: {
                    temp: 289.57,
                    feels_like: 289.07,
                    temp_min: 289.57,
                    temp_max: 289.57,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 934,
                    humidity: 69,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 2 },
                wind: { speed: 1.6, deg: 224, gust: 1.47 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "n" },
                dt_txt: "2023-08-11 03:00:00",
            },
            {
                dt: 1691733600,
                main: {
                    temp: 292.4,
                    feels_like: 292.08,
                    temp_min: 292.4,
                    temp_max: 292.4,
                    pressure: 1019,
                    sea_level: 1019,
                    grnd_level: 935,
                    humidity: 65,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 2 },
                wind: { speed: 0.8, deg: 242, gust: 1.14 },
                visibility: 10000,
                pop: 0,
                sys: { pod: "d" },
                dt_txt: "2023-08-11 06:00:00",
            },
        ],
        city: {
            id: 3163858,
            name: "Zocca",
            coord: { lat: 44.34, lon: 10.99 },
            country: "IT",
            population: 4593,
            timezone: 7200,
            sunrise: 1691294897,
            sunset: 1691346940,
        },
    };

    const [showMenu, setShowMenu] = useState(true);
    const [showSearchSpinner, setShowSearchSpinner] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // cities recieved from geo api
    const [cities, setCities] = useState([]);
    // weather from weather api
    const [currentWeather, setCurrentWeather] = useState(w);
    const [forecast, setForecast] = useState(f);
    const [filteredForecast, setFilteredForecast] = useState([]);

    // current weekday and month
    const [date, setDate] = useState("");

    const searchInputRef = useRef(null);
    const loadingBarRef = useRef(null);

    // sidebar menu
    const [sidebarStatus, setSidebarStatus] = useState([1, 0, 0, 0]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    //
    const handleCitiesSearch = async (query) => {
        const { data } = await getCities(query);

        setCities(data.data.reverse());
        setShowSearchSpinner(false);
    };

    const sidebarMenu = (index) => {
        let array = sidebarStatus;
        array.map((i, ind) => {
            array[ind] = 0;
        });
        array[index] = 1;
        setSidebarStatus([...array]);
        console.log(sidebarStatus);
    };

    // handle weather search
    const handleWeatherSearch = async (city) => {
        try {
            const { data } = await getCurrentWeather(
                city.latitude,
                city.longitude
            );
            const { data: forecastData } = await getForecastWeather(
                city.latitude,
                city.longitude
            );

            let x = [];
            let k = [];

            forecastData.list.map((i) => {
                const d = i.dt_txt;
                if (!x.includes(d.split(" ")[0])) {
                    x.push(d.split(" ")[0]);
                    k.push(i);
                }
            });
            k.splice(0, 1);

            setForecast(forecastData);
            setCurrentWeather(data);
            setFilteredForecast(k);

            setCities([]);
            loadingBarRef.current.complete();
        } catch (err) {
            console.log(err);
        }
    };

    const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    useEffect(() => {
        const d = new Date();
        setDate(
            `${weekday[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
        );
    }, []);

    // debouncing for search input
    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setSearchQuery(searchQuery);

            if (searchQuery.length > 2) {
                setShowSearchSpinner(true);
                try {
                    handleCitiesSearch(searchQuery);
                } catch (err) {
                    console.log(err);
                }
            } else {
                setCities([]);
            }
        }, 600);

        return () => clearTimeout(delayInputTimeoutId);
    }, [searchQuery, 500]);

    return (
        <>
            <LoadingBar color="#f11946" ref={loadingBarRef} />

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <InputGroup>
                            <InputRightElement>
                                {showSearchSpinner ? <Spinner /> : null}
                            </InputRightElement>

                            <Input
                                type="text"
                                ref={searchInputRef}
                                placeholder="search for city ..."
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("problem solved");
                                }}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value.toLowerCase())
                                }
                            />
                        </InputGroup>
                        <Box mt="10px">
                            {cities.map((city) => {
                                return (
                                    <Button
                                        w="100%"
                                        my="2px"
                                        key={city.id}
                                        onClick={() => {
                                            loadingBarRef.current.continuousStart();
                                            handleWeatherSearch(city);
                                            onClose();
                                            setShowMenu(false);
                                        }}
                                    >
                                        <Text>{city.city}</Text>
                                    </Button>
                                );
                            })}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* main content */}
            <Grid templateColumns="repeat(12 , 0.5fr)" bg="gray.500">
                {showMenu ? (
                    <GridItem
                        as="aside"
                        colSpan={{ base: "12", md: "4", xl: "3" }}
                        minHeight="100vh"
                        p="20px"
                        bg="purple.500"
                    >
                        <Flex direction="column">
                            <Box dir="rtl" my="5px">
                                <IconButton
                                    icon={<IoClose />}
                                    onClick={() => setShowMenu(!showMenu)}
                                />
                            </Box>
                            <Box>
                                <Button
                                    w="100%"
                                    bg="telegram.100"
                                    onClick={onOpen}
                                >
                                    <Flex alignItems="center" gap={3}>
                                        <GoSearch />

                                        <Text>search location</Text>
                                    </Flex>
                                    <Spacer />
                                    <Box></Box>
                                </Button>
                            </Box>

                            <Divider my="10px" />
                            <Box>
                                <List spacing={4}>
                                    <ListItem>
                                        <Button
                                            variant="ghost"
                                            colorScheme="teal"
                                            onClick={() => sidebarMenu(0)}
                                            w="100%"
                                            leftIcon={<TiWeatherPartlySunny />}
                                        >
                                            <Text>current weather</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
                                            onClick={() => sidebarMenu(1)}
                                            leftIcon={<TiWeatherSnow />}
                                        >
                                            <Text>detailed forecast</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
                                            onClick={() => sidebarMenu(2)}
                                            leftIcon={<TiWeatherWindy />}
                                        >
                                            <Text>Air pollution</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
                                            onClick={() => sidebarMenu(3)}
                                            leftIcon={<TbClockSearch />}
                                        >
                                            <Text>Recent locations</Text>
                                        </Button>
                                    </ListItem>
                                </List>
                            </Box>
                        </Flex>
                    </GridItem>
                ) : (
                    <GridItem
                        as="aside"
                        colSpan={{ base: "12", md: "4", xl: "3" }}
                        minHeight="100vh"
                        p="20px"
                        bg="purple.500"
                    >
                        <Flex direction="column" px={5}>
                            <Flex>
                                <Button
                                    colorScheme="teal"
                                    variant="solid"
                                    size="sm"
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    Search for cities.
                                </Button>
                                <Spacer />
                                <IconButton
                                    size="sm"
                                    colorScheme="teal"
                                    variant="solid"
                                    icon={<FaLocationCrosshairs size={20} />}
                                />
                            </Flex>

                            <Flex justifyContent="center">
                                <Image
                                    src={`../assets/weatherImages/${currentWeather.weather[0].icon}.png`}
                                />
                            </Flex>
                            <Flex justifyContent="center">
                                <Text>
                                    {parseInt(currentWeather.main.temp) - 273}{" "}
                                    °C
                                </Text>
                            </Flex>
                            <Flex justifyContent="center">
                                <Text>{currentWeather.weather[0].main}</Text>
                            </Flex>

                            <Flex
                                justifyContent="center"
                                gap={{ sm: 20, md: 15, lg: 20 }}
                            >
                                <Text>Today</Text>
                                {/* <Text>Fri 5 jan</Text> */}
                                <Text>{date}</Text>
                            </Flex>
                            <Flex justifyContent="center" mt="1px">
                                <FaLocationDot style={{ marginTop: "3px" }} />
                                <Text>{currentWeather.name}</Text>
                            </Flex>
                        </Flex>
                    </GridItem>
                )}

                <GridItem as="main" colSpan={{ base: "12", md: "8", xl: "9" }}>
                    {sidebarStatus[0] === 1 ? (
                        <Box m="0px 15px">
                            <Box m="10px 5px">
                                <SimpleGrid minChildWidth="160px" spacing={4}>
                                    {filteredForecast.map((item, index) => {
                                        return (
                                            <Card
                                                key={index}
                                                p="0px"
                                                textAlign="center"
                                                display="flex"
                                            >
                                                <CardBody>
                                                    <Heading size="sm">
                                                        {
                                                            item.dt_txt.split(
                                                                " "
                                                            )[0]
                                                        }
                                                    </Heading>

                                                    <Image
                                                        boxSize="80px"
                                                        m="0 auto"
                                                        src={`../assets/weatherImages/${item.weather[0].icon}.png`}
                                                    ></Image>

                                                    <Flex m="3px 10px">
                                                        <Text>
                                                            {parseInt(
                                                                item.main.temp
                                                            ) - 273}{" "}
                                                            °C
                                                        </Text>
                                                        <Spacer />
                                                        <Text>
                                                            {parseInt(
                                                                item.main
                                                                    .humidity
                                                            )}
                                                            %
                                                        </Text>
                                                    </Flex>
                                                </CardBody>
                                            </Card>
                                        );
                                    })}
                                </SimpleGrid>
                            </Box>

                            <Box className="details" m="30px 5px 0px 5px">
                                <Heading>Today's Highlights</Heading>
                                <SimpleGrid
                                    minChildWidth="350px"
                                    mt="20px"
                                    spacing={5}
                                >
                                    <Card>
                                        <CardBody textAlign="center">
                                            <Heading size="md">
                                                Wind status
                                            </Heading>
                                            <Text>
                                                {currentWeather.wind.speed} m/s
                                            </Text>
                                            <Text>
                                                direction :{" "}
                                                {currentWeather.wind.deg}°
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody textAlign="center">
                                            <Heading size="md">
                                                Humidity
                                            </Heading>
                                            <Progress
                                                colorScheme="green"
                                                h="5px"
                                                value={parseInt(
                                                    currentWeather.main.humidity
                                                )}
                                            />
                                            <Text>
                                                {parseInt(
                                                    currentWeather.main.humidity
                                                )}
                                                %
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody textAlign="center">
                                            <Heading size="md">
                                                Visibility
                                            </Heading>
                                            <Text>
                                                {parseInt(
                                                    currentWeather.visibility
                                                ) / 1000}{" "}
                                                km
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody textAlign="center">
                                            <Heading size="md">
                                                Air pressure
                                            </Heading>
                                            <Text>
                                                {parseInt(
                                                    currentWeather.main.pressure
                                                ) / 1000}{" "}
                                                atm
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody textAlign="center">
                                            <Heading size="md">
                                                Cloudiness
                                            </Heading>
                                            <Text>
                                                {currentWeather.clouds.all} %
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody textAlign="center">
                                            <Heading size="ms">
                                                Min and Max temp
                                            </Heading>
                                            <Box>
                                                <Text>
                                                    Min :{" "}
                                                    {parseInt(
                                                        currentWeather.main
                                                            .temp_min
                                                    ) - 273}{" "}
                                                    °C
                                                </Text>
                                                <Text>
                                                    Max :{" "}
                                                    {parseInt(
                                                        currentWeather.main
                                                            .temp_max
                                                    ) - 273}{" "}
                                                    °C
                                                </Text>
                                            </Box>
                                        </CardBody>
                                    </Card>
                                </SimpleGrid>
                            </Box>
                        </Box>
                    ) : null}

                    {sidebarStatus[1] === 1 ? (
                        <Box m="0px 15px">
                            <Heading mt="20px" mb="15px">
                                Detailed forecast
                            </Heading>
                            <Box mt="30px" p="0 50px">
                                <Accordion allowMultiple>
                                    {filteredForecast.map((item) => {
                                        return (
                                            <AccordionItem key={item.id}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box
                                                            as="span"
                                                            flex="1"
                                                            textAlign="left"
                                                        >
                                                            {
                                                                item.dt_txt.split(
                                                                    " "
                                                                )[0]
                                                            }
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <Box>
                                                        <Flex
                                                            justifyContent="center"
                                                            alignContent="center"
                                                        >
                                                            <Image
                                                                src={`../assets/weatherImages/${item.weather[0].icon}.png`}
                                                                mr="10px"
                                                            />
                                                            <Flex
                                                                direction="column"
                                                                align="center"
                                                                justifyContent="center"
                                                            >
                                                                <Text>
                                                                    {
                                                                        item
                                                                            .weather[0]
                                                                            .main
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {parseInt(
                                                                        item
                                                                            .main
                                                                            .temp
                                                                    ) -
                                                                        273}{" "}
                                                                    °C
                                                                </Text>
                                                            </Flex>
                                                        </Flex>
                                                        <SimpleGrid minChildWidth="200px">
                                                            <Flex direction="column" alignItems="center">
                                                                <Text>
                                                                    Description
                                                                    :{" "}
                                                                    {
                                                                        item
                                                                            .weather[0]
                                                                            .description
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    Wind speed :{" "}
                                                                    {
                                                                        item
                                                                            .wind
                                                                            .speed
                                                                    }{" "}
                                                                    m/s
                                                                </Text>
                                                                <Text>
                                                                    Wind
                                                                    direction :{" "}
                                                                    {
                                                                        item
                                                                            .wind
                                                                            .deg
                                                                    }
                                                                    °
                                                                </Text>
                                                            </Flex>
                                                            <Flex direction="column" alignItems="center">
                                                                <Text>
                                                                    Humidity :{" "}
                                                                    {parseInt(
                                                                        item
                                                                            .main
                                                                            .humidity
                                                                    )}
                                                                    %
                                                                </Text>
                                                                <Text>
                                                                    Visibility :{" "}
                                                                    {parseInt(
                                                                        item.visibility
                                                                    ) /
                                                                        1000}{" "}
                                                                    km
                                                                </Text>
                                                                <Text>
                                                                    Air pressure
                                                                    :{" "}
                                                                    {parseInt(
                                                                        item
                                                                            .main
                                                                            .pressure
                                                                    ) /
                                                                        1000}{" "}
                                                                    atm
                                                                </Text>
                                                            </Flex>
                                                        </SimpleGrid>
                                                    </Box>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        );
                                    })}
                                </Accordion>
                            </Box>
                        </Box>
                    ) : null}

                    {sidebarStatus[2] === 1 ? (
                        <Box>
                            <Text>Air pollution</Text>
                        </Box>
                    ) : null}

                    {sidebarStatus[3] === 1 ? (
                        <Box>
                            <Text>Recent Places</Text>
                        </Box>
                    ) : null}
                </GridItem>
            </Grid>
        </>
    );
};

export default App;