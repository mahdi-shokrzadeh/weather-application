import "./App.css";
import {
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    IconButton,
    Image,
    List,
    ListItem,
    Progress,
    SimpleGrid,
    Spacer,
    Switch,
    Text,
    Tooltip,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef, useState } from "react";
import { FaLocationCrosshairs, FaLocationDot, FaRegEye } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { BiArrowBack } from "react-icons/bi";
import { WiStrongWind } from "react-icons/wi";
import { TiWeatherPartlySunny, TiWeatherSnow } from "react-icons/ti";
import {
    IoCloudOutline,
    IoThermometerOutline,
    IoTimerOutline,
    IoWater,
} from "react-icons/io5";
import { TbClockSearch, TbMoonStars, TbSunFilled } from "react-icons/tb";
import { BsThermometerSnow, BsThermometerSun } from "react-icons/bs";
import { getCities } from "../services/CityService/cityService";
import {
    getCurrentWeather,
    getForecastWeather,
} from "../services/WeatherService/weatherService";
import SearchModal from "./components/SearchModal";
import RecentLocations from "./components/MenuComponents/RecentLocations";
import { SlLocationPin } from "react-icons/sl";
import { getIPAddress, sendIpAddress } from "../services/IpService/ipService";
import { f, w } from "../assets/exampleData";
import DetailedForecast from "./components/MenuComponents/DetailedForecast";

