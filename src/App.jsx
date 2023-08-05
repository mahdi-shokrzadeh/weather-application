import "./App.css";
import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
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
    Spacer,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
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
import { getCurrentWeather } from "../services/WeatherService/weatherService";

// import {
//     CITY_API_URL,
//     cityApiOptions,
// } from "../services/CityService/cityService";

const App = () => {
    ///


    const w =                           

    {
      "coord": {
        "lon": 10.99,
        "lat": 44.34
      },
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 298.48,
        "feels_like": 298.74,
        "temp_min": 297.56,
        "temp_max": 300.05,
        "pressure": 1015,
        "humidity": 64,
        "sea_level": 1015,
        "grnd_level": 933
      },
      "visibility": 10000,
      "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
      },
      "rain": {
        "1h": 3.16
      },
      "clouds": {
        "all": 100
      },
      "dt": 1661870592,
      "sys": {
        "type": 2,
        "id": 2075663,
        "country": "IT",
        "sunrise": 1661834187,
        "sunset": 1661882248
      },
      "timezone": 7200,
      "id": 3163858,
      "name": "Zocca",
      "cod": 200
    }                   ;     
    
                            
    const [showMenu, setShowMenu] = useState(true);
    const [showSearchSpinner, setShowSearchSpinner] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // cities recieved from geo api
    const [cities, setCities] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(w);

    const searchInputRef = useRef();
    const modalRef = useRef();

    const { isOpen, onOpen, onClose } = useDisclosure();

    //
    const handleCitiesSearch = async (query) => {
        const { data } = await getCities(query);

        setCities(data.data.reverse());
        setShowSearchSpinner(false)
    };

    // handle weather search
    const handleWeatherSearch = async (city) => {

        try {
            const { data } = await getCurrentWeather(
                city.latitude,
                city.longitude
            );

            setCurrentWeather(data);
            setCities([])
        } catch (err) {
            console.log(err);
        }
    };

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
            <Modal ref={modalRef} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
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
                                        onClick={() =>{
                                            handleWeatherSearch(city);
                                            onClose();
                                            setShowMenu(false);
                                            }
                                        }
                                        
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
                                            w="100%"
                                            leftIcon={<TiWeatherPartlySunny />}
                                        >
                                            <Text>current weather</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
                                            leftIcon={<TiWeatherSnow />}
                                        >
                                            <Text>detailed forecast</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
                                            leftIcon={<TiWeatherWindy />}
                                        >
                                            <Text>Air pollution</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            w="100%"
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
                                <Image src={`../assets/weatherImages/${currentWeather.weather[0].icon}.png`} />
                            </Flex>
                            <Flex justifyContent="center">
                                <Text>{parseInt(currentWeather.main.temp) - 273} °C</Text>
                            </Flex>
                            <Flex justifyContent="center">
                                <Text>{currentWeather.weather[0].main}</Text>
                            </Flex>

                            {/* <Flex
                                justifyContent="center"
                                gap={{ sm: 20, md: 15, lg: 20 }}
                            >
                                <Text>Today</Text>
                                <Text>Fri 5 jan</Text>
                            </Flex> */}
                            <Flex justifyContent="center" mt="1px">
                                <FaLocationDot style={{marginTop : "3px"}} />
                                <Text>{currentWeather.name}</Text>
                            </Flex>
                        </Flex>
                    </GridItem>
                )}

                <GridItem
                    as="main"
                    colSpan={{ base: "12", md: "8", xl: "9" }}
                ></GridItem>
            </Grid>
        </>
    );
};

export default App;