const App = () => {
    const [showMenu, setShowMenu] = useState(false);
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
    // IP address
    const [IpAddress, setIpAddress] = useState("");

    const searchInputRef = useRef(null);
    const loadingBarRef = useRef(null);

    // sidebar menu
    const [sidebarStatus, setSidebarStatus] = useState([1, 0, 0]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    // dark mode featur
    const { toggleColorMode } = useColorMode();
    const [themeToggler, setThemeToggler] = useState(
        localStorage.getItem("chakra-ui-color-mode") === null ||
            localStorage.getItem("chakra-ui-color-mode") === "light"
            ? false
            : true
    );

    // color mode values

    const sidebarColor = useColorModeValue(
        // "pink.200",
        "orange.50",
        "blue.900"
    );
    const mainSectionColor = useColorModeValue(
        "gray.200",
        // "cyan.100" ,
        "BlackAlpha.900"
    );
    const cardFooterColor = useColorModeValue("black", "WhiteAlpha.700");
    const cardFooterColor2 = useColorModeValue("black", "WhiteAlpha.800");
    const sidebarButtonColor = useColorModeValue(
        "yellow.100",
        "whiteAlpha.400"
    );
    const MenuButtonColor = useColorModeValue("", "");

    //  toast
    const toast = useToast();

    const handleCitiesSearch = async (query) => {
        try {
            const { data } = await getCities(query);
            setCities(data.data.reverse());
        } catch (err) {
            toast({
                title: "server error .",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

        setShowSearchSpinner(false);
    };

    const sidebarMenu = (index) => {
        let array = sidebarStatus;
        array.map((i, ind) => {
            array[ind] = 0;
        });
        array[index] = 1;
        setSidebarStatus([...array]);
    };

    // handle weather search
    const handleWeatherSearch = async (city) => {
        loadingBarRef.current.continuousStart();
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

            // local storage for recent locations
            if (localStorage.getItem("cities") !== null) {
                let arr = JSON.parse(localStorage.getItem("cities"));

                let x = false;
                arr.map((i) => {
                    if (i.city === city.city) {
                        x = true;
                    }
                });
                if (x === false) {
                    arr.push(city);
                }
                localStorage.setItem("cities", JSON.stringify(arr));
            } else {
                const arr = [city];
                localStorage.setItem("cities", JSON.stringify(arr));
            }
        } catch (err) {
            toast({
                title: "server error .",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        loadingBarRef.current.complete();
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

    //  handle Ip function
    const handleIp = async () => {
        try {
            const res = await getIPAddress();
            setIpAddress(res.data.ip);
            const { data } = await sendIpAddress(res.data.ip);
            const city = {
                city: data.city,
                latitude: data.latitude,
                longitude: data.longitude,
            };
            handleWeatherSearch(city);
            toast({
                title: "Weather is applied based on your location.",
                status: "success",
                duration: 5000,
                isClosable: false,
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const d = new Date();
        setDate(
            `${weekday[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
        );

        //   IpAddress proccess :
        loadingBarRef.current.continuousStart();

        // handleIp();
        loadingBarRef.current.complete();
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
                    toast({
                        title: "server error .",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            } else {
                setCities([]);
            }
        }, 600);

        return () => clearTimeout(delayInputTimeoutId);
    }, [searchQuery, 900]);

    return (
        <>
            <LoadingBar color="#38B2AC" height="4px" ref={loadingBarRef} />

            <SearchModal
                searchInputRef={searchInputRef}
                setSearchQuery={setSearchQuery}
                cities={cities}
                handleWeatherSearch={handleWeatherSearch}
                setShowMenu={setShowMenu}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                showSearchSpinner={showSearchSpinner}
            />

            {/* main content */}
            <Grid templateColumns="repeat(12 , 0.5fr)" bg={mainSectionColor}>
                {showMenu ? (
                    <GridItem
                        as="aside"
                        colSpan={{ base: "12", md: "4", xl: "3" }}
                        minHeight="100vh"
                        p="20px"
                        bg={sidebarColor}
                    >
                        <Flex direction="column">
                            <HStack pr="3px">
                                <IconButton
                                    icon={<BiArrowBack size="21px" />}
                                    onClick={() => setShowMenu(!showMenu)}
                                    style={{ borderRadius: "20px" }}
                                    bg={sidebarButtonColor}
                                />
                                <Spacer />
                                <HStack spacing={1}>
                                    <TbSunFilled />
                                    <Switch
                                        onChange={() => {
                                            toggleColorMode();
                                            setThemeToggler(!themeToggler);
                                        }}
                                        isChecked={themeToggler ? true : false}
                                    />
                                    <TbMoonStars />
                                </HStack>
                            </HStack>
                            <Box mt="15px">
                                <Button w="100%" onClick={onOpen}>
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
                                            onClick={() => sidebarMenu(0)}
                                            isActive={
                                                sidebarStatus[0] === 1
                                                    ? true
                                                    : false
                                            }
                                            w="100%"
                                            bg={MenuButtonColor}
                                            leftIcon={<TiWeatherPartlySunny />}
                                        >
                                            <Text>current weather</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
                                            bg={MenuButtonColor}
                                            isActive={
                                                sidebarStatus[1] === 1
                                                    ? true
                                                    : false
                                            }
                                            onClick={() => sidebarMenu(1)}
                                            leftIcon={<TiWeatherSnow />}
                                        >
                                            <Text>detailed forecast</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
                                            bg={MenuButtonColor}
                                            isActive={
                                                sidebarStatus[2] === 1
                                                    ? true
                                                    : false
                                            }
                                            onClick={() => sidebarMenu(2)}
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
                        bg={sidebarColor}
                    >
                        <Flex direction="column" px={5}>
                            <Flex mb="40px">
                                <Button
                                    bg={sidebarButtonColor}
                                    pl="7px"
                                    variant="solid"
                                    size="sm"
                                    fontWeight="400"
                                    leftIcon={<SlLocationPin />}
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    Search location
                                </Button>
                                <Spacer />
                                <Tooltip
                                    label="your location weather"
                                    aria-label="A tooltip"
                                    bg="yellow.500"
                                    pb="3px"
                                >
                                    <IconButton
                                        size="sm"
                                        bg={sidebarButtonColor}
                                        variant="solid"
                                        style={{ borderRadius: "20px" }}
                                        onClick={() => {
                                            handleIp();
                                        }}
                                        icon={
                                            <FaLocationCrosshairs size={20} />
                                        }
                                    />
                                </Tooltip>
                            </Flex>

                            <Flex justifyContent="center" mb="50px">
                                <Image
                                    boxSize="120px"
                                    
                                    src={`/assets/weatherImages/${currentWeather.weather[0].icon}.png`}
                                />
                            </Flex>
                            <Flex justifyContent="center">
                                <Text as="b" fontSize="45px">
                                    {parseInt(currentWeather.main.temp) - 273}{" "}
                                    °C
                                </Text>
                            </Flex>
                            <Flex justifyContent="center" mb="70px" mt="20px">
                                <Text as="em" fontSize="35px">
                                    {currentWeather.weather[0].main}
                                </Text>
                            </Flex>

                            <HStack
                                mb="30px"
                                justifyContent="center"
                                gap={{ sm: 10, md: 10, lg: 10 }}
                            >
                                <Text as="p" fontSize="18px" fontWeight="300">
                                    Today
                                </Text>

                                <Text as="p" fontSize="18px">
                                    {date}
                                </Text>
                            </HStack>
                            <HStack
                                justifyContent="center"
                                mt="10px"
                                alignItems="center"
                            >
                                <FaLocationDot mr="10px" size="22px" />
                                <Text fontSize="23px" fontWeight="500">
                                    {currentWeather.name}
                                </Text>
                            </HStack>
                        </Flex>
                    </GridItem>
                )}

                <GridItem as="main" colSpan={{ base: "12", md: "8", xl: "9" }}>
                    {sidebarStatus[0] === 1 ? (
                        <Box m="0px 15px">
                            <Box m="20px 5px" pt="10px">
                                <SimpleGrid minChildWidth="160px" spacing={4}>
                                    {filteredForecast.map((item, index) => {
                                        return (
                                            <Card
                                                key={index}
                                                p="0px"
                                                textAlign="center"
                                                display="flex"
                                                bg={sidebarColor}
                                            >
                                                <CardBody>
                                                    <Heading size="sm">
                                                        <Text
                                                            as="i"
                                                            fontWeight="350"
                                                        >
                                                            {item.dt_txt
                                                                .split(" ")[0]
                                                                .split("-")
                                                                .join(" / ")}
                                                        </Text>
                                                    </Heading>

                                                    <Image
                                                        boxSize="80px"
                                                        m="0 auto"
                                                        src={`/assets/weatherImages/${item.weather[0].icon}.png`}
                                                    ></Image>

                                                    <Flex m="3px 10px">
                                                        <Text
                                                            as=""
                                                            fontSize="lg"
                                                            color={
                                                                cardFooterColor2
                                                            }
                                                        >
                                                            {parseInt(
                                                                item.main.temp
                                                            ) - 273}{" "}
                                                            °C
                                                        </Text>
                                                        <Spacer />
                                                        <HStack spacing={0}>
                                                            <Text
                                                                color={
                                                                    cardFooterColor
                                                                }
                                                            >
                                                                {parseInt(
                                                                    item.main
                                                                        .humidity
                                                                )}
                                                                %
                                                            </Text>
                                                            <IoWater />
                                                        </HStack>
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
                                    <Card bg={sidebarColor}>
                                        <CardBody textAlign="center">
                                            <Heading mb="25px" size="md">
                                                <HStack
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <WiStrongWind size="40px" />
                                                    <Text>Wind status</Text>
                                                </HStack>
                                            </Heading>
                                            <Text
                                                fontSize="20px"
                                                fontWeight="500"
                                            >
                                                {currentWeather.wind.speed} m/s
                                            </Text>
                                            <Text>
                                                direction :{" "}
                                                {currentWeather.wind.deg}°
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card bg={sidebarColor}>
                                        <CardBody textAlign="center">
                                            <Heading mb="35px" size="md">
                                                <HStack
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <IoWater size="25px" />
                                                    <Text>Humidity</Text>
                                                </HStack>
                                            </Heading>
                                            <Progress
                                                style={{ borderRadius: "12px" }}
                                                mb="10px"
                                                colorScheme="green"
                                                h="10px"
                                                value={parseInt(
                                                    currentWeather.main.humidity
                                                )}
                                            />
                                            <Text
                                                as="i"
                                                fontSize="25px"
                                                fontWeight="500"
                                            >
                                                {parseInt(
                                                    currentWeather.main.humidity
                                                )}
                                                %
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card bg={sidebarColor}>
                                        <CardBody textAlign="center">
                                            <Heading mb="30px" size="md">
                                                <HStack
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <FaRegEye size="25px" />
                                                    <Text>Visibility</Text>
                                                </HStack>
                                            </Heading>
                                            <Text
                                                fontSize="25px"
                                                as="i"
                                                fontWeight="500"
                                            >
                                                {parseInt(
                                                    currentWeather.visibility
                                                ) / 1000}{" "}
                                                km
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card bg={sidebarColor}>
                                        <CardBody textAlign="center">
                                            <Heading mb="30px" size="md">
                                                <HStack
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <IoTimerOutline size="21px" />
                                                    <Text>Air pressure</Text>
                                                </HStack>
                                            </Heading>
                                            <Text
                                                as="i"
                                                fontSize="25px"
                                                fontWeight="500"
                                            >
                                                {parseInt(
                                                    currentWeather.main.pressure
                                                ) / 1000}{" "}
                                                atm
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card bg={sidebarColor}>
                                        <CardBody textAlign="center">
                                            <Heading mb="30px" size="md">
                                                <HStack
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <IoCloudOutline size="25px" />
                                                    <Text>Cloudiness</Text>
                                                </HStack>
                                            </Heading>
                                            <Text
                                                as="i"
                                                fontSize="25px"
                                                fontWeight="600"
                                            >
                                                {currentWeather.clouds.all} %
                                            </Text>
                                        </CardBody>
                                    </Card>
                                    <Card bg={sidebarColor}>
                                        <CardBody textAlign="center">
                                            <Heading mb="35px" size="md">
                                                <HStack
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <IoThermometerOutline size="25px" />
                                                    <Text>Temperature</Text>
                                                </HStack>
                                            </Heading>
                                            <Box>
                                                <Box>
                                                    <HStack
                                                        justifyContent="center"
                                                        mb="10px"
                                                    >
                                                        <BsThermometerSnow size="20px" />
                                                        <Text
                                                            as="i"
                                                            fontSize="lg"
                                                        >
                                                            Min :{" "}
                                                            {parseInt(
                                                                currentWeather
                                                                    .main
                                                                    .temp_min
                                                            ) - 273}{" "}
                                                            °C
                                                        </Text>
                                                    </HStack>
                                                </Box>
                                                <Box>
                                                    <HStack justifyContent="center">
                                                        <BsThermometerSun size="20px" />
                                                        <Text
                                                            as="i"
                                                            fontSize="lg"
                                                        >
                                                            Max :{" "}
                                                            {parseInt(
                                                                currentWeather
                                                                    .main
                                                                    .temp_max
                                                            ) - 273}{" "}
                                                            °C
                                                        </Text>
                                                    </HStack>
                                                </Box>
                                            </Box>
                                        </CardBody>
                                    </Card>
                                </SimpleGrid>
                            </Box>
                        </Box>
                    ) : null}

                    {sidebarStatus[1] === 1 ? (
                        <DetailedForecast
                            currentWeather={currentWeather}
                            filteredForecast={filteredForecast}
                            sidebarColor={sidebarColor}
                        />
                    ) : null}

                    {sidebarStatus[2] === 1 ? (
                        <RecentLocations
                            handleWeatherSearch={handleWeatherSearch}
                            sidebarMenu={sidebarMenu}
                        />
                    ) : null}
                </GridItem>
            </Grid>
        </>
    );
};

export default App;
